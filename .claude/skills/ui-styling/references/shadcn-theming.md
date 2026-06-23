# shadcn/ui Theming & Customization

shadcn/ui themes through **CSS variables** mapped to **semantic Tailwind color
tokens**. You restyle the whole app by editing variables in one CSS file — not
by touching every component.

## The CSS variable system

`init` writes design tokens into your global stylesheet. Each token has a light
value and a `.dark` override. Components reference them via semantic Tailwind
classes (`bg-background`, `text-foreground`, `border-border`, …).

```css
/* globals.css — Tailwind v4 style (OKLCH values, @theme inline mapping) */
@import "tailwindcss";

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  /* …dark overrides for the rest… */
}

/* map CSS vars -> Tailwind theme tokens so `bg-background` etc. work */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}
```

> **Tailwind v3 equivalent:** the same variables are stored as HSL channel
> triplets (e.g. `--primary: 222.2 47.4% 11.2%`) and consumed in
> `tailwind.config.js` as `hsl(var(--primary))`. Pick the format matching your
> Tailwind major version.

### Semantic token pairs
Always pair a surface with its foreground so text stays legible in both modes:

| Surface token | Text token |
|---|---|
| `background` | `foreground` |
| `card` | `card-foreground` |
| `primary` | `primary-foreground` |
| `secondary` | `secondary-foreground` |
| `muted` | `muted-foreground` |
| `accent` | `accent-foreground` |
| `destructive` | (light foreground) |

Use them instead of literal colors: `className="bg-card text-card-foreground"`.

---

## Dark mode

### Next.js (App Router) with next-themes
```bash
npm install next-themes
```
```tsx
// components/theme-provider.tsx
"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```
```tsx
// app/layout.tsx — suppressHydrationWarning avoids the SSR/client class mismatch
<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </body>
</html>
```

### Theme toggle
```tsx
"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 dark:scale-0 transition-transform" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100 transition-transform" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Vite / non-Next
Use a tiny provider that toggles the `.dark` class on `<html>` and persists to
`localStorage` (and read `prefers-color-scheme` for the initial value). The
shadcn docs ship a ready-made `ThemeProvider` for Vite.

---

## Recoloring the app (brand palette)

1. Change the `--primary` / `--primary-foreground` pair (and `--ring`) in both
   `:root` and `.dark`. Everything that uses `bg-primary`/`text-primary`
   updates at once.
2. Prefer **OKLCH** (v4) for perceptually even lightness when generating tints.
3. Keep enough contrast — primary text on primary background should clear WCAG
   AA (≥ 4.5:1 for body text).
4. Use the official theme generator at https://ui.shadcn.com/themes to preview
   and copy a full variable block, then paste it over your tokens.

---

## Component variants (cva)

shadcn components define variants with **class-variance-authority**. Extend or
add variants by editing the component's `cva(...)` call:

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // add your own:
        brand: "bg-[--brand] text-white hover:bg-[--brand]/90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)
```

- Always merge incoming `className` last via `cn(buttonVariants({ variant, size }), className)` so call-site overrides win.
- `border-radius` is centralized in `--radius`; change it once to reshape every component.
