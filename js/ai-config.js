/* ============================================================
   AI 配置（DeepSeek）
   把 apiKey 换成你自己的 Key 即可启用真 AI；
   留空 "" 则自动使用本地知识库模拟模式（离线可用）。
   注意：纯前端作业中 Key 会随页面文件保存，请勿将本文件
   上传公网；建议给 Key 设置额度上限，答辩结束后可重置。
   ============================================================ */
window.AI_CONFIG = {
  provider: 'deepseek',
  apiKey: '',                                   // ← 填入 DeepSeek Key（sk- 开头）即启用真 AI；留空 = 本地知识库模式
  baseUrl: 'https://api.deepseek.com',          // DeepSeek 官方接口，不要改
  model: 'deepseek-chat'                        // 也可换 deepseek-reasoner
};
