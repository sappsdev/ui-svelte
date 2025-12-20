# Chip

Compact element for labels, tags, or status indicators.

## Import

```svelte
import {Chip} from 'ui-svelte';
```

## Props

| Prop        | Type                                                                                  | Default     | Description                        |
| ----------- | ------------------------------------------------------------------------------------- | ----------- | ---------------------------------- |
| `color`     | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Color theme                        |
| `variant`   | `'solid' \| 'soft' \| 'outlined'`                                                     | `'solid'`   | Visual style                       |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                | `'md'`      | Chip size                          |
| `startIcon` | `IconData`                                                                            | -           | Icon before label                  |
| `endIcon`   | `IconData`                                                                            | -           | Icon after label                   |
| `onclose`   | `() => void`                                                                          | -           | Close handler (shows close button) |
| `class`     | `string`                                                                              | -           | Additional classes                 |

## Patterns

### Basic

```svelte
<Chip>Tag</Chip>
<Chip color="success">Active</Chip>
<Chip color="danger" variant="soft">Error</Chip>
```

### With Icons

```svelte
<Chip startIcon={StarIcon}>Featured</Chip>
<Chip endIcon={ArrowIcon}>Next</Chip>
<Chip startIcon={HeartIcon} endIcon={CloseIcon}>Both</Chip>
```

### Closable

```svelte
<Chip onclose={() => removeTag(tag)}>{tag}</Chip>
<Chip color="info" onclose={handleClose}>Removable</Chip>
```

### Sizes

```svelte
<Chip size="xs">Extra Small</Chip>
<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>
```

## Notes

- Use `solid` variant for emphasis, `soft` for subtle, `outlined` for minimal
- Use `success`/`danger`/`warning` colors for status indicators
- `onclose` prop automatically shows close button
