# ui-svelte Layout Documentation

Complete reference for building layouts with ui-svelte components.

---

## Layout Structure

Layouts are composed using Scaffold as the root. Never place components outside Scaffold.

```
+layout.svelte
└── Scaffold (root wrapper)
    ├── appBar → AppBar
    ├── start → Sidebar + SideNav
    ├── end → Sidebar (optional)
    ├── bottomBar → BottomNav
    └── children → Page content
```

### Quick Start

```svelte
<script lang="ts">
	import { Scaffold, AppBar, Sidebar, SideNav } from 'ui-svelte';

	let { children } = $props();

	const navItems = [
		{ label: 'Home', icon: 'fluent:home-24-regular', href: '/' },
		{ label: 'Settings', icon: 'fluent:settings-24-regular', href: '/settings' }
	];
</script>

<Scaffold mainClass="lg:p-4" startClass="invisible lg:visible lg:w-56" bodyClass="mt-16" isBoxed>
	{#snippet appBar()}
		<AppBar class="h-16" isSticky isBoxed>
			{#snippet start()}
				<h4>My App</h4>
			{/snippet}
		</AppBar>
	{/snippet}

	{#snippet start()}
		<Sidebar rootClass="vh-16">
			<SideNav items={navItems} />
		</Sidebar>
	{/snippet}

	{@render children()}
</Scaffold>
```

### Layout Patterns

| Pattern   | Props                                       | Use Case        |
| --------- | ------------------------------------------- | --------------- |
| Landing   | `mainClass="vh-16 mt-16"` + Footer          | Marketing sites |
| Dashboard | `startClass="lg:w-56"`, `bodyClass="mt-16"` | Admin panels    |
| Mobile    | `mainClass="mt-16 pb-16"` + BottomNav       | PWAs            |

---

## Scaffold Component

Layout foundation. Manages AppBar, Sidebars, Footer, and BottomNav positioning.

### Props

| Prop         | Type      | Default | Description                   |
| ------------ | --------- | ------- | ----------------------------- |
| `children`   | `Snippet` | -       | Main content                  |
| `appBar`     | `Snippet` | -       | Fixed top navigation          |
| `start`      | `Snippet` | -       | Left sidebar                  |
| `end`        | `Snippet` | -       | Right sidebar                 |
| `bottomBar`  | `Snippet` | -       | Fixed bottom navigation       |
| `bodyClass`  | `string`  | -       | Body container classes        |
| `mainClass`  | `string`  | -       | Main content classes          |
| `startClass` | `string`  | -       | Left sidebar wrapper classes  |
| `endClass`   | `string`  | -       | Right sidebar wrapper classes |
| `isBoxed`    | `boolean` | `false` | Limit max-width               |

### Examples

```svelte
<!-- Landing Page -->
<Scaffold mainClass="vh-16 mt-16">
	{#snippet appBar()}
		<AppBar class="h-16" isBoxed isSticky>
			{#snippet start()}
				<h4>Brand</h4>
			{/snippet}
		</AppBar>
	{/snippet}

	{@render children()}

	<Footer isBoxed>
		{#snippet start()}
			<p class="text-sm">© 2024 Company</p>
		{/snippet}
	</Footer>
</Scaffold>

<!-- Dashboard -->
<Scaffold mainClass="lg:p-4" startClass="invisible lg:visible lg:w-56" bodyClass="mt-16">
	{#snippet appBar()}
		<AppBar class="h-16" isSticky isBoxed />
	{/snippet}

	{#snippet start()}
		<Sidebar rootClass="vh-16">
			<SideNav items={navItems} />
		</Sidebar>
	{/snippet}

	{@render children()}
</Scaffold>

<!-- Mobile App -->
<Scaffold mainClass="mt-16 pb-16" bodyClass="mt-16">
	{#snippet appBar()}
		<AppBar class="h-16">
			{#snippet center()}
				<h4>Mobile App</h4>
			{/snippet}
		</AppBar>
	{/snippet}

	{@render children()}

	{#snippet bottomBar()}
		<BottomNav items={bottomNavItems} />
	{/snippet}
</Scaffold>
```

---

## AppBar Component

Flexible top navigation bar with start, center, and end slots.

### Props

| Prop                 | Type                                                                                                            | Default     | Description           |
| -------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | --------------------- |
| `start`              | `Snippet`                                                                                                       | -           | Left slot content     |
| `center`             | `Snippet`                                                                                                       | -           | Center slot content   |
| `end`                | `Snippet`                                                                                                       | -           | Right slot content    |
| `color`              | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Color theme           |
| `variant`            | `'solid' \| 'soft'`                                                                                             | `'soft'`    | Visual style          |
| `isBlurred`          | `boolean`                                                                                                       | `false`     | Blur background       |
| `isBordered`         | `boolean`                                                                                                       | `false`     | Show border           |
| `borderOnScrollOnly` | `boolean`                                                                                                       | `false`     | Show border on scroll |
| `isSticky`           | `boolean`                                                                                                       | `false`     | Sticky positioning    |
| `isFloating`         | `boolean`                                                                                                       | `false`     | Floating style        |
| `isBoxed`            | `boolean`                                                                                                       | `false`     | Constrain width       |
| `hideOnScroll`       | `boolean`                                                                                                       | `false`     | Hide on scroll down   |

