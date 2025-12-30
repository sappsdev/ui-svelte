# Toast Component

Lightweight notification for brief messages about app processes.

## Import

```svelte
import {toast} from 'ui-svelte';
```

## Toast Message Props

| Prop          | Type                                                                                  | Default         | Description                          |
| ------------- | ------------------------------------------------------------------------------------- | --------------- | ------------------------------------ |
| `description` | `string`                                                                              | -               | Message text (required)              |
| `title`       | `string`                                                                              | -               | Optional title                       |
| `color`       | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'info'`        | Color theme                          |
| `variant`     | `'solid' \| 'soft'`                                                                   | `'soft'`        | Visual style                         |
| `duration`    | `number`                                                                              | `0`             | Auto-dismiss time in ms (0 = manual) |
| `position`    | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'`                        | `'bottom-left'` | Screen position                      |
| `icon`        | `IconData`                                                                            | -               | Custom icon                          |

## Store Methods

| Method             | Type                                | Description                    |
| ------------------ | ----------------------------------- | ------------------------------ |
| `toast.show()`     | `(message: ToastMessage) => string` | Shows toast, returns id        |
| `toast.close()`    | `(id: string) => void`              | Closes specific toast          |
| `toast.closeAll()` | `() => void`                        | Closes all toasts              |
| `toast.messages`   | `ToastMessage[]`                    | Reactive list of active toasts |

## Patterns

### Basic Toast

```svelte
<script lang="ts">
	import { Button, toast } from 'ui-svelte';

	const showToast = () => {
		toast.show({
			description: 'Operation completed successfully.'
		});
	};
</script>

<Button onclick={showToast}>Show Toast</Button>
```

### With Title & Duration

```svelte
toast.show({
  title: 'Success',
  description: 'Your changes have been saved.',
  color: 'success',
  duration: 3000
});
```

### Color Variants

```svelte
// Success notification
toast.show({
  title: 'Saved',
  description: 'Changes saved successfully.',
  color: 'success',
  variant: 'solid'
});

// Error notification
toast.show({
  title: 'Error',
  description: 'Something went wrong.',
  color: 'danger'
});

// Warning notification
toast.show({
  description: 'Please complete all fields.',
  color: 'warning'
});
```

### Positioned Toasts

```svelte
toast.show({
  description: 'Top right notification',
  position: 'top-right'
});

toast.show({
  description: 'Bottom right notification',
  position: 'bottom-right'
});
```

## Notes

- Use `duration: 0` for toasts that require manual dismissal
- Default position is `bottom-left`
- Store is reactive - `toast.messages` updates automatically
