<script lang="ts">
	import { RadioGroup, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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

	const demoOptions = [
		{ id: 'option1', label: 'Option 1' },
		{ id: 'option2', label: 'Option 2' },
		{ id: 'option3', label: 'Option 3' }
	];

	let color: any = $state('primary');
	let size: any = $state('md');
	let showLabel = $state(true);
	let showInfo = $state(false);
	let showError = $state(false);
	let selectedValue: any = $state('option1');

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { RadioGroup } from 'ui-svelte';`,
			``,
			`\tconst options = [`,
			`\t\t{ id: 'option1', label: 'Option 1' },`,
			`\t\t{ id: 'option2', label: 'Option 2' },`,
			`\t\t{ id: 'option3', label: 'Option 3' }`,
			`\t];`,
			``,
			`\tlet value = $state('option1');`,
			`<\/script>`
		];

		const componentLines = [
			`<RadioGroup`,
			`\toptions={options}`,
			`\tbind:value`,
			color !== 'primary' && `\tcolor="${color}"`,
			size !== 'md' && `\tsize="${size}"`,
			showLabel && `\tlabel="Select an option"`,
			showInfo && `\tinfo="This is a helper text"`,
			showError && `\terror="This field is required"`,
			`/>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'options', type: 'Option[]', initial: '[]' },
		{ prop: 'value', type: 'string | number', initial: '' },
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'info', type: 'string', initial: '' },
		{ prop: 'error', type: 'string', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted',
			initial: 'primary'
		},
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'onchange', type: '(value: string | number) => void', initial: '' }
	];
</script>

<DocsHeader title="RadioGroup" llmUrl="https://ui-svelte.sappsdev.com/llm/form/radio-group.md">
	RadioGroup allows users to select one option from a set of mutually exclusive choices.
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
			<Checkbox bind:checked={showLabel} label="Label" />
			<Checkbox bind:checked={showInfo} label="Info" />
			<Checkbox bind:checked={showError} label="Error" />
		</div>

		<div class="doc-preview">
			<RadioGroup
				options={demoOptions}
				bind:value={selectedValue}
				{color}
				{size}
				label={showLabel ? 'Select an option' : undefined}
				info={showInfo ? 'This is a helper text' : undefined}
				error={showError ? 'This field is required' : undefined}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card>
		<div class="wrap gap-8">
			{#each colorOptions as colorItem}
				<RadioGroup
					options={demoOptions}
					value="option1"
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
		<div class="wrap gap-8">
			{#each sizeOptions as sizeItem}
				<RadioGroup
					options={demoOptions}
					value="option1"
					size={sizeItem.id as any}
					label={'Size: ' + sizeItem.label}
				/>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">States</p>
	<Card>
		<div class="wrap gap-8">
			<RadioGroup
				options={demoOptions}
				value="option1"
				label="With Info"
				info="Choose one of the options above"
			/>
			<RadioGroup
				options={demoOptions}
				value="option1"
				label="With Error"
				error="This field is required"
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
