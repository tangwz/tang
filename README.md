# Terence Tang Creator Theme

基于 [AstroPaper](https://github.com/satnaing/astro-paper) 的 Astro 个人创作者主题，视觉参考 [Ali Abdaal](https://aliabdaal.com/)。首页介绍个人身份，统一作品库汇聚文章、Bilibili 视频与文字稿、读书笔记及 Newsletter；课程页面用于展示筹备进度。

当前版本 `0.1.0`，基于 AstroPaper 6.1.0。域名仍为 `https://example.com/`，Newsletter 未接入服务，内容和图片保留为明确标注的示例。当前代码不会自动部署。

## 开发与构建

使用 Node.js 24 和 pnpm 11.3.0，与 CI 保持一致。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm lint
pnpm format:check
pnpm build
pnpm preview
```

`pnpm build` 包含类型检查、静态页面生成、Pagefind 索引和产物检查。搜索需先构建；入口位于作品库和页脚。部署目录为 `dist/`，构建信息记录在 `dist/build-info.json`。正式发布使用 `pnpm build:release`，该命令会拒绝占位域名。

## 配置入口

| 配置内容                                  | 文件                                                     |
| ----------------------------------------- | -------------------------------------------------------- |
| 站点域名、名称、作者、时区                | `astro-paper.config.ts` 的 `site`                        |
| 首页精选数量、作品库及文章分页            | `posts.perIndex`（默认 6）、`posts.perPage`（默认 9）    |
| 搜索、主题切换、动态分享图片、归档        | `features`                                               |
| 页脚社交链接、文章分享按钮                | `socials`、`shareLinks`；空数组不显示按钮                |
| 个人照片、书籍笔记、课程、Newsletter 名称 | `src/data/creator.ts`                                    |
| Newsletter 公开来信                       | `src/data/letters.ts`                                    |
| 个人介绍与完整故事                        | `src/views/Home.astro`、`src/views/About.astro`          |
| 中文界面文案                              | `src/i18n/messages/zh.json`、`src/i18n/lang/zh.json`     |
| 通用颜色、首页及卡片、阅读版式            | `src/styles/theme.css`、`portfolio.css`、`editorial.css` |

首页保留个人介绍、背景说明、精选作品和 Newsletter 区域；全站导航为 My Work、About Me 和 Newsletter。作品库的筛选与页码保存在 URL 中，刷新、语言切换及浏览器前进／后退均可保持状态。课程入口位于首页底部。

## 内容与发布范围

文章位于 `src/content/posts/`，视频与文字稿位于 `src/content/videos/`。新增文章使用 Markdown 或 MDX，视频正文使用 Markdown。以下字段用于控制公开状态：

| 字段             | 行为                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `draft: true`    | 不生成路由、不进入任何列表                                                               |
| `pubDatetime`    | 生产构建只发布已到时间的文章和视频；提前量由 `posts.scheduledPostMargin` 决定            |
| `sample: true`   | 保留示例内容并显示示例标记                                                               |
| `template: true` | 旧主题教程保留直接访问，并设置 `noindex`；不进入作品库、归档、标签、搜索、RSS 或 sitemap |

本地开发可以预览未来内容。静态站点需要在计划发布时间重新构建；不会自行定时更新。语言版本在应用发布时间规则之后选择，未来译文不会隐藏当前可读的原文。

[`markdown-showcase.mdx`](src/content/posts/markdown-showcase.mdx) 和 [`theme-configuration.mdx`](src/content/posts/theme-configuration.mdx) 是公开的排版、配置示例，各有中文译文。它们保持 `sample: true`、`template: false`，可从作品库、搜索和 RSS 找到。

视频的 `bilibiliUrl` 支持完整视频链接、BV／AV 标识和 b23.tv 分享链接，`p` 参数保留分集。完整地址显示官方播放器；短链接提供外部观看入口。正式视频必须填写播放地址；示例及草稿可以留空。默认关闭自动播放。

书籍笔记和公开来信的示例标记在相应数据项的 `sample` 字段中；替换真实内容后再设为 `false`。当前课程只展示提纲，未连接支付或学习平台。

## 数学公式

文章、MDX 页面和视频文字稿支持 Obsidian 风格的 LaTeX：行内使用 `$...$`，块级公式前后各放一行 `$$`。

```md
Energy is $E = mc^2$.

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$
```

使用 `remark-math` 与 MathJax，在构建时生成 SVG；浏览器无需额外渲染脚本或远程字体。公式跟随深浅色正文颜色，长公式单独横向滚动并支持键盘操作。LaTeX 错误阻止构建；源码示例放在代码块内，价格中的美元符号用 `\$` 转义。Obsidian 插件和自定义宏不会自动导入。

中英文 Markdown 示例含分式、积分、矩阵、多行对齐与分段函数；配置指南说明用法。处理入口位于 `astro.config.ts` 和 `src/utils/rehypeMath.ts`。

## 中英文与深浅色

英文使用根路径，中文使用 `/zh/`。中英文共用 `src/views/` 和 `src/components/`；路由文件只处理静态参数和页面入口。文章或视频使用相同目录结构及文件名配对：

```text
src/content/posts/my-essay.md      -> /posts/my-essay/
src/content/posts/zh/my-essay.md   -> /zh/posts/my-essay/
```

译文分别设置 `lang: en` 或 `lang: zh`，分类标识保持一致。缺少已发布译文时显示原文和提示。语言切换保留查询参数；两篇译文的标题层级一致时，目录锚点按对应位置映射。标题结构不同则仅保留共同的 ID，其余锚点清除。两种语言始终保留 Newsletter 英文名称。

首次访问跟随系统主题，手动选择保存在浏览器中，跨页面和语言保持一致。`features.lightAndDarkMode: false` 使用浅色并隐藏开关。

## 字体与素材

英文网页使用本地 Fraunces / Arimo，中文使用系统宋体及黑体字体栈。参考站的 Recoleta / Elza 需要 Webfont 授权，当前未采用。中文分享图片使用本地 Noto Sans SC 静态字体，生成中文标题和中文说明；该字体仅用于构建分享图片，不预加载到网页中。

字体配置在 `astro.config.ts`，网页预加载在 `Layout.astro`。字体许可证及来源在 `src/assets/fonts/`，图片来源在 `public/images/CREDITS.txt`。更换 `creator.images.portrait` 可以用个人照片替换工作台占位图。

## Newsletter 配置

复制 `.env.example` 为 `.env`。所有配置均为公开地址或公开信息，不能填写 API 密钥。

```dotenv
PUBLIC_NEWSLETTER_FORM_ACTION=
PUBLIC_NEWSLETTER_PROVIDER=
PUBLIC_NEWSLETTER_PRIVACY_URL=
PUBLIC_CONTACT_EMAIL=
PUBLIC_BILIBILI_CHANNEL_URL=
```

前四项完整且合法时才显示订阅表单，否则显示“订阅尚未开放”并提供公开来信入口，不收集邮箱。启用时，服务必须支持标准 POST 的 `email` 字段，并按服务要求调整其他字段；表单有必选的订阅同意项，隐私页显示实际服务商、用途、退订与联系信息。

配置地址不等于已完成邮件集成。开启前需在服务商端设置确认邮件、退订链接、成功／失败页面，并实际验收。详见 [发布说明](docs/RELEASE.md)。

## CI 与发布

CI 在 push、PR 或手动触发时检查格式、lint、单元测试和完整构建。测试覆盖发布时间边界、译文回退、语言 URL 与锚点、主题偏好、Bilibili 地址、中文脚注和公式解析。产物检查覆盖中英文路由、站内链接、分享图片、公式静态渲染、RSS、404 与 sitemap 的索引范围。

每次 CI 构建保存 `site-<commit-sha>` 静态产物，保留 14 天。`build-info.json` 记录版本、域名和来源 revision；未提交的本地构建标记为 dirty，不冒充可回滚的发布版本。托管平台尚未确定，部署和回滚步骤见 [发布说明](docs/RELEASE.md)。

上游 Lighthouse 分数属于原始 AstroPaper，不代表本主题。真实域名上线后，应对首页、作品库、长文章和视频页单独检查加载性能及无障碍表现。

## 来源与许可

AstroPaper 由 [Sat Naing](https://satnaing.dev) 和贡献者维护；原主题使用 MIT 许可证，见 [LICENSE](LICENSE)。本仓库保留上游许可，字体遵循各自的 SIL Open Font License。原始主题文档可从直接文章地址访问；完整上游说明见 [AstroPaper 仓库](https://github.com/satnaing/astro-paper)。
