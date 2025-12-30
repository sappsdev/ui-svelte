# Scaffold Component

Layout foundation for applications. Manages AppBar, Sidebars, Footer, and BottomNav positioning.

**⚠️ Only use in layout files (+layout.svelte).**

## Import

```svelte
import {Scaffold} from 'ui-svelte';
```

## Props

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

## Patterns

### Landing Page Layout

```svelte
<Scaffold mainClass="vh-16 mt-16">
	{#snippet appBar()}
		<AppBar class="h-16" isBoxed isSticky>
			{#snippet start()}
				<h4>Brand</h4>
			{/snippet}
			{#snippet center()}
				<NavMenu items={navItems} />
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
```

### Dashboard Layout

```svelte
<Scaffold
	mainClass="lg:p-4 pb-16"
	startClass="invisible lg:visible lg:w-56"
	bodyClass="bg-background mt-16"
>
	{#snippet appBar()}
		<AppBar class="h-16" isSticky isBoxed>
			{#snippet start()}
				<IconButton icon={MenuIcon} onclick={() => (drawerOpen = true)} class="lg:hidden" />
				<h4>Dashboard</h4>
			{/snippet}
		</AppBar>
	{/snippet}

	{#snippet start()}
		<Sidebar rootClass="pb-8 vh-16">
			<SideNav items={navItems} />
		</Sidebar>
	{/snippet}

	{@render children()}

	<Footer isBordered>
		{#snippet start()}
			<p class="text-sm">© 2024 Company</p>
		{/snippet}
	</Footer>
</Scaffold>

<Drawer bind:open={drawerOpen}>
	<SideNav items={navItems} />
</Drawer>
```

### Mobile App Layout

```svelte
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

## Key Concepts

| Class                               | Purpose                  |
| ----------------------------------- | ------------------------ |
| `bodyClass="mt-16"`                 | Space for h-16 AppBar    |
| `startClass="lg:w-56"`              | Sidebar width            |
| `startClass="invisible lg:visible"` | Hide on mobile           |
| `mainClass="vh-16"`                 | Full height minus AppBar |
| `mainClass="pb-16"`                 | Space for BottomNav      |

## vh Utilities

| Utility | Value                | Use Case                |
| ------- | -------------------- | ----------------------- |
| `vh-16` | `calc(100vh - 4rem)` | With h-16 AppBar        |
| `vh-32` | `calc(100vh - 8rem)` | With AppBar + BottomNav |

## Notes

- Apply `mt-*` to `bodyClass` matching AppBar height
- Apply `vh-*` to Sidebar to fill remaining height
- Use Drawer for mobile sidebar navigation
