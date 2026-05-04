// Per-route SEO config. Future: load from a CMS / admin panel.
export const SITE_URL = "https://baliyttc.com";
export const DEFAULT_OG = "https://baliyttc.com/wp-content/uploads/2025/08/Yoga-Teacher-Training-class-in-bali.jpg";

export const SEO = {
  home: {
    title: "Bali YTTC — Yoga Teacher Training in Ubud, Bali · 100/200/300 Hour YTT",
    description:
      "Yoga Alliance certified Hatha, Ashtanga & Vinyasa Yoga Teacher Training in Ubud, Bali. 100hr, 200hr & 300hr immersions with senior teachers since 2018. 2,500+ graduates, 4.9★ rating.",
    path: "/",
    keywords: "yoga teacher training bali, 200 hour ytt bali, ubud yoga school, yoga alliance certified, hatha ashtanga vinyasa",
  },
  about: {
    title: "About Bali YTTC — Our Story, Lineage & Yoga Alliance Certification",
    description:
      "Founded in 2018, Bali YTTC is a Yoga Alliance RYS school in Ubud rooted in classical Hatha lineage. Meet our story, our values and the senior teachers behind 2,500+ graduates.",
    path: "/about",
    keywords: "about bali yttc, ubud yoga school, yoga alliance rys, vivek kalura",
  },
  instructors: {
    title: "Meet Our Yoga Teachers — Senior Instructors at Bali YTTC, Ubud",
    description:
      "Learn from senior, lineage-trained teachers — Vivek Kalura (MSc Yogic Science) and Sachin Rautela (E-RYT 500). Decades of combined experience across India and Bali.",
    path: "/instructors",
    keywords: "yoga teachers bali, vivek kalura, sachin rautela, e-ryt 500, ubud yoga instructors",
  },
  gallery: {
    title: "Gallery — Yoga Teacher Training Life at Bali YTTC, Ubud",
    description:
      "A glimpse inside our Ubud ashram — ceremonies, classes, workshops, jungle setting and graduation moments from our 100/200/300-hour Yoga Teacher Trainings.",
    path: "/gallery",
    keywords: "bali yttc photos, ubud yoga school gallery, yoga ceremony bali",
  },
  contact: {
    title: "Contact Bali YTTC — Apply, WhatsApp & Visit Our Ubud School",
    description:
      "Get in touch with Bali YTTC. WhatsApp, email, phone and our Ubud address. We'll reply within 24 hours about courses, dates, accommodation and visas.",
    path: "/contact",
    keywords: "contact bali yttc, ubud yoga school address, whatsapp bali yoga",
  },
  course100: {
    title: "100-Hour Yoga Teacher Training in Bali — 11-Day Multi-Style YTT",
    description:
      "11-day Yoga Alliance certified 100-hour multi-style YTT in Ubud, Bali. Hatha, Vinyasa & Ashtanga foundations, daily meditation, philosophy and pranayama. From $999.",
    path: "/courses/100hr",
    keywords: "100 hour yoga teacher training bali, multi style ytt ubud, beginner yoga course bali",
  },
  course200: {
    title: "200-Hour Yoga Teacher Training in Bali — Yoga Alliance RYS200 (Flagship)",
    description:
      "Our flagship 21-day 200-hour YTT in Ubud, Bali. Yoga Alliance RYS200 certified. Hatha, Ashtanga & Vinyasa flow with anatomy, philosophy and teaching methodology. From $1,499.",
    path: "/courses/200hr",
    keywords: "200 hour yoga teacher training bali, ryt 200 ubud, yoga alliance certified ytt",
  },
  course300: {
    title: "300-Hour Advanced Yoga Teacher Training in Bali — RYT-500 Path",
    description:
      "28-day advanced 300-hour YTT in Ubud, Bali for certified 200-hour teachers. Advanced asana, sequencing mastery, yoga therapy and mentorship. From $1,899.",
    path: "/courses/300hr",
    keywords: "300 hour yoga teacher training bali, ryt 500 ubud, advanced yoga teacher course",
  },
};

export type SeoEntry = (typeof SEO)[keyof typeof SEO];
