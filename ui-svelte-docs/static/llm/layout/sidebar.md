# Sidebar Component

Vertical navigation wrapper with optional header and footer sections.

## Import

```svelte
import {Sidebar} from 'ui-svelte';
```

## Props

| Prop           | Type      | Default | Description             |
| -------------- | --------- | ------- | ----------------------- |
| `children`     | `Snippet` | -       | Main content (required) |
| `header`       | `Snippet` | -       | Header section          |
| `footer`       | `Snippet` | -       | Footer section          |
| `class`        | `string`  | -       | Container classes       |
| `contentClass` | `string`  | -       | Content wrapper classes |
| `headerClass`  | `string`  | -       | Header classes          |
| `footerClass`  | `string`  | -       | Footer classes          |

## Patterns

### Basic Sidebar

```svelte
<script lang="ts">
	import { Sidebar, SideNav, Button } from 'ui-svelte';

	const navItems = [
		{ type: 'header', label: 'Navigation' },
		{ label: 'Dashboard', icon: HomeLinearIcon, href: '/dashboard' },
		{ label: 'Projects', icon: FolderLinearIcon, href: '/projects' },
		{ label: 'Settings', icon: SettingsLinearIcon, href: '/settings' }
	];
</script>

<Sidebar class="w-48">
	{#snippet header()}
		<h3 class="text-lg font-semibold">Menu</h3>
	{/snippet}

	<SideNav items={navItems} />

	{#snippet footer()}
		<Button variant="ghost" class="w-full">Sign Out</Button>
	{/snippet}
</Sidebar>
```

### Within Scaffold

```svelte
<Scaffold mainClass="lg:ml-48 vh-16 mt-16" startClass="vh-16 mt-16">
	{#snippet appBar()}
		<AppBar class="h-16">
			<!-- AppBar content -->
		</AppBar>
	{/snippet}

	{#snippet start()}
		<Sidebar class="w-48">
			{#snippet header()}
				<h3>Navigation</h3>
			{/snippet}
			<SideNav items={navItems} />
			{#snippet footer()}
				<Button variant="ghost">Sign Out</Button>
			{/snippet}
		</Sidebar>
	{/snippet}

	<div class="p-4">Main Content</div>
</Scaffold>
```

### Responsive with Drawer

```svelte
<Scaffold mainClass="lg:ml-48 vh-16 mt-16" startClass="invisible lg:visible vh-16 mt-16">
	{#snippet appBar()}
		<AppBar class="h-16">
			{#snippet start()}
				<IconButton icon={MenuIcon} onclick={() => (drawerOpen = true)} class="lg:hidden" />
			{/snippet}
		</AppBar>
	{/snippet}

	{#snippet start()}
		<Sidebar class="w-48">
			<SideNav items={navItems} />
		</Sidebar>
	{/snippet}

	<div class="p-4">Main content</div>
</Scaffold>

<Drawer bind:open={drawerOpen}>
	<Sidebar class="w-64">
		<SideNav items={navItems} />
	</Sidebar>
</Drawer>
```

## Width and Height Guidelines

| AppBar Height | Sidebar Class | Main Class    |
| ------------- | ------------- | ------------- |
| `h-16`        | `vh-16 mt-16` | `ml-48 mt-16` |
| `h-20`        | `vh-20 mt-20` | `ml-48 mt-20` |

| Sidebar Width | Main Margin           |
| ------------- | --------------------- |
| `w-48`        | `ml-48` or `lg:ml-48` |
| `w-56`        | `ml-56` or `lg:ml-56` |
| `w-64`        | `ml-64` or `lg:ml-64` |

## Notes

- Automatically receives `fixed` positioning within Scaffold
- Use `vh-*` utilities to fill remaining viewport height
- Combine with Drawer for responsive mobile navigation
