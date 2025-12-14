<script lang="ts">
	import { Card, Checkbox, Code, Section, Select, SideNav } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';
	import {
		LayoutDashboardIcon,
		Person24RegularIcon,
		Settings24RegularIcon,
		FileDocumentIcon,
		Heart24RegularIcon,
		SignOut24RegularIcon
	} from '$lib/icons';

	const sizeOptions = [
		{ id: 'sm', label: 'Small' },
		{ id: 'md', label: 'Medium' },
		{ id: 'lg', label: 'Large' }
	];

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'danger', label: 'Danger' }
	];

	let size: any = $state('md');
	let isSolid = $state(false);
	let variant: any = $state('muted');
	let isWide = $state(true);
	let isCompact = $state(false);
	let withIcons = $state(true);
	let withSubmenu = $state(true);

	let hasProps = $derived(
		[size !== 'md', isSolid, variant !== 'muted', !isWide, isCompact].some(Boolean)
	);

	let sideNavItems = $derived.by(() => {
		const items: {
			type?: 'item' | 'header' | 'divider' | 'submenu';
			label?: string;
			href?: string;
			icon?: any;
			subitems?: { label: string; href: string }[];
			open?: boolean;
		}[] = [
			{ type: 'header', label: 'Main', icon: withIcons ? LayoutDashboardIcon : undefined },
			{ label: 'Dashboard', href: '#dashboard', icon: withIcons ? LayoutDashboardIcon : undefined },
			{ label: 'Profile', href: '#profile', icon: withIcons ? Person24RegularIcon : undefined }
		];

		if (withSubmenu) {
			items.push({
				type: 'submenu',
				label: 'Documents',
				icon: withIcons ? FileDocumentIcon : undefined,
				subitems: [
					{ label: 'All Documents', href: '#docs' },
					{ label: 'Recent', href: '#docs/recent' },
					{ label: 'Favorites', href: '#docs/favorites' }
				],
				open: true
			});
		}

		items.push(
			{ type: 'divider' },
			{ label: 'Settings', href: '#settings', icon: withIcons ? Settings24RegularIcon : undefined },
			{ label: 'Favorites', href: '#favorites', icon: withIcons ? Heart24RegularIcon : undefined },
			{ label: 'Logout', href: '#logout', icon: withIcons ? SignOut24RegularIcon : undefined }
		);

		return items;
	});

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { SideNav } from 'ui-svelte';`,
			withIcons && `\timport { LayoutDashboardIcon, PersonIcon, SettingsIcon } from '$lib/icons';`,
			``,
			`\tconst items = [`,
			`\t\t{ type: 'header', label: 'Main' },`,
			withIcons
				? `\t\t{ label: 'Dashboard', href: '/dashboard', icon: LayoutDashboardIcon },`
				: `\t\t{ label: 'Dashboard', href: '/dashboard' },`,
			withIcons
				? `\t\t{ label: 'Profile', href: '/profile', icon: PersonIcon },`
				: `\t\t{ label: 'Profile', href: '/profile' },`
		];

		if (withSubmenu) {
			scriptLines.push(
				`\t\t{`,
				`\t\t\ttype: 'submenu',`,
				`\t\t\tlabel: 'Documents',`,
				`\t\t\tsubitems: [`,
				`\t\t\t\t{ label: 'All Documents', href: '/docs' },`,
				`\t\t\t\t{ label: 'Recent', href: '/docs/recent' }`,
				`\t\t\t],`,
				`\t\t\topen: true`,
				`\t\t},`
			);
		}

		scriptLines.push(
			`\t\t{ type: 'divider' },`,
			withIcons
				? `\t\t{ label: 'Settings', href: '/settings', icon: SettingsIcon }`
				: `\t\t{ label: 'Settings', href: '/settings' }`,
			`\t];`,
			`<\/script>`
		);

		const componentLine = hasProps
			? `\n<SideNav {items} ${[
					size !== 'md' && `size="${size}"`,
					isSolid && `isSolid`,
					variant !== 'muted' && `variant="${variant}"`,
					!isWide && `isWide={false}`,
					isCompact && `isCompact`
				]
					.filter(Boolean)
					.join(' ')} />`
			: '\n<SideNav {items} />';

		return [...scriptLines, componentLine].filter(Boolean).join('\n');
	});

	const props = [
		{ prop: 'items', type: 'SideNavItem[]', initial: '[]', required: true },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{
			prop: 'variant',
			type: 'primary | secondary | muted | success | info | warning | danger',
			initial: 'muted'
		},
		{ prop: 'isWide', type: 'boolean', initial: 'false' },
		{ prop: 'isCompact', type: 'boolean', initial: 'false' },
		{ prop: 'isCollapsible', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	const itemProps = [
		{ prop: 'type', type: 'item | header | divider | submenu', initial: 'item' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'status', type: 'string | Snippet', initial: '' },
		{ prop: 'onclick', type: '(item: SideNavItem) => void', initial: '' },
		{ prop: 'subitems', type: 'SideNavSubItem[]', initial: '' },
		{ prop: 'open', type: 'boolean', initial: 'false' }
	];

	const subitemProps = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'status', type: 'string | Snippet', initial: '' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'onclick', type: '(item: SideNavSubItem) => void', initial: '' }
	];
</script>

<DocsHeader title="Side Nav" llmUrl="https://ui-svelte.sappsdev.com/llm/navigation/sidenav.md">
	Vertical sidebar navigation for applications with support for headers, dividers, and collapsible
	submenus.
</DocsHeader>

{#snippet preview()}
	<div class="w-64 bg-surface rounded-ui p-2">
		<SideNav items={sideNavItems} {size} {isSolid} {variant} {isWide} {isCompact} />
	</div>
{/snippet}

<Section bodyClass="md:grid-3">
	<DocsPreview>
		{@render preview()}
	</DocsPreview>
	<Card>
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
		<Checkbox bind:checked={isSolid} label="Solid" />
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<div class="grid-2 gap-2 mt-2">
			<Checkbox bind:checked={isWide} label="Wide" />
			<Checkbox bind:checked={isCompact} label="Compact" />
			<Checkbox bind:checked={withIcons} label="Icons" />
			<Checkbox bind:checked={withSubmenu} label="Submenu" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="grid-2 center">
		{#snippet header()}
			<h4>Solid Style</h4>
		{/snippet}
		{@const items = [
			{ label: 'Dashboard', href: '#dashboard' },
			{ label: 'Profile', href: '#profile' },
			{ label: 'Settings', href: '#settings' }
		]}
		<div class="column gap-1">
			<p class="text-xs center">Default</p>
			<div class="w-48 bg-surface rounded-ui p-2">
				<SideNav {items} isWide />
			</div>
		</div>
		<div class="column gap-1">
			<p class="text-xs center">Solid</p>
			<div class="w-48 bg-surface rounded-ui p-2">
				<SideNav {items} isWide isSolid />
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-1 xl:grid-3 center">
		{#snippet header()}
			<h4>Sizes</h4>
		{/snippet}
		{#each sizeOptions as item}
			{@const items = [
				{ label: 'Dashboard', href: '#dashboard' },
				{ label: 'Profile', href: '#profile' },
				{ label: 'Settings', href: '#settings' }
			]}
			<div class="column gap-1">
				<p class="text-xs center">{item.label}</p>
				<div class="w-48 bg-surface rounded-ui p-2">
					<SideNav {items} size={item.id as any} isWide />
				</div>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Item Types</h4>
		{/snippet}
		<ul class="list-disc pl-6 space-y-2 text-sm">
			<li><strong>item</strong> - Standard navigation link (default)</li>
			<li><strong>header</strong> - Section header with optional icon</li>
			<li><strong>divider</strong> - Horizontal separator line</li>
			<li><strong>submenu</strong> - Collapsible group with subitems</li>
		</ul>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<script lang="ts">
  import { SideNav } from 'ui-svelte';
  import { DashboardIcon, SettingsIcon, DocsIcon } from '$lib/icons';

  const items = [
    { type: 'header', label: 'Main Menu' },
    { label: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
    { label: 'Settings', href: '/settings', icon: SettingsIcon },
    { type: 'divider' },
    {
      type: 'submenu',
      label: 'Documents',
      icon: DocsIcon,
      subitems: [
        { label: 'All Files', href: '/docs' },
        { label: 'Recent', href: '/docs/recent' }
      ],
      open: true
    }
  ];
<\/script>

<!-- Basic SideNav -->
<SideNav {items} />

<!-- Wide items (full width) -->
<SideNav {items} isWide />

<!-- Solid style with variant -->
<SideNav {items} isSolid variant="primary" />

<!-- Compact spacing -->
<SideNav {items} isCompact />

<!-- Collapsible sidebar (hover to expand) -->
<SideNav {items} isCollapsible />`}
		/>
	</Card>
</Section>

<DocsProps {props} />

<Section>
	<Card>
		{#snippet header()}
			<h4>SideNavItem Type</h4>
		{/snippet}
		<p class="text-sm">Each item in the items array should follow this structure:</p>
		<DocsProps props={itemProps} />
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>SideNavSubItem Type</h4>
		{/snippet}
		<p class="text-sm">Subitems in a submenu should follow this structure:</p>
		<DocsProps props={subitemProps} />
	</Card>
</Section>
