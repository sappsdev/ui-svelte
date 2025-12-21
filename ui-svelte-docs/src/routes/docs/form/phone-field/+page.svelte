<script lang="ts">
	import { Card, Code, PhoneField, Section, Select, Checkbox } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';

	const variantOptions = [
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'line', label: 'Line' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'Small' },
		{ id: 'md', label: 'Medium' },
		{ id: 'lg', label: 'Large' }
	];

	let variant: any = $state('outlined');
	let size: any = $state('md');
	let isFloatLabel = $state(false);
	let isSolid = $state(false);

	let phoneValue = $state('');
	let countryCode = $state('');
	let dialCode = $state('');

	let code = $derived(() => {
		const props = [];
		if (variant !== 'outlined') props.push(`variant="${variant}"`);
		if (size !== 'md') props.push(`size="${size}"`);
		if (isFloatLabel) props.push('isFloatLabel');
		if (isSolid) props.push('isSolid');

		const propsString = props.length > 0 ? '\n\t' + props.join('\n\t') + '\n' : ' ';

		return `<PhoneField${propsString !== ' ' ? propsString : ' '}label="Phone Number"
	placeholder="Enter phone number"
	bind:value={phoneValue}
	bind:countryCode
	bind:dialCode
/>`;
	});

	const propsData = [
		{
			prop: 'value',
			type: 'string',
			default: "''",
			description: 'The phone number value (bindable)'
		},
		{
			prop: 'countryCode',
			type: 'string',
			default: "''",
			description: 'The selected country code, e.g., "US", "MX" (bindable)'
		},
		{
			prop: 'dialCode',
			type: 'string',
			default: "''",
			description: 'The dial code for the selected country, e.g., "1", "52" (bindable)'
		},
		{
			prop: 'placeholder',
			type: 'string',
			default: "'Enter phone number'",
			description: 'Placeholder text for the input'
		},
		{
			prop: 'variant',
			type: "'primary' | 'secondary' | 'muted' | 'outlined' | 'line'",
			default: "'outlined'",
			description: 'Visual style variant of the field'
		},
		{
			prop: 'size',
			type: "'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Size of the phone field'
		},
		{
			prop: 'name',
			type: 'string',
			default: 'undefined',
			description: 'Name attribute for the phone input (for form submission)'
		},
		{
			prop: 'dialCodeName',
			type: 'string',
			default: "'dialCode'",
			description: 'Name attribute for the hidden dial code input'
		},
		{
			prop: 'label',
			type: 'string',
			default: 'undefined',
			description: 'Label text displayed above or floating on the field'
		},
		{
			prop: 'isLabelActive',
			type: 'boolean',
			default: 'false',
			description: 'Force the floating label to be in active (raised) position'
		},
		{
			prop: 'helpText',
			type: 'string',
			default: 'undefined',
			description: 'Helper text displayed below the field'
		},
		{
			prop: 'errorText',
			type: 'string',
			default: 'undefined',
			description: 'Error message displayed below the field (adds error styling)'
		},
		{
			prop: 'isFloatLabel',
			type: 'boolean',
			default: 'false',
			description: 'Enable floating label behavior'
		},
		{
			prop: 'isSolid',
			type: 'boolean',
			default: 'false',
			description: 'Enable solid/filled background style'
		},
		{
			prop: 'priorityCountries',
			type: 'string[]',
			default: '[]',
			description: 'Array of country codes to show at the top of the list'
		},
		{
			prop: 'searchPlaceholder',
			type: 'string',
			default: "'Search country...'",
			description: 'Placeholder text for the country search input'
		},
		{
			prop: 'emptyText',
			type: 'string',
			default: "'No countries found'",
			description: 'Text shown when no countries match the search'
		},
		{
			prop: 'loadingText',
			type: 'string',
			default: "'Loading...'",
			description: 'Text shown while loading more countries'
		},
		{
			prop: 'onchange',
			type: '(value: string) => void',
			default: 'undefined',
			description: 'Callback fired when the phone value changes'
		},
		{
			prop: 'class',
			type: 'string',
			default: 'undefined',
			description: 'Additional CSS classes to apply to the container'
		}
	];
</script>

