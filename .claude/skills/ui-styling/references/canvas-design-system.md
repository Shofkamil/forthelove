# Canvas Visual Design System

A philosophy and workflow for **museum-quality visual compositions** — posters,
covers, brand boards, hero artwork, social/marketing imagery. This is the
"visual design" layer of the skill, distinct from app UI. The goal is
sophisticated **visual communication** with minimal text and maximum impact.

## Philosophy

1. **Concept before decoration.** Start from one idea and let everything serve
   it. A composition with a clear point of view beats a pile of effects.
2. **Visual communication over text.** Say it with form, scale, color, and
   space. Text is an accent, not the message.
3. **Restraint is a feature.** Fewer elements, fewer colors, fewer fonts —
   executed precisely. Negative space is an active material, not leftover room.
4. **Systematic, not arbitrary.** Every size, gap, and color is a deliberate
   step on a scale. Consistency reads as quality.
5. **Craft the details.** Optical alignment, even rhythm, intentional crops.
   The last 10% is where "fine" becomes "exceptional."

## Composition

- **Grid & structure:** establish a column/baseline grid, then break it on
  purpose for tension. Use the rule of thirds or a strong central axis.
- **Focal hierarchy:** one dominant element, a clear secondary, supporting
  detail. Guide the eye along a deliberate path (Z, F, or diagonal).
- **Scale contrast:** pair the very large with the very small. Oversized type or
  a single hero form against quiet space creates drama.
- **Alignment & edges:** align to a shared axis; let elements bleed off-canvas
  intentionally for energy and to imply continuation.
- **Negative space:** give the focal point room to breathe; crowding kills
  impact.

## Color

- **Tight palette:** 1 dominant + 1 accent + 1 neutral is plenty. Often a single
  hue plus black/white is strongest (see the FOR THE LOVE brand: red/white/black
  only).
- **Intentional accent:** reserve the accent for the one thing that must be
  seen.
- **Contrast & legibility:** keep text well above WCAG AA on its background even
  in "art" pieces.
- **Mood through value:** light/airy vs. dark/dramatic is set by value
  distribution, not hue count.

## Form & type

- **Type as image:** treat headlines as shapes — crop, overlap, set tight
  leading, push weight and scale. One or two families, several weights.
- **Geometry & silhouette:** simple geometric forms and strong silhouettes read
  at any size and reproduce well in print.
- **Texture sparingly:** grain, halftone, or a single graphic motif can add
  depth — one technique, used consistently.

## Spatial & rhythm

- **Consistent spacing scale** (e.g. 8/16/24/40/64). Rhythm = repetition with
  variation.
- **Margins as frame:** generous, even outer margins make a piece feel
  considered. Vary them only to make a point.
- **Optical over mechanical:** nudge for what *looks* centered/aligned, not what
  the math says.

## Minimal text integration

- Lead with a **few high-impact words**; cut everything else.
- Set a clear typographic hierarchy: one headline, one supporting line, one
  small caption/credit.
- Let type **interact** with imagery (overlap, knockout, masking) rather than
  sitting in a separate box.

## Workflow (canvas)

1. **Brief → concept.** One sentence: what must the viewer feel/understand?
2. **Set the system.** Lock palette, type, grid, and spacing scale *before*
   placing elements.
3. **Block composition.** Place the focal element and major masses; resolve
   hierarchy and balance in grayscale first.
4. **Apply the system.** Introduce color/type per the locked tokens.
5. **Refine.** Optical alignment, spacing rhythm, crops, contrast. Remove one
   more thing.
6. **Export.** Correct dimensions/bleed/resolution for the medium (screen vs.
   print).

### Practical canvas notes (HTML5 `<canvas>` / generative art)

- Render at **2×** device pixel ratio for crisp output:
  `canvas.width = w * dpr; ctx.scale(dpr, dpr)`.
- Define tokens once (palette array, spacing unit, type scale) and derive
  positions from them — never hard-code one-off magic numbers.
- Layer back-to-front: background → masses → focal → type → texture/grain.
- For posters, work in print dimensions (e.g. A2 @ 150–300 DPI) and keep text
  inside a safe margin.

## Multi-page / system design

When a piece becomes a set (deck, lookbook, campaign):
- **Shared system, varied layouts.** Same palette/type/grid; change composition
  per page so it's cohesive but not monotonous.
- **Rhythm across spreads:** alternate dense and sparse pages; vary focal
  placement so flipping through has pace.
- **Recurring motifs:** a repeated mark, color, or framing device ties the set
  together.
- **Consistent margins/safe areas** across every page.

## Quality bar (self-check)

- Is there **one** clear idea, instantly legible?
- Could you remove any element and lose nothing? (If yes, remove it.)
- Is every color, size, and gap **on the system**?
- Does the focal point win, with space to breathe?
- Do the details hold up at 100% zoom and at thumbnail size?
- Is text legible and on-contrast everywhere?
