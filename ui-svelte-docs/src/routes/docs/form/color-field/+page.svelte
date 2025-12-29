<script lang="ts">
	import { Card, Checkbox, Code, ColorField, Section, Select } from 'ui-svelte';
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
	let label = $state('');

	// Show format props
	let showHex = $state(false);
	let showRgb = $state(false);
	let showCmyk = $state(false);
	let showOklch = $state(false);

	// Bindable color values
	let hex = $state('#3b82f6');
	let rgb = $state('');
	let cmyk = $state('');
	let oklch = $state('');
	let foreground = $state('');

	let hasProps = $derived(
		[
			color !== 'muted',
			variant !== 'outlined',
			size !== 'md',
			isFloatLabel,
			label,
			showHex,
			showRgb,
			showCmyk,
			showOklch
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { ColorField } from 'ui-svelte';`,
			``,
			`\tlet hex = $state('#3b82f6');`,
			`\tlet rgb = $state('');`,
			`\tlet cmyk = $state('');`,
			`\tlet oklch = $state('');`,
			`\tlet foreground = $state('');`,
			`<\/script>`
		];

		const componentLines = [
			`<ColorField`,
			`\tbind:hex`,
			`\tbind:rgb`,
			`\tbind:cmyk`,
			`\tbind:oklch`,
			`\tbind:foreground`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			isFloatLabel && `\tisFloatLabel`,
			label && `\tlabel="${label}"`,
			showHex && `\tshowHex`,
			showRgb && `\tshowRgb`,
			showCmyk && `\tshowCmyk`,
			showOklch && `\tshowOklch`,
			`/>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'hex', type: 'string', initial: '#3b82f6' },
		{ prop: 'rgb', type: 'string', initial: '' },
		{ prop: 'cmyk', type: 'string', initial: '' },
		{ prop: 'oklch', type: 'string', initial: '' },
		{ prop: 'foreground', type: 'string', initial: '' },
		{ prop: 'onHex', type: '(value: string) => void', initial: '' },
		{ prop: 'onRgb', type: '(value: string) => void', initial: '' },
		{ prop: 'onCmyk', type: '(value: string) => void', initial: '' },
		{ prop: 'onOklch', type: '(value: string) => void', initial: '' },
		{ prop: 'onForeground', type: '(value: string) => void', initial: '' },
		{ prop: 'showHex', type: 'boolean', initial: 'false', description: 'Show HEX value in picker' },
		{ prop: 'showRgb', type: 'boolean', initial: 'false', description: 'Show RGB value in picker' },
		{
			prop: 'showCmyk',
			type: 'boolean',
			initial: 'false',
			description: 'Show CMYK value in picker'
		},
		{
			prop: 'showOklch',
			type: 'boolean',
			initial: 'false',
			description: 'Show OKLCH value in picker'
		},
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
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: 'Select color' }
	];
</script>

<DocsHeader title="ColorField" llmUrl="https://ui-svelte.sappsdev.com/llm/form/color-field.md">
	A color picker field that displays the selected color in multiple formats (HEX, RGB, CMYK, OKLCH)
	with an interactive color picker popover.
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
			<Checkbox bind:checked={isFloatLabel} label="Float Label" />
			<Checkbox
				onchange={(v) => (v ? (label = 'Color') : (label = ''))}
				name="label"
				label="Label"
			/>
			<Checkbox bind:checked={showHex} label="showHex" />
			<Checkbox bind:checked={showRgb} label="showRgb" />
			<Checkbox bind:checked={showCmyk} label="showCmyk" />
			<Checkbox bind:checked={showOklch} label="showOklch" />
		</div>

		<div class="doc-preview">
			<ColorField
				{color}
				{variant}
				{size}
				{isFloatLabel}
				label={label || undefined}
				{showHex}
				{showRgb}
				{showCmyk}
				{showOklch}
				bind:hex
				bind:rgb
				bind:cmyk
				bind:oklch
				bind:foreground
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Color Values Output</p>
	<Card>
		<div class="column gap-2">
			<Code code={`hex: "${hex}"`} lang="css" disableCopy hideLang />
			<Code code={`rgb: "${rgb}"`} lang="css" disableCopy hideLang />
			<Code code={`cmyk: "${cmyk}"`} lang="css" disableCopy hideLang />
			<Code code={`oklch: "${oklch}"`} lang="css" disableCopy hideLang />
			<Code code={`foreground: "${foreground}"`} lang="css" disableCopy hideLang />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4">
				{#each colorOptions as col}
					<ColorField variant={item.id as any} color={col.id as any} rootClass="max-w-56" />
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		<div class="wrap gap-4 items-end">
			{#each sizeOptions as sizeOpt}
				<ColorField size={sizeOpt.id as any} rootClass="max-w-56" label={sizeOpt.label} />
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Float Label</p>
	<Card>
		<div class="wrap gap-4">
			{#each variantOptions as item}
				<ColorField variant={item.id as any} isFloatLabel label={item.label} rootClass="max-w-56" />
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
