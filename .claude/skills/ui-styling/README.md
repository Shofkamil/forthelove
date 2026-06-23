# ui-styling — Claude Code skill

A self-contained Claude Code **skill** for building beautiful, accessible UIs
with **shadcn/ui** (Radix UI + Tailwind), **Tailwind CSS** utility styling, and
a **canvas-based** visual design system.

> Repackaged as a standalone skill from the `ckm:ui-styling` skill
> (author: **claudekit**, MIT). The original ships inside the `ckm` plugin
> namespace; this copy is a plain skill directory you can drop into any
> Claude Code skills folder. The companion `references/` docs and `scripts/`
> here were authored fresh for this standalone bundle, so they may differ from
> the upstream claudekit copies.

## What's in here

```
ui-styling/
├── SKILL.md                         # the skill itself (frontmatter + body)
├── README.md                        # this file
├── references/                      # loaded on demand (progressive disclosure)
│   ├── shadcn-components.md          # component catalog + usage
│   ├── shadcn-theming.md            # theming, CSS vars, dark mode
│   ├── shadcn-accessibility.md      # ARIA, keyboard nav, focus
│   ├── tailwind-utilities.md        # core utility classes
│   ├── tailwind-responsive.md       # mobile-first, breakpoints
│   ├── tailwind-customization.md    # @theme, custom utilities, @layer
│   └── canvas-design-system.md      # visual design philosophy
└── scripts/                         # optional automation
    ├── shadcn_add.py                # wrapper for `npx shadcn add`
    └── tailwind_config_gen.py       # generate tailwind.config.js
```

Only `SKILL.md` is loaded up front. The `references/` files are opened by
Claude **on demand** when a task needs the specifics — this keeps the skill
cheap to keep loaded.

## Install

### Option A — personal/global skill (use it everywhere)

Copy this folder into your user skills directory:

```bash
cp -r ui-styling ~/.claude/skills/ui-styling
```

Now any Claude Code session can use it. It auto-activates when your request
matches the description, or invoke it explicitly with `/ui-styling`.

### Option B — project skill (share it via a repo)

Keep it under a project's `.claude/skills/` directory (where it already lives
in this repo):

```
<your-project>/.claude/skills/ui-styling/
```

Anyone who clones the project gets the skill in their Claude Code sessions.

### Option C — keep the original plugin namespace (`ckm:ui-styling`)

If you specifically want the namespaced `/ckm:ui-styling` form, install the
upstream **claudekit** plugin instead of this standalone copy, e.g.:

```bash
# from inside Claude Code
/plugin marketplace add claudekit/claudekit
/plugin install ckm
```

(Exact marketplace/plugin names depend on the claudekit distribution.)

## Use it

- **Automatic:** just ask for UI work — "build an accessible settings dialog",
  "make this dashboard responsive with dark mode", "design a poster" — and the
  skill activates based on its `description`.
- **Explicit:** type `/ui-styling` (optionally with a component or layout, e.g.
  `/ui-styling pricing table`).

## Verify it's loaded

In a Claude Code session, run `/skills` (or check the skills list) and confirm
`ui-styling` appears. If it doesn't:

1. Confirm the path is `~/.claude/skills/ui-styling/SKILL.md` (or the project's
   `.claude/skills/ui-styling/SKILL.md`).
2. Confirm `SKILL.md` starts with valid YAML frontmatter containing `name:` and
   `description:`.
3. Restart the Claude Code session so it re-scans the skills directories.
