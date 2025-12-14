<script lang="ts">
	import { Card, Checkbox, Code, NavMenu, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

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
	let withSubmenu = $state(true);
	let withMegamenu = $state(false);

	let hasProps = $derived([size !== 'md', isSolid, variant !== 'muted'].some(Boolean));

	let navMenuItems = $derived.by(() => {
		const baseItems: {
			label: string;
			href?: string;
			type?: 'item' | 'submenu' | 'megamenu';
			subitems?: { label: string; description?: string; href: string }[];
			megamenu?: typeof megamenuSnippet;
		}[] = [
			{ label: 'Home', href: '#home' },
			{ label: 'About', href: '#about' }
		];

		let result = [...baseItems];

		if (withSubmenu) {
			result.push({
				label: 'Products',
				type: 'submenu' as const,
				subitems: [
					{ label: 'All Products', description: 'Browse our catalog', href: '#products' },
					{ label: 'New Arrivals', description: 'Latest additions', href: '#products/new' },
					{ label: 'Best Sellers', description: 'Most popular items', href: '#products/best' }
				]
			});
		}

		if (withMegamenu) {
			result.push({
				label: 'Resources',
				type: 'megamenu' as const,
				megamenu: megamenuSnippet
			} as any);
		}

		result.push({ label: 'Contact', href: '#contact' });

		return result;
	});

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { NavMenu } from 'ui-svelte';`,
			``,
			`\tconst items = [`
		];

		scriptLines.push(
			`\t\t{ label: 'Home', href: '/home' },`,
			`\t\t{ label: 'About', href: '/about' },`
		);

		if (withSubmenu) {
			scriptLines.push(
				`\t\t{`,
				`\t\t\tlabel: 'Products',`,
				`\t\t\ttype: 'submenu',`,
				`\t\t\tsubitems: [`,
				`\t\t\t\t{ label: 'All Products', description: 'Browse catalog', href: '/products' },`,
				`\t\t\t\t{ label: 'New Arrivals', href: '/products/new' }`,
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

		scriptLines.push(`\t\t{ label: 'Contact', href: '/contact' }`, `\t];`, `<\/script>`);

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

		const componentLine = hasProps
			? `\n<NavMenu {items} ${[
					size !== 'md' && `size="${size}"`,
					isSolid && `isSolid`,
					variant !== 'muted' && `variant="${variant}"`
				]
					.filter(Boolean)
					.join(' ')} />`
			: '\n<NavMenu {items} />';

		return [...scriptLines, componentLine].join('\n');
	});

	const props = [
		{ prop: 'items', type: 'MenuItem[]', initial: '[]', required: true },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{
			prop: 'variant',
			type: 'primary | secondary | muted | success | info | warning | danger',
			initial: 'muted'
		},
		{ prop: 'class', type: 'string', initial: '' }
	];

	const menuItemProps = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(item: MenuItem) => void', initial: '' },
		{ prop: 'subitems', type: 'SubmenuItem[]', initial: '' },
		{ prop: 'megamenu', type: 'Snippet', initial: '' },
		{ prop: 'type', type: 'item | submenu | megamenu', initial: 'item' }
	];

	const submenuItemProps = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(item: SubmenuItem) => void', initial: '' }
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

<DocsHeader title="Nav Menu" llmUrl="https://ui-svelte.sappsdev.com/llm/navigation/nav-menu.md">
	Horizontal navigation menu with support for links, submenus, and megamenus.
</DocsHeader>

{#snippet preview()}
	<NavMenu items={navMenuItems} {size} {isSolid} {variant} />
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
			<Checkbox bind:checked={withSubmenu} label="Submenu" />
			<Checkbox bind:checked={withMegamenu} label="Megamenu" />
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
			{ label: 'Home', href: '#home' },
			{ label: 'About', href: '#about' },
			{ label: 'Contact', href: '#contact' }
		]}
		<div class="column gap-1">
			<p class="text-xs center">Default</p>
			<NavMenu {items} />
		</div>
		<div class="column gap-1">
			<p class="text-xs center">Solid</p>
			<NavMenu {items} isSolid />
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
				{ label: 'Home', href: '#home' },
				{ label: 'About', href: '#about' },
				{ label: 'Contact', href: '#contact' }
			]}
			<div class="column gap-1">
				<p class="text-xs center">{item.label}</p>
				<NavMenu {items} size={item.id as any} />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Menu Types</h4>
		{/snippet}
		<ul class="list-disc pl-6 space-y-2 text-sm">
			<li><strong>item</strong> - Standard navigation link</li>
			<li><strong>submenu</strong> - Dropdown menu with list of navigation items</li>
			<li><strong>megamenu</strong> - Large dropdown with custom content using Svelte snippets</li>
		</ul>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Megamenu Example</h4>
		{/snippet}
		<p>Megamenus use Svelte snippets for completely custom content:</p>
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
            <div class="navmenu-submenu-description">Quick start</div>
          </div>
        </a>
      </div>
    </div>
    <!-- More columns -->
  </div>
{/snippet}

<script lang="ts">
  const items = [
    {
      label: 'Resources',
      type: 'megamenu',
      megamenu: megamenuContent  // Pass the snippet reference
    }
  ];
<\/script>

<NavMenu {items} />`}
		/>
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Available CSS Classes for Megamenus</h4>
		{/snippet}
		<ul class="list-disc pl-6 space-y-1 text-sm">
			<li><code>.navmenu-header</code> - Section header styling</li>
			<li><code>.navmenu-submenu-item</code> - Individual menu item</li>
			<li><code>.navmenu-submenu-content</code> - Content wrapper</li>
			<li><code>.navmenu-submenu-label</code> - Item label</li>
			<li><code>.navmenu-submenu-description</code> - Item description</li>
			<li><code>.navmenu-divider</code> - Horizontal divider</li>
		</ul>
	</Card>
</Section>

<DocsProps {props} />

<Section>
	<Card>
		{#snippet header()}
			<h4>MenuItem Type</h4>
		{/snippet}
		<p class="text-sm">Each item in the items array should follow this structure:</p>
		<DocsProps props={menuItemProps} />
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>SubmenuItem Type</h4>
		{/snippet}
		<p class="text-sm">Subitems in a MenuItem's subitems array should follow this structure:</p>
		<DocsProps props={submenuItemProps} />
	</Card>
</Section>
