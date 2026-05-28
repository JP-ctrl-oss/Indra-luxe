import { getRequestConfig } from 'next-intl/server';

export const locales = ['es', 'en', 'fr', 'de', 'hi', 'th'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'Europe/Madrid',
  };
});
