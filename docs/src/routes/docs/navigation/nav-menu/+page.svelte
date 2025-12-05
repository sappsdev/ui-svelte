<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { NavMenu, Select, Checkbox, Section } from 'ui-svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	let variant: any = $state('primary');
	let size: any = $state('md');

	let withIcons = $state(true);
	let withDescriptions = $state(false);
	let withSimpleSubmenu = $state(true);
	let withMegamenu = $state(false);

	let navMenuItems: any = $derived.by(() => {
		const baseItems = [
			{
				label: 'Home',
				icon: withIcons ? 'fluent:home-24-regular' : undefined,
				href: '/'
			},
			{
				label: 'About',
				icon: withIcons ? 'fluent:info-24-regular' : undefined,
				href: '/about'
			}
		];

		const submenuItem = {
			label: 'Products',
			icon: withIcons ? 'fluent:box-24-regular' : undefined,
			type: 'submenu' as const,
			subitems: [
				{
					label: 'All Products',
					icon: withIcons ? 'fluent:grid-24-regular' : undefined,
					description: withDescriptions ? 'Browse our catalog' : undefined,
					href: '/products'
				},
				{
					label: 'New Arrivals',
					icon: withIcons ? 'fluent:star-24-regular' : undefined,
					description: withDescriptions ? 'Latest additions' : undefined,
					href: '/products/new'
				},
				{
					label: 'Best Sellers',
					icon: withIcons ? 'fluent:trophy-24-regular' : undefined,
					description: withDescriptions ? 'Most popular items' : undefined,
					href: '/products/best-sellers'
				}
			]
		};

		const contactItem = {
			label: 'Contact',
			icon: withIcons ? 'fluent:mail-24-regular' : undefined,
			href: '/contact'
		};

		let result = [...baseItems];

		if (withSimpleSubmenu) {
			result.push(submenuItem as any);
		}

		if (withMegamenu) {
			result.push({
				label: 'Resources',
				icon: withIcons ? 'fluent:book-24-regular' : undefined,
				type: 'megamenu' as const,
				megamenu: megamenuSnippet
			} as any);
		}

		result.push(contactItem);

		return result;
	});

	let hasProps = $derived([variant !== 'primary', size !== 'md'].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [`<script lang="ts">`, `\timport { NavMenu } from 'ui-svelte';`];

		scriptLines.push(
			`\n\tconst navMenuItems = [`,
			`\t\t{`,
			`\t\t\tlabel: 'Home',`,
			withIcons ? `\t\t\ticon: 'fluent:home-24-regular',` : '',
			`\t\t\thref: '/'`,
			`\t\t},`,
			`\t\t{`,
			`\t\t\tlabel: 'About',`,
			withIcons ? `\t\t\ticon: 'fluent:info-24-regular',` : '',
			`\t\t\thref: '/about'`,
			`\t\t}`
		);

		if (withSimpleSubmenu) {
			scriptLines.push(
				`\t\t{`,
				`\t\t\tlabel: 'Products',`,
				withIcons ? `\t\t\ticon: 'fluent:box-24-regular',` : '',
				`\t\t\ttype: 'submenu',`,
				`\t\t\tsubitems: [`,
				`\t\t\t\t{`,
				`\t\t\t\t\tlabel: 'All Products',`,
				withIcons ? `\t\t\t\t\ticon: 'fluent:grid-24-regular',` : '',
				withDescriptions ? `\t\t\t\t\tdescription: 'Browse our catalog',` : '',
				`\t\t\t\t\thref: '/products'`,
				`\t\t\t\t},`,
				`\t\t\t\t{`,
				`\t\t\t\t\tlabel: 'New Arrivals',`,
				withIcons ? `\t\t\t\t\ticon: 'fluent:star-24-regular',` : '',
				withDescriptions ? `\t\t\t\t\tdescription: 'Latest additions',` : '',
				`\t\t\t\t\thref: '/products/new'`,
				`\t\t\t\t},`,
				`\t\t\t\t{`,
				`\t\t\t\t\tlabel: 'Best Sellers',`,
				withIcons ? `\t\t\t\t\ticon: 'fluent:trophy-24-regular',` : '',
				withDescriptions ? `\t\t\t\t\tdescription: 'Most popular items',` : '',
				`\t\t\t\t\thref: '/products/best-sellers'`,
				`\t\t\t\t}`,
				`\t\t\t]`,
				`\t\t},`
			);
		}

		if (withMegamenu) {
			scriptLines.push(
				`\t\t{`,
				`\t\t\tlabel: 'Resources',`,
				withIcons ? `\t\t\ticon: 'fluent:book-24-regular',` : '',
				`\t\t\ttype: 'megamenu',`,
				`\t\t\tmegamenu: megamenuSnippet`,
				`\t\t},`
			);
		}

		scriptLines.push(
			`\t\t{`,
			`\t\t\tlabel: 'Contact',`,
			withIcons ? `\t\t\ticon: 'fluent:mail-24-regular',` : '',
			`\t\t\thref: '/contact'`,
			`\t\t}`,
			`\t];`,
			`<\/script>`
		);

		const snippetLines = [];
		if (withMegamenu) {
			snippetLines.push(
				``,
				`{#snippet megamenuSnippet()}`,
				`\t<div class="grid-3 gap-6 p-4 min-w-[600px]">`,
				`\t\t<!-- Your custom megamenu content -->`,
				`\t</div>`,
				`{/snippet}`
			);
		}

		const componentLines = [
			hasProps && `<NavMenu`,
			hasProps && `\titems={navMenuItems}`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			hasProps && `/>`,
			!hasProps && `<NavMenu items={navMenuItems} />`
		].filter(Boolean);

		return [...scriptLines, ...snippetLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'items', type: 'MenuItem[]', initial: '[]', required: true },
		{ prop: 'variant', type: 'primary | secondary | muted', initial: 'primary' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	const menuItemProps = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconName', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(item: MenuItem) => void', initial: '' },
		{ prop: 'subitems', type: 'SubmenuItem[]', initial: '[]' },
		{ prop: 'megamenu', type: 'Snippet', initial: '' },
		{ prop: 'type', type: "'item' | 'submenu' | 'megamenu'", initial: 'item' }
	];

	const submenuItemProps = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconName', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(item: SubmenuItem) => void', initial: '' }
	];
