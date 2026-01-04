<script lang="ts">
	import {
		Table,
		useTable,
		Card,
		Checkbox,
		Code,
		Section,
		Select,
		Button,
		Chip,
		Item
	} from 'ui-svelte';
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

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	const alignOptions = [
		{ id: 'start', label: 'Start' },
		{ id: 'center', label: 'Center' },
		{ id: 'end', label: 'End' }
	];

	let color: any = $state('primary');
	let size: any = $state('md');
	let paginationAlign: any = $state('center');

	let isStriped = $state(false);
	let isBordered = $state(false);
	let hasDividers = $state(true);
	let showPagination = $state(true);
	let showSearch = $state(false);
	let showRowsPerPage = $state(false);
	let showTotal = $state(false);

	const sampleData = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'inactive' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'active' },
		{ id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'active' },
		{
			id: 5,
			name: 'Charlie Brown',
			email: 'charlie@example.com',
			role: 'User',
			status: 'inactive'
		},
		{ id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active' },
		{ id: 7, name: 'Edward Norton', email: 'edward@example.com', role: 'User', status: 'active' },
		{ id: 8, name: 'Fiona Apple', email: 'fiona@example.com', role: 'Manager', status: 'inactive' }
	];

	let basicTable = $derived(
		useTable({
			data: sampleData,
			columns: [
				{ label: 'ID', field: 'id', width: '80px', sortable: true },
				{ label: 'Name', field: 'name', sortable: true },
				{ label: 'Email', field: 'email' },
				{ label: 'Role', field: 'role', align: 'center' }
			],
			initialPageSize: 5
		})
	);

	let snippetsTable = $derived(
		useTable({
			data: sampleData,
			columns: [
				{ label: 'ID', field: 'id', width: '80px' },
				{ label: 'Name', field: 'name' },
				{ label: 'Status', field: 'status', render: statusSnippet },
				{ label: 'Actions', field: 'actions', align: 'right', render: actionsSnippet }
			],
			initialPageSize: 5
		})
	);

	let selectionTable = $derived(
		useTable({
			data: sampleData,
			columns: [
				{ label: 'ID', field: 'id', width: '80px' },
				{ label: 'Name', field: 'name', sortable: true },
				{ label: 'Email', field: 'email' },
				{ label: 'Role', field: 'role', align: 'center' }
			],
			initialPageSize: 5,
			selectable: true,
			rowKey: 'id'
		})
	);

	let serverTable = $derived(
		useTable({
			url: 'https://pokeapi.co/api/v2/pokemon',
			columns: [
				{ label: 'Name', field: 'name' },
				{ label: 'URL', field: 'url' }
			],
			initialPageSize: 5,
			queryParams: (options) => ({
				limit: String(options.limit),
				offset: String(options.offset)
			}),
			parseResponse: (response, options) => ({
				data: response.results,
				total: response.count,
				page: options.page || 1,
				pageSize: options.pageSize || 5,
				totalPages: Math.ceil(response.count / (options.pageSize || 5))
			})
		})
	);

	let code = $derived(() => {
		const lines = [
			`<script lang="ts">`,
			`\timport { Table, useTable } from 'ui-svelte';`,
			``,
			`\tconst data = [`,
			`\t\t{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },`,
			`\t\t{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },`,
			`\t\t// ... more data`,
			`\t];`,
			``,
			`\tconst table = useTable({`,
			`\t\tdata,`,
			`\t\tcolumns: [`,
			`\t\t\t{ label: 'ID', field: 'id', width: '80px', sortable: true },`,
			`\t\t\t{ label: 'Name', field: 'name', sortable: true },`,
			`\t\t\t{ label: 'Email', field: 'email' },`,
			`\t\t\t{ label: 'Role', field: 'role', align: 'center' }`,
			`\t\t],`,
			`\t\tinitialPageSize: 5`,
			`\t});`,
			`<\/script>`,
			``,
			`<Table`,
			`\t{table}`
		];

		if (showPagination) lines.push(`\tshowPagination`);
		if (isStriped) lines.push(`\tisStriped`);
		if (isBordered) lines.push(`\tisBordered`);
		if (!hasDividers) lines.push(`\thasDividers={false}`);
		if (color) lines.push(`\tcolor="${color}"`);
		if (size !== 'md') lines.push(`\tsize="${size}"`);
		if (paginationAlign !== 'center') lines.push(`\tpaginationAlign="${paginationAlign}"`);
		if (showSearch) lines.push(`\tshowSearch`);
		if (showRowsPerPage) lines.push(`\tshowRowsPerPage`);
		if (showTotal) lines.push(`\tshowTotal`);

		lines.push(`/>`);

		return lines.join('\n');
	});

	const tableProps = [
		{
			prop: 'table',
			type: 'TableState',
			initial: '',
			description: 'Required. TableState from useTable hook'
		},
		{ prop: 'size', type: 'sm | md | lg', initial: 'md', description: 'Table size variant' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'undefined',
			description: 'Color scheme for header and selection'
		},
		{
			prop: 'isStriped',
			type: 'boolean',
			initial: 'false',
			description: 'Alternating row background colors'
		},
		{
			prop: 'isBordered',
			type: 'boolean',
			initial: 'false',
			description: 'Add borders around cells'
		},
		{ prop: 'hasDividers', type: 'boolean', initial: 'false', description: 'Show row dividers' },
		{
			prop: 'showPagination',
			type: 'boolean',
			initial: 'false',
			description: 'Show pagination controls'
		},
		{
			prop: 'paginationAlign',
			type: 'start | center | end',
			initial: 'center',
			description: 'Pagination alignment'
		},
		{
			prop: 'loadingRows',
			type: 'number',
			initial: '5',
			description: 'Skeleton rows during loading'
		},
		{ prop: 'showSearch', type: 'boolean', initial: 'false', description: 'Show search input' },
		{
			prop: 'searchPlaceholder',
			type: 'string',
			initial: 'Search by name...',
			description: 'Search placeholder text'
		},
		{
			prop: 'showRowsPerPage',
			type: 'boolean',
			initial: 'false',
			description: 'Show rows per page selector'
		},
		{
			prop: 'rowsPerPageOptions',
			type: 'number[]',
			initial: '[5, 10, 25, 50, 100]',
			description: 'Page size options'
		},
		{ prop: 'showTotal', type: 'boolean', initial: 'false', description: 'Show total items count' },
		{ prop: 'noDataTitle', type: 'string', initial: 'No data', description: 'Empty state title' },
		{
			prop: 'noDataDescription',
			type: 'string',
			initial: '...',
			description: 'Empty state description'
		},
		{
			prop: 'onRowClick',
			type: '(row, index) => void',
			initial: '',
			description: 'Row click handler'
		},
		{
			prop: 'rowClass',
			type: '(row, index) => string',
			initial: '',
			description: 'Dynamic row class'
		},
		{ prop: 'rootClass', type: 'string', initial: '', description: 'Wrapper class' },
		{ prop: 'containerClass', type: 'string', initial: '', description: 'Container class' },
		{ prop: 'headerClass', type: 'string', initial: '', description: 'Header class' },
		{ prop: 'bodyClass', type: 'string', initial: '', description: 'Body class' }
	];

	const useTableProps = [
		{
			prop: 'columns',
			type: 'Column[]',
			initial: '',
			description: 'Required. Array of column definitions'
		},
		{
			prop: 'data',
			type: 'any[]',
			initial: '',
			description: 'Static data (enables client-side mode)'
		},
		{
			prop: 'url',
			type: 'string',
			initial: '',
			description: 'API endpoint (enables server-side mode)'
		},
		{
			prop: 'queryParams',
			type: '(params) => Record<string, string>',
			initial: '',
			description: 'Build query params for API'
		},
		{
			prop: 'parseResponse',
			type: '(response, params) => PaginatedResponse',
			initial: '',
			description: 'Parse API response'
		},
		{
			prop: 'headers',
			type: 'Record<string, string>',
			initial: '{}',
			description: 'Custom request headers'
		},
		{ prop: 'initialPage', type: 'number', initial: '1', description: 'Initial page number' },
		{
			prop: 'initialPageSize',
			type: 'number',
			initial: '10',
			description: 'Initial rows per page'
		},
		{ prop: 'initialSortBy', type: 'string', initial: '', description: 'Initial sort column' },
		{
			prop: 'initialSortOrder',
			type: 'ASC | DESC',
			initial: 'ASC',
			description: 'Initial sort direction'
		},
		{ prop: 'debounceSearch', type: 'number', initial: '0', description: 'Search debounce in ms' },
		{ prop: 'selectable', type: 'boolean', initial: 'false', description: 'Enable row selection' },
		{ prop: 'rowKey', type: 'string', initial: 'id', description: 'Unique row identifier field' },
		{
			prop: 'onSelectionChange',
			type: '(rows) => void',
			initial: '',
			description: 'Selection change callback'
		},
		{ prop: 'onSuccess', type: '(response) => void', initial: '', description: 'Success callback' },
		{ prop: 'onError', type: '(error) => void', initial: '', description: 'Error callback' }
	];

	const columnProps = [
		{ prop: 'label', type: 'string', initial: '', description: 'Column header text' },
		{ prop: 'field', type: 'string', initial: '', description: 'Data field key' },
		{ prop: 'sortable', type: 'boolean', initial: 'false', description: 'Enable column sorting' },
		{ prop: 'width', type: 'string', initial: '', description: 'Column width (e.g., "80px")' },
		{
			prop: 'align',
			type: 'left | center | right',
			initial: 'left',
			description: 'Text alignment'
		},
		{ prop: 'render', type: 'Snippet<[row]>', initial: '', description: 'Custom cell renderer' }
	];

	const tableStateProps = [
		{ prop: 'data', type: 'any[]', initial: '', description: 'Current page data' },
		{ prop: 'isLoading', type: 'boolean', initial: '', description: 'Loading state' },
		{ prop: 'error', type: 'any', initial: '', description: 'Error object' },
		{ prop: 'total', type: 'number', initial: '', description: 'Total records' },
		{ prop: 'page', type: 'number', initial: '', description: 'Current page' },
		{ prop: 'pageSize', type: 'number', initial: '', description: 'Rows per page' },
		{ prop: 'totalPages', type: 'number', initial: '', description: 'Total pages' },
		{ prop: 'sortBy', type: 'string', initial: '', description: 'Current sort column' },
		{ prop: 'sortOrder', type: 'ASC | DESC', initial: '', description: 'Sort direction' },
		{ prop: 'search', type: 'string', initial: '', description: 'Search query' },
		{ prop: 'selectedRows', type: 'any[]', initial: '', description: 'Selected row objects' },
		{ prop: 'isAllSelected', type: 'boolean', initial: '', description: 'All rows selected' },
		{ prop: 'setPage(n)', type: 'function', initial: '', description: 'Go to page n' },
		{ prop: 'setPageSize(n)', type: 'function', initial: '', description: 'Set page size' },
		{ prop: 'setSort(col, order)', type: 'function', initial: '', description: 'Set sort column' },
		{ prop: 'setSearch(query)', type: 'function', initial: '', description: 'Set search query' },
		{ prop: 'refresh()', type: 'function', initial: '', description: 'Refresh data' },
		{ prop: 'reset()', type: 'function', initial: '', description: 'Reset to initial state' },
		{ prop: 'toggleRow(row)', type: 'function', initial: '', description: 'Toggle row selection' },
		{ prop: 'clearSelection()', type: 'function', initial: '', description: 'Clear all selections' }
	];

	function handleDeleteSelected() {
		alert(`Would delete ${selectionTable.selectedRows.length} items`);
	}
