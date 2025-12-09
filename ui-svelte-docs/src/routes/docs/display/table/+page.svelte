<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import {
		Table,
		useTable,
		Checkbox,
		Select,
		Badge,
		Button,
		Avatar,
		TextField,
		Section,
		Chip,
		Item
	} from 'ui-svelte';

	type ExampleType =
		| 'basic'
		| 'server'
		| 'snippets'
		| 'interactive'
		| 'dynamic'
		| 'toolbar'
		| 'selection'
		| 'sorting';
	let currentExample: ExampleType = $state('basic');

	const exampleOptions = [
		{ id: 'basic', label: 'Client-Side Basic' },
		{ id: 'server', label: 'Server-Side' },
		{ id: 'snippets', label: 'Custom Snippets' },
		{ id: 'interactive', label: 'Interactive Elements' },
		{ id: 'dynamic', label: 'Dynamic Updates' },
		{ id: 'toolbar', label: 'Toolbar (Search & Rows)' },
		{ id: 'selection', label: 'Row Selection' },
		{ id: 'sorting', label: 'Column Sorting' }
	];

	let showPagination = $state(true);
	let isStriped = $state(false);
	let isBordered = $state(false);
	let hasDividers = $state(false);
	let size: any = $state('md');
	let paginationAlign: any = $state('center');

	let showSearch = $state(false);
	let showRowsPerPage = $state(false);
	let showTotal = $state(false);
	let searchPlaceholder = $state('Search by name...');

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

	const basicData = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
		{ id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Manager' },
		{ id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
		{ id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin' },
		{ id: 7, name: 'Edward Norton', email: 'edward@example.com', role: 'User' },
		{ id: 8, name: 'Fiona Apple', email: 'fiona@example.com', role: 'Manager' },
		{ id: 9, name: 'George Lucas', email: 'george@example.com', role: 'User' },
		{ id: 10, name: 'Hannah Montana', email: 'hannah@example.com', role: 'User' },
		{ id: 11, name: 'Ivan Drago', email: 'ivan@example.com', role: 'Admin' },
		{ id: 12, name: 'Julia Roberts', email: 'julia@example.com', role: 'Manager' }
	];

	const snippetsData = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', amount: 1250 },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', amount: 890 },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active', amount: 2100 }
	];

	const interactiveData = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			avatar: 'https://i.pravatar.cc/150?img=1',
			role: 'Admin',
			active: true
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			avatar: 'https://i.pravatar.cc/150?img=2',
			role: 'User',
			active: false
		},
		{
			id: 3,
			name: 'Bob Johnson',
			email: 'bob@example.com',
			avatar: 'https://i.pravatar.cc/150?img=3',
			role: 'Manager',
			active: true
		}
	];

	let dynamicData = $state([
		{ id: 1, name: 'Item 1', quantity: 5 },
		{ id: 2, name: 'Item 2', quantity: 10 }
	]);

	let selectedUsers = $state<number[]>([]);
	let searchQuery = $state('');

	let basicTable = $derived(
		useTable({
			data: basicData,
			columns: [
				{ label: 'ID', field: 'id', width: '80px' },
				{ label: 'Name', field: 'name', sortable: true },
				{ label: 'Email', field: 'email' },
				{ label: 'Role', field: 'role', align: 'center' }
			],
			initialPageSize: 5
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

	let snippetsTable = $derived(
		useTable({
			data: snippetsData,
			columns: [
				{ label: 'Name', field: 'name', width: '200px' },
				{ label: 'Email', field: 'email' },
				{ label: 'Status', field: 'status', align: 'center', render: statusSnippet },
				{ label: 'Amount', field: 'amount', align: 'right', render: amountSnippet },
				{ label: 'Actions', field: 'actions', align: 'right', render: actionsSnippet }
			],
			initialPageSize: 5
		})
	);

	let interactiveTable = $derived(
		useTable({
			data: interactiveData,
			columns: [
				{ label: '', field: 'select', width: '50px', render: selectSnippet },
				{ label: 'User', field: 'user', render: userSnippet },
				{ label: 'Role', field: 'role', align: 'center' },
				{ label: 'Status', field: 'active', align: 'center', render: statusToggleSnippet },
				{ label: 'Actions', field: 'actions', align: 'right', render: interactiveActionsSnippet }
			],
			initialPageSize: 5
		})
	);

	let dynamicTable = $derived(
		useTable({
			data: dynamicData,
			columns: [
				{ label: 'ID', field: 'id', width: '80px' },
				{ label: 'Name', field: 'name' },
				{ label: 'Quantity', field: 'quantity', align: 'right' }
			],
			initialPageSize: 5
		})
	);

	let toolbarTable = $derived(
		useTable({
			data: basicData,
			columns: [
				{ label: 'ID', field: 'id', width: '80px' },
				{ label: 'Name', field: 'name', sortable: true },
				{ label: 'Email', field: 'email' },
				{ label: 'Role', field: 'role', align: 'center' }
			],
			initialPageSize: 5,
			debounceSearch: 300
		})
	);

	let selectionTable = $derived(
		useTable({
			data: basicData,
			columns: [
				{ label: 'ID', field: 'id', width: '80px' },
				{ label: 'Name', field: 'name', sortable: true },
				{ label: 'Email', field: 'email' },
				{ label: 'Role', field: 'role', align: 'center' }
			],
			initialPageSize: 5,
			selectable: true,
			rowKey: 'id',
			onSelectionChange: (selected) => {
				console.log('Selection changed:', selected);
			}
		})
	);

	let sortingTable = $derived(
		useTable({
			data: basicData,
			columns: [
				{ label: 'ID', field: 'id', width: '80px', sortable: true },
				{ label: 'Name', field: 'name', sortable: true },
				{ label: 'Email', field: 'email', sortable: true },
				{ label: 'Role', field: 'role', align: 'center', sortable: true }
			],
			initialPageSize: 5,
			initialSortBy: 'name',
			initialSortOrder: 'ASC'
		})
	);

	let currentTable = $derived(
		currentExample === 'basic'
			? basicTable
			: currentExample === 'server'
				? serverTable
				: currentExample === 'snippets'
					? snippetsTable
					: currentExample === 'interactive'
						? interactiveTable
						: currentExample === 'toolbar'
							? toolbarTable
							: currentExample === 'selection'
								? selectionTable
								: currentExample === 'sorting'
									? sortingTable
									: dynamicTable
	);

	$effect(() => {
		if (currentExample === 'toolbar') {
			showSearch = true;
			showRowsPerPage = true;
			showTotal = true;
		}
	});

	function toggleUser(userId: number) {
		if (selectedUsers.includes(userId)) {
			selectedUsers = selectedUsers.filter((id) => id !== userId);
		} else {
			selectedUsers = [...selectedUsers, userId];
		}
	}

	function addItem() {
		const newItem = {
			id: dynamicData.length + 1,
			name: `Item ${dynamicData.length + 1}`,
			quantity: Math.floor(Math.random() * 20)
		};
		dynamicData = [...dynamicData, newItem];
		dynamicTable.updateData(dynamicData);
	}

	function handleDeleteSelected() {
		console.log('Deleting:', selectionTable.selectedRows);
		alert(`Would delete ${selectionTable.selectedRows.length} items`);
	}

	function handleExportSelected() {
		console.log('Exporting:', selectionTable.selectedRows);
		alert(`Would export ${selectionTable.selectedRows.length} items`);
	}

	const codeSnippets: Record<ExampleType, string> = {
		basic: `<script lang="ts">
	import { Table, useTable } from 'ui-svelte';

	const data = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' }
	];

	// Client-side mode is automatically enabled when 'data' prop is provided
	const table = useTable({
		data: data,
		columns: [
			{ label: 'ID', field: 'id', width: '80px' },
			{ label: 'Name', field: 'name', sortable: true },
			{ label: 'Email', field: 'email' },
			{ label: 'Role', field: 'role', align: 'center' }
		],
		initialPageSize: 10,
		initialSortBy: 'name',
		initialSortOrder: 'ASC'
	});
<\/script>

<Table table={table} showPagination isStriped />`,

		server: `<script lang="ts">
	import { Table, useTable } from 'ui-svelte';

	// Server-side mode is enabled when 'url' is provided (without 'data')
	const table = useTable({
		url: 'https://api.example.com/users',
		columns: [
			{ label: 'ID', field: 'id', width: '80px' },
			{ label: 'Name', field: 'name', sortable: true },
			{ label: 'Email', field: 'email' },
			{ label: 'Status', field: 'status', align: 'center' }
		],
		initialPageSize: 10,
		queryParams: (options) => ({
			limit: String(options.limit),
			offset: String(options.offset),
			sort: options.sortBy || '',
			order: options.sortOrder || 'ASC'
		}),
		parseResponse: (response, options) => ({
			data: response.results,
			total: response.count,
			page: options.page || 1,
			pageSize: options.pageSize || 10,
			totalPages: Math.ceil(response.count / (options.pageSize || 10))
		}),
		headers: {
			'Authorization': 'Bearer token123'
		},
		onSuccess: (response) => console.log('Loaded:', response),
		onError: (error) => console.error('Error:', error)
	});
<\/script>

<Table table={table} showPagination isBordered />`,

		snippets: `<script lang="ts">
	import { Table, useTable, Button, Badge } from 'ui-svelte';

	const users = [
		{ id: 1, name: 'John Doe', status: 'active', amount: 1250 },
		{ id: 2, name: 'Jane Smith', status: 'inactive', amount: 890 }
	];

	const table = useTable({
		data: users,
		columns: [
			{ label: 'Name', field: 'name', width: '200px' },
			{ label: 'Status', field: 'status', align: 'center', render: statusSnippet },
			{ label: 'Amount', field: 'amount', align: 'right', render: amountSnippet },
			{ label: 'Actions', field: 'actions', align: 'right', render: actionsSnippet }
		],
		initialPageSize: 10
	});
<\/script>

{#snippet statusSnippet(user)}
  <Chip variant={user.status === 'active' ? 'success' : 'warning'} isSolid>{user.status}</Chip>
{/snippet}

{#snippet amountSnippet(user)}
	<span class="font-semibold">\${user.amount.toFixed(2)}</span>
{/snippet}

{#snippet actionsSnippet(user)}
	<div class="flex gap-2 justify-end">
	<IconButton
		icon="fluent:edit-24-regular"
		variant="warning"
		size="xs"
		isSolid
		onclick={() => console.log('Edit', user.id)}
	/>
	<IconButton
		icon="fluent:delete-24-regular"
		variant="danger"
		size="xs"
		isSolid
		onclick={() => console.log('Delete', user.id)}
	/>
	</div>
{/snippet}

<Table table={table} showPagination isStriped />`,

		interactive: `<script lang="ts">
	import { Table, useTable, Button, Checkbox, Avatar } from 'ui-svelte';

	const users = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', avatar: '...', active: true },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '...', active: false }
	];

	let selectedUsers = $state<number[]>([]);

	const table = useTable({
		data: users,
		columns: [
			{ label: '', field: 'select', width: '50px', render: selectSnippet },
			{ label: 'User', field: 'user', render: userSnippet },
			{ label: 'Role', field: 'role', align: 'center' },
			{ label: 'Status', field: 'active', align: 'center', render: statusToggleSnippet }
		],
		initialPageSize: 10
	});

	function toggleUser(userId: number) {
		selectedUsers = selectedUsers.includes(userId)
			? selectedUsers.filter(id => id !== userId)
			: [...selectedUsers, userId];
	}
<\/script>

{#snippet selectSnippet(user)}
	<Checkbox checked={selectedUsers.includes(user.id)} onchange={() => toggleUser(user.id)} />
{/snippet}

{#snippet userSnippet(user)}
  <Item src={user.avatar} label={user.name} description={user.email} size="sm" />
{/snippet}

<Table table={table} showPagination isBordered />`,

		dynamic: `<script lang="ts">
	import { Table, useTable, Button } from 'ui-svelte';

	let data = $state([
		{ id: 1, name: 'Item 1', quantity: 5 },
		{ id: 2, name: 'Item 2', quantity: 10 }
	]);

	const table = useTable({
		data: data,
		columns: [
			{ label: 'ID', field: 'id', width: '80px' },
			{ label: 'Name', field: 'name' },
			{ label: 'Quantity', field: 'quantity', align: 'right' }
		],
		initialPageSize: 10
	});

	function addItem() {
		const newItem = {
			id: data.length + 1,
			name: \`Item \${data.length + 1}\`,
			quantity: Math.floor(Math.random() * 20)
		};
		data = [...data, newItem];
		table.updateData(data);
	}
<\/script>

<div class="flex gap-2 mb-4">
	<Button onclick={addItem}>Add Item</Button>
	<Button onclick={() => table.refresh()} variant="secondary">Refresh</Button>
	<Button onclick={() => table.reset()} variant="outline">Reset</Button>
</div>

<Table table={table} showPagination isStriped />`,

		toolbar: `<script lang="ts">
	import { Table, useTable, Button } from 'ui-svelte';

	const users = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
		// ... more users
	];

	const table = useTable({
		data: users,
		columns: [
			{ label: 'ID', field: 'id', width: '80px' },
			{ label: 'Name', field: 'name', sortable: true },
			{ label: 'Email', field: 'email' },
			{ label: 'Role', field: 'role', align: 'center' }
		],
		initialPageSize: 5,
		debounceSearch: 300
	});
<\/script>

<!-- Basic toolbar with search, rows per page, and total -->
<Table
	table={table}
	showPagination
	showSearch
	searchPlaceholder="Search by name..."
	showRowsPerPage
	rowsPerPageOptions={[5, 10, 25, 50]}
	rowsPerPageLabel="Rows per page:"
	showTotal
	totalLabel="Total"
/>

<!-- With custom toolbar content using slots -->
<Table
	table={table}
	showPagination
	showSearch
	showRowsPerPage
	showTotal
>
	{#snippet toolbarEnd()}
		<Button variant="primary" size="sm">
			Add New +
		</Button>
	{/snippet}
</Table>`,

		selection: `<script lang="ts">
	import { Table, useTable, Button } from 'ui-svelte';

	const users = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
		// ... more users
	];

	const table = useTable({
		data: users,
		columns: [
			{ label: 'ID', field: 'id', width: '80px' },
			{ label: 'Name', field: 'name', sortable: true },
			{ label: 'Email', field: 'email' },
			{ label: 'Role', field: 'role', align: 'center' }
		],
		initialPageSize: 5,
		// Enable row selection
		selectable: true,
		rowKey: 'id', // Unique identifier field
		onSelectionChange: (selectedRows) => {
			console.log('Selected rows:', selectedRows);
		}
	});

	// Access selected rows programmatically
	function handleDelete() {
		const selected = table.selectedRows;
		console.log('Deleting:', selected);
		// Perform delete action...
		table.clearSelection();
	}

	function handleExport() {
		const selected = table.selectedRows;
		console.log('Exporting:', selected);
		// Perform export action...
	}
<\/script>

<Table table={table} showPagination>
	<!-- Custom actions for selected rows -->
	{#snippet selectionActions(selectedRows)}
		<Button
			size="sm"
			variant="soft"
			color="error"
			onclick={handleDelete}
		>
			Delete ({selectedRows.length})
		</Button>
		<Button
			size="sm"
			variant="soft"
			onclick={handleExport}
		>
			Export ({selectedRows.length})
		</Button>
	{/snippet}
</Table>

<!-- Selection state is available in the table object -->
<p>Selected: {table.selectedRows.length} of {table.total}</p>
<p>All selected: {table.isAllSelected}</p>
<p>Indeterminate: {table.isIndeterminate}</p>

<!-- Programmatic selection control -->
<Button onclick={() => table.selectAll()}>Select All</Button>
<Button onclick={() => table.clearSelection()}>Clear Selection</Button>`,

		sorting: `<script lang="ts">
	import { Table, useTable } from 'ui-svelte';

	const users = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
		{ id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User' },
		{ id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin' }
	];

	const table = useTable({
		data: users,
		columns: [
			// Add sortable: true to enable sorting on a column
			{ label: 'ID', field: 'id', width: '80px', sortable: true },
			{ label: 'Name', field: 'name', sortable: true },
			{ label: 'Email', field: 'email', sortable: true },
			{ label: 'Role', field: 'role', align: 'center', sortable: true }
		],
		initialPageSize: 5,
		// Optional: Set initial sort
		initialSortBy: 'name',
		initialSortOrder: 'ASC'
	});

	// Programmatic sorting control
	function sortByName() {
		table.setSort('name', 'ASC');
	}

	function sortByIdDesc() {
		table.setSort('id', 'DESC');
	}
<\/script>

<Table table={table} showPagination isStriped />

<!-- Current sort state -->
<p>Sorted by: {table.sortBy} ({table.sortOrder})</p>

<!-- Programmatic sort control -->
<Button onclick={sortByName}>Sort by Name (ASC)</Button>
<Button onclick={sortByIdDesc}>Sort by ID (DESC)</Button>`
	};

	let code = $derived(() => {
		let baseCode = codeSnippets[currentExample];

		const tableProps = ['showPagination'];
		if (isStriped) tableProps.push('isStriped');
		if (isBordered) tableProps.push('isBordered');
		if (!hasDividers) tableProps.push('hasDividers={false}');
		if (size !== 'md') tableProps.push(`size="${size}"`);
		if (paginationAlign !== 'center') tableProps.push(`paginationAlign="${paginationAlign}"`);

		if (showSearch) tableProps.push('showSearch');
		if (showRowsPerPage) tableProps.push('showRowsPerPage');
		if (showTotal) tableProps.push('showTotal');

		const propsString =
			tableProps.length > 2 ? `\n\t${tableProps.join('\n\t')}\n` : ` ${tableProps.join(' ')} `;

		return baseCode.replace(
			/<Table table=\{table\}[^/]*\/>/g,
			`<Table table={table}${propsString}/>`
		);
	});

	const useTableProps = [
		{
			prop: 'columns',
			type: 'Column[]',
			initial: '[]',
			required: true,
			description: 'Array of column definitions for the table'
		},
		{
			prop: 'data',
			type: 'any[]',
			initial: 'undefined',
			required: false,
			description:
				'Static data array. When provided, enables client-side mode with local filtering, sorting and pagination'
		},
		{
			prop: 'url',
			type: 'string',
			initial: 'undefined',
			required: false,
			description: 'API endpoint URL. When provided (without data), enables server-side mode'
		},
		{
			prop: 'queryParams',
			type: '(params: TableParams) => Record<string, string>',
			initial: 'undefined',
			description: 'Function to build query parameters for server requests'
		},
		{
			prop: 'parseResponse',
			type: '(data: any, params: TableParams) => PaginatedResponse',
			initial: 'undefined',
			description: 'Function to parse server response into PaginatedResponse format'
		},
		{
			prop: 'headers',
			type: 'Record<string, string>',
			initial: '{}',
			description: 'Custom headers for server requests'
		},
		{
			prop: 'initialPage',
			type: 'number',
			initial: '1',
			description: 'Initial page number'
		},
		{
			prop: 'initialPageSize',
			type: 'number',
			initial: '10',
			description: 'Initial number of rows per page'
		},
		{
			prop: 'initialSortBy',
			type: 'string',
			initial: 'undefined',
			description: 'Initial column field to sort by'
		},
		{
			prop: 'initialSortOrder',
			type: "'ASC' | 'DESC'",
			initial: "'ASC'",
			description: 'Initial sort direction'
		},
		{
			prop: 'initialSearch',
			type: 'string',
			initial: "''",
			description: 'Initial search query'
		},
		{
			prop: 'debounceSearch',
			type: 'number',
			initial: '0',
			description: 'Debounce delay in milliseconds for search input'
		},
		{
			prop: 'onError',
			type: '(error: any) => void',
			initial: 'undefined',
			description: 'Callback when server request fails'
		},
		{
			prop: 'onSuccess',
			type: '(response: PaginatedResponse) => void',
			initial: 'undefined',
			description: 'Callback when server request succeeds'
		},
		{
			prop: 'selectable',
			type: 'boolean',
			initial: 'false',
			description: 'Enable row selection with checkboxes'
		},
		{
			prop: 'rowKey',
			type: 'string',
			initial: "'id'",
			description: 'Unique identifier field for each row (used for selection)'
		},
		{
			prop: 'onSelectionChange',
			type: '(selectedRows: any[]) => void',
			initial: 'undefined',
			description: 'Callback when row selection changes'
		}
	];

	const columnProps = [
		{
			prop: 'label',
			type: 'string',
			initial: '',
			required: true,
			description: 'Column header text'
		},
		{
			prop: 'field',
			type: 'string',
			initial: '',
			required: true,
			description: 'Data field key to display'
		},
		{
			prop: 'sortable',
			type: 'boolean',
			initial: 'false',
			description: 'Enable sorting for this column'
		},
		{
			prop: 'width',
			type: 'string',
			initial: 'undefined',
			description: 'Fixed column width (e.g., "80px", "20%")'
		},
		{
			prop: 'align',
			type: "'left' | 'center' | 'right'",
			initial: "'left'",
			description: 'Text alignment for column'
		},
		{
			prop: 'render',
			type: 'Snippet<[any]>',
			initial: 'undefined',
			description: 'Custom Svelte snippet for cell rendering'
		}
	];

	const tableComponentProps = [
		{
			prop: 'table',
			type: 'TableState',
			initial: '',
			required: true,
			description: 'TableState object returned from useTable hook'
		},
		{
			prop: 'isStriped',
			type: 'boolean',
			initial: 'false',
			description: 'Apply alternating row background colors'
		},
		{
			prop: 'isBordered',
			type: 'boolean',
			initial: 'false',
			description: 'Add borders around cells'
		},
		{
			prop: 'hasDividers',
			type: 'boolean',
			initial: 'true',
			description: 'Show horizontal dividers between rows'
		},
		{
			prop: 'size',
			type: "'sm' | 'md' | 'lg'",
			initial: "'md'",
			description: 'Table size variant'
		},
		{
			prop: 'showPagination',
			type: 'boolean',
			initial: 'false',
			description: 'Show pagination controls'
		},
		{
			prop: 'paginationAlign',
			type: "'left' | 'center' | 'right'",
			initial: "'center'",
			description: 'Pagination controls alignment'
		},
		{
			prop: 'noDataTitle',
			type: 'string',
			initial: "'No data'",
			description: 'Title shown when table is empty'
		},
		{
			prop: 'noDataDescription',
			type: 'string',
			initial: "'There are no records to display'",
			description: 'Description shown when table is empty'
		},
		{
			prop: 'noDataType',
			type: "'playlist' | 'result' | 'data' | 'template'",
			initial: "'data'",
			description: 'Empty state illustration type'
		},
		{
			prop: 'loadingRows',
			type: 'number',
			initial: '5',
			description: 'Number of skeleton rows shown during loading'
		}
	];

	const toolbarProps = [
		{
			prop: 'showToolbar',
			type: 'boolean',
			initial: 'false',
			description: 'Force show toolbar container (auto-shows when toolbar features are enabled)'
		},
		{
			prop: 'toolbarClass',
			type: 'string',
			initial: 'undefined',
			description: 'Custom CSS class for toolbar container'
		},
		{
			prop: 'showSearch',
			type: 'boolean',
			initial: 'false',
			description: 'Show search input field in toolbar'
		},
		{
			prop: 'searchPlaceholder',
			type: 'string',
			initial: "'Search by name...'",
			description: 'Placeholder text for search input'
		},
		{
			prop: 'showRowsPerPage',
			type: 'boolean',
			initial: 'false',
			description: 'Show rows per page selector in toolbar'
		},
		{
			prop: 'rowsPerPageOptions',
			type: 'number[]',
			initial: '[5, 10, 25, 50, 100]',
			description: 'Available page size options'
		},
		{
			prop: 'rowsPerPageLabel',
			type: 'string',
			initial: "'Rows per page:'",
			description: 'Label for rows per page selector'
		},
		{
			prop: 'showTotal',
			type: 'boolean',
			initial: 'false',
			description: 'Show total items count in pagination area'
		},
		{
			prop: 'totalLabel',
			type: 'string',
			initial: "'Total'",
			description: 'Prefix label for total count'
		},
		{
			prop: 'toolbarStart',
			type: 'Snippet',
			initial: 'undefined',
			description: 'Custom content slot for left side of toolbar'
		},
		{
			prop: 'toolbarEnd',
			type: 'Snippet',
			initial: 'undefined',
			description: 'Custom content slot for right side of toolbar'
		}
	];

	const selectionProps = [
		{
			prop: 'showSelectionCount',
			type: 'boolean',
			initial: 'true',
			description: 'Show count of selected rows in selection bar'
		},
		{
			prop: 'selectionCountLabel',
			type: 'string',
			initial: "'selected'",
			description: 'Label after selection count'
		},
		{
			prop: 'selectionActions',
			type: 'Snippet<[any[]]>',
			initial: 'undefined',
			description: 'Custom actions slot when rows are selected (receives selectedRows array)'
		}
	];

	const returnProps = [
		{
			prop: 'data',
			type: 'any[]',
			initial: '[]',
			description: 'Current page data array'
		},
		{
			prop: 'isLoading',
			type: 'boolean',
			initial: 'false',
			description: 'Loading state indicator'
		},
		{
			prop: 'error',
			type: 'any',
			initial: 'null',
			description: 'Error object if request failed'
		},
		{
			prop: 'total',
			type: 'number',
			initial: '0',
			description: 'Total number of records'
		},
		{
			prop: 'page',
			type: 'number',
			initial: '1',
			description: 'Current page number'
		},
		{
			prop: 'pageSize',
			type: 'number',
			initial: '10',
			description: 'Current page size'
		},
		{
			prop: 'totalPages',
			type: 'number',
			initial: '0',
			description: 'Total number of pages (computed)'
		},
		{
			prop: 'sortBy',
			type: 'string | undefined',
			initial: 'undefined',
			description: 'Current sort column field'
		},
		{
			prop: 'sortOrder',
			type: "'ASC' | 'DESC'",
			initial: "'ASC'",
			description: 'Current sort direction'
		},
		{
			prop: 'search',
			type: 'string',
			initial: "''",
			description: 'Current search query'
		},
		{
			prop: 'hasNextPage',
			type: 'boolean',
			initial: 'false',
			description: 'Whether next page exists (computed)'
		},
		{
			prop: 'hasPrevPage',
			type: 'boolean',
			initial: 'false',
			description: 'Whether previous page exists (computed)'
		},
		{
			prop: 'columns',
			type: 'Column[]',
			initial: '[]',
			description: 'Column definitions'
		},
		{
			prop: 'setPage',
			type: '(page: number) => void',
			initial: '',
			description: 'Navigate to specific page'
		},
		{
			prop: 'setPageSize',
			type: '(pageSize: number) => void',
			initial: '',
			description: 'Change page size (resets to page 1)'
		},
		{
			prop: 'setSort',
			type: "(column: string, order?: 'ASC' | 'DESC') => void",
			initial: '',
			description: 'Set sort column and order'
		},
		{
			prop: 'setSearch',
			type: '(query: string) => void',
			initial: '',
			description: 'Set search query (resets to page 1)'
		},
		{
			prop: 'nextPage',
			type: '() => void',
			initial: '',
			description: 'Navigate to next page'
		},
		{
			prop: 'prevPage',
			type: '() => void',
			initial: '',
			description: 'Navigate to previous page'
		},
		{
			prop: 'goToPage',
			type: '(page: number) => void',
			initial: '',
			description: 'Navigate to specific page (with bounds checking)'
		},
		{
			prop: 'refresh',
			type: '() => void',
			initial: '',
			description: 'Re-fetch data or reprocess client-side data'
		},
		{
			prop: 'reset',
			type: '() => void',
			initial: '',
			description: 'Reset to initial configuration values'
		},
		{
			prop: 'updateData',
			type: '(newData: any[]) => void',
			initial: '',
			description: 'Update source data (client-side mode only)'
		},
		{
			prop: 'selectable',
			type: 'boolean',
			initial: 'false',
			description: 'Whether row selection is enabled'
		},
		{
			prop: 'rowKey',
			type: 'string',
			initial: "'id'",
			description: 'Field used as unique row identifier'
		},
		{
			prop: 'selectedRows',
			type: 'any[]',
			initial: '[]',
			description: 'Array of selected row objects (derived)'
		},
		{
			prop: 'selectedKeys',
			type: 'Set<string | number>',
			initial: 'new Set()',
			description: 'Set of selected row keys'
		},
		{
			prop: 'isAllSelected',
			type: 'boolean',
			initial: 'false',
			description: 'True if all rows on current page are selected (derived)'
		},
		{
			prop: 'isIndeterminate',
			type: 'boolean',
			initial: 'false',
			description: 'True if some but not all rows are selected (derived)'
		},
		{
			prop: 'selectRow',
			type: '(row: any) => void',
			initial: '',
			description: 'Select a single row'
		},
		{
			prop: 'deselectRow',
			type: '(row: any) => void',
			initial: '',
			description: 'Deselect a single row'
		},
		{
			prop: 'toggleRow',
			type: '(row: any) => void',
			initial: '',
			description: 'Toggle row selection state'
		},
		{
			prop: 'selectAll',
			type: '() => void',
			initial: '',
			description: 'Select all rows on current page'
		},
		{
			prop: 'deselectAll',
			type: '() => void',
			initial: '',
			description: 'Deselect all rows on current page'
		},
		{
			prop: 'toggleAll',
			type: '() => void',
			initial: '',
			description: 'Toggle selection of all rows on current page'
		},
		{
			prop: 'isRowSelected',
			type: '(row: any) => boolean',
			initial: '',
			description: 'Check if a specific row is selected'
		},
		{
			prop: 'clearSelection',
			type: '() => void',
			initial: '',
			description: 'Clear all selections across all pages'
		}
	];
</script>

{#snippet statusSnippet(row: any)}
	<Chip variant={row.status === 'active' ? 'success' : 'warning'} isSolid>{row.status}</Chip>
{/snippet}

{#snippet amountSnippet(row: any)}
	<span class="font-semibold">${row.amount.toFixed(2)}</span>
{/snippet}

{#snippet actionsSnippet(row: any)}
	<div class="flex gap-2 justify-end"></div>
{/snippet}

{#snippet selectSnippet(row: any)}
	<Checkbox checked={selectedUsers.includes(row.id)} onchange={() => toggleUser(row.id)} />
{/snippet}

{#snippet userSnippet(row: any)}
	<Item src={row.avatar} label={row.name} description={row.email} size="sm" />
{/snippet}

{#snippet statusToggleSnippet(row: any)}
	<Button
		size="sm"
		variant={row.active ? 'success' : 'info'}
		onclick={() => {
			row.active = !row.active;
			interactiveTable.refresh();
		}}
	>
		{row.active ? 'Active' : 'Inactive'}
	</Button>
{/snippet}

{#snippet interactiveActionsSnippet(row: any)}
	<div class="flex gap-2 justify-end">
		<Button size="sm" variant="ghost">View</Button>
		<Button size="sm" variant="ghost">Edit</Button>
		<Button size="sm" variant="ghost">Delete</Button>
	</div>
{/snippet}

{#snippet toolbarEndSnippet()}
	<Button variant="primary" size="sm">Add New +</Button>
{/snippet}

{#snippet preview()}
	<div class="w-full">
		{#if currentExample === 'dynamic'}
			<div class="flex gap-2 mb-4">
				<Button onclick={addItem}>Add Item</Button>
				<Button onclick={() => dynamicTable.refresh()} variant="secondary">Refresh</Button>
				<Button onclick={() => dynamicTable.reset()} variant="outlined">Reset</Button>
			</div>
		{/if}

		{#if currentExample === 'selection'}
			<div class="mb-4 p-3 bg-gray-100 rounded-lg text-sm">
				<p>
					<strong>Selected:</strong>
					{selectionTable.selectedRows.length} of {selectionTable.total}
				</p>
				<p><strong>All selected:</strong> {selectionTable.isAllSelected ? 'Yes' : 'No'}</p>
				<p><strong>Indeterminate:</strong> {selectionTable.isIndeterminate ? 'Yes' : 'No'}</p>
			</div>
		{/if}

		{#if currentExample === 'sorting'}
			<div class="mb-4 p-3 bg-gray-100 rounded-lg text-sm">
				<p>
					<strong>Sorted by:</strong>
					{sortingTable.sortBy || 'None'} ({sortingTable.sortOrder})
				</p>
				<p class="text-gray-600 mt-1">
					Click on column headers to sort. Click again to toggle order.
				</p>
			</div>
		{/if}

		<Table
			table={currentTable}
			{showPagination}
			{isStriped}
			{isBordered}
			{hasDividers}
			{size}
			{paginationAlign}
			{showSearch}
			{searchPlaceholder}
			{showRowsPerPage}
			rowsPerPageOptions={[5, 10, 25, 50]}
			{showTotal}
			totalLabel="Total"
		>
			{#snippet toolbarEnd()}
				{#if currentExample === 'toolbar'}
					<Button variant="primary" size="sm">Add New +</Button>
				{/if}
			{/snippet}

			{#snippet selectionActions(selectedRows)}
				{#if currentExample === 'selection'}
					<Button size="sm" onclick={handleDeleteSelected}>
						Delete ({selectedRows.length})
					</Button>
					<Button size="sm" onclick={handleExportSelected}>
						Export ({selectedRows.length})
					</Button>
				{/if}
			{/snippet}
		</Table>
	</div>
{/snippet}

{#snippet builder()}
	<Select label="Example Type" size="sm" options={exampleOptions} bind:value={currentExample} />

	<DocOptions title="">
		<Select bind:value={size} options={sizeOptions} label="Table Size" size="sm" />
		<Select
			bind:value={paginationAlign}
			options={alignOptions}
			label="Pagination Align"
			size="sm"
		/>
	</DocOptions>

	<DocOptions title="Table Options">
		<Checkbox bind:checked={showPagination} label="Pagination" />
		<Checkbox bind:checked={isStriped} label="Striped" />
		<Checkbox bind:checked={isBordered} label="Bordered" />
		<Checkbox bind:checked={hasDividers} label="Dividers" />
	</DocOptions>

	<DocOptions title="Toolbar Options">
		<Checkbox bind:checked={showSearch} label="Search" />
		<Checkbox bind:checked={showRowsPerPage} label="Per Page" />
		<Checkbox bind:checked={showTotal} label="Total" />
	</DocOptions>
{/snippet}

<DocHeader title="Table & useTable">
	A powerful data table component with built-in pagination, sorting, search capabilities, and row
	selection. Supports both client-side and server-side data handling with automatic state
	management.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<Section class="prose mt-8">
	<h3>useTable Hook Configuration</h3>
	<p>
		The useTable hook accepts a configuration object. When <code>data</code> is provided, it
		operates in client-side mode with local filtering, sorting, and pagination. When only
		<code>url</code> is provided, it operates in server-side mode.
	</p>
</Section>

<DocProps props={useTableProps} />

<Section class="prose mt-8">
	<h3>Column Configuration</h3>
	<p>Each column in the columns array should follow this structure:</p>
</Section>

<DocProps props={columnProps} />

<Section class="prose mt-8">
	<h3>Table Component Props</h3>
	<p>The Table component accepts these props for customization:</p>
</Section>

<DocProps props={tableComponentProps} />

<Section class="prose mt-8">
	<h3>Toolbar Props</h3>
	<p>
		The Table component includes a built-in toolbar with search, rows per page selector, and custom
		slots:
	</p>
</Section>

<DocProps props={toolbarProps} />

<Section class="prose mt-8">
	<h3>Selection Props</h3>
	<p>
		When row selection is enabled (<code>selectable: true</code> in useTable config), the following props
		customize the selection behavior:
	</p>
</Section>

<DocProps props={selectionProps} />

<Section class="prose mt-8">
	<h3>Return Value (TableState)</h3>
	<p>The useTable hook returns a TableState object with the following properties and methods:</p>
</Section>

<DocProps props={returnProps} />

<Section class="prose mt-8">
	<h3>Key Features</h3>
	<ul>
		<li>
			<strong>Flexible Data Sources:</strong> Supports both client-side (data prop) and server-side (url
			prop) data
		</li>
		<li><strong>Automatic Pagination:</strong> Built-in pagination with customizable page sizes</li>
		<li>
			<strong>Sorting Support:</strong> Column-based sorting with ASC/DESC order. Add
			<code>sortable: true</code> to column config
		</li>
		<li><strong>Search & Filter:</strong> Integrated search with debouncing support</li>
		<li>
			<strong>Built-in Toolbar:</strong> Search input, rows per page selector, and total count display
		</li>
		<li>
			<strong>Custom Toolbar Slots:</strong> Add custom buttons or content using toolbarStart/toolbarEnd
			snippets
		</li>
		<li><strong>Custom Rendering:</strong> Use snippets to customize cell content</li>
		<li><strong>Loading States:</strong> Automatic loading indicators with skeleton loaders</li>
		<li><strong>Empty States:</strong> Customizable empty state messages and icons</li>
		<li><strong>Responsive Design:</strong> Mobile-friendly with horizontal scroll</li>
		<li>
			<strong>Row Selection:</strong> Built-in checkbox selection with select all, indeterminate state,
			and custom actions
		</li>
	</ul>
</Section>
