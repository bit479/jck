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
        if (message && message.code === 10001) {
          setLabel("数字人容器异常，点击仍可聊天");
        }
      },
      onStatusChange: function (status) {
        // 0 在线，1 离线。
        if (status === 0) {
          sdkReady = true;
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
    try {
      sdk = new window.XmovAvatar(createSdkOptions());
      sdk.init({
        initModel: "normal",
        onDownloadProgress: function (progress) {
          var value = Math.round(progress);
          if (value >= 100) {
            sdkReady = true;
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

  window.addEventListener("beforeunload", function () {
    if (window.tbeaDigitalHuman) {
      window.tbeaDigitalHuman.destroy();
    }
  });
})();
