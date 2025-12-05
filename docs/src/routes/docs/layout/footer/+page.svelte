<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Footer, Checkbox, IconButton, FooterLinks } from 'ui-svelte';

	const HeartIcon = {
		body: '<path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"/>',
		viewbox: '0 0 24 24'
	};

	let showStart = $state(true);
	let showCenter = $state(true);
	let showEnd = $state(true);
	let isBlurred = $state(false);
	let isBordered = $state(true);
	let hideOnScroll = $state(false);

	let hasProps = $derived(
		[showStart, showCenter, showEnd, isBlurred, isBordered, hideOnScroll].some(Boolean)
	);

	const footerLinks = [
		{ label: 'About', href: '/about' },
		{ label: 'Privacy', href: '/privacy' },
		{ label: 'Terms', href: '/terms' },
		{ label: 'Contact', href: '/contact' }
	];

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Footer, IconButton, FooterLinks } from 'ui-svelte';`,
			showCenter && `\n\tconst footerLinks = [`,
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
			showCenter && `\t\t<FooterLinks links={footerLinks} />`,
			showCenter && `\t{/snippet}\n`,
			showEnd && `\t{#snippet end()}`,
			showEnd && `\t\t<IconButton`,
			showEnd && `\t\t\ticon="fluent:heart-24-regular"`,
			showEnd && `\t\t\tvariant="ghost"`,
			showEnd && `\t\t\tonclick={() => console.log('Made with love')}`,
			showEnd && `\t\t/>`,
			showEnd && `\t{/snippet}`,
			!showStart && !showCenter && !showEnd && `\t<p class="p-4">Footer content</p>`,
			`</Footer>`
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
	<p class="text-sm text-muted-foreground">© {new Date().getFullYear()} Company</p>
{/snippet}

{#snippet center()}
	<FooterLinks links={footerLinks} />
{/snippet}

{#snippet end()}
	<IconButton icon={HeartIcon} variant="ghost" onclick={() => console.log('Made with love')} />
{/snippet}

{#snippet preview()}
	<div
		class="w-full min-h-[200px] border border-border rounded-lg overflow-hidden bg-background relative"
	>
		<div class="p-6 pb-20">
			<p class="text-sm text-muted-foreground">Page content above the Footer</p>
		</div>
		<Footer
			class="relative"
			start={showStart ? start : undefined}
			center={showCenter ? center : undefined}
			end={showEnd ? end : undefined}
			{isBlurred}
			{isBordered}
			{hideOnScroll}
		/>
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

<DocHeader title="Footer">
	Footers display information and actions at the bottom of a screen. They are ideal for copyright
	notices, navigation links, and secondary actions.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
