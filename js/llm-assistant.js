/*
 * 网页语音助手：右下角悬浮按钮。
 * 支持两种提问方式：
 * 1. 打字提问：输入问题后点“发送”。
 * 2. 语音提问：点麦克风按钮说话，识别成功后自动发送。
 * 大模型会根据 js/data.js 里的网页资料回答，回答默认用语音朗读，
 * 可在面板右上角关闭朗读。
 */
(function () {
  "use strict";

  var voiceEnabled = true;
  var recognition = null;
  var waiting = false;
  var statusTimer = null;
  var fabDragged = false;

  /* ==================== 页面结构 ==================== */
  function createAssistantUI() {
    var root = document.createElement("div");
    var fab = document.createElement("button");
    var panel = document.createElement("section");
    var header = document.createElement("header");
    var title = document.createElement("strong");
    var headerActions = document.createElement("div");
    var voiceToggle = document.createElement("button");
    var closeButton = document.createElement("button");
    var messages = document.createElement("div");
    var status = document.createElement("p");
    var inputRow = document.createElement("div");
    var question = document.createElement("input");
    var micButton = document.createElement("button");
    var sendButton = document.createElement("button");

    root.id = "llm-assistant";
    root.className = "llm-assistant";
    fab.id = "llm-assistant-open";
    fab.className = "llm-assistant__fab";
    fab.type = "button";
    fab.setAttribute("aria-label", "打开网页语音助手");
    fab.textContent = "AI";

    panel.id = "llm-assistant-panel";
    panel.className = "llm-assistant__panel";
    panel.hidden = true;
    panel.setAttribute("aria-label", "网页语音助手");

    header.className = "llm-assistant__header";
    title.textContent = "网页语音助手";
    headerActions.className = "llm-assistant__header-actions";

    voiceToggle.id = "llm-assistant-voice-toggle";
    voiceToggle.className = "llm-assistant__voice-toggle";
    voiceToggle.type = "button";
    voiceToggle.setAttribute("aria-pressed", "true");
    voiceToggle.textContent = "朗读：开";

    closeButton.id = "llm-assistant-close";
    closeButton.className = "llm-assistant__close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "关闭语音助手");
    closeButton.textContent = "×";

    headerActions.append(voiceToggle, closeButton);
    header.append(title, headerActions);

    messages.id = "llm-assistant-messages";
    messages.className = "llm-assistant__messages";
    messages.setAttribute("role", "log");
    messages.setAttribute("aria-live", "polite");

    status.id = "llm-assistant-status";
    status.className = "llm-assistant__status";
    status.hidden = true;

    inputRow.className = "llm-assistant__input";
    question.id = "llm-assistant-question";
    question.className = "llm-assistant__question";
    question.type = "text";
    question.placeholder = "输入问题，例如：公司在塔吉克斯坦有哪些项目？";
    question.setAttribute("aria-label", "输入问题");

    micButton.id = "llm-assistant-mic";
    micButton.className = "llm-assistant__mic";
    micButton.type = "button";
    micButton.setAttribute("aria-label", "语音提问");
    micButton.textContent = "🎤";

    sendButton.id = "llm-assistant-send";
    sendButton.className = "llm-assistant__send";
    sendButton.type = "button";
    sendButton.textContent = "发送";

    inputRow.append(question, micButton, sendButton);
    panel.append(header, messages, status, inputRow);
    root.append(fab, panel);
    document.body.appendChild(root);

    return {
      root: root,
      fab: fab,
      panel: panel,
      voiceToggle: voiceToggle,
      closeButton: closeButton,
      messages: messages,
      status: status,
      question: question,
      micButton: micButton,
      sendButton: sendButton
    };
  }

  /* ==================== 网页资料整理 ==================== */
  function buildWebsiteContext() {
    // 科技赋能平台页面可自定义资料：
    // 在页面里定义 window.llmPlatformContext 函数并返回文字即可。
    if (typeof window.llmPlatformContext === "function") {
      var platformContext = window.llmPlatformContext();
      if (typeof platformContext === "string" && platformContext.trim()) {
        return platformContext;
      }
    }
    var data = typeof websiteData !== "undefined" ? websiteData : null;
    var parts = [];
    if (!data) {
      return "（暂无网页资料）";
    }

    if (data.siteInfo) {
      parts.push("公司名称：" + (data.siteInfo.companyName || ""));
    }

    if (data.companyProfile) {
      parts.push("【公司简介】");
      if (Array.isArray(data.companyProfile.paragraphs)) {
        data.companyProfile.paragraphs.forEach(function (paragraph) {
          parts.push("- " + paragraph);
        });
      }
      if (Array.isArray(data.companyProfile.achievements)) {
        parts.push("主要业绩与荣誉：");
        data.companyProfile.achievements.forEach(function (achievement) {
          parts.push(
            "- " +
              (achievement.value || "") +
              "：" +
              (achievement.label || "") +
              "（" +
              (achievement.description || "") +
              "）"
          );
        });
      }
    }

    if (Array.isArray(data.overseasProjects)) {
      parts.push("【海外项目建设】");
      data.overseasProjects.forEach(function (country) {
        parts.push("- " + (country.countryName || "") + "：" + (country.overview || ""));
        if (Array.isArray(country.projects)) {
          country.projects.forEach(function (project) {
            parts.push(
              "  * " +
                (project.projectName || "") +
                "：" +
                (project.description || "")
            );
          });
        }
      });
    }

    if (data.overseasMining) {
      var mining = data.overseasMining;
      parts.push("【海外矿业开发】");
      parts.push(
        "- " +
          (mining.countryName || "") +
          (mining.heroTitle || "") +
          "：" +
          (mining.overview || "")
      );
      if (Array.isArray(mining.summaryMetrics)) {
        mining.summaryMetrics.forEach(function (metric) {
          parts.push(
            "- " +
              (metric.label || "") +
              "：" +
              (metric.value || "") +
              (metric.unit || "")
          );
        });
      }
      if (Array.isArray(mining.projects)) {
        mining.projects.forEach(function (project) {
          parts.push(
            "- " +
              (project.name || "") +
              "：" +
              (project.investment || "") +
              "，" +
              (project.description || "")
          );
        });
      }
    }

    if (Array.isArray(data.futureOutlook)) {
      parts.push("【双千亿计划】");
      data.futureOutlook.forEach(function (country) {
        parts.push("- " + (country.countryName || "") + "：" + (country.summary || ""));
      });
    }

    if (data.techEmpowerment && Array.isArray(data.techEmpowerment.cards)) {
      parts.push("【科技赋能】");
      data.techEmpowerment.cards.forEach(function (card) {
        parts.push("- " + (card.title || "") + "：" + (card.summary || ""));
      });
    }

    return parts.join("\n");
  }

  /* ==================== 大模型问答 ==================== */
  function askLlm(questionText) {
    var config = typeof llmConfig !== "undefined" ? llmConfig : null;
    if (!config || !config.apiKey || !config.endpoint) {
      return Promise.reject(
        new Error("语音助手未配置，请检查 js/llm-config.js 中的密钥和模型。")
      );
    }
    var context = buildWebsiteContext();
    var systemPrompt =
      "你是「特变电工进出口公司」官方网站的智能助手。请只依据下面提供的网页资料回答用户问题，" +
      "回答用简体中文，简洁清楚。如果资料里没有相关信息，请如实说明“网页资料中没有相关内容”。\n\n" +
      "===== 网页资料开始 =====\n" +
      context +
      "\n===== 网页资料结束 =====";

    return fetch(config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + config.apiKey
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: questionText }
        ],
        max_tokens: config.maxTokens,
        stream: false
      })
    })
      .then(function (response) {
        if (!response.ok) {
          return response
            .json()
            .then(function (errorData) {
              var message =
                errorData &&
                errorData.error &&
                errorData.error.message
                  ? errorData.error.message
                  : "接口返回错误 " + response.status;
              throw new Error(message);
            })
            .catch(function (parseError) {
              if (parseError instanceof Error) {
                throw parseError;
              }
              throw new Error("接口返回错误 " + response.status);
            });
        }
        return response.json();
      })
      .then(function (json) {
        var choice = json && json.choices && json.choices[0];
        var message = choice && choice.message;
        var answer =
          message && message.content ? message.content.trim() : "";
        if (!answer) {
          answer = "抱歉，没有获取到回答内容，请重试。";
        }
        return answer;
      });
  }

  /* ==================== 消息展示与朗读 ==================== */
  function appendMessage(text, role) {
    var ui = getUI();
    var row = document.createElement("div");
    var bubble = document.createElement("div");
    row.className =
      "llm-assistant__message llm-assistant__message--" + role;
    bubble.className = "llm-assistant__bubble";
    bubble.textContent = text;
    row.appendChild(bubble);
    ui.messages.appendChild(row);
    ui.messages.scrollTop = ui.messages.scrollHeight;
  }

  function setStatus(text) {
    var ui = getUI();
    ui.status.textContent = text || "";
    ui.status.hidden = !text;
    if (statusTimer) {
      window.clearTimeout(statusTimer);
      statusTimer = null;
    }
  }

  function speakText(text) {
    if (!voiceEnabled || !window.speechSynthesis) {
      return;
    }
    window.speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 1;
    var voices = window.speechSynthesis.getVoices();
    var zhVoice = null;
    voices.forEach(function (voice) {
      if (!zhVoice && /zh|cmn|chinese/i.test(voice.lang + " " + voice.name)) {
        zhVoice = voice;
      }
    });
    if (zhVoice) {
      utterance.voice = zhVoice;
    }
    window.speechSynthesis.speak(utterance);
  }

  /* ==================== 语音识别 ==================== */
  function createRecognition() {
    var SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      return null;
    }
    var instance = new SpeechRecognitionClass();
    instance.lang = "zh-CN";
    instance.interimResults = false;
    instance.maxAlternatives = 1;
    instance.onresult = function (event) {
      var transcript = "";
      for (var i = 0; i < event.results.length; i++) {
        var result = event.results[i];
        if (result[0] && result[0].transcript) {
          transcript += result[0].transcript;
        }
      }
      var ui = getUI();
      ui.question.value = transcript;
      setStatus("");
      if (transcript.trim()) {
        sendQuestion();
      }
    };
    instance.onerror = function (event) {
      setStatus(
        "语音识别失败（" +
          (event.error || "未知错误") +
          "），请直接打字提问。"
      );
    };
    instance.onend = function () {
      var ui = getUI();
      ui.micButton.classList.remove("is-listening");
    };
    return instance;
  }

  function toggleListening() {
    var ui = getUI();
    if (!recognition) {
      setStatus("当前浏览器不支持语音识别，请直接打字提问。");
      return;
    }
    if (ui.micButton.classList.contains("is-listening")) {
      recognition.stop();
      ui.micButton.classList.remove("is-listening");
      return;
    }
    try {
      recognition.start();
      ui.micButton.classList.add("is-listening");
      setStatus("请开始说话…");
    } catch (error) {
      setStatus("语音识别启动失败，请直接打字提问。");
    }
  }

  /* ==================== 提问流程 ==================== */
  function sendQuestion() {
    var ui = getUI();
    var questionText = ui.question.value.trim();
    if (!questionText || waiting) {
      return;
    }
    ui.question.value = "";
    appendMessage(questionText, "user");
    waiting = true;
    ui.sendButton.disabled = true;
    setStatus("正在思考…");

    askLlm(questionText)
      .then(function (answer) {
        appendMessage(answer, "assistant");
        speakText(answer);
        setStatus("");
      })
      .catch(function (error) {
        var message =
          "请求失败：" +
          (error && error.message ? error.message : "未知错误") +
          "。请检查网络、密钥和余额。";
        appendMessage(message, "assistant");
        setStatus("");
      })
      .finally(function () {
        waiting = false;
        ui.sendButton.disabled = false;
        ui.question.focus();
      });
  }

  /* ==================== 事件绑定 ==================== */
  var assistantUI = null;
  function getUI() {
    if (!assistantUI) {
      assistantUI = createAssistantUI();
      bindEvents();
    }
    return assistantUI;
  }

  function bindEvents() {
    var ui = assistantUI;
    ui.fab.addEventListener("click", function () {
      // 拖动结束后浏览器会补发一次 click，这里吞掉，避免误开面板。
      if (fabDragged) {
        fabDragged = false;
        return;
      }
      ui.panel.hidden = !ui.panel.hidden;
      if (!ui.panel.hidden) {
        ui.question.focus();
      }
    });
    ui.closeButton.addEventListener("click", function () {
      ui.panel.hidden = true;
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    });
    ui.voiceToggle.addEventListener("click", function () {
      voiceEnabled = !voiceEnabled;
      ui.voiceToggle.textContent = voiceEnabled ? "朗读：开" : "朗读：关";
      ui.voiceToggle.setAttribute("aria-pressed", String(voiceEnabled));
      if (!voiceEnabled && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    });
    ui.sendButton.addEventListener("click", sendQuestion);
    ui.question.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        sendQuestion();
      }
    });
    ui.micButton.addEventListener("click", toggleListening);
  }

  /* ==================== AI 按钮可拖动 ==================== */
  function enableDraggableFab(fab, root, panel) {
    var dragging = false;
    var moved = false;
    var startX = 0;
    var startY = 0;
    var startLeft = 0;
    var startTop = 0;

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function moveFabTo(left, top) {
      var rect = fab.getBoundingClientRect();
      var viewportWidth = window.innerWidth;
      var viewportHeight = window.innerHeight;
      left = clamp(left, 8, viewportWidth - rect.width - 8);
      top = clamp(top, 8, viewportHeight - rect.height - 8);
      root.style.left = Math.round(left) + "px";
      root.style.top = Math.round(top) + "px";
      root.style.right = "auto";
      root.style.bottom = "auto";
      root.style.alignItems = "flex-start";
    }

    function snapFabToEdge() {
      var rect = fab.getBoundingClientRect();
      var viewportWidth = window.innerWidth;
      var viewportHeight = window.innerHeight;
      var left = clamp(rect.left, 8, viewportWidth - rect.width - 8);
      var top = clamp(rect.top, 8, viewportHeight - rect.height - 8);
      var side = left + rect.width / 2 < viewportWidth / 2 ? "left" : "right";

      // 垂直位置保留拖动结果，用 bottom 锚定，面板打开时向上展开。
      root.style.top = "auto";
      root.style.bottom = Math.round(viewportHeight - top - rect.height) + "px";

      if (side === "left") {
        root.style.left = Math.round(left) + "px";
        root.style.right = "auto";
        root.style.alignItems = "flex-start";
      } else {
        root.style.right = Math.round(viewportWidth - left - rect.width) + "px";
        root.style.left = "auto";
        root.style.alignItems = "flex-end";
      }
    }

    fab.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }
      // 面板打开时不进入拖动，交由点击收起面板。
      if (!panel.hidden) {
        return;
      }
      var rect = fab.getBoundingClientRect();
      dragging = true;
      moved = false;
      startX = event.clientX;
      startY = event.clientY;
      startLeft = rect.left;
      startTop = rect.top;
      if (typeof fab.setPointerCapture === "function") {
        fab.setPointerCapture(event.pointerId);
      }
    });

    fab.addEventListener("pointermove", function (event) {
      if (!dragging) {
        return;
      }
      var dx = event.clientX - startX;
      var dy = event.clientY - startY;
      if (!moved && Math.abs(dx) < 5 && Math.abs(dy) < 5) {
        return;
      }
      moved = true;
      fab.classList.add("is-dragging");
      moveFabTo(startLeft + dx, startTop + dy);
    });

    function finishDrag(event) {
      if (!dragging) {
        return;
      }
      dragging = false;
      fab.classList.remove("is-dragging");
      if (moved) {
        fabDragged = true;
        snapFabToEdge();
      }
      if (typeof fab.releasePointerCapture === "function") {
        try {
          fab.releasePointerCapture(event.pointerId);
        } catch (error) {
          // 指针捕获已释放时忽略异常。
        }
      }
    }

    fab.addEventListener("pointerup", finishDrag);
    fab.addEventListener("pointercancel", finishDrag);
  }

  /* 页面加载完成后初始化，避免影响既有脚本。 */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      getUI();
      recognition = createRecognition();
      enableDraggableFab(getUI().fab, getUI().root, getUI().panel);
    });
  } else {
    getUI();
    recognition = createRecognition();
    enableDraggableFab(getUI().fab, getUI().root, getUI().panel);
  }
})();
