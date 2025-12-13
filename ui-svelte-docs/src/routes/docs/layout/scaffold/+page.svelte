<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Select, Section } from 'ui-svelte';

	type ExampleType = 'landing' | 'dashboard' | 'mobile';
	let exampleType = $state<ExampleType>('landing');

	const exampleOptions = [
		{ id: 'landing', label: 'Landing Page' },
		{ id: 'dashboard', label: 'Dashboard Layout' },
		{ id: 'mobile', label: 'Mobile with BottomNav' }
	];

	const landingCode = `<script lang="ts">
\timport { Scaffold, AppBar, Footer, NavMenu } from 'ui-svelte';
\tlet { children } = $props();

\tconst navItems = [
\t\t{ label: 'Home', icon: 'fluent:home-24-regular', href: '/' },
\t\t{ label: 'Docs', icon: 'fluent:info-24-regular', href: '/docs' }
\t];
<\/script>

<Scaffold mainClass="vh-16 mt-16">
\t{#snippet appBar()}
\t\t<AppBar class="h-16" isBoxed isSticky>
\t\t\t{#snippet start()}
\t\t\t\t<h4>Brand</h4>
\t\t\t{/snippet}
\t\t\t{#snippet center()}
\t\t\t\t<NavMenu items={navItems} />
\t\t\t{/snippet}
\t\t\t{#snippet end()}
\t\t\t\t<ToggleTheme />
\t\t\t{/snippet}
\t\t</AppBar>
\t{/snippet}

\t<!-- Main content -->
\t{@render children()}

\t{#snippet footer()}
\t\t<Footer isBoxed>
\t\t\t{#snippet start()}
\t\t\t\t<p class="text-sm text-muted-foreground">© 2024 Company</p>
\t\t\t{/snippet}
\t\t</Footer>
\t{/snippet}
</Scaffold>`;

	const dashboardCode = `<script lang="ts">
\timport { Scaffold, AppBar, Sidebar, SideNav, Footer } from 'ui-svelte';
\tlet { children } = $props();

\tconst navItems = [
\t\t{ label: 'Dashboard', icon: 'fluent:home-24-regular', href: '/dashboard' },
\t\t{ label: 'Projects', icon: 'fluent:folder-24-regular', href: '/projects' },
\t\t{ label: 'Settings', icon: 'fluent:settings-24-regular', href: '/settings' }
\t];
<\/script>

<Scaffold
\tmainClass="lg:p-4 pb-16"
\tstartClass="invisible lg:visible lg:w-56"
\tendClass="invisible lg:visible lg:w-56"
\tbodyClass="bg-background mt-16"
\tisBoxed
>
\t{#snippet appBar()}
\t\t<AppBar class="h-16" isSticky isBoxed>
\t\t\t{#snippet start()}
\t\t\t\t<IconButton
\t\t\t\t\ticon="fluent:navigation-24-regular"
\t\t\t\t\tonclick={() => drawerOpen = true}
\t\t\t\t\tclass="lg:hidden"
\t\t\t\t/>
\t\t\t\t<h4>Dashboard</h4>
\t\t\t{/snippet}
\t\t\t{#snippet end()}
\t\t\t\t<ToggleTheme />
\t\t\t{/snippet}
\t\t</AppBar>
\t{/snippet}

\t{#snippet start()}
\t\t<Sidebar class="pb-8 vh-16">
\t\t\t{#snippet header()}
\t\t\t\t<h3 class="text-lg font-semibold">Navigation</h3>
\t\t\t{/snippet}
\t\t\t<SideNav items={navItems} />
\t\t</Sidebar>
\t{/snippet}

\t<!-- Main content -->
\t{@render children()}

\t{#snippet end()}
\t\t<Sidebar class="pb-8 vh-16">
\t\t\t<h4 class="font-semibold mb-4">Activity</h4>
\t\t\t<!-- Right sidebar content -->
\t\t</Sidebar>
\t{/snippet}

\t{#snippet footer()}
\t\t<Footer isBordered>
\t\t\t{#snippet start()}
\t\t\t\t<p class="text-sm text-muted-foreground">© 2024 Company</p>
\t\t\t{/snippet}
\t\t</Footer>
\t{/snippet}
</Scaffold>`;

	const mobileCode = `<script lang="ts">
\timport { Scaffold, AppBar, BottomNav } from 'ui-svelte';
\tlet { children } = $props();

\tconst bottomNavItems = [
\t\t{ id: 'home', label: 'Home', icon: 'fluent:home-24-regular', href: '/' },
\t\t{ id: 'search', label: 'Search', icon: 'fluent:search-24-regular', href: '/search' },
\t\t{ id: 'favorites', label: 'Favorites', icon: 'fluent:heart-24-regular', href: '/favorites' },
\t\t{ id: 'profile', label: 'Profile', icon: 'fluent:person-24-regular', href: '/profile' }
\t];
<\/script>

<Scaffold mainClass="mt-16 pb-16" bodyClass="mt-16">
\t{#snippet appBar()}
\t\t<AppBar class="h-16">
\t\t\t{#snippet center()}
\t\t\t\t<h4>Mobile App</h4>
\t\t\t{/snippet}
\t\t</AppBar>
\t{/snippet}

\t<!-- Main content -->
\t{@render children()}

\t{#snippet bottomBar()}
\t\t<BottomNav items={bottomNavItems} />
\t{/snippet}
</Scaffold>`;

	const props = [
		{ prop: 'children', type: 'Snippet', initial: '', required: true },
		{ prop: 'appBar', type: 'Snippet', initial: '' },
		{ prop: 'start', type: 'Snippet', initial: '' },
		{ prop: 'end', type: 'Snippet', initial: '' },
		{ prop: 'bottomBar', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' },
		{ prop: 'bodyClass', type: 'string', initial: '' },
		{ prop: 'mainClass', type: 'string', initial: '' },
		{ prop: 'startClass', type: 'string', initial: '' },
		{ prop: 'endClass', type: 'string', initial: '' },
		{ prop: 'isBoxed', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet landingPreview()}
	<div class="w-full h-[500px] border border-border rounded-lg overflow-hidden bg-background">
		<!-- Simulated AppBar -->
		<div class="h-16 bg-surface border-b border-border flex items-center justify-between px-4">
			<div class="font-semibold">Brand</div>
			<div class="flex gap-4 text-sm">
				<span>Home</span>
				<span>Docs</span>
			</div>
			<div class="w-8 h-8 bg-muted rounded"></div>
		</div>

		<!-- Main Content -->
		<div class="h-[calc(100%-8rem)] overflow-auto p-8">
			<div class="max-w-4xl mx-auto space-y-6">
				<div class="h-32 bg-primary/10 rounded flex items-center justify-center">
					<p class="text-sm text-muted-foreground">Hero Section</p>
				</div>
				<div class="h-48 bg-secondary/10 rounded flex items-center justify-center">
					<p class="text-sm text-muted-foreground">Features Section</p>
				</div>
				<div class="h-32 bg-muted/30 rounded flex items-center justify-center">
					<p class="text-sm text-muted-foreground">CTA Section</p>
				</div>
			</div>
		</div>

		<!-- Simulated Footer -->
		<div class="h-16 bg-surface border-t border-border flex items-center justify-center px-4">
			<p class="text-xs text-muted-foreground">© 2024 Company</p>
		</div>
	</div>
{/snippet}

{#snippet dashboardPreview()}
	<div
		class="w-full h-[500px] border border-border rounded-lg overflow-hidden bg-background flex flex-col"
	>
		<!-- Simulated AppBar -->
		<div
			class="h-16 bg-surface border-b border-border flex items-center justify-between px-4 shrink-0"
		>
			<div class="flex items-center gap-2">
				<div class="w-6 h-6 bg-muted rounded lg:hidden"></div>
				<div class="font-semibold">Dashboard</div>
			</div>
			<div class="w-8 h-8 bg-muted rounded"></div>
		</div>

		<!-- Body with sidebars -->
		<div class="flex-1 flex overflow-hidden">
			<!-- Start Sidebar -->
			<div class="hidden lg:block w-56 bg-surface border-r border-border overflow-auto">
				<div class="p-4 space-y-2">
					<div class="font-semibold mb-4">Navigation</div>
					<div class="h-8 bg-primary/20 rounded px-3 flex items-center text-xs">Dashboard</div>
					<div class="h-8 bg-muted/30 rounded px-3 flex items-center text-xs">Projects</div>
					<div class="h-8 bg-muted/30 rounded px-3 flex items-center text-xs">Settings</div>
				</div>
			</div>

			<!-- Main Content -->
			<div class="flex-1 overflow-auto p-4">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="h-32 bg-primary/10 rounded flex items-center justify-center">
						<p class="text-sm text-muted-foreground">Card 1</p>
					</div>
					<div class="h-32 bg-secondary/10 rounded flex items-center justify-center">
						<p class="text-sm text-muted-foreground">Card 2</p>
					</div>
					<div class="h-32 bg-muted/30 rounded flex items-center justify-center">
						<p class="text-sm text-muted-foreground">Card 3</p>
					</div>
					<div class="h-32 bg-info/10 rounded flex items-center justify-center">
						<p class="text-sm text-muted-foreground">Card 4</p>
					</div>
				</div>
			</div>

			<!-- End Sidebar -->
			<div class="hidden lg:block w-56 bg-surface border-l border-border overflow-auto">
				<div class="p-4">
					<div class="font-semibold mb-4">Activity</div>
					<div class="space-y-3">
						<div class="h-12 bg-muted/30 rounded"></div>
						<div class="h-12 bg-muted/30 rounded"></div>
						<div class="h-12 bg-muted/30 rounded"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- Simulated Footer -->
		<div
			class="h-12 bg-surface border-t border-border flex items-center justify-center px-4 shrink-0"
		>
			<p class="text-xs text-muted-foreground">© 2024 Company</p>
		</div>
	</div>
{/snippet}

{#snippet mobilePreview()}
	<div
		class="w-full h-[500px] border border-border rounded-lg overflow-hidden bg-background flex flex-col"
	>
		<!-- Simulated AppBar -->
		<div
			class="h-16 bg-surface border-b border-border flex items-center justify-center px-4 shrink-0"
		>
			<div class="font-semibold">Mobile App</div>
		</div>

		<!-- Main Content -->
		<div class="flex-1 overflow-auto p-4">
			<div class="space-y-4">
				<div class="h-48 bg-primary/10 rounded flex items-center justify-center">
					<p class="text-sm text-muted-foreground">Content Card 1</p>
				</div>
				<div class="h-48 bg-secondary/10 rounded flex items-center justify-center">
					<p class="text-sm text-muted-foreground">Content Card 2</p>
				</div>
				<div class="h-48 bg-muted/30 rounded flex items-center justify-center">
					<p class="text-sm text-muted-foreground">Content Card 3</p>
				</div>
			</div>
		</div>

		<!-- Simulated BottomNav -->
		<div
			class="h-16 bg-surface border-t border-border flex items-center justify-around px-4 shrink-0"
		>
			<div class="flex flex-col items-center gap-1">
				<div class="w-6 h-6 bg-primary rounded"></div>
				<span class="text-xs">Home</span>
			</div>
			<div class="flex flex-col items-center gap-1">
				<div class="w-6 h-6 bg-muted rounded"></div>
				<span class="text-xs text-muted-foreground">Search</span>
			</div>
			<div class="flex flex-col items-center gap-1">
				<div class="w-6 h-6 bg-muted rounded"></div>
				<span class="text-xs text-muted-foreground">Favorites</span>
			</div>
			<div class="flex flex-col items-center gap-1">
				<div class="w-6 h-6 bg-muted rounded"></div>
				<span class="text-xs text-muted-foreground">Profile</span>
			</div>
		</div>
	</div>
{/snippet}

{#snippet builder()}
	<Select label="Layout Example" size="sm" options={exampleOptions} bind:value={exampleType} />
{/snippet}

<DocHeader title="Scaffold">
	Scaffold is a comprehensive layout component that provides the foundation for your application. It
	manages the positioning and coordination of AppBar, Sidebar, Footer, and BottomNav components to
	create professional, responsive layouts.
</DocHeader>

<DocPreview {builder}>
	{#if exampleType === 'landing'}
		{@render landingPreview()}
	{:else if exampleType === 'dashboard'}
		{@render dashboardPreview()}
	{:else if exampleType === 'mobile'}
		{@render mobilePreview()}
	{/if}
</DocPreview>

<DocCode
	code={exampleType === 'landing'
		? landingCode
		: exampleType === 'dashboard'
			? dashboardCode
			: mobileCode}
/>

<DocProps {props} />

<Section class="prose mt-8">
	<h2>Layout System Overview</h2>

	<h3>How Scaffold Works</h3>
	<p>
		The Scaffold component uses <code>fixed</code> positioning for AppBar, Sidebar (start/end), BottomNav,
		and Footer components. This creates a stable layout where:
	</p>
	<ul>
		<li>AppBar stays fixed at the top</li>
		<li>Sidebars stay fixed on the left/right</li>
		<li>BottomNav stays fixed at the bottom (mobile)</li>
		<li>Footer stays at the bottom of the page</li>
		<li>Main content scrolls independently</li>
	</ul>

	<h3>Key Concepts</h3>

	<h4>1. Body Class - AppBar Spacing</h4>
	<p>
		When using an AppBar, add top margin to <code>bodyClass</code> to prevent content from being hidden
		under the fixed AppBar:
	</p>
	<ul>
		<li>
			If AppBar has <code>h-16</code>, use <code>bodyClass="mt-16"</code>
		</li>
		<li>
			If AppBar has <code>h-20</code>, use <code>bodyClass="mt-20"</code>
		</li>
	</ul>

	<h4>2. Start/End Class - Sidebar Width</h4>
	<p>
		Set the width of sidebars using <code>startClass</code> and <code>endClass</code>. The Scaffold
		automatically handles the fixed positioning:
	</p>
	<ul>
		<li>
			<code>startClass="w-56"</code> - Left sidebar with 56 width units
		</li>
		<li>
			<code>startClass="invisible lg:visible lg:w-56"</code> - Responsive sidebar (hidden on mobile)
		</li>
	</ul>

	<h4>3. vh Utilities - Sidebar Height</h4>
	<p>
		Apply <code>vh-*</code> utilities directly to the Sidebar component (not to startClass/endClass) to
		ensure proper height calculation:
	</p>
	<ul>
		<li>
			<code>vh-16</code> = <code>calc(100vh - 4rem)</code> - Use with AppBar h-16
		</li>
		<li>
			<code>vh-32</code> = <code>calc(100vh - 8rem)</code> - Use with AppBar + BottomNav (both h-16)
		</li>
	</ul>

	<h4>4. Main Class - Content Styling</h4>
	<p>
		Use <code>mainClass</code> to style the main content area:
	</p>
	<ul>
		<li>
			<code>mainClass="p-4"</code> - Add padding
		</li>
		<li>
			<code>mainClass="lg:p-4 pb-16"</code> - Responsive padding with bottom space for BottomNav
		</li>
		<li>
			<code>mainClass="vh-16 mt-16"</code> - Full height content (landing pages)
		</li>
	</ul>

	<h3>Common Patterns</h3>

	<h4>Landing Page</h4>
	<ul>
		<li>AppBar at top</li>
		<li>Full-width content</li>
		<li>Optional Footer at bottom</li>
		<li>No sidebars</li>
	</ul>

	<h4>Dashboard</h4>
	<ul>
		<li>AppBar at top</li>
		<li>Left sidebar for navigation</li>
		<li>Optional right sidebar for activity/info</li>
		<li>Responsive (sidebars hidden on mobile)</li>
		<li>Optional Footer</li>
	</ul>

	<h4>Mobile App</h4>
	<ul>
		<li>AppBar at top</li>
		<li>BottomNav for primary navigation</li>
		<li>Full-width content</li>
		<li>No sidebars</li>
	</ul>

	<h3>Integration with Components</h3>

	<h4>AppBar</h4>
	<p>
		Use the <code>appBar</code> snippet to add a fixed header. The AppBar component provides start, center,
		and end sections for flexible layouts.
	</p>

	<h4>Sidebar</h4>
	<p>
		Use <code>start</code> and <code>end</code> snippets for left and right sidebars. Sidebars support
		header and footer sections for additional structure.
	</p>

	<h4>Footer</h4>
	<p>
		Use the <code>footer</code> snippet to add a footer at the bottom of the page. The Footer component
		supports start, center, and end sections.
	</p>

	<h4>BottomNav</h4>
	<p>
		Use the <code>bottomBar</code> snippet for mobile-style bottom navigation. Perfect for mobile apps
		and responsive layouts.
	</p>

	<h3>Responsive Design</h3>
	<p>Use Tailwind's responsive prefixes to create adaptive layouts:</p>
	<ul>
		<li>
			<code>startClass="invisible lg:visible lg:w-56"</code> - Show sidebar only on large screens
		</li>
		<li>
			<code>mainClass="lg:p-4 pb-16"</code> - Different padding on desktop vs mobile
		</li>
		<li>Combine with Drawer component for mobile sidebar navigation</li>
	</ul>

	<h3>Available vh Utilities</h3>
	<div class="grid grid-cols-2 md:grid-cols-3 gap-2 not-prose">
		<div class="p-2 bg-surface rounded text-sm">
			<code>vh-8</code>
			<span class="text-xs text-muted-foreground block">calc(100vh - 2rem)</span>
		</div>
		<div class="p-2 bg-surface rounded text-sm">
			<code>vh-10</code>
			<span class="text-xs text-muted-foreground block">calc(100vh - 2.5rem)</span>
		</div>
		<div class="p-2 bg-surface rounded text-sm">
			<code>vh-12</code>
			<span class="text-xs text-muted-foreground block">calc(100vh - 3rem)</span>
		</div>
		<div class="p-2 bg-surface rounded text-sm">
			<code>vh-14</code>
			<span class="text-xs text-muted-foreground block">calc(100vh - 3.5rem)</span>
		</div>
		<div class="p-2 bg-surface rounded text-sm">
			<code>vh-16</code>
			<span class="text-xs text-muted-foreground block">calc(100vh - 4rem)</span>
		</div>
		<div class="p-2 bg-surface rounded text-sm">
			<code>vh-20</code>
			<span class="text-xs text-muted-foreground block">calc(100vh - 5rem)</span>
		</div>
		<div class="p-2 bg-surface rounded text-sm">
			<code>vh-24</code>
			<span class="text-xs text-muted-foreground block">calc(100vh - 6rem)</span>
		</div>
		<div class="p-2 bg-surface rounded text-sm">
			<code>vh-32</code>
			<span class="text-xs text-muted-foreground block">calc(100vh - 8rem)</span>
		</div>
		<div class="p-2 bg-surface rounded text-sm">
			<code>vh-40</code>
			<span class="text-xs text-muted-foreground block">calc(100vh - 10rem)</span>
		</div>
	</div>

	<h3>Best Practices</h3>
	<ul>
		<li>
			<strong>Don't</strong> add margin classes to <code>mainClass</code> for sidebars - Scaffold handles
			this automatically
		</li>
		<li>
			<strong>Do</strong> use <code>bodyClass</code> for AppBar spacing
		</li>
		<li>
			<strong>Do</strong> apply <code>vh-*</code> utilities to Sidebar components, not to startClass/endClass
		</li>
		<li>
			<strong>Do</strong> use responsive classes for mobile-friendly layouts
		</li>
		<li>
			<strong>Do</strong> combine with Drawer for mobile sidebar navigation
		</li>
	</ul>
</Section>
