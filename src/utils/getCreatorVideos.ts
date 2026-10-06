import type { CollectionEntry } from "astro:content";
import { postFilter } from "./postFilter";

export type CreatorVideo = CollectionEntry<"videos">;

export function getCreatorVideos(videos: CreatorVideo[]) {
  return videos
    .filter(postFilter)
    .sort(
      (a, b) => b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime()
    );
}

export const videoCategories = [
  { slug: "productivity", name: "Productivity", color: "yellow" },
  { slug: "programming", name: "Programming", color: "blue" },
  { slug: "creating", name: "Creating", color: "purple" },
  { slug: "business", name: "Business", color: "coral" },
] as const;
