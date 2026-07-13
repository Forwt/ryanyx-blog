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
- `/research/`
- `/projects/`
- `/about/`
- `/resume/`

英文：

- `/en/`
- `/en/writing/`
- `/en/research/`
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

## 写一篇新投研报告

投研报告和普通文章分开管理。在这个文件夹中新建 Markdown：

```text
src/content/research/
```

报告需要写明研究覆盖期、公开材料数量、来源数量和核心指标，并在同一次发布中提供中文原文和完整英文版。已有范例：

```text
src/content/research/hang-seng-tech-weekly-2026-07-10.md
src/content/research/en-hang-seng-tech-weekly-2026-07-10.md
```

保存后，报告会出现在：

```text
/research/
/research/<routeSlug>/
/en/research/
/en/research/<routeSlug>/
```

中英文报告的 `routeSlug`、`translationKey` 和 `pubDate` 必须一致，`lang` 分别为 `zh`、`en`。中文原文使用 `aiTranslated: false`，英文译文使用 `aiTranslated: true`。

## 双语发布规则

任何新增或实质更新的中文公开博客页面、文章或投研报告，都必须在同一次变更中同步提供完整英文版。中文页面显示中文导航名称，英文页面显示英文导航名称；存在对应页面时必须保留语言切换入口。

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

## 页面点赞

所有页面右下角都有一个不遮挡正文的点赞按钮。累计数保存在 Cloudflare D1 中，每个浏览器对同一页面只计一次。

Cloudflare Pages 项目需要绑定一个 D1 数据库，变量名必须为：

```text
DB
```

点赞接口位于 `/api/likes`，数据表会在第一次请求时自动创建。
