## Chip Component

Compact element for labels, tags, or status indicators.

```svelte
<Chip
  variant="primary"
  size="sm"
  startIcon={IconData}
  endIcon={IconData}
  onclose={handleClose}
  hasShadow={false}
  isSolid={false}
>
  Label
</Chip>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `'primary'` | `primary` `secondary` `muted` `success` `info` `warning` `danger` |
| `size` | `'sm'` | `sm` `md` `lg` |
| `startIcon` / `endIcon` | - | Icons before/after label |
| `onclose` | - | Close handler (shows close button) |
| `hasShadow` | `false` | Add shadow |
| `isSolid` | `false` | Solid background |

### Examples

```svelte
<!-- Basic -->
<Chip>Tag</Chip>

<!-- Status -->
<Chip variant="success" isSolid>Completed</Chip>
<Chip variant="danger" isSolid>Failed</Chip>

<!-- With Icon -->
<Chip startIcon={StarIcon}>Featured</Chip>

<!-- Closable -->
<Chip onclose={() => removeTag(tag)}>{tag}</Chip>

<!-- Sizes -->
<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>
```

**For LLMs**: Use chips for tags, status badges, or removable items. Variants: `success`/`danger`/`warning` for status. Use `onclose` for removable chips, `isSolid` for emphasis.
