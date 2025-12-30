# Tabs Component

Organize content into switchable panels.

## Import

```svelte
import {Tabs} from 'ui-svelte';
```

## Props

| Prop              | Type                                                                                  | Default   | Description          |
| ----------------- | ------------------------------------------------------------------------------------- | --------- | -------------------- |
| `tabs`            | `Tab[]`                                                                               | `[]`      | Tab items            |
| `position`        | `'top' \| 'bottom' \| 'start' \| 'end'`                                               | `'top'`   | Tab bar position     |
| `variant`         | `'solid' \| 'outline' \| 'line' \| 'ghost' \| 'pills'`                                | `'solid'` | Visual style         |
| `color`           | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'muted'` | Color theme          |
| `rootClass`       | `string`                                                                              | -         | Container classes    |
| `tabListClass`    | `string`                                                                              | -         | Tab list classes     |
| `tabClass`        | `string`                                                                              | -         | Tab button classes   |
| `tabContentClass` | `string`                                                                              | -         | Content area classes |

## Tab Type

```ts
interface Tab {
	id: string;
	label: string;
	content: Snippet | string;
}
```

## Patterns

### String Content

```svelte
<script lang="ts">
	import { Tabs } from 'ui-svelte';

	const tabs = [
		{ id: 'home', label: 'Home', content: 'Welcome to the home tab.' },
		{ id: 'profile', label: 'Profile', content: 'Your profile information.' },
		{ id: 'settings', label: 'Settings', content: 'Adjust your settings.' }
	];
</script>

<Tabs {tabs} variant="solid" color="primary" />
```

### Snippet Content

```svelte
{#snippet homeContent()}
	<div class="p-4">
		<h4 class="text-lg font-semibold">Home Tab</h4>
		<p>Rich content with components.</p>
		<Button size="sm">Action</Button>
	</div>
{/snippet}

{#snippet profileContent()}
	<div class="p-4">
		<h4 class="text-lg font-semibold">Profile Tab</h4>
		<Button size="sm" color="secondary">Edit Profile</Button>
	</div>
{/snippet}

<Tabs
	tabs={[
		{ id: 'home', label: 'Home', content: homeContent },
		{ id: 'profile', label: 'Profile', content: profileContent }
	]}
/>
```

### Variants

```svelte
<Tabs {tabs} variant="solid" />
<Tabs {tabs} variant="outline" />
<Tabs {tabs} variant="line" />
<Tabs {tabs} variant="ghost" />
<Tabs {tabs} variant="pills" />
```

### Positions

```svelte
<Tabs {tabs} position="top" />
<!-- Default -->
<Tabs {tabs} position="bottom" />
<Tabs {tabs} position="start" />
<!-- Vertical left -->
<Tabs {tabs} position="end" />
<!-- Vertical right -->
```

## Notes

- Use string content for simple text tabs
- Use Snippet content for rich layouts with components
- `line` variant works well with all positions
- `start`/`end` positions create vertical tab layouts
