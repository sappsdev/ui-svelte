# AppBar Component

Flexible top navigation bar with start, center, and end slots.

## Import

```svelte
import {AppBar} from 'ui-svelte';
```

## Props

| Prop                 | Type                                                                                                            | Default     | Description                    |
| -------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------ |
| `start`              | `Snippet`                                                                                                       | -           | Left slot content              |
| `center`             | `Snippet`                                                                                                       | -           | Center slot content            |
| `end`                | `Snippet`                                                                                                       | -           | Right slot content             |
| `popoverContent`     | `Snippet`                                                                                                       | -           | Content for slide-down popover |
| `popoverOpen`        | `boolean`                                                                                                       | `false`     | Controls popover visibility    |
| `popoverClass`       | `string`                                                                                                        | -           | Additional popover classes     |
| `color`              | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Color theme                    |
| `variant`            | `'solid' \| 'soft'`                                                                                             | `'soft'`    | Visual style                   |
| `isBlurred`          | `boolean`                                                                                                       | `false`     | Blur background                |
| `isBordered`         | `boolean`                                                                                                       | `false`     | Show border                    |
| `borderOnScrollOnly` | `boolean`                                                                                                       | `false`     | Show border on scroll          |
| `isSticky`           | `boolean`                                                                                                       | `false`     | Sticky positioning             |
| `isFloating`         | `boolean`                                                                                                       | `false`     | Floating style                 |
| `isBoxed`            | `boolean`                                                                                                       | `false`     | Constrain width                |
| `hideOnScroll`       | `boolean`                                                                                                       | `false`     | Hide on scroll down            |
| `solidOnScroll`      | `boolean`                                                                                                       | `false`     | Solid background on scroll     |
| `rootClass`          | `string`                                                                                                        | -           | Container classes              |
| `contentClass`       | `string`                                                                                                        | -           | Content wrapper classes        |

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

### Mobile Popover Menu

Use the popover feature to show a slide-down menu, ideal for mobile navigation.

```svelte
<script lang="ts">
	import { AppBar, SideNav, IconButton } from 'ui-svelte';
	import { MenuIcon, SearchIcon, HomeIcon, SettingsIcon } from '$lib/icons';

	let popoverOpen = $state(false);

	const mobileMenuItems = [
		{ type: 'header', label: 'Navigation' },
		{ type: 'divider' },
		{ label: 'Home', href: '/', icon: HomeIcon },
		{ label: 'Products', href: '/products' },
		{ label: 'Settings', href: '/settings', icon: SettingsIcon }
	];
</script>

<AppBar isSticky isBordered bind:popoverOpen>
	{#snippet start()}
		<IconButton icon={MenuIcon} variant="ghost" onclick={() => (popoverOpen = !popoverOpen)} />
	{/snippet}
	{#snippet center()}
		<span class="font-semibold">My App</span>
	{/snippet}
	{#snippet end()}
		<IconButton icon={SearchIcon} variant="ghost" />
	{/snippet}
	{#snippet popoverContent()}
		<SideNav items={mobileMenuItems} isWide />
	{/snippet}
</AppBar>
```

## Notes

- Use with Scaffold for fixed positioning
- `isBoxed` constrains content to max container width
- Combine `isBlurred` with `borderOnScrollOnly` for modern effect
- Use `popoverContent` snippet with `bind:popoverOpen` for mobile menus
- The popover slides down from the bottom of the AppBar with a smooth animation
