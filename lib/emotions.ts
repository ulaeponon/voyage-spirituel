 export const emotions =[
     "JOIE",
    "TRISTE",
    "EN_COLERE",
    "ANXIEUSE",
    "FATIGUEE",
  "RECONNAISSANTE",
  "EN_PAIX",
  "DISTRAITE",
  "MOTIVEE",
  "STRESSEE",
 ] as const;

 export type Emotions = (typeof emotions)[number];

 export const emotionUI: Record<
  Emotions,
  { label: string; icon: string }
> = {
  JOIE: {
    label: "Joie",
    icon: "😊",
  },
  TRISTE: {
    label: "Tristesse",
    icon: "😔",
  },
  EN_COLERE: {
    label: "Colère",
    icon: "😡",
  },
  ANXIEUSE: {
    label: "Anxieuse",
    icon: "😰",
  },
  FATIGUEE: {
    label: "Fatiguée",
    icon: "😴",
  },
  RECONNAISSANTE: {
    label: "Reconnaissante",
    icon: "🙏",
  },
  EN_PAIX: {
    label: "En paix",
    icon: "🕊️",
  },
  DISTRAITE: {
    label: "Distraite",
    icon: "🤯",
  },
  MOTIVEE: {
    label: "Motivée",
    icon: "🔥",
  },
  STRESSEE: {
    label: "Stressée",
    icon: "😣",
  },
};
