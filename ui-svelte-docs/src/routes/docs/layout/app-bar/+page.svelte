<script lang="ts">
	import {
		AppBar,
		Card,
		Checkbox,
		Code,
		Section,
		Select,
		NavMenu,
		Dropdown,
		IconButton
	} from 'ui-svelte';
	import {
		HomeLinearIcon,
		Person24RegularIcon,
		Settings24RegularIcon,
		List24RegularIcon,
		Search24RegularIcon,
		HeartLinearIcon,
		LayoutDashboardIcon
	} from '$lib/icons';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'default', label: 'Default' },
		{ id: 'surface', label: 'Surface' },
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
		{ id: 'soft', label: 'Soft' }
	];

	let color: any = $state('default');
	let variant: any = $state('soft');

	let isBlurred = $state(false);
	let isBordered = $state(false);
	let borderOnScrollOnly = $state(false);
	let isSticky = $state(false);
	let isFloating = $state(false);
	let isBoxed = $state(false);
	let hideOnScroll = $state(false);
	let solidOnScroll = $state(false);

	const navItems = [
		{ label: 'Home', href: '#', icon: HomeLinearIcon },
		{ label: 'Products', href: '#' },
		{ label: 'About', href: '#' }
	];

	const dropdownOptions = [
		{ id: 1, label: 'Profile', icon: Person24RegularIcon },
		{ id: 2, label: 'Settings', icon: Settings24RegularIcon },
		{ id: 3, label: 'Logout', href: '#' }
	];

	let hasProps = $derived(
		[
			color !== 'default',
			variant !== 'soft',
			isBlurred,
			isBordered,
			borderOnScrollOnly,
			isSticky,
			isFloating,
			isBoxed,
			hideOnScroll,
			solidOnScroll
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { AppBar, NavMenu, Dropdown, IconButton, type NavMenuItem } from 'ui-svelte';`,
			`\timport { HomeLinearIcon, List24RegularIcon, HeartLinearIcon } from '$lib/icons';`,
			``,
			`\tconst navItems: NavMenuItem[] = [`,
			`\t\t{ label: 'Home', href: '#', icon: HomeLinearIcon },`,
			`\t\t{ label: 'Products', href: '#' },`,
			`\t\t{ label: 'About', href: '#' }`,
			`\t];`,
			``,
			`\tconst dropdownOptions = [`,
			`\t\t{ id: 1, label: 'Profile' },`,
			`\t\t{ id: 2, label: 'Settings' },`,
			`\t\t{ id: 3, label: 'Logout' }`,
			`\t];`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<AppBar`,
			color !== 'default' && `\tcolor="${color}"`,
			variant !== 'soft' && `\tvariant="${variant}"`,
			isBlurred && `\tisBlurred`,
			isBordered && `\tisBordered`,
			borderOnScrollOnly && `\tborderOnScrollOnly`,
			isSticky && `\tisSticky`,
			isFloating && `\tisFloating`,
			isBoxed && `\tisBoxed`,
			hideOnScroll && `\thideOnScroll`,
			solidOnScroll && `\tsolidOnScroll`,
			hasProps && `>`,
			!hasProps && `<AppBar>`,
			`\t{#snippet start()}`,
			`\t\t<IconButton icon={List24RegularIcon} variant="ghost" color="muted" />`,
			`\t{/snippet}`,
			`\t{#snippet center()}`,
			`\t\t<NavMenu items={navItems} />`,
			`\t{/snippet}`,
			`\t{#snippet end()}`,
			`\t\t<Dropdown options={dropdownOptions}>`,
			`\t\t\t<IconButton icon={HeartLinearIcon} variant="ghost" color="muted" />`,
			`\t\t</Dropdown>`,
			`\t{/snippet}`,
			`</AppBar>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'start', type: 'Snippet', initial: '' },
		{ prop: 'center', type: 'Snippet', initial: '' },
		{ prop: 'end', type: 'Snippet', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | warning | danger | surface | default',
			initial: 'default'
		},
		{
			prop: 'variant',
			type: 'solid | soft',
			initial: 'soft'
		},
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'contentClass', type: 'string', initial: '' },
		{ prop: 'startClass', type: 'string', initial: '' },
		{ prop: 'centerClass', type: 'string', initial: '' },
		{ prop: 'endClass', type: 'string', initial: '' },
		{ prop: 'isBlurred', type: 'boolean', initial: 'false' },
		{ prop: 'isBordered', type: 'boolean', initial: 'false' },
		{ prop: 'borderOnScrollOnly', type: 'boolean', initial: 'false' },
		{ prop: 'hideOnScroll', type: 'boolean', initial: 'false' },
		{ prop: 'solidOnScroll', type: 'boolean', initial: 'false' },
		{ prop: 'isSticky', type: 'boolean', initial: 'false' },
		{ prop: 'isFloating', type: 'boolean', initial: 'false' },
		{ prop: 'isBoxed', type: 'boolean', initial: 'false' }
	];
</script>

<DocsHeader title="AppBar" llmUrl="https://ui-svelte.sappsdev.com/llm/layout/app-bar.md">
	A flexible top navigation bar with start, center, and end slots for organizing content.
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
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={isBlurred} label="isBlurred" />
			<Checkbox bind:checked={isBordered} label="isBordered" />
			<Checkbox bind:checked={borderOnScrollOnly} label="borderOnScrollOnly" />
			<Checkbox bind:checked={isSticky} label="isSticky" />
			<Checkbox bind:checked={isFloating} label="isFloating" />
			<Checkbox bind:checked={isBoxed} label="isBoxed" />
			<Checkbox bind:checked={hideOnScroll} label="hideOnScroll" />
			<Checkbox bind:checked={solidOnScroll} label="solidOnScroll" />
		</div>

		<div class="doc-preview">
			<AppBar
				{color}
				{variant}
				{isBlurred}
				{isBordered}
				{borderOnScrollOnly}
				{isSticky}
				{isFloating}
				{isBoxed}
				{hideOnScroll}
				{solidOnScroll}
			>
				{#snippet start()}
					<IconButton icon={List24RegularIcon} variant="ghost" color="muted" />
				{/snippet}
				{#snippet center()}
					<NavMenu items={navItems} />
				{/snippet}
				{#snippet end()}
					<Dropdown options={dropdownOptions}>
						<IconButton icon={HeartLinearIcon} variant="ghost" color="muted" />
					</Dropdown>
				{/snippet}
			</AppBar>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as c}
					<AppBar variant={item.id as any} color={c.id as any} rootClass="w-full max-w-md">
						{#snippet start()}
							<IconButton icon={List24RegularIcon} variant="ghost" color="muted" size="sm" />
						{/snippet}
						{#snippet center()}
							<span class="text-sm font-medium">{item.label} {c.label}</span>
						{/snippet}
						{#snippet end()}
							<IconButton icon={Search24RegularIcon} variant="ghost" color="muted" size="sm" />
						{/snippet}
					</AppBar>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Navigation Menu</p>
	<Card color="background" variant="outlined">
		<AppBar color="surface" variant="soft" isBordered>
			{#snippet start()}
				<IconButton icon={LayoutDashboardIcon} variant="ghost" color="muted" />
			{/snippet}
			{#snippet center()}
				<NavMenu
					items={[
						{ label: 'Home', href: '#', icon: HomeLinearIcon },
						{
							label: 'Products',
							type: 'submenu',
							subitems: [
								{ label: 'All Products', href: '#' },
								{ label: 'Categories', href: '#' }
							]
						},
						{ label: 'About', href: '#' },
						{ label: 'Contact', href: '#' }
					]}
				/>
			{/snippet}
			{#snippet end()}
				<div class="flex gap-2">
					<IconButton icon={Search24RegularIcon} variant="ghost" color="muted" />
					<Dropdown options={dropdownOptions}>
						<IconButton icon={Person24RegularIcon} variant="ghost" color="muted" />
					</Dropdown>
				</div>
			{/snippet}
		</AppBar>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
