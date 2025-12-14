<script lang="ts">
	import {
		Card,
		Checkbox,
		Code,
		AppBar,
		NavMenu,
		Section,
		Select,
		IconButton,
		Dropdown,
		Avatar
	} from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';
	import {
		Person24RegularIcon,
		Settings24RegularIcon,
		SignOut24RegularIcon,
		LineHorizontal324RegularIcon
	} from '$lib/icons';

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
	let isSticky = $state(false);
	let isBoxed = $state(false);
	let borderOnScrollOnly = $state(false);
	let hideOnScroll = $state(false);
	let variant: any = $state('ghost');

	let hasProps = $derived(
		[
			isBlurred,
			isBordered,
			isSticky,
			isBoxed,
			borderOnScrollOnly,
			hideOnScroll,
			variant !== 'ghost'
		].some(Boolean)
	);

	const navItems = [
		{ label: 'Home', href: '#home' },
		{ label: 'Products', href: '#products' },
		{ label: 'Contact', href: '#contact' }
	];

	const profileOptions = [
		{ id: '1', label: 'Profile', icon: Person24RegularIcon, href: '#' },
		{ id: '2', label: 'Settings', icon: Settings24RegularIcon, href: '#' },
		{
			id: '3',
			label: 'Sign Out',
			icon: SignOut24RegularIcon,
			onclick: () => console.log('Logout')
		}
	];

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { AppBar, IconButton, NavMenu, Dropdown, Avatar } from 'ui-svelte';`,
			showStart && `\timport { MenuIcon } from '$lib/icons';`,
			showCenter && `\n\tconst navItems = [`,
			showCenter && `\t\t{ label: 'Home', href: '/home' },`,
			showCenter && `\t\t{ label: 'Products', href: '/products' },`,
			showCenter && `\t\t{ label: 'Contact', href: '/contact' }`,
			showCenter && `\t];`,
			showEnd && `\n\tconst profileOptions = [`,
			showEnd && `\t\t{ id: '1', label: 'Profile', href: '/profile' },`,
			showEnd && `\t\t{ id: '2', label: 'Settings', href: '/settings' },`,
			showEnd && `\t\t{ id: '3', label: 'Sign Out', onclick: () => console.log('Logout') }`,
			showEnd && `\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`\n<AppBar`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			isBlurred && `\tisBlurred`,
			isBordered && `\tisBordered`,
			borderOnScrollOnly && `\tborderOnScrollOnly`,
			isSticky && `\tisSticky`,
			isBoxed && `\tisBoxed`,
			hideOnScroll && `\thideOnScroll`,
			`>`,
			showStart && `\t{#snippet start()}`,
			showStart && `\t\t<IconButton icon={MenuIcon} variant="ghost" />`,
			showStart && `\t{/snippet}`,
			showCenter && `\n\t{#snippet center()}`,
			showCenter && `\t\t<NavMenu items={navItems} />`,
			showCenter && `\t{/snippet}`,
			showEnd && `\n\t{#snippet end()}`,
			showEnd && `\t\t<Dropdown options={profileOptions}>`,
			showEnd && `\t\t\t<Avatar src="/images/avatar.jpg" />`,
			showEnd && `\t\t</Dropdown>`,
			showEnd && `\t{/snippet}`,
			`</AppBar>`
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
		{ prop: 'borderOnScrollOnly', type: 'boolean', initial: 'false' },
		{ prop: 'hideOnScroll', type: 'boolean', initial: 'false' },
		{ prop: 'isSticky', type: 'boolean', initial: 'false' },
		{ prop: 'isBoxed', type: 'boolean', initial: 'false' },
		{
			prop: 'variant',
			type: 'primary | secondary | muted | success | info | warning | danger | surface | ghost',
			initial: 'ghost'
		}
	];
</script>

