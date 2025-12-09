<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { SideNav, Select, Checkbox, Section } from 'ui-svelte';

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

	// Selects
	let variant: any = $state('primary');
	let size: any = $state('md');

	// States
	let withIcons = $state(true);
	let withDescriptions = $state(false);
	let withStatus = $state(false);
	let withDividers = $state(false);
	let withHeaders = $state(false);
	let withSubmenu = $state(true);
	let isWide = $state(false);
	let isCompact = $state(false);
	let isCollapsible = $state(false);

	let items: any = $derived.by(() => {
		const baseItems = [
			{
				label: 'Dashboard',
				icon: withIcons ? 'fluent:home-24-regular' : undefined,
				description: withDescriptions ? 'Main overview' : undefined,
				href: '/dashboard',
				status: withStatus ? '3' : undefined
			},
			{
				label: 'Projects',
				icon: withIcons ? 'fluent:folder-24-regular' : undefined,
				description: withDescriptions ? 'Your projects' : undefined,
				href: '/projects',
				status: withStatus ? 'New' : undefined
			},
			{
				label: 'Team',
				icon: withIcons ? 'fluent:people-24-regular' : undefined,
				description: withDescriptions ? 'Team members' : undefined,
				href: '/team'
			}
		];

		const submenuItem = {
			type: 'submenu' as const,
			label: 'Settings',
			icon: withIcons ? 'fluent:settings-24-regular' : undefined,
			description: withDescriptions ? 'Configuration' : undefined,
			open: true,
			subitems: [
				{
					label: 'Profile',
					icon: withIcons ? 'fluent:person-24-regular' : undefined,
					description: withDescriptions ? 'Edit profile' : undefined,
					href: '/settings/profile'
				},
				{
					label: 'Security',
					icon: withIcons ? 'fluent:shield-24-regular' : undefined,
					description: withDescriptions ? 'Security settings' : undefined,
					href: '/settings/security',
					status: withStatus ? '!' : undefined
				},
				{
					label: 'Notifications',
					icon: withIcons ? 'fluent:alert-24-regular' : undefined,
					description: withDescriptions ? 'Manage alerts' : undefined,
					href: '/settings/notifications'
				}
			]
		};

		let result = [...baseItems];

		if (withDividers) {
			result.splice(2, 0, { type: 'divider' as const });
		}

		if (withHeaders) {
			result.unshift({
				type: 'header' as const,
				label: 'Navigation',
				icon: withIcons ? 'fluent:navigation-24-regular' : undefined,
				description: withDescriptions ? 'Main menu' : undefined
			});
		}

		if (withSubmenu) {
			result.push(submenuItem as any);
		}

		return result;
	});

	let hasProps = $derived(
		[variant !== 'primary', size !== 'md', isWide, isCompact, isCollapsible].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { SideNav } from 'ui-svelte';`,
			`\n\tconst items = [`
		];

		if (withHeaders) {
			scriptLines.push(
				`\t\t{`,
				`\t\t\ttype: 'header',`,
				`\t\t\tlabel: 'Navigation'${withIcons ? ",\n\t\t\ticon: 'fluent:navigation-24-regular'" : ''}${withDescriptions ? ",\n\t\t\tdescription: 'Main menu'" : ''}`,
				`\t\t},`
			);
		}

		scriptLines.push(
			`\t\t{`,
			`\t\t\tlabel: 'Dashboard',`,
			withIcons ? `\t\t\ticon: 'fluent:home-24-regular',` : '',
			withDescriptions ? `\t\t\tdescription: 'Main overview',` : '',
			`\t\t\thref: '/dashboard'${withStatus ? ",\n\t\t\tstatus: '3'" : ''}`,
			`\t\t},`,
			`\t\t{`,
			`\t\t\tlabel: 'Projects',`,
			withIcons ? `\t\t\ticon: 'fluent:folder-24-regular',` : '',
			withDescriptions ? `\t\t\tdescription: 'Your projects',` : '',
			`\t\t\thref: '/projects'${withStatus ? ",\n\t\t\tstatus: 'New'" : ''}`,
			`\t\t},`
		);

		if (withDividers) {
			scriptLines.push(`\t\t{ type: 'divider' },`);
		}

		scriptLines.push(
			`\t\t{`,
			`\t\t\tlabel: 'Team',`,
			withIcons ? `\t\t\ticon: 'fluent:people-24-regular',` : '',
			withDescriptions ? `\t\t\tdescription: 'Team members',` : '',
			`\t\t\thref: '/team'`,
			`\t\t}`
		);

		if (withSubmenu) {
			scriptLines.push(
				`\t\t{`,
				`\t\t\ttype: 'submenu',`,
				`\t\t\tlabel: 'Settings',`,
				withIcons ? `\t\t\ticon: 'fluent:settings-24-regular',` : '',
				withDescriptions ? `\t\t\tdescription: 'Configuration',` : '',
				`\t\t\topen: true,`,
				`\t\t\tsubitems: [`,
				`\t\t\t\t{`,
				`\t\t\t\t\tlabel: 'Profile',`,
				withIcons ? `\t\t\t\t\ticon: 'fluent:person-24-regular',` : '',
				withDescriptions ? `\t\t\t\t\tdescription: 'Edit profile',` : '',
				`\t\t\t\t\thref: '/settings/profile'`,
				`\t\t\t\t},`,
				`\t\t\t\t{`,
				`\t\t\t\t\tlabel: 'Security',`,
				withIcons ? `\t\t\t\t\ticon: 'fluent:shield-24-regular',` : '',
				withDescriptions ? `\t\t\t\t\tdescription: 'Security settings',` : '',
				`\t\t\t\t\thref: '/settings/security'${withStatus ? ",\n\t\t\t\t\tstatus: '!'" : ''}`,
				`\t\t\t\t},`,
				`\t\t\t\t{`,
				`\t\t\t\t\tlabel: 'Notifications',`,
				withIcons ? `\t\t\t\t\ticon: 'fluent:alert-24-regular',` : '',
				withDescriptions ? `\t\t\t\t\tdescription: 'Manage alerts',` : '',
				`\t\t\t\t\thref: '/settings/notifications'`,
				`\t\t\t\t}`,
				`\t\t\t]`,
				`\t\t}`
			);
		}

		scriptLines.push(`\t];`, `<\/script>`);

		const componentLines = [
			hasProps && `<SideNav`,
			hasProps && `\t{items}`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			isWide && `\tisWide`,
			isCompact && `\tisCompact`,
			isCollapsible && `\tisCollapsible`,
			hasProps && `/>`,
			!hasProps && `<SideNav {items} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'items', type: 'NavItem[]', initial: '[]', required: true },
		{ prop: 'variant', type: 'primary | secondary | muted', initial: 'primary' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'isWide', type: 'boolean', initial: 'false' },
		{ prop: 'isCompact', type: 'boolean', initial: 'false' },
		{ prop: 'isCollapsible', type: 'boolean', initial: 'false' }
	];

	const navItemProps = [
		{ prop: 'type', type: "'item' | 'divider' | 'header' | 'submenu'", initial: 'item' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconName', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(item: NavItem) => void', initial: '' },
		{ prop: 'status', type: 'string | Snippet', initial: '' },
		{ prop: 'subitems', type: 'SubmenuItem[]', initial: '[]' },
		{ prop: 'open', type: 'boolean', initial: 'false' }
	];

	const submenuItemProps = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(item: SubmenuItem) => void', initial: '' },
		{ prop: 'icon', type: 'IconName', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'status', type: 'string | Snippet', initial: '' }
	];
