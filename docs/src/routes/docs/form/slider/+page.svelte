<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Select, Checkbox, Slider } from 'ui-svelte';

	const colorOptions = [
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
	let color: any = $state('primary');
	let size: any = $state('md');

	// Props
	let label = $state('');
	let min = $state(0);
	let max = $state(100);
	let step = $state(1);

	// States
	let hideLabel = $state(false);

	let hasProps = $derived(
		[color !== 'primary', size !== 'md', label, min !== 0, max !== 100, step !== 1, hideLabel].some(
			Boolean
		)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Slider } from 'ui-svelte';`,
			`\n\tlet value = $state(50);`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Slider`,
			hasProps && `\tname="slider"`,
			label && `\tlabel="${label}"`,
			color !== 'primary' && `\tcolor="${color}"`,
			size !== 'md' && `\tsize="${size}"`,
			min !== 0 && `\tmin={${min}}`,
			max !== 100 && `\tmax={${max}}`,
			step !== 1 && `\tstep={${step}}`,
			hideLabel && `\thideLabel`,
			hasProps && `\tbind:value`,
			hasProps && `/>`,
			!hasProps && `<Slider name="slider" bind:value />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'value', type: 'number', initial: '0' },
		{ prop: 'min', type: 'number', initial: '0' },
		{ prop: 'max', type: 'number', initial: '100' },
		{ prop: 'step', type: 'number', initial: '1' },
		{ prop: 'onchange', type: '(value: number) => void', initial: '' },
		{ prop: 'color', type: 'primary | secondary | muted', initial: 'primary' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'hideLabel', type: 'boolean', initial: 'false' }
	];

	let value = $state(50);
</script>

{#snippet preview()}
	<Slider
		name="slider"
		{color}
		{size}
		{min}
		{max}
		{step}
		label={label || undefined}
		{hideLabel}
		bind:value
	/>
{/snippet}

{#snippet builder()}
	<Select label="Color" size="sm" options={colorOptions} bind:value={color} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />

	<DocOptions title="Range">
		<Checkbox onchange={(v) => (min = v ? 10 : 0)} label="Min (10)" />
		<Checkbox onchange={(v) => (max = v ? 200 : 100)} label="Max (200)" />
		<Checkbox onchange={(v) => (step = v ? 5 : 1)} label="Step (5)" />
	</DocOptions>

	<DocOptions title="Labels">
		<Checkbox onchange={(v) => (v ? (label = 'Volume') : (label = ''))} label="Label" />
		{#if label}
			<Checkbox bind:checked={hideLabel} label="hideLabel" />
		{/if}
	</DocOptions>
{/snippet}

<DocHeader title="Slider"
	>Slider components allow users to select a numeric value within a specified range.</DocHeader
>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
