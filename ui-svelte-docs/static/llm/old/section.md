## Section Component

Page structure container. Never nest Sections.

```svelte
<Section
  variant="ghost"
  bodyClass=""
  cover=""
  isSolid={false}
  isBoxed={false}
  hasOverlay={false}
>
  {children}
</Section>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `'ghost'` | `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` |
| `bodyClass` | - | Layout utilities (flex/grid) |
| `isSolid` | `false` | Solid background |
| `isBoxed` | `false` | Max-width container |
| `cover` | - | Background image URL |

### Common Patterns

```svelte
<!-- Hero -->
<Section variant="primary" isSolid bodyClass="center gap-6 min-h-screen">
  <h1 class="text-5xl font-bold text-white">Hero Title</h1>
  <Button size="lg">Get Started</Button>
</Section>

<!-- Features Grid -->
<Section variant="muted" isBoxed bodyClass="gap-12 py-20">
  <h2 class="text-3xl font-bold text-center">Features</h2>
  <div class="grid-1 md:grid-3 gap-6">
    <Card>Feature 1</Card>
    <Card>Feature 2</Card>
    <Card>Feature 3</Card>
  </div>
</Section>

<!-- Two Column -->
<Section isBoxed bodyClass="column lg:row gap-6">
  <Card class="flex-1">Sidebar</Card>
  <Card class="flex-[2]">Main</Card>
</Section>

<!-- Footer -->
<Section variant="surface" bodyClass="md:row gap-8 py-12">
  <div class="flex-1">
    <h3 class="font-bold mb-4">Company</h3>
    <nav class="column gap-2">...</nav>
  </div>
</Section>
```

**For LLMs**: Section structures pages. Apply layout via `bodyClass`. Contains Cards. Think: hero, features, pricing, footer.
