<script lang="ts">
	import { DateField, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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

	let color: any = $state('muted');
	let variant: any = $state('outlined');
	let size: any = $state('md');

	let isFloatLabel = $state(false);
	let hasLabel = $state(true);
	let hasHelpText = $state(false);
	let hasErrorText = $state(false);

	let value: Date | null = $state(null);

	let hasProps = $derived(
		[
			color !== 'muted',
			variant !== 'outlined',
			size !== 'md',
			isFloatLabel,
			hasLabel,
			hasHelpText,
			hasErrorText
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { DateField } from 'ui-svelte';`,
			``,
			`\tlet value: Date | null = $state(null);`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<DateField`,
			hasProps && `\tbind:value`,
			hasLabel && !isFloatLabel && `\tlabel="Date"`,
			hasLabel && isFloatLabel && `\tlabel="Date"`,
			isFloatLabel && `\tisFloatLabel`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			hasHelpText && `\thelpText="Select a valid date"`,
			hasErrorText && `\terrorText="This field is required"`,
			hasProps && `\tplaceholder="Select a date"`,
			hasProps && `/>`,
			!hasProps && `<DateField bind:value placeholder="Select a date" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'value', type: 'Date | null', initial: 'null' },
		{ prop: 'placeholder', type: 'string', initial: 'Select an option' },
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'isLabelActive', type: 'boolean', initial: 'false' },
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
		{ prop: 'onchange', type: '(value: unknown) => void', initial: '' }
	];
</script>

<DocsHeader title="DateField" llmUrl="https://ui-svelte.sappsdev.com/llm/form/date-field.md">
	DateField allows users to select a date using an interactive calendar picker.
</DocsHeader>

<Section>
	<Card color="background" variant="outlined">
		<div class="wrap gap-2">
			<Select
				isFloatLabel
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
				rootClass="w-32"
			/>
			<Select
				isFloatLabel
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
				rootClass="w-32"
			/>
			<Select
				isFloatLabel
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
				rootClass="w-32"
			/>
		</div>
		<div class="wrap gap-6">
			<Checkbox bind:checked={hasLabel} label="Label" />
			<Checkbox bind:checked={isFloatLabel} label="Float Label" />
			<Checkbox bind:checked={hasHelpText} label="Help Text" />
			<Checkbox bind:checked={hasErrorText} label="Error Text" />
		</div>

		<div class="doc-preview">
			<DateField
				bind:value
				label={hasLabel ? 'Date' : undefined}
				{isFloatLabel}
				{color}
				{variant}
				{size}
				helpText={hasHelpText ? 'Select a valid date' : undefined}
				errorText={hasErrorText ? 'This field is required' : undefined}
				placeholder="Select a date"
				class="max-w-xs"
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each sizeOptions as sizeItem}
					<DateField
						variant={item.id as any}
						size={sizeItem.id as any}
						placeholder={item.label + ' ' + sizeItem.label}
						class="max-w-xs"
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Labels</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<DateField label="Standard Label" placeholder="Select a date" class="max-w-xs" />
			<DateField label="Float Label" isFloatLabel placeholder="Select a date" class="max-w-xs" />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Help & Error Text</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<DateField
				label="With Help Text"
				helpText="Select your preferred date"
				placeholder="Select a date"
				class="max-w-xs"
			/>
			<DateField
				label="With Error Text"
				errorText="This field is required"
				placeholder="Select a date"
				class="max-w-xs"
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
