import { Helmet } from "react-helmet-async";
import { SITE_URL, DEFAULT_OG, type SeoEntry } from "@/data/seo";

interface Props {
  data: SeoEntry;
  image?: string;
  jsonLd?: object | object[];
}

export const Seo = ({ data, image = DEFAULT_OG, jsonLd }: Props) => {
  const url = `${SITE_URL}${data.path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      {data.keywords && <meta name="keywords" content={data.keywords} />}
      <link rel="canonical" href={url} />

      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Bali YTTC" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:image" content={image} />

      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  );
};

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Bali Yoga Teacher Training Center",
  url: SITE_URL,
  image: DEFAULT_OG,
  telephone: "+62 819-9933-3327",
  email: "info@baliyttc.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ubud",
    addressRegion: "Gianyar",
    addressCountry: "ID",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "320",
  },
};

export const courseJsonLd = (c: { title: string; summary: string; priceFrom: number; duration: string }) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: c.title,
  description: c.summary,
  provider: { "@type": "Organization", name: "Bali YTTC", sameAs: SITE_URL },
  offers: { "@type": "Offer", price: c.priceFrom, priceCurrency: "USD" },
  timeRequired: c.duration,
});
