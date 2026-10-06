import config from "@/config";
import { useCreatorTranslations } from "@/i18n/creator";
import { getAssetPath } from "@/utils/withBase";
import { getNewsletterSettings } from "@/utils/newsletterSettings";

export const creator = {
  name: config.site.author,
  tagline: "Writer. Creator. Developer.",
  newsletter: {
    name: "The Sunday Edit",
    shortName: "Sunday Edit",
    ...getNewsletterSettings({
      action: import.meta.env.PUBLIC_NEWSLETTER_FORM_ACTION,
      provider: import.meta.env.PUBLIC_NEWSLETTER_PROVIDER,
      privacyURL: import.meta.env.PUBLIC_NEWSLETTER_PRIVACY_URL,
      contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL,
    }),
  },
  bilibiliChannel: import.meta.env.PUBLIC_BILIBILI_CHANNEL_URL ?? "",
  images: {
    portrait: "",
    desk: getAssetPath("images/creative-desk.jpg"),
    writing: getAssetPath("images/writing.jpg"),
    landscape: getAssetPath("images/landscape.jpg"),
  },
};

export const books = [
  {
    sample: true,
    slug: "the-creative-act",
    title: "The Creative Act",
    subtitle: "A Way of Being",
    author: "Rick Rubin",
    color: "sand",
    category: "Creativity",
    note: "Make room for noticing. The most useful creative habit may be paying closer attention to the world before asking yourself to produce something new.",
  },
  {
    sample: true,
    slug: "deep-work",
    title: "Deep Work",
    subtitle: "Rules for Focused Success",
    author: "Cal Newport",
    color: "green",
    category: "Focus",
    note: "Protect the work that needs your whole attention. A small, deliberate block of focused time can be a better starting point than an elaborate productivity system.",
  },
  {
    sample: true,
    slug: "show-your-work",
    title: "Show Your Work!",
    subtitle: "10 Ways to Share Your Creativity",
    author: "Austin Kleon",
    color: "orange",
    category: "Creating",
    note: "Sharing the process is part of the practice. A useful note, an unfinished sketch, or a small lesson can invite a conversation long before a project is finished.",
  },
];

export const courses = [
  {
    sample: true,
    slug: "independent-creator",
    name: "The Independent Creator",
    eyebrow: "THE NEXT CHAPTER",
    description:
      "Turn what you know into something that matters. A practical journey from your first idea to a thoughtful, sustainable creative business.",
    status: "In development",
    modules: [
      {
        title: "Find your intersection",
        description:
          "Connect your skills, curiosity, and the people you want to help.",
      },
      {
        title: "Build your body of work",
        description:
          "Create a repeatable practice for writing, video, and useful projects.",
      },
      {
        title: "Own your platform",
        description:
          "Build a personal website and an email list that can grow with you.",
      },
      {
        title: "Design a useful offer",
        description:
          "Test a small product, learn from real feedback, and build sustainably.",
      },
    ],
  },
];

export function getBooks(locale: string) {
  const t = useCreatorTranslations(locale);
  return books.map(book => ({
    ...book,
    category: t(book.category),
    note: t(book.note),
  }));
}

export function getCourses(locale: string) {
  const t = useCreatorTranslations(locale);
  return courses.map(course => ({
    ...course,
    name: t(course.name),
    eyebrow: t(course.eyebrow),
    description: t(course.description),
    status: t(course.status),
    modules: course.modules.map(module => ({
      title: t(module.title),
      description: t(module.description),
    })),
  }));
}