### Examples

```svelte
<!-- Basic -->
<AppBar class="h-16" isSticky>
	{#snippet start()}
		<h4>Brand</h4>
	{/snippet}
	{#snippet center()}
		<NavMenu items={navItems} />
	{/snippet}
	{#snippet end()}
		<IconButton icon={SearchIcon} />
	{/snippet}
</AppBar>

<!-- With Blur -->
<AppBar isBlurred isSticky borderOnScrollOnly>
	{#snippet center()}
		<NavMenu items={navItems} />
	{/snippet}
</AppBar>
```

---

## Sidebar Component

Vertical navigation wrapper with optional header and footer sections.

### Props

| Prop           | Type      | Default | Description             |
| -------------- | --------- | ------- | ----------------------- |
| `children`     | `Snippet` | -       | Main content (required) |
| `header`       | `Snippet` | -       | Header section          |
| `footer`       | `Snippet` | -       | Footer section          |
| `class`        | `string`  | -       | Container classes       |
| `contentClass` | `string`  | -       | Content wrapper classes |

### Examples

```svelte
<!-- Basic -->
<Sidebar class="w-48">
	{#snippet header()}
		<h3 class="text-lg font-semibold">Menu</h3>
	{/snippet}

	<SideNav items={navItems} />

	{#snippet footer()}
		<Button variant="ghost" class="w-full">Sign Out</Button>
	{/snippet}
</Sidebar>

<!-- Within Scaffold -->
{#snippet start()}
	<Sidebar rootClass="vh-16">
		<SideNav items={navItems} />
	</Sidebar>
{/snippet}
```

---

## Footer Component

Display copyright, navigation links, and secondary actions at page bottom.

### Props

| Prop         | Type                                                                                                            | Default     | Description         |
| ------------ | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------- |
| `start`      | `Snippet`                                                                                                       | -           | Left slot content   |
| `center`     | `Snippet`                                                                                                       | -           | Center slot content |
| `end`        | `Snippet`                                                                                                       | -           | Right slot content  |
| `color`      | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Color theme         |
| `variant`    | `'solid' \| 'soft'`                                                                                             | `'soft'`    | Visual style        |
| `isBordered` | `boolean`                                                                                                       | `false`     | Show border         |
| `isBoxed`    | `boolean`                                                                                                       | `false`     | Constrain width     |

### Examples

```svelte
<!-- Simple -->
<Footer isBordered>
	{#snippet start()}
		<p class="text-sm">© 2024 Company</p>
	{/snippet}
	{#snippet center()}
		<FooterNav {links} />
	{/snippet}
</Footer>

<!-- Multi-Column -->
<Footer isBordered>
	{#snippet center()}
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8 py-4">
			<FooterGroup title="Product" links={productLinks} />
			<FooterGroup title="Company" links={companyLinks} />
		</div>
	{/snippet}
</Footer>
```

---

## SideNav Component

Vertical sidebar navigation with headers, dividers, and submenus.

### Props

| Prop            | Type                                                                                  | Default   | Description       |
| --------------- | ------------------------------------------------------------------------------------- | --------- | ----------------- |
| `items`         | `SideNavItem[]`                                                                       | `[]`      | Navigation items  |
| `size`          | `'sm' \| 'md' \| 'lg'`                                                                | `'md'`    | Size              |
| `color`         | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'muted'` | Color theme       |
| `variant`       | `'solid' \| 'soft' \| 'ghost'`                                                        | `'ghost'` | Visual style      |
| `isCollapsible` | `boolean`                                                                             | `false`   | Collapse on hover |

### Item Types

```typescript
interface SideNavItem {
	type?: 'item' | 'divider' | 'header' | 'submenu';
	label?: string;
	description?: string;
	href?: string;
	icon?: IconData;
	subitems?: SideNavSubItem[];
	status?: string;
}
```

### Examples

```svelte
<!-- Basic -->
<SideNav
	items={[
		{ type: 'header', label: 'Menu' },
		{ type: 'divider' },
		{ label: 'Home', href: '/home', icon: HomeIcon },
		{ label: 'Settings', href: '/settings', icon: SettingsIcon }
	]}
/>

<!-- With Submenus -->
<SideNav
	items={[
		{
			type: 'submenu',
			label: 'Analytics',
			icon: ChartIcon,
			open: true,
			subitems: [
				{ label: 'Overview', href: '/analytics/overview' },
				{ label: 'Reports', href: '/analytics/reports' }
			]
		}
	]}