</script>

{#snippet megamenuSnippet()}
	<div class="grid-3 gap-6 p-4 min-w-md">
		<div>
			<div class="navmenu-header">Documentation</div>
			<div class="flex flex-col gap-1">
				<a href="/docs/getting-started" class="navmenu-submenu-item">
					<div class="navmenu-submenu-content">
						<div class="navmenu-submenu-label">Getting Started</div>
						<div class="navmenu-submenu-description">Quick start guide</div>
					</div>
				</a>
				<a href="/docs/api" class="navmenu-submenu-item">
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
				<a href="/guides/tutorials" class="navmenu-submenu-item">
					<div class="navmenu-submenu-content">
						<div class="navmenu-submenu-label">Tutorials</div>
						<div class="navmenu-submenu-description">Step by step</div>
					</div>
				</a>
				<a href="/guides/examples" class="navmenu-submenu-item">
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
				<a href="/community/discord" class="navmenu-submenu-item">
					<div class="navmenu-submenu-content">
						<div class="navmenu-submenu-label">Discord</div>
						<div class="navmenu-submenu-description">Join the chat</div>
					</div>
				</a>
				<a href="/community/github" class="navmenu-submenu-item">
					<div class="navmenu-submenu-content">
						<div class="navmenu-submenu-label">GitHub</div>
						<div class="navmenu-submenu-description">Contribute</div>
					</div>
				</a>
			</div>
		</div>
	</div>
{/snippet}

{#snippet preview()}
	<div class="col center w-full p-8">
		<div class="w-full max-w-5xl rounded-ui border border-muted bg-background p-4">
			<NavMenu items={navMenuItems} {variant} {size} />
		</div>
	</div>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />

	<DocOptions title="Features">
		<Checkbox bind:checked={withIcons} label="Icons" />
		<Checkbox bind:checked={withDescriptions} label="Descriptions" />
	</DocOptions>

	<DocOptions title="Menu Types">
		<Checkbox bind:checked={withSimpleSubmenu} label="Simple Submenu" />
		<Checkbox bind:checked={withMegamenu} label="Megamenu" />
	</DocOptions>
{/snippet}

<DocHeader title="NavMenu">
	Horizontal navigation menu component designed for AppBars and landing pages. Supports simple
	items, dropdown submenus, and customizable megamenus with rich content.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<Section class="prose mt-8">
	<h3>MenuItem Type</h3>
	<p>Each item in the items array should follow this structure:</p>
</Section>

<DocProps props={menuItemProps} />

<Section class="prose mt-8">
	<h3>SubmenuItem Type</h3>
	<p>Each subitem in the subitems array should follow this structure:</p>
</Section>

<DocProps props={submenuItemProps} />

<Section class="prose mt-8">
	<h3>Menu Types</h3>
	<ul>
		<li>
			<strong>item</strong> - Standard navigation link with optional icon
		</li>
		<li>
			<strong>submenu</strong> - Dropdown menu containing a list of navigation items with optional descriptions
		</li>
		<li>
			<strong>megamenu</strong> - Large dropdown with custom content using Svelte snippets for complex
			layouts
		</li>
	</ul>

	<h3>Features</h3>
	<ul>
		<li>Automatic active state detection based on current route</li>
		<li>Intelligent popover positioning (auto-adjusts to avoid viewport edges)</li>
		<li>Support for icons and descriptions in submenu items</li>
		<li>Customizable megamenus with full HTML/Svelte snippet support</li>
		<li>Three color variants: primary, secondary, and muted</li>
		<li>Click-outside detection to automatically close dropdowns</li>
		<li>Responsive sizing with sm, md, and lg options</li>
		<li>Smooth transitions and animations</li>
	</ul>

	<h3>Megamenu Example</h3>
	<p>
		Megamenus use Svelte snippets for completely custom content. Define your snippet and pass it to
		the menu item:
	</p>
	<pre><code
			>{`{#snippet megamenuContent()}
  <div class="grid grid-cols-3 gap-6 p-4">
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

const items = [
  {
    label: 'Resources',
    type: 'megamenu',
    megamenu: megamenuContent  // Pass the snippet reference
  }
];`}</code
		></pre>

	<h3>Available CSS Classes for Megamenus</h3>
	<ul>
		<li><code>.navmenu-header</code> - Section header styling</li>
		<li><code>.navmenu-submenu-item</code> - Individual menu item</li>
		<li><code>.navmenu-submenu-content</code> - Content wrapper</li>
		<li><code>.navmenu-submenu-label</code> - Item label</li>
		<li><code>.navmenu-submenu-description</code> - Item description</li>
		<li><code>.navmenu-divider</code> - Horizontal divider</li>
	</ul>

	<h3>Best Practices</h3>
	<ul>
		<li>Keep the top-level menu items concise (3-7 items is ideal)</li>
		<li>Use megamenus for content-rich sections that benefit from visual organization</li>
		<li>Use simple submenus for straightforward navigation hierarchies</li>
		<li>Include descriptions in submenus to help users understand their options</li>
		<li>Ensure megamenu content is well-organized with clear headers and groupings</li>
		<li>Consider mobile responsiveness when designing megamenu layouts</li>
		<li>Define snippets outside the items array for better readability</li>
	</ul>

	<h3>Use Cases</h3>
	<ul>
		<li>Primary navigation in application headers</li>
		<li>Landing page navigation with marketing content</li>
		<li>E-commerce category navigation</li>
		<li>Documentation site navigation</li>
		<li>Multi-level navigation hierarchies</li>
	</ul>
</Section>
