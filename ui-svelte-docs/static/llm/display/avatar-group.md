# AvatarGroup Component

Display multiple avatars in stacked or inline layout with overflow counter.

## Import

```svelte
import {AvatarGroup} from 'ui-svelte';
```

## Props

| Prop         | Type                                                                                  | Default     | Description                              |
| ------------ | ------------------------------------------------------------------------------------- | ----------- | ---------------------------------------- |
| `items`      | `AvatarItem[]`                                                                        | `[]`        | Array of avatar items                    |
| `color`      | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Color theme                              |
| `variant`    | `'solid' \| 'soft'`                                                                   | `'solid'`   | Visual style                             |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                | `'md'`      | Avatar size                              |
| `max`        | `number`                                                                              | -           | Max visible avatars (shows "+N" counter) |
| `autoFit`    | `boolean`                                                                             | `false`     | Auto-fit avatars to container width      |
| `isInline`   | `boolean`                                                                             | `false`     | Inline layout (no overlap)               |
| `isBordered` | `boolean`                                                                             | `false`     | Show border on avatars                   |

## AvatarItem Type

| Prop      | Type                  | Description              |
| --------- | --------------------- | ------------------------ |
| `src`     | `string`              | Image URL                |
| `name`    | `string`              | User name (for initials) |
| `alt`     | `string`              | Image alt text           |
| `href`    | `string`              | Link URL                 |
| `onclick` | `() => void`          | Click handler            |
| `target`  | `'_self' \| '_blank'` | Link target              |

## Patterns

### Basic Stacked Group

```svelte
<AvatarGroup
	items={[
		{ src: '/user1.jpg', name: 'Alice' },
		{ src: '/user2.jpg', name: 'Bob' },
		{ src: '/user3.jpg', name: 'Charlie' }
	]}
/>
```

### Inline Layout

```svelte
<AvatarGroup items={users} isInline />
```

### With Max Limit

```svelte
<AvatarGroup items={users} max={4} />
```

### Auto Fit (Responsive)

```svelte
<AvatarGroup items={users} autoFit />
```

### Initials Only

```svelte
<AvatarGroup items={[{ name: 'Alice Johnson' }, { name: 'Bob Smith' }]} color="secondary" />
```

## Notes

- Default layout is stacked (overlapping avatars)
- `max` prop shows "+N" counter for hidden avatars
- `autoFit` uses ResizeObserver to dynamically fit avatars to container width
- All avatars share the same `color`, `variant`, and `size`

## Component References

- **@see avatar.md** - Individual avatar component
