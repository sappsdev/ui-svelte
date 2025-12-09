<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Section, Checkbox, Select } from 'ui-svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'ghost', label: 'Ghost' }
	];

	let variant: any = $state('surface');

	let cover = $state('');

	let hasOverlay = $state(false);
	let isSolid = $state(false);

	let hasProps = $derived([variant !== 'surface', cover, hasOverlay, isSolid].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Section } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Section`,
			variant !== 'surface' && `\tvariant="${variant}"`,
			cover && `\tcover="/img-1.jpeg"`,
			hasOverlay && `\thasOverlay`,
			isSolid && `\tisSolid`,
			hasProps && `>`,
			!hasProps && `<Section>`,
			`\t<h2>Section Title</h2>`,
			`\t<p>Section content goes here.</p>`,
			`</Section>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'children', type: 'Snippet', initial: '', required: true },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'bodyClass', type: 'string', initial: '' },
		{ prop: 'coverClass', type: 'string', initial: '' },
		{ prop: 'overlayClass', type: 'string', initial: '' },
		{ prop: 'cover', type: 'string', initial: '' },
		{ prop: 'hasOverlay', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{
			prop: 'variant',
			type: 'primary | secondary | muted | surface | ghost',
			initial: 'surface'
		}
	];
</script>

{#snippet preview()}
	<Section
		class="min-w-xs"
		{variant}
		cover={cover ? '/images/img-1.jpeg' : undefined}
		{hasOverlay}
		{isSolid}
	>
		<h2>Section Title</h2>
		<p>Section content goes here.</p>
	</Section>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />

	<DocOptions title="Props">
		<Checkbox onchange={(v) => (v ? (cover = '/img-1.jpeg') : (cover = ''))} label="Cover" />
		{#if cover}
			<Checkbox bind:checked={hasOverlay} label="Overlay" />
		{/if}
		<Checkbox bind:checked={isSolid} label="Solid" />
	</DocOptions>
{/snippet}

<DocHeader title="Section">
	Sections are container components used to organize and group related content with optional cover
	images and styling variants.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
