# FOR THE LOVE — Fashion &amp; Music Brand Site

A single-page, bold, editorial brand site for a combined **fashion + music**
label. Written as vanilla HTML/CSS/JS and bundled by **Vite**, with
**Tailwind CSS v4** wired in via `@tailwindcss/vite`. No web fonts and no
external runtime requests — Tailwind is compiled at build time. Designed to be
fast, smooth, and minimal.

> ⚠️ This is a **template skeleton**. All brand content is placeholder. See
> [`assets/PLACEHOLDERS.md`](assets/PLACEHOLDERS.md) for the full replace list.

## Develop

Install dependencies once, then start the Vite dev server (hot reload):

```bash
npm install
npm run dev        # http://localhost:5173
```

Build a production bundle into `dist/` (Tailwind is compiled here and unused
utilities are stripped), then preview that build:

```bash
npm run build
npm run preview
```

> The JS now loads as an ES module and the CSS is compiled by Vite, so opening
> `index.html` directly from the filesystem no longer works — use the dev
> server or the previewed build.

## Structure

```
index.html            # all sections, in order; Vite entry
css/styles.css        # @import "tailwindcss" + design tokens (palette locked)
js/main.js            # rendering, search, likes, bird, nav, demo forms
vite.config.js        # Vite config + @tailwindcss/vite plugin
assets/PLACEHOLDERS.md# inventory of every replaceable slot
```

## Sections (in order)

1. **Sticky nav** — logo slot, anchor links with active-state highlighting,
   search toggle, live likes counter, mobile menu.
2. **Hero** — full-bleed image slot + oversized brand headline and tagline.
3. **Collection grid** — responsive product cards with like buttons.
4. **Music tracklist** — numbered tracks on a black accent section.
5. **About** — short statement + stats.
6. **Contact + footer** — demo form, contact details, footer with newsletter.

## Signature details

- **Bird flourish** — any button/link with `data-bird` releases a small red
  (white on dark) bird that flies up and fades from the click point. Disabled
  under `prefers-reduced-motion`.
- **Search** — the nav search live-filters **both** the collection grid and the
  tracklist, with a "No results" state.
- **Likes** — like buttons toggle and update the nav counter.

## Editing content

- Product cards → `COLLECTION` array in `js/main.js`.
- Tracks → `TRACKS` array in `js/main.js`.
- Everything else → labeled placeholders in `index.html`.
- Brand assets → drop files in `assets/` and point the markup at them.

## Design constraints (please keep)

- **Palette is locked:** red `#CC0000`, white `#FFFFFF`, black `#111111` only.
  No other colors, no gradients, no grays.
- **Typography:** uppercase, tight letter-spacing, heavy weight, system
  Helvetica/Arial stack.
- **Minimal:** little copy, no decorative clutter, transform/opacity-only
  animations.
- **Tailwind:** utilities are available, but the rules in `css/styles.css` are
  unlayered and intentionally win over Tailwind's base/preflight. Honor the
  palette lock — prefer the `--red`/`--white`/`--black` tokens over off-palette
  Tailwind color utilities.

## Not included (intentionally)

- No real logos, graphics, or copy — nothing is invented; slots are labeled.
- The contact form and newsletter are **front-end demos** and send nothing yet;
  wire them to a backend/service. See `assets/PLACEHOLDERS.md`.
