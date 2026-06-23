#!/usr/bin/env python3
"""Generate a tailwind.config.js (or a v4 @theme CSS block) with custom tokens.

Dependency-free. Produces a `theme.extend` config (Tailwind v3) by default, or a
CSS-first `@theme { ... }` block for Tailwind v4 with --v4.

Examples:
  python scripts/tailwind_config_gen.py --colors brand:#3b5bdb ink:#111111 \\
      --fonts display:Inter body:"Helvetica Neue"
  python scripts/tailwind_config_gen.py --colors brand:blue --v4
  python scripts/tailwind_config_gen.py --colors brand:#cc0000 -o tailwind.config.js

Token syntax:
  --colors  name:value   (value is any CSS color: #hex, rgb(), oklch(), keyword)
  --fonts   name:Family   (quote families with spaces)
  --spacing name:value   (e.g. section:7.5rem)
  --radius  name:value   (e.g. card:1rem)
"""
from __future__ import annotations

import argparse
import sys


def parse_pairs(items: list[str], label: str) -> dict[str, str]:
    out: dict[str, str] = {}
    for item in items or []:
        if ":" not in item:
            sys.exit(f"error: --{label} expects name:value, got '{item}'")
        name, value = item.split(":", 1)
        name, value = name.strip(), value.strip()
        if not name or not value:
            sys.exit(f"error: --{label} has an empty name or value in '{item}'")
        out[name] = value
    return out


def js_string(value: str) -> str:
    return '"' + value.replace('"', '\\"') + '"'


def gen_v3(colors, fonts, spacing, radius) -> str:
    def color_block(d):
        return "".join(f"        {js_string(k)}: {js_string(v)},\n" for k, v in d.items())

    def font_block(d):
        return "".join(
            f"        {js_string(k)}: [{', '.join(js_string(p.strip()) for p in v.split(','))}],\n"
            for k, v in d.items()
        )

    def scale_block(d):
        return "".join(f"        {js_string(k)}: {js_string(v)},\n" for k, v in d.items())

    sections = []
    if colors:
        sections.append(f"      colors: {{\n{color_block(colors)}      }},")
    if fonts:
        sections.append(f"      fontFamily: {{\n{font_block(fonts)}      }},")
    if spacing:
        sections.append(f"      spacing: {{\n{scale_block(spacing)}      }},")
    if radius:
        sections.append(f"      borderRadius: {{\n{scale_block(radius)}      }},")
    extend = "\n".join(sections)

    return f"""/** @type {{import('tailwindcss').Config}} */
export default {{
  content: ["./index.html", "./src/**/*.{{js,ts,jsx,tsx}}"],
  darkMode: "class",
  theme: {{
    extend: {{
{extend}
    }},
  }},
  plugins: [],
}}
"""


def gen_v4(colors, fonts, spacing, radius) -> str:
    lines = ["@import \"tailwindcss\";", "", "@theme {"]
    for k, v in colors.items():
        lines.append(f"  --color-{k}: {v};")
    for k, v in fonts.items():
        fams = ", ".join(p.strip() for p in v.split(","))
        lines.append(f"  --font-{k}: {fams};")
    for k, v in spacing.items():
        lines.append(f"  --spacing-{k}: {v};")
    for k, v in radius.items():
        lines.append(f"  --radius-{k}: {v};")
    lines.append("}")
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Generate Tailwind theme config from custom tokens.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--colors", nargs="*", metavar="name:value", help="custom colors")
    parser.add_argument("--fonts", nargs="*", metavar="name:Family", help="custom font families")
    parser.add_argument("--spacing", nargs="*", metavar="name:value", help="custom spacing tokens")
    parser.add_argument("--radius", nargs="*", metavar="name:value", help="custom radius tokens")
    parser.add_argument("--v4", action="store_true", help="emit a Tailwind v4 @theme CSS block")
    parser.add_argument("-o", "--output", help="write to a file instead of stdout")
    args = parser.parse_args()

    colors = parse_pairs(args.colors, "colors")
    fonts = parse_pairs(args.fonts, "fonts")
    spacing = parse_pairs(args.spacing, "spacing")
    radius = parse_pairs(args.radius, "radius")

    if not any([colors, fonts, spacing, radius]):
        parser.error("provide at least one of --colors / --fonts / --spacing / --radius")

    out = gen_v4(colors, fonts, spacing, radius) if args.v4 else gen_v3(colors, fonts, spacing, radius)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(out)
        print(f"wrote {args.output}")
    else:
        sys.stdout.write(out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
