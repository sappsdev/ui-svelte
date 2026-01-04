<script lang="ts">
	import { SideNav, Card, Checkbox, Code, Section, Select, type SideNavItem } from 'ui-svelte';
	import {
		HomeLinearIcon,
		DocumentLinearIcon,
		SettingsLinearIcon,
		UserCircleLinearIcon,
		ChartLinearIcon,
		FolderLinearIcon
	} from '$lib/icons';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'ghost', label: 'Ghost' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	let color: any = $state('muted');
	let variant: any = $state('ghost');
	let size: any = $state('md');

	let isWide = $state(false);
	let isCollapsible = $state(false);

	const sampleItems: SideNavItem[] = [
		{ type: 'header', label: 'Menu', icon: HomeLinearIcon },
		{ type: 'divider' },
		{ label: 'Home', href: '#home', icon: HomeLinearIcon },
		{
			label: 'Documents',
			href: '#documents',
			icon: DocumentLinearIcon,
			description: 'Manage files'
		},
		{
			type: 'submenu',
			label: 'Analytics',
			icon: ChartLinearIcon,
			open: true,
			subitems: [
				{ label: 'Overview', href: '#overview' },
				{ label: 'Reports', href: '#reports' },
				{ label: 'Statistics', href: '#statistics', status: 'New' }
			]
		},
		{
			type: 'submenu',
			label: 'Projects',
			icon: FolderLinearIcon,
			subitems: [
				{ label: 'Active', href: '#active' },
				{ label: 'Archived', href: '#archived' }
			]
		},
		{ type: 'divider' },
		{ label: 'Profile', href: '#profile', icon: UserCircleLinearIcon },
		{ label: 'Settings', href: '#settings', icon: SettingsLinearIcon }
	];

	let hasProps = $derived(
		[color !== 'muted', variant !== 'ghost', size !== 'md', isWide, isCollapsible].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { SideNav, type SideNavItem } from 'ui-svelte';`,
			`\timport { HomeLinearIcon, DocumentLinearIcon } from '$lib/icons';`,
			``,
			`\tconst items: SideNavItem[] = [`,
			`\t\t{ type: 'header', label: 'Menu', icon: HomeLinearIcon },`,
			`\t\t{ type: 'divider' },`,
			`\t\t{ label: 'Home', href: '/home', icon: HomeLinearIcon },`,
			`\t\t{ label: 'Documents', href: '/documents', icon: DocumentLinearIcon },`,
			`\t\t{`,
			`\t\t\ttype: 'submenu',`,
			`\t\t\tlabel: 'Analytics',`,
			`\t\t\tsubitems: [`,
			`\t\t\t\t{ label: 'Overview', href: '/analytics/overview' },`,
			`\t\t\t\t{ label: 'Reports', href: '/analytics/reports' }`,
			`\t\t\t]`,
			`\t\t}`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<SideNav`,
			hasProps && `\t{items}`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			isWide && `\tisWide`,
			isCollapsible && `\tisCollapsible`,
			hasProps && `/>`,
			!hasProps && `<SideNav {items} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'items', type: 'SideNavItem[]', initial: '[]' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{
			prop: 'variant',
			type: 'solid | soft | ghost',
			initial: 'ghost'
		},
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | warning | danger',
			initial: 'muted'
		},
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'isWide', type: 'boolean', initial: 'false' },
		{ prop: 'isCollapsible', type: 'boolean', initial: 'false' }
	];

	const itemProps = [
		{ prop: 'type', type: "'item' | 'divider' | 'header' | 'submenu'", initial: "'item'" },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(item: SideNavItem) => void', initial: '' },
		{ prop: 'status', type: 'string | Snippet', initial: '' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'subitems', type: 'SideNavSubItem[]', initial: '' },
		{ prop: 'open', type: 'boolean', initial: 'false' }
	];

	const subItemProps = [
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(item: SideNavSubItem) => void', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'status', type: 'string | Snippet', initial: '' },
		{ prop: 'icon', type: 'IconData', initial: '' }
	];
</script>

<DocsHeader title="SideNav" llmUrl="https://ui-svelte.sappsdev.com/llm/navigation/sidenav.md">
	A vertical navigation component for sidebars with support for headers, dividers, submenus, icons,
	and collapsible behavior.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={isWide} label="Wide" />
			<Checkbox bind:checked={isCollapsible} label="Collapsible" />
		</div>

		<div class="doc-preview" style="min-height: 400px;">
			<SideNav
				class="max-w-64"
				items={sampleItems}
				{color}
				{variant}
				{size}
				{isWide}
				{isCollapsible}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<p class="text-sm mb-2 font-semibold">{item.label} Variant</p>
			<div class="wrap gap-4 mb-6">
				{#each colorOptions as colorItem}
					<div style="width: 180px; min-height: 120px;">
						<SideNav
							variant={item.id as any}
							color={colorItem.id as any}
							items={[
								{ type: 'header', label: colorItem.label },
								{ label: 'Active Item', href: '/docs/navigation/sidenav' },
								{ label: 'Hover Me', onclick: () => {} }
							]}
						/>
					</div>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4">
			{#each sizeOptions as sizeItem}
				<div style="width: 220px; min-height: 180px;">
					<SideNav
						size={sizeItem.id as any}
						items={[
							{ type: 'header', label: 'Size: ' + sizeItem.label },
							{ label: 'Home', href: '#', icon: HomeLinearIcon },
							{ label: 'Documents', href: '#', icon: DocumentLinearIcon },
							{ label: 'Settings', href: '#', icon: SettingsLinearIcon }
						]}
					/>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Item Types</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4">
			<div style="width: 280px;">
				<p class="text-sm mb-2">Headers & Dividers</p>
				<SideNav
					items={[
						{ type: 'header', label: 'Main Menu', icon: HomeLinearIcon },
						{ type: 'divider' },
						{ label: 'Dashboard', href: '#' },
						{ label: 'Analytics', href: '#' },
						{ type: 'header', label: 'Settings' },
						{ type: 'divider' },
						{ label: 'Profile', href: '#' },
						{ label: 'Preferences', href: '#' }
					]}
				/>
			</div>
			<div style="width: 280px;">
				<p class="text-sm mb-2">With Submenus</p>
				<SideNav
					items={[
						{
							type: 'submenu',
							label: 'Products',
							icon: FolderLinearIcon,
							open: true,
							subitems: [
								{ label: 'All Products', href: '#' },
								{ label: 'Categories', href: '#' },
								{ label: 'Inventory', href: '#' }
							]
						},
						{
							type: 'submenu',
							label: 'Orders',
							icon: DocumentLinearIcon,
							subitems: [
								{ label: 'Pending', href: '#' },
								{ label: 'Completed', href: '#' }
							]
						}
					]}
				/>
			</div>
			<div style="width: 280px;">
				<p class="text-sm mb-2">With Descriptions & Status</p>
				<SideNav
					items={[
						{ label: 'Dashboard', href: '#', description: 'View analytics', icon: ChartLinearIcon },
						{
							label: 'Messages',
							href: '#',
							description: 'Check inbox',
							status: '5',
							icon: DocumentLinearIcon
						},
						{
							label: 'Settings',
							href: '#',
							description: 'Configure app',
							status: 'New',
							icon: SettingsLinearIcon
						}
					]}
				/>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Collapsible Mode</p>
	<Card color="background" variant="outlined">
		<p class="text-sm mb-4">Hover over the navigation to expand it.</p>
		<div style="width: 60px; min-height: 300px;">
			<SideNav
				isCollapsible
				items={[
					{ type: 'header', label: 'App', icon: HomeLinearIcon },
					{ type: 'divider' },
					{ label: 'Home', href: '#', icon: HomeLinearIcon },
					{ label: 'Documents', href: '#', icon: DocumentLinearIcon },
					{ label: 'Analytics', href: '#', icon: ChartLinearIcon },
					{ label: 'Settings', href: '#', icon: SettingsLinearIcon }
				]}
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">SideNavItem Type</p>
	<DocsProps props={itemProps} />
</Section>

<Section>
	<p class="section-subtitle">SideNavSubItem Type</p>
	<DocsProps props={subItemProps} />
</Section>
