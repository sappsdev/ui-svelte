# Table Component

Data table with pagination, sorting, search, and row selection using the `useTable` hook.

## Import

```svelte
import {(Table, useTable)} from 'ui-svelte';
```

## Props

| Prop              | Type                           | Default    | Description             |
| ----------------- | ------------------------------ | ---------- | ----------------------- |
| `table`           | `TableState`                   | -          | Required. From useTable |
| `color`           | `Color`                        | -          | Header/selection color  |
| `size`            | `'sm' \| 'md' \| 'lg'`         | `'md'`     | Table size              |
| `isStriped`       | `boolean`                      | `false`    | Alternating row colors  |
| `isBordered`      | `boolean`                      | `false`    | Cell borders            |
| `hasDividers`     | `boolean`                      | `false`    | Row dividers            |
| `showPagination`  | `boolean`                      | `false`    | Show pagination         |
| `paginationAlign` | `'start' \| 'center' \| 'end'` | `'center'` | Pagination position     |
| `showSearch`      | `boolean`                      | `false`    | Show search input       |
| `showRowsPerPage` | `boolean`                      | `false`    | Page size selector      |
| `showTotal`       | `boolean`                      | `false`    | Total items count       |
| `onRowClick`      | `(row, index) => void`         | -          | Row click handler       |

## useTable Config

```typescript
const table = useTable({
	// Data source (one of these)
	data: [], // Static data (client-side)
	url: 'https://api.../users', // API endpoint (server-side)

	// Required
	columns: [
		{ label: 'Name', field: 'name', sortable: true },
		{ label: 'Email', field: 'email' },
		{ label: 'Role', field: 'role', align: 'center' }
	],

	// Pagination
	initialPageSize: 10,
	initialPage: 1,

	// Sorting
	initialSortBy: 'name',
	initialSortOrder: 'ASC', // 'ASC' | 'DESC'

	// Selection
	selectable: true,
	rowKey: 'id',
	onSelectionChange: (rows) => console.log(rows),

	// Server-side (when using url)
	queryParams: (params) => ({
		limit: String(params.limit),
		offset: String(params.offset)
	}),
	parseResponse: (response, params) => ({
		data: response.results,
		total: response.count,
		page: params.page,
		pageSize: params.pageSize,
		totalPages: Math.ceil(response.count / params.pageSize)
	})
});
```

## Column Config

```typescript
type Column = {
	label: string; // Header text
	field: string; // Data key
	sortable?: boolean; // Enable sorting
	width?: string; // Width (e.g., '80px')
	align?: 'left' | 'center' | 'right';
	render?: Snippet<[row]>; // Custom cell renderer
};
```

## Patterns

### Basic Client-Side

```svelte
<script>
	const table = useTable({
		data: users,
		columns: [
			{ label: 'ID', field: 'id', width: '80px' },
			{ label: 'Name', field: 'name', sortable: true },
			{ label: 'Email', field: 'email' }
		],
		initialPageSize: 10
	});
</script>

<Table {table} hasDividers showPagination />
```

### Custom Cell Rendering

```svelte
<script>
	const table = useTable({
		data: users,
		columns: [
			{ label: 'Name', field: 'name' },
			{ label: 'Status', field: 'status', render: statusCell },
			{ label: 'Actions', field: 'actions', align: 'right', render: actionsCell }
		]
	});
</script>

{#snippet statusCell(row)}
	<Chip color={row.status === 'active' ? 'success' : 'warning'}>
		{row.status}
	</Chip>
{/snippet}

{#snippet actionsCell(row)}
	<Button size="xs" onclick={() => edit(row)}>Edit</Button>
	<Button size="xs" color="danger" onclick={() => del(row)}>Delete</Button>
{/snippet}
```

### Row Selection

```svelte
<script>
  const table = useTable({
    data: users,
    columns: [...],
    selectable: true,
    rowKey: 'id'
  });
</script>

<Table {table} showPagination>
	{#snippet selectionActions(selectedRows)}
		<Button color="danger" onclick={() => deleteMany(selectedRows)}>
			Delete ({selectedRows.length})
		</Button>
	{/snippet}
</Table>
```

### Server-Side Data

```svelte
<script>
  const table = useTable({
    url: 'https://api.example.com/users',
    columns: [...],
    queryParams: (params) => ({
      page: String(params.page),
      limit: String(params.limit)
    }),
    parseResponse: (res, params) => ({
      data: res.data,
      total: res.total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: Math.ceil(res.total / params.pageSize)
    })
  });
</script>

<Table {table} showPagination showSearch />
```

## TableState Methods

| Method                | Description            |
| --------------------- | ---------------------- |
| `setPage(n)`          | Go to page n           |
| `setPageSize(n)`      | Set rows per page      |
| `setSort(col, order)` | Set sort column        |
| `setSearch(query)`    | Set search query       |
| `refresh()`           | Refresh data           |
| `reset()`             | Reset to initial state |
| `toggleRow(row)`      | Toggle row selection   |
| `clearSelection()`    | Clear all selections   |

## Notes

- Use `data` for client-side or `url` for server-side
- `selectable: true` enables checkbox column
- `render` snippet on columns for custom cell content
- Loading state shows skeleton rows automatically
