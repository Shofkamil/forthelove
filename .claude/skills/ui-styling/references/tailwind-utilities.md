# Tailwind Core Utilities

Utility-first: compose small classes in markup instead of writing CSS. Classes
are generated at build time and unused ones are purged, so there's zero runtime
cost. Below are the high-frequency utilities, grouped.

## Layout

### Flexbox
```html
<div class="flex items-center justify-between gap-4">…</div>
```
- Direction: `flex-row` / `flex-col` / `flex-row-reverse`
- Wrap: `flex-wrap` / `flex-nowrap`
- Main axis: `justify-start|center|end|between|around|evenly`
- Cross axis: `items-start|center|end|stretch|baseline`
- Item: `flex-1` (grow+shrink), `flex-none`, `grow`, `shrink-0`, `basis-1/2`
- Self: `self-start|center|end|stretch`, order: `order-1`, `order-last`

### Grid
```html
<div class="grid grid-cols-3 gap-6">…</div>
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-8">main</div>
  <div class="col-span-4">aside</div>
</div>
```
- Columns: `grid-cols-{1..12}`, `grid-cols-none`, arbitrary `grid-cols-[200px_1fr]`
- Rows: `grid-rows-{n}`, auto flow: `grid-flow-row|col|dense`
- Span/placement: `col-span-{n}`, `col-start-{n}`, `row-span-{n}`
- Auto-fit responsive grid (no media queries):
  `grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))]`

### Positioning & display
- Display: `block`, `inline-block`, `flex`, `grid`, `hidden`, `contents`
- Position: `relative`, `absolute`, `fixed`, `sticky`
- Inset: `inset-0`, `top-0 right-0`, `inset-x-4`, arbitrary `top-[12px]`
- Z-index: `z-10`, `z-50`, arbitrary `z-[900]`
- Overflow: `overflow-hidden|auto|scroll`, `overflow-x-auto`
- Float/clear (rare): `float-left`, `clear-both`

### Sizing
- Width: `w-4` (1rem), `w-1/2`, `w-full`, `w-screen`, `w-fit`, `w-min`, `w-max`, `w-[320px]`
- Height: `h-10`, `h-full`, `h-screen` (and `h-svh`/`h-dvh` for mobile-safe vh)
- Constraints: `min-w-0`, `max-w-md|lg|xl|7xl`, `max-w-prose`, `min-h-screen`
- Aspect: `aspect-square`, `aspect-video`, `aspect-[4/5]`

## Spacing

Scale is `0.25rem` per step (`4` = 1rem, `8` = 2rem…).
- Padding: `p-4`, `px-6`, `py-2`, `pt-8`, arbitrary `p-[18px]`
- Margin: `m-4`, `mx-auto` (center), `mt-8`, negative `-mt-2`
- Gap (flex/grid): `gap-4`, `gap-x-6`, `gap-y-2`
- Owl spacing between children: `space-y-4`, `space-x-2`

## Typography

- Size: `text-xs sm base lg xl 2xl … 9xl`, arbitrary `text-[15px]`
- Weight: `font-thin … font-normal font-medium font-semibold font-bold font-extrabold font-black`
- Family: `font-sans`, `font-serif`, `font-mono` (extend in theme for custom)
- Line height: `leading-none|tight|snug|normal|relaxed|loose`, `leading-[1.1]`
- Tracking: `tracking-tighter|tight|normal|wide|widest`, `tracking-[-0.02em]`
- Align: `text-left|center|right|justify`
- Transform: `uppercase`, `lowercase`, `capitalize`, `normal-case`
- Decoration: `underline`, `line-through`, `no-underline`, `underline-offset-4`
- Wrapping: `truncate`, `text-ellipsis`, `text-balance`, `text-pretty`, `break-words`
- Clamp lines: `line-clamp-2`, `line-clamp-3`

## Colors & backgrounds

- Text: `text-{color}-{50..950}` e.g. `text-slate-700`, semantic `text-foreground`
- Background: `bg-{color}`, `bg-transparent`, `bg-current`
- Opacity via slash: `bg-black/50`, `text-white/80`, `border-primary/20`
- Gradients: `bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`
- Arbitrary: `bg-[#CC0000]`, `text-[oklch(0.7_0.2_20)]`, `bg-[--brand]`

> When using a design-token system (shadcn), prefer semantic classes
> (`bg-background`, `text-muted-foreground`, `border-border`) over literal
> palette colors so dark mode and theming work automatically.

## Borders & radius

- Width: `border`, `border-2`, `border-x`, `border-t-4`, `border-0`
- Color: `border-slate-200`, `border-border`, `divide-y divide-border`
- Radius: `rounded`, `rounded-md|lg|xl|2xl|full`, per-corner `rounded-tl-lg`, `rounded-[14px]`
- Ring (focus): `ring-2 ring-ring ring-offset-2`, `focus-visible:ring-2`
- Outline: `outline-none`, `outline-2 outline-offset-2`

## Shadows & effects

- Shadow: `shadow-sm|md|lg|xl|2xl`, `shadow-none`, colored `shadow-lg shadow-indigo-500/40`
- Opacity: `opacity-0|50|100`
- Blur/backdrop: `blur-sm`, `backdrop-blur-md`, `backdrop-saturate-150`
- Mix: `mix-blend-multiply`, `bg-blend-overlay`

## Transitions & transforms (performant)

- Transition: `transition`, `transition-colors|transform|opacity`, `duration-200`, `ease-out`, `delay-100`
- Transform (GPU-friendly): `scale-95`, `translate-y-1`, `-rotate-2`, `transform-gpu`
- Group/peer hover: `group` + `group-hover:opacity-100`, `peer` + `peer-checked:block`
- Animations: `animate-spin|ping|pulse|bounce`

Prefer animating **transform** and **opacity** only for 60fps; avoid animating
layout properties (width/height/top/left) in hot paths.

## State & variant prefixes

Stack prefixes before any utility:
```html
<button class="bg-primary hover:bg-primary/90 focus-visible:ring-2 active:scale-95 disabled:opacity-50 dark:bg-primary/80">
```
Common: `hover:` `focus:` `focus-visible:` `active:` `disabled:` `dark:`
`first:` `last:` `odd:` `even:` `group-hover:` `peer-focus:` `aria-checked:`
`data-[state=open]:` `motion-safe:` `motion-reduce:` `print:`.

## Arbitrary values & properties

- Arbitrary value: `top-[117px]`, `grid-cols-[1fr_2fr]`, `text-[13px]`
- Arbitrary property: `[mask-type:luminance]`, `[content:'']`
- CSS variable references: `bg-[--brand]`, `w-[var(--sidebar)]`
- Escape spaces with underscores: `grid-cols-[1fr_500px_2fr]`

> Reach for arbitrary values sparingly — they're an escape hatch. Recurring
> values belong in the theme (see `tailwind-customization.md`).

## The `cn()` helper

Merge conditional + incoming classes without conflicts (clsx + tailwind-merge):
```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
```
```tsx
<div className={cn("p-4 rounded-md", isActive && "bg-accent", className)} />
```
`twMerge` ensures later classes win on conflicts (e.g. `p-2` then `p-4` → `p-4`).