/>
```

---

## NavMenu Component

Horizontal navigation with links, submenus, and megamenus.

### Props

| Prop      | Type                                                                                  | Default   | Description  |
| --------- | ------------------------------------------------------------------------------------- | --------- | ------------ |
| `items`   | `NavMenuItem[]`                                                                       | `[]`      | Menu items   |
| `size`    | `'sm' \| 'md' \| 'lg'`                                                                | `'md'`    | Size         |
| `color`   | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'muted'` | Color theme  |
| `variant` | `'solid' \| 'soft' \| 'ghost'`                                                        | `'ghost'` | Visual style |

### Examples

```svelte
<!-- Simple Links -->
<NavMenu
	items={[
		{ label: 'Home', href: '/home' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/contact' }
	]}
/>

<!-- With Submenu -->
<NavMenu
	items={[
		{ label: 'Home', href: '/home' },
		{
			label: 'Products',
			type: 'submenu',
			subitems: [
				{ label: 'All Products', href: '/products' },
				{ label: 'Categories', href: '/categories' }
			]
		}
	]}
/>
```

---

## BottomNav Component

Mobile-friendly bottom navigation bar with icons and badges.

### Props

| Prop          | Type                                                                                                            | Default     | Description            |
| ------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------- |
| `items`       | `BottomNavItem[]`                                                                                               | `[]`        | Navigation items       |
| `size`        | `'sm' \| 'md' \| 'lg'`                                                                                          | `'md'`      | Size                   |
| `color`       | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'primary'` | Color theme            |
| `variant`     | `'solid' \| 'soft' \| 'blur'`                                                                                   | `'soft'`    | Visual style           |
| `activeStyle` | `'line' \| 'pill'`                                                                                              | `'line'`    | Active indicator style |
| `isBordered`  | `boolean`                                                                                                       | `true`      | Show border            |

### Item Types

```typescript
interface BottomNavItem {
	id: string;
	label?: string;
	icon: IconData;
	href?: string;
	badge?: string | number;
	isFab?: boolean;
}
```

### Examples

```svelte
<!-- Basic -->
<BottomNav
	items={[
		{ id: 'home', label: 'Home', href: '/home', icon: HomeIcon },
		{ id: 'search', label: 'Search', href: '/search', icon: SearchIcon },
		{ id: 'profile', label: 'Profile', href: '/profile', icon: UserIcon }
	]}
/>

<!-- With FAB -->
<BottomNav
	items={[
		{ id: 'home', label: 'Home', icon: HomeIcon },
		{ id: 'add', icon: PlusIcon, isFab: true },
		{ id: 'profile', label: 'Profile', icon: UserIcon }
	]}
/>
```

---

## Spacing Rules

| AppBar Height      | bodyClass     | Sidebar rootClass |
| ------------------ | ------------- | ----------------- |
| `h-16`             | `mt-16`       | `vh-16`           |
| `h-20`             | `mt-20`       | `vh-20`           |
| `h-16` + BottomNav | `mt-16 mb-16` | `vh-32`           |

### vh Utilities

| Utility | Value                | Use Case                |
| ------- | -------------------- | ----------------------- |
| `vh-16` | `calc(100vh - 4rem)` | With h-16 AppBar        |
| `vh-32` | `calc(100vh - 8rem)` | With AppBar + BottomNav |

---

## Responsive Patterns

### Hide/Show by Screen Size

```svelte
<!-- Mobile menu button -->
<IconButton class="lg:hidden" />

<!-- Desktop sidebar -->
<Scaffold startClass="invisible lg:visible lg:w-56">
```

### Responsive with Drawer

```svelte
<script lang="ts">
	let drawerOpen = $state(false);
</script>

<Scaffold startClass="invisible lg:visible lg:w-56" bodyClass="mt-16">
	{#snippet appBar()}
		<AppBar class="h-16" isSticky>
			{#snippet start()}
				<IconButton icon={MenuIcon} onclick={() => (drawerOpen = true)} class="lg:hidden" />
				<h4>My App</h4>
			{/snippet}
		</AppBar>
	{/snippet}

	{#snippet start()}
		<Sidebar rootClass="vh-16">
			<SideNav items={navItems} />
		</Sidebar>
	{/snippet}

	{@render children()}
</Scaffold>

<Drawer bind:open={drawerOpen}>
	<SideNav items={navItems} onclick={() => (drawerOpen = false)} />
</Drawer>
```

---

## Import Statement

```svelte
<script lang="ts">
	import {
		Scaffold,
		AppBar,
		Sidebar,
		SideNav,
		NavMenu,
		BottomNav,
		Footer,
		FooterNav,
		FooterGroup,
		Drawer,
		IconButton
	} from 'ui-svelte';

	let { children } = $props();
</script>
```
