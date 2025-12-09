<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Select, Checkbox, Section } from 'ui-svelte';

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

	const selectOptions = [
		{ id: '1', src: '/avatar-1.jpeg', label: 'John Doe', description: 'Designer' },
		{ id: '2', src: '/avatar-2.jpeg', label: 'Jane Smith', description: 'Developer' },
		{ id: '3', src: '/avatar-3.jpeg', label: 'Mike Johnson', description: 'Manager' },
		{ id: '4', src: '/avatar-4.jpeg', label: 'Emily Davis', description: 'Intern' },
		{ id: '5', src: '/avatar-5.jpeg', label: 'David Wilson', description: 'CEO' }
	];

	// Selects
	let variant: any = $state('outlined');
	let size: any = $state('md');

	// Props
	let label = $state('');
	let helpText = $state('');
	let errorText = $state('');

	// States
	let withAvatar = $state(false);
	let withDescription = $state(false);
	let isFloatLabel = $state(false);
	let isSolid = $state(false);

	let buildOptions: any = $derived.by(() => {
		if (withDescription && !withAvatar) {
			return selectOptions.map((option) => ({
				...option,
				description: option.description,
				src: undefined
			}));
		} else if (!withDescription && withAvatar) {
			return selectOptions.map((option) => ({
				...option,
				description: undefined,
				src: option.src
			}));
		} else if (withDescription && withAvatar) {
			return selectOptions;
		} else {
			return selectOptions.map((option) => ({
				...option,
				description: undefined,
				src: undefined
			}));
		}
	});

	let hasProps = $derived(
		[
			variant !== 'primary',
			size !== 'md',
			label,
			helpText,
			errorText,
			withAvatar,
			withDescription,
			isFloatLabel,
			isSolid
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Select } from 'ui-svelte';`,
			`\n\tconst options = [`,
			`\t\t{ id: '1', label: 'John Doe'${withAvatar ? ", src: '/avatar-1.jpeg'" : ''}${withDescription ? ", description: 'Designer'" : ''} },`,
			`\t\t{ id: '2', label: 'Jane Smith'${withAvatar ? ", src: '/avatar-2.jpeg'" : ''}${withDescription ? ", description: 'Developer'" : ''} },`,
			`\t\t{ id: '3', label: 'Mike Johnson'${withAvatar ? ", src: '/avatar-3.jpeg'" : ''}${withDescription ? ", description: 'Manager'" : ''} }`,
			`\t];`,
			`\n\tlet value = $state('');`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Select`,
			hasProps && `\tname="select"`,
			hasProps && `\tplaceholder="Select an option..."`,
			hasProps && `\toptions={options}`,
			label && `\tlabel="${label}"`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			helpText && `\thelpText="This is a help text"`,
			errorText && `\terrorText="This field is required"`,
			isFloatLabel && `\tisFloatLabel`,
			isSolid && `\tisSolid`,
			hasProps && `\tbind:value`,
			hasProps && `/>`,
			!hasProps &&
				`<Select name="select" placeholder="Select an option..." options={options} bind:value />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'options', type: 'Option[]', initial: '[]', required: true },
		{ prop: 'value', type: 'unknown', initial: '' },
		{ prop: 'selected', type: 'Option', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: '' },
		{ prop: 'onchange', type: '(value: unknown) => void', initial: '' },
		{ prop: 'variant', type: 'primary | secondary | soft | line', initial: 'primary' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'labelActive', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' }
	];

	const optionProps = [
		{ prop: 'id', type: 'string | number', initial: '', required: true },
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconName', initial: '' },
		{ prop: 'src', type: 'string', initial: '' }
	];

	let value = $state('');
</script>

{#snippet preview()}
	<Select
		placeholder="Select an option..."
		options={buildOptions}
		{variant}
		{size}
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

	<DocOptions title="Options">
		<Checkbox bind:checked={withAvatar} label="Avatar" />
		<Checkbox bind:checked={withDescription} label="Description" />
	</DocOptions>

	<DocOptions title="Labels & Messages">
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

<DocHeader title="Select">Select components allow users to choose one option from a list.</DocHeader
>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<Section class="prose mt-8">
	<h3>Option Type</h3>
	<p>Each option in the options array should follow this structure:</p>
</Section>

<DocProps props={optionProps} />
