<script lang="ts">
	import { PhoneField, Card, Checkbox, Code, Section, Select, TextField } from 'ui-svelte';
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

	let value = $state('');
	let countryCode = $state('');
	let dialCode = $state('');
	let placeholder = $state('Enter phone number');

	let isFloatLabel = $state(false);
	let isSolid = $state(false);
	let hasLabel = $state(true);
	let hasHelpText = $state(false);
	let hasErrorText = $state(false);

	let hasProps = $derived(
		[
			color !== 'muted',
			variant !== 'outlined',
			size !== 'md',
			isFloatLabel,
			isSolid,
			hasLabel,
			hasHelpText,
			hasErrorText
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { PhoneField } from 'ui-svelte';`,
			``,
			`\tlet value = $state('');`,
			`\tlet countryCode = $state('');`,
			`\tlet dialCode = $state('');`,
			``,
			`\tconst handleChange = (val: string) => {`,
			`\t\tconsole.log('Phone:', dialCode, val);`,
			`\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<PhoneField`,
			hasProps && `\tbind:value`,
			hasProps && `\tbind:countryCode`,
			hasProps && `\tbind:dialCode`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			hasLabel && `\tlabel="Phone Number"`,
			isFloatLabel && `\tisFloatLabel`,
			isSolid && `\tisSolid`,
			hasHelpText && `\thelpText="We'll never share your phone"`,
			hasErrorText && `\terrorText="Invalid phone number"`,
			`\tplaceholder="${placeholder}"`,
			`\tonchange={handleChange}`,
			`\tpriorityCountries={['us', 'gb', 'ca']}`,
			hasProps && `/>`,
			!hasProps &&
				`<PhoneField bind:value bind:countryCode bind:dialCode onchange={handleChange} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'value', type: 'string', initial: "''", description: 'Phone number value (bindable)' },
		{
			prop: 'countryCode',
			type: 'string',
			initial: "''",
			description: 'Selected country code (bindable)'
		},
		{
			prop: 'dialCode',
			type: 'string',
			initial: "''",
			description: 'Country dial code (bindable)'
		},
		{ prop: 'placeholder', type: 'string', initial: "'Enter phone number'" },
		{ prop: 'onchange', type: '(value: string) => void', initial: '' },
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
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'dialCodeName', type: 'string', initial: "'dialCode'" },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'isLabelActive', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{ prop: 'priorityCountries', type: 'string[]', initial: '[]' },
		{ prop: 'searchPlaceholder', type: 'string', initial: "'Search country...'" },
		{ prop: 'emptyText', type: 'string', initial: "'No countries found'" },
		{ prop: 'loadingText', type: 'string', initial: "'Loading...'" }
	];
</script>

<DocsHeader title="PhoneField" llmUrl="https://ui-svelte.sappsdev.com/llm/form/phone-field.md">
	A phone input field with integrated country code selector, country flag icons, and searchable
	dropdown.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
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
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hasLabel} label="Label" />
			<Checkbox bind:checked={isFloatLabel} label="Float Label" />
			<Checkbox bind:checked={isSolid} label="Solid" />
			<Checkbox bind:checked={hasHelpText} label="Help Text" />
			<Checkbox bind:checked={hasErrorText} label="Error Text" />
		</div>

		<div class="doc-preview">
			<PhoneField
				bind:value
				bind:countryCode
				bind:dialCode
				{color}
				{variant}
				{size}
				{placeholder}
				{isFloatLabel}
				{isSolid}
				label={hasLabel ? 'Phone Number' : ''}
				helpText={hasHelpText ? "We'll never share your phone" : ''}
				errorText={hasErrorText ? 'Invalid phone number' : ''}
				priorityCountries={['us', 'gb', 'ca']}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorOpt}
					<PhoneField
						variant={item.id as any}
						color={colorOpt.id as any}
						label={item.label + ' ' + colorOpt.label}
						isFloatLabel
						priorityCountries={['us']}
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		{#each sizeOptions as sizeOpt}
			<div class="wrap gap-4 center">
				<PhoneField
					size={sizeOpt.id as any}
					label="Size {sizeOpt.label}"
					isFloatLabel
					priorityCountries={['us']}
				/>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Priority Countries</p>
	<Card>
		<p class="mb-4 text-muted">
			Use the <code>priorityCountries</code> prop to display specific countries at the top of the
			dropdown. The first priority country will be selected by default if no
			<code>countryCode</code> is provided.
		</p>
		<div class="grid-2 gap-4">
			<PhoneField label="US Priority" isFloatLabel priorityCountries={['us', 'ca', 'mx']} />
			<PhoneField label="EU Priority" isFloatLabel priorityCountries={['de', 'fr', 'es', 'it']} />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Form Integration</p>
	<Card>
		<p class="mb-4 text-muted">
			The component exposes two hidden inputs: one for the phone number (<code>name</code>) and one
			for the dial code (<code>dialCodeName</code>). Both values are included when the form is
			submitted.
		</p>
		<PhoneField
			name="phone"
			dialCodeName="dialCode"
			label="Contact Phone"
			isFloatLabel
			priorityCountries={['us']}
			helpText="Used for account recovery"
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Customization</p>
	<Card>
		<div class="grid-2 gap-4">
			<PhoneField
				label="Custom Placeholder"
				isFloatLabel
				placeholder="(555) 123-4567"
				priorityCountries={['us']}
			/>
			<PhoneField
				label="Custom Search"
				isFloatLabel
				searchPlaceholder="Find your country..."
				emptyText="Country not available"
				loadingText="Searching..."
				priorityCountries={['us']}
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
