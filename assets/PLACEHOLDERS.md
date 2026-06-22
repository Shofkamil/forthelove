# Placeholder Inventory

Nothing in this site is real brand content yet. Every brand asset, image, and
line of copy is a **clearly labeled placeholder** so you can find and replace it
fast. Markers used throughout:

- `[ REPLACE: ... ]` — swap for real copy.
- Dashed boxes labeled `[ ... — REPLACE ]` — drop a real brand asset here.
- `<!-- REPLACE ... -->` HTML comments — notes on what belongs in a slot.

> Drop real image/logo files into this `assets/` folder and point the markup at
> them (e.g. replace an `.asset-slot` box with `<img src="assets/your-file.jpg" alt="…">`).

---

## Brand assets (images / logos)

| Where | Slot | What to add |
|-------|------|-------------|
| Nav (top-left) | `[ LOGO — REPLACE ]` | Primary brand logo (SVG/PNG). |
| Hero | `[ HERO IMAGE — REPLACE ]` | Full-bleed campaign image or video. |
| Collection cards | `[ IMAGE — REPLACE ]` (×6) | Product/lookbook shots. |
| About | `[ IMAGE — REPLACE ]` | Founder/brand portrait or campaign still. |
| Footer | `[ LOGO — REPLACE ]` | Logo, light/inverted version for dark bg. |

## Copy

| Where | Slot |
|-------|------|
| `<title>` / meta description | Brand name + search description. |
| Hero | Eyebrow / season, brand name, tagline. |
| Collection | Section note. |
| Music | "Now playing" line. |
| About | Lead statement + three stats (number + label). |
| Contact | Section note, email / press / social values. |
| Footer | Tagline, social link labels, copyright name, city/country. |

## Data-driven content (edit in `js/main.js`)

- **`COLLECTION`** array — product `name`, `price`, and optional corner `tag`.
- **`TRACKS`** array — track `title` and `time`.

Add or remove entries freely; the grid, tracklist, search, and likes all update
automatically.

## Demo-only behavior to wire up

- **Contact form** — currently shows a demo confirmation and sends nothing.
  Connect it to a backend or form service (e.g. Formspree, your API).
- **Newsletter input** (footer) — same; connect to your email provider.
- **Bird flourish** — decorative micro-interaction on `[data-bird]` elements;
  keep, restyle, or remove as you like.

## Palette lock

Only three colors may appear anywhere: red `#CC0000`, white `#FFFFFF`, black
`#111111`. Do not introduce other colors when adding assets or styles.
