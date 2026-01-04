<script lang="ts">
	import { CsvField, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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
		{ id: 'ghost', label: 'Ghost' }
	];

	const sizeOptions = [
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	let color: any = $state('primary');
	let variant: any = $state('soft');
	let size: any = $state('md');
	let showPreview = $state(true);

	const requiredColumns = ['name', 'email', 'phone'];

	let hasProps = $derived(
		[color !== 'muted', variant !== 'soft', size !== 'md', !showPreview].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { CsvField } from 'ui-svelte';`,
			``,
			`\tconst requiredColumns = ['name', 'email', 'phone'];`,
			``,
			`\tconst handleMappingComplete = (data) => {`,
			`\t\tconsole.log('Mapped data:', data);`,
			`\t};`,
			`<\/script>`
		];

		const componentLines = [
			`<CsvField`,
			`\trequiredColumns={requiredColumns}`,
			`\tonMappingComplete={handleMappingComplete}`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'soft' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			!showPreview && `\tshowPreview={false}`,
			`/>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'requiredColumns', type: 'string[]', initial: '[]' },
		{
			prop: 'onMappingComplete',
			type: '(data: { file, mapping, data, originalData }) => void',
			initial: ''
		},
		{ prop: 'acceptMultipleFiles', type: 'boolean', initial: 'false' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'muted'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined | ghost',
			initial: 'soft'
		},
		{ prop: 'size', type: 'xs | sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'buttonText', type: 'string', initial: 'Seleccionar archivo CSV' },
		{ prop: 'showPreview', type: 'boolean', initial: 'true' },
		{ prop: 'previewRows', type: 'number', initial: '5' },
		{ prop: 'previewPageSize', type: 'number', initial: '10' }
	];

	function handleMappingComplete(data: any) {
		console.log('Mapping complete:', data);
	}
</script>

<DocsHeader title="CsvField" llmUrl="https://ui-svelte.sappsdev.com/llm/form/csv-field.md">
	CsvField allows users to upload CSV files and map columns to required fields with a preview table.
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
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={showPreview} label="Show Preview" />
		</div>

		<div class="doc-preview">
			<CsvField
				{requiredColumns}
				onMappingComplete={handleMappingComplete}
				{color}
				{variant}
				{size}
				{showPreview}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorItem}
					<CsvField
						requiredColumns={['name', 'email']}
						variant={item.id as any}
						color={colorItem.id as any}
						buttonText={item.label + ' ' + colorItem.label}
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each sizeOptions as sizeItem}
					<CsvField
						requiredColumns={['name', 'email']}
						variant={item.id as any}
						size={sizeItem.id as any}
						buttonText={item.label + ' ' + sizeItem.label}
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
