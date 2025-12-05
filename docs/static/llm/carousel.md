## Carousel Component

Cycle through slides or content panels with navigation controls.

```svelte
<Carousel
  slides={slides}
  variant="default"
  size="md"
  orientation="horizontal"
  autoplay={false}
  loop={true}
  showControls={true}
  showIndicators={true}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `slides` | `[]` | Array of slides (required) |
| `autoplay` | `false` | Auto-advance slides |
| `autoplayInterval` | `3000` | Interval in ms |
| `loop` | `true` | Loop back to start |
| `showControls` | `true` | Show prev/next buttons |
| `showIndicators` | `true` | Show dot indicators |
| `showNavigation` | `false` | Show navigation thumbnails |
| `showCounter` | `false` | Show slide counter |
| `orientation` | `'horizontal'` | `horizontal` `vertical` |
| `variant` | `'default'` | `primary` `secondary` `muted` `default` |
| `size` | `'md'` | `sm` `md` `lg` |
| `indicatorType` | `'dot'` | `bar` `dot` |
| `onSlideChange` | - | Callback `(index) => void` |

### Slide Type

| Prop | Type | Required |
|------|------|----------|
| `id` | `string \| number` | Yes |
| `content` | `Snippet \| string` | Yes |

### Common Patterns

```svelte
<!-- Basic Carousel -->
{#snippet slide1()}
  <div class="h-64 bg-blue-100 flex items-center justify-center">
    <h3>Slide 1</h3>
  </div>
{/snippet}

{#snippet slide2()}
  <div class="h-64 bg-purple-100 flex items-center justify-center">
    <h3>Slide 2</h3>
  </div>
{/snippet}

<Carousel slides={[
  { id: '1', content: slide1 },
  { id: '2', content: slide2 }
]} />

<!-- Autoplay -->
<Carousel slides={slides} autoplay autoplayInterval={5000} />

<!-- Vertical Orientation -->
<Carousel slides={slides} orientation="vertical" size="lg" />

<!-- With Counter and Navigation -->
<Carousel 
  slides={slides}
  showCounter
  showNavigation
  indicatorType="bar"
/>

<!-- Minimal (no controls) -->
<Carousel 
  slides={slides}
  showControls={false}
  showIndicators={false}
  autoplay
/>

<!-- With Callback -->
<Carousel 
  slides={slides}
  onSlideChange={(index) => console.log('Slide:', index)}
/>
```

**For LLMs**: Carousel displays slides with navigation. Use `autoplay` for automatic rotation. `loop` enables infinite scrolling. `showControls`, `showIndicators`, `showNavigation`, `showCounter` control UI elements. Supports both horizontal and vertical orientations. Each slide needs `id` and `content` (Snippet).

---

## Quick Hierarchy Reference
```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (Carousel, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
