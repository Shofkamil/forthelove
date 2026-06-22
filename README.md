# FOR THE LOVE — Fashion &amp; Music Brand Site

A single-page, bold, editorial brand site for a combined **fashion + music**
label. Built as plain HTML/CSS/JS — no build step, no dependencies, no web
fonts, no external requests. Designed to be fast, smooth, and minimal.

> ⚠️ This is a **template skeleton**. All brand content is placeholder. See
> [`assets/PLACEHOLDERS.md`](assets/PLACEHOLDERS.md) for the full replace list.

## View it

Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
index.html            # all sections, in order
css/styles.css        # design tokens + styling (palette locked here)
js/main.js            # rendering, search, likes, bird, nav, demo forms
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

## Not included (intentionally)

- No real logos, graphics, or copy — nothing is invented; slots are labeled.
- The contact form and newsletter are **front-end demos** and send nothing yet;
  wire them to a backend/service. See `assets/PLACEHOLDERS.md`.
