# IconButton Component

Compact button with only an icon. Ideal for toolbars and space-limited actions.

## Import

```svelte
import {IconButton} from 'ui-svelte'; import {HeartLinearIcon} from '$lib/icons'; // See icons.md
```

## Props

| Prop         | Type                                                                       | Default     | Description                   |
| ------------ | -------------------------------------------------------------------------- | ----------- | ----------------------------- |
| `icon`       | `IconData`                                                                 | -           | **Required.** Icon to display |
| `onclick`    | `() => void`                                                               | -           | Click handler                 |
| `href`       | `string`                                                                   | -           | Makes button a link           |
| `target`     | `'_self' \| '_blank' \| '_parent' \| '_top'`                               | -           | Link target                   |
| `type`       | `'button' \| 'submit' \| 'reset'`                                          | `'button'`  | Button type                   |
| `color`      | `'primary' \| 'secondary' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Color theme                   |
| `variant`    | `'solid' \| 'soft' \| 'outlined' \| 'ghost' \| 'overlay'`                  | `'solid'`   | Visual style                  |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                     | `'md'`      | Button size                   |
| `isLoading`  | `boolean`                                                                  | `false`     | Show loading spinner          |
| `isDisabled` | `boolean`                                                                  | `false`     | Disable button                |
| `class`      | `string`                                                                   | -           | Additional classes            |

## Patterns

### Basic Usage

```svelte
<IconButton icon={HeartLinearIcon} onclick={() => console.log('clicked')} />
```

### Color & Variant Combinations

```svelte
<IconButton icon={HeartLinearIcon} color="danger" />
<IconButton icon={SettingsLinearIcon} color="muted" variant="soft" />
<IconButton icon={SearchLinearIcon} color="info" variant="outlined" />
<IconButton icon={SendLinearIcon} color="primary" variant="ghost" />
```

### Sizes

```svelte
<IconButton icon={HeartLinearIcon} size="xs" />
<IconButton icon={HeartLinearIcon} size="sm" />
<IconButton icon={HeartLinearIcon} size="md" />
<IconButton icon={HeartLinearIcon} size="lg" />
<IconButton icon={HeartLinearIcon} size="xl" />
```

### States

```svelte
<IconButton icon={SaveLinearIcon} isLoading />
<IconButton icon={TrashLinearIcon} isDisabled />
```

### Link IconButton

```svelte
<IconButton icon={ExternalLinkLinearIcon} href="/about" />
<IconButton icon={ExternalLinkLinearIcon} href="https://example.com" target="_blank" />
```

## Component References

- **@see icons.md** - Icon usage and available icon sets
