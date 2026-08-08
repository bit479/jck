/*
 * 3D 数字人（魔珐星云 具身驱动 SDK）接入脚本。
 *
 * 说明：
 * 1. 数字人以悬浮窗形式常驻网页右下角，浮于所有内容上层；
 *    点击数字人弹出语音/文本聊天窗口（由 js/llm-assistant.js 提供）。
 *    整个数字人助手（人物和标签）支持鼠标或手指拖动，位置会被记住。
 * 2. appId / appSecret 会随网页源码暴露，这是该 SDK 的客户端直连接入方式；
 *    正式对外发布前，请在魔珐星云平台重新生成密钥。
 * 3. SDK 仅支持 localhost 或 https 环境访问（file:// 或 http://IP 无法使用），
 *    此时只显示“数字人助手”标签，聊天功能仍可使用。
 */
(function () {
  "use strict";

  var sdk = null;
  var initialized = false;
  var sdkReady = false;
  var floatRoot = null;
  var sdkContainer = null;
  var labelEl = null;
  var retryCount = 0;
  var retryTimer = null;
  var watchdogTimer = null;
  var dragState = null;
  var suppressClick = false;

  function setLabel(text) {
    if (labelEl) {
      labelEl.textContent = text || "";
    }
  }

  /* SDK 仅支持 localhost 或 https。 */
  function isSupportedEnvironment() {
    if (window.location.protocol === "https:") {
      return true;
    }
    if (window.location.protocol === "http:") {
      var host = window.location.hostname;
      return host === "localhost" || host === "127.0.0.1" || host === "[::1]";
    }
    return false;
  }

  /* 创建右下角悬浮窗结构。 */
  function buildFloat() {
    floatRoot = document.createElement("div");
    floatRoot.className = "digital-human-float";
    floatRoot.setAttribute("role", "button");
    floatRoot.setAttribute("aria-label", "数字人助手，点击开始对话");
    floatRoot.tabIndex = 0;

    var avatar = document.createElement("div");
    avatar.className = "digital-human-float__avatar";

    sdkContainer = document.createElement("div");
    sdkContainer.id = "digital-human-sdk";
    sdkContainer.className = "digital-human-sdk";

    avatar.appendChild(sdkContainer);

    labelEl = document.createElement("span");
    labelEl.className = "digital-human-float__label";
    labelEl.textContent = "数字人助手";

    floatRoot.appendChild(avatar);
    floatRoot.appendChild(labelEl);
    document.body.appendChild(floatRoot);

    /* 点击打开聊天面板；拖动数字人后自动忽略随后产生的点击，避免误触。 */
    floatRoot.addEventListener("click", function () {
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      if (window.tbeaAssistant && window.tbeaAssistant.togglePanel) {
        window.tbeaAssistant.togglePanel();
      }
    });
    floatRoot.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (window.tbeaAssistant && window.tbeaAssistant.togglePanel) {
          window.tbeaAssistant.togglePanel();
        }
      }
    });

    /* 支持鼠标和手指拖动整个数字人助手。 */
    floatRoot.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }
      var rect = floatRoot.getBoundingClientRect();
      dragState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originLeft: rect.left,
        originTop: rect.top,
        moved: false
      };
      try {
        floatRoot.setPointerCapture(event.pointerId);
      } catch (error) {
        // 不支持指针捕获时忽略。
      }
    });

    floatRoot.addEventListener("pointermove", function (event) {
      if (!dragState || dragState.pointerId !== event.pointerId) {
        return;
      }
      var dx = event.clientX - dragState.startX;
      var dy = event.clientY - dragState.startY;
      // 位移小于 6px 视为点击，不进入拖动。
      if (!dragState.moved && Math.abs(dx) < 6 && Math.abs(dy) < 6) {
        return;
      }
      dragState.moved = true;
      floatRoot.classList.add("is-dragging");
      floatRoot.style.left = dragState.originLeft + dx + "px";
      floatRoot.style.top = dragState.originTop + dy + "px";
      floatRoot.style.right = "auto";
      floatRoot.style.bottom = "auto";
      // 面板已打开时，让面板跟随数字人实时移动。
      if (window.tbeaAssistant && window.tbeaAssistant.syncPanel) {
        window.tbeaAssistant.syncPanel();
      }
    });

    function finishDrag(event) {
      if (!dragState || dragState.pointerId !== event.pointerId) {
        return;
      }
      if (dragState.moved) {
        clampFloatPosition();
        saveFloatPosition();
        suppressClick = true;
        // 面板已打开时，让面板跟随数字人到新位置。
        if (window.tbeaAssistant && window.tbeaAssistant.syncPanel) {
          window.tbeaAssistant.syncPanel();
        }
      }
      dragState = null;
      floatRoot.classList.remove("is-dragging");
      try {
        floatRoot.releasePointerCapture(event.pointerId);
      } catch (error) {
        // 释放指针捕获失败时忽略。
      }
    }

    floatRoot.addEventListener("pointerup", finishDrag);
    floatRoot.addEventListener("pointercancel", finishDrag);
  }

  /* 拖动结束后把数字人限制在屏幕范围内，避免拖出屏幕。 */
  function clampFloatPosition() {
    var rect = floatRoot.getBoundingClientRect();
    var maxLeft = Math.max(0, window.innerWidth - rect.width);
    var maxTop = Math.max(0, window.innerHeight - rect.height);
    var left = Math.min(Math.max(rect.left, 0), maxLeft);
    var top = Math.min(Math.max(rect.top, 0), maxTop);
    if (left !== rect.left || top !== rect.top) {
      floatRoot.style.left = left + "px";
      floatRoot.style.top = top + "px";
    }
  }

  /* 记住上次拖动的位置，刷新页面后数字人仍停留在原处，避免遮挡文字。 */
  function saveFloatPosition() {
    try {
      var rect = floatRoot.getBoundingClientRect();
      window.localStorage.setItem(
        "tbeaDigitalHumanPos",
        JSON.stringify({ left: rect.left, top: rect.top })
      );
    } catch (error) {
      // 保存失败时忽略。
    }
  }

  function loadFloatPosition() {
    try {
      var saved = window.localStorage.getItem("tbeaDigitalHumanPos");
      if (!saved) {
        return;
      }
      var pos = JSON.parse(saved);
      if (typeof pos.left === "number" && typeof pos.top === "number") {
        floatRoot.style.left = pos.left + "px";
        floatRoot.style.top = pos.top + "px";
        floatRoot.style.right = "auto";
        floatRoot.style.bottom = "auto";
        clampFloatPosition();
      }
    } catch (error) {
      // 读取失败时保持默认位置。
    }
  }

  function createSdkOptions() {
    return {
      containerId: "#digital-human-sdk",
      appId: "b2dcde1d095b40f49a7ec02e419b829b",
      appSecret: "3595ee00ead3413c8f9ffe7f7b1f7a82",
      gatewayServer: "https://nebula-agent.xingyun3d.com/user/v1/ttsa/session",
      hardwareAcceleration: "prefer-hardware",
      onMessage: function (message) {
        if (!message) {
          return;
        }
        // 10003 会话错误；10005 账号并发数已满。
        if (message.code === 10003 || message.code === 10005) {
          scheduleRetry();
        }
      },
      onStatusChange: function (status) {
        // 0 在线，1 离线。
        if (status === 0) {
          sdkReady = true;
          retryCount = 0;
          setLabel("数字人助手");
        }
      },
      onStartSessionWarning: function (message) {
        console.warn("数字人会话警告：", message);
      },
      enableLogger: false
    };
  }

  function start() {
    if (sdk || initialized) {
      return;
    }
    if (!window.XmovAvatar) {
      setLabel("数字人加载失败，点击仍可聊天");
      return;
    }
    if (!isSupportedEnvironment()) {
      setLabel("当前环境不支持数字人");
      return;
    }
    initialized = true;
    stopWatchdog();
    startWatchdog();
    try {
      sdk = new window.XmovAvatar(createSdkOptions());
      sdk.init({
        initModel: "normal",
        onDownloadProgress: function (progress) {
          var value = Math.round(progress);
          if (value >= 100) {
            sdkReady = true;
            retryCount = 0;
            setLabel("数字人助手");
          } else {
            setLabel("数字人加载中 " + value + "%");
          }
        }
      });
    } catch (error) {
      initialized = false;
      setLabel("数字人加载失败，点击仍可聊天");
    }
  }

  function speak(text) {
    if (sdk && text) {
      try {
        sdk.speak(text, true, true);
      } catch (error) {
        console.warn("数字人说话失败：", error);
      }
    }
  }

  function isActive() {
    return !!sdk;
  }

  /* 会话失败（如并发数已满）时，延迟后销毁重试，最多重试 3 次。 */
  function scheduleRetry() {
    if (retryCount >= 3) {
      setLabel("数字人连接数已满，请稍后刷新页面重试");
      return;
    }
    retryCount += 1;
    setLabel("数字人连接数已满，稍后自动重试…");
    if (retryTimer) {
      window.clearTimeout(retryTimer);
    }
    retryTimer = window.setTimeout(function () {
      if (sdk) {
        try {
          sdk.destroy();
        } catch (error) {
          // 忽略销毁异常。
        }
        sdk = null;
      }
      initialized = false;
      start();
    }, 20000);
  }

  /* 看门狗：初始化一段时间后仍未就绪，销毁重试一次，避免卡死。 */
  function startWatchdog() {
    if (watchdogTimer) {
      window.clearTimeout(watchdogTimer);
    }
    watchdogTimer = window.setTimeout(function () {
      if (!sdkReady && sdk) {
        retryCount += 1;
        if (retryCount >= 3) {
          setLabel("数字人加载超时，请稍后刷新页面重试");
          return;
        }
        try {
          sdk.destroy();
        } catch (error) {
          // 忽略销毁异常。
        }
        sdk = null;
        initialized = false;
        start();
      }
    }, 60000);
  }

  function stopWatchdog() {
    if (watchdogTimer) {
      window.clearTimeout(watchdogTimer);
      watchdogTimer = null;
    }
  }

  window.tbeaDigitalHuman = {
    start: start,
    speak: speak,
    isActive: isActive,
    destroy: function () {
      if (sdk) {
        try {
          sdk.destroy();
        } catch (error) {
          // 销毁失败时忽略。
        }
        sdk = null;
      }
      initialized = false;
      sdkReady = false;
      if (retryTimer) {
        window.clearTimeout(retryTimer);
        retryTimer = null;
      }
      stopWatchdog();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      buildFloat();
      loadFloatPosition();
      start();
    });
  } else {
    buildFloat();
    loadFloatPosition();
    start();
  }

  /* 页面隐藏/关闭/刷新时销毁会话，释放账号并发名额。 */
  function releaseSession() {
    if (window.tbeaDigitalHuman) {
      window.tbeaDigitalHuman.destroy();
    }
  }
  window.addEventListener("beforeunload", releaseSession);
  window.addEventListener("pagehide", releaseSession);
})();
