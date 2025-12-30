# Avatar Component

User representation with images, icons, or initials.

## Import

```svelte
import {Avatar} from 'ui-svelte'; import {UserLinearIcon} from '$lib/icons'; // If using icons
```

## Props

| Prop         | Type                                                                                  | Default     | Description                        |
| ------------ | ------------------------------------------------------------------------------------- | ----------- | ---------------------------------- |
| `src`        | `string`                                                                              | -           | Image URL                          |
| `name`       | `string`                                                                              | -           | User name (for initials fallback)  |
| `alt`        | `string`                                                                              | `'Avatar'`  | Image alt text                     |
| `icon`       | `IconData`                                                                            | -           | Icon to display (fallback to name) |
| `href`       | `string`                                                                              | -           | Link URL (makes avatar clickable)  |
| `onclick`    | `() => void`                                                                          | -           | Click handler                      |
| `target`     | `'_self' \| '_blank' \| '_parent' \| '_top'`                                          | -           | Link target                        |
| `color`      | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Color theme                        |
| `variant`    | `'solid' \| 'soft'`                                                                   | `'solid'`   | Visual style                       |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                | `'md'`      | Avatar size                        |
| `status`     | `'online' \| 'offline' \| 'busy' \| 'away'`                                           | -           | Status indicator                   |
| `isBordered` | `boolean`                                                                             | `false`     | Show border                        |

## Patterns

### Basic Avatar (Initials)

```svelte
<Avatar name="John Doe" />
```

### With Image

```svelte
<Avatar src="/user.jpg" alt="User profile" />
```

### With Icon

```svelte
<script>
	import { Avatar } from 'ui-svelte';
	import { UserLinearIcon } from '$lib/icons';
</script>

<Avatar icon={UserLinearIcon} />
<Avatar icon={UserLinearIcon} color="success" variant="soft" />
```

### Fallback Priority

Content is displayed in this order: `src` > `icon` > `name` initial.

```svelte
<!-- Shows image -->
<Avatar src="/user.jpg" icon={UserLinearIcon} name="John" />

<!-- Shows icon (no src) -->
<Avatar icon={UserLinearIcon} name="John" />

<!-- Shows "J" initial (no src or icon) -->
<Avatar name="John" />
```

### Status Indicator

```svelte
<Avatar name="John Doe" status="online" />
<Avatar src="/user.jpg" status="busy" />
```

### Bordered Avatar

```svelte
<Avatar name="John Doe" color="primary" isBordered />
```

### Clickable Avatar

```svelte
<Avatar name="John Doe" href="/profile" />
<Avatar name="John Doe" onclick={() => openModal()} />
```

### Size & Color Variants

```svelte
<Avatar name="XS" size="xs" />
<Avatar name="LG" size="lg" color="success" variant="soft" />
<Avatar icon={UserLinearIcon} size="xl" color="info" />
```

## Notes

- Display priority: `src` (image) > `icon` > `name` (initials)
- Uses first letter of `name` when no `src` or `icon` is provided
- Status indicator appears as a dot on the avatar corner
- `isBordered` adds a colored border around the avatar
- Icons are automatically sized based on the avatar `size` prop
