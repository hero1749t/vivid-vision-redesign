import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['id', 'en', 'zh', 'es', 'de', 'ko', 'ja', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  id: 'Bahasa Indonesia',
  en: 'English',
  zh: '中文',
  es: 'Español',
  de: 'Deutsch',
  ko: '한국어',
  ja: '日本語',
  fr: 'Français',
};

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