<DocsHeader title="PhoneField" llmUrl="https://ui-svelte.sappsdev.com/llm/form/phone-field.md">
	A phone number input field with integrated country code selector. Features a searchable dropdown
	with country flags, dial codes, and virtualized scrolling for performance.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<div class="column gap-4 w-full max-w-md">
			<PhoneField
				{variant}
				{size}
				{isFloatLabel}
				{isSolid}
				label="Phone Number"
				placeholder="Enter phone number"
				bind:value={phoneValue}
				bind:countryCode
				bind:dialCode
				priorityCountries={['us', 'mx', 'ca']}
			/>
			{#if phoneValue || dialCode}
				<div class="text-sm">
					Full number: +{dialCode}
					{phoneValue}
				</div>
			{/if}
		</div>
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={isFloatLabel} label="Float Label" />
			<Checkbox bind:checked={isSolid} label="Solid" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card>
		<div class="overflow-x-auto">
			<table class="w-full border-collapse">
				<thead>
					<tr class="border-b border-muted-200">
						<th class="text-left p-3 font-semibold">Prop</th>
						<th class="text-left p-3 font-semibold">Type</th>
						<th class="text-left p-3 font-semibold">Default</th>
						<th class="text-left p-3 font-semibold">Description</th>
					</tr>
				</thead>
				<tbody>
					{#each propsData as prop}
						<tr class="border-b border-muted-100">
							<td class="p-3"><code class="px-2 py-1 rounded text-sm">{prop.prop}</code></td>
							<td class="p-3"><code class="px-2 py-1 rounded text-xs">{prop.type}</code></td>
							<td class="p-3"><code class="px-2 py-1 rounded text-xs">{prop.default}</code></td>
							<td class="p-3 text-sm">{prop.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
</Section>

<Section bodyClass="grid-2 md:grid-3">
	<!-- Variants Example -->
	<Card>
		{#snippet header()}
			<h4>Variants</h4>
		{/snippet}
		<div class="column gap-3">
			<PhoneField variant="outlined" label="Outlined" priorityCountries={['us']} />
			<PhoneField variant="primary" label="Primary" priorityCountries={['us']} />
			<PhoneField variant="muted" label="Muted" priorityCountries={['us']} />
		</div>
		{#snippet footer()}
			<code class="text-xs">variant="outlined | primary | muted"</code>
		{/snippet}
	</Card>

	<!-- Sizes Example -->
	<Card>
		{#snippet header()}
			<h4>Sizes</h4>
		{/snippet}
		<div class="column gap-3">
			<PhoneField size="sm" label="Small" priorityCountries={['us']} />
			<PhoneField size="md" label="Medium" priorityCountries={['us']} />
			<PhoneField size="lg" label="Large" priorityCountries={['us']} />
		</div>
		{#snippet footer()}
			<code class="text-xs">size="sm | md | lg"</code>
		{/snippet}
	</Card>

	<!-- Floating Label Example -->
	<Card>
		{#snippet header()}
			<h4>Floating Label</h4>
		{/snippet}
		<div class="column gap-3">
			<PhoneField isFloatLabel label="Phone Number" priorityCountries={['us']} />
			<PhoneField isFloatLabel isSolid label="Solid Style" priorityCountries={['us']} />
		</div>
		{#snippet footer()}
			<code class="text-xs">isFloatLabel isSolid</code>
		{/snippet}
	</Card>

	<!-- Priority Countries Example -->
	<Card>
		{#snippet header()}
			<h4>Priority Countries</h4>
		{/snippet}
		<div class="column gap-3">
			<PhoneField label="US, MX, CA first" priorityCountries={['us', 'mx', 'ca']} />
		</div>
		{#snippet footer()}
			<code class="text-xs">priorityCountries={'{["us", "mx", "ca"]}'}</code>
		{/snippet}
	</Card>

	<!-- Error State Example -->
	<Card>
		{#snippet header()}
			<h4>Error State</h4>
		{/snippet}
		<div class="column gap-3">
			<PhoneField
				label="Phone"
				errorText="Please enter a valid phone number"
				priorityCountries={['us']}
			/>
		</div>
		{#snippet footer()}
			<code class="text-xs">errorText="..."</code>
		{/snippet}
	</Card>

	<!-- Help Text Example -->
	<Card>
		{#snippet header()}
			<h4>Help Text</h4>
		{/snippet}
		<div class="column gap-3">
			<PhoneField
				label="Phone"
				helpText="We'll never share your phone number"
				priorityCountries={['us']}
			/>
		</div>
		{#snippet footer()}
			<code class="text-xs">helpText="..."</code>
		{/snippet}
	</Card>
</Section>

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Form Submission:</strong> Use the
					<code class="px-1 py-0.5 bg-blue rounded">name</code> prop for the phone number and
					<code class="px-1 py-0.5 bg-blue rounded">dialCodeName</code> for the dial code hidden input
				</li>
				<li>
					<strong>Priority Countries:</strong> Set
					<code class="px-1 py-0.5 bg-blue rounded">priorityCountries</code> to show frequently used countries
					at the top of the dropdown
				</li>
				<li>
					<strong>Full Number:</strong> Combine
					<code class="px-1 py-0.5 bg-blue rounded">dialCode</code> and
					<code class="px-1 py-0.5 bg-blue rounded">value</code> for the complete phone number: +{'{dialCode}'}
					{'{value}'}
				</li>
				<li>
					<strong>Keyboard Navigation:</strong> The dropdown supports arrow keys, Enter to select, Escape
					to close, and type-ahead search
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<script lang="ts">
	import { PhoneField } from 'ui-svelte';

	let phoneValue = $state('');
	let countryCode = $state('');
	let dialCode = $state('');

	const handleChange = (value: string) => {
		console.log('Phone changed:', value);
	};
<\/script>

<!-- Basic Usage -->
<PhoneField
	label="Phone Number"
	bind:value={phoneValue}
	bind:countryCode
	bind:dialCode
/>

<!-- With Priority Countries -->
<PhoneField
	label="Phone"
	bind:value={phoneValue}
	priorityCountries={['us', 'mx', 'ca', 'gb']}
/>

<!-- Floating Label with Solid Style -->
<PhoneField
	isFloatLabel
	isSolid
	label="Contact Number"
	bind:value={phoneValue}
/>

<!-- With Form Names -->
<PhoneField
	name="phone"
	dialCodeName="country_dial_code"
	label="Phone"
	bind:value={phoneValue}
/>

<!-- With Validation -->
<PhoneField
	label="Phone"
	bind:value={phoneValue}
	errorText={phoneValue.length < 10 ? 'Phone number is too short' : ''}
	helpText="Enter your 10-digit phone number"
/>

<!-- Custom Dropdown Text -->
<PhoneField
	label="Phone"
	searchPlaceholder="Buscar país..."
	emptyText="No se encontraron países"
	loadingText="Cargando..."
/>`}
		/>
	</Card>
</Section>
