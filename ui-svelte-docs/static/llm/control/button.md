# Button Component

Interactive element for user actions. Supports icons, loading states, and links.

## Import

```svelte
import {Button} from 'ui-svelte'; import {HeartLinearIcon} from '$lib/icons'; // Optional, see icons.md
```

## Props

| Prop         | Type                                                                                  | Default     | Description          |
| ------------ | ------------------------------------------------------------------------------------- | ----------- | -------------------- |
| `onclick`    | `() => void`                                                                          | -           | Click handler        |
| `href`       | `string`                                                                              | -           | Makes button a link  |
| `target`     | `'_self' \| '_blank' \| '_parent' \| '_top'`                                          | -           | Link target          |
| `type`       | `'button' \| 'submit' \| 'reset'`                                                     | `'button'`  | Button type          |
| `color`      | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Color theme          |
| `variant`    | `'solid' \| 'soft' \| 'outlined' \| 'ghost' \| 'overlay'`                             | `'solid'`   | Visual style         |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                | `'md'`      | Button size          |
| `startIcon`  | `IconData`                                                                            | -           | Icon before text     |
| `endIcon`    | `IconData`                                                                            | -           | Icon after text      |
| `isLoading`  | `boolean`                                                                             | `false`     | Show loading spinner |
| `isWide`     | `boolean`                                                                             | `false`     | Full-width button    |
| `isDisabled` | `boolean`                                                                             | `false`     | Disable button       |
| `class`      | `string`                                                                              | -           | Additional classes   |

## Patterns

### Basic Button

```svelte
<Button onclick={() => console.log('clicked')}>Click Me</Button>
```

### With Icons

```svelte
<Button startIcon={HeartLinearIcon}>Like</Button>
<Button endIcon={ArrowRightLinearIcon}>Next</Button>
<Button startIcon={SaveLinearIcon} endIcon={CheckLinearIcon}>Save</Button>
```

### Color & Variant Combinations

```svelte
<Button color="primary" variant="solid">Primary Solid</Button>
<Button color="success" variant="soft">Success Soft</Button>
<Button color="danger" variant="outlined">Danger Outlined</Button>
<Button color="secondary" variant="ghost">Secondary Ghost</Button>
```

### Sizes

```svelte
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### States

```svelte
<Button isLoading>Loading...</Button>
<Button isDisabled>Disabled</Button>
<Button isWide>Full Width</Button>
```

### Link Button

```svelte
<Button href="/about">About</Button>
<Button href="https://example.com" target="_blank">External Link</Button>
```

### Form Submit

```svelte
<form>
	<Button type="submit" color="success">Submit Form</Button>
	<Button type="reset" variant="ghost">Reset</Button>
</form>
```

## Component References

- **@see icons.md** - Icon usage with `startIcon`/`endIcon`
