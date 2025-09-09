# GPTImageMini 部署指南

## 快速部署到Vercel

### 1. 准备工作
1. 注册 [RapidAPI](https://rapidapi.com) 账号
2. 订阅 NanoBanana API（免费套餐）
3. 获取 RapidAPI Key

### 2. Vercel部署
1. Fork 或 clone 这个仓库
2. 连接到 [Vercel](https://vercel.com)
3. 导入项目
4. 配置环境变量：
   ```
   RAPIDAPI_KEY=你的rapidapi密钥
   RAPIDAPI_HOST=nanobanna-api.p.rapidapi.com
   NEXT_PUBLIC_APP_URL=https://gptimagemini.online
   ```

### 3. 域名配置
1. 在 GoDaddy 购买 gptimagemini.online 域名
2. 在 Vercel 项目设置中添加自定义域名
3. 配置 DNS 记录指向 Vercel

### 4. Cloudflare 设置
1. 添加域名到 Cloudflare
2. 设置 DNS 代理
3. 配置缓存规则：
   - 静态资源缓存 1 年
   - HTML 缓存 1 小时
4. 启用 Brotli 压缩
5. 开启 Auto Minify

## 环境变量说明

- `RAPIDAPI_KEY`: RapidAPI 密钥，用于调用 NanoBanana API
- `RAPIDAPI_HOST`: API 主机地址
- `NEXT_PUBLIC_APP_URL`: 网站公开 URL，用于 SEO 和分享

## 性能优化

### Core Web Vitals 目标
- LCP < 2.5s
- FID < 100ms  
- CLS < 0.1

### 优化措施
1. 图片懒加载
2. CDN 加速
3. 代码分割
4. 预加载关键资源

## 监控和分析

推荐工具：
- Vercel Analytics
- Google Search Console
- Google Analytics 4
- Core Web Vitals 监控

## API 迁移计划

当 OpenAI 发布官方 GPTImageMini API 时：

1. 更新 API 集成代码
2. 修改环境变量
3. 测试新 API
4. 无缝切换

## 成本预算

### 免费阶段
- Vercel: 免费套餐
- Cloudflare: 免费套餐
- RapidAPI: 免费请求额度

### 付费阶段（流量增长后）
- 域名: $12/年
- Vercel Pro: $20/月
- Cloudflare Pro: $20/月
- API 调用费用: 按使用量

## SEO 策略

### 关键词布局
1. 主关键词：GPTImageMini
2. 长尾词：free ai image generator, text to image
3. 多语言关键词优化

### 内容策略
1. 每种语言独立优化
2. 本地化搜索意图
3. 快速上线抢占先机

## 法律合规

1. 添加使用条款
2. 隐私政策
3. 免责声明：非 OpenAI 官方产品
4. GDPR 合规（欧盟用户）