<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Textarea, Checkbox, Select } from 'ui-svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'line', label: 'Line' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	// Selects
	let variant: any = $state('outlined');
	let size: any = $state('md');

	// Props
	let label = $state('');
	let helpText = $state('');
	let errorText = $state('');
	let rows = $state(4);

	// States
	let isFloatLabel = $state(false);
	let isSolid = $state(false);
	let isResize = $state(false);

	let hasProps = $derived(
		[
			variant !== 'primary',
			size !== 'md',
			isResize,
			label,
			helpText,
			errorText,
			rows !== 4,
			isFloatLabel,
			isSolid
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Textarea } from 'ui-svelte';`,
			`\n\tlet value = $state('');`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Textarea`,
			hasProps && `\tname="textarea"`,
			hasProps && `\tplaceholder="Enter text..."`,
			label && `\tlabel="${label}"`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			isResize && `\tisResize`,
			rows !== 4 && `\trows={${rows}}`,
			helpText && `\thelpText="This is a help text"`,
			errorText && `\terrorText="This field is required"`,
			isFloatLabel && `\tisFloatLabel`,
			isSolid && `\tisSolid`,
			hasProps && `\tbind:value`,
			hasProps && `/>`,
			!hasProps && `<Textarea name="textarea" placeholder="Enter text..." bind:value />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'el', type: 'HTMLTextAreaElement', initial: '' },
		{ prop: 'value', type: 'string', initial: '' },
		{ prop: 'defaultValue', type: 'string', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: '' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'controlClass', type: 'string', initial: '' },
		{ prop: 'onchange', type: '(value: string) => void', initial: '' },
		{ prop: 'oninput', type: '(value: string) => void', initial: '' },
		{ prop: 'variant', type: 'primary | secondary | muted | outlined | line', initial: 'outlined' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'islabelActive', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'maxlength', type: "HTMLTextareaAttributes['maxlength']", initial: '' },
		{ prop: 'rows', type: 'number', initial: '4' },
		{ prop: 'cols', type: 'number', initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{ prop: 'isResize', type: 'boolean', initial: 'false' }
	];

	let value = $state('');
</script>

{#snippet preview()}
	<Textarea
		name="textarea"
		placeholder="Enter text..."
		{variant}
		{size}
		{isResize}
		{rows}
		{isSolid}
		label={label || undefined}
		helpText={helpText || undefined}
		errorText={errorText || undefined}
		isFloatLabel={label && isFloatLabel ? isFloatLabel : undefined}
		bind:value
	/>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />

	<DocOptions title="Props">
		<Checkbox onchange={(v) => (v ? (label = 'Label') : (label = ''))} label="Label" />
		{#if label}
			<Checkbox bind:checked={isFloatLabel} label="floatLabel" />
		{/if}
		<Checkbox
			onchange={(v) => (v ? (helpText = 'This is a help text') : (helpText = ''))}
			label="helpText"
		/>
		<Checkbox
			onchange={(v) => (v ? (errorText = 'This field is required') : (errorText = ''))}
			label="errorText"
		/>
		<Checkbox bind:checked={isSolid} label="solid" />
		<Checkbox bind:checked={isResize} label="isResize" />
	</DocOptions>
{/snippet}

<DocHeader title="Textarea">Textareas allow users to enter and edit multi-line text.</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
