# AlertDialog Component

Confirmation dialog for destructive actions (delete, logout, etc.).

## Import

```svelte
import {AlertDialog} from 'ui-svelte';
```

## Props

| Prop          | Type                                                                                  | Default                           | Description                     |
| ------------- | ------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------- |
| `open`        | `boolean`                                                                             | `false`                           | Dialog visibility (bindable)    |
| `title`       | `string`                                                                              | `'Are you sure?'`                 | Dialog title                    |
| `description` | `string`                                                                              | `'This action cannot be undone.'` | Dialog description              |
| `confirmText` | `string`                                                                              | `'Confirm'`                       | Confirm button text             |
| `cancelText`  | `string`                                                                              | `'Cancel'`                        | Cancel button text              |
| `onconfirm`   | `() => void`                                                                          | -                                 | Callback on confirm             |
| `oncancel`    | `() => void`                                                                          | -                                 | Callback on cancel              |
| `color`       | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'danger'`                        | Confirm button color            |
| `isLoading`   | `boolean`                                                                             | `false`                           | Loading state on confirm button |
| `rootClass`   | `string`                                                                              | -                                 | Additional CSS class            |

## Patterns

### Delete Confirmation

```svelte
<script>
	let open = $state(false);

	function handleDelete() {
		// Perform delete action
		open = false;
	}
</script>

<Button color="danger" onclick={() => (open = true)}>Delete</Button>

<AlertDialog
	bind:open
	title="Delete Item"
	description="This action cannot be undone. The item will be permanently removed."
	confirmText="Delete"
	onconfirm={handleDelete}
/>
```

### With Loading State

```svelte
<script>
	let open = $state(false);
	let isLoading = $state(false);

	async function handleConfirm() {
		isLoading = true;
		await deleteItem();
		isLoading = false;
		open = false;
	}
</script>

<AlertDialog
	bind:open
	{isLoading}
	title="Delete Item"
	description="Are you sure?"
	onconfirm={handleConfirm}
/>
```

### Logout Confirmation

```svelte
<AlertDialog
	bind:open
	color="warning"
	title="Logout"
	description="Are you sure you want to logout?"
	confirmText="Logout"
	cancelText="Stay"
	onconfirm={handleLogout}
/>
```

## Notes

- Built on Modal and Button components
- Overlay click and close button are disabled by default
- Cancel button always uses `muted` outlined style
- Confirm button uses the specified `color` prop