</script>

{#snippet preview()}
	<div class="row center h-96 overflow-hidden p-4 w-64">
		<SideNav {items} {variant} {size} {isWide} {isCompact} {isCollapsible} />
	</div>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />

	<DocOptions title="Item Features">
		<Checkbox bind:checked={withIcons} label="Icons" />
		<Checkbox bind:checked={withDescriptions} label="Descriptions" />
		<Checkbox bind:checked={withStatus} label="Status Badges" />
	</DocOptions>

	<DocOptions title="Structure">
		<Checkbox bind:checked={withHeaders} label="Headers" />
		<Checkbox bind:checked={withDividers} label="Dividers" />
		<Checkbox bind:checked={withSubmenu} label="Submenu" />
	</DocOptions>

	<DocOptions title="Layout">
		<Checkbox bind:checked={isWide} label="Wide" />
		<Checkbox bind:checked={isCompact} label="Compact" />
		<Checkbox bind:checked={isCollapsible} label="Collapsible" />
	</DocOptions>
{/snippet}

<DocHeader title="SideNav">
	Side navigation components provide a vertical menu for navigating between different sections of an
	application.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<Section class="prose mt-8">
	<h3>NavItem Type</h3>
	<p>Each item in the items array should follow this structure:</p>
</Section>

<DocProps props={navItemProps} />

<Section class="prose mt-8">
	<h3>SubmenuItem Type</h3>
	<p>Each subitem in the subitems array should follow this structure:</p>
</Section>

<DocProps props={submenuItemProps} />

<Section class="prose mt-8">
	<h3>Item Types</h3>
	<ul>
		<li>
			<strong>item</strong> - Standard navigation item with optional icon, description, and status
		</li>
		<li><strong>divider</strong> - Visual separator between groups of items</li>
		<li><strong>header</strong> - Section header to organize navigation groups</li>
		<li>
			<strong>submenu</strong> - Collapsible menu containing nested navigation items
		</li>
	</ul>

	<h3>Layout Variants</h3>
	<ul>
		<li><strong>isWide</strong> - Makes the navigation take full width of its container</li>
		<li><strong>isCompact</strong> - Reduces padding for a more condensed layout</li>
		<li>
			<strong>isCollapsible</strong> - Creates a collapsible sidebar that expands on hover (64px collapsed,
			256px expanded)
		</li>
	</ul>

	<h3>Features</h3>
	<ul>
		<li>Automatic active state detection based on current route</li>
		<li>Collapsible submenus with smooth slide transitions</li>
		<li>Support for icons, descriptions, and status badges</li>
		<li>Hover-to-expand functionality with <code>isCollapsible</code></li>
		<li>Three color variants: primary, secondary, and muted</li>
		<li>Click handlers for custom navigation logic</li>
		<li>Responsive sizing with sm, md, and lg options</li>
	</ul>
</Section>
