<script lang="ts">
	import { Card, Checkbox, Code, Section, Select, BottomNav } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';
	import {
		LayoutDashboardIcon,
		Search24RegularIcon,
		Heart24RegularIcon,
		Person24RegularIcon,
		SparkleAction24RegularIcon
	} from '$lib/icons';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'line', label: 'Line' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'Small' },
		{ id: 'md', label: 'Medium' },
		{ id: 'lg', label: 'Large' }
	];

	let variant: any = $state('primary');
	let size: any = $state('md');
	let isSolid = $state(false);
	let showLabels = $state(true);

	let hasProps = $derived(
		[variant !== 'primary', size !== 'md', isSolid, !showLabels].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { BottomNav } from 'ui-svelte';`,
			`\timport { HomeIcon, SearchIcon, HeartIcon, PersonIcon } from '$lib/icons';`,
			`\n\tconst items = [`,
			showLabels && `\t\t{ id: 'home', label: 'Home', icon: HomeIcon, href: '/' },`,
			showLabels && `\t\t{ id: 'search', label: 'Search', icon: SearchIcon, href: '/search' },`,
			showLabels &&
				`\t\t{ id: 'favorites', label: 'Favorites', icon: HeartIcon, href: '/favorites' },`,
			showLabels && `\t\t{ id: 'profile', label: 'Profile', icon: PersonIcon, href: '/profile' }`,
			!showLabels && `\t\t{ id: 'home', icon: HomeIcon, href: '/' },`,
			!showLabels && `\t\t{ id: 'search', icon: SearchIcon, href: '/search' },`,
			!showLabels && `\t\t{ id: 'favorites', icon: HeartIcon, href: '/favorites' },`,
			!showLabels && `\t\t{ id: 'profile', icon: PersonIcon, href: '/profile' }`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLine = hasProps
			? `\n<BottomNav ${[
					'{items}',
					variant !== 'primary' && `variant="${variant}"`,
					size !== 'md' && `size="${size}"`,
					isSolid && 'isSolid'
				]
					.filter(Boolean)
					.join(' ')} />`
			: '\n<BottomNav {items} />';

		return [...scriptLines, componentLine].join('\n');
	});

	const props = [
		{ prop: 'items', type: 'BottomNavItem[]', initial: '[]', required: true },
		{ prop: 'variant', type: 'primary | secondary | ghost | line', initial: 'primary' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{ prop: 'isBlock', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	const itemProps = [
		{ prop: 'id', type: 'string', initial: '', required: true },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconData', initial: '', required: true },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(item: BottomNavItem) => void', initial: '' },
		{ prop: 'badge', type: 'string | number', initial: '' },
		{ prop: 'isFab', type: 'boolean', initial: 'false' },
		{ prop: 'isActive', type: 'boolean', initial: '' }
	];

	const navItemsWithLabels = [
		{ id: 'home', label: 'Home', icon: LayoutDashboardIcon, href: '#home', isActive: true },
		{ id: 'search', label: 'Search', icon: Search24RegularIcon, href: '#search' },
		{ id: 'favorites', label: 'Favorites', icon: Heart24RegularIcon, href: '#favorites' },
		{ id: 'profile', label: 'Profile', icon: Person24RegularIcon, href: '#profile' }
	];

	const navItemsIconOnly = [
		{ id: 'home', icon: LayoutDashboardIcon, href: '#home', isActive: true },
		{ id: 'search', icon: Search24RegularIcon, href: '#search' },
		{ id: 'favorites', icon: Heart24RegularIcon, href: '#favorites' },
		{ id: 'profile', icon: Person24RegularIcon, href: '#profile' }
	];

	const navItemsWithBadge = [
		{ id: 'home', label: 'Home', icon: LayoutDashboardIcon, href: '#home', isActive: true },
		{ id: 'search', label: 'Search', icon: Search24RegularIcon, href: '#search' },
		{ id: 'favorites', label: 'Favorites', icon: Heart24RegularIcon, href: '#favorites', badge: 3 },
		{ id: 'profile', label: 'Profile', icon: Person24RegularIcon, href: '#profile' }
	];

	const navItemsWithFab = [
		{ id: 'home', label: 'Home', icon: LayoutDashboardIcon, href: '#home', isActive: true },
		{ id: 'search', label: 'Search', icon: Search24RegularIcon, href: '#search' },
		{ id: 'add', icon: SparkleAction24RegularIcon, isFab: true, href: '#add' },
		{ id: 'favorites', label: 'Favorites', icon: Heart24RegularIcon, href: '#favorites' },
		{ id: 'profile', label: 'Profile', icon: Person24RegularIcon, href: '#profile' }
	];

	let navItems = $derived(showLabels ? navItemsWithLabels : navItemsIconOnly);
</script>

<DocsHeader title="Bottom Nav" llmUrl="https://ui-svelte.sappsdev.com/llm/navigation/bottom-nav.md">
	A mobile-friendly bottom navigation bar for navigating between primary destinations in an app.
</DocsHeader>

{#snippet preview()}
	<BottomNav items={navItems} {variant} {size} {isSolid} isBlock />
{/snippet}

<Section bodyClass="md:grid-3">
	<DocsPreview>
		{@render preview()}
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={isSolid} label="Solid" />
			<Checkbox bind:checked={showLabels} label="Labels" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="grid-1 md:grid-2 center">
		{#snippet header()}
			<h4>Variants</h4>
		{/snippet}
		{#each variantOptions as item}
			<div class="column gap-1 w-full">
				<p class="text-xs center">{item.label}</p>
				<BottomNav items={navItemsWithLabels} variant={item.id as any} isBlock />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-1 md:grid-2 center">
		{#snippet header()}
			<h4>Variants with Solid</h4>
		{/snippet}
		{#each variantOptions as item}
			<div class="column gap-1 w-full">
				<p class="text-xs center">{item.label}</p>
				<BottomNav items={navItemsWithLabels} variant={item.id as any} isSolid isBlock />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-1 md:grid-2 center">
		{#snippet header()}
			<h4>Special Features</h4>
		{/snippet}
		<div class="column gap-1 w-full">
			<p class="text-xs center">With Badge</p>
			<BottomNav items={navItemsWithBadge} isBlock />
		</div>
		<div class="column gap-1 w-full">
			<p class="text-xs center">With FAB (Floating Action Button)</p>
			<BottomNav items={navItemsWithFab} isBlock />
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-1 md:grid-2 center">
		{#snippet header()}
			<h4>Sizes</h4>
		{/snippet}
		{#each sizeOptions as item}
			<div class="column gap-1 w-full">
				<p class="text-xs center">{item.label}</p>
				<BottomNav items={navItemsWithLabels} size={item.id as any} isBlock />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<!-- Basic Bottom Navigation -->
<script lang="ts">
	import { BottomNav } from 'ui-svelte';
	import { HomeIcon, SearchIcon, HeartIcon, PersonIcon } from '$lib/icons';

	const items = [
		{ id: 'home', label: 'Home', icon: HomeIcon, href: '/' },
		{ id: 'search', label: 'Search', icon: SearchIcon, href: '/search' },
		{ id: 'favorites', label: 'Favorites', icon: HeartIcon, href: '/favorites' },
		{ id: 'profile', label: 'Profile', icon: PersonIcon, href: '/profile' }
	];
<\/script>

<BottomNav {items} />

<!-- Secondary Variant -->
<BottomNav {items} variant="secondary" />

<!-- Ghost Variant -->
<BottomNav {items} variant="ghost" />

<!-- Line Variant (with underline indicator) -->
<BottomNav {items} variant="line" />

<!-- With Solid Background on Active -->
<BottomNav {items} isSolid />
<BottomNav {items} variant="secondary" isSolid />

<!-- With Badge Notifications -->
<script lang="ts">
	const itemsWithBadge = [
		{ id: 'home', label: 'Home', icon: HomeIcon, href: '/' },
		{ id: 'cart', label: 'Cart', icon: CartIcon, href: '/cart', badge: 3 },
		{ id: 'profile', label: 'Profile', icon: PersonIcon, href: '/profile' }
	];
<\/script>

<BottomNav items={itemsWithBadge} />

<!-- With FAB (Floating Action Button) -->
<script lang="ts">
	const itemsWithFab = [
		{ id: 'home', label: 'Home', icon: HomeIcon, href: '/' },
		{ id: 'search', label: 'Search', icon: SearchIcon, href: '/search' },
		{ id: 'add', icon: AddIcon, isFab: true, onclick: () => openModal() },
		{ id: 'favorites', label: 'Favorites', icon: HeartIcon, href: '/favorites' },
		{ id: 'profile', label: 'Profile', icon: PersonIcon, href: '/profile' }
	];
<\/script>

<BottomNav items={itemsWithFab} />`}
		/>
	</Card>
</Section>

<DocsProps {props} />

<Section>
	<Card>
		{#snippet header()}
			<h4>BottomNavItem Type</h4>
		{/snippet}
		<p class="text-sm">Each item in the items array should follow this structure:</p>
		<DocsProps props={itemProps} />
	</Card>
</Section>
