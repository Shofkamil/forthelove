# Accessibility Patterns

shadcn/ui is built on **Radix UI primitives**, which implement the WAI-ARIA
authoring patterns for you. Most accessibility comes for free — your job is to
not break it and to fill the gaps (labels, alt text, contrast, announcements).

## What Radix handles automatically

- **Roles & ARIA wiring** — `role`, `aria-expanded`, `aria-controls`,
  `aria-selected`, `aria-checked`, `aria-labelledby`/`aria-describedby` are set
  and kept in sync with component state.
- **Keyboard interaction** — arrow-key navigation, `Home`/`End`, type-ahead,
  `Enter`/`Space` activation, `Esc` to dismiss, per the relevant ARIA pattern.
- **Focus management** — focus trapping in modals, focus return to the trigger
  on close, roving tabindex for composite widgets (menus, tabs, radio groups).
- **Dismissal & layering** — outside-click and `Esc` close overlays; nested
  layers dismiss in the right order.

## What you must still do

### 1. Labels for every control
Visible `<Label htmlFor>` or, when no visible label exists, `aria-label` /
`aria-labelledby`. Icon-only buttons **always** need a name:
```tsx
<Button size="icon" aria-label="Open settings"><Settings /></Button>
// or a visually-hidden label:
<Button size="icon"><Settings /><span className="sr-only">Open settings</span></Button>
```

### 2. Alt text on images
```tsx
<AvatarImage src="/jane.png" alt="Jane Doe" />   // meaningful
<img src="/divider.svg" alt="" />                // decorative -> empty alt
```

### 3. Dialog title & description
`DialogTitle` is **required** for an accessible name. If you hide it visually,
keep it in the tree with `sr-only`:
```tsx
<DialogHeader>
  <DialogTitle className="sr-only">Command menu</DialogTitle>
  <DialogDescription className="sr-only">Search and run commands</DialogDescription>
</DialogHeader>
```

### 4. Color contrast
- Body text ≥ **4.5:1**, large text (≥24px or ≥19px bold) ≥ **3:1**.
- UI component boundaries / focus indicators ≥ **3:1** against adjacent colors.
- Never rely on color alone — pair status colors with an icon or text label.

### 5. Visible focus
Keep the `focus-visible:ring-*` utilities shadcn ships. Don't `outline-none`
without a replacement indicator. A keyboard user must always see where focus is.

---

## Keyboard navigation cheat-sheet

| Component | Keys |
|---|---|
| Button / Link | `Enter` (and `Space` for buttons) |
| Dialog / Drawer / Popover | `Esc` closes, focus trapped while open |
| Tabs | `←/→` move, `Home`/`End` jump, `Enter`/`Space` (manual mode) |
| Menu / Dropdown | `↑/↓` move, type-ahead, `Enter` select, `Esc` close |
| Select / Combobox | `↑/↓` options, type-ahead, `Enter` choose |
| RadioGroup | `↑/↓/←/→` move + select |
| Checkbox / Switch | `Space` toggles |
| Slider | `←/→` step, `Home`/`End`, `PageUp/PageDown` |
| Accordion | `Tab` between triggers, `Enter`/`Space` toggle |
| Command (⌘K) | `↑/↓` items, `Enter` run, `Esc` close |

Test the whole flow with **keyboard only** (no mouse): can you reach, operate,
and escape every control, in a sensible order?

---

## Focus management patterns

- **Modal open:** focus moves into the dialog (first focusable or an explicit
  `initialFocus` / `autoFocus`). On close, focus returns to the trigger.
- **Don't auto-focus destructive actions.** In a confirm dialog, default focus
  to **Cancel**, not **Delete**.
- **Roving tabindex** (handled by Radix for composite widgets): the group is one
  tab stop; arrows move within it.
- **Skip link:** offer a "Skip to content" link as the first focusable element
  on full pages.
```tsx
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-background">
  Skip to content
</a>
```

---

## Screen-reader announcements

### Live regions for async/state changes
```tsx
// polite: waits for a pause (status, results count, "Saved")
<p role="status" aria-live="polite">{message}</p>
// assertive: interrupts (errors needing immediate attention)
<p role="alert" aria-live="assertive">{error}</p>
```
- Toasts (Sonner) announce via a live region automatically.
- Update the **text inside** an existing live region; don't add/remove the
  region itself, or the change may not be announced.

### Visually-hidden but available text
Use the `sr-only` utility (and `focus:not-sr-only` to reveal on focus).

---

## Accessible form validation

The shadcn `Form` component (RHF + zod) wires errors correctly: `FormMessage`
renders the error, `FormControl` sets `aria-invalid` and points
`aria-describedby` at the message, and `FormLabel` associates the label.

Checklist when rolling your own:
- Associate each error with its field via `aria-describedby`.
- Set `aria-invalid="true"` on invalid fields.
- Put the message in a live region so it's announced on submit.
- Move focus to the **first invalid field** after a failed submit.
- Don't disable the submit button to convey errors — let users submit and hear
  what's wrong.

```tsx
<Input id="email" aria-invalid={!!error} aria-describedby={error ? "email-error" : undefined} />
{error && <p id="email-error" role="alert" className="text-sm text-destructive">{error}</p>}
```

---

## Quick audit before shipping

1. Tab through the page — logical order, nothing trapped, focus always visible.
2. Every input has a programmatic label; every meaningful image has alt text.
3. Run an automated pass (axe DevTools / Lighthouse) — fix contrast & ARIA flags.
4. Verify with a screen reader (VoiceOver / NVDA) that state changes are spoken.
5. Respect `prefers-reduced-motion` — gate non-essential animation behind it.
