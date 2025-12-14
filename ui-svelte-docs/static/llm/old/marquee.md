## Marquee Component

Scrolling content widget for horizontal or vertical overflow.

```svelte
<Marquee
  speed="normal"
  orientation="horizontal"
  pauseOnHover={true}
  fade={true}
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Marquee>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `items` | `[]` | Array of MarqueeItem (alternative to children) |
| `speed` | `'normal'` | `slow` `normal` `fast` |
| `pauseOnHover` | `false` | Pause animation on hover |
| `reverse` | `false` | Reverse scroll direction |
| `orientation` | `'horizontal'` | `horizontal` `vertical` |
| `fade` | `false` | Fade edges effect |
| `fadeColor` | `'white'` | Fade gradient color |
| `gap` | `'0'` | Gap between items (CSS value) |
| `class` | - | Custom CSS classes |
| `itemClass` | - | Classes for items |
| `children` | - | Snippet for content |

### MarqueeItem Type

| Prop | Type | Required |
|------|------|----------|
| `id` | `string \| number` | Yes |
| `content` | `Snippet` | Yes |

### Common Patterns

```svelte
<!-- Using Children (Simple) -->
<Marquee speed="normal" pauseOnHover>
  <div class="px-6 py-3 bg-primary text-on-primary rounded-lg">React</div>
  <div class="px-6 py-3 bg-primary text-on-primary rounded-lg">Vue</div>
  <div class="px-6 py-3 bg-primary text-on-primary rounded-lg">Svelte</div>
</Marquee>

<!-- Using Items Array -->
{#snippet tech1()}
  <div class="px-6 py-3 bg-primary rounded-lg">React</div>
{/snippet}

{#snippet tech2()}
  <div class="px-6 py-3 bg-primary rounded-lg">Vue</div>
{/snippet}

<Marquee items={[
  { id: 1, content: tech1 },
  { id: 2, content: tech2 }
]} />

<!-- Fast Speed with Gap -->
<Marquee speed="fast" gap="2rem">
  <div>Item 1</div>
  <div>Item 2</div>
</Marquee>

<!-- Vertical Orientation -->
<div class="h-[300px]">
  <Marquee orientation="vertical" pauseOnHover>
    <div>Vertical Item 1</div>
    <div>Vertical Item 2</div>
  </Marquee>
</div>

<!-- With Fade Effect -->
<Marquee fade fadeColor="#f0f0f0" pauseOnHover>
  <div>Fading Item 1</div>
  <div>Fading Item 2</div>
</Marquee>

<!-- Reverse Direction -->
<Marquee reverse speed="slow">
  <div>← Scrolling Left</div>
  <div>← Scrolling Left</div>
</Marquee>
```

**For LLMs**: Marquee scrolls content when it overflows. Use `children` for simple content or `items` array for more control. `speed` controls animation speed. `pauseOnHover` stops on mouse hover. `fade` adds gradient edges (set `fadeColor` to match background). `gap` adds spacing between items. `reverse` changes scroll direction. Supports both `horizontal` and `vertical` orientations. Auto-detects overflow; no animation if content fits.

---

## Quick Hierarchy Reference
```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (Marquee, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
