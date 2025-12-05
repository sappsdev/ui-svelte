<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { AppBar, Checkbox, IconButton, Dropdown, NavMenu } from 'ui-svelte';

	// Icon data objects
	const NavigationIcon = {
		body: '<path fill="currentColor" d="M3.37 3.232a.75.75 0 0 1 .77.048l17 11a.75.75 0 0 1 0 1.24l-17 11A.75.75 0 0 1 3 25.999V4a.75.75 0 0 1 .37-.768M4.5 5.56v16.88L18.74 14z"/>',
		viewbox: '0 0 24 24'
	};

	const PersonIcon = {
		body: '<path fill="currentColor" d="M17.754 14a2.25 2.25 0 0 1 2.25 2.25v.575c0 .894-.32 1.76-.899 2.438c-1.57 1.834-3.957 2.739-7.105 2.739s-5.535-.905-7.105-2.74a3.75 3.75 0 0 1-.898-2.437v-.575a2.25 2.25 0 0 1 2.249-2.25zm0 1.5H6.246a.75.75 0 0 0-.75.75v.577c0 .536.192 1.054.54 1.461c1.253 1.468 3.219 2.214 5.964 2.214s4.711-.746 5.964-2.214a2.25 2.25 0 0 0 .54-1.46v-.578a.75.75 0 0 0-.75-.75M12 2.004a5 5 0 1 1 0 10a5 5 0 0 1 0-10m0 1.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7"/>',
		viewbox: '0 0 24 24'
	};

	// States
	let showStart = $state(true);
	let showCenter = $state(true);
	let showEnd = $state(true);
	let isBlurred = $state(false);
	let isBordered = $state(true);
	let hideOnScroll = $state(false);

	let hasProps = $derived(
		[showStart, showCenter, showEnd, isBlurred, isBordered, hideOnScroll].some(Boolean)
	);

	const navItems = [
		{ label: 'Home', icon: 'fluent:home-24-regular', href: '/' },
		{ label: 'Products', icon: 'fluent:box-24-regular', href: '/products' },
		{ label: 'Contact', icon: 'fluent:mail-24-regular', href: '/contact' }
	];

	const profileOptions = [
		{ id: '1', label: 'Profile', icon: 'fluent:person-24-regular', href: '/profile' },
		{ id: '2', label: 'Settings', icon: 'fluent:settings-24-regular', href: '/settings' },
		{
			id: '3',
			label: 'Sign Out',
			icon: 'fluent:sign-out-24-regular',
			onclick: () => console.log('Logout')
		}
	];

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { AppBar, IconButton, Dropdown, NavMenu } from 'ui-svelte';`,
			showStart && `\n\tconst handleMenuClick = () => {`,
			showStart && `\t\tconsole.log('Menu clicked');`,
			showStart && `\t};`,
			showCenter && `\n\tconst navItems = [`,
			showCenter && `\t\t{ label: 'Home', icon: 'fluent:home-24-regular', href: '/' },`,
			showCenter && `\t\t{ label: 'Products', icon: 'fluent:box-24-regular', href: '/products' },`,
			showCenter && `\t\t{ label: 'Contact', icon: 'fluent:mail-24-regular', href: '/contact' }`,
			showCenter && `\t];`,
			showEnd && `\n\tconst profileOptions = [`,
			showEnd &&
				`\t\t{ id: '1', label: 'Profile', icon: 'fluent:person-24-regular', href: '/profile' },`,
			showEnd &&
				`\t\t{ id: '2', label: 'Settings', icon: 'fluent:settings-24-regular', href: '/settings' },`,
			showEnd &&
				`\t\t{ id: '3', label: 'Sign Out', icon: 'fluent:sign-out-24-regular', onclick: () => console.log('Logout') }`,
			showEnd && `\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<AppBar`,
			`\tclass="relative"`,
			isBlurred && `\tisBlurred`,
			isBordered && `\tisBordered`,
			hideOnScroll && `\thideOnScroll`,
			hasProps && `>`,
			!hasProps && `<AppBar centerClass="invisible md:visible">`,
			showStart && `\t{#snippet start()}`,
			showStart && `\t\t<IconButton`,
			showStart && `\t\t\ticon="fluent:navigation-24-regular"`,
			showStart && `\t\t\tvariant="ghost"`,
			showStart && `\t\t\tonclick={handleMenuClick}`,
			showStart && `\t\t/>`,
			showStart && `\t{/snippet}\n`,
			showCenter && `\t{#snippet center()}`,
			showCenter && `\t\t<NavMenu items={navItems} variant="ghost" />`,
			showCenter && `\t{/snippet}\n`,
			showEnd && `\t{#snippet end()}`,
			showEnd && `\t\t<Dropdown options={profileOptions} variant="ghost">`,
			showEnd && `\t\t\t<IconButton icon="fluent:person-24-regular" variant="ghost" />`,
			showEnd && `\t\t</Dropdown>`,
			showEnd && `\t{/snippet}`,
			!showStart && !showCenter && !showEnd && `\t<p class="p-4">AppBar content</p>`,
			`</AppBar>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

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
</script>

{#snippet start()}
	<IconButton icon={NavigationIcon} variant="ghost" onclick={() => console.log('Menu clicked')} />
{/snippet}

{#snippet center()}
	<NavMenu items={navItems} variant="muted" />
{/snippet}

{#snippet end()}
	<Dropdown options={profileOptions} variant="muted">
		<IconButton icon={PersonIcon} variant="ghost" />
	</Dropdown>
{/snippet}

{#snippet preview()}
	<div
		class="w-full min-h-[200px] border border-border rounded-lg overflow-hidden bg-background relative"
	>
		<AppBar
			class="relative"
			centerClass="invisible md:visible"
			start={showStart ? start : undefined}
			center={showCenter ? center : undefined}
			end={showEnd ? end : undefined}
			{isBlurred}
			{isBordered}
			{hideOnScroll}
		/>
		<div class="p-6 pt-20">
			<p class="text-sm text-muted-foreground">Page content below the AppBar</p>
		</div>
	</div>
{/snippet}

{#snippet builder()}
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
{/snippet}

<DocHeader title="AppBar">
	AppBars display information and actions at the top of a screen. They are ideal for navigation,
	titles, and contextual actions.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
