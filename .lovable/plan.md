## Goal

Build a **client-demo-ready** redesign of baliyttc.com that feels **premium, editorial, magazine-style** — like an Aman resort or luxury retreat brand. Real content & photos from the live site, but with a far more refined frontend than both the original site and your previous HTML prototype. Backend not required to be functional — focus is "wow" frontend a client can review.

## Design Direction

- **Vibe:** Editorial & Premium — large Playfair Display headings, generous whitespace, asymmetric two-column layouts, subtle scroll-reveal and parallax, sticky section labels, refined micro-interactions.
- **Palette (kept consistent with current Bali brand):** terracotta `#c2622a`, sand `#f5ede0`, sage `#5a7a5c`, warm dark `#2c1a0e`, gold accents `#d4a847`, cream background `#faf6f0`.
- **Typography:** Playfair Display (serif headings, italic accents) + DM Sans / Inter (body).
- **Imagery:** Real photos extracted from baliyttc.com (Ubud setting, ceremonies, classes, instructors, accommodations).
- **Motion:** Framer Motion — fade-up on scroll, image parallax, stagger reveals, smooth page transitions, hover lifts on cards.

## Pages (full multi-page demo)

```text
/                  Home
/courses/200hr     200-Hour YTT (flagship, deepest content)
/courses/100hr     100-Hour YTT
/courses/300hr     300-Hour YTT
/about             About / Story / Yoga Alliance
/instructors       Teachers grid + bios
/gallery           Editorial photo gallery (masonry + lightbox)
/contact           Contact + map + form
```

Shared layout: sticky transparent-to-solid top nav, footer with newsletter, floating WhatsApp + sticky bottom "Apply / Inquire" bar that appears on scroll.

## Home page sections

1. **Cinematic Hero** — full-bleed image (Ubud yoga ceremony), dark editorial overlay, eyebrow tag "Bali · Ubud · Est. 2018", oversized serif headline with italic accent (e.g. *"Become a certified yoga teacher in the heart of Bali"*), two CTAs (Apply / Watch story), Yoga Alliance badge, scroll cue.
2. **Trust strip** — Yoga Alliance RYS200 / RYS300, 2,500+ graduates, Google 4.9★, years established, multi-style certification.
3. **Intro / Manifesto** — asymmetric 2-column: left short paragraph from real site, right portrait image with caption.
4. **Featured Courses** — 3 large editorial cards (200hr highlighted as flagship): photo, duration, style, dates, "from $X", "Explore →".
5. **Daily Life in Ubud** — horizontal scroll storyline: morning meditation → asana → philosophy → lunch → workshop → evening kirtan, each with photo + short caption.
6. **Curriculum pillars** — 6 icon+text tiles (Asana, Pranayama, Anatomy, Philosophy, Teaching Methodology, Adjustments).
7. **Meet the Teachers** — overlapping editorial portraits with names + lineage, link to /instructors.
8. **Accommodation & Food** — split layout, Bali villa imagery, sattvic meals.
9. **Testimonials** — editorial quote layout (large pull-quote + small grid of student photos with star ratings).
10. **Upcoming Batches** — clean schedule table with "Few seats left" urgency tags.
11. **Gallery teaser** — 5-image masonry preview → /gallery.
12. **FAQ** — shadcn Accordion, real questions from site.
13. **Location** — embedded Google Map of Ubud + address card + "Get directions".
14. **Final CTA band** — dark terracotta, "Your seat in Bali 2026 awaits", Apply button.
15. **Footer** — sitemap, contact, socials, newsletter, certifications.

## Course detail page (200hr — template reused for 100/300)

Hero with course name + dates + price, sticky side rail with "Apply now / Price / Next batch", overview, what you'll learn, **day-in-the-life timeline**, full curriculum accordion, certification info, accommodation tiers with pricing cards, included/not-included two-column, instructors for this batch, dates table, FAQ, application CTA.

## Other pages

- **About:** founder story, lineage, Yoga Alliance, values, timeline since 2018.
- **Instructors:** grid of teacher cards → modal with bio, lineage, specialties.
- **Gallery:** filterable masonry (Classes / Ceremonies / Nature / Food / Students) + lightbox.
- **Contact:** form (name/email/course/message), WhatsApp + phone cards, embedded map, FAQ shortcut.

## UX & "client psychology" details

- Sticky bottom action bar appears after hero scroll (Apply + WhatsApp).
- Floating WhatsApp bubble with subtle pulse.
- Urgency micro-copy ("Only 4 seats left in Feb 2026 batch") on course cards.
- Trust signals repeated throughout (Yoga Alliance logo, Google rating, graduate count).
- All CTAs lead to a single "Apply" modal (multi-step form UI — non-functional submit, just shows toast "Demo: application received").
- Smooth page transitions, image lazy-loading with blur-up, reduced-motion respected.
- Fully responsive (mobile-first), hamburger drawer nav on mobile.

## Technical approach

- React Router routes for all pages; shared `Layout` with `<Nav/>`, `<Footer/>`, `<StickyBar/>`, `<WhatsAppFab/>`.
- Tailwind config extended with brand colors as HSL tokens in `index.css` (semantic: `terra`, `sand`, `sage`, `warm`, `gold`) — no hard-coded colors in components.
- shadcn components: Accordion (FAQ/curriculum), Dialog (Apply modal, gallery lightbox, instructor bios), Sheet (mobile nav), Carousel (testimonials/daily life), Form + Input + Textarea, Toast.
- Framer Motion: `motion.div` with `whileInView` for scroll reveals, layout animations for tabs, page-transition wrapper.
- Real photo URLs sourced directly from baliyttc.com (Optimole CDN) — embedded as remote images so we don't bloat the repo. Fallback hero kept locally.
- Google Maps via standard iframe embed (no API key needed for basic embed).
- Content extracted from real site: course descriptions, curriculum, FAQs, instructor names, address, contact info.
- Folder layout:
  ```text
  src/
    pages/        Home, Course200, Course100, Course300, About, Instructors, Gallery, Contact, NotFound
    components/
      layout/     Nav, Footer, StickyBar, WhatsAppFab, MobileNav
      home/       Hero, TrustStrip, Manifesto, FeaturedCourses, DailyLife, Pillars, Teachers, Accommodation, Testimonials, Schedule, GalleryTeaser, FAQ, LocationMap, FinalCTA
      course/     CourseHero, CourseTimeline, CurriculumAccordion, AccommodationTiers, IncludedList, BatchTable
      shared/     SectionHeading, EditorialImage, Reveal, ApplyModal, Lightbox
    data/         courses.ts, instructors.ts, faqs.ts, testimonials.ts, gallery.ts
    lib/          motion presets, utils
  ```

## Out of scope for this build

- Working backend / form submission (Apply form shows demo toast).
- Payments, login, CMS — pure frontend demo.
- Translations.

After approval I'll build it page by page, starting with the design system (tokens + Nav/Footer + Hero) so you can see the vibe land within the first iteration, then layer in remaining sections and pages.