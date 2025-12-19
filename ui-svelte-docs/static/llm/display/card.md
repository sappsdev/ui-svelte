# Card Component

Container for grouping content and actions.

## Import

```svelte
import { Card } from 'ui-svelte';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cover` | `string` | - | Cover image URL |
| `color` | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Color theme |
| `variant` | `'solid' \| 'soft' \| 'outlined' \| 'ghost'` | `'outlined'` | Visual style |
| `rootClass` | `string` | - | Container classes |
| `headerClass` | `string` | - | Header classes |
| `bodyClass` | `string` | - | Body classes |
| `footerClass` | `string` | - | Footer classes |

## Patterns

### Basic Card
```svelte
<Card>
  <h3 class="card-title">Title</h3>
  <p class="card-description">Description</p>
</Card>
```

### With Header & Footer
```svelte
<Card>
  {#snippet header()}
    <h4 class="card-title">Card Title</h4>
  {/snippet}
  
  <p class="body-md">Content</p>
  
  {#snippet footer()}
    <Button size="sm">Action</Button>
  {/snippet}
</Card>
```

### With Cover Image
```svelte
<Card cover="/image.jpg">
  <h4 class="card-title">Product</h4>
  <p class="card-description">$99.99</p>
</Card>
```

### Color Variants
```svelte
<Card color="primary" variant="soft">
  <h3 class="display-md">1,234</h3>
  <p class="body-sm text-on-muted">Total Users</p>
</Card>

<Card color="success" variant="outlined">
  <h3 class="feature-title">Success</h3>
</Card>
```

## Notes

- Use typography classes: `card-title`, `card-description`, `feature-title`
- Snippets (`header`, `footer`) are optional
- Cover images display at top of card