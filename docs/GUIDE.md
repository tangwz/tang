# User guide

**English** | [简体中文](GUIDE.zh-CN.md)

This guide covers configuration, content rules, and integrations. Start with the [README](../README.md) to run the project locally, or read the [release guide](RELEASE.md) for deployment and rollback.

## Configuration

| Setting                                                       | Location                                                    |
| ------------------------------------------------------------- | ----------------------------------------------------------- |
| Site URL, title, author, and timezone                         | `site` in `astro-paper.config.ts`                           |
| Featured works on the homepage and pagination                 | `posts.perIndex` (default: 6), `posts.perPage` (default: 9) |
| Search, theme switching, dynamic sharing images, and archives | `features`                                                  |
| Footer profiles and article sharing buttons                   | `socials` and `shareLinks`; empty arrays hide the buttons   |
| Portrait, book notes, courses, and Newsletter name            | `src/data/creator.ts`                                       |
| Public Newsletter letters                                     | `src/data/letters.ts`                                       |
| Homepage introduction and personal story                      | `src/views/Home.astro`, `src/views/About.astro`             |
| Chinese interface text                                        | `src/i18n/messages/zh.json`, `src/i18n/lang/zh.json`        |
| Shared colors, homepage and cards, and reading layout         | `src/styles/theme.css`, `portfolio.css`, `editorial.css`    |

The homepage includes a personal introduction, background, featured works, and a Newsletter section. The main navigation links to My Work, About Me, and Newsletter. Portfolio filters and pagination are stored in the URL and persist through reloads, language changes, and browser back/forward navigation. The course link is near the bottom of the homepage.

## Content and publication

Articles live in `src/content/posts/`; videos and transcripts live in `src/content/videos/`. Write articles in Markdown or MDX and video transcripts in Markdown. These fields control publication:

| Field            | Behavior                                                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `draft: true`    | Excludes the content from routes and lists                                                                                                      |
| `pubDatetime`    | Production builds publish articles and videos when their publication time is reached, allowing the lead time set by `posts.scheduledPostMargin` |
| `sample: true`   | Keeps demonstration content visible with a sample label                                                                                         |
| `template: true` | Keeps legacy theme tutorials directly accessible with `noindex`, but excludes them from the portfolio, archives, tags, search, RSS, and sitemap |

Local development can preview future content. A static site must be rebuilt when scheduled content should go live; it does not publish automatically. Publication rules are applied before choosing a language version, so a future translation never hides an available original.

[`markdown-showcase.mdx`](../src/content/posts/markdown-showcase.mdx) and [`theme-configuration.mdx`](../src/content/posts/theme-configuration.mdx) are public typography and configuration examples, each with a Chinese translation. They use `sample: true` and `template: false` and appear in the portfolio, search, and RSS.

The video field `bilibiliUrl` accepts full video URLs, BV/AV identifiers, and b23.tv share links. The `p` parameter preserves the selected part. Direct video URLs use the official player; short links provide an external watch link. Published videos require a playback address; samples and drafts may leave it empty. Autoplay is disabled by default.

Book notes and public letters use a `sample` field on each data item. Set it to `false` after replacing the example with real content. Courses currently show outlines only; no payment or learning platform is connected.

## Math

Articles, MDX pages, and video transcripts support Obsidian-style LaTeX. Use `$...$` for inline math and place `$$` on separate lines around display math.

```md
Energy is $E = mc^2$.

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$
```

`remark-math` and MathJax generate SVG at build time; the browser needs no extra rendering scripts or remote fonts. Equations follow the text color in both themes. Long equations scroll horizontally and support keyboard interaction. Invalid LaTeX stops the build. Put literal formula examples in code blocks and escape dollar signs in prices as `\$`. Obsidian plugins and custom macros are not imported automatically.

Both language versions of the Markdown showcase include fractions, integrals, matrices, aligned equations, and piecewise functions. The configuration examples explain their use. Processing is configured in `astro.config.ts` and `src/utils/rehypeMath.ts`.

## Languages and themes

English uses the root path; Chinese uses `/zh/`. Both languages share `src/views/` and `src/components/`; route files handle static parameters and page entry points. Pair article or video translations with the same directory structure and filename:

```text
src/content/posts/my-essay.md      -> /posts/my-essay/
src/content/posts/zh/my-essay.md   -> /zh/posts/my-essay/
```

Set `lang: en` or `lang: zh` and keep category identifiers consistent. When a published translation is unavailable, the site shows the original with a notice. Language switching preserves query parameters. Matching heading outlines map table-of-contents anchors by position; differing outlines preserve shared IDs and clear other anchors. Both languages keep the English name Newsletter.

The initial theme follows the system preference. Manual choices are saved in the browser and persist across pages and languages. Setting `features.lightAndDarkMode: false` uses the light theme and hides the switch.

## Fonts and assets

English pages use local Fraunces and Arimo fonts; Chinese pages use system serif and sans-serif stacks. Recoleta and Elza from the visual reference site require webfont licenses and are not used here. Chinese sharing images use a local static Noto Sans SC font for titles and descriptions. This font is used only to generate sharing images and is not preloaded on web pages.

Fonts are configured in `astro.config.ts`, with webfont preloads in `Layout.astro`. Font licenses and source information are in `src/assets/fonts/`; image sources are in the [image credits](../public/images/CREDITS.txt). Set `creator.images.portrait` to replace the workspace placeholder with your own photograph.

## Newsletter configuration

Copy `.env.example` to `.env`. Every value is a public address or public information; do not enter API secrets.

```dotenv
PUBLIC_NEWSLETTER_FORM_ACTION=
PUBLIC_NEWSLETTER_PROVIDER=
PUBLIC_NEWSLETTER_PRIVACY_URL=
PUBLIC_CONTACT_EMAIL=
PUBLIC_BILIBILI_CHANNEL_URL=
```

The subscription form appears only when the first four values are complete and valid. Otherwise the site shows a closed-subscription notice and links to public letters, without collecting email addresses. The provider must accept a standard POST with an `email` field; adapt any other fields to its requirements. The form requires explicit consent, and the privacy page shows the actual provider, purpose, unsubscribe information, and contact details.

Setting these addresses does not complete the integration. Before enabling subscriptions, configure confirmation emails, unsubscribe links, and success/failure pages with the provider, then verify the full flow. See the [release guide](RELEASE.md).
