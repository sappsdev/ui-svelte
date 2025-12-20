<script lang="ts">
	import { NavMenu, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import {
		HomeLinearIcon,
		DocumentLinearIcon,
		SettingsLinearIcon,
		ChartLinearIcon,
		FolderLinearIcon,
		UserCircleLinearIcon
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

	let withIcons = $state(true);
	let withSubmenu = $state(true);
	let withMegamenu = $state(false);

	const sampleItems: any[] = $derived.by(() => {
		const items: any[] = [
			{
				label: 'Home',
				href: '#home',
				icon: withIcons ? HomeLinearIcon : undefined
			},
			{
				label: 'Documents',
				href: '#documents',
				icon: withIcons ? DocumentLinearIcon : undefined
			}
		];

		if (withSubmenu) {
			items.push({
				label: 'Products',
				type: 'submenu',
				icon: withIcons ? FolderLinearIcon : undefined,
				subitems: [
					{
						label: 'All Products',
						description: 'Browse catalog',
						href: '#products',
						icon: withIcons ? FolderLinearIcon : undefined
					},
					{
						label: 'Categories',
						href: '#categories',
						icon: withIcons ? ChartLinearIcon : undefined
					},
					{ label: 'Inventory', href: '#inventory' }
				]
			});
		}

		if (withMegamenu) {
			items.push({
				label: 'Resources',
				type: 'megamenu',
				icon: withIcons ? DocumentLinearIcon : undefined,
				megamenu: megamenuSnippet
			} as any);
		}

		items.push({
			label: 'Settings',
			href: '#settings',
			icon: withIcons ? SettingsLinearIcon : undefined
		});

		return items;
	});

	let hasProps = $derived([color !== 'muted', variant !== 'ghost', size !== 'md'].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { NavMenu, type NavMenuItem } from 'ui-svelte';`,
			withIcons && `\timport { HomeLinearIcon, DocumentLinearIcon } from '$lib/icons';`,
			``,
			`\tconst items: NavMenuItem[] = [`,
			withIcons
				? `\t\t{ label: 'Home', href: '/home', icon: HomeLinearIcon },`
				: `\t\t{ label: 'Home', href: '/home' },`,
			withIcons
				? `\t\t{ label: 'Documents', href: '/documents', icon: DocumentLinearIcon },`
				: `\t\t{ label: 'Documents', href: '/documents' },`
		];

		if (withSubmenu) {
			scriptLines.push(
				`\t\t{`,
				`\t\t\tlabel: 'Products',`,
				`\t\t\ttype: 'submenu',`,
				`\t\t\tsubitems: [`,
				`\t\t\t\t{ label: 'All Products', description: 'Browse catalog', href: '/products' },`,
				`\t\t\t\t{ label: 'Categories', href: '/categories' }`,
				`\t\t\t]`,
				`\t\t},`
			);
		}

		if (withMegamenu) {
			scriptLines.push(
				`\t\t{`,
				`\t\t\tlabel: 'Resources',`,
				`\t\t\ttype: 'megamenu',`,
				`\t\t\tmegamenu: megamenuSnippet`,
				`\t\t},`
			);
		}

		scriptLines.push(`\t\t{ label: 'Settings', href: '/settings' }`, `\t];`, `<\/script>`);

		if (withMegamenu) {
			scriptLines.push(
				``,
				`{#snippet megamenuSnippet()}`,
				`\t<div class="grid-3 gap-6 p-4">`,
				`\t\t<!-- Custom megamenu content -->`,
				`\t</div>`,
				`{/snippet}`
			);
		}

		const componentLines = [
			hasProps && `<NavMenu`,
			hasProps && `\t{items}`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			hasProps && `/>`,
			!hasProps && `<NavMenu {items} />`
		].filter(Boolean);

		return [...scriptLines.filter(Boolean), ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'items', type: 'NavMenuItem[]', initial: '[]' },
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
		{ prop: 'class', type: 'string', initial: '' }
	];

	const itemProps = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(item: NavMenuItem) => void', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'subitems', type: 'NavMenuSubItem[]', initial: '' },
		{ prop: 'megamenu', type: 'Snippet', initial: '' },
		{ prop: 'type', type: "'item' | 'submenu' | 'megamenu'", initial: "'item'" }
	];

	const subItemProps = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(item: NavMenuSubItem) => void', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconData', initial: '' }
	];
</script>

