# Fab Component

Floating Action Button for primary actions. Supports expandable action menus with labels.

## Import

```svelte
import { Fab, type FabAction } from 'ui-svelte';
import { Camera24RegularIcon, Send24RegularIcon } from '$lib/icons'; // Optional, see icons.md
```

## Props

| Prop         | Type                                                                                  | Default            | Description                   |
| ------------ | ------------------------------------------------------------------------------------- | ------------------ | ----------------------------- |
| `onclick`    | `() => void`                                                                          | -                  | Click handler                 |
| `position`   | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'`                        | `'bottom-right'`   | Screen corner position        |
| `icon`       | `IconData`                                                                            | `Add24RegularIcon` | Trigger button icon           |
| `color`      | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'`        | Color theme                   |
| `variant`    | `'solid' \| 'soft'`                                                                   | `'solid'`          | Visual style                  |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                | `'lg'`             | Button size                   |
| `actions`    | `FabAction[]`                                                                         | `[]`               | Expandable action items       |
| `isBlock`    | `boolean`                                                                             | `false`            | Static positioning (no fixed) |
| `offsetX`    | `string`                                                                              | `'1rem'`           | Horizontal offset from edge   |
| `offsetY`    | `string`                                                                              | `'1rem'`           | Vertical offset from edge     |
| `class`      | `string`                                                                              | -                  | Additional classes            |
| `children`   | `Snippet`                                                                             | -                  | Custom trigger content        |
| `src`        | `string`                                                                              | -                  | Avatar image URL              |
| `name`       | `string`                                                                              | -                  | Avatar name (shows initial)   |
| `alt`        | `string`                                                                              | -                  | Avatar alt text               |
| `status`     | `'online' \| 'offline' \| 'busy' \| 'away'`                                           | -                  | Avatar status indicator       |
| `isBordered` | `boolean`                                                                             | `false`            | Avatar border                 |

## CSS Custom Properties

| Property         | Default | Description                   |
| ---------------- | ------- | ----------------------------- |
| `--fab-offset-x` | `1rem`  | Horizontal distance from edge |
| `--fab-offset-y` | `1rem`  | Vertical distance from edge   |

## FabAction Type

| Prop      | Type                                                                                  | Description                                       |
| --------- | ------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `icon`    | `IconData`                                                                            | Action button icon                                |
| `label`   | `string`                                                                              | Optional text label                               |
| `color`   | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | Action color                                      |
| `href`    | `string`                                                                              | Link URL (makes label and icon clickable as link) |
| `target`  | `'_blank' \| '_self' \| '_parent' \| '_top'`                                          | Link target attribute                             |
| `onclick` | `() => void`                                                                          | Action handler                                    |

## Patterns

### Basic FAB

```svelte
<Fab onclick={() => console.log('clicked')} />
```

### Custom Icon

```svelte
<Fab icon={Camera24RegularIcon} color="secondary" />
```

### Positions

```svelte
<Fab position="bottom-right" />
<Fab position="bottom-left" />
<Fab position="top-right" />
<Fab position="top-left" />
```

### Color & Variant Combinations

```svelte
<Fab color="primary" variant="solid" />
<Fab color="success" variant="soft" />
<Fab color="danger" variant="solid" />
<Fab color="secondary" variant="soft" />
```

### Sizes

```svelte
<Fab size="sm" />
<Fab size="md" />
<Fab size="lg" />
<Fab size="xl" />
```

### Custom Offset (Avoid BottomNav)

Use `offsetY` to position the FAB above a BottomNav or other fixed elements:

```svelte
<!-- Avoid overlapping with BottomNav (typically ~4rem height) -->
<Fab offsetY="5rem" />

<!-- Custom X and Y offset -->
<Fab offsetX="2rem" offsetY="80px" position="bottom-left" />
```

### Static Positioning (isBlock)

Use `isBlock` for inline/static positioning (no `position: fixed`). Useful for documentation, previews, or relative containers:

```svelte
<!-- Static FAB inside a container -->
<div class="relative" style="height: 200px;">
	<Fab isBlock position="bottom-right" />
</div>
```

### With Expandable Actions

```svelte
<script>
	const actions: FabAction[] = [
		{ icon: Camera24RegularIcon, label: 'Camera', onclick: () => {} },
		{ icon: Send24RegularIcon, label: 'Send', onclick: () => {} },
		{ icon: HeartLinearIcon, label: 'Like', color: 'danger', onclick: () => {} }
	];
</script>

<Fab {actions} />
```

### Actions as Links

Use `href` to make action items work as links. Both the label and icon become clickable:

````svelte
<script>
	const actions: FabAction[] = [
		{ icon: PayPalIcon, label: 'PayPal', href: 'https://paypal.com', target: '_blank' },
		{ icon: GitHubIcon, label: 'Sponsor', href: 'https://github.com/sponsors/...', target: '_blank' }
	];
</script>

<Fab {actions} />
```

### Actions Without Labels

```svelte
<script>
	const actions: FabAction[] = [
		{ icon: Camera24RegularIcon, onclick: () => {} },
		{ icon: Send24RegularIcon, onclick: () => {} }
	];
</script>

<Fab {actions} />
````

### Custom Trigger

```svelte
<Fab>
	<IconButton icon={MoreVerticalIcon} color="primary" size="lg" />
</Fab>
```

### With Avatar Image

Use `src` to display an avatar image as the FAB trigger:

```svelte
<Fab src="https://i.pravatar.cc/150?img=32" size="xl" status="online" />
```

### With Avatar Name (Initial)

Use `name` to display the first letter as the avatar:

```svelte
<Fab name="John Doe" color="secondary" size="xl" isBordered />
```

### Avatar with Status

Combine avatar props with status indicators:

```svelte
<!-- Online status -->
<Fab src="/avatar.jpg" status="online" size="lg" />

<!-- Busy status with border -->
<Fab src="/avatar.jpg" status="busy" isBordered size="xl" />

<!-- Away status -->
<Fab name="Jane" status="away" color="muted" />
```

### Avatar with Actions

Combine avatar display with expandable actions:

```svelte
<script>
	const actions: FabAction[] = [
		{ icon: SettingsIcon, label: 'Settings', onclick: () => {} },
		{ icon: LogoutIcon, label: 'Logout', onclick: () => {} }
	];
</script>

<Fab src="/user-avatar.jpg" status="online" size="xl" {actions} />
```

## Component References

- **@see icons.md** - Icon usage with FAB
- **@see Avatar** - FAB uses Avatar internally for the trigger
- **@see IconButton** - FAB uses IconButton for action items
- **@see BottomNav** - Use offsetY to avoid overlapping
