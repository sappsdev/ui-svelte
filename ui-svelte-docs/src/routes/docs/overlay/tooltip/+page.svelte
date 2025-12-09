<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Button, Checkbox, Select, Tooltip } from 'ui-svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const positionOptions = [
		{ id: 'top', label: 'Top' },
		{ id: 'bottom', label: 'Bottom' },
		{ id: 'start', label: 'Start' },
		{ id: 'end', label: 'End' }
	];

	// Selects
	let variant: any = $state('primary');
	let position: any = $state('top');

	// Props
	let label = $state('Tooltip text');

	// States
	let isSolid = $state(false);

	let hasProps = $derived(
		[variant !== 'primary', position !== 'top', label !== 'Tooltip text', isSolid].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Tooltip, Button } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Tooltip`,
			label !== 'Tooltip text' && `\tlabel="${label}"`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			position !== 'top' && `\tposition="${position}"`,
			isSolid && `\tisSolid`,
			hasProps && `>`,
			hasProps && `\t<Button label="Hover me" />`,
			hasProps && `</Tooltip>`,
			!hasProps && `<Tooltip label="Tooltip text">`,
			!hasProps && `\t<Button> Hover me </Button>`,
			!hasProps && `</Tooltip>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'children', type: 'Snippet', initial: '', required: true },
		{ prop: 'variant', type: 'primary | secondary | muted', initial: 'primary' },
		{ prop: 'position', type: 'top | bottom | start | end', initial: 'top' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

{#snippet preview()}
	<Tooltip {label} {variant} {position} {isSolid}>
		<Button isSolid>Hover me</Button>
	</Tooltip>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Position" size="sm" options={positionOptions} bind:value={position} />

	<DocOptions title="Props">
		<Checkbox bind:checked={isSolid} label="Solid" />
	</DocOptions>
{/snippet}

<DocHeader title="Tooltip">
	Tooltips display informative text when users hover over, focus on, or tap an element.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
