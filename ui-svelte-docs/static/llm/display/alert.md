# Alert Component

Status messages for feedback, warnings, errors, or information.

## Import

```svelte
import {Alert} from 'ui-svelte';
```

## Props

| Prop          | Type                                                                                  | Default     | Description      |
| ------------- | ------------------------------------------------------------------------------------- | ----------- | ---------------- |
| `title`       | `string`                                                                              | -           | Alert title      |
| `description` | `string`                                                                              | -           | Alert message    |
| `children`    | `Snippet`                                                                             | -           | Custom content   |
| `color`       | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Color theme      |
| `variant`     | `'solid' \| 'soft'`                                                                   | `'soft'`    | Visual style     |
| `showIcon`    | `boolean`                                                                             | `false`     | Show status icon |
| `icon`        | `IconData`                                                                            | -           | Custom icon      |

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

## Notes

- Default icons match color semantic (checkmark for success, warning triangle, etc.)
- Use `icon` prop to override default icon
- `soft` variant has subtle background, `solid` is more prominent
