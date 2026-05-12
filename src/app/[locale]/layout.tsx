import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/routing';
import '../globals.css';
import SupportBot from '@/components/shared/SupportBot';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <title>Bali YTTC - Yoga Teacher Training in Bali</title>
        <meta name="description" content="Transform your life with world-class yoga teacher training in the heart of Bali." />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <SupportBot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
