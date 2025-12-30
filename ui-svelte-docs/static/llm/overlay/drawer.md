# Drawer Component

Side panel that slides in from any screen edge for navigation, filters, or supplementary content.

## Import

```svelte
import {Drawer} from 'ui-svelte';
```

## Props

| Prop                  | Type                                                                                                            | Default     | Description                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------- |
| `open`                | `boolean`                                                                                                       | `false`     | Controls visibility              |
| `position`            | `'start' \| 'end' \| 'top' \| 'bottom'`                                                                         | `'start'`   | Slide direction                  |
| `color`               | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Color theme                      |
| `variant`             | `'solid' \| 'soft'`                                                                                             | `'solid'`   | Visual style                     |
| `disableOverlayClose` | `boolean`                                                                                                       | `false`     | Prevent closing on overlay click |
| `hideCloseButton`     | `boolean`                                                                                                       | `false`     | Hide the X close button          |
| `onclose`             | `() => void`                                                                                                    | -           | Called when drawer closes        |
| `header`              | `Snippet`                                                                                                       | -           | Header content slot              |
| `footer`              | `Snippet`                                                                                                       | -           | Footer content slot              |
| `class`               | `string`                                                                                                        | -           | Container classes                |
| `headerClass`         | `string`                                                                                                        | -           | Header classes                   |
| `bodyClass`           | `string`                                                                                                        | -           | Body classes                     |
| `footerClass`         | `string`                                                                                                        | -           | Footer classes                   |

## Patterns

### Basic Drawer

```svelte
<script lang="ts">
	import { Button, Drawer } from 'ui-svelte';
	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Drawer</Button>

<Drawer bind:open>
	<p>Drawer content goes here.</p>
</Drawer>
```

### Positions

```svelte
<!-- Left (default) -->
<Drawer bind:open position="start">
	<p>Slides from left</p>
</Drawer>

<!-- Right -->
<Drawer bind:open position="end">
	<p>Slides from right</p>
</Drawer>

<!-- Top -->
<Drawer bind:open position="top">
	<p>Slides from top</p>
</Drawer>

<!-- Bottom -->
<Drawer bind:open position="bottom">
	<p>Slides from bottom</p>
</Drawer>
```

### Navigation Drawer

```svelte
<Drawer bind:open color="primary">
	{#snippet header()}
		<h4 class="card-title">Navigation</h4>
	{/snippet}

	<nav class="col gap-2">
		<a href="/home" class="p-2">Home</a>
		<a href="/settings" class="p-2">Settings</a>
		<a href="/profile" class="p-2">Profile</a>
	</nav>

	{#snippet footer()}
		<Button size="sm" onclick={() => (open = false)}>Close</Button>
	{/snippet}
</Drawer>
```

## Notes

- Use `bind:open` for two-way binding
- Position `start`/`end` for horizontal, `top`/`bottom` for vertical
- Closes on Escape key and overlay click by default
