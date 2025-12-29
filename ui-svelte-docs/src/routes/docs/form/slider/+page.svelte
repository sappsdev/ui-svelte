<script lang="ts">
	import { Card, Checkbox, Code, Section, Select, Slider } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	let color: any = $state('primary');
	let size: any = $state('md');
	let value = $state(50);
	let showLabel = $state(true);
	let hideLabel = $state(false);
	let customRange = $state(false);
	let customStep = $state(false);

	let hasProps = $derived(
		[color !== 'primary', size !== 'md', showLabel, hideLabel, customRange, customStep].some(
			Boolean
		)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Slider } from 'ui-svelte';`,
			`\n\tlet value = $state(50);`,
			`\n\tconst handleChange = (val: number) => {`,
			`\t\tconsole.log('Slider value:', val);`,
			`\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Slider`,
			hasProps && `\tname="slider"`,
			hasProps && `\tbind:value`,
			showLabel && `\tlabel="Volume"`,
			color !== 'primary' && `\tcolor="${color}"`,
			size !== 'md' && `\tsize="${size}"`,
			customRange && `\tmin={0}`,
			customRange && `\tmax={200}`,
			customStep && `\tstep={5}`,
			hideLabel && `\thideLabel`,
			hasProps && `\tonchange={handleChange}`,
			hasProps && `/>`,
			!hasProps && `<Slider name="slider" bind:value onchange={handleChange} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'value', type: 'number', initial: '0' },
		{ prop: 'min', type: 'number', initial: '0' },
		{ prop: 'max', type: 'number', initial: '100' },
		{ prop: 'step', type: 'number', initial: '1' },
		{ prop: 'onchange', type: '(value: number) => void', initial: '' },
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'hideLabel', type: 'boolean', initial: 'false' },
		{
			prop: 'color',
			type: 'primary | secondary | muted',
			initial: 'primary'
		},
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' }
	];
</script>

<DocsHeader title="Slider" llmUrl="https://ui-svelte.sappsdev.com/llm/form/slider.md">
	Sliders allow users to select a numeric value within a specified range.
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
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={showLabel} label="Show Label" />
			<Checkbox bind:checked={hideLabel} label="Hide Label" disabled={!showLabel} />
			<Checkbox bind:checked={customRange} label="Custom Range (0-200)" />
			<Checkbox bind:checked={customStep} label="Custom Step (5)" />
		</div>

		<div class="doc-preview">
			<Slider
				name="demo-slider"
				bind:value
				{color}
				{size}
				label={showLabel ? 'Volume' : undefined}
				{hideLabel}
				min={customRange ? 0 : 0}
				max={customRange ? 200 : 100}
				step={customStep ? 5 : 1}
				class="max-w-xs"
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card>
		<div class="column gap-4">
			{#each colorOptions as colorItem}
				<Slider
					name={colorItem.id}
					value={50}
					color={colorItem.id as any}
					label={colorItem.label}
				/>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		<div class="column gap-4">
			{#each sizeOptions as sizeItem}
				<Slider name={sizeItem.id} value={50} size={sizeItem.id as any} label={sizeItem.label} />
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Custom Range & Step</p>
	<Card>
		<div class="column gap-4">
			<Slider name="range-slider" value={25} min={0} max={50} label="Range 0-50" />
			<Slider name="step-slider" value={50} step={10} label="Step: 10" />
			<Slider
				name="custom-slider"
				value={100}
				min={50}
				max={200}
				step={25}
				label="Range 50-200, Step 25"
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Without Label</p>
	<Card>
		<div class="column gap-4">
			{#each colorOptions as colorItem}
				<Slider name={`no-label-${colorItem.id}`} value={50} color={colorItem.id as any} />
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
