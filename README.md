# HOMORA — Imagine Your Space. Design Your Lifestyle.

A frontend-only home design and interior inspiration website built with
React + Vite, Tailwind CSS, GSAP ScrollTrigger, Framer Motion, Swiper and Lucide.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the production build
```

Requires Node.js 18 or newer.

## Structure

```
src/
  components/   Navbar, HeroSlider, RoomCategories, FeaturedShowcase, StyleExplorer,
                InspirationGallery, DesignProcess, Testimonials, CallToAction, Contact,
                Footer, SearchOverlay, DesignModal, SavedPanel, DesignCard, SaveButton,
                SmartImage, SectionHeading
  data/         designs.js (all designs, rooms, styles, photos), testimonials.js
  hooks/        useFavorites, useMediaQuery, useLockBodyScroll, useDialog
  lib/          gsap.js (plugin registration), scroll.js (smooth scrolling helpers)
  pages/        Home.jsx
```

## Notes

- **Photos** come from Unsplash. Every photo id lives in `src/data/designs.js`;
  replace an id there to change an image anywhere on the site. If a photo fails to
  load, `SmartImage` falls back to a backup photo, then to a plain branded tile.
- **Saved designs** are stored in `localStorage` under `homora:saved-designs`.
- **Contact form** validates in the browser only; nothing is sent to a server.
- **Testimonials** are fictional sample content and are labelled as such.
- **Reduced motion**: with `prefers-reduced-motion`, autoplay, pinning, parallax and
  scroll reveals are switched off and the showcase uses a stacked layout.
- **Shortcuts**: `/` or `Ctrl/Cmd + K` opens search; `Esc` closes overlays.
