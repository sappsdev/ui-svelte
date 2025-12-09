<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { DateField, Select, Checkbox, Section } from 'ui-svelte';

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

	// States
	let isFloatLabel = $state(false);
	let isSolid = $state(false);
	let withMinDate = $state(false);
	let withMaxDate = $state(false);

	// Date values
	let value = $state<Date | null>(null);

	const today = new Date();
	const minDate = $derived(
		withMinDate ? new Date(today.getFullYear(), today.getMonth(), 1) : undefined
	);
	const maxDate = $derived(
		withMaxDate ? new Date(today.getFullYear(), today.getMonth() + 1, 0) : undefined
	);

	let hasProps = $derived(
		[
			variant !== 'outlined',
			size !== 'md',
			label,
			helpText,
			errorText,
			isFloatLabel,
			isSolid,
			withMinDate,
			withMaxDate
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { DateField } from 'ui-svelte';`,
			`\n\tlet value = $state<Date | null>(null);`,
			withMinDate && `\tconst minDate = new Date(${today.getFullYear()}, ${today.getMonth()}, 1);`,
			withMaxDate &&
				`\tconst maxDate = new Date(${today.getFullYear()}, ${today.getMonth() + 1}, 0);`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<DateField`,
			hasProps && `\tname="date"`,
			hasProps && `\tplaceholder="Selecciona una fecha"`,
			label && `\tlabel="${label}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			helpText && `\thelpText="This is a help text"`,
			errorText && `\terrorText="This field is required"`,
			isFloatLabel && `\tisFloatLabel`,
			isSolid && `\tisSolid`,
			withMinDate && `\tminDate={minDate}`,
			withMaxDate && `\tmaxDate={maxDate}`,
			hasProps && `\tbind:value`,
			hasProps && `/>`,
			!hasProps && `<DateField name="date" placeholder="Selecciona una fecha" bind:value />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'value', type: 'Date | string | null', initial: 'null' },
		{ prop: 'selected', type: 'Date', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: 'Selecciona una fecha' },
		{ prop: 'onchange', type: '(value: Date | null) => void', initial: '' },
		{ prop: 'variant', type: 'primary | secondary | muted | outlined | line', initial: 'outlined' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'isLabelActive', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{ prop: 'minDate', type: 'Date', initial: '' },
		{ prop: 'maxDate', type: 'Date', initial: '' }
	];

	const keyboardShortcuts = [
		{ key: 'Arrow Keys', description: 'Navigate between days (←/→) and weeks (↑/↓)' },
		{ key: 'Enter', description: 'Select the focused day' },
		{ key: 'Escape', description: 'Close the calendar picker' },
		{ key: 'PageUp', description: 'Go to previous month' },
		{ key: 'PageDown', description: 'Go to next month' },
		{ key: 'Home', description: 'Go to first day of the month' },
		{ key: 'End', description: 'Go to last day of the month' }
	];
</script>

{#snippet preview()}
	<DateField
		name="date"
		placeholder="Selecciona una fecha"
		{variant}
		{size}
		{isSolid}
		label={label || undefined}
		helpText={helpText || undefined}
		errorText={errorText || undefined}
		isFloatLabel={label && isFloatLabel ? isFloatLabel : undefined}
		{minDate}
		{maxDate}
		bind:value
	/>
	{#if value}
		<p class="text-sm text-muted mt-2">
			Fecha seleccionada: {value.toLocaleDateString('es-ES', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>
	{/if}
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />

	<DocOptions title="Date Constraints">
		<Checkbox bind:checked={withMinDate} label="Min Date (First day of current month)" />
		<Checkbox bind:checked={withMaxDate} label="Max Date (Last day of current month)" />
	</DocOptions>

	<DocOptions title="Labels & Messages">
		<Checkbox onchange={(v) => (v ? (label = 'Fecha') : (label = ''))} label="Label" />
		{#if label}
			<Checkbox bind:checked={isFloatLabel} label="floatLabel" />
		{/if}
		<Checkbox
			onchange={(v) => (v ? (helpText = 'Selecciona una fecha válida') : (helpText = ''))}
			label="helpText"
		/>
		<Checkbox
			onchange={(v) => (v ? (errorText = 'Este campo es requerido') : (errorText = ''))}
			label="errorText"
		/>
		<Checkbox bind:checked={isSolid} label="solid" />
	</DocOptions>
{/snippet}

<DocHeader title="DateField">
	DateField components allow users to select a date using an interactive calendar picker with full
	keyboard navigation support.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<Section class="prose mt-8">
	<h3>Keyboard Navigation</h3>
	<p>
		The DateField component provides comprehensive keyboard navigation for improved accessibility
		and user experience:
	</p>
	<table class="min-w-full mt-4">
		<thead>
			<tr class="border-b border-muted">
				<th class="text-left py-2 px-4 font-semibold">Key</th>
				<th class="text-left py-2 px-4 font-semibold">Description</th>
			</tr>
		</thead>
		<tbody>
			{#each keyboardShortcuts as { key, description }}
				<tr class="border-b border-muted/50">
					<td class="py-2 px-4 font-mono text-sm">{key}</td>
					<td class="py-2 px-4">{description}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Section>

<Section class="prose mt-8">
	<h3>Features</h3>
	<ul>
		<li><strong>Visual Indicators:</strong> Today's date is highlighted with a dot indicator</li>
		<li>
			<strong>Date Constraints:</strong> Set minimum and maximum dates to restrict available selections
		</li>
		<li><strong>Keyboard Focus:</strong> Visual feedback for keyboard-focused days</li>
		<li><strong>Clear Function:</strong> Easy way to clear the selected date</li>
		<li>
			<strong>Smart Positioning:</strong> Calendar automatically positions itself to stay within viewport
		</li>
		<li><strong>Responsive Design:</strong> Works seamlessly on desktop and mobile devices</li>
	</ul>
</Section>

<Section class="prose mt-8">
	<h3>Usage Examples</h3>

	<h4>Basic Usage</h4>
	<pre><code
			>&lt;script&gt;
	import &#123; DateField &#125; from 'ui-svelte';
	let date = $state(null);
&lt;/script&gt;

&lt;DateField name="birthdate" bind:value=&#123;date&#125; /&gt;</code
		></pre>

	<h4>With Date Constraints</h4>
	<pre><code
			>&lt;script&gt;
	import &#123; DateField &#125; from 'ui-svelte';

	let date = $state(null);
	const today = new Date();
	const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
	const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
&lt;/script&gt;

&lt;DateField
	name="appointment"
	label="Fecha de cita"
	minDate=&#123;minDate&#125;
	maxDate=&#123;maxDate&#125;
	bind:value=&#123;date&#125;
/&gt;</code
		></pre>

	<h4>With Callback</h4>
	<pre><code
			>&lt;script&gt;
	import &#123; DateField &#125; from 'ui-svelte';

	let date = $state(null);

	const handleDateChange = (newDate) => &#123;
		console.log('Selected date:', newDate);
		// Perform additional actions
	&#125;;
&lt;/script&gt;

&lt;DateField
	name="date"
	label="Selecciona una fecha"
	onchange=&#123;handleDateChange&#125;
	bind:value=&#123;date&#125;
/&gt;</code
		></pre>
</Section>