{#snippet megamenuSnippet()}
	<div class="grid-3 gap-6 p-4 min-w-md">
		<div>
			<div class="navmenu-header">Documentation</div>
			<div class="flex flex-col gap-1">
				<a href="#docs/getting-started" class="navmenu-submenu-item">
					<div class="navmenu-submenu-content">
						<div class="navmenu-submenu-label">Getting Started</div>
						<div class="navmenu-submenu-description">Quick start guide</div>
					</div>
				</a>
				<a href="#docs/api" class="navmenu-submenu-item">
					<div class="navmenu-submenu-content">
						<div class="navmenu-submenu-label">API Reference</div>
						<div class="navmenu-submenu-description">Complete API docs</div>
					</div>
				</a>
			</div>
		</div>
		<div>
			<div class="navmenu-header">Guides</div>
			<div class="flex flex-col gap-1">
				<a href="#guides/tutorials" class="navmenu-submenu-item">
					<div class="navmenu-submenu-content">
						<div class="navmenu-submenu-label">Tutorials</div>
						<div class="navmenu-submenu-description">Step by step</div>
					</div>
				</a>
				<a href="#guides/examples" class="navmenu-submenu-item">
					<div class="navmenu-submenu-content">
						<div class="navmenu-submenu-label">Examples</div>
						<div class="navmenu-submenu-description">Code samples</div>
					</div>
				</a>
			</div>
		</div>
		<div>
			<div class="navmenu-header">Community</div>
			<div class="flex flex-col gap-1">
				<a href="#community/discord" class="navmenu-submenu-item">
					<div class="navmenu-submenu-content">
						<div class="navmenu-submenu-label">Discord</div>
						<div class="navmenu-submenu-description">Join the chat</div>
					</div>
				</a>
				<a href="#community/github" class="navmenu-submenu-item">
					<div class="navmenu-submenu-content">
						<div class="navmenu-submenu-label">GitHub</div>
						<div class="navmenu-submenu-description">Contribute</div>
					</div>
				</a>
			</div>
		</div>
	</div>
{/snippet}

<DocsHeader title="NavMenu">
	A horizontal navigation menu with support for links, submenus with dropdowns, megamenus, and
	icons.
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
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={withIcons} label="Icons" />
			<Checkbox bind:checked={withSubmenu} label="Submenu" />
			<Checkbox bind:checked={withMegamenu} label="Megamenu" />
		</div>

		<div class="doc-preview" style="min-height: 100px;">
			<NavMenu items={sampleItems} {color} {variant} {size} />
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
				{#each colorOptions as colorItem}
					<div class="column gap-1">
						<p class="text-xs center">{colorItem.label}</p>
						<NavMenu
							variant={item.id as any}
							color={colorItem.id as any}
							items={[
								{ label: 'Active', href: '/docs/navigation/nav-menu' },
								{ label: 'Hover Me', onclick: () => {} },
								{ label: 'Link', href: '#link' }
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
	<Card>
		<div class="column gap-6">
			{#each sizeOptions as sizeItem}
				<div class="column gap-2">
					<p class="text-sm font-medium">Size: {sizeItem.label}</p>
					<NavMenu
						size={sizeItem.id as any}
						items={[
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
	<p class="section-subtitle">Menu Types</p>
	<Card>
		<div class="column gap-6">
			<div>
				<p class="text-sm mb-2 font-medium">Simple Links</p>
				<NavMenu
					items={[
						{ label: 'Home', href: '#home', icon: HomeLinearIcon },
						{ label: 'About', href: '#about', icon: UserCircleLinearIcon },
						{ label: 'Contact', href: '#contact' }
					]}
				/>
			</div>
			<div>
				<p class="text-sm mb-2 font-medium">With Submenu Dropdown</p>
				<NavMenu
					items={[
						{ label: 'Home', href: '#home' },
						{
							label: 'Products',
							type: 'submenu',
							icon: FolderLinearIcon,
							subitems: [
								{ label: 'All Products', description: 'Browse our catalog', href: '#products' },
								{ label: 'New Arrivals', description: 'Latest additions', href: '#new' },
								{ label: 'Best Sellers', href: '#best' }
							]
						},
						{ label: 'Contact', href: '#contact' }
					]}
				/>
			</div>
			<div>
				<p class="text-sm mb-2 font-medium">With Megamenu</p>
				<NavMenu
					items={[
						{ label: 'Home', href: '#home' },
						{
							label: 'Resources',
							type: 'megamenu',
							megamenu: megamenuSnippet
						} as any,
						{ label: 'Contact', href: '#contact' }
					]}
				/>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Icons</p>
	<Card>
		<div class="column gap-4">
			<NavMenu
				items={[
					{ label: 'Dashboard', href: '#', icon: ChartLinearIcon },
					{ label: 'Documents', href: '#', icon: DocumentLinearIcon },
					{
						label: 'Settings',
						type: 'submenu',
						icon: SettingsLinearIcon,
						subitems: [
							{ label: 'General', href: '#', icon: SettingsLinearIcon },
							{ label: 'Profile', href: '#', icon: UserCircleLinearIcon }
						]
					}
				]}
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Megamenu Example</p>
	<Card>
		<p class="text-sm mb-4">Megamenus use Svelte snippets for completely custom content:</p>
		<Code
			lang="svelte"
			code={`{#snippet megamenuContent()}
  <div class="grid-3 gap-6 p-4">
    <div>
      <div class="navmenu-header">Documentation</div>
      <div class="flex flex-col gap-1">
        <a href="/docs" class="navmenu-submenu-item">
          <div class="navmenu-submenu-content">
            <div class="navmenu-submenu-label">Getting Started</div>
            <div class="navmenu-submenu-description">Quick start guide</div>
          </div>
        </a>
      </div>
    </div>
    <!-- More columns -->
  </div>
{/snippet}

<script lang="ts">
  const items: NavMenuItem[] = [
    {
      label: 'Resources',
      type: 'megamenu',
      megamenu: megamenuContent
    }
  ];
<\/script>

<NavMenu {items} />`}
		/>
		<p class="text-sm mt-4">Available CSS classes for megamenu content:</p>
		<ul class="list-disc pl-6 space-y-1 text-sm mt-2">
			<li><code>.navmenu-header</code> - Section header styling</li>
			<li><code>.navmenu-submenu-item</code> - Individual menu item</li>
			<li><code>.navmenu-submenu-content</code> - Content wrapper</li>
			<li><code>.navmenu-submenu-label</code> - Item label</li>
			<li><code>.navmenu-submenu-description</code> - Item description</li>
			<li><code>.navmenu-divider</code> - Horizontal divider</li>
		</ul>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">NavMenuItem Type</p>
	<DocsProps props={itemProps} />
</Section>

<Section>
	<p class="section-subtitle">NavMenuSubItem Type</p>
	<DocsProps props={subItemProps} />
</Section>
