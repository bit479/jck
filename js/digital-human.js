/*
 * 3D 数字人（魔珐星云 具身驱动 SDK）接入脚本。
 *
 * 说明：
 * 1. 数字人以悬浮窗形式常驻网页右下角，浮于所有内容上层；
 *    点击数字人弹出语音/文本聊天窗口（由 js/llm-assistant.js 提供）。
 * 2. appId / appSecret 会随网页源码暴露，这是该 SDK 的客户端直连接入方式；
 *    正式对外发布前，请在魔珐星云平台重新生成密钥。
 * 3. SDK 仅支持 localhost 或 https 环境访问（file:// 或 http://IP 无法使用），
 *    此时悬浮窗自动回退为静态机器人头像，聊天功能仍可使用。
 */
(function () {
  "use strict";

  var sdk = null;
  var initialized = false;
  var sdkReady = false;
  var floatRoot = null;
  var sdkContainer = null;
  var fallbackImage = null;
  var labelEl = null;
  var retryCount = 0;
  var retryTimer = null;
  var watchdogTimer = null;

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

    fallbackImage = document.createElement("img");
    fallbackImage.className = "digital-human-float__fallback";
    fallbackImage.src = "assets/images/ai/ai-mascot.svg";
    fallbackImage.alt = "";
    fallbackImage.draggable = false;

    avatar.appendChild(sdkContainer);
    avatar.appendChild(fallbackImage);

    labelEl = document.createElement("span");
    labelEl.className = "digital-human-float__label";
    labelEl.textContent = "数字人助手";

    floatRoot.appendChild(avatar);
    floatRoot.appendChild(labelEl);
    document.body.appendChild(floatRoot);

    floatRoot.addEventListener("click", function () {
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
            if (fallbackImage) {
              fallbackImage.style.display = "none";
            }
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
      start();
    });
  } else {
    buildFloat();
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
