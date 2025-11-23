export const locales = ["en", "it", "de", "es", "fr", "da", "sv", "nl"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
