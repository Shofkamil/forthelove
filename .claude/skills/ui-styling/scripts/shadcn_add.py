#!/usr/bin/env python3
"""Add shadcn/ui components via the official CLI.

Thin, dependency-free wrapper around `npx shadcn@latest add ...` that:
  - validates you're in a project (package.json present),
  - lets you pick the package runner (npx/pnpm/bun/yarn),
  - forwards flags like --overwrite / --yes,
  - prints the exact command and (optionally) just shows it with --dry-run.

Examples:
  python scripts/shadcn_add.py button card dialog
  python scripts/shadcn_add.py form --overwrite
  python scripts/shadcn_add.py --runner pnpm button
  python scripts/shadcn_add.py --all            # interactive picker
  python scripts/shadcn_add.py button --dry-run # print the command only
"""
from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

RUNNERS = {
    "npx": ["npx", "shadcn@latest"],
    "pnpm": ["pnpm", "dlx", "shadcn@latest"],
    "bun": ["bunx", "--bun", "shadcn@latest"],
    "yarn": ["yarn", "dlx", "shadcn@latest"],
}


def build_command(runner: str, components: list[str], extra: list[str], pick_all: bool) -> list[str]:
    cmd = list(RUNNERS[runner]) + ["add"]
    if pick_all:
        cmd.append("--all")
    cmd += components
    cmd += extra
    return cmd


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Add shadcn/ui components with the official CLI.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("components", nargs="*", help="component names, e.g. button card dialog")
    parser.add_argument("--runner", choices=sorted(RUNNERS), default="npx",
                        help="package runner (default: npx)")
    parser.add_argument("--all", action="store_true", dest="pick_all",
                        help="open the interactive picker / add all")
    parser.add_argument("--overwrite", action="store_true", help="overwrite existing files")
    parser.add_argument("--yes", action="store_true", help="skip confirmation prompts")
    parser.add_argument("--dry-run", action="store_true", help="print the command without running it")
    args = parser.parse_args()

    if not args.components and not args.pick_all:
        parser.error("give at least one component, or use --all")

    if not Path("package.json").exists():
        print("warning: no package.json in the current directory — run this from your project root.",
              file=sys.stderr)

    runner_bin = RUNNERS[args.runner][0]
    if not args.dry_run and shutil.which(runner_bin) is None:
        print(f"error: '{runner_bin}' not found on PATH. Install Node/{args.runner} first.",
              file=sys.stderr)
        return 127

    extra: list[str] = []
    if args.overwrite:
        extra.append("--overwrite")
    if args.yes:
        extra.append("--yes")

    cmd = build_command(args.runner, args.components, extra, args.pick_all)
    printable = " ".join(cmd)
    print(f"$ {printable}")
    if args.dry_run:
        return 0

    try:
        return subprocess.call(cmd)
    except KeyboardInterrupt:
        return 130


if __name__ == "__main__":
    raise SystemExit(main())
