<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Footer, Checkbox, FooterNav, FooterGroup, Divider, Select, Button } from 'ui-svelte';

	type ExampleType = 'simple' | 'multi-column' | 'social' | 'newsletter';
	let exampleType = $state<ExampleType>('simple');

	const exampleOptions = [
		{ id: 'simple', label: 'Simple Footer' },
		{ id: 'multi-column', label: 'Multi-Column Footer' },
		{ id: 'social', label: 'Footer with Social Links' },
		{ id: 'newsletter', label: 'Footer with Newsletter' }
	];

	// Simple footer state
	let showStart = $state(true);
	let showCenter = $state(true);
	let showEnd = $state(true);
	let isBlurred = $state(false);
	let isBordered = $state(true);
	let hideOnScroll = $state(false);

	let hasProps = $derived(
		[showStart, showCenter, showEnd, isBlurred, isBordered, hideOnScroll].some(Boolean)
	);

	const navLinks = [
		{ label: 'About', href: '/about' },
		{ label: 'Privacy', href: '/privacy' },
		{ label: 'Terms', href: '/terms' },
		{ label: 'Contact', href: '/contact' }
	];

	const productLinks = [
		{ label: 'Features', href: '/features' },
		{ label: 'Pricing', href: '/pricing' },
		{ label: 'Documentation', href: '/docs' }
	];

	const companyLinks = [
		{ label: 'About Us', href: '/about' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Careers', href: '/careers' }
	];

	const legalLinks = [
		{ label: 'Privacy Policy', href: '/privacy' },
		{ label: 'Terms of Service', href: '/terms' },
		{ label: 'Cookie Policy', href: '/cookies' }
	];

	const supportLinks = [
		{ label: 'Help Center', href: '/help' },
		{ label: 'Contact Support', href: '/support' },
		{ label: 'Status', href: '/status' }
	];

	let simpleCode = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Footer, FooterNav } from 'ui-svelte';`,
			showCenter && `\n\tconst navLinks = [`,
			showCenter && `\t\t{ label: 'About', href: '/about' },`,
			showCenter && `\t\t{ label: 'Privacy', href: '/privacy' },`,
			showCenter && `\t\t{ label: 'Terms', href: '/terms' },`,
			showCenter && `\t\t{ label: 'Contact', href: '/contact' }`,
			showCenter && `\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Footer`,
			isBlurred && `\tisBlurred`,
			isBordered && `\tisBordered`,
			hideOnScroll && `\thideOnScroll`,
			hasProps && `>`,
			!hasProps && `<Footer>`,
			showStart && `\t{#snippet start()}`,
			showStart &&
				`\t\t<p class="text-sm text-muted-foreground">© {new Date().getFullYear()} Company</p>`,
			showStart && `\t{/snippet}\n`,
			showCenter && `\t{#snippet center()}`,
			showCenter && `\t\t<FooterNav links={navLinks} />`,
			showCenter && `\t{/snippet}\n`,
			showEnd && `\t{#snippet end()}`,
			showEnd && `\t\t<p class="text-sm text-muted-foreground">Made with ❤️</p>`,
			showEnd && `\t{/snippet}`,
			!showStart && !showCenter && !showEnd && `\t<p class="p-4">Footer content</p>`,
			`</Footer>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const multiColumnCode = `<script lang="ts">
\timport { Footer, FooterGroup, Divider } from 'ui-svelte';

\tconst productLinks = [
\t\t{ label: 'Features', href: '/features' },
\t\t{ label: 'Pricing', href: '/pricing' },
\t\t{ label: 'Documentation', href: '/docs' }
\t];

\tconst companyLinks = [
\t\t{ label: 'About Us', href: '/about' },
\t\t{ label: 'Blog', href: '/blog' },
\t\t{ label: 'Careers', href: '/careers' }
\t];

\tconst legalLinks = [
\t\t{ label: 'Privacy Policy', href: '/privacy' },
\t\t{ label: 'Terms of Service', href: '/terms' },
\t\t{ label: 'Cookie Policy', href: '/cookies' }
\t];

\tconst supportLinks = [
\t\t{ label: 'Help Center', href: '/help' },
\t\t{ label: 'Contact Support', href: '/support' },
\t\t{ label: 'Status', href: '/status' }
\t];
<\/script>

<Footer isBordered>
\t{#snippet center()}
\t\t<div class="column gap-8 w-full max-w-6xl py-4">
\t\t\t<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
\t\t\t\t<FooterGroup title="Product" links={productLinks} />
\t\t\t\t<FooterGroup title="Company" links={companyLinks} />
\t\t\t\t<FooterGroup title="Support" links={supportLinks} />
\t\t\t\t<FooterGroup title="Legal" links={legalLinks} />
\t\t\t</div>
\t\t\t<Divider />
\t\t\t<p class="text-sm text-muted-foreground text-center">
\t\t\t\t© {new Date().getFullYear()} Company. All rights reserved.
\t\t\t</p>
\t\t</div>
\t{/snippet}
</Footer>`;

	const socialCode = `<script lang="ts">
\timport { Footer, FooterNav, Divider } from 'ui-svelte';

\tconst navLinks = [
\t\t{ label: 'About', href: '/about' },
\t\t{ label: 'Privacy', href: '/privacy' },
\t\t{ label: 'Terms', href: '/terms' }
\t];
<\/script>

<Footer isBordered>
\t{#snippet center()}
\t\t<div class="column gap-6 w-full max-w-6xl py-4">
\t\t\t<div class="row items-center justify-between gap-4 flex-wrap">
\t\t\t\t<div class="column gap-2">
\t\t\t\t\t<h3 class="font-semibold">Company Name</h3>
\t\t\t\t\t<p class="text-sm text-muted-foreground">Building amazing products</p>
\t\t\t\t</div>
\t\t\t\t<div class="row gap-4">
\t\t\t\t\t<a href="#" class="text-muted-foreground hover:text-foreground transition-colors">
\t\t\t\t\t\t<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
\t\t\t\t\t\t\t<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
\t\t\t\t\t\t</svg>
\t\t\t\t\t</a>
\t\t\t\t\t<a href="#" class="text-muted-foreground hover:text-foreground transition-colors">
\t\t\t\t\t\t<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
\t\t\t\t\t\t\t<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
\t\t\t\t\t\t</svg>
\t\t\t\t\t</a>
\t\t\t\t\t<a href="#" class="text-muted-foreground hover:text-foreground transition-colors">
\t\t\t\t\t\t<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
\t\t\t\t\t\t\t<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
\t\t\t\t\t\t</svg>
\t\t\t\t\t</a>
\t\t\t\t</div>
\t\t\t</div>
\t\t\t<Divider />
\t\t\t<div class="row items-center justify-between gap-4 flex-wrap">
\t\t\t\t<FooterNav links={navLinks} />
\t\t\t\t<p class="text-sm text-muted-foreground">
\t\t\t\t\t© {new Date().getFullYear()} Company. All rights reserved.
\t\t\t\t</p>
\t\t\t</div>
\t\t</div>
\t{/snippet}
</Footer>`;

	const newsletterCode = `<script lang="ts">
\timport { Footer, FooterGroup, Divider, Input, Button } from 'ui-svelte';

\tconst productLinks = [
\t\t{ label: 'Features', href: '/features' },
\t\t{ label: 'Pricing', href: '/pricing' }
\t];

\tconst companyLinks = [
\t\t{ label: 'About', href: '/about' },
\t\t{ label: 'Blog', href: '/blog' }
\t];

\tconst legalLinks = [
\t\t{ label: 'Privacy', href: '/privacy' },
\t\t{ label: 'Terms', href: '/terms' }
\t];
<\/script>

<Footer isBordered>
\t{#snippet center()}
\t\t<div class="column gap-8 w-full max-w-6xl py-4">
\t\t\t<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
\t\t\t\t<div class="column gap-4 md:col-span-1">
\t\t\t\t\t<h3 class="font-semibold">Stay Updated</h3>
\t\t\t\t\t<p class="text-sm text-muted-foreground">
\t\t\t\t\t\tSubscribe to our newsletter for the latest updates.
\t\t\t\t\t</p>
\t\t\t\t\t<div class="column gap-2">
\t\t\t\t\t\t<Input type="email" placeholder="Enter your email" size="sm" />
\t\t\t\t\t\t<Button size="sm" variant="primary">Subscribe</Button>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t<FooterGroup title="Product" links={productLinks} />
\t\t\t\t<FooterGroup title="Company" links={companyLinks} />
\t\t\t\t<FooterGroup title="Legal" links={legalLinks} />
\t\t\t</div>
\t\t\t<Divider />
\t\t\t<p class="text-sm text-muted-foreground text-center">
\t\t\t\t© {new Date().getFullYear()} Company. All rights reserved.
\t\t\t</p>
\t\t</div>
\t{/snippet}
</Footer>`;

	const props = [
		{ prop: 'start', type: 'Snippet', initial: '' },
		{ prop: 'center', type: 'Snippet', initial: '' },
		{ prop: 'end', type: 'Snippet', initial: '' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'contentClass', type: 'string', initial: '' },
		{ prop: 'startClass', type: 'string', initial: '' },
		{ prop: 'centerClass', type: 'string', initial: '' },
		{ prop: 'endClass', type: 'string', initial: '' },
		{ prop: 'isBlurred', type: 'boolean', initial: 'false' },
		{ prop: 'isBordered', type: 'boolean', initial: 'false' },
		{ prop: 'hideOnScroll', type: 'boolean', initial: 'false' }
	];

	const footerNavProps = [
		{ prop: 'links', type: 'FooterLink[]', initial: '[]' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	const footerGroupProps = [
		{ prop: 'title', type: 'string', initial: '' },
		{ prop: 'links', type: 'FooterLink[]', initial: '[]' },
		{ prop: 'children', type: 'Snippet', initial: '' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

{#snippet simpleStart()}
	<p class="text-sm text-muted-foreground">© {new Date().getFullYear()} Company</p>
{/snippet}

{#snippet simpleCenter()}
	<FooterNav links={navLinks} />
{/snippet}

{#snippet simpleEnd()}
	<p class="text-sm text-muted-foreground">Made with ❤️</p>
{/snippet}

{#snippet multiColumnCenter()}
	<div class="column gap-8 w-full max-w-6xl py-4">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<FooterGroup title="Product" links={productLinks} />
			<FooterGroup title="Company" links={companyLinks} />
			<FooterGroup title="Support" links={supportLinks} />
			<FooterGroup title="Legal" links={legalLinks} />
		</div>
		<Divider />
		<p class="text-sm text-muted-foreground text-center">
			© {new Date().getFullYear()} Company. All rights reserved.
		</p>
	</div>
{/snippet}

{#snippet socialCenter()}
	<div class="column gap-6 w-full max-w-6xl py-4">
		<div class="row items-center justify-between gap-4 flex-wrap">
			<div class="column gap-2">
				<h3 class="font-semibold">Company Name</h3>
				<p class="text-sm text-muted-foreground">Building amazing products</p>
			</div>
			<div class="row gap-4">
				<a href="#" class="text-muted-foreground hover:text-foreground transition-colors">
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
						/>
					</svg>
				</a>
				<a href="#" class="text-muted-foreground hover:text-foreground transition-colors">
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
				</a>
				<a href="#" class="text-muted-foreground hover:text-foreground transition-colors">
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
						/>
					</svg>
				</a>
			</div>
		</div>
		<Divider />
		<div class="row items-center justify-between gap-4 flex-wrap">
			<FooterNav links={navLinks} />
			<p class="text-sm text-muted-foreground">
				© {new Date().getFullYear()} Company. All rights reserved.
			</p>
		</div>
	</div>
{/snippet}

{#snippet newsletterCenter()}
	<div class="column gap-8 w-full max-w-6xl py-4">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<div class="column gap-4 md:col-span-1">
				<h3 class="font-semibold">Stay Updated</h3>
				<p class="text-sm text-muted-foreground">
					Subscribe to our newsletter for the latest updates.
				</p>
				<div class="column gap-2">
					<input
						type="email"
						placeholder="Enter your email"
						class="px-3 py-2 text-sm border border-border rounded-md bg-background"
					/>
					<Button size="sm" variant="primary">Subscribe</Button>
				</div>
			</div>
			<FooterGroup title="Product" links={productLinks} />
			<FooterGroup title="Company" links={companyLinks} />
			<FooterGroup title="Legal" links={legalLinks} />
		</div>
		<Divider />
		<p class="text-sm text-muted-foreground text-center">
			© {new Date().getFullYear()} Company. All rights reserved.
		</p>
	</div>
{/snippet}

{#snippet simplePreview()}
	<div
		class="w-full min-h-[200px] border border-border rounded-lg overflow-hidden bg-background relative"
	>
		<div class="p-6 pb-20">
			<p class="text-sm text-muted-foreground">Page content above the Footer</p>
		</div>
		<Footer
			start={showStart ? simpleStart : undefined}
			center={showCenter ? simpleCenter : undefined}
			end={showEnd ? simpleEnd : undefined}
			{isBlurred}
			{isBordered}
			{hideOnScroll}
		/>
	</div>
{/snippet}

{#snippet multiColumnPreview()}
	<div
		class="w-full min-h-[400px] border border-border rounded-lg overflow-hidden bg-background relative"
	>
		<div class="p-6 pb-20">
			<p class="text-sm text-muted-foreground">Page content above the Footer</p>
		</div>
		<Footer center={multiColumnCenter} isBordered />
	</div>
{/snippet}

{#snippet socialPreview()}
	<div
		class="w-full min-h-[400px] border border-border rounded-lg overflow-hidden bg-background relative"
	>
		<div class="p-6 pb-20">
			<p class="text-sm text-muted-foreground">Page content above the Footer</p>
		</div>
		<Footer center={socialCenter} isBordered />
	</div>
{/snippet}

{#snippet newsletterPreview()}
	<div
		class="w-full min-h-[400px] border border-border rounded-lg overflow-hidden bg-background relative"
	>
		<div class="p-6 pb-20">
			<p class="text-sm text-muted-foreground">Page content above the Footer</p>
		</div>
		<Footer center={newsletterCenter} isBordered />
	</div>
{/snippet}

{#snippet builder()}
	<Select label="Example Type" size="sm" options={exampleOptions} bind:value={exampleType} />

	{#if exampleType === 'simple'}
		<DocOptions title="Sections">
			<Checkbox bind:checked={showStart} label="Start" />
			<Checkbox bind:checked={showCenter} label="Center" />
			<Checkbox bind:checked={showEnd} label="End" />
		</DocOptions>

		<DocOptions title="Properties">
			<Checkbox bind:checked={isBlurred} label="Blurred" />
			<Checkbox bind:checked={isBordered} label="Bordered" />
			<Checkbox bind:checked={hideOnScroll} label="Hide on scroll" />
		</DocOptions>
	{/if}
{/snippet}

<DocHeader title="Footer">
	Footers display information and actions at the bottom of a screen. They are ideal for copyright
	notices, navigation links, and secondary actions.
</DocHeader>

<DocPreview {builder}>
	{#if exampleType === 'simple'}
		{@render simplePreview()}
	{:else if exampleType === 'multi-column'}
		{@render multiColumnPreview()}
	{:else if exampleType === 'social'}
		{@render socialPreview()}
	{:else if exampleType === 'newsletter'}
		{@render newsletterPreview()}
	{/if}
</DocPreview>

<DocCode
	code={exampleType === 'simple'
		? simpleCode()
		: exampleType === 'multi-column'
			? multiColumnCode
			: exampleType === 'social'
				? socialCode
				: newsletterCode}
/>

<div class="prose-doc">
	<h2>Footer Components</h2>

	<h3>FooterNav</h3>
	<p>
		<code>FooterNav</code> provides horizontal navigation links that are responsive and support active
		state detection. Perfect for simple footer navigation.
	</p>
	<DocProps props={footerNavProps} />

	<h3>FooterGroup</h3>
	<p>
		<code>FooterGroup</code> creates organized sections with a title and vertical list of links. Ideal
		for advanced footers with multiple categories.
	</p>
	<DocProps props={footerGroupProps} />

	<h2>Footer Props</h2>
	<DocProps {props} />
</div>
