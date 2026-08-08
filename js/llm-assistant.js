/*
 * 网页语音助手：右下角悬浮按钮。
 * 支持两种提问方式：
 * 1. 打字提问：输入问题后点“发送”。
 * 2. 语音提问：点麦克风按钮开始录音，再点一次结束并自动识别发送。
 * 大模型会根据 js/data.js 里的网页资料回答，回答默认用语音朗读，
 * 可在面板右上角关闭朗读。
 */
(function () {
  "use strict";

  var voiceEnabled = true;
  var waiting = false;
  var statusTimer = null;
  var micStream = null;
  var micContext = null;
  var micGain = null;
  var micProcessor = null;
  var micSource = null;
  var micChunks = [];
  var micRecording = false;
  var micAutoStopTimer = null;

  /* ==================== 页面结构 ==================== */
  function createAssistantUI() {
    var root = document.createElement("div");
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

    panel.id = "llm-assistant-panel";
    panel.className = "llm-assistant__panel";
    panel.hidden = true;
    panel.setAttribute("aria-label", "数字人助手聊天窗口");

    header.className = "llm-assistant__header";
    title.textContent = "数字人助手";
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
    root.append(panel);
    document.body.appendChild(root);

    return {
      root: root,
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

  /* ==================== 大模型问答（流式输出） ==================== */
  function askLlm(questionText, onDelta) {
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

    var messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: questionText }
    ];

    function request(stream) {
      return fetch(config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + config.apiKey
        },
        body: JSON.stringify({
          model: config.model,
          messages: messages,
          max_tokens: config.maxTokens,
          stream: stream
        })
      });
    }

    function parseError(response) {
      return response
        .json()
        .then(function (errorData) {
          var message =
            errorData && errorData.error && errorData.error.message
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

    return request(true)
      .then(function (response) {
        if (!response.ok) {
          return parseError(response);
        }
        // 浏览器不支持流式读取时，降级为一次性获取完整回答。
        if (!response.body || !response.body.getReader) {
          return request(false)
            .then(function (plainResponse) {
              if (!plainResponse.ok) {
                return parseError(plainResponse);
              }
              return plainResponse.json();
            })
            .then(function (json) {
              var choice = json && json.choices && json.choices[0];
              var message = choice && choice.message;
              return message && message.content ? message.content.trim() : "";
            });
        }
        return readStreamResponse(response, onDelta);
      })
      .then(function (answer) {
        return answer || "抱歉，没有获取到回答内容，请重试。";
      });
  }

  /* 读取流式响应（SSE），把增量文字交给 onDelta 实时显示。 */
  function readStreamResponse(response, onDelta) {
    var reader = response.body.getReader();
    var decoder = new TextDecoder("utf-8");
    var buffer = "";
    var fullText = "";

    function consume(text) {
      buffer += text;
      var lines = buffer.split("\n");
      buffer = lines.pop();
      lines.forEach(function (line) {
        var trimmed = line.trim();
        if (!trimmed || trimmed.indexOf("data:") !== 0) {
          return;
        }
        var payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") {
          return;
        }
        var json;
        try {
          json = JSON.parse(payload);
        } catch (error) {
          return;
        }
        if (json.error) {
          throw new Error(json.error.message || "接口返回错误");
        }
        var delta =
          json.choices &&
          json.choices[0] &&
          json.choices[0].delta &&
          json.choices[0].delta.content;
        if (typeof delta === "string" && delta) {
          fullText += delta;
          if (onDelta) {
            onDelta(delta);
          }
        }
      });
    }

    return new Promise(function (resolve, reject) {
      function pump() {
        reader
          .read()
          .then(function (result) {
            if (result.done) {
              consume("");
              resolve(fullText);
              return;
            }
            consume(decoder.decode(result.value, { stream: true }));
            pump();
          })
          .catch(reject);
      }
      pump();
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

  /* ==================== 流式朗读（边输出边读） ==================== */
  var liveSpeech = {
    first: true,  // 是否还没朗读过任何句子
    ended: false, // 是否已发出结束标记
    buffer: ""    // 尚未成句、等待朗读的文字
  };

  function isDigitalHumanActive() {
    return !!(window.tbeaDigitalHuman && window.tbeaDigitalHuman.isActive());
  }

  /* 新问题开始时：停止上一次朗读，重置流式朗读状态。 */
  function resetLiveSpeech() {
    liveSpeech.first = true;
    liveSpeech.ended = false;
    liveSpeech.buffer = "";
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  /* 按句子结束符切分文本，返回完整句子列表和剩余未成句部分。 */
  function extractSentences(text) {
    var list = [];
    var start = 0;
    for (var i = 0; i < text.length; i++) {
      if ("。！？…!?；;\n".indexOf(text.charAt(i)) !== -1) {
        list.push(text.slice(start, i + 1));
        start = i + 1;
      }
    }
    return { list: list, rest: text.slice(start) };
  }

  /* 把新收到的文字送入朗读：完整句子立即朗读，未成句的留到后面。 */
  function feedLiveSpeech(delta) {
    if (!voiceEnabled) {
      liveSpeech.buffer = "";
      return;
    }
    liveSpeech.buffer += delta || "";
    var parsed = extractSentences(liveSpeech.buffer);
    liveSpeech.buffer = parsed.rest;
    parsed.list.forEach(function (sentence) {
      speakSentence(sentence, false);
    });
  }

  /* 回答结束时：把最后一句读出来并标记结束；
     若最后一句已在流式过程中读完，则补发空结束标记让数字人正常收尾。 */
  function finishLiveSpeech() {
    if (!voiceEnabled) {
      return;
    }
    if (liveSpeech.buffer.trim()) {
      speakSentence(liveSpeech.buffer.trim(), true);
      liveSpeech.buffer = "";
    } else if (!liveSpeech.ended && !liveSpeech.first && isDigitalHumanActive()) {
      window.tbeaDigitalHuman.speak("", false, true);
      liveSpeech.ended = true;
    }
  }

  /* 朗读一个完整句子：数字人支持分段朗读，浏览器则逐句排队。 */
  function speakSentence(sentence, isLast) {
    if (!sentence) {
      return;
    }
    if (isDigitalHumanActive()) {
      // 数字人：第一段 is_start=true，最后一段 is_end=true，中间连续朗读。
      window.tbeaDigitalHuman.speak(sentence, liveSpeech.first, isLast);
      liveSpeech.first = false;
      liveSpeech.ended = isLast;
    } else {
      speakQueued(sentence);
    }
  }

  /* 浏览器朗读：逐句排队，不打断前面正在读的句子。 */
  function speakQueued(text) {
    if (!voiceEnabled || !window.speechSynthesis) {
      return;
    }
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

  /* 非流式降级时，整段朗读一次。 */
  function speakFullAnswer(text) {
    if (!text || !voiceEnabled) {
      return;
    }
    if (isDigitalHumanActive()) {
      window.tbeaDigitalHuman.speak(text, true, true);
    } else {
      speakText(text);
    }
  }

  /* ==================== 语音识别（硅基流动 SenseVoiceSmall） ==================== */
  function getAsrConfig() {
    var config = typeof llmConfig !== "undefined" ? llmConfig : null;
    if (!config || !config.asrApiKey || !config.asrEndpoint) {
      return null;
    }
    return config;
  }

  /* 释放录音相关的所有资源，不触发识别。 */
  function teardownMic() {
    micRecording = false;
    if (micAutoStopTimer) {
      window.clearTimeout(micAutoStopTimer);
      micAutoStopTimer = null;
    }
    try {
      if (micProcessor) {
        micProcessor.disconnect();
      }
      if (micSource) {
        micSource.disconnect();
      }
      if (micGain) {
        micGain.disconnect();
      }
      if (micContext && micContext.state !== "closed") {
        micContext.close();
      }
    } catch (error) {
      // 关闭音频上下文失败时忽略异常。
    }
    micProcessor = null;
    micSource = null;
    micGain = null;
    micContext = null;
    if (micStream) {
      micStream.getTracks().forEach(function (track) {
        track.stop();
      });
      micStream = null;
    }
    var ui = getUI();
    ui.micButton.classList.remove("is-listening");
  }

  function startMicRecording() {
    if (micRecording) {
      return;
    }
    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setStatus("当前浏览器不支持录音，请直接打字提问。");
      return;
    }
    setStatus("正在请求麦克风权限…");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        if (micRecording) {
          stream.getTracks().forEach(function (track) {
            track.stop();
          });
          return;
        }
        var AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) {
          stream.getTracks().forEach(function (track) {
            track.stop();
          });
          setStatus("当前浏览器不支持录音，请直接打字提问。");
          return;
        }
        micStream = stream;
        micChunks = [];
        /* 尽量以 16kHz 采样，与语音识别接口的常见输入格式一致。 */
        micContext = new AudioContextClass({ sampleRate: 16000 });
        micSource = micContext.createMediaStreamSource(stream);
        micGain = micContext.createGain();
        micGain.gain.value = 0;
        micProcessor = micContext.createScriptProcessor(4096, 1, 1);
        micProcessor.onaudioprocess = function (event) {
          var data = event.inputBuffer.getChannelData(0);
          var copy = new Float32Array(data.length);
          copy.set(data);
          micChunks.push(copy);
        };
        micSource.connect(micProcessor);
        micProcessor.connect(micGain);
        micGain.connect(micContext.destination);
        micRecording = true;
        var ui = getUI();
        ui.micButton.classList.add("is-listening");
        setStatus("正在录音，再点一次🎤结束并识别…");
        micAutoStopTimer = window.setTimeout(function () {
          if (micRecording) {
            stopMicRecording();
          }
        }, 15000);
      })
      .catch(function () {
        setStatus(
          "麦克风权限被拒绝，请在浏览器地址栏允许麦克风后重试，或直接打字提问。"
        );
      });
  }

  function stopMicRecording() {
    if (!micRecording) {
      return;
    }
    var sampleRate = micContext ? micContext.sampleRate : 16000;
    teardownMic();

    var totalLength = 0;
    micChunks.forEach(function (chunk) {
      totalLength += chunk.length;
    });
    if (totalLength === 0) {
      micChunks = [];
      setStatus("没有录到声音，请重试或直接打字提问。");
      return;
    }
    var samples = new Float32Array(totalLength);
    var offset = 0;
    micChunks.forEach(function (chunk) {
      samples.set(chunk, offset);
      offset += chunk.length;
    });
    micChunks = [];
    transcribeWithAsr(encodeWav(samples, sampleRate));
  }

  function cancelMicRecording() {
    if (!micRecording) {
      return;
    }
    teardownMic();
    micChunks = [];
  }

  /* 把 16bit 单声道 PCM 编码成 WAV 文件。 */
  function encodeWav(samples, sampleRate) {
    var bytesPerSample = 2;
    var dataSize = samples.length * bytesPerSample;
    var buffer = new ArrayBuffer(44 + dataSize);
    var view = new DataView(buffer);
    function writeString(offset, str) {
      for (var i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    }
    writeString(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * bytesPerSample, true);
    view.setUint16(32, bytesPerSample, true);
    view.setUint16(34, 8 * bytesPerSample, true);
    writeString(36, "data");
    view.setUint32(40, dataSize, true);
    var offset2 = 44;
    for (var i = 0; i < samples.length; i++) {
      var sample = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset2, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset2 += 2;
    }
    return new Blob([buffer], { type: "audio/wav" });
  }

  function transcribeWithAsr(blob) {
    var config = getAsrConfig();
    if (!config) {
      setStatus(
        "语音识别未配置，请在 js/llm-config.js 中填写语音识别 API Key。"
      );
      return;
    }
    var formData = new FormData();
    formData.append("model", config.asrModel || "FunAudioLLM/SenseVoiceSmall");
    formData.append("file", blob, "speech.wav");
    setStatus("正在识别语音…");
    fetch(config.asrEndpoint, {
      method: "POST",
      headers: { Authorization: "Bearer " + config.asrApiKey },
      body: formData
    })
      .then(function (response) {
        if (!response.ok) {
          return response.json().then(function (errorData) {
            var message =
              errorData && errorData.error && errorData.error.message
                ? errorData.error.message
                : "识别接口返回 " + response.status;
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(function (json) {
        var text = (json && json.text ? json.text : "").trim();
        if (!text) {
          setStatus("没有识别到内容，请靠近麦克风再试一次。");
          return;
        }
        var ui = getUI();
        ui.question.value = text;
        setStatus("");
        sendQuestion();
      })
      .catch(function (error) {
        setStatus(
          "语音识别失败（" +
            (error && error.message ? error.message : "未知错误") +
            "），请直接打字提问。"
        );
      });
  }

  function toggleListening() {
    if (micRecording) {
      stopMicRecording();
    } else {
      startMicRecording();
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
    resetLiveSpeech();

    var answerBubble = null;
    var fullAnswer = "";

    askLlm(questionText, function (delta) {
      if (!answerBubble) {
        answerBubble = appendAssistantBubble();
        setStatus("");
      }
      fullAnswer += delta;
      answerBubble.textContent = fullAnswer;
      ui.messages.scrollTop = ui.messages.scrollHeight;
      feedLiveSpeech(delta);
    })
      .then(function (answer) {
        if (!answerBubble) {
          answerBubble = appendAssistantBubble();
          answerBubble.textContent = answer;
          fullAnswer = answer;
        }
        /* 收尾朗读；若从未流式朗读过（旧浏览器降级），则整段朗读一次。 */
        finishLiveSpeech();
        if (liveSpeech.first) {
          speakFullAnswer(fullAnswer);
        }
        setStatus("");
      })
      .catch(function (error) {
        var message =
          "请求失败：" +
          (error && error.message ? error.message : "未知错误") +
          "。请检查网络、密钥和余额。";
        appendMessage(message, "assistant");
        resetLiveSpeech();
        setStatus("");
      })
      .finally(function () {
        waiting = false;
        ui.sendButton.disabled = false;
        ui.question.focus();
      });
  }

  /* 创建一个空的助手消息气泡，供流式回答逐字填充。 */
  function appendAssistantBubble() {
    var ui = getUI();
    var row = document.createElement("div");
    var bubble = document.createElement("div");
    row.className = "llm-assistant__message llm-assistant__message--assistant";
    bubble.className = "llm-assistant__bubble";
    row.appendChild(bubble);
    ui.messages.appendChild(row);
    ui.messages.scrollTop = ui.messages.scrollHeight;
    return bubble;
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
    ui.closeButton.addEventListener("click", function () {
      if (micRecording) {
        cancelMicRecording();
      }
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

  /* 供数字人悬浮窗调用的面板开关。 */
  function togglePanel() {
    var ui = getUI();
    ui.panel.hidden = !ui.panel.hidden;
    if (!ui.panel.hidden) {
      syncPanelToFloat(ui);
      ui.question.focus();
    }
  }

  /* 聊天面板跟随数字人：打开时在数字人旁边弹出，拖动时实时跟随。
     依次尝试 上方 → 下方 → 右侧 → 左侧，尽量不与数字人模型重叠。 */
  function syncPanelToFloat(ui) {
    var floatRoot = document.querySelector(".digital-human-float");
    if (!floatRoot) {
      return;
    }
    var floatRect = floatRoot.getBoundingClientRect();
    var panelWidth = ui.panel.offsetWidth || 420;
    var panelHeight = ui.panel.offsetHeight || 400;
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    var gap = 12;
    var margin = 8;

    // 水平：面板右缘与数字人右缘对齐，并限制在屏幕内。
    var left = floatRect.right - panelWidth;
    left = Math.min(Math.max(left, margin), Math.max(viewportWidth - panelWidth - margin, margin));

    var fitsAbove = floatRect.top - gap - panelHeight >= margin;
    var fitsBelow = floatRect.bottom + gap + panelHeight <= viewportHeight - margin;
    var fitsRight = floatRect.right + gap + panelWidth <= viewportWidth - margin;
    var fitsLeft = floatRect.left - gap - panelWidth >= margin;

    if (fitsAbove) {
      ui.root.style.left = left + "px";
      ui.root.style.right = "auto";
      ui.root.style.top = "auto";
      ui.root.style.bottom = viewportHeight - floatRect.top + gap + "px";
    } else if (fitsBelow) {
      ui.root.style.left = left + "px";
      ui.root.style.right = "auto";
      ui.root.style.bottom = "auto";
      ui.root.style.top = floatRect.bottom + gap + "px";
    } else if (fitsRight) {
      // 数字人右侧，面板顶边与数字人顶边对齐。
      ui.root.style.left = floatRect.right + gap + "px";
      ui.root.style.right = "auto";
      ui.root.style.bottom = "auto";
      ui.root.style.top =
        Math.min(Math.max(floatRect.top, margin), Math.max(viewportHeight - panelHeight - margin, margin)) +
        "px";
    } else if (fitsLeft) {
      // 数字人左侧，面板顶边与数字人顶边对齐。
      ui.root.style.left = floatRect.left - gap - panelWidth + "px";
      ui.root.style.right = "auto";
      ui.root.style.bottom = "auto";
      ui.root.style.top =
        Math.min(Math.max(floatRect.top, margin), Math.max(viewportHeight - panelHeight - margin, margin)) +
        "px";
    } else {
      // 四个方向都放不下时，放在上方并尽量收进屏幕；
      // 面板层级高于数字人（z-index 1600 > 1500），保证不会被模型遮挡。
      ui.root.style.left = left + "px";
      ui.root.style.right = "auto";
      ui.root.style.top = "auto";
      ui.root.style.bottom =
        Math.min(
          viewportHeight - floatRect.top + gap,
          viewportHeight - margin - panelHeight
        ) + "px";
    }
  }

  /* 数字人拖动过程中，若面板已打开则实时同步位置。 */
  function syncPanel() {
    var ui = getUI();
    if (!ui.panel.hidden) {
      syncPanelToFloat(ui);
    }
  }

  window.tbeaAssistant = {
    togglePanel: togglePanel,
    syncPanel: syncPanel
  };

  /* 页面加载完成后初始化，避免影响既有脚本。 */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      getUI();
    });
  } else {
    getUI();
  }
})();
