<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { PhoneField, Select, Checkbox, Section } from 'ui-svelte';

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
	let placeholder = $state('');

	// States
	let isFloatLabel = $state(false);
	let isSolid = $state(false);
	let withPriorityCountries = $state(false);

	let priorityCountries = $derived(withPriorityCountries ? ['us', 'gb', 'ca', 'au'] : []);

	let hasProps = $derived(
		[
			variant !== 'outlined',
			size !== 'md',
			label,
			helpText,
			errorText,
			placeholder,
			isFloatLabel,
			isSolid,
			withPriorityCountries
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { PhoneField } from 'ui-svelte';`,
			`\n\tlet value = $state('');`,
			`\tlet countryCode = $state('');`,
			`\tlet dialCode = $state('');`,
			withPriorityCountries && `\n\tconst priorityCountries = ['us', 'gb', 'ca', 'au'];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<PhoneField`,
			hasProps && `\tname="phone"`,
			placeholder && `\tplaceholder="${placeholder}"`,
			label && `\tlabel="${label}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			helpText && `\thelpText="${helpText}"`,
			errorText && `\terrorText="${errorText}"`,
			isFloatLabel && `\tisFloatLabel`,
			isSolid && `\tisSolid`,
			withPriorityCountries && `\tpriorityCountries={priorityCountries}`,
			hasProps && `\tbind:value`,
			hasProps && `\tbind:countryCode`,
			hasProps && `\tbind:dialCode`,
			hasProps && `/>`,
			!hasProps && `<PhoneField name="phone" bind:value bind:countryCode bind:dialCode />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'value', type: 'string', initial: '' },
		{ prop: 'countryCode', type: 'string', initial: '' },
		{ prop: 'dialCode', type: 'string', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: 'Enter phone number' },
		{ prop: 'onchange', type: '(value: string) => void', initial: '' },
		{ prop: 'variant', type: 'primary | secondary | muted | outlined | line', initial: 'outlined' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'dialCodeName', type: 'string', initial: 'dialCode' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'isLabelActive', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{ prop: 'priorityCountries', type: 'string[]', initial: '[]' },
		{ prop: 'searchPlaceholder', type: 'string', initial: 'Search country...' },
		{ prop: 'emptyText', type: 'string', initial: 'No countries found' },
		{ prop: 'loadingText', type: 'string', initial: 'Loading...' }
	];

	let value = $state('');
	let countryCode = $state('');
	let dialCode = $state('');
</script>

{#snippet preview()}
	<PhoneField
		name="phone"
		{variant}
		{size}
		{isSolid}
		label={label || undefined}
		placeholder={placeholder || undefined}
		helpText={helpText || undefined}
		errorText={errorText || undefined}
		isFloatLabel={label && isFloatLabel ? isFloatLabel : undefined}
		{priorityCountries}
		bind:value
		bind:countryCode
		bind:dialCode
	/>

	{#if value || countryCode || dialCode}
		<div class="mt-4 p-4 bg-muted/20 rounded-ui text-sm">
			<div><strong>Country Code:</strong> {countryCode || 'Not selected'}</div>
			<div><strong>Dial Code:</strong> {dialCode ? `+${dialCode}` : 'Not selected'}</div>
			<div><strong>Phone Number:</strong> {value || 'Empty'}</div>
			<div>
				<strong>Full Number:</strong>
				{dialCode && value ? `+${dialCode} ${value}` : 'Incomplete'}
			</div>
		</div>
	{/if}
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />

	<DocOptions title="Features">
		<Checkbox bind:checked={withPriorityCountries} label="Priority Countries" />
	</DocOptions>

	<DocOptions title="Labels & Messages">
		<Checkbox onchange={(v) => (v ? (label = 'Phone Number') : (label = ''))} label="Label" />
		{#if label}
			<Checkbox bind:checked={isFloatLabel} label="floatLabel" />
		{/if}
		<Checkbox
			onchange={(v) => (v ? (placeholder = 'Enter your phone') : (placeholder = ''))}
			label="placeholder"
		/>
		<Checkbox
			onchange={(v) => (v ? (helpText = 'Include your country code') : (helpText = ''))}
			label="helpText"
		/>
		<Checkbox
			onchange={(v) => (v ? (errorText = 'Phone number is required') : (errorText = ''))}
			label="errorText"
		/>
		<Checkbox bind:checked={isSolid} label="solid" />
	</DocOptions>
{/snippet}

<DocHeader title="PhoneField">
	PhoneField component allows users to enter phone numbers with automatic country code selection and
	formatting.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<Section class="prose mt-8">
	<h3>Features</h3>
	<ul>
		<li><strong>Country Selection:</strong> Dropdown with all countries and their dial codes</li>
		<li><strong>Flag Icons:</strong> Visual country identification with flag avatars</li>
		<li><strong>Search:</strong> Quick search through countries by name or dial code</li>
		<li><strong>Priority Countries:</strong> Pin frequently used countries to the top</li>
		<li><strong>Keyboard Navigation:</strong> Full keyboard support with arrow keys</li>
		<li><strong>Infinite Scroll:</strong> Efficient loading of large country lists</li>
		<li><strong>Auto-focus:</strong> Phone input focuses after country selection</li>
	</ul>

	<h3>Usage Example</h3>
	<p>The component binds three values: the phone number, country code, and dial code:</p>

	<pre><code
			>{`<script>
  let value = $state('');        // Phone number: "5551234567"
  let countryCode = $state('');  // ISO code: "us"
  let dialCode = $state('');     // Dial code: "1"
<\/script>

<PhoneField
  name="phone"
  bind:value
  bind:countryCode
  bind:dialCode
/>`}</code
		></pre>

	<h3>Priority Countries</h3>
	<p>You can pin specific countries to the top of the list for easier access:</p>

	<pre><code
			>{`<PhoneField
  name="phone"
  priorityCountries={['us', 'gb', 'ca', 'au']}
  bind:value
  bind:countryCode
  bind:dialCode
/>`}</code
		></pre>

	<h3>Form Integration</h3>
	<p>The component creates two form inputs:</p>
	<ul>
		<li><code>name</code> - Contains the phone number value</li>
		<li><code>dialCodeName</code> - Contains the dial code (default: "dialCode")</li>
	</ul>
</Section>
