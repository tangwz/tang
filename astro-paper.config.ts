import { defineAstroPaperConfig } from "./src/types/config.ts";

export default defineAstroPaperConfig({
  site: {
    url: "https://example.com/",
    title: "Terence Tang — Writer, Creator & Developer",
    description:
      "A home for curious minds. Essays, videos, books, and thoughtful ideas on creating, building, and living with intention.",
    author: "Terence Tang",
    ogImage: "og.png",
    lang: "en",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 9,
    perIndex: 6,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  // Demo links use platform homepages; replace them with your own profiles.
  socials: [
    {
      name: "github",
      url: "https://github.com/",
      linkTitle: "GitHub (demo)",
    },
    { name: "x", url: "https://x.com/", linkTitle: "X (demo)" },
    {
      name: "youtube",
      url: "https://www.youtube.com/",
      linkTitle: "YouTube (demo)",
    },
    {
      name: "bilibili",
      url: "https://www.bilibili.com/",
      linkTitle: "Bilibili (demo)",
    },
    {
      name: "weibo",
      url: "https://weibo.com/",
      linkTitle: "Weibo (demo)",
    },
    {
      name: "xiaohongshu",
      url: "https://www.xiaohongshu.com/",
      linkTitle: "Xiaohongshu (demo)",
    },
    {
      name: "douyin",
      url: "https://www.douyin.com/",
      linkTitle: "Douyin (demo)",
    },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/sharing/share-offsite/?url=",
    },
  ],
});
