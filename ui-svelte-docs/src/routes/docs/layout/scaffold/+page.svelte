<script lang="ts">
	import { Card, Checkbox, Code, Icon, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';
	import {
		WebLayoutIcon,
		LayoutDashboardIcon,
		SmartphoneIcon,
		WarningTriangleIcon
	} from '$lib/icons';

	type ExampleType = 'landing' | 'dashboard' | 'mobile';
	let exampleType = $state<ExampleType>('landing');
	let isBoxed = $state(false);

	const exampleOptions = [
		{ id: 'landing', label: 'Landing Page' },
		{ id: 'dashboard', label: 'Dashboard Layout' },
		{ id: 'mobile', label: 'Mobile with BottomNav' }
	];

	let code = $derived(() => {
		if (exampleType === 'landing') {
			return `<script lang="ts">
	import { Scaffold, AppBar, Footer, NavMenu } from 'ui-svelte';
	let { children } = $props();

	const navItems = [
		{ label: 'Home', icon: 'fluent:home-24-regular', href: '/' },
		{ label: 'Docs', icon: 'fluent:info-24-regular', href: '/docs' }
	];
<\/script>

<Scaffold mainClass="vh-16 mt-16"${isBoxed ? ' isBoxed' : ''}>
	{#snippet appBar()}
		<AppBar class="h-16" isBoxed isSticky>
			{#snippet start()}
				<h4>Brand</h4>
			{/snippet}
			{#snippet center()}
				<NavMenu items={navItems} />
			{/snippet}
			{#snippet end()}
				<ToggleTheme />
			{/snippet}
		</AppBar>
	{/snippet}

	<!-- Main content -->
	{@render children()}

	<!-- Footer is placed as a direct child -->
	<Footer isBoxed>
		{#snippet start()}
			<p class="text-sm">© 2024 Company</p>
		{/snippet}
	</Footer>
</Scaffold>`;
		}

		if (exampleType === 'dashboard') {
			return `<script lang="ts">
	import { Scaffold, AppBar, Sidebar, SideNav, Footer, IconButton, Drawer } from 'ui-svelte';
	let { children } = $props();
	let drawerOpen = $state(false);

	const navItems = [
		{ label: 'Dashboard', icon: 'fluent:home-24-regular', href: '/dashboard' },
		{ label: 'Projects', icon: 'fluent:folder-24-regular', href: '/projects' },
		{ label: 'Settings', icon: 'fluent:settings-24-regular', href: '/settings' }
	];
<\/script>

<Scaffold
	mainClass="lg:p-4 pb-16"
	startClass="invisible lg:visible lg:w-56"
	bodyClass="bg-background mt-16"${isBoxed ? '\n\tisBoxed' : ''}
>
	{#snippet appBar()}
		<AppBar class="h-16" isSticky isBoxed>
			{#snippet start()}
				<IconButton
					icon="fluent:navigation-24-regular"
					onclick={() => drawerOpen = true}
					class="lg:hidden"
				/>
				<h4>Dashboard</h4>
			{/snippet}
			{#snippet end()}
				<ToggleTheme />
			{/snippet}
		</AppBar>
	{/snippet}

	{#snippet start()}
		<Sidebar rootClass="pb-8 vh-16">
			{#snippet header()}
				<h3 class="text-lg font-semibold">Navigation</h3>
			{/snippet}
			<SideNav items={navItems} />
		</Sidebar>
	{/snippet}

	<!-- Main content -->
	{@render children()}

	<Footer isBordered>
		{#snippet start()}
			<p class="text-sm">© 2024 Company</p>
		{/snippet}
	</Footer>
</Scaffold>

<!-- Mobile Drawer for navigation -->
<Drawer bind:open={drawerOpen}>
	<SideNav items={navItems} />
</Drawer>`;
		}

		return `<script lang="ts">
	import { Scaffold, AppBar, BottomNav } from 'ui-svelte';
	let { children } = $props();

	const bottomNavItems = [
		{ id: 'home', label: 'Home', icon: 'fluent:home-24-regular', href: '/' },
		{ id: 'search', label: 'Search', icon: 'fluent:search-24-regular', href: '/search' },
		{ id: 'favorites', label: 'Favorites', icon: 'fluent:heart-24-regular', href: '/favorites' },
		{ id: 'profile', label: 'Profile', icon: 'fluent:person-24-regular', href: '/profile' }
	];
<\/script>

<Scaffold mainClass="mt-16 pb-16" bodyClass="mt-16"${isBoxed ? ' isBoxed' : ''}>
	{#snippet appBar()}
		<AppBar class="h-16">
			{#snippet center()}
				<h4>Mobile App</h4>
			{/snippet}
		</AppBar>
	{/snippet}

	<!-- Main content -->
	{@render children()}

	{#snippet bottomBar()}
		<BottomNav items={bottomNavItems} />
	{/snippet}
</Scaffold>`;
	});

	const props = [
		{ prop: 'children', type: 'Snippet', initial: '', description: 'Main content' },
		{ prop: 'appBar', type: 'Snippet', initial: '', description: 'Fixed top navigation bar' },
		{ prop: 'start', type: 'Snippet', initial: '', description: 'Left sidebar content' },
		{ prop: 'end', type: 'Snippet', initial: '', description: 'Right sidebar content' },
		{ prop: 'bottomBar', type: 'Snippet', initial: '', description: 'Fixed bottom navigation' },
		{
			prop: 'bodyClass',
			type: 'string',
			initial: '',
			description: 'Classes for the body container'
		},
		{
			prop: 'mainClass',
			type: 'string',
			initial: '',
			description: 'Classes for the main content area'
		},
		{
			prop: 'startClass',
			type: 'string',
			initial: '',
			description: 'Classes for the left sidebar wrapper'
		},
		{
			prop: 'endClass',
			type: 'string',
			initial: '',
			description: 'Classes for the right sidebar wrapper'
		},
		{
			prop: 'isBoxed',
			type: 'boolean',
			initial: 'false',
			description: 'Limits max-width to boxed container'
		}
	];
</script>

{#snippet landingPreview()}
	<div class="w-full h-[500px] border border-border rounded-lg overflow-hidden bg-background">
		<div class="h-16 bg-surface border-b border-border flex items-center justify-between px-4">
			<div class="font-semibold">Brand</div>
			<div class="flex gap-4 text-sm">
				<span>Home</span>
				<span>Docs</span>
			</div>
			<div class="w-8 h-8 bg-muted rounded"></div>
		</div>

		<div class="h-[calc(100%-8rem)] overflow-auto p-8">
			<div class="max-w-4xl mx-auto space-y-6">
				<div class="h-32 bg-primary/10 rounded flex items-center justify-center">
					<p class="text-sm">Hero Section</p>
				</div>
				<div class="h-48 bg-secondary/10 rounded flex items-center justify-center">
					<p class="text-sm">Features Section</p>
				</div>
				<div class="h-32 bg-muted/30 rounded flex items-center justify-center">
					<p class="text-sm">CTA Section</p>
				</div>
			</div>
		</div>

		<div class="h-16 bg-surface border-t border-border flex items-center justify-center px-4">
			<p class="text-xs">© 2024 Company</p>
		</div>
	</div>
{/snippet}

{#snippet dashboardPreview()}
	<div
		class="w-full h-[500px] border border-border rounded-lg overflow-hidden bg-background flex flex-col"
	>
		<div
			class="h-16 bg-surface border-b border-border flex items-center justify-between px-4 shrink-0"
		>
			<div class="flex items-center gap-2">
				<div class="w-6 h-6 bg-muted rounded lg:hidden"></div>
				<div class="font-semibold">Dashboard</div>
			</div>
			<div class="w-8 h-8 bg-muted rounded"></div>
		</div>

		<div class="flex-1 flex overflow-hidden">
			<div class="hidden lg:block w-56 bg-surface border-r border-border overflow-auto">
				<div class="p-4 space-y-2">
					<div class="font-semibold mb-4">Navigation</div>
					<div class="h-8 bg-primary/20 rounded px-3 flex items-center text-xs">Dashboard</div>
					<div class="h-8 bg-muted/30 rounded px-3 flex items-center text-xs">Projects</div>
					<div class="h-8 bg-muted/30 rounded px-3 flex items-center text-xs">Settings</div>
				</div>
			</div>

			<div class="flex-1 overflow-auto p-4">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="h-32 bg-primary/10 rounded flex items-center justify-center">
						<p class="text-sm">Card 1</p>
					</div>
					<div class="h-32 bg-secondary/10 rounded flex items-center justify-center">
						<p class="text-sm">Card 2</p>
					</div>
					<div class="h-32 bg-muted/30 rounded flex items-center justify-center">
						<p class="text-sm">Card 3</p>
					</div>
					<div class="h-32 bg-info/10 rounded flex items-center justify-center">
						<p class="text-sm">Card 4</p>
					</div>
				</div>
			</div>
		</div>

		<div
			class="h-12 bg-surface border-t border-border flex items-center justify-center px-4 shrink-0"
		>
			<p class="text-xs">© 2024 Company</p>
		</div>
	</div>
{/snippet}

{#snippet mobilePreview()}
	<div
		class="w-full h-[500px] border border-border rounded-lg overflow-hidden bg-background flex flex-col"
	>
		<div
			class="h-16 bg-surface border-b border-border flex items-center justify-center px-4 shrink-0"
		>
			<div class="font-semibold">Mobile App</div>
		</div>

		<div class="flex-1 overflow-auto p-4">
			<div class="space-y-4">
				<div class="h-48 bg-primary/10 rounded flex items-center justify-center">
					<p class="text-sm">Content Card 1</p>
				</div>
				<div class="h-48 bg-secondary/10 rounded flex items-center justify-center">
					<p class="text-sm">Content Card 2</p>
				</div>
				<div class="h-48 bg-muted/30 rounded flex items-center justify-center">
					<p class="text-sm">Content Card 3</p>
				</div>
			</div>
		</div>

		<div
			class="h-16 bg-surface border-t border-border flex items-center justify-around px-4 shrink-0"
		>
			<div class="flex flex-col items-center gap-1">
				<div class="w-6 h-6 bg-primary rounded"></div>
				<span class="text-xs">Home</span>
			</div>
			<div class="flex flex-col items-center gap-1">
				<div class="w-6 h-6 bg-muted rounded"></div>
				<span class="text-xs">Search</span>
			</div>
			<div class="flex flex-col items-center gap-1">
				<div class="w-6 h-6 bg-muted rounded"></div>
				<span class="text-xs">Favorites</span>
			</div>
			<div class="flex flex-col items-center gap-1">
				<div class="w-6 h-6 bg-muted rounded"></div>
				<span class="text-xs">Profile</span>
			</div>
		</div>
	</div>
{/snippet}

<DocsHeader title="Scaffold" llmUrl="https://ui-svelte.sappsdev.com/llm/layout/scaffold.md">
	Scaffold is a comprehensive layout component that provides the foundation for your application. It
	manages the positioning of AppBar, Sidebar, Footer, and BottomNav to create professional,
	responsive layouts. <strong>It should only be used in layout files (+layout.svelte).</strong>
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Layout Example"
				size="sm"
				options={exampleOptions}
				bind:value={exampleType}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={isBoxed} label="isBoxed" />
		</div>

		<div class="doc-preview">
			{#if exampleType === 'landing'}
				{@render landingPreview()}
			{:else if exampleType === 'dashboard'}
				{@render dashboardPreview()}
			{:else if exampleType === 'mobile'}
				{@render mobilePreview()}
			{/if}
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<Card color="warning">
		<div class="row gap-3 items-start">
			<Icon icon={WarningTriangleIcon} class="w-6 h-6 shrink-0 mt-0.5" />
			<div class="column gap-2">
				<h4 class="font-semibold">Layout Files Only</h4>
				<p class="text-sm">
					The Scaffold component should <strong>only be used in layout files</strong> (+layout.svelte).
					It provides the structural foundation for your entire page and coordinates fixed elements like
					AppBar, Sidebar, and BottomNav. Using it in regular page components will cause layout conflicts.
				</p>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Layout Patterns</p>
	<Card bodyClass="grid-1 md:grid-3 gap-4" color="background" variant="outlined">
		<Card color="info">
			<div class="column gap-3">
				<Icon icon={WebLayoutIcon} class="w-8 h-8" />
				<h4 class="font-semibold">Landing Pages</h4>
				<ul class="text-sm space-y-1 list-disc list-inside">
					<li>AppBar at top (fixed)</li>
					<li>Full-width content</li>
					<li>Footer at bottom</li>
					<li>No sidebars</li>
					<li><code class="px-1 py-0.5 bg-blue rounded">mainClass="vh-16 mt-16"</code></li>
				</ul>
			</div>
		</Card>

		<Card color="info">
			<div class="column gap-3">
				<Icon icon={LayoutDashboardIcon} class="w-8 h-8" />
				<h4 class="font-semibold">Dashboard</h4>
				<ul class="text-sm space-y-1 list-disc list-inside">
					<li>AppBar at top (fixed)</li>
					<li>Left/right sidebars</li>
					<li>Responsive (hidden on mobile)</li>
					<li>
						<code class="px-1 py-0.5 bg-blue rounded"
							>startClass="invisible lg:visible lg:w-56"</code
						>
					</li>
					<li>Use Drawer for mobile nav</li>
				</ul>
			</div>
		</Card>

		<Card color="info">
			<div class="column gap-3">
				<Icon icon={SmartphoneIcon} class="w-8 h-8" />
				<h4 class="font-semibold">Mobile App</h4>
				<ul class="text-sm space-y-1 list-disc list-inside">
					<li>AppBar at top</li>
					<li>BottomNav for navigation</li>
					<li>No sidebars</li>
					<li><code class="px-1 py-0.5 bg-blue rounded">mainClass="mt-16 pb-16"</code></li>
				</ul>
			</div>
		</Card>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Key Concepts</p>
	<Card color="background" variant="outlined">
		<div class="column gap-4">
			<div>
				<h5 class="font-semibold mb-2">1. Body Class - AppBar Spacing</h5>
				<p class="text-sm mb-2">
					When using an AppBar, add top margin to <code>bodyClass</code> to prevent content from being
					hidden:
				</p>
				<ul class="text-sm list-disc list-inside">
					<li>If AppBar has <code>h-16</code>, use <code>bodyClass="mt-16"</code></li>
					<li>If AppBar has <code>h-20</code>, use <code>bodyClass="mt-20"</code></li>
				</ul>
			</div>

			<div>
				<h5 class="font-semibold mb-2">2. Start/End Class - Sidebar Width</h5>
				<p class="text-sm mb-2">
					Set the width of sidebars using <code>startClass</code> and <code>endClass</code>:
				</p>
				<ul class="text-sm list-disc list-inside">
					<li><code>startClass="w-56"</code> - Fixed width sidebar</li>
					<li><code>startClass="invisible lg:visible lg:w-56"</code> - Responsive sidebar</li>
				</ul>
			</div>

			<div>
				<h5 class="font-semibold mb-2">3. vh Utilities - Sidebar Height</h5>
				<p class="text-sm mb-2">
					Apply <code>vh-*</code> utilities to Sidebar components for proper height:
				</p>
				<ul class="text-sm list-disc list-inside">
					<li><code>vh-16</code> = <code>calc(100vh - 4rem)</code> - With AppBar h-16</li>
					<li><code>vh-32</code> = <code>calc(100vh - 8rem)</code> - With AppBar + BottomNav</li>
				</ul>
			</div>

			<div>
				<h5 class="font-semibold mb-2">4. Main Class - Content Styling</h5>
				<p class="text-sm mb-2">
					Use <code>mainClass</code> to style the main content area:
				</p>
				<ul class="text-sm list-disc list-inside">
					<li><code>mainClass="p-4"</code> - Add padding</li>
					<li><code>mainClass="lg:p-4 pb-16"</code> - Responsive padding with BottomNav space</li>
					<li><code>mainClass="vh-16 mt-16"</code> - Full height content (landing pages)</li>
				</ul>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Real-World Examples</p>
	<Card bodyClass="column gap-4" color="background" variant="outlined">
		<Code
			lang="svelte"
			code={`<!-- Landing Layout Example (src/routes/(landing)/+layout.svelte) -->
<Scaffold mainClass="vh-16 mt-16">
	{#snippet appBar()}
		<AppBar rootClass="bg-background h-16" isBoxed isSticky isBordered>
			{#snippet start()}
				<a href="/"><h4>UiSvelte</h4></a>
			{/snippet}
			{#snippet center()}
				<NavMenu items={menuItems} />
			{/snippet}
			{#snippet end()}
				<ToggleTheme />
			{/snippet}
		</AppBar>
	{/snippet}
	{@render children()}
	<Footer isBoxed isBordered>
		{#snippet start()}
			<p class="text-sm">© 2024 UiSvelte</p>
		{/snippet}
	</Footer>
</Scaffold>`}
		/>
		<Code
			lang="svelte"
			code={`<!-- Dashboard Layout Example (src/routes/docs/+layout.svelte) -->
<Scaffold
	mainClass="lg:p-4 pb-16"
	startClass="invisible lg:visible lg:w-56"
	bodyClass="bg-background mt-16"
	isBoxed
>
	{#snippet appBar()}
		<AppBar rootClass="bg-background h-16" isSticky isBoxed isBordered>
			{#snippet start()}
				<IconButton icon={MenuIcon} onclick={() => drawerOpen = true} class="lg:hidden" />
				<a href="/"><h4>UiSvelte</h4></a>
			{/snippet}
			{#snippet end()}
				<ToggleTheme />
			{/snippet}
		</AppBar>
	{/snippet}
	{#snippet start()}
		<Sidebar rootClass="pb-8 vh-16">
			<SideNav items={sideMenuItems} />
		</Sidebar>
	{/snippet}
	{@render children()}
	<Footer isBordered>
		{#snippet start()}
			<p class="text-sm">© 2024 UiSvelte</p>
		{/snippet}
	</Footer>
</Scaffold>

<!-- Mobile Drawer -->
<Drawer bind:open={drawerOpen}>
	<SideNav items={sideMenuItems} />
</Drawer>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
