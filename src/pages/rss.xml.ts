import rss from "@astrojs/rss";
import { getCreatorPosts } from "@/utils/getCreatorPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import { getLocalizedPosts } from "@/utils/getLocalizedContent";
import { translate } from "@/i18n/creator";
import config from "@/config";

export async function createRss(locale: string) {
  const posts = await getLocalizedPosts(locale);
  const sortedPosts = getCreatorPosts(posts);

  return rss({
    title: translate(locale, config.site.title),
    description: translate(locale, config.site.description),
    site: config.site.url,
    customData: `<language>${locale === "zh" ? "zh-CN" : "en"}</language>`,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getPostUrl(id, filePath, locale),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}

export const GET = () => createRss("en");
