# AppBar Component

Flexible top navigation bar with start, center, and end slots.

## Import

```svelte
import {AppBar} from 'ui-svelte';
```

## Props

| Prop                 | Type                                                                                                            | Default     | Description                |
| -------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------- |
| `color`              | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Color theme                |
| `variant`            | `'solid' \| 'soft'`                                                                                             | `'soft'`    | Visual style               |
| `isBlurred`          | `boolean`                                                                                                       | `false`     | Blur background effect     |
| `isBordered`         | `boolean`                                                                                                       | `false`     | Show bottom border         |
| `borderOnScrollOnly` | `boolean`                                                                                                       | `false`     | Show border only on scroll |
| `isSticky`           | `boolean`                                                                                                       | `false`     | Stick to top on scroll     |
| `isFloating`         | `boolean`                                                                                                       | `false`     | Float with padding         |
| `isBoxed`            | `boolean`                                                                                                       | `false`     | Constrain content width    |
| `hideOnScroll`       | `boolean`                                                                                                       | `false`     | Hide when scrolling down   |
| `solidOnScroll`      | `boolean`                                                                                                       | `false`     | Switch to solid on scroll  |

## Slots (Snippets)

- `start` - Left section (logo, menu toggle)
- `center` - Middle section (navigation)
- `end` - Right section (actions, user menu)

## Patterns

### Basic AppBar

```svelte
<AppBar>
	{#snippet start()}
		<IconButton icon={MenuIcon} variant="ghost" color="muted" />
	{/snippet}
	{#snippet center()}
		<NavMenu items={navItems} />
	{/snippet}
	{#snippet end()}
		<IconButton icon={SearchIcon} variant="ghost" color="muted" />
	{/snippet}
</AppBar>
```

### With Dropdown Menu

```svelte
<AppBar color="surface" variant="soft" isBordered>
	{#snippet start()}
		<IconButton icon={MenuIcon} variant="ghost" color="muted" />
	{/snippet}
	{#snippet center()}
		<NavMenu items={navItems} />
	{/snippet}
	{#snippet end()}
		<Dropdown options={userOptions}>
			<IconButton icon={UserIcon} variant="ghost" color="muted" />
		</Dropdown>
	{/snippet}
</AppBar>
```

### Sticky with Blur

```svelte
<AppBar isSticky isBlurred variant="soft">
	{#snippet center()}
		<NavMenu items={navItems} />
	{/snippet}
</AppBar>
```

### Floating Style

```svelte
<AppBar isFloating isBoxed color="surface" variant="soft" isBordered>
	{#snippet center()}
		<span class="font-medium">App Name</span>
	{/snippet}
</AppBar>
```

## Notes

- Use `start`, `center`, `end` snippets for content placement
- Combine `isSticky` + `isBlurred` for modern glass effect
- Use `hideOnScroll` for more content space on mobile
- `solidOnScroll` transitions from transparent to solid background

## Component References

- **@see nav-menu.md** - Navigation menus in center slot
- **@see dropdown.md** - User menus in end slot
- **@see icon-button.md** - Action buttons in any slot
