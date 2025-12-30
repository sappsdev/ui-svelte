# Command Component

Command palette for quick navigation and actions with keyboard support.

## Import

```svelte
import {(Command, useSearch)} from 'ui-svelte';
```

## Props

| Prop                    | Type                                                                                  | Default              | Description                              |
| ----------------------- | ------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------- |
| `search`                | `SearchState`                                                                         | -                    | Search state from `useSearch` (required) |
| `open`                  | `boolean`                                                                             | `false`              | Controls visibility                      |
| `placeholder`           | `string`                                                                              | `'Search...'`        | Input placeholder                        |
| `emptyText`             | `string`                                                                              | `'No results found'` | Empty state text                         |
| `color`                 | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'muted'`            | Color theme                              |
| `disableOverlayClose`   | `boolean`                                                                             | `false`              | Prevent closing on overlay click         |
| `disableGlobalShortcut` | `boolean`                                                                             | `false`              | Disable Cmd/Ctrl+K                       |
| `shortcut`              | `string`                                                                              | `'k'`                | Keyboard shortcut key                    |
| `showFooter`            | `boolean`                                                                             | `true`               | Show keyboard hints                      |
| `groups`                | `CommandGroup[]`                                                                      | -                    | Grouped options                          |
| `onselect`              | `(item: SearchOption) => void`                                                        | -                    | Selection callback                       |
| `onclose`               | `() => void`                                                                          | -                    | Close callback                           |

## Patterns

### Basic Command

```svelte
<script lang="ts">
	import { Command, Button, useSearch } from 'ui-svelte';
	import { HomeLinearIcon, SettingsLinearIcon } from '$lib/icons';

	const search = useSearch({
		options: [
			{ id: 1, label: 'Dashboard', icon: HomeLinearIcon, href: '/dashboard' },
			{ id: 2, label: 'Settings', icon: SettingsLinearIcon, href: '/settings' }
		],
		clientSide: true
	});

	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Command</Button>

<Command
	bind:open
	{search}
	placeholder="Search commands..."
	onselect={(item) => console.log(item)}
/>
```

### With Groups

```svelte
<script lang="ts">
	const groups = [
		{
			label: 'Pages',
			options: [
				{ id: 1, label: 'Dashboard', href: '/dashboard' },
				{ id: 2, label: 'Settings', href: '/settings' }
			]
		},
		{
			label: 'Actions',
			options: [
				{ id: 3, label: 'New Project' },
				{ id: 4, label: 'Search Files' }
			]
		}
	];
</script>

<Command bind:open {search} {groups} placeholder="Search pages and actions..." />
```

### Custom Shortcut

```svelte
<!-- Change to Cmd/Ctrl + P -->
<Command bind:open {search} shortcut="p" />

<!-- Disable global shortcut -->
<Command bind:open {search} disableGlobalShortcut />
```

## Keyboard Navigation

| Key             | Action                 |
| --------------- | ---------------------- |
| `Cmd/Ctrl + K`  | Toggle command palette |
| `Arrow Down/Up` | Navigate results       |
| `Enter`         | Select focused item    |
| `Escape`        | Close palette          |

## Notes

- Requires `useSearch` hook for search functionality
- Use `groups` for categorized options
- Footer shows keyboard shortcuts by default
