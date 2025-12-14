## Flex & Grid Utilities

Semantic layout utilities for `bodyClass` or any element.

### Flex Utilities

| Utility | Description |
|---------|-------------|
| `row` | Horizontal layout |
| `column` | Vertical layout |
| `wrap` | Allow wrapping |
| `center` | Center both axes |

```svelte
<!-- Horizontal -->
<div class="row gap-4">...</div>

<!-- Vertical -->
<div class="column gap-6">...</div>

<!-- Centered -->
<div class="center gap-4">...</div>

<!-- Responsive: mobile vertical, desktop horizontal -->
<div class="column md:row gap-4">...</div>
```

### Grid Utilities

`grid-1` `grid-2` `grid-3` `grid-4` `grid-6` `grid-12` `grid-auto-fit`

```svelte
<!-- Fixed 3 columns -->
<div class="grid-3 gap-6">...</div>

<!-- Responsive grid -->
<div class="grid-1 md:grid-2 lg:grid-4 gap-6">...</div>

<!-- Auto-adjusting columns -->
<div class="grid-auto-fit gap-4">...</div>
```

**Always use `gap` utilities**: `gap-2`, `gap-4`, `gap-6`, `gap-8`, `gap-12`
