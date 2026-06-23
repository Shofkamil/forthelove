# Tailwind Customization

How to extend Tailwind with your own tokens, utilities, variants, and component
classes. **Tailwind v4** is CSS-first (configure in CSS via `@theme`);
**Tailwind v3** uses a JS config (`tailwind.config.js`). Both are shown.

## v4: the `@theme` directive

Define design tokens directly in CSS. Each `--namespace-*` variable becomes a
real utility. The variables are also emitted as CSS custom properties you can
reference anywhere.

```css
@import "tailwindcss";

@theme {
  /* colors -> bg-brand, text-brand, border-brand, etc. */
  --color-brand: oklch(0.62 0.21 256);
  --color-brand-foreground: oklch(0.98 0 0);
  --color-ink: #111111;

  /* fonts -> font-display, font-body */
  --font-display: "Clash Display", sans-serif;
  --font-body: "Inter", system-ui, sans-serif;

  /* spacing -> p-section, gap-section, etc. */
  --spacing-section: 7.5rem;

  /* breakpoints -> xs:, 3xl: */
  --breakpoint-xs: 30rem;
  --breakpoint-3xl: 120rem;

  /* radius, shadows, easing… */
  --radius-card: 1rem;
  --ease-snappy: cubic-bezier(0.22, 0.61, 0.36, 1);
}
```
Token namespaces include `--color-*`, `--font-*`, `--text-*` (font sizes),
`--spacing-*`, `--breakpoint-*`, `--radius-*`, `--shadow-*`, `--ease-*`,
`--animate-*`. Use `@theme inline` when a token should reference another CSS
variable (common in shadcn token mapping).

## v3: `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,html}"],
  darkMode: "class",
  theme: {
    extend: {                     // extend = add to defaults (keep the scale)
      colors: {
        brand: { DEFAULT: "#3b5bdb", fg: "#ffffff" },
        ink: "#111111",
      },
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      spacing: { section: "7.5rem" },
      borderRadius: { card: "1rem" },
      screens: { xs: "480px", "3xl": "1920px" },
    },
  },
  plugins: [],
}
```
Put new tokens under `theme.extend` to **add** without dropping Tailwind's
defaults. Putting them directly under `theme` **replaces** that scale entirely.

> Generate a starter v3 config with custom colors/fonts using
> `scripts/tailwind_config_gen.py` in this skill.

## Custom utilities

**v4** — `@utility` (works with all variants like `hover:`, `md:`):
```css
@utility text-shadow-sm { text-shadow: 0 1px 2px rgb(0 0 0 / 0.2); }
@utility tap-highlight-none { -webkit-tap-highlight-color: transparent; }
```

**v3 (or either)** — `@layer utilities`:
```css
@layer utilities {
  .text-shadow-sm { text-shadow: 0 1px 2px rgb(0 0 0 / 0.2); }
  .scrollbar-none { scrollbar-width: none; }
  .scrollbar-none::-webkit-scrollbar { display: none; }
}
```

## Custom variants

**v4** — `@custom-variant`:
```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
/* usage: theme-midnight:bg-black */
```
**v3** — `addVariant` plugin:
```js
import plugin from "tailwindcss/plugin"
export default {
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("theme-midnight", '[data-theme="midnight"] &')
      addVariant("hocus", ["&:hover", "&:focus"])
    }),
  ],
}
```

## Component classes with `@apply`

Extract a repeated utility combo into a named class. Use **sparingly** — prefer
a React/JSX component for true reuse; reach for `@apply` mainly for elements you
can't componentize (markdown output, third-party HTML).

```css
@layer components {
  .btn {
    @apply inline-flex items-center justify-center rounded-md px-4 py-2
           text-sm font-medium transition-colors
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring;
  }
  .btn-primary { @apply bg-primary text-primary-foreground hover:bg-primary/90; }
  .prose-a { @apply underline underline-offset-4 hover:text-primary; }
}
```

## Layer organization

`@layer base | components | utilities` controls cascade order so utilities can
always override component classes.

```css
@layer base {
  /* element defaults, CSS variables, font-face, resets */
  :root { --radius: 0.625rem; }
  h1 { @apply text-3xl font-bold tracking-tight; }
  body { @apply bg-background text-foreground antialiased; }
}
@layer components { /* .btn, .card, reusable patterns */ }
@layer utilities  { /* one-off helpers, escape hatches */ }
```

## Plugins (v3) / first-party features

- Official: `@tailwindcss/typography` (`prose`), `@tailwindcss/forms`,
  `@tailwindcss/container-queries` (built into v4).
- Author a plugin to inject base styles, components, utilities, or variants:
```js
import plugin from "tailwindcss/plugin"
export default {
  plugins: [
    plugin(({ addUtilities, addComponents, theme }) => {
      addUtilities({ ".content-auto": { "content-visibility": "auto" } })
      addComponents({
        ".card": {
          borderRadius: theme("borderRadius.lg"),
          padding: theme("spacing.6"),
          boxShadow: theme("boxShadow.md"),
        },
      })
    }),
  ],
}
```

## Migration note (v3 → v4)

- Config moves from JS to CSS `@theme`; `tailwind.config.js` is optional (load
  it with `@config "./tailwind.config.js"` if you keep one).
- `@tailwind base/components/utilities` → a single `@import "tailwindcss"`.
- Setup is just the Vite/PostCSS plugin + the import; no `init` step required.
- Colors default to **OKLCH**; opacity uses the `/` slash syntax everywhere.