</script>

{#snippet statusSnippet(row: any)}
	<Chip color={row.status === 'active' ? 'success' : 'warning'} variant="solid" size="xs">
		{row.status}
	</Chip>
{/snippet}

{#snippet actionsSnippet(row: any)}
	<div class="flex gap-2 justify-end">
		<Button size="xs" variant="ghost">Edit</Button>
		<Button size="xs" variant="ghost" color="danger">Delete</Button>
	</div>
{/snippet}

<DocsHeader title="Table" llmUrl="https://ui-svelte.sappsdev.com/llm/display/table.md">
	A powerful data table with built-in pagination, sorting, search, and row selection. Supports both
	client-side and server-side data handling with the useTable hook.
</DocsHeader>

<Section>
	<Card color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select isFloatLabel label="Color" size="sm" options={colorOptions} bind:value={color} />
			<Select isFloatLabel label="Size" size="sm" options={sizeOptions} bind:value={size} />
			<Select
				isFloatLabel
				label="Pagination Alignment"
				size="sm"
				options={alignOptions}
				bind:value={paginationAlign}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={showPagination} label="Pagination" />
			<Checkbox bind:checked={isStriped} label="Striped" />
			<Checkbox bind:checked={isBordered} label="Bordered" />
			<Checkbox bind:checked={hasDividers} label="Dividers" />
			<Checkbox bind:checked={showSearch} label="Search" />
			<Checkbox bind:checked={showRowsPerPage} label="Rows Per Page" />
			<Checkbox bind:checked={showTotal} label="Show Total" />
		</div>

		<div>
			<Table
				table={basicTable}
				{color}
				{size}
				{isStriped}
				{isBordered}
				{hasDividers}
				{showPagination}
				{paginationAlign}
				{showSearch}
				{showRowsPerPage}
				{showTotal}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card color="background" variant="outlined">
		<div class="flex flex-col gap-6">
			{#each sizeOptions as sizeOpt}
				<div>
					<p class="text-sm font-medium mb-2">{sizeOpt.label.toUpperCase()}</p>
					<Table table={basicTable} size={sizeOpt.id as any} hasDividers />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card color="background" variant="outlined">
		<div class="flex flex-col gap-6">
			{#each colorOptions as colorOpt}
				<div>
					<p class="text-sm font-medium mb-2">{colorOpt.label}</p>
					<Table table={basicTable} color={colorOpt.id as any} hasDividers showPagination />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Custom Cell Rendering</p>
	<Card color="background" variant="outlined">
		<Table table={snippetsTable} hasDividers showPagination />
		<Code
			lang="svelte"
			code={`{#snippet statusSnippet(row)}
  <Chip color={row.status === 'active' ? 'success' : 'warning'} variant="soft">
    {row.status}
  </Chip>
{/snippet}

const table = useTable({
  data,
  columns: [
    { label: 'Status', field: 'status', render: statusSnippet },
    { label: 'Actions', field: 'actions', render: actionsSnippet }
  ]
});`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Row Selection</p>
	<Card color="background" variant="outlined">
		<p class="text-sm mb-3">
			<strong>Selected:</strong>
			{selectionTable.selectedRows.length} of {selectionTable.total}
		</p>
		<Table table={selectionTable} hasDividers showPagination>
			{#snippet selectionActions(selectedRows)}
				<Button size="sm" color="danger" variant="soft" onclick={handleDeleteSelected}>
					Delete ({selectedRows.length})
				</Button>
			{/snippet}
		</Table>
		<Code
			lang="svelte"
			code={`const table = useTable({
  data,
  columns: [...],
  selectable: true,
  rowKey: 'id',
  onSelectionChange: (rows) => console.log(rows)
});

<Table {table} showPagination>
  {#snippet selectionActions(selectedRows)}
    <Button onclick={() => handleDelete(selectedRows)}>
      Delete ({selectedRows.length})
    </Button>
  {/snippet}
</Table>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Server-Side Data</p>
	<Card color="background" variant="outlined">
		<Table table={serverTable} hasDividers showPagination />
		<Code
			lang="svelte"
			code={`const table = useTable({
  url: 'https://api.example.com/users',
  columns: [
    { label: 'Name', field: 'name' },
    { label: 'Email', field: 'email' }
  ],
  queryParams: (params) => ({
    limit: String(params.limit),
    offset: String(params.offset)
  }),
  parseResponse: (response, params) => ({
    data: response.results,
    total: response.count,
    page: params.page || 1,
    pageSize: params.pageSize || 10,
    totalPages: Math.ceil(response.count / (params.pageSize || 10))
  })
});`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Visual Variants</p>
	<Card color="background" variant="outlined">
		<div class="flex flex-col gap-6">
			<div>
				<p class="text-sm font-medium mb-2">Striped</p>
				<Table table={basicTable} isStriped />
			</div>
			<div>
				<p class="text-sm font-medium mb-2">Bordered</p>
				<Table table={basicTable} isBordered />
			</div>
			<div>
				<p class="text-sm font-medium mb-2">Compact</p>
				<Table table={basicTable} hasDividers />
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Table Props</p>
	<DocsProps props={tableProps} />
</Section>

<Section>
	<p class="section-subtitle">useTable Config</p>
	<DocsProps props={useTableProps} />
</Section>

<Section>
	<p class="section-subtitle">Column Config</p>
	<DocsProps props={columnProps} />
</Section>

<Section>
	<p class="section-subtitle">TableState (Return Value)</p>
	<DocsProps props={tableStateProps} />
</Section>
