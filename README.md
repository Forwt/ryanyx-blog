# Ryanzr Blog

这是 Ryan 的个人双语博客，部署在 Cloudflare Pages。

线上地址：

```text
https://ryanyx-blog.pages.dev/
```

## 页面结构

中文默认：

- `/`
- `/writing/`
- `/projects/`
- `/about/`
- `/resume/`

英文：

- `/en/`
- `/en/writing/`
- `/en/projects/`
- `/en/about/`
- `/en/resume/`

## 写一篇新中文文章

在这个文件夹里新建一个 Markdown 文件：

```text
src/content/writing/
```

例如：

```text
src/content/writing/zh-my-first-post.md
```

文件开头这样写：

```md
---
title: "文章标题"
description: "一句话摘要。"
pubDate: 2026-06-30
lang: "zh"
slug: "zh-my-first-post"
routeSlug: "my-first-post"
translationKey: "my-first-post"
tags: ["AI", "投资"]
aiTranslated: false
---

这里写正文。
```

保存后，这篇文章会出现在：

```text
/writing/my-first-post/
```

## 写对应英文文章

在同一个文件夹里新建英文文件：

```text
src/content/writing/en-my-first-post.md
```

英文文章开头这样写：

```md
---
title: "Post Title"
description: "One-sentence summary."
pubDate: 2026-06-30
lang: "en"
slug: "en-my-first-post"
routeSlug: "my-first-post"
translationKey: "my-first-post"
tags: ["AI", "Investing"]
aiTranslated: true
---

English body goes here.
```

注意这三项中英文要一致：

- `routeSlug`
- `translationKey`
- `pubDate`

`slug` 是内部名字，建议加 `zh-` 和 `en-` 前缀；`routeSlug` 是公开网址里的名字。

## 修改页面文字

常用页面位置：

- 首页：`src/pages/index.astro`
- 英文首页：`src/pages/en/index.astro`
- 项目页：`src/pages/projects.astro`
- 关于页：`src/pages/about.astro`
- 简历页：`src/pages/resume.astro`

英文页面都在 `src/pages/en/` 里面。

## 修改颜色和排版

主要改这个文件：

```text
src/styles/global.css
```

不需要改数据库，也没有后台系统。

## 本地预览

安装依赖：

```bash
npm install
```

启动预览：

```bash
npm run dev
```

生成上线文件：

```bash
npm run build
```

## Cloudflare Pages 设置

请保持：

- Build command：`npm run build`
- Build output directory：`dist`
- Root directory：`/`

不要添加 `wrangler deploy`，也不要把项目改成 Worker。
