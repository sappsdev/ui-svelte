# Flex & Grid

Layout utility classes for quick flex and grid layouts.

## Flex Utilities

| Class | Description |
|-------|-------------|
| `row` | Horizontal layout (flex flex-row) |
| `row-reverse` | Horizontal RTL |
| `column` | Vertical layout (flex flex-col) |
| `column-reverse` | Vertical reversed |
| `wrap` | Allow wrapping |
| `center` | Center both axes |

## Grid Utilities

| Class | Description |
|-------|-------------|
| `grid-1` to `grid-6` | Fixed column grids |
| `grid-auto-fit` | Responsive auto-fit (min 250px) |
| `grid-auto-fill` | Responsive auto-fill (min 250px) |

## Common Patterns

### Horizontal Layout
```svelte
<div class="row gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Vertical Layout
```svelte
<div class="column gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Grid Layout
```svelte
<div class="grid-3 gap-6">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</div>
```

### Responsive Grid
```svelte
<!-- 1 col mobile, 2 tablet, 3 desktop -->
<div class="grid-1 md:grid-2 lg:grid-3 gap-4">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</div>
```

### Centered Content
```svelte
<div class="column center gap-6 min-h-screen">
  <h1 class="hero-title">Centered Content</h1>
  <Button>Action</Button>
</div>
```

### Button Groups
```svelte
<!-- Horizontal -->
<div class="row gap-2">
  <Button variant="ghost">Cancel</Button>
  <Button color="primary">Confirm</Button>
</div>

<!-- Justified -->
<div class="row justify-between">
  <Button variant="ghost">Back</Button>
  <Button color="primary">Next</Button>
</div>
```

## Notes

- Always use `gap-{size}` for spacing (gap-2, gap-4, gap-6)
- Responsive: `md:grid-2`, `lg:grid-3` for breakpoint variants
- `grid-auto-fit` auto-adapts columns based on space
- `center` works with both row and column