<script lang="ts">
	import { Button, Modal, Select, TextField, Table, useTable, Chip } from '$lib/index.js';
	import type { Snippet } from 'svelte';

	type Props = {
		requiredColumns?: string[];
		onMappingComplete?: (data: {
			file: File;
			mapping: Record<string, string>;
			data: any[];
			originalData: any[];
		}) => void;
		acceptMultipleFiles?: boolean;
		variant?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'success'
			| 'info'
			| 'danger'
			| 'warning'
			| 'outlined'
			| 'ghost';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		class?: string;
		buttonText?: string;
		isSolid?: boolean;
		showPreview?: boolean;
		previewRows?: number;
		previewPageSize?: number;
	};

	let {
		requiredColumns = [],
		onMappingComplete = () => {},
		acceptMultipleFiles = false,
		variant = 'primary',
		size = 'md',
		class: className,
		buttonText = 'Seleccionar archivo CSV',
		isSolid = false,
		showPreview = true,
		previewRows = 5,
		previewPageSize = 10
	}: Props = $props();

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
			parseError = 'Por favor selecciona un archivo CSV válido';
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
					parseError = 'El archivo CSV está vacío';
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
				parseError = 'Error al parsear el archivo CSV: ' + error.message;
			}
		};

		reader.onerror = () => {
			parseError = 'Error al leer el archivo';
		};

		reader.readAsText(file);
	}

	function confirmMapping() {
		const unmappedColumns = requiredColumns.filter((col) => !columnMapping[col]);

		if (unmappedColumns.length > 0) {
			parseError = `Por favor mapea las siguientes columnas: ${unmappedColumns.join(', ')}`;
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
</script>

<div class={className}>
	<input
		type="file"
		accept=".csv"
		bind:this={fileInput}
		onchange={handleFileSelect}
		style="display: none;"
	/>

	<Button
		{variant}
		{size}
		{isSolid}
		startIcon="fluent:document-arrow-up-24-regular"
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
						Datos Importados
						<span class="csv-preview-count">({mappedData.length} registros)</span>
					</h4>
					<div class="csv-mapping-summary">
						{#each Object.entries(columnMapping) as [required, csv], index}
							{#if index < 3}
								<Chip size="sm" variant="muted">
									{required} → {csv}
								</Chip>
							{/if}
						{/each}
						{#if Object.entries(columnMapping).length > 3}
							<Chip size="sm" variant="muted">
								+{Object.entries(columnMapping).length - 3} más
							</Chip>
						{/if}
					</div>
				</div>
				<Button variant="ghost" size="sm" onclick={clearImport}>
					<span class="csv-clear-icon">✕</span>
					Limpiar
				</Button>
			</div>

			<Table table={previewTable} showPagination isStriped hasDividers size="sm" />
		</div>
	{/if}
</div>

<Modal bind:open={showModal} onclose={closeModal} variant="surface" closeOnOverlay>
	{#snippet header()}
		<h2 class="csv-modal-title">Mapear Columnas del CSV</h2>
	{/snippet}

	<div class="csv-modal-body">
		<p class="csv-instructions">
			Asocia cada columna requerida con la columna correspondiente del archivo CSV:
		</p>

		<div class="csv-mapping-list">
			{#each requiredColumns as requiredCol, index}
				<div class="csv-mapping-item">
					<Select
						label={requiredCol}
						options={selectOptions}
						bind:value={columnMapping[requiredCol]}
						placeholder="-- Seleccionar columna --"
						variant="outlined"
						size="md"
						isFloatLabel
					/>

					{#if columnMapping[requiredCol]}
						<TextField
							value={getPreviewData(requiredCol)}
							label="Vista previa"
							variant="muted"
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
			<Button variant="ghost" size="md" onclick={closeModal}>Cancelar</Button>
			<Button variant="primary" size="md" isSolid onclick={confirmMapping}>Confirmar mapeo</Button>
		</div>
	{/snippet}
</Modal>

<style>
	.csv-field-error {
		margin-top: 0.625rem;
		padding: 0.625rem;
		background: rgb(254 226 226);
		color: rgb(220 38 38);
		border-radius: 0.375rem;
		font-size: 0.875rem;
	}

	.csv-modal-title {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: rgb(17 24 39);
	}

	.csv-modal-body {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.csv-instructions {
		margin: 0;
		color: rgb(107 114 128);
		font-size: 0.875rem;
	}

	.csv-mapping-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.csv-mapping-item {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.csv-modal-footer {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
	}

	.csv-preview-container {
		margin-top: 1.5rem;
		padding: 1.25rem;
		background: rgb(249 250 251);
		border: 1px solid rgb(229 231 235);
		border-radius: 0.75rem;
	}

	.csv-preview-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
		gap: 1rem;
	}

	.csv-preview-info {
		flex: 1;
		min-width: 0;
	}

	.csv-preview-title {
		margin: 0 0 0.75rem 0;
		font-size: 1rem;
		font-weight: 600;
		color: rgb(17 24 39);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.csv-preview-count {
		font-size: 0.875rem;
		font-weight: 400;
		color: rgb(107 114 128);
	}

	.csv-mapping-summary {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.csv-clear-icon {
		font-size: 1.125rem;
		line-height: 1;
	}
</style>
