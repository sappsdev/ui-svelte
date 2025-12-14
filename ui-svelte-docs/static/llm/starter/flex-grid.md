## Flex & Grid Utilities

Shorthand CSS classes for common flex and grid layouts.

### Flex Classes

| Class | CSS | Description |
|-------|-----|-------------|
| `row` | `display: flex; flex-direction: row` | Horizontal layout |
| `column` | `display: flex; flex-direction: column` | Vertical layout |
| `row-reverse` | `flex-direction: row-reverse` | Reverse horizontal |
| `column-reverse` | `flex-direction: column-reverse` | Reverse vertical |
| `wrap` | `flex-wrap: wrap` | Allow wrapping |
| `center` | `align-items: center; justify-content: center` | Center both axes |

### Grid Classes

| Class | CSS | Description |
|-------|-----|-------------|
| `grid-1` to `grid-12` | `display: grid; grid-template-columns: repeat(N, 1fr)` | N equal columns |
| `grid-auto-fit` | `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` | Responsive auto-fit |
| `grid-auto-fill` | `grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))` | Responsive auto-fill |

### Examples

```svelte
<!-- Horizontal row -->
<div class="row gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Vertical stack -->
<div class="column gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- 3-column grid -->
<div class="grid-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<!-- Responsive: column on mobile, row on desktop -->
<div class="column md:row gap-4">
  <div>Sidebar</div>
  <div>Main Content</div>
</div>

<!-- Centered content -->
<div class="row center min-h-[200px]">
  <div>Centered</div>
</div>
```

**For LLMs**: Use `row` for horizontal, `column` for vertical layouts. Use `grid-N` for fixed columns, `grid-auto-fit` for responsive. Combine with `gap-*` for spacing.
