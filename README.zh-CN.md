# Terence Tang · Creator Theme

[English](README.md) | **简体中文**

一个为写作、视频与个人作品打造的 Astro 主题。

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-2F3741?style=for-the-badge)](LICENSE)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/home-dark.png" />
  <img src="docs/images/home-light.png" alt="Terence Tang 主题首页，展示个人介绍与作品入口" />
</picture>

**[功能特性](#-特性)** · **[快速开始](#-本地运行)** · **[文档](#-文档)** · **[部署](#-构建与发布)**

## ✨ 特性

- [x] **个人主页与作品库** — 个人介绍、精选作品、分类筛选与分页，筛选状态保存在 URL 中。
- [x] **中英文内容** — 英文根路径、中文 `/zh/`，支持译文配对、原文回退和语言切换。
- [x] **深浅色主题** — 跟随系统偏好，也可手动切换；适配手机与桌面布局。
- [x] **Markdown 与 MDX** — 内容结构校验、目录、代码高亮与复制、表格、脚注和图片预览。
- [x] **LaTeX 数学公式** — 支持行内与块级公式，构建时生成 SVG，浏览器无需额外渲染脚本。
- [x] **Bilibili 视频与文字稿** — 支持 BV／AV 标识、完整视频链接及分集；短链接提供外部观看入口。
- [x] **全文搜索与内容发现** — Pagefind 静态搜索、标签、归档和分语言 RSS。
- [x] **分享与 SEO** — canonical、hreflang、sitemap，以及支持中文的动态分享图片。
- [x] **内容发布控制** — 草稿、示例标记与按构建时间判断的计划发布。
- [x] **Newsletter 页面** — 公开来信归档，可按邮件服务要求接入订阅表单。

> 仓库保留了明确标注的示例内容，站点地址仍为 `example.com`。Newsletter 订阅默认关闭，课程页用于展示筹备提纲。

## 🚀 本地运行

推荐使用 **Node.js 24** 和 **pnpm 11.3.0**，与 CI 保持一致；最低 Node.js 版本为 `22.12.0`。

```sh
git clone https://github.com/tangwz/tang.git
cd tang
pnpm install --frozen-lockfile
pnpm dev
```

打开 [localhost:4321](http://localhost:4321) 浏览英文首页，[localhost:4321/zh/](http://localhost:4321/zh/) 浏览中文首页。

搜索依赖构建生成的索引。需要体验完整搜索时：

```sh
pnpm build
pnpm preview
```

## 📁 项目结构

```text
.
├── docs/
│   ├── GUIDE.md              # Configuration and content guide (English)
│   ├── GUIDE.zh-CN.md        # Configuration and content guide (Chinese)
│   ├── RELEASE.md            # Deployment and rollback (English)
│   └── RELEASE.zh-CN.md      # Deployment and rollback (Chinese)
├── public/                  # Static images and favicon
├── src/
│   ├── assets/              # Local fonts, icons and images
│   ├── components/          # Shared UI components
│   ├── content/
│   │   ├── posts/           # Markdown and MDX articles
│   │   └── videos/          # Videos and transcripts
│   ├── data/                # Profile, books, courses and letters
│   ├── i18n/                # Translations and locale helpers
│   ├── layouts/             # Page and article layouts
│   ├── pages/               # Routes, including /zh/
│   ├── styles/              # Theme and reading styles
│   ├── utils/               # Content, search and build helpers
│   ├── views/               # Page views shared by both languages
│   └── content.config.ts    # Content schemas
├── scripts/                 # Build and release checks
├── astro-paper.config.ts    # Site configuration
└── astro.config.ts          # Astro integrations and fonts
```

文章和视频的中文译文分别放在对应目录的 `zh/` 子目录，使用与英文原文相同的文件名。

## 📖 文档

| 想了解什么                        | 从这里开始                                                   |
| --------------------------------- | ------------------------------------------------------------ |
| 站点配置、内容发布与翻译规则      | [使用指南](docs/GUIDE.zh-CN.md)                              |
| 修改个人资料、作品与页面样式      | [主题配置示例](src/content/posts/zh/theme-configuration.mdx) |
| 标题、代码、表格与数学公式的排版  | [Markdown 示例](src/content/posts/zh/markdown-showcase.mdx)  |
| 域名、Newsletter 接入、部署与回滚 | [发布说明](docs/RELEASE.zh-CN.md)                            |
| AstroPaper 原始主题与上游文档     | [AstroPaper 仓库](https://github.com/satnaing/astro-paper)   |

本地启动后，可直接阅读站内的 [主题配置指南](http://localhost:4321/zh/posts/theme-configuration/) 和 [Markdown 排版示例](http://localhost:4321/zh/posts/markdown-showcase/)。

## ⚙️ 自定义

从站点信息、个人资料和第一篇文章开始：

| 内容                                       | 修改位置                                                                                                    |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| 域名、标题、作者、分页与功能开关           | [`astro-paper.config.ts`](astro-paper.config.ts)                                                            |
| 个人照片、书籍笔记、课程与 Newsletter 名称 | [`src/data/creator.ts`](src/data/creator.ts)                                                                |
| Newsletter 公开来信                        | [`src/data/letters.ts`](src/data/letters.ts)                                                                |
| 文章与视频文字稿                           | [`src/content/posts/`](src/content/posts/) · [`src/content/videos/`](src/content/videos/)                   |
| 首页介绍与个人故事                         | [`src/views/Home.astro`](src/views/Home.astro) · [`src/views/About.astro`](src/views/About.astro)           |
| 中文界面文案                               | [`src/i18n/messages/zh.json`](src/i18n/messages/zh.json) · [`src/i18n/lang/zh.json`](src/i18n/lang/zh.json) |
| 颜色、首页与阅读版式                       | [`src/styles/`](src/styles/)                                                                                |

订阅表单的公开配置见 [`.env.example`](.env.example)。必需信息完整且合法时才显示表单；邮件服务的字段适配、确认邮件与退订流程见 [Newsletter 接入说明](docs/RELEASE.zh-CN.md#newsletter-开启前)。

## 🧰 技术栈

| 用途           | 技术                                    |
| -------------- | --------------------------------------- |
| 静态站点与内容 | Astro · TypeScript · Markdown / MDX     |
| 样式           | Tailwind CSS · 自定义 CSS               |
| 全文搜索       | Pagefind                                |
| 数学公式       | remark-math · MathJax                   |
| 动态分享图片   | Satori · Sharp · Astro Fonts            |
| 代码质量       | ESLint · Prettier · Node.js test runner |
| 持续集成       | GitHub Actions                          |

依赖版本以 [`package.json`](package.json) 和 lockfile 为准。英文网页字体采用本地 Fraunces / Arimo，中文采用系统字体栈；中文分享图片使用本地 Noto Sans SC。

## 🧞 常用命令

所有命令均在项目根目录运行。

| 命令                 | 用途                                   |
| -------------------- | -------------------------------------- |
| `pnpm dev`           | 启动本地开发服务器                     |
| `pnpm build`         | 类型检查、静态构建、搜索索引与产物检查 |
| `pnpm preview`       | 预览构建产物                           |
| `pnpm test`          | 运行单元测试                           |
| `pnpm lint`          | 检查代码规范                           |
| `pnpm format:check`  | 检查格式                               |
| `pnpm format`        | 格式化文件                             |
| `pnpm sync`          | 同步 Astro 类型                        |
| `pnpm check:build`   | 检查已有构建产物                       |
| `pnpm build:release` | 校验正式域名并完成发布构建             |

## 📦 构建与发布

构建产物位于 `dist/`，可以部署到静态托管平台。正式发布前替换占位域名、个人资料和示例内容，再执行 `pnpm build:release`；该命令会拒绝占位域名。计划发布的内容需要在发布时间重新构建。

[CI](.github/workflows/ci.yml) 检查 lint、单元测试、格式和完整构建，保存按 commit SHA 命名的静态产物，保留 14 天。`dist/build-info.json` 记录版本与来源 revision，便于追踪发布和回滚。

当前尚未绑定托管平台，也没有自动部署。完整流程见 [发布说明](docs/RELEASE.zh-CN.md)。

## 📜 致谢与许可

感谢 [Sat Naing](https://satnaing.dev) 和 [AstroPaper 的贡献者](https://github.com/satnaing/astro-paper/graphs/contributors) 提供主题基础，以及 [Ali Abdaal](https://aliabdaal.com/) 带来的个人网站设计灵感。

代码沿用 [MIT License](LICENSE)，保留上游版权声明。字体遵循各自的 SIL Open Font License，详见 [`src/assets/fonts/`](src/assets/fonts/)；图片来源见 [`public/images/CREDITS.zh-CN.txt`](public/images/CREDITS.zh-CN.txt)。
