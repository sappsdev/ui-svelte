# Dropdown Component

Display a list of actions or options from a trigger element.

## Import

```svelte
import {Dropdown} from 'ui-svelte';
```

## Props

| Prop       | Type                                                                                  | Default     | Description                |
| ---------- | ------------------------------------------------------------------------------------- | ----------- | -------------------------- |
| `options`  | `Option[]`                                                                            | `[]`        | Menu items to display      |
| `color`    | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Color theme                |
| `children` | `Snippet`                                                                             | -           | Trigger element (required) |
| `header`   | `Snippet`                                                                             | -           | Optional header content    |
| `footer`   | `Snippet`                                                                             | -           | Optional footer content    |

## Option Type

```ts
type Option = {
	id?: string | number;
	label: string;
	description?: string;
	src?: string;
	icon?: IconData;
	href?: string;
	onclick?: (option: Option) => void;
};
```

## Patterns

### Basic Dropdown

```svelte
<Dropdown {options}>
	<Button>Open Menu</Button>
</Dropdown>
```

### With Icons & Descriptions

```svelte
<script>
	const options = [
		{ id: 1, label: 'Profile', icon: UserIcon },
		{ id: 2, label: 'Settings', description: 'Manage account' },
		{ id: 3, label: 'Logout', href: '/logout' }
	];
</script>

<Dropdown {options}>
	<Button>Menu</Button>
</Dropdown>
```

### With Header & Footer

```svelte
<Dropdown {options} color="primary">
	{#snippet header()}
		<div class="p-2 border-b font-medium">My Account</div>
	{/snippet}
	<Button>Open</Button>
	{#snippet footer()}
		<div class="p-2 border-t text-xs text-center">v1.0.0</div>
	{/snippet}
</Dropdown>
```

### Avatar Trigger

```svelte
<!-- Initials -->
<Dropdown {options}>
	<Avatar name="John Doe" />
</Dropdown>

<!-- Image with status -->
<Dropdown {options}>
	<Avatar src="/user.jpg" status="online" />
</Dropdown>
```

## Notes

- Trigger element goes in default slot (children)
- Dropdown auto-positions based on viewport
- Closes on click outside or option selection
- Use `onclick` in options for custom handlers
