<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Card, Checkbox, Select } from 'ui-svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	let variant: any = $state('surface');

	let cover = $state('');

	let showHeader = $state(false);
	let showFooter = $state(false);
	let hasOverlay = $state(false);
	let isSolid = $state(false);
	let hasDivider = $state(false);
	let hasShadow = $state(false);

	let hasProps = $derived(
		[variant !== 'outline', showHeader, showFooter, cover, hasOverlay, hasDivider, hasShadow].some(
			Boolean
		)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Card } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Card`,
			variant !== 'outline' && `\tvariant="${variant}"`,
			cover && `\tcover="/img-1.jpeg"`,
			hasOverlay && `\thasOverlay`,
			hasDivider && `\thasDivider`,
			hasShadow && `\thasShadow`,
			hasProps && `>`,
			!hasProps && `<Card>`,
			showHeader && `\t{#snippet header()}`,
			showHeader && `\t\t<h3>Header</h3>`,
			showHeader && `\t{/snippet}\n`,
			`\t<p>Card body</p>`,
			showFooter && `\n\t{#snippet footer()}`,
			showFooter && `\t\t<h4>Footer</h4>`,
			showFooter && `\t{/snippet}`,
			`</Card>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'children', type: 'Snippet', initial: '', required: true },
		{ prop: 'header', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'cover', type: 'string', initial: '' },
		{ prop: 'hasOverlay', type: 'boolean', initial: 'false' },
		{ prop: 'hasDivider', type: 'boolean', initial: 'false' },
		{ prop: 'hasShadow', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{
			prop: 'variant',
			type: 'primary | secondary | surface | outlined | soft | ghost',
			initial: 'outline'
		},
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'footerClass', type: 'string', initial: '' },
		{ prop: 'bodyClass', type: 'string', initial: '' },
		{ prop: 'coverClass', type: 'string', initial: '' },
		{ prop: 'overlayClass', type: 'string', initial: '' }
	];
</script>

{#snippet header()}
	<h6>Header</h6>
{/snippet}

{#snippet footer()}
	<h6>Footer</h6>
{/snippet}

{#snippet preview()}
	<Card
		class="min-w-xs"
		{variant}
		header={showHeader ? header : undefined}
		footer={showFooter ? footer : undefined}
		cover={cover ? '/images/img-1.jpeg' : undefined}
		{hasOverlay}
		{hasDivider}
		{hasShadow}
		{isSolid}
	>
		<p>Card body</p>
	</Card>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />

	<DocOptions title="Sections">
		<Checkbox bind:checked={showHeader} label="Header" />
		<Checkbox bind:checked={showFooter} label="Footer" />
	</DocOptions>

	<DocOptions title="Props">
		<Checkbox onchange={(v) => (v ? (cover = '/img-1.jpeg') : (cover = ''))} label="Cover" />
		{#if cover}
			<Checkbox bind:checked={hasOverlay} label="Overlay" />
		{/if}
		{#if showHeader || showFooter}
			<Checkbox bind:checked={hasDivider} label="Divider" />
		{/if}
		<Checkbox bind:checked={hasShadow} label="Shadow" />
		<Checkbox bind:checked={isSolid} label="Solid" />
	</DocOptions>
{/snippet}

<DocHeader title="Card"
	>Cards are surfaces that display content and actions on a single topic.</DocHeader
>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
