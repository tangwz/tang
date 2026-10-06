import { useCreatorTranslations } from "@/i18n/creator";
export const letters = [
  {
    sample: true,
    slug: "permission-to-start-small",
    number: "01",
    title: "Permission to start small",
    intro:
      "This week, a thought about beginnings: the best first step is often smaller than we think.",
    paragraphs: [
      "A new project can grow very large in your head before it exists anywhere else. Every possibility feels important, and choosing a place to begin becomes its own project.",
      "Try making the first version something you can finish in an afternoon. A page, a short note, a single working function. Give it a clear purpose and let the rest wait.",
      "A small finished thing gives you feedback. It also gives you the confidence to come back and make it better. That's enough for a beginning.",
    ],
    question:
      "What's the smallest useful version of the thing you've been meaning to make?",
  },
  {
    sample: true,
    slug: "a-little-room-for-curiosity",
    number: "02",
    title: "A little room for curiosity",
    intro:
      "A letter about leaving space in the day for things that don't have an immediate purpose.",
    paragraphs: [
      "Not every interesting idea arrives on schedule. Sometimes it comes from a walk, a book you picked up by accident, or a conversation that goes somewhere unexpected.",
      "There is value in a little unallocated time. You don't have to turn it into a new productivity habit. You can just let something catch your attention.",
      "Keep a note of what you notice. A question, a phrase, an observation. One day, it might be the beginning of something you want to share.",
    ],
    question:
      "What caught your attention this week, before you decided whether it was useful?",
  },
];

export function getLetters(locale: string) {
  const t = useCreatorTranslations(locale);
  return letters.map(letter => ({
    ...letter,
    title: t(letter.title),
    intro: t(letter.intro),
    paragraphs: letter.paragraphs.map(t),
    question: t(letter.question),
  }));
}
