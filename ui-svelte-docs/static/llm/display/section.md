# Section Component

Layout container for page content. Must be direct child of pages.

## Import

```svelte
import { Section } from 'ui-svelte';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cover` | `string` | - | Background image URL |
| `color` | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Color theme |
| `variant` | `'solid' \| 'soft' \| 'ghost'` | `'ghost'` | Visual style |
| `isBoxed` | `boolean` | `false` | Constrain content width |
| `rootClass` | `string` | - | Classes for container |
| `bodyClass` | `string` | - | Classes for content wrapper |
| `coverClass` | `string` | - | Classes for cover image |
| `overlayClass` | `string` | - | Classes for cover overlay |

## Patterns

### Hero Section
```svelte
<Section cover="/hero.jpg" variant="solid" rootClass="min-h-screen">
  <div class="text-white text-center">
    <h1 class="hero-title">Welcome</h1>
    <p class="hero-subtitle">Build amazing apps</p>
    <Button color="primary" size="lg">Get Started</Button>
  </div>
</Section>
```

### Content Section
```svelte
<Section color="surface" variant="soft" isBoxed>
  <h2 class="section-title">Features</h2>
  <div class="grid-3 gap-6">
    <Card>
      <h3 class="feature-title">Fast</h3>
      <p class="feature-description">Lightning performance</p>
    </Card>
  </div>
</Section>
```

### CTA Section
```svelte
<Section color="primary" variant="solid" bodyClass="text-center">
  <h2 class="cta-title text-white">Ready to Start?</h2>
  <Button color="secondary" size="lg">Sign Up</Button>
</Section>
```

## Component References

- **@see typography.md** - Text classes (hero-title, section-title, feature-title)
- **@see flex-grid.md** - Layout (grid-3, row, column, gap-*)
- **@see card.md** - Content containers
- **@see button.md** - Action buttons
- **@see rich-text.md** - Text decorations (mark, grad, glow)