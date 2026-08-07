/*
 * 语音助手配置（大模型接口）。
 *
 * 注意：
 * 1. 这里的密钥会随网页一起暴露给所有访问者，任何人查看网页源码都能看到。
 *    仅供内部演示使用；正式对外发布前，请到 DeepSeek 后台作废该密钥并重新生成。
 * 2. 每次提问都会按 token 计费，密钥余额不足时页面会提示错误。
 * 3. 语音识别使用硅基流动的 SenseVoiceSmall 免费模型，密钥同样会暴露在网页源码中。
 */
const llmConfig = {
  // 接口地址：DeepSeek 兼容 OpenAI 格式，一般不用修改。
  endpoint: "https://api.deepseek.com/v1/chat/completions",
  // 密钥：在 https://platform.deepseek.com 后台获取。
  apiKey: "sk-64cd867004bc41479eae99b321348d4e",
  // 模型：deepseek-v4-flash 更快更省，deepseek-v4-pro 更强更贵。
  model: "deepseek-v4-flash",
  // 单次回答最大长度（含模型思考内容），不足时可适当调大。
  maxTokens: 1024,
  // 语音识别：硅基流动 SenseVoiceSmall（免费，国内可直连）。
  // 浏览器自带语音识别依赖 Google/微软云端服务，国内网络经常报 network 失败，
  // 因此改为直接调用硅基流动的免费接口。密钥在 https://cloud.siliconflow.cn 获取。
  asrEndpoint: "https://api.siliconflow.cn/v1/audio/transcriptions",
  asrModel: "FunAudioLLM/SenseVoiceSmall",
  asrApiKey: "sk-sytzaziaxzreuadqvzznliicxfirdjpunmsdtzlhjlqtzizf"
};
