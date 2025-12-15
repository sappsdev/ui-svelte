<script lang="ts">
	import {
		Card,
		Checkbox,
		Code,
		Footer,
		FooterNav,
		FooterGroup,
		Section,
		Select,
		Divider,
		Button
	} from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const variantOptions = [
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'danger', label: 'Danger' }
	];

	let showStart = $state(true);
	let showCenter = $state(true);
	let showEnd = $state(true);
	let isBlurred = $state(false);
	let isBordered = $state(true);
	let isBoxed = $state(false);
	let hideOnScroll = $state(false);
	let variant: any = $state('ghost');

	let hasProps = $derived(
		[isBlurred, isBordered, isBoxed, hideOnScroll, variant !== 'ghost'].some(Boolean)
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

	let code = $derived(() => {
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
			`\n<Footer`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			isBlurred && `\tisBlurred`,
			isBordered && `\tisBordered`,
			isBoxed && `\tisBoxed`,
			hideOnScroll && `\thideOnScroll`,
			`>`,
			showStart && `\t{#snippet start()}`,
			showStart && `\t\t<p class="text-sm text-on-muted">© ${new Date().getFullYear()} Company</p>`,
			showStart && `\t{/snippet}`,
			showCenter && `\n\t{#snippet center()}`,
			showCenter && `\t\t<FooterNav links={navLinks} />`,
			showCenter && `\t{/snippet}`,
			showEnd && `\n\t{#snippet end()}`,
			showEnd && `\t\t<p class="text-sm text-on-muted">Made with ❤️</p>`,
			showEnd && `\t{/snippet}`,
			`</Footer>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'start', type: 'Snippet', initial: '' },
		{ prop: 'center', type: 'Snippet', initial: '' },
		{ prop: 'end', type: 'Snippet', initial: '' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'contentClass', type: 'string', initial: '' },
		{ prop: 'startClass', type: 'string', initial: '' },
		{ prop: 'centerClass', type: 'string', initial: '' },
		{ prop: 'endClass', type: 'string', initial: '' },
		{ prop: 'isBlurred', type: 'boolean', initial: 'false' },
		{ prop: 'isBordered', type: 'boolean', initial: 'false' },
		{ prop: 'isBoxed', type: 'boolean', initial: 'false' },
		{ prop: 'hideOnScroll', type: 'boolean', initial: 'false' },
		{
			prop: 'variant',
			type: 'primary | secondary | muted | success | info | warning | danger | surface | ghost',
			initial: 'ghost'
		}
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

{#snippet startSnippet()}
	<p class="text-sm text-on-muted">© {new Date().getFullYear()} Company</p>
{/snippet}

{#snippet centerSnippet()}
	<FooterNav links={navLinks} />
{/snippet}

{#snippet endSnippet()}
	<p class="text-sm text-on-muted">Made with ❤️</p>
{/snippet}

<DocsHeader title="Footer" llmUrl="https://ui-svelte.sappsdev.com/llm/layout/footer.md">
	Display copyright notices, navigation links, and secondary actions at the bottom of a screen.
	Supports multi-column layouts, blur effects, and different variants.
</DocsHeader>

{#snippet preview()}
	<div
		class="w-full min-h-[200px] border border-border rounded-lg overflow-hidden bg-background relative"
	>
		<div class="p-6 pb-20">
			<p class="text-sm text-on-muted">Page content above the Footer</p>
		</div>
		<Footer
			start={showStart ? startSnippet : undefined}
			center={showCenter ? centerSnippet : undefined}
			end={showEnd ? endSnippet : undefined}
			{isBlurred}
			{isBordered}
			{isBoxed}
			{hideOnScroll}
			{variant}
		/>
	</div>
{/snippet}

<Section bodyClass="md:grid-3">
	<DocsPreview>
		{@render preview()}
	</DocsPreview>
	<Card>
		<div class="grid-3 gap-2">
			<Checkbox bind:checked={showStart} label="Start" />
			<Checkbox bind:checked={showCenter} label="Center" />
			<Checkbox bind:checked={showEnd} label="End" />
		</div>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<div class="grid-2 gap-2 mt-2">
			<Checkbox bind:checked={isBlurred} label="Blurred" />
			<Checkbox bind:checked={isBordered} label="Bordered" />
			<Checkbox bind:checked={isBoxed} label="Boxed" />
			<Checkbox bind:checked={hideOnScroll} label="Hide on Scroll" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Snippets Structure</h4>
		{/snippet}
		<p>The Footer uses three snippet slots for content placement:</p>
		<ul class="list-disc pl-6 space-y-2 text-sm">
			<li><strong>start</strong> - Left section, typically for copyright or branding</li>
			<li><strong>center</strong> - Middle section, for navigation links</li>
			<li><strong>end</strong> - Right section, for additional info or social links</li>
		</ul>
		<Code
			lang="svelte"
			code={`<Footer isBordered>
  {#snippet start()}
    <p>© ${new Date().getFullYear()} Company</p>
  {/snippet}

  {#snippet center()}
    <FooterNav links={navLinks} />
  {/snippet}

  {#snippet end()}
    <p>Made with ❤️</p>
  {/snippet}
</Footer>`}
		/>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Multi-Column Footer</h4>
		{/snippet}
		<p class="text-sm">
			Use FooterGroup components to create organized sections with categorized links:
		</p>
		<div class="w-full border border-border rounded-lg overflow-hidden bg-background relative">
			<Footer isBordered>
				{#snippet center()}
					<div class="column gap-8 w-full max-w-6xl py-4">
						<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
							<FooterGroup title="Product" links={productLinks} />
							<FooterGroup title="Company" links={companyLinks} />
							<FooterGroup title="Support" links={supportLinks} />
							<FooterGroup title="Legal" links={legalLinks} />
						</div>
						<Divider />
						<p class="text-sm text-on-muted text-center">
							© {new Date().getFullYear()} Company. All rights reserved.
						</p>
					</div>
				{/snippet}
			</Footer>
		</div>
		<Code
			lang="svelte"
			code={`<script lang="ts">
  import { Footer, FooterGroup, Divider } from 'ui-svelte';

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
<\/script>

<Footer isBordered>
  {#snippet center()}
    <div class="column gap-8 w-full max-w-6xl py-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <FooterGroup title="Product" links={productLinks} />
        <FooterGroup title="Company" links={companyLinks} />
        <FooterGroup title="Support" links={supportLinks} />
        <FooterGroup title="Legal" links={legalLinks} />
      </div>
      <Divider />
      <p class="text-sm text-on-muted text-center">
        © {new Date().getFullYear()} Company. All rights reserved.
      </p>
    </div>
  {/snippet}
</Footer>`}
		/>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Footer with Social Links</h4>
		{/snippet}
		<p class="text-sm">
			Combine branding, navigation, and social media links in a comprehensive footer:
		</p>
		<div class="w-full border border-border rounded-lg overflow-hidden bg-background relative">
			<Footer isBordered>
				{#snippet center()}
					<div class="column gap-6 w-full max-w-6xl py-4">
						<div class="row items-center justify-between gap-4 flex-wrap">
							<div class="column gap-2">
								<h3 class="font-semibold">Company Name</h3>
								<p class="text-sm text-on-muted">Building amazing products</p>
							</div>
							<div class="row gap-4">
								<!-- svelte-ignore a11y_consider_explicit_label -->
								<a href="#!" class="text-on-muted hover:text-foreground transition-colors">
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
										/>
									</svg>
								</a>
								<!-- svelte-ignore a11y_consider_explicit_label -->
								<a href="#!" class="text-on-muted hover:text-foreground transition-colors">
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
										/>
									</svg>
								</a>
								<!-- svelte-ignore a11y_consider_explicit_label -->
								<a href="#!" class="text-on-muted hover:text-foreground transition-colors">
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
							<p class="text-sm text-on-muted">
								© {new Date().getFullYear()} Company. All rights reserved.
							</p>
						</div>
					</div>
				{/snippet}
			</Footer>
		</div>
		<Code
			lang="svelte"
			code={`<Footer isBordered>
  {#snippet center()}
    <div class="column gap-6 w-full max-w-6xl py-4">
      <div class="row items-center justify-between gap-4 flex-wrap">
        <div class="column gap-2">
          <h3 class="font-semibold">Company Name</h3>
          <p class="text-sm text-on-muted">Building amazing products</p>
        </div>
        <div class="row gap-4">
          <!-- Social media icons -->
          <a href="#" class="text-on-muted hover:text-foreground">
            <TwitterIcon />
          </a>
          <a href="#" class="text-on-muted hover:text-foreground">
            <GitHubIcon />
          </a>
        </div>
      </div>
      <Divider />
      <div class="row items-center justify-between gap-4 flex-wrap">
        <FooterNav links={navLinks} />
        <p class="text-sm text-on-muted">
          © ${new Date().getFullYear()} Company. All rights reserved.
        </p>
      </div>
    </div>
  {/snippet}
</Footer>`}
		/>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Newsletter Footer</h4>
		{/snippet}
		<p class="text-sm">Include a newsletter signup form alongside navigation links:</p>
		<div class="w-full border border-border rounded-lg overflow-hidden bg-background relative">
			<Footer isBordered>
				{#snippet center()}
					<div class="column gap-8 w-full max-w-6xl py-4">
						<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
							<div class="column gap-4 md:col-span-1">
								<h3 class="font-semibold">Stay Updated</h3>
								<p class="text-sm text-on-muted">
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
						<p class="text-sm text-on-muted text-center">
							© {new Date().getFullYear()} Company. All rights reserved.
						</p>
					</div>
				{/snippet}
			</Footer>
		</div>
		<Code
			lang="svelte"
			code={`<script lang="ts">
  import { Footer, FooterGroup, Divider, Button } from 'ui-svelte';
<\/script>

<Footer isBordered>
  {#snippet center()}
    <div class="column gap-8 w-full max-w-6xl py-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="column gap-4">
          <h3 class="font-semibold">Stay Updated</h3>
          <p class="text-sm text-on-muted">
            Subscribe to our newsletter.
          </p>
          <div class="column gap-2">
            <input type="email" placeholder="Enter your email" />
            <Button size="sm" variant="primary">Subscribe</Button>
          </div>
        </div>
        <FooterGroup title="Product" links={productLinks} />
        <FooterGroup title="Company" links={companyLinks} />
        <FooterGroup title="Legal" links={legalLinks} />
      </div>
      <Divider />
      <p class="text-sm text-on-muted text-center">
        © ${new Date().getFullYear()} Company. All rights reserved.
      </p>
    </div>
  {/snippet}
</Footer>`}
		/>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>FooterNav Component</h4>
		{/snippet}
		<p class="text-sm">
			<code>FooterNav</code> provides horizontal navigation links that are responsive and support active
			state detection. Perfect for simple footer navigation.
		</p>
		<Code
			lang="svelte"
			code={`<script lang="ts">
  import { FooterNav } from 'ui-svelte';

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Contact', href: '/contact' }
  ];
<\/script>

<FooterNav links={navLinks} />`}
		/>
		<DocsProps props={footerNavProps} />
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>FooterGroup Component</h4>
		{/snippet}
		<p class="text-sm">
			<code>FooterGroup</code> creates organized sections with a title and vertical list of links. Ideal
			for advanced footers with multiple categories. Supports external links.
		</p>
		<Code
			lang="svelte"
			code={`<script lang="ts">
  import { FooterGroup } from 'ui-svelte';

  const links = [
    { label: 'Features', href: '/features' },
    { label: 'Documentation', href: '/docs' },
    { label: 'GitHub', href: 'https://github.com', external: true }
  ];
<\/script>

<FooterGroup title="Product" links={links} />`}
		/>
		<DocsProps props={footerGroupProps} />
	</Card>
</Section>

<DocsProps {props} />
