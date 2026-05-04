## Goal

Replace the top navbar with a **collapsible left sidebar** (matches your screenshot — House of Om style), upgrade the **home hero with a cinematic 4K background video** (House of Om style), polish premium feel, and add **SEO + sitemap**. Keep the existing terracotta/sand/sage palette — no color experiments.

---

## 1. Collapsible Left Sidebar (replaces top navbar)

Use shadcn `Sidebar` (`collapsible="icon"`) wrapped in `SidebarProvider` inside `Layout.tsx`.

**Structure** (matches your reference image exactly):

```text
┌─────────────────────┐
│  [B]  Bali YTTC     │   ← Brand block (logo + UBUD, BALI eyebrow)
│       UBUD, BALI    │
├─────────────────────┤
│  COURSES            │   ← Group label
│  ▸ Home             │   ← active state (terra accent bar)
│  ▸ 100 Hour YTT     │
│  ▸ 200 Hour YTT [Popular]
│  ▸ 300 Hour YTT     │
│  ▸ Hatha-Vinyasa 50hr
├─────────────────────┤
│  SCHOOL             │
│  ▸ About Us         │
│  ▸ Instructors      │
│  ▸ Course Fees      │
├─────────────────────┤
│  EXPERIENCE         │
│  ▸ Gallery          │
│  ▸ Testimonials     │
│  ▸ Youtube Videos   │
├─────────────────────┤
│  Apply Now (CTA)    │   ← footer pinned button
│  WhatsApp           │
└─────────────────────┘
```

