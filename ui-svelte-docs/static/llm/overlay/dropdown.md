# Dropdown Component

Displays a list of actions or options when triggered.

## Import

```svelte
import {Dropdown} from 'ui-svelte';
```

## Props

| Prop       | Type                                                                                  | Default     | Description     |
| ---------- | ------------------------------------------------------------------------------------- | ----------- | --------------- |
| `options`  | `Option[]`                                                                            | `[]`        | Menu options    |
| `color`    | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Color theme     |
| `children` | `Snippet`                                                                             | -           | Trigger element |
| `header`   | `Snippet`                                                                             | -           | Header content  |
| `footer`   | `Snippet`                                                                             | -           | Footer content  |

## Option Type

```ts
interface Option {
	id: string | number;
	label: string;
	description?: string;
	icon?: IconData;
	href?: string;
	onclick?: () => void;
}
```

## Patterns

### Basic Dropdown

```svelte
<script lang="ts">
	import { Dropdown, Button } from 'ui-svelte';
	import { UserCircleLinearIcon } from '$lib/icons';

	const options = [
		{ id: 1, label: 'Profile', icon: UserCircleLinearIcon },
		{ id: 2, label: 'Settings', description: 'Manage account' },
		{ id: 3, label: 'Logout', href: '/logout' }
	];
</script>

<Dropdown {options}>
	<Button>Open Menu</Button>
</Dropdown>
```

### With Header & Footer

```svelte
<Dropdown {options}>
	{#snippet header()}
		<div class="p-2 border-b font-medium">My Account</div>
	{/snippet}

	<Button>Open Menu</Button>

	{#snippet footer()}
		<div class="p-2 border-t text-xs text-center">v1.0.0</div>
	{/snippet}
</Dropdown>
```

### Avatar Trigger

```svelte
<Dropdown {options} color="primary">
	<Avatar name="John Doe" />
</Dropdown>

<Dropdown {options} color="success">
	<Avatar src="/user.jpg" alt="User" status="online" />
</Dropdown>
```

### Color Variants

```svelte
<Dropdown {options} color="primary">
	<Button color="primary">Primary</Button>
</Dropdown>

<Dropdown {options} color="danger">
	<Button color="danger">Danger</Button>
</Dropdown>
```

## Notes

- Child element becomes the trigger
- Options can have `href` for links or `onclick` for actions
- Use `icon` for visual indicators on options
