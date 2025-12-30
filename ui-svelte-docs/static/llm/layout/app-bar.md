# AppBar Component

Flexible top navigation bar with start, center, and end slots.

## Import

```svelte
import {AppBar} from 'ui-svelte';
```

## Props

| Prop                 | Type                                                                                                            | Default     | Description                |
| -------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------- |
| `start`              | `Snippet`                                                                                                       | -           | Left slot content          |
| `center`             | `Snippet`                                                                                                       | -           | Center slot content        |
| `end`                | `Snippet`                                                                                                       | -           | Right slot content         |
| `color`              | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Color theme                |
| `variant`            | `'solid' \| 'soft'`                                                                                             | `'soft'`    | Visual style               |
| `isBlurred`          | `boolean`                                                                                                       | `false`     | Blur background            |
| `isBordered`         | `boolean`                                                                                                       | `false`     | Show border                |
| `borderOnScrollOnly` | `boolean`                                                                                                       | `false`     | Show border on scroll      |
| `isSticky`           | `boolean`                                                                                                       | `false`     | Sticky positioning         |
| `isFloating`         | `boolean`                                                                                                       | `false`     | Floating style             |
| `isBoxed`            | `boolean`                                                                                                       | `false`     | Constrain width            |
| `hideOnScroll`       | `boolean`                                                                                                       | `false`     | Hide on scroll down        |
| `solidOnScroll`      | `boolean`                                                                                                       | `false`     | Solid background on scroll |
| `rootClass`          | `string`                                                                                                        | -           | Container classes          |
| `contentClass`       | `string`                                                                                                        | -           | Content wrapper classes    |

## Patterns

### Basic AppBar

```svelte
<script lang="ts">
	import { AppBar, NavMenu, IconButton } from 'ui-svelte';
	import { MenuIcon, SearchIcon } from '$lib/icons';

	const navItems = [
		{ label: 'Home', href: '/', icon: HomeLinearIcon },
		{ label: 'Products', href: '/products' },
		{ label: 'About', href: '/about' }
	];
</script>

<AppBar>
	{#snippet start()}
		<IconButton icon={MenuIcon} variant="ghost" />
	{/snippet}
	{#snippet center()}
		<NavMenu items={navItems} />
	{/snippet}
	{#snippet end()}
		<IconButton icon={SearchIcon} variant="ghost" />
	{/snippet}
</AppBar>
```

### Sticky with Border

```svelte
<AppBar isSticky isBordered color="surface">
	{#snippet start()}
		<h4>Brand</h4>
	{/snippet}
	{#snippet center()}
		<NavMenu items={navItems} />
	{/snippet}
	{#snippet end()}
		<Dropdown options={userOptions}>
			<Avatar name="John Doe" />
		</Dropdown>
	{/snippet}
</AppBar>
```

### With Blur Effect

```svelte
<AppBar isBlurred isSticky borderOnScrollOnly>
	{#snippet center()}
		<NavMenu items={navItems} />
	{/snippet}
</AppBar>
```

## Notes

- Use with Scaffold for fixed positioning
- `isBoxed` constrains content to max container width
- Combine `isBlurred` with `borderOnScrollOnly` for modern effect