**Behavior**
- Desktop: sidebar visible by default at ~280px; collapses to a 64px icon-only rail when toggled. `SidebarTrigger` placed in a slim top bar (only shows logo + trigger + Apply button) so it's always reachable.
- Mobile: sidebar hidden; hamburger trigger opens it as an offcanvas sheet.
- Active route highlight: terra-tinted background + 3px terra left border + terra text.
- Group labels (`COURSES`, `SCHOOL`, `EXPERIENCE`): tiny uppercase tracked, warm-light color.
- Each item has a `lucide` icon (Home, GraduationCap, Flame, Sparkles, Lotus-style icons available).
- Sidebar background: warm-dark (#2c1a0e) like the reference; text cream; matches the dark editorial vibe.
- Top thin bar (over the rest of the page) stays cream/transparent — only contains trigger + tiny breadcrumb + Apply button. The big top navbar is **removed**.

**Files**
- New `src/components/layout/AppSidebar.tsx` — the sidebar definition.
- New `src/components/layout/TopBar.tsx` — slim 48px bar with `SidebarTrigger`, breadcrumb, Apply button.
- Rewrite `src/components/layout/Layout.tsx` to wrap with `SidebarProvider` + flex (sidebar + main).
- Delete usage of old `Nav.tsx` (file kept but no longer imported).
- Update `src/data/site.ts` `NAV` array → grouped structure: `COURSES / SCHOOL / EXPERIENCE`.

---

## 2. Cinematic 4K Hero Video (House of Om vibe)

Replace the static hero image with a full-bleed **muted autoplay looping background video** + dark editorial overlay.

**Source strategy** (since we can't host 4K MP4 in repo):
- Use a free high-quality yoga/Bali nature video from **Pexels/Coverr CDN** (direct mp4, ~1080p–2160p, ~5–8MB). Examples: jungle drone shots, ocean, candle flame, slow yoga pose. I'll embed 2–3 candidate URLs and pick the most cinematic.
- `<video>` with `autoPlay muted loop playsInline preload="metadata" poster={IMG.heroCeremony}` — poster shows instantly, video swaps in.
- `object-cover` full-bleed; `filter: brightness(0.55) saturate(1.05)`; soft vignette + warm gradient overlay (terra→warm-dark) to keep brand tone.
- Subtle Ken Burns scale via Framer Motion scroll parallax (already in current Hero).
- Respects `prefers-reduced-motion` → falls back to poster image.

**Hero copy upgrade** (House of Om editorial polish, kept in English):
- Eyebrow: `BALI · UBUD · EST. 2018`
- Headline (oversized serif, italic accent): *"A 21-day journey to becoming the teacher you were meant to be."*
- Sub: 1 line, lighter weight
- Two CTAs: solid `Apply for 2026` + ghost `Watch the film` (opens YouTube modal — uses an existing baliyttc YouTube link).
- Floating glass review card (already there) — keep, refined.
- Bottom edge: thin marquee strip of trust logos (Yoga Alliance, RYS200, Trustpilot 4.9★) on a dark blurred panel.

---

## 3. Premium polish (where it currently feels flat)

Without touching colors:
- **Typography**: keep Playfair Display for display, swap body to **Inter Tight** (variable, faster, slightly tighter than DM Sans → more "2026 editorial"). Single Google Fonts call, `display=swap`.
- **Manifesto section**: add a thin vertical "EST. 2018" rotated label + animated underline on the headline.
- **Featured Courses**: switch to magazine-style overlapping cards with hover image-zoom + subtle tilt; the 200hr "flagship" card gets a gold ribbon.
- **Daily Life**: convert horizontal scroll into a sticky-scroll "scrollytelling" section (one image fixed left, captions step-fade right as you scroll) — feels House of Om-ish.
- **Section dividers**: thin hairline + serif Roman numerals (`I. The Practice`, `II. The Place`...) for editorial rhythm.
- **Image treatment**: all images get a faint warm duotone overlay on hover and rounded-md (not rounded-2xl — more refined).
- **Micro-interactions**: links underline-grow on hover; buttons get a 1px terra inset on hover instead of color shift.
- **Performance**: lazy-load all below-fold images (`loading="lazy" decoding="async"`), preconnect to Optimole CDN in `index.html`, prefetch hero video poster.

---

## 4. SEO + Sitemap

**Per-page SEO** using `react-helmet-async`:
- Install `react-helmet-async`, wrap `App` with `HelmetProvider`.
- New `src/components/Seo.tsx` reusable component: title, description, canonical, OG tags, Twitter card, JSON-LD.
- Each page (`Index`, `About`, `Instructors`, `Gallery`, `Contact`, `CoursePage`) gets tailored `<Seo>` with real keywords from baliyttc.com (e.g. *"200 Hour Yoga Teacher Training in Bali — Yoga Alliance Certified"*).
- JSON-LD structured data:
  - Home: `Organization` + `LocalBusiness` (address, geo, rating, phone).
  - Course pages: `Course` schema (name, provider, duration, price).
  - About: `Organization`.
  - Breadcrumbs: `BreadcrumbList`.

**Sitemap + robots**
- `public/sitemap.xml` static file with all 8 routes + lastmod.
- Update `public/robots.txt` to allow all + reference sitemap URL.
- `index.html` upgrades: proper `<title>`, meta description, canonical, OG image (hero photo), favicon hookup, theme-color, viewport-fit, preconnect to fonts + Optimole.

**No admin login panel for now** — you said "dekhne layak chahiye, backend bhale na ho." A SEO admin panel needs Lovable Cloud + auth + DB and would be ~3x this scope. I'll add a `// TODO: admin SEO editor` note and structure `Seo.tsx` so each page reads from a central `src/data/seo.ts` config — making it trivial to swap to a DB-backed admin later. If you want the actual admin login + editable SEO panel, say so and I'll add it as a follow-up (needs Lovable Cloud).

---

## Out of scope (this round)
- Working Apply form backend (still demo toast).
- Admin login panel for SEO (structured to add later).
- Color changes (locked per your instruction).
- Video upload/hosting (using free CDN footage).

---

## Tech notes
- shadcn `sidebar` + `collapsible` already present in repo.
- `react-helmet-async` is the only new dep.
- Hero video ~5MB, lazy-mounted after first paint to keep LCP fast (LCP element = poster image).
- Sitemap is static XML — fine for a marketing site of this size.

After your approval I'll build in this order: (1) Sidebar + Layout rewrite, (2) Hero video + copy, (3) Premium polish passes, (4) SEO + sitemap.