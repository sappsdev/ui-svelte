<script lang="ts">
	import { Button, Card, Checkbox, Code, Drawer, Section, Select, Slider } from 'ui-svelte';

	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const variantOptions = [
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const positionOptions = [
		{ id: 'start', label: 'Start (Left)' },
		{ id: 'end', label: 'End (Right)' },
		{ id: 'top', label: 'Top' },
		{ id: 'bottom', label: 'Bottom' }
	];

	// Selects
	let variant: any = $state('ghost');
	let position: any = $state('start');

	// States
	let open = $state(false);
	let hasHeader = $state(true);
	let hasFooter = $state(true);
	let hideCloseButton = $state(false);
	let disableOverlayClose = $state(false);
	let isSolid = $state(false);

	// Drawer states for examples
	let openMenu = $state(false);
	let openFilters = $state(false);
	let openNotifications = $state(false);

	// Filter example states
	let filterCategory: any = $state('all');
	let filterPrice = $state(50);

	const categoryOptions = [
		{ id: 'all', label: 'All' },
		{ id: 'electronics', label: 'Electronics' },
		{ id: 'clothing', label: 'Clothing' },
		{ id: 'home', label: 'Home & Garden' }
	];

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Drawer, Button } from 'ui-svelte';`,
			`\n\tlet open = $state(false);`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`<Button onclick={() => open = true}>Open Drawer</Button>`,
			``,
			`<Drawer`,
			`\tbind:open`,
			position !== 'start' && `\tposition="${position}"`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			isSolid && `\tisSolid`,
			hideCloseButton && `\thideCloseButton`,
			disableOverlayClose && `\tdisableOverlayClose`,
			`>`,
			hasHeader && `\t{#snippet header()}`,
			hasHeader && `\t\t<h4>Drawer Header</h4>`,
			hasHeader && `\t{/snippet}`,
			`\t<p>Drawer content goes here.</p>`,
			hasFooter && `\t{#snippet footer()}`,
			hasFooter && `\t\t<Button onclick={() => open = false}>Close</Button>`,
			hasFooter && `\t{/snippet}`,
			`</Drawer>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'open', type: 'boolean', initial: 'false' },
		{ prop: 'children', type: 'Snippet', initial: '' },
		{ prop: 'header', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' },
		{ prop: 'onclose', type: '() => void', initial: '' },
		{
			prop: 'position',
			type: 'start | end | top | bottom',
			initial: 'start'
		},
		{
			prop: 'variant',
			type: 'ghost | surface | primary | secondary | muted',
			initial: 'ghost'
		},
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'bodyClass', type: 'string', initial: '' },
		{ prop: 'footerClass', type: 'string', initial: '' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{ prop: 'hideCloseButton', type: 'boolean', initial: 'false' },
		{ prop: 'disableOverlayClose', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet header()}
	<h4>Drawer Header</h4>
{/snippet}

{#snippet footer()}
	<div class="row gap-2 justify-end">
		<Button size="sm" variant="ghost" onclick={() => (open = false)}>Cancel</Button>
		<Button size="sm" onclick={() => (open = false)}>Confirm</Button>
	</div>
{/snippet}

<DocsHeader title="Drawer" llmUrl="https://ui-svelte.sappsdev.com/llm/overlay/drawer.md">
	Drawers are sliding panel overlays that appear from the edge of the screen. They are commonly used
	for navigation menus, filters, or additional content that doesn't require full focus.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<Button onclick={() => (open = true)}>Open Drawer</Button>
		<Drawer
			bind:open
			{position}
			{variant}
			header={hasHeader ? header : undefined}
			footer={hasFooter ? footer : undefined}
			{hideCloseButton}
			{disableOverlayClose}
			{isSolid}
		>
			<p>This is the drawer body content. You can add any content here.</p>
		</Drawer>
	</DocsPreview>
	<Card>
		<Select label="Position" size="sm" options={positionOptions} bind:value={position} />
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={hasHeader} label="Header" />
			<Checkbox bind:checked={hasFooter} label="Footer" />
			<Checkbox bind:checked={isSolid} label="Solid" />
			<Checkbox bind:checked={hideCloseButton} label="Hide Close" />
			<Checkbox bind:checked={disableOverlayClose} label="Disable Overlay Close" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section bodyClass="grid-2 md:grid-4">
	<!-- Position Start -->
	<Card>
		{#snippet header()}
			<h4>Start (Left)</h4>
		{/snippet}
		<p class="text-sm">Default position, slides in from the left edge.</p>
		<Button size="sm" onclick={() => (openMenu = true)}>Open Menu</Button>
		<Drawer bind:open={openMenu} position="start" variant="surface" class="min-w-sm">
			{#snippet header()}
				<h4>Navigation Menu</h4>
			{/snippet}
			<nav class="column gap-2">
				<a href="#" class="p-2 hover:bg-muted-100 rounded">Home</a>
				<a href="#" class="p-2 hover:bg-muted-100 rounded">Products</a>
				<a href="#" class="p-2 hover:bg-muted-100 rounded">About</a>
				<a href="#" class="p-2 hover:bg-muted-100 rounded">Contact</a>
			</nav>
		</Drawer>
		{#snippet footer()}
			<code class="text-xs">position="start"</code>
		{/snippet}
	</Card>

	<!-- Position End -->
	<Card>
		{#snippet header()}
			<h4>End (Right)</h4>
		{/snippet}
		<p class="text-sm">Slides in from the right edge, ideal for filters or cart.</p>
		<Button size="sm" onclick={() => (openFilters = true)}>Open Filters</Button>
		<Drawer bind:open={openFilters} position="end" variant="ghost" class="min-w-sm">
			{#snippet header()}
				<h4>Filters</h4>
			{/snippet}
			<div class="column gap-4">
				<Select label="Category" bind:value={filterCategory} options={categoryOptions} />
				<Slider label="Price Range" bind:value={filterPrice} min={0} max={100} />
			</div>
			{#snippet footer()}
				<div class="row gap-2">
					<Button size="sm" variant="ghost" onclick={() => (openFilters = false)}>Reset</Button>
					<Button size="sm" variant="primary" onclick={() => (openFilters = false)}>Apply</Button>
				</div>
			{/snippet}
		</Drawer>
		{#snippet footer()}
			<code class="text-xs">position="end"</code>
		{/snippet}
	</Card>

	<!-- Position Top -->
	<Card>
		{#snippet header()}
			<h4>Top</h4>
		{/snippet}
		<p class="text-sm">Slides down from the top, good for notifications or alerts.</p>
		<Button size="sm" onclick={() => (openNotifications = true)}>Open Notifications</Button>
		<Drawer bind:open={openNotifications} position="top" variant="muted">
			{#snippet header()}
				<h4>Notifications</h4>
			{/snippet}
			<div class="column gap-2">
				<div class="p-2 bg-surface rounded">New message from John</div>
				<div class="p-2 bg-surface rounded">Your order has shipped</div>
				<div class="p-2 bg-surface rounded">Reminder: Meeting at 3pm</div>
			</div>
		</Drawer>
		{#snippet footer()}
			<code class="text-xs">position="top"</code>
		{/snippet}
	</Card>

	<!-- Position Bottom -->
	<Card>
		{#snippet header()}
			<h4>Bottom</h4>
		{/snippet}
		<p class="text-sm">Slides up from the bottom, common on mobile devices.</p>
		{#snippet footer()}
			<code class="text-xs">position="bottom"</code>
		{/snippet}
	</Card>
</Section>

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Navigation:</strong> The drawer automatically closes when navigating to a new page using
					SvelteKit's navigation
				</li>
				<li>
					<strong>Position:</strong> Use <code class="px-1 py-0.5 bg-blue rounded">start</code> for
					navigation menus and <code class="px-1 py-0.5 bg-blue rounded">end</code> for carts or filters
				</li>
				<li>
					<strong>Mobile:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">position="bottom"</code> for mobile-friendly action
					sheets
				</li>
				<li>
					<strong>Overlay Close:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">disableOverlayClose</code> to prevent closing by clicking
					outside
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<!-- Basic Drawer -->
<script lang="ts">
	import { Button, Drawer } from 'ui-svelte';
	let open = $state(false);
<\/script>

<Button onclick={() => open = true}>Open Drawer</Button>

<Drawer bind:open>
	{#snippet header()}
		<h4>Drawer Title</h4>
	{/snippet}
	<p>Drawer content goes here.</p>
	{#snippet footer()}
		<Button onclick={() => open = false}>Close</Button>
	{/snippet}
</Drawer>

<!-- Navigation Drawer -->
<script lang="ts">
	let openNav = $state(false);
<\/script>

<Drawer bind:open={openNav} position="start" variant="surface">
	{#snippet header()}
		<h4>Menu</h4>
	{/snippet}
	<nav class="column gap-2">
		<a href="/">Home</a>
		<a href="/products">Products</a>
		<a href="/about">About</a>
	</nav>
</Drawer>

<!-- Filter Drawer (Right Side) -->
<script lang="ts">
	let openFilters = $state(false);
<\/script>

<Drawer bind:open={openFilters} position="end">
	{#snippet header()}
		<h4>Filters</h4>
	{/snippet}
	<div class="column gap-4">
		<!-- Filter controls -->
	</div>
	{#snippet footer()}
		<div class="row gap-2">
			<Button variant="ghost" onclick={() => openFilters = false}>Reset</Button>
			<Button variant="primary" onclick={applyFilters}>Apply</Button>
		</div>
	{/snippet}
</Drawer>

<!-- Bottom Sheet (Mobile) -->
<script lang="ts">
	let openSheet = $state(false);
<\/script>

<Drawer bind:open={openSheet} position="bottom">
	{#snippet header()}
		<h4>Select Action</h4>
	{/snippet}
	<div class="column gap-2">
		<Button variant="ghost" class="w-full">Share</Button>
		<Button variant="ghost" class="w-full">Download</Button>
		<Button variant="ghost" class="w-full">Delete</Button>
	</div>
</Drawer>`}
		/>
	</Card>
</Section>

<DocsProps {props} />
