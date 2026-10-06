import { getCollection } from "astro:content";
import { selectLocalizedEntries } from "@/i18n/routing";
import { postFilter } from "./postFilter";

export async function getLocalizedPosts(locale: string) {
  const posts = await getCollection("posts", postFilter);
  return selectLocalizedEntries(posts, locale);
}

export async function getLocalizedVideos(locale: string) {
  return selectLocalizedEntries(
    await getCollection("videos", postFilter),
    locale
  );
}
