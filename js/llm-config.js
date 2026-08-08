/*
 * 语音助手配置（大模型接口）。
 *
 * 注意：
 * 1. 这里的密钥会随网页一起暴露给所有访问者，任何人查看网页源码都能看到。
 *    仅供内部演示使用；正式对外发布前，请到智谱开放平台作废该密钥并重新生成。
 * 2. 每次提问都会按 token 计费，密钥余额不足时页面会提示错误。
 *    智谱的 glm-4-flash 为免费模型，使用免费额度即可，适合演示。
 * 3. 语音识别使用硅基流动的 SenseVoiceSmall 免费模型，密钥同样会暴露在网页源码中。
 */
const llmConfig = {
  // 接口地址：智谱 AI 兼容 OpenAI 格式，一般不用修改。
  endpoint: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
  // 密钥：在 https://open.bigmodel.cn 后台“API 密钥”页面获取。
  // 当前留空，填入智谱密钥后即可使用。
  apiKey: "",
  // 模型：glm-4-flash 为智谱免费模型，适合演示。
  model: "glm-4-flash",
  // 单次回答最大长度（含模型思考内容），不足时可适当调大。
  maxTokens: 1024,
  // 语音识别：硅基流动 SenseVoiceSmall（免费，国内可直连）。
  // 浏览器自带语音识别依赖 Google/微软云端服务，国内网络经常报 network 失败，
  // 因此改为直接调用硅基流动的免费接口。密钥在 https://cloud.siliconflow.cn 获取。
  asrEndpoint: "https://api.siliconflow.cn/v1/audio/transcriptions",
  asrModel: "FunAudioLLM/SenseVoiceSmall",
  asrApiKey: "sk-sytzaziaxzreuadqvzznliicxfirdjpunmsdtzlhjlqtzizf"
};
