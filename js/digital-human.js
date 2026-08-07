/*
 * 3D 数字人（魔珐星云 具身驱动 SDK）接入脚本。
 *
 * 注意：
 * 1. appId / appSecret 会随网页源码暴露，这是该 SDK 的客户端直连接入方式；
 *    正式对外发布前，请在魔珐星云平台重新生成密钥。
 * 2. SDK 仅支持 localhost 或 https 环境访问（file:// 或 http://IP 无法使用）。
 * 3. 数字人页面被打开时自动初始化；初始化会下载角色资源，需要联网。
 */
(function () {
  "use strict";

  var sdk = null;
  var initialized = false;

  /* 预设讲解问题，点击后让数字人开口。 */
  var questions = [
    {
      label: "打招呼",
      text: "大家好，欢迎来到特变电工进出口公司全球业务展示系统，很高兴为大家讲解。"
    },
    {
      label: "公司介绍",
      text: "特变电工进出口公司是特变电工集团负责全球化经营的核心平台，深耕海外市场近三十年，业务覆盖全球七十余个国家和地区。"
    },
    {
      label: "海外项目建设",
      text: "公司以输变电 EPC 总包为核心，在塔吉克斯坦、吉尔吉斯斯坦、埃塞俄比亚、肯尼亚、赞比亚等国家持续建设电力基础设施。"
    },
    {
      label: "海外矿业开发",
      text: "公司在塔吉克斯坦开展金矿资源开发，上库马尔克和东杜奥巴两个矿区已形成稳定运营能力。"
    },
    {
      label: "双千亿计划",
      text: "面向十五五，公司正加快向双千亿级企业迈进，持续推进海外成套项目建设与矿产资源开发。"
    }
  ];

  function setStatus(text) {
    var el = document.getElementById("digital-human-status");
    if (el) {
      el.textContent = text || "";
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

  function createSdkOptions() {
    return {
      containerId: "#digital-human-sdk",
      appId: "b2dcde1d095b40f49a7ec02e419b829b",
      appSecret: "3595ee00ead3413c8f9ffe7f7b1f7a82",
      gatewayServer: "https://nebula-agent.xingyun3d.com/user/v1/ttsa/session",
      hardwareAcceleration: "prefer-hardware",
      onMessage: function (message) {
        if (message && message.code === 10001) {
          setStatus("数字人容器不存在，请检查页面结构。");
        }
      },
      onStatusChange: function (status) {
        // 0 在线，1 离线；只提示一次就绪状态。
        if (status === 0) {
          setStatus("数字人已就绪，点击下方问题让她开口吧。");
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
      setStatus("数字人 SDK 加载失败，请检查网络后重试。");
      return;
    }
    if (!isSupportedEnvironment()) {
      setStatus("数字人需要在 localhost 或 https 环境下运行，当前环境不支持。");
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
            setStatus("数字人已就绪，点击下方问题让她开口吧。");
          } else {
            setStatus("数字人资源加载中 " + value + "%");
          }
        }
      });
    } catch (error) {
      initialized = false;
      setStatus(
        "数字人初始化失败：" +
          (error && error.message ? error.message : "未知错误")
      );
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

  function buildQuestions() {
    var wrap = document.getElementById("digital-human-questions");
    if (!wrap) {
      return;
    }
    questions.forEach(function (item) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "digital-human-question";
      button.textContent = item.label;
      button.addEventListener("click", function () {
        speak(item.text);
      });
      wrap.appendChild(button);
    });
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
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      buildQuestions();
    });
  } else {
    buildQuestions();
  }

  window.addEventListener("beforeunload", function () {
    if (window.tbeaDigitalHuman) {
      window.tbeaDigitalHuman.destroy();
    }
  });
})();