{#snippet startSnippet()}
	<IconButton
		icon={LineHorizontal324RegularIcon}
		variant="ghost"
		onclick={() => console.log('Menu clicked')}
	/>
{/snippet}

{#snippet centerSnippet()}
	<NavMenu items={navItems} />
{/snippet}

{#snippet endSnippet()}
	<Dropdown options={profileOptions} variant="muted">
		<Avatar src="/images/avatar-1.jpeg" />
	</Dropdown>
{/snippet}

<DocsHeader title="AppBar" llmUrl="https://ui-svelte.sappsdev.com/llm/layout/app-bar.md">
	Display navigation, branding, and actions at the top of a screen. Supports sticky positioning,
	blur effects, and responsive layouts.
</DocsHeader>

{#snippet preview()}
	<div
		class="w-full min-h-[200px] border border-border rounded-lg overflow-hidden bg-background relative"
	>
		<AppBar
			rootClass="relative"
			centerClass="invisible md:visible"
			start={showStart ? startSnippet : undefined}
			center={showCenter ? centerSnippet : undefined}
			end={showEnd ? endSnippet : undefined}
			{isBlurred}
			{isBordered}
			{borderOnScrollOnly}
			{hideOnScroll}
			{isSticky}
			{isBoxed}
			{variant}
		/>
		<div class="p-6 pt-20">
			<p class="text-sm text-muted-foreground">Page content below the AppBar</p>
		</div>
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
			<Checkbox bind:checked={isSticky} label="Sticky" />
			<Checkbox bind:checked={isBoxed} label="Boxed" />
			<Checkbox bind:checked={borderOnScrollOnly} label="Border on Scroll" />
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
		<p>The AppBar uses three snippet slots for content placement:</p>
		<ul class="list-disc pl-6 space-y-2 text-sm">
			<li><strong>start</strong> - Left section, typically for menu toggles or logos</li>
			<li><strong>center</strong> - Middle section, for main navigation or title</li>
			<li><strong>end</strong> - Right section, for user actions or profile menus</li>
		</ul>
		<Code
			lang="svelte"
			code={`<AppBar>
  {#snippet start()}
    <IconButton icon={MenuIcon} variant="ghost" />
  {/snippet}

  {#snippet center()}
    <NavMenu items={navItems} />
  {/snippet}

  {#snippet end()}
    <Dropdown options={profileOptions}>
      <Avatar src="/avatar.jpg" />
    </Dropdown>
  {/snippet}
</AppBar>`}
		/>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Scroll Behaviors</h4>
		{/snippet}
		<ul class="list-disc pl-6 space-y-2 text-sm">
			<li><strong>isSticky</strong> - AppBar stays at the top when scrolling</li>
			<li><strong>isBlurred</strong> - Adds backdrop blur effect when scrolled</li>
			<li><strong>hideOnScroll</strong> - Hides AppBar when scrolling down, shows on scroll up</li>
			<li><strong>borderOnScrollOnly</strong> - Shows border only after scrolling</li>
		</ul>
		<Code
			lang="svelte"
			code={`<!-- Sticky AppBar with blur effect -->
<AppBar isSticky isBlurred isBordered borderOnScrollOnly>
  {#snippet center()}
    <h1>My App</h1>
  {/snippet}
</AppBar>`}
		/>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Mobile Menu Pattern</h4>
		{/snippet}
		<p class="text-sm">Use an IconButton in the start slot to toggle mobile navigation:</p>
		<Code
			lang="svelte"
			code={`<script lang="ts">
  import { AppBar, IconButton, NavMenu } from 'ui-svelte';
  import { LineHorizontal324RegularIcon } from '$lib/icons';

  let mobileMenuOpen = $state(false);
<\/script>

<AppBar isBordered>
  {#snippet start()}
    <!-- Mobile menu toggle, hidden on desktop -->
    <IconButton
      icon={LineHorizontal324RegularIcon}
      variant="ghost"
      onclick={() => mobileMenuOpen = !mobileMenuOpen}
      class="md:hidden"
    />
  {/snippet}

  {#snippet center()}
    <!-- Desktop navigation, hidden on mobile -->
    <NavMenu items={navItems} class="hidden md:flex" />
  {/snippet}
</AppBar>`}
		/>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>With Dropdown Menu</h4>
		{/snippet}
		<p class="text-sm">Combine with Dropdown for user profile menus:</p>
		<Code
			lang="svelte"
			code={`<script lang="ts">
  import { AppBar, Dropdown, Avatar } from 'ui-svelte';

  const profileOptions = [
    { id: '1', label: 'Profile', href: '/profile' },
    { id: '2', label: 'Settings', href: '/settings' },
    { id: '3', label: 'Sign Out', onclick: () => logout() }
  ];
<\/script>

<AppBar isBordered>
  {#snippet end()}
    <Dropdown options={profileOptions}>
      <Avatar src="/avatar.jpg" />
    </Dropdown>
  {/snippet}
</AppBar>`}
		/>
	</Card>
</Section>

<DocsProps {props} />
