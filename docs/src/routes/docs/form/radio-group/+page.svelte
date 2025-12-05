<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { RadioGroup, Select, Checkbox } from 'ui-svelte';

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

	const radioOptions = [
		{ id: '1', label: 'Option 1' },
		{ id: '2', label: 'Option 2' },
		{ id: '3', label: 'Option 3' },
		{ id: '4', label: 'Option 4' }
	];

	// Selects
	let variant: any = $state('primary');
	let size: any = $state('md');

	// Props
	let label = $state('');
	let info = $state('');
	let error = $state('');

	let hasProps = $derived([variant !== 'primary', size !== 'md', label, info, error].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { RadioGroup } from 'ui-svelte';`,
			`\n\tconst options = [`,
			`\t\t{ id: '1', label: 'Option 1' },`,
			`\t\t{ id: '2', label: 'Option 2' },`,
			`\t\t{ id: '3', label: 'Option 3' }`,
			`\t];`,
			`\n\tlet value = $state('');`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<RadioGroup`,
			hasProps && `\tname="radio-group"`,
			hasProps && `\toptions={options}`,
			label && `\tlabel="${label}"`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			info && `\tinfo="${info}"`,
			error && `\terror="${error}"`,
			hasProps && `\tbind:value`,
			hasProps && `/>`,
			!hasProps && `<RadioGroup name="radio-group" options={options} bind:value />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'options', type: 'Option[]', initial: '[]', required: true },
		{ prop: 'value', type: 'string | number', initial: '' },
		{ prop: 'onchange', type: '(value: string | number) => void', initial: '' },
		{ prop: 'variant', type: 'primary | secondary | muted', initial: 'primary' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'info', type: 'string', initial: '' },
		{ prop: 'error', type: 'string', initial: '' }
	];

	const optionProps = [
		{ prop: 'id', type: 'string | number', initial: '', required: true },
		{ prop: 'label', type: 'string', initial: '', required: true }
	];

	let value = $state('');
</script>

{#snippet preview()}
	<RadioGroup
		name="radio-group"
		options={radioOptions}
		{variant}
		{size}
		label={label || undefined}
		info={info || undefined}
		error={error || undefined}
		bind:value
	/>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />

	<DocOptions title="Labels & Messages">
		<Checkbox onchange={(v) => (v ? (label = 'Label') : (label = ''))} label="Label" />
		<Checkbox
			onchange={(v) => (v ? (info = 'This is an info message') : (info = ''))}
			label="info"
		/>
		<Checkbox
			onchange={(v) => (v ? (error = 'This field is required') : (error = ''))}
			label="error"
		/>
	</DocOptions>
{/snippet}

<DocHeader title="RadioGroup">
	RadioGroup components allow users to select one option from a set of mutually exclusive choices.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<div class="prose mt-8">
	<h3>Option Type</h3>
	<p>Each option in the options array should follow this structure:</p>
</div>

<DocProps props={optionProps} />
