<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { HeartLinearIcon, Search24RegularIcon } from '$lib/icons';
	import { TextField, Checkbox, Select } from 'ui-svelte';

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

	let variant: any = $state('outlined');
	let size: any = $state('md');

	let startIcon = $state(false);
	let endIcon = $state(false);
	let startText = $state('');
	let endText = $state('');
	let label = $state('');
	let helpText = $state('');
	let errorText = $state('');

	let isFloatLabel = $state(false);
	let isSolid = $state(false);

	let hasProps = $derived(
		[
			variant !== 'primary',
			size !== 'md',
			startIcon,
			endIcon,
			startText,
			endText,
			label,
			helpText,
			errorText,
			isFloatLabel,
			isSolid
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { TextField } from 'ui-svelte';`,
			`\n\tlet value = $state('');`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<TextField`,
			hasProps && `\tname="textfield"`,
			hasProps && `\tplaceholder="Enter text..."`,
			label && `\tlabel="${label}"`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			startIcon && `\tstartIcon="fluent:search-24-regular"`,
			endIcon && `\tendIcon="fluent:mail-24-regular"`,
			startText && `\tstartText="https://"`,
			endText && `\tendText=".com"`,
			helpText && `\thelpText="This is a help text"`,
			errorText && `\terrorText="This field is required"`,
			isFloatLabel && `\tisFloatLabel`,
			isSolid && `\tisSolid`,
			hasProps && `\tbind:value`,
			hasProps && `/>`,
			!hasProps && `<TextField name="textfield" placeholder="Enter text..." bind:value />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'el', type: 'HTMLInputElement', initial: '' },
		{ prop: 'value', type: 'string | number', initial: '' },
		{ prop: 'defaultValue', type: 'string', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: '' },
		{ prop: 'type', type: 'text | password | email | number | tel | url', initial: 'text' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'controlClass', type: 'string', initial: '' },
		{ prop: 'startIcon', type: 'IconName', initial: '' },
		{ prop: 'endIcon', type: 'IconName', initial: '' },
		{ prop: 'startText', type: 'string', initial: '' },
		{ prop: 'endText', type: 'string', initial: '' },
		{ prop: 'onchange', type: '(value: unknown) => void', initial: '' },
		{ prop: 'oninput', type: '(value: unknown) => void', initial: '' },
		{ prop: 'variant', type: 'primary | secondary | soft | line', initial: 'primary' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'labelActive', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'autocomplete', type: "HTMLInputAttributes['autocomplete']", initial: '' },
		{ prop: 'min', type: "HTMLInputAttributes['min']", initial: '' },
		{ prop: 'max', type: "HTMLInputAttributes['max']", initial: '' },
		{ prop: 'maxlength', type: "HTMLInputAttributes['maxlength']", initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' }
	];

	let value = $state('');
</script>

{#snippet preview()}
	<TextField
		name="textfield"
		placeholder="Enter text..."
		{variant}
		{size}
		{isSolid}
		startIcon={startIcon ? Search24RegularIcon : undefined}
		endIcon={endIcon ? HeartLinearIcon : undefined}
		{startText}
		{endText}
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
		<Checkbox bind:checked={startIcon} label="startIcon" />
		<Checkbox bind:checked={endIcon} label="endIcon" />

		<Checkbox
			onchange={(v) => (v ? (startText = 'https://') : (startText = ''))}
			label="startText"
		/>
		<Checkbox onchange={(v) => (v ? (endText = '.com') : (endText = ''))} label="endText" />

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
	</DocOptions>
{/snippet}

<DocHeader title="TextField">Text fields allow users to enter and edit text.</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
