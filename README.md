# Ryanzr Blog

这是 `ryanzr.com` 的个人双语博客。

它的定位很简单：

- 中文是原文
- 英文是 AI 翻译
- 文章、项目、简历和关于页都放在这里
- 网站尽量轻、快、干净，接近 Hacker News 那种文字优先的个人主页

## 网站地址

中文：

- 首页：`/`
- 文章：`/writing/`
- 项目：`/projects/`
- 简历：`/resume/`
- 关于：`/about/`

英文：

- 首页：`/en/`
- 文章：`/en/writing/`
- 项目：`/en/projects/`
- 简历：`/en/resume/`
- 关于：`/en/about/`

## 写新文章

中文文章放这里：

```text
src/content/writing/zh/
```

英文 AI 翻译文章放这里：

```text
src/content/writing/en/
```

每篇中文文章都应该有一篇对应的英文文章。两边要保持这几项一样：

- 文件名里的英文短名一样，例如 `start-public-notes.md`
- `slug` 一样
- `translationKey` 一样
- `pubDate` 一样

中文文章开头这样写：

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
```

英文文章开头这样写：

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
```

英文页面会显示 AI translated，表示这是 AI 翻译版。

## Cloudflare Pages 设置

在 Cloudflare Pages 里请这样填：

- Build command：`npm run build`
- Build output directory：`dist`
- Root directory：`/`
- Deploy command：留空，不要填

如果 Deploy command 里填了 `npx wrangler deploy`，这个博客会在最后发布时失败。

原因很简单：这个项目是静态博客，只需要把生成好的网页文件交给 Cloudflare Pages。`npx wrangler deploy` 是另一类发布方式，这里用不上。

## 本地预览

如果你在电脑上预览，需要先安装 Node.js。然后在项目文件夹里运行：

```bash
npm install
npm run dev
```

浏览器打开终端里显示的网址，一般是：

```text
http://localhost:4321
```

## 上线前检查

上线前可以运行：

```bash
npm run build
```

如果这个命令成功，说明网站可以生成。

Cloudflare Pages 上线失败时，优先检查这四项：

- Build command 是不是 `npm run build`
- Build output directory 是不是 `dist`
- Root directory 是不是 `/`
- Deploy command 是不是空的
