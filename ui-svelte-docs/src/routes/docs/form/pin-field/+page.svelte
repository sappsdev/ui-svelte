<script lang="ts">
	import { PinField, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'line', label: 'Line' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	const typeOptions = [
		{ id: 'text', label: 'Text' },
		{ id: 'password', label: 'Password' },
		{ id: 'number', label: 'Number' }
	];

	const lengthOptions = [
		{ id: '4', label: '4' },
		{ id: '5', label: '5' },
		{ id: '6', label: '6' },
		{ id: '8', label: '8' }
	];

	let color: any = $state('muted');
	let variant: any = $state('outlined');
	let size: any = $state('md');
	let type: any = $state('text');
	let length: any = $state('6');

	let hasLabel = $state(true);
	let hasHelpText = $state(false);
	let hasErrorText = $state(false);

	let hasProps = $derived(
		[
			color !== 'muted',
			variant !== 'outlined',
			size !== 'md',
			type !== 'text',
			length !== '6',
			hasLabel,
			hasHelpText,
			hasErrorText
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { PinField } from 'ui-svelte';`,
			``,
			`\tconst handleComplete = (value: string) => {`,
			`\t\tconsole.log('PIN completed:', value);`,
			`\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<PinField`,
			hasLabel && `\tlabel="Label"`,
			length !== '6' && `\tlength={${length}}`,
			type !== 'text' && `\ttype="${type}"`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			hasHelpText && `\thelpText="Enter your verification code"`,
			hasErrorText && `\terrorText="Invalid code"`,
			hasProps && `\toncomplete={handleComplete}`,
			hasProps && `/>`,
			!hasProps && `<PinField oncomplete={handleComplete} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'length', type: 'number', initial: '6' },
		{ prop: 'values', type: 'string[]', initial: '[]' },
		{ prop: 'type', type: 'text | password | number', initial: 'text' },
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'muted'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined | line',
			initial: 'outlined'
		},
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'oncomplete', type: '(value: string) => void', initial: '' }
	];
</script>

<DocsHeader title="PinField" llmUrl="https://ui-svelte.sappsdev.com/llm/form/pin-field.md">
	PinField allows users to enter verification codes, OTPs, or PIN numbers with individual character
	inputs.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Type"
				size="sm"
				options={typeOptions}
				bind:value={type}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Length"
				size="sm"
				options={lengthOptions}
				bind:value={length}
			/>
			<Checkbox bind:checked={hasLabel} label="Label" />
			<Checkbox bind:checked={hasHelpText} label="Help Text" />
			<Checkbox bind:checked={hasErrorText} label="Error Text" />
		</div>

		<div class="doc-preview">
			<PinField
				label={hasLabel ? 'Verification Code' : undefined}
				{color}
				{variant}
				{size}
				{type}
				length={parseInt(length)}
				helpText={hasHelpText ? 'Enter your verification code' : undefined}
				errorText={hasErrorText ? 'Invalid code' : undefined}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Input Types</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			{#each typeOptions as typeItem}
				<PinField type={typeItem.id as any} label={typeItem.label} length={4} />
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Different Lengths</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<PinField label="4 Digits" length={4} />
			<PinField label="6 Digits" length={6} />
			<PinField label="8 Digits" length={8} />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Help & Error Text</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<PinField label="With Help Text" helpText="Enter the code sent to your email" length={6} />
			<PinField label="With Error Text" errorText="The code you entered is incorrect" length={6} />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
