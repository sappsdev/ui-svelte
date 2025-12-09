<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { BottomNav, Select, Checkbox, Section } from 'ui-svelte';

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
	let showLabels = $state(true);

	let bottomNavItems: any = $derived([
		{
			id: 'home',
			label: 'Home',
			icon: 'fluent:home-24-regular',
			href: '/'
		},
		{
			id: 'search',
			label: 'Search',
			icon: 'fluent:search-24-regular',
			href: '/search'
		},
		{
			id: 'favorites',
			label: 'Favorites',
			icon: 'fluent:heart-24-regular',
			href: '/favorites'
		},
		{
			id: 'profile',
			label: 'Profile',
			icon: 'fluent:person-24-regular',
			href: '/profile'
		}
	]);

	let hasProps = $derived([variant !== 'primary', size !== 'md', !showLabels].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { BottomNav } from 'ui-svelte';`,
			``,
			`\tconst items = [`,
			`\t\t{`,
			`\t\t\tid: 'home',`,
			`\t\t\tlabel: 'Home',`,
			`\t\t\ticon: 'fluent:home-24-regular',`,
			`\t\t\thref: '/'`,
			`\t\t},`,
			`\t\t{`,
			`\t\t\tid: 'search',`,
			`\t\t\tlabel: 'Search',`,
			`\t\t\ticon: 'fluent:search-24-regular',`,
			`\t\t\thref: '/search'`,
			`\t\t},`,
			`\t\t{`,
			`\t\t\tid: 'favorites',`,
			`\t\t\tlabel: 'Favorites',`,
			`\t\t\ticon: 'fluent:heart-24-regular',`,
			`\t\t\thref: '/favorites'`,
			`\t\t},`,
			`\t\t{`,
			`\t\t\tid: 'profile',`,
			`\t\t\tlabel: 'Profile',`,
			`\t\t\ticon: 'fluent:person-24-regular',`,
			`\t\t\thref: '/profile'`,
			`\t\t}`,
			`\t];`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<BottomNav`,
			hasProps && `\titems={items}`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			!showLabels && `\tshowLabels={false}`,
			hasProps && `/>`,
			!hasProps && `<BottomNav items={items} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'items', type: 'BottomNavItem[]', initial: '[]', required: true },
		{ prop: 'variant', type: 'primary | secondary | muted', initial: 'primary' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'showLabels', type: 'boolean', initial: 'true' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	const itemProps = [
		{ prop: 'id', type: 'string', initial: '', required: true },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'icon', type: 'ComponentType', initial: '', required: true },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(item: BottomNavItem) => void', initial: '' }
	];
</script>

{#snippet preview()}
	<div class="col center w-full p-8 pb-32">
		<div class="w-full max-w-md rounded-ui border border-muted bg-background relative h-96">
			<div class="absolute inset-0 flex items-center justify-center text-on-muted">
				<p class="text-center">
					Mobile Navigation Preview<br />
					<span class="text-sm">Scroll down to see the bottom navigation</span>
				</p>
			</div>
			<BottomNav items={bottomNavItems} {variant} {size} {showLabels} />
		</div>
	</div>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />

	<DocOptions title="Options">
		<Checkbox bind:checked={showLabels} label="Show Labels" />
	</DocOptions>
{/snippet}

<DocHeader title="BottomNav">
	Mobile-style bottom navigation component with icons and optional labels, similar to Flutter's
	BottomNavigationBar. Perfect for mobile applications and responsive layouts.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<Section class="prose mt-8">
	<h3>BottomNavItem Type</h3>
	<p>Each item in the items array should follow this structure:</p>
</Section>

<DocProps props={itemProps} />

<Section class="prose mt-8">
	<h3>Features</h3>
	<ul>
		<li>Automatic active state detection based on current route</li>
		<li>Fixed positioning at the bottom of the viewport</li>
		<li>Safe area support for mobile devices (notches, home indicators)</li>
		<li>Optional labels with icon-only mode</li>
		<li>Three color variants: primary, secondary, and muted</li>
		<li>Responsive sizing with sm, md, and lg options</li>
		<li>Smooth transitions and hover effects</li>
		<li>Support for both navigation links and click handlers</li>
	</ul>

	<h3>Usage Guidelines</h3>
	<ul>
		<li>Keep navigation items to 3-5 for optimal mobile UX</li>
		<li>Use clear, recognizable icons that represent their function</li>
		<li>Labels should be short (1-2 words maximum)</li>
		<li>Consider using icon-only mode for space-constrained layouts</li>
		<li>Ensure icons have sufficient contrast for accessibility</li>
		<li>The active state should clearly indicate the current section</li>
	</ul>

	<h3>Mobile Considerations</h3>
	<ul>
		<li>
			The component includes <code>padding-bottom: env(safe-area-inset-bottom)</code> for devices with
			notches or home indicators
		</li>
		<li>Fixed positioning ensures the navigation stays visible while scrolling</li>
		<li>Touch targets are sized appropriately for mobile interaction</li>
		<li>Consider the navigation height when laying out your main content</li>
	</ul>

	<h3>Icon-Only Mode</h3>
	<p>
		Set <code>showLabels={'{false}'}</code> to hide labels and show only icons. This is useful for:
	</p>
	<ul>
		<li>Compact layouts with limited vertical space</li>
		<li>When icons are universally recognizable</li>
		<li>Minimalist design aesthetics</li>
	</ul>

	<h3>Click Handlers vs Links</h3>
	<p>Each item can use either:</p>
	<ul>
		<li>
			<code>href</code> - For navigation to different routes (uses SvelteKit's client-side routing)
		</li>
		<li><code>onclick</code> - For custom actions like opening modals or triggering functions</li>
	</ul>

	<h3>Best Practices</h3>
	<ul>
		<li>Use consistent icon styles (all outlined or all filled)</li>
		<li>Maintain a logical order (e.g., Home first, Profile last)</li>
		<li>Avoid changing the number of items dynamically</li>
		<li>Test on actual mobile devices to ensure comfortable tap targets</li>
		<li>Consider adding a visual indicator (badge) for notifications</li>
	</ul>

	<h3>Use Cases</h3>
	<ul>
		<li>Mobile application primary navigation</li>
		<li>Progressive web apps (PWAs)</li>
		<li>Responsive websites with mobile-first design</li>
		<li>Dashboard applications on mobile devices</li>
		<li>E-commerce mobile experiences</li>
	</ul>

	<h3>Accessibility</h3>
	<ul>
		<li>Icons should have descriptive labels for screen readers</li>
		<li>Ensure sufficient color contrast for active states</li>
		<li>Touch targets meet minimum size requirements (44x44px)</li>
		<li>Consider adding ARIA labels for better screen reader support</li>
	</ul>
</Section>
