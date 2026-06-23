# Responsive Design with Tailwind

Tailwind is **mobile-first**: an unprefixed utility applies at all sizes; a
breakpoint prefix applies at that width **and up**. Design the small screen
first, then layer overrides for larger screens.

## Breakpoints (min-width)

| Prefix | Min width | Typical target |
|--------|-----------|----------------|
| (none) | 0         | phones (base)  |
| `sm:`  | 640px     | large phone / small tablet |
| `md:`  | 768px     | tablet         |
| `lg:`  | 1024px    | laptop         |
| `xl:`  | 1280px    | desktop        |
| `2xl:` | 1536px    | large desktop  |

## Mobile-first mental model

```html
<!-- 1 column on phones, 2 on tablet, 3 on laptop+ -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">…</div>
```
Read it as: "base = 1 col; from `md` up = 2; from `lg` up = 3." Don't write
`sm:grid-cols-1` for the phone case — the unprefixed class already covers it.

❌ Anti-pattern (desktop-first thinking):
```html
<div class="lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
```
✅ Correct (base then up):
```html
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

## Common responsive patterns

### Responsive container
```html
<div class="container mx-auto px-4 sm:px-6 lg:px-8">…</div>
```
Or a max-width clamp: `class="mx-auto w-full max-w-7xl px-4"`.

### Stack → row
```html
<div class="flex flex-col md:flex-row gap-4">…</div>
```

### Show/hide by breakpoint
```html
<nav class="hidden md:flex">…desktop nav…</nav>
<button class="md:hidden" aria-label="Open menu">≡</button>
```

### Responsive type & spacing
```html
<h1 class="text-3xl sm:text-4xl lg:text-6xl">…</h1>
<section class="py-12 md:py-20 lg:py-28">…</section>
```
Or skip breakpoints entirely with fluid clamps:
`class="text-[clamp(2rem,6vw,4.5rem)]"`.

### Sidebar layout
```html
<div class="grid lg:grid-cols-[260px_1fr] gap-8">
  <aside class="hidden lg:block">…</aside>
  <main>…</main>
</div>
```

### Auto-responsive grid (no breakpoints needed)
```html
<div class="grid gap-6 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">…</div>
```
Cards reflow to fit available width automatically.

## Container queries (component-level responsiveness)

Respond to the **parent's** width, not the viewport — ideal for reusable cards
that live in different-width slots.

```html
<div class="@container">
  <div class="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-4">…</div>
</div>
```
- Mark the parent `@container` (optionally named: `@container/sidebar`).
- Use `@sm: @md: @lg: @xl:` prefixes on children (and named `@md/sidebar:`).
- Tailwind v4 has container queries built in; v3 needs
  `@tailwindcss/container-queries`.

## Max-width (and range) variants

Apply styles **below** a breakpoint, or only within a range:
```html
<div class="max-md:hidden">visible from md up</div>
<div class="md:max-xl:bg-accent">only between md and xl</div>
```

## Orientation, motion & other media variants

```html
<div class="portrait:flex-col landscape:flex-row">…</div>
<div class="motion-safe:animate-fade motion-reduce:animate-none">…</div>
<div class="print:hidden">hidden when printing</div>
<div class="supports-[backdrop-filter]:backdrop-blur">…</div>
```

## Custom breakpoints

**Tailwind v4** (CSS-first):
```css
@import "tailwindcss";
@theme {
  --breakpoint-xs: 30rem;     /* adds xs: */
  --breakpoint-3xl: 120rem;   /* adds 3xl: */
}
```
**Tailwind v3** (`tailwind.config.js`):
```js
export default {
  theme: { extend: { screens: { xs: "480px", "3xl": "1920px" } } },
}
```

## Testing checklist

1. 320px (small phone) — nothing overflows, tap targets ≥ 44px.
2. 768px (tablet) — the stack→row / 2-col transitions look intentional.
3. 1280px+ — content is centered with a sensible `max-w`, not edge-to-edge.
4. Zoom to 200% — layout still works (use rem-based sizing).
5. Use `h-dvh`/`min-h-dvh` instead of `h-screen` for full-height mobile layouts
   to avoid the iOS URL-bar jump.
