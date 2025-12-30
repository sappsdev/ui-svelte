# Modal Component

Dialog overlay that focuses user attention on important content or actions.

## Import

```svelte
import {Modal} from 'ui-svelte';
```

## Props

| Prop                  | Type                                                                                                            | Default     | Description                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------- |
| `open`                | `boolean`                                                                                                       | `false`     | Controls visibility              |
| `color`               | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Color theme                      |
| `variant`             | `'solid' \| 'soft'`                                                                                             | `'solid'`   | Visual style                     |
| `disableOverlayClose` | `boolean`                                                                                                       | `false`     | Prevent closing on overlay click |
| `hideCloseButton`     | `boolean`                                                                                                       | `false`     | Hide the X close button          |
| `onclose`             | `() => void`                                                                                                    | -           | Called when modal closes         |
| `header`              | `Snippet`                                                                                                       | -           | Header content slot              |
| `footer`              | `Snippet`                                                                                                       | -           | Footer content slot              |
| `rootClass`           | `string`                                                                                                        | -           | Container classes                |
| `headerClass`         | `string`                                                                                                        | -           | Header classes                   |
| `contentClass`        | `string`                                                                                                        | -           | Content classes                  |
| `footerClass`         | `string`                                                                                                        | -           | Footer classes                   |

## Patterns

### Basic Modal

```svelte
<script lang="ts">
	import { Button, Modal } from 'ui-svelte';
	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Modal</Button>

<Modal bind:open>
	<p>Modal content goes here.</p>
</Modal>
```

### With Header & Footer

```svelte
<Modal bind:open color="primary">
	{#snippet header()}
		<h4 class="card-title">Confirmation</h4>
	{/snippet}

	<p class="card-description">Are you sure you want to proceed?</p>

	{#snippet footer()}
		<div class="flex gap-2">
			<Button size="sm" variant="soft" onclick={() => (open = false)}>Cancel</Button>
			<Button size="sm" color="primary">Confirm</Button>
		</div>
	{/snippet}
</Modal>
```

### Color Variants

```svelte
<Modal bind:open color="danger" variant="solid">
	{#snippet header()}
		<h4 class="card-title">Delete Item</h4>
	{/snippet}
	<p>This action cannot be undone.</p>
</Modal>

<Modal bind:open color="success" variant="soft">
	{#snippet header()}
		<h4 class="card-title">Success</h4>
	{/snippet}
	<p>Operation completed successfully.</p>
</Modal>
```

## Notes

- Use `bind:open` for two-way binding
- Snippets (`header`, `footer`) are optional
- Closes on Escape key and overlay click by default
