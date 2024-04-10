import { useSession } from "next-auth/react";

export function prettyName(lang) {
  const languageList = {
    // Bangla: "bn",
    Arabic: "ar",
    Chinese: "cn",
    Danish: "dk",
    Dutch: "nl",
    English: "en",
    French: "fr",
    German: "de",
    // Gujarati: "gu",
    Hindi: "hi",
    Icelandic: "is",
    Italian: "it",
    Japanese: "ja",
    Korean: "kr",
    // Marathi: "mr",
    Norwegian: "no",
    Swedish: "sv",
    Polish: "pl",
    Portuguese: "pt",
    // Punjabi: "pu",
    Romanian: "ro",
    Russian: "ru",
    // Sindhi: "sd",
    Spanish: "es",
    // Tamil: "ta",
    // Telugu: "te",
    Turkish: "tr",
    // Urdu: "ur",
    Vietnamese: "vn",
    Welsh: "cy"
  };

  const swapLanguageList = Object.entries(languageList).reduce(
    (acc, [key, value]) => ((acc[value] = key), acc),
    {}
  );

  return swapLanguageList[lang];
}
