# Alert Component

Status messages for feedback, warnings, errors, or information.

## Import

```svelte
import {Alert} from 'ui-svelte';
```

## Props

| Prop          | Type                                                                                  | Default  | Description             |
| ------------- | ------------------------------------------------------------------------------------- | -------- | ----------------------- |
| `title`       | `string`                                                                              | -        | Alert title             |
| `description` | `string`                                                                              | -        | Alert message           |
| `children`    | `Snippet`                                                                             | -        | Custom content          |
| `color`       | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'info'` | Color theme             |
| `variant`     | `'solid' \| 'soft'`                                                                   | `'soft'` | Visual style            |
| `showIcon`    | `boolean`                                                                             | `false`  | Show status icon        |
| `icon`        | `IconData`                                                                            | -        | Custom icon             |
| `src`         | `string`                                                                              | -        | Avatar image URL        |
| `name`        | `string`                                                                              | -        | Avatar name (initial)   |
| `alt`         | `string`                                                                              | -        | Avatar alt text         |
| `avatarSize`  | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                | `'md'`   | Avatar size             |
| `status`      | `'online' \| 'offline' \| 'busy' \| 'away'`                                           | -        | Avatar status indicator |
| `isBordered`  | `boolean`                                                                             | `false`  | Avatar border           |

## Patterns

### Basic

```svelte
<Alert title="Success" description="Your changes have been saved." color="success" showIcon />
```

### Warning Alert

```svelte
<Alert title="Warning" description="This action cannot be undone." color="warning" showIcon />
```

### Error Alert

```svelte
<Alert title="Error" description="Failed to save changes." color="danger" showIcon />
```

### Info Alert

```svelte
<Alert title="Note" description="A new version is available." color="info" showIcon />
```

### Solid Variant

```svelte
<Alert
	title="Important"
	description="Please read carefully."
	color="primary"
	variant="solid"
	showIcon
/>
```

### Title Only

```svelte
<Alert title="Quick notification" color="muted" />
```

### With Avatar Image

Use `src` to display an avatar image alongside the alert:

```svelte
<Alert
	src="/user-avatar.jpg"
	title="New message from John"
	description="Hey! Just wanted to check in with you."
	color="info"
	status="online"
/>
```

### With Avatar Name (Initial)

Use `name` to display the first letter as an avatar:

```svelte
<Alert
	name="María García"
	title="Friend request"
	description="María García wants to connect with you."
	color="success"
	isBordered
/>
```

### Avatar with Status

Combine avatar props with status indicators:

```svelte
<!-- Online user notification -->
<Alert src="/avatar.jpg" title="User online" status="online" color="success" />

<!-- Busy user warning -->
<Alert src="/avatar.jpg" title="User is busy" status="busy" color="warning" avatarSize="lg" />

<!-- Away status -->
<Alert name="Jane" title="User away" status="away" color="muted" />
```

## Notes

- Default icons match color semantic (checkmark for success, warning triangle, etc.)
- Use `icon` prop to override default icon
- Use `src` or `name` to show an avatar instead of an icon
- Avatar inherits `color` and `variant` from the alert
- `soft` variant has subtle background, `solid` is more prominent

## Component References

- **@see Avatar** - Alert uses Avatar internally for the icon/avatar display
