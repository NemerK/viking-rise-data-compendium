import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'ru', 'pl', 'ko', 'ja', 'es', 'ar', 'de', 'vi', 'id'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale)) notFound();

  return {
    locale: locale as string,
    messages: (await import(`./locales/${locale}.json`)).default
  };
});
