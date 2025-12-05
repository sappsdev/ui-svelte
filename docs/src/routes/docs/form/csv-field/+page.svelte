<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Select, Checkbox, Section, CsvField } from 'ui-svelte';

	type ExampleType = 'basic' | 'custom' | 'no-preview';
	let currentExample: ExampleType = $state('basic');

	const exampleOptions = [
		{ id: 'basic', label: 'Basic Import' },
		{ id: 'custom', label: 'Custom Styling' },
		{ id: 'no-preview', label: 'Without Preview' }
	];

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	const sizeOptions = [
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	const pageSizeOptions = [
		{ id: 5, label: '5' },
		{ id: 10, label: '10' },
		{ id: 25, label: '25' },
		{ id: 50, label: '50' }
	];

	// Props for builder
	let variant: any = $state('primary');
	let size: any = $state('md');
	let buttonText = $state('');
	let previewPageSize: any = $state(10);
	let isSolid = $state(false);
	let showPreview = $state(true);

	const requiredColumns = ['nombre', 'email', 'telefono', 'ciudad'];

	function handleMappingComplete(result: any) {
		console.log('Datos mapeados:', result.data);
		console.log('Mapeo aplicado:', result.mapping);
	}

	// Update props when example changes
	$effect(() => {
		if (currentExample === 'basic') {
			variant = 'primary';
			size = 'md';
			buttonText = '';
			isSolid = false;
			showPreview = true;
			previewPageSize = 10;
		} else if (currentExample === 'custom') {
			variant = 'success';
			size = 'lg';
			buttonText = 'Importar Contactos';
			isSolid = true;
			showPreview = true;
			previewPageSize = 5;
		} else if (currentExample === 'no-preview') {
			variant = 'primary';
			size = 'md';
			buttonText = 'Cargar CSV';
			isSolid = false;
			showPreview = false;
			previewPageSize = 10;
		}
	});

	const codeSnippets: Record<ExampleType, string> = {
		basic: `<script lang="ts">
	import { CsvField } from 'ui-svelte';

	const requiredColumns = ['nombre', 'email', 'telefono', 'ciudad'];

	function handleMappingComplete(result: any) {
		console.log('File:', result.file.name);
		console.log('Mapping:', result.mapping);
		console.log('Data:', result.data);
		console.log('Original Data:', result.originalData);
	}
<\/script>

<CsvField
	{requiredColumns}
	onMappingComplete={handleMappingComplete}
/>`,

		custom: `<script lang="ts">
	import { CsvField } from 'ui-svelte';

	const requiredColumns = ['nombre', 'email', 'telefono', 'ciudad'];

	function handleMappingComplete(result: any) {
		console.log('Imported', result.data.length, 'contacts');
		// Send to API, save to database, etc.
	}
<\/script>

<CsvField
	{requiredColumns}
	onMappingComplete={handleMappingComplete}
	variant="success"
	size="lg"
	isSolid
	buttonText="Importar Contactos"
	previewPageSize={5}
/>`,

		'no-preview': `<script lang="ts">
	import { CsvField } from 'ui-svelte';

	const requiredColumns = ['nombre', 'email', 'telefono'];
	let importedData = $state<any[]>([]);

	function handleMappingComplete(result: any) {
		importedData = result.data;
		// Handle the data your own way
	}
<\/script>

<CsvField
	{requiredColumns}
	onMappingComplete={handleMappingComplete}
	showPreview={false}
	buttonText="Cargar CSV"
/>

<!-- Custom display -->
{#if importedData.length > 0}
	<div class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
		<p class="text-green-800 font-semibold">
			✓ Successfully imported {importedData.length} records
		</p>
	</div>
{/if}`
	};

	let code = $derived(codeSnippets[currentExample]);

	const props = [
		{ prop: 'requiredColumns', type: 'string[]', initial: '[]', required: false },
		{
			prop: 'onMappingComplete',
			type: '(data: MappingResult) => void',
			initial: '',
			required: false
		},
		{ prop: 'acceptMultipleFiles', type: 'boolean', initial: 'false', required: false },
		{
			prop: 'variant',
			type: 'primary | secondary | muted | success | info | danger | warning | outlined | ghost',
			initial: 'primary'
		},
		{ prop: 'size', type: 'xs | sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'buttonText', type: 'string', initial: 'Seleccionar archivo CSV' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{
			prop: 'showPreview',
			type: 'boolean',
			initial: 'true',
			description: 'Show preview table after import'
		},
		{
			prop: 'previewRows',
			type: 'number',
			initial: '5',
			description: 'Initial rows shown in preview'
		},
		{
			prop: 'previewPageSize',
			type: 'number',
			initial: '10',
			description: 'Page size for preview table'
		}
	];

	const mappingResultProps = [
		{ prop: 'file', type: 'File', initial: '', required: true },
		{ prop: 'mapping', type: 'Record<string, string>', initial: '', required: true },
		{ prop: 'data', type: 'any[]', initial: '', required: true },
		{ prop: 'originalData', type: 'any[]', initial: '', required: true }
	];
</script>

{#snippet preview()}
	<CsvField
		{requiredColumns}
		onMappingComplete={handleMappingComplete}
		{variant}
		{size}
		{isSolid}
		{showPreview}
		{previewPageSize}
		buttonText={buttonText || undefined}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Example Type" size="sm" options={exampleOptions} bind:value={currentExample} />

	<DocOptions title="">
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
	</DocOptions>

	<DocOptions title="Preview Options">
		<Checkbox bind:checked={showPreview} label="Show Preview Table" />
		<Select
			label="Preview Page Size"
			size="sm"
			options={pageSizeOptions}
			bind:value={previewPageSize}
		/>
	</DocOptions>

	<DocOptions title="Button Options">
		<Checkbox
			onchange={(v) => (v ? (buttonText = 'Cargar CSV') : (buttonText = ''))}
			label="Custom buttonText"
		/>
		<Checkbox bind:checked={isSolid} label="solid" />
	</DocOptions>
{/snippet}

<DocHeader title="CsvField">
	CsvField component allows users to upload CSV files, map their columns to required fields, and
	preview the imported data in an integrated table.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode {code} />

<DocProps {props} />

<Section class="prose mt-8">
	<h3>MappingResult Type</h3>
	<p>The onMappingComplete callback receives an object with the following structure:</p>
</Section>

<DocProps props={mappingResultProps} />

<Section class="prose mt-8">
	<h3>Features</h3>
	<ul>
		<li>
			<strong>Automatic delimiter detection:</strong> Supports both comma (,) and semicolon (;) delimiters
		</li>
		<li>
			<strong>Smart column mapping:</strong> Automatically matches CSV columns to required fields (case-insensitive)
		</li>
		<li><strong>Data preview:</strong> Shows a preview of mapped data before confirmation</li>
		<li>
			<strong>Integrated table preview:</strong> Displays imported data in a sortable, paginated table
			with column mapping summary
		</li>
		<li><strong>Validation:</strong> Ensures all required columns are mapped before proceeding</li>
		<li>
			<strong>Error handling:</strong> Clear error messages for invalid files or parsing issues
		</li>
		<li><strong>Flexible styling:</strong> Supports all Button variants and sizes</li>
		<li><strong>Clear functionality:</strong> Easy reset button to clear imported data</li>
	</ul>

	<h3>Preview Table</h3>
	<p>After confirming the column mapping, the component automatically displays:</p>
	<ul>
		<li>Total record count</li>
		<li>Visual summary of column mappings using chips</li>
		<li>Sortable table with pagination</li>
		<li>Clear button to reset the import</li>
	</ul>

	<h3>Expected CSV Format</h3>
	<p>The CSV file should have headers in the first row. Example:</p>
</Section>

<DocCode
	code={`nombre,email,telefono,ciudad
Juan Pérez,juan@example.com,555-1234,Madrid
María García,maria@example.com,555-5678,Barcelona
Pedro López,pedro@example.com,555-9012,Valencia`}
/>

<Section class="prose mt-8">
	<h3>Import Process</h3>
	<ol>
		<li>User clicks the button to select a CSV file</li>
		<li>Component parses the file and extracts column headers</li>
		<li>A modal opens showing required columns and available CSV columns</li>
		<li>Automatic matching is attempted (case-insensitive)</li>
		<li>User can manually map any unmatched columns</li>
		<li>Data preview is shown for each mapped column</li>
		<li>Upon confirmation, data is transformed and returned via callback</li>
		<li>
			If showPreview is enabled, a sortable table displays the imported data with:
			<ul>
				<li>Total record count</li>
				<li>Column mapping summary using chips</li>
				<li>Pagination and sorting capabilities</li>
				<li>Clear button to reset the import</li>
			</ul>
		</li>
	</ol>

	<h3>Customization Tips</h3>
	<ul>
		<li>
			<strong>Button appearance:</strong> Use variant, size, and isSolid props to match your design
		</li>
		<li>
			<strong>Button text:</strong> Customize buttonText for different contexts ("Import Users", "Load
			Data", etc.)
		</li>
		<li>
			<strong>Preview control:</strong> Set showPreview={false} if you want to build your own preview
			UI
		</li>
		<li>
			<strong>Table pagination:</strong> Adjust previewPageSize based on your expected data volume
		</li>
	</ul>
</Section>
