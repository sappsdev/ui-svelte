<script lang="ts">
	import { BottomNav, Card, Checkbox, Code, Section, Select, type IconData } from 'ui-svelte';
	import {
		HomeLinearIcon,
		DocumentLinearIcon,
		SettingsLinearIcon,
		UserCircleLinearIcon,
		Search24RegularIcon,
		HeartLinearIcon
	} from '$lib/icons';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	type BottomNavItem = {
		id: string;
		label?: string;
		icon: IconData;
		href?: string;
		onclick?: (item: BottomNavItem) => void;
		badge?: string | number;
		isFab?: boolean;
		isActive?: boolean;
	};

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'default', label: 'Default' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'blur', label: 'Blur' }
	];

	const activeStyleOptions = [
		{ id: 'line', label: 'Line' },
		{ id: 'pill', label: 'Pill' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	let color: any = $state('primary');
	let variant: any = $state('soft');
	let activeStyle: any = $state('line');
	let size: any = $state('md');

	let isBlock = $state(true);
	let isBordered = $state(true);

	const sampleItems: BottomNavItem[] = [
		{ id: 'home', label: 'Home', href: '#home', icon: HomeLinearIcon },
		{ id: 'search', label: 'Search', href: '#search', icon: Search24RegularIcon },
		{ id: 'add', icon: HeartLinearIcon, isFab: true, onclick: () => alert('Add clicked!') },
		{ id: 'profile', label: 'Profile', href: '#profile', icon: UserCircleLinearIcon },
		{ id: 'settings', label: 'Settings', href: '#settings', icon: SettingsLinearIcon, badge: 3 }
	];

	let hasProps = $derived(
		[
			color !== 'primary',
			variant !== 'soft',
			activeStyle !== 'line',
			size !== 'md',
			!isBlock,
			!isBordered
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { BottomNav, type BottomNavItem } from 'ui-svelte';`,
			`\timport { HomeLinearIcon, Search24RegularIcon, HeartLinearIcon } from '$lib/icons';`,
			``,
			`\tconst items: BottomNavItem[] = [`,
			`\t\t{ id: 'home', label: 'Home', href: '/home', icon: HomeLinearIcon },`,
			`\t\t{ id: 'search', label: 'Search', href: '/search', icon: Search24RegularIcon },`,
			`\t\t{ id: 'add', icon: HeartLinearIcon, isFab: true, onclick: () => {} },`,
			`\t\t{ id: 'profile', label: 'Profile', href: '/profile', icon: UserCircleLinearIcon },`,
			`\t\t{ id: 'settings', label: 'Settings', href: '/settings', icon: SettingsLinearIcon }`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<BottomNav`,
			hasProps && `\t{items}`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'soft' && `\tvariant="${variant}"`,
			activeStyle !== 'line' && `\tactiveStyle="${activeStyle}"`,
			size !== 'md' && `\tsize="${size}"`,
			!isBlock && `\tisBlock={false}`,
			!isBordered && `\tisBordered={false}`,
			hasProps && `/>`,
			!hasProps && `<BottomNav {items} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'items', type: 'BottomNavItem[]', initial: '[]' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{
			prop: 'variant',
			type: 'solid | soft | blur',
			initial: 'soft'
		},
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | warning | danger | surface | default',
			initial: 'primary'
		},
		{
			prop: 'activeStyle',
			type: 'line | pill',
			initial: 'line'
		},
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'isBlock', type: 'boolean', initial: 'false' },
		{ prop: 'isBordered', type: 'boolean', initial: 'true' }
	];

	const itemProps = [
		{ prop: 'id', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(item: BottomNavItem) => void', initial: '' },
		{ prop: 'badge', type: 'string | number', initial: '' },
		{ prop: 'isFab', type: 'boolean', initial: 'false' },
		{ prop: 'isActive', type: 'boolean', initial: '' }
	];
</script>

<DocsHeader title="BottomNav" llmUrl="https://ui-svelte.sappsdev.com/llm/navigation/bottom-nav.md">
	A mobile-friendly bottom navigation bar component with support for icons, badges, FAB buttons, and
	multiple styling options.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
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
				label="Active Style"
				size="sm"
				options={activeStyleOptions}
				bind:value={activeStyle}
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
			<Checkbox bind:checked={isBlock} label="Block (not fixed)" />
			<Checkbox bind:checked={isBordered} label="Bordered" />
		</div>

		<div class="doc-preview" style="min-height: 120px; position: relative;">
			<BottomNav
				items={sampleItems}
				{color}
				{variant}
				{activeStyle}
				{size}
				{isBlock}
				{isBordered}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card>
		{#each variantOptions as item}
			<p class="text-sm mb-2 font-semibold">{item.label} Variant</p>
			<div class="wrap gap-4 mb-6">
				{#each colorOptions.slice(0, 5) as colorItem}
					<div style="width: 320px; min-height: 80px;">
						<BottomNav
							isBlock
							variant={item.id as any}
							color={colorItem.id as any}
							items={[
								{ id: '1', label: 'Home', icon: HomeLinearIcon, isActive: true },
								{ id: '2', label: 'Search', icon: Search24RegularIcon },
								{ id: '3', label: 'Profile', icon: UserCircleLinearIcon }
							]}
						/>
						<p class="text-xs text-center mt-1">{colorItem.label}</p>
					</div>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Active Styles</p>
	<Card>
		<div class="wrap gap-4">
			{#each activeStyleOptions as styleItem}
				<div style="width: 320px; min-height: 80px;">
					<p class="text-sm mb-2">{styleItem.label} Style</p>
					<BottomNav
						isBlock
						activeStyle={styleItem.id as any}
						items={[
							{ id: '1', label: 'Home', icon: HomeLinearIcon, isActive: true },
							{ id: '2', label: 'Search', icon: Search24RegularIcon },
							{ id: '3', label: 'Profile', icon: UserCircleLinearIcon }
						]}
					/>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		<div class="wrap gap-4">
			{#each sizeOptions as sizeItem}
				<div style="width: 320px; min-height: 80px;">
					<p class="text-sm mb-2">Size: {sizeItem.label}</p>
					<BottomNav
						isBlock
						size={sizeItem.id as any}
						items={[
							{ id: '1', label: 'Home', icon: HomeLinearIcon },
							{ id: '2', label: 'Search', icon: Search24RegularIcon },
							{ id: '3', label: 'Profile', icon: UserCircleLinearIcon }
						]}
					/>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Features</p>
	<Card>
		<div class="wrap gap-4">
			<div style="width: 320px;">
				<p class="text-sm mb-2">With Badges</p>
				<BottomNav
					isBlock
					items={[
						{ id: '1', label: 'Home', icon: HomeLinearIcon },
						{ id: '2', label: 'Messages', icon: DocumentLinearIcon, badge: 5 },
						{ id: '3', label: 'Alerts', icon: SettingsLinearIcon, badge: 'New' }
					]}
				/>
			</div>
			<div style="width: 320px;">
				<p class="text-sm mb-2">With FAB Button</p>
				<BottomNav
					isBlock
					items={[
						{ id: '1', label: 'Home', icon: HomeLinearIcon },
						{ id: '2', icon: HeartLinearIcon, isFab: true },
						{ id: '3', label: 'Profile', icon: UserCircleLinearIcon }
					]}
				/>
			</div>
			<div style="width: 320px;">
				<p class="text-sm mb-2">Icon Only (no labels)</p>
				<BottomNav
					isBlock
					items={[
						{ id: '1', icon: HomeLinearIcon },
						{ id: '2', icon: Search24RegularIcon },
						{ id: '3', icon: HeartLinearIcon, isFab: true },
						{ id: '4', icon: UserCircleLinearIcon },
						{ id: '5', icon: SettingsLinearIcon }
					]}
				/>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">BottomNavItem Type</p>
	<DocsProps props={itemProps} />
</Section>
