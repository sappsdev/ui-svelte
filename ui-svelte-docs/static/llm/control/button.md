# Button Component

A versatile button component for user actions and interactions.

## Basic Usage

```svelte
<script>
  import { Button } from 'ui-svelte';
</script>

<Button onclick={() => console.log('clicked')}>
  Click Me
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onclick` | `() => void` | - | Click handler function |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type attribute |
| `href` | `string` | - | Renders as link when provided |
| `target` | `'_self' \| '_blank' \| '_parent' \| '_top'` | - | Link target (when href is set) |
| `color` | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Button color theme |
| `variant` | `'solid' \| 'soft' \| 'outlined' \| 'ghost'` | `'solid'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `startIcon` | `IconData` | - | Icon before label |
| `endIcon` | `IconData` | - | Icon after label |
| `isLoading` | `boolean` | `false` | Shows loading state |
| `isWide` | `boolean` | `false` | Full width button |
| `isDisabled` | `boolean` | `false` | Disables interaction |
| `class` | `string` | - | Additional CSS classes (rarely needed) |

## Common Patterns

### Colors & Variants
```svelte
<Button color="primary" variant="solid">Primary</Button>
<Button color="danger" variant="soft">Delete</Button>
<Button color="success" variant="outlined">Approve</Button>
<Button color="secondary" variant="ghost">Cancel</Button>
```

### Sizes
```svelte
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### With Icons
```svelte
<script>
  import { Button } from 'ui-svelte';
  import { HeartIcon, SendIcon } from '$lib/icons';
</script>

<Button startIcon={HeartIcon}>Like</Button>
<Button endIcon={SendIcon}>Send</Button>
```

### States
```svelte
<Button isLoading>Processing...</Button>
<Button isDisabled>Disabled</Button>
<Button isWide>Full Width</Button>
```

### As Link
```svelte
<Button href="/dashboard">Go to Dashboard</Button>
<Button href="https://example.com" target="_blank">External Link</Button>
```

### Form Buttons
```svelte
<Button type="submit" color="success">Submit Form</Button>
<Button type="reset" variant="ghost">Reset</Button>
```

## Notes

- The component is highly configurable through props
- Use `class` prop only for rare customizations beyond available props
- When `href` is provided, button renders as an anchor element
- Icons accept `IconData` format: `{ body: string, viewbox: string }`
- **For icon documentation, see:** https://ui-svelte.sappsdev.com/llm/starter/icons.md