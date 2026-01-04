<script lang="ts">
	import { ArrowUploadRegularIcon } from '$lib/icons/index.js';
	import { Button, Modal, Select, TextField, Table, useTable, Chip } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	type Props = {
		requiredColumns?: string[];
		onMappingComplete?: (data: {
			file: File;
			mapping: Record<string, string>;
			data: any[];
			originalData: any[];
		}) => void;
		acceptMultipleFiles?: boolean;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft' | 'outlined' | 'ghost';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		class?: string;
		buttonText?: string;
		showPreview?: boolean;
		previewRows?: number;
		previewPageSize?: number;
	};

	let {
		requiredColumns = [],
		onMappingComplete = () => {},
		acceptMultipleFiles = false,
		color = 'primary',
		variant = 'solid',
		size = 'md',
		class: className,
		buttonText = 'Select CSV file',
		showPreview = true,
		previewRows = 5,
		previewPageSize = 10
	}: Props = $props();

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning'
	};

	const variants = {
		solid: 'is-solid',
		soft: 'is-soft',
		outlined: 'is-outlined',
		ghost: 'is-ghost'
	};

	const sizes = {
		xs: 'is-xs',
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	let fileInput = $state<HTMLInputElement | null>(null);
	let selectedFile = $state<File | null>(null);
	let showModal = $state(false);
	let csvColumns = $state<string[]>([]);
	let columnMapping = $state<Record<string, string>>({});
	let parseError = $state<string | null>(null);
	let csvData = $state<any[]>([]);
	let mappedData = $state<any[]>([]);
	let showPreviewTable = $state(false);

	function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		if (!file.name.endsWith('.csv')) {
			parseError = 'Please select a valid CSV file';
			return;
		}

		selectedFile = file;
		parseError = null;
		parseCSV(file);
	}

	function parseCSV(file: File) {
		const reader = new FileReader();

		reader.onload = (e) => {
			try {
				const text = e.target?.result as string;
				const lines = text.split('\n').filter((line) => line.trim());

				if (lines.length === 0) {
					parseError = 'The CSV file is empty';
					return;
				}

				const delimiter = text.includes(';') ? ';' : ',';
				const headers = lines[0].split(delimiter).map((h) => h.trim().replace(/^"|"$/g, ''));
				csvColumns = headers;

				csvData = lines.slice(1).map((line) => {
					const values = line.split(delimiter).map((v) => v.trim().replace(/^"|"$/g, ''));
					const row: Record<string, string> = {};
					headers.forEach((header, idx) => {
						row[header] = values[idx] || '';
					});
					return row;
				});

				const initialMapping: Record<string, string> = {};
				requiredColumns.forEach((reqCol) => {
					const match = headers.find((h) => h.toLowerCase() === reqCol.toLowerCase());
					initialMapping[reqCol] = match || '';
				});
				columnMapping = initialMapping;

				showModal = true;
			} catch (error: any) {
				parseError = 'Error parsing CSV file: ' + error.message;
			}
		};

		reader.onerror = () => {
			parseError = 'Error reading file';
		};

		reader.readAsText(file);
	}

	function confirmMapping() {
		const unmappedColumns = requiredColumns.filter((col) => !columnMapping[col]);

		if (unmappedColumns.length > 0) {
			parseError = `Please map the following columns: ${unmappedColumns.join(', ')}`;
			return;
		}

		mappedData = csvData.map((row) => {
			const newRow: Record<string, string> = {};
			Object.entries(columnMapping).forEach(([requiredCol, csvCol]) => {
				newRow[requiredCol] = row[csvCol] || '';
			});
			return newRow;
		});

		onMappingComplete({
			file: selectedFile!,
			mapping: columnMapping,
			data: mappedData,
			originalData: csvData
		});

		if (showPreview) {
			showPreviewTable = true;
		}

		closeModal();
	}

	function closeModal() {
		showModal = false;
		parseError = null;
	}

	function getPreviewData(requiredCol: string): string {
		const csvCol = columnMapping[requiredCol];
		if (!csvCol || csvData.length === 0) return 'N/A';
		return csvData[0][csvCol] || 'N/A';
	}

	function clearImport() {
		mappedData = [];
		showPreviewTable = false;
		selectedFile = null;
		if (fileInput) {
			fileInput.value = '';
		}
	}

	const selectOptions = $derived(
		csvColumns.map((col) => ({
			id: col,
			label: col
		}))
	);

	const previewTable = $derived(
		mappedData.length > 0
			? useTable({
					data: mappedData,
					columns: requiredColumns.map((col) => ({
						label: col.charAt(0).toUpperCase() + col.slice(1),
						field: col,
						sortable: true
					})),
					initialPageSize: previewPageSize
				})
			: null
	);

	const baseClasses = $derived(
		cn('csv-field', colors[color], variants[variant], sizes[size], className)
	);
</script>

<div class={baseClasses}>
	<input
		type="file"
		accept=".csv"
		bind:this={fileInput}
		onchange={handleFileSelect}
		class="csv-field-input"
	/>

	<Button
		{color}
		{variant}
		{size}
		startIcon={ArrowUploadRegularIcon}
		onclick={() => fileInput?.click()}
	>
		{selectedFile ? selectedFile.name : buttonText}
	</Button>

	{#if parseError}
		<div class="csv-field-error">
			{parseError}
		</div>
	{/if}

	{#if showPreviewTable && mappedData.length > 0 && previewTable}
		<div class="csv-preview-container">
			<div class="csv-preview-header">
				<div class="csv-preview-info">
					<h4 class="csv-preview-title">
						Imported Data
						<span class="csv-preview-count">({mappedData.length} records)</span>
					</h4>
					<div class="csv-mapping-summary">
						{#each Object.entries(columnMapping) as [required, csv], index}
							{#if index < 3}
								<Chip size="sm" {color} variant="soft">
									{required} → {csv}
								</Chip>
							{/if}
						{/each}
						{#if Object.entries(columnMapping).length > 3}
							<Chip size="sm" {color} variant="soft">
								+{Object.entries(columnMapping).length - 3} more
							</Chip>
						{/if}
					</div>
				</div>
				<Button {color} variant="ghost" size="sm" onclick={clearImport}>
					<span class="csv-clear-icon">✕</span>
					Clear
				</Button>
			</div>

			<Table table={previewTable} showPagination isStriped hasDividers size="sm" />
		</div>
	{/if}
</div>

<Modal bind:open={showModal} onclose={closeModal} color="surface">
	{#snippet header()}
		<h2 class="csv-modal-title">Map CSV Columns</h2>
	{/snippet}

	<div class="csv-modal-body">
		<p class="csv-instructions">
			Map each required column to the corresponding column from the CSV file:
		</p>

		<div class="csv-mapping-list">
			{#each requiredColumns as requiredCol, index}
				<div class="csv-mapping-item">
					<Select
						label={requiredCol}
						options={selectOptions}
						bind:value={columnMapping[requiredCol]}
						placeholder="-- Select column --"
						variant="outlined"
						size="md"
						isFloatLabel
					/>

					{#if columnMapping[requiredCol]}
						<TextField
							value={getPreviewData(requiredCol)}
							label="Preview"
							variant="soft"
							color="muted"
							size="sm"
							isFloatLabel
							islabelActive
						/>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	{#snippet footer()}
		<div class="csv-modal-footer">
			<Button color="muted" variant="ghost" size="md" onclick={closeModal}>Cancel</Button>
			<Button color="primary" variant="solid" size="md" onclick={confirmMapping}
				>Confirm mapping</Button
			>
		</div>
	{/snippet}
</Modal>
