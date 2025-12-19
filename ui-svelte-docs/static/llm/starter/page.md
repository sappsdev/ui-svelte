# Page Structure

Entry point for building pages with ui-svelte. Pages are composed of Section components.

## Hierarchy

```
+page.svelte
└── Section (one or more)
    └── Card, Button, Typography, etc.
```

**Rules:**
- Pages must use `Section` as direct children
- Never place components directly in page root
- Use typography classes for all text (hero-title, section-title, etc.)

## Quick Start

```svelte
<script>
  import { Section, Card, Button } from 'ui-svelte';
</script>

<!-- Hero -->
<Section cover="/hero.jpg" variant="solid" rootClass="min-h-screen" bodyClass="text-center">
  <h1 class="hero-title">Welcome</h1>
  <p class="hero-subtitle">Amazing things start here</p>
  <Button color="primary" size="lg">Get Started</Button>
</Section>

<!-- Features -->
<Section color="surface" variant="soft" isBoxed>
  <h2 class="section-title text-center">Features</h2>
  <div class="grid-3 gap-6">
    <Card>
      <h3 class="feature-title">Feature 1</h3>
      <p class="feature-description">Description</p>
    </Card>
    <Card>
      <h3 class="feature-title">Feature 2</h3>
      <p class="feature-description">Description</p>
    </Card>
    <Card>
      <h3 class="feature-title">Feature 3</h3>
      <p class="feature-description">Description</p>
    </Card>
  </div>
</Section>

<!-- CTA -->
<Section color="primary" variant="solid" bodyClass="text-center">
  <h2 class="cta-title text-white">Ready to Start?</h2>
  <Button color="secondary" size="lg">Sign Up Now</Button>
</Section>
```

## Section Patterns

| Pattern | Props | Use Case |
|---------|-------|----------|
| Hero | `cover`, `variant="solid"`, `rootClass="min-h-screen"` | Full-screen hero with background |
| Content | `color="surface"`, `variant="soft"`, `isBoxed` | Readable content sections |
| CTA | `color="primary"`, `variant="solid"` | Call-to-action sections |
| Default | `isBoxed` | General content |

## Component References

For detailed documentation, see:
- **@see section.md** - Section component (container for all content)
- **@see typography.md** - Typography classes (hero-title, section-title, etc.)
- **@see flex-grid.md** - Layout utilities (grid-3, row, column, gap-*)
- **@see card.md** - Card component
- **@see button.md** - Button component
- **@see rich-text.md** - Text decorations (mark, grad, glow, etc.)