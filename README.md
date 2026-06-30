# Ryanzr Blog Starter

这是一个给 `ryanzr.com` 准备的双语个人博客最小骨架。

- 技术：Astro
- 内容：Markdown
- 代码：GitHub
- 部署：Cloudflare Pages
- 中文：默认路径，例如 `/writing/start-public-notes/`
- 英文：`/en/` 路径，例如 `/en/writing/start-public-notes/`
- 中文文章：原生手写
- 英文文章：AI 翻译，并在文章页标注

## 1. 本地运行

先安装 Node.js，然后在项目目录运行：

```bash
npm install
npm run dev
```

浏览器打开终端里显示的本地地址，一般是：

```text
http://localhost:4321
```

## 2. 新增一篇中文文章

在这里新建 Markdown 文件：

```text
src/content/writing/zh/your-post.md
```

示例 frontmatter：

```md
---
title: "文章标题"
description: "一句话摘要。"
pubDate: 2026-06-30
lang: "zh"
slug: "your-post"
translationKey: "your-post"
tags: ["AI", "投资"]
aiTranslated: false
---

这里写中文正文。
```

## 3. 新增对应英文 AI 翻译

在这里新建英文 Markdown 文件：

```text
src/content/writing/en/your-post.md
```

注意 `translationKey` 要和中文文章一致，这样中英文按钮才能互相跳转。

```md
---
title: "Post Title"
description: "One-sentence summary."
pubDate: 2026-06-30
lang: "en"
slug: "your-post"
translationKey: "your-post"
tags: ["AI", "Investing"]
aiTranslated: true
---

English AI-translated body goes here.
```

## 4. 推送到 GitHub

```bash
git init
git add .
git commit -m "Initial blog"
git branch -M main
git remote add origin https://github.com/你的用户名/ryanzr-blog.git
git push -u origin main
```

## 5. 部署到 Cloudflare Pages

Cloudflare Pages 设置：

- Framework preset: Astro
- Production branch: main
- Build command: `npm run build`
- Build output directory: `dist`

## 6. 绑定域名

上线后，在 Cloudflare Pages 项目里绑定：

```text
ryanzr.com
www.ryanzr.com
```

第一版可以先不备案。后续如果要优化大陆访问，再考虑中国大陆服务器/CDN和 ICP 备案。
