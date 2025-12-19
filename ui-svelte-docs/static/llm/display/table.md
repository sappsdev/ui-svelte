# Table Component

A powerful data table with built-in pagination, sorting, search, and row selection. Supports both client-side and server-side data handling.

## Basic Usage

```svelte
<script>
  import { Table, useTable } from 'ui-svelte';

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' }
  ];

  const table = useTable({
    data,
    columns: [
      { label: 'ID', field: 'id', width: '80px', sortable: true },
      { label: 'Name', field: 'name', sortable: true },
      { label: 'Email', field: 'email' },
      { label: 'Role', field: 'role', align: 'center' }
    ],
    initialPageSize: 10
  });
</script>

<Table {table} hasDividers showPagination />
```

## Table Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `table` | `TableState` | - | Required. State from useTable hook |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Table size variant |
| `color` | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | - | Header and selection color |
| `isStriped` | `boolean` | `false` | Alternating row backgrounds |
| `isBordered` | `boolean` | `false` | Add cell borders |
| `hasDividers` | `boolean` | `false` | Show row dividers |
| `showPagination` | `boolean` | `false` | Show pagination controls |
| `paginationAlign` | `'start' \| 'center' \| 'end'` | `'center'` | Pagination alignment |
| `loadingRows` | `number` | `5` | Skeleton rows during loading |
| `showSearch` | `boolean` | `false` | Show search input |
| `searchPlaceholder` | `string` | `'Search...'` | Search placeholder |
| `showRowsPerPage` | `boolean` | `false` | Show page size selector |
| `rowsPerPageOptions` | `number[]` | `[5,10,25,50,100]` | Page size options |
| `showTotal` | `boolean` | `false` | Show total items count |
| `noDataTitle` | `string` | `'No data'` | Empty state title |
| `noDataDescription` | `string` | - | Empty state description |
| `onRowClick` | `(row, index) => void` | - | Row click handler |
| `rowClass` | `(row, index) => string` | - | Dynamic row class |
| `rootClass` | `string` | - | Wrapper class |
| `containerClass` | `string` | - | Container class |
| `headerClass` | `string` | - | Header class |
| `bodyClass` | `string` | - | Body class |

## useTable Config

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `columns` | `Column[]` | - | Required. Column definitions |
| `data` | `any[]` | - | Static data (client-side mode) |
| `url` | `string` | - | API endpoint (server-side mode) |
| `queryParams` | `(params) => Record<string,string>` | - | Build query params |
| `parseResponse` | `(response, params) => Response` | - | Parse API response |
| `headers` | `Record<string,string>` | `{}` | Request headers |
| `initialPage` | `number` | `1` | Initial page |
| `initialPageSize` | `number` | `10` | Initial rows per page |
| `initialSortBy` | `string` | - | Initial sort column |
| `initialSortOrder` | `'ASC' \| 'DESC'` | `'ASC'` | Initial sort direction |
| `debounceSearch` | `number` | `0` | Search debounce (ms) |
| `selectable` | `boolean` | `false` | Enable row selection |
| `rowKey` | `string` | `'id'` | Unique row identifier |
| `onSelectionChange` | `(rows) => void` | - | Selection callback |
| `onSuccess` | `(response) => void` | - | Success callback |
| `onError` | `(error) => void` | - | Error callback |

## Column Config

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | - | Column header text |
| `field` | `string` | - | Data field key |
| `sortable` | `boolean` | `false` | Enable sorting |
| `width` | `string` | - | Column width (e.g., '80px') |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| `render` | `Snippet<[row]>` | - | Custom cell renderer |

## TableState Methods

The `useTable` hook returns a state object with:

- `data`, `isLoading`, `error`, `total`
- `page`, `pageSize`, `totalPages`
- `sortBy`, `sortOrder`, `search`
- `selectedRows`, `isAllSelected`
- `setPage(n)`, `setPageSize(n)`, `setSort(col, order)`
- `setSearch(query)`, `refresh()`, `reset()`
- `toggleRow(row)`, `clearSelection()`

## Common Patterns

### Client-Side Table
```svelte
<script>
  import { Table, useTable } from 'ui-svelte';

  const users = [
    { id: 1, name: 'John', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane', email: 'jane@example.com', status: 'inactive' }
  ];

  const table = useTable({
    data: users,
    columns: [
      { label: 'Name', field: 'name', sortable: true },
      { label: 'Email', field: 'email' },
      { label: 'Status', field: 'status', align: 'center' }
    ],
    initialPageSize: 10
  });
</script>

<Table 
  {table} 
  hasDividers 
  showPagination 
  showSearch
  showRowsPerPage
  showTotal
/>
```

### Server-Side Table
```svelte
<script>
  import { Table, useTable } from 'ui-svelte';

  const table = useTable({
    url: 'https://api.example.com/users',
    columns: [
      { label: 'Name', field: 'name', sortable: true },
      { label: 'Email', field: 'email' },
      { label: 'Role', field: 'role' }
    ],
    queryParams: (params) => ({
      page: String(params.page),
      limit: String(params.limit),
      sort: params.sortBy || '',
      order: params.sortOrder || '',
      search: params.search || ''
    }),
    parseResponse: (response, params) => ({
      data: response.data,
      total: response.total,
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      totalPages: Math.ceil(response.total / (params.pageSize || 10))
    }),
    headers: {
      'Authorization': 'Bearer token'
    }
  });
</script>

<Table {table} hasDividers showPagination showSearch />
```

### Custom Cell Rendering
```svelte
<script>
  import { Table, useTable, Chip, Button } from 'ui-svelte';

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
  <Chip 
    color={row.status === 'active' ? 'success' : 'warning'} 
    variant="soft" 
    size="xs"
  >
    {row.status}
  </Chip>
{/snippet}

{#snippet actionsCell(row)}
  <div class="flex gap-2 justify-end">
    <Button size="xs" variant="ghost">Edit</Button>
    <Button size="xs" variant="ghost" color="danger">Delete</Button>
  </div>
{/snippet}

<Table {table} hasDividers showPagination />
```

### Row Selection
```svelte
<script>
  import { Table, useTable, Button } from 'ui-svelte';

  const table = useTable({
    data: users,
    columns: [
      { label: 'Name', field: 'name', sortable: true },
      { label: 'Email', field: 'email' }
    ],
    selectable: true,
    rowKey: 'id',
    onSelectionChange: (rows) => {
      console.log('Selected:', rows);
    }
  });

  function handleDelete() {
    const ids = table.selectedRows.map(r => r.id);
    console.log('Delete:', ids);
    table.clearSelection();
  }
</script>

<Table {table} hasDividers showPagination>
  {#snippet selectionActions(selectedRows)}
    <Button 
      size="sm" 
      color="danger" 
      variant="soft"
      onclick={handleDelete}
    >
      Delete ({selectedRows.length})
    </Button>
  {/snippet}
</Table>
```

### Visual Variants
```svelte
<!-- Striped rows -->
<Table {table} isStriped showPagination />

<!-- With borders -->
<Table {table} isBordered showPagination />

<!-- Compact with dividers -->
<Table {table} hasDividers size="sm" />

<!-- With color theme -->
<Table {table} color="primary" hasDividers showPagination />
```

### Complete Example
```svelte
<script>
  import { Section, Card, Table, useTable, Chip, Button } from 'ui-svelte';

  const table = useTable({
    data: [
      { id: 1, name: 'John', email: 'john@example.com', role: 'Admin', status: 'active' },
      { id: 2, name: 'Jane', email: 'jane@example.com', role: 'User', status: 'inactive' }
    ],
    columns: [
      { label: 'ID', field: 'id', width: '80px', sortable: true },
      { label: 'Name', field: 'name', sortable: true },
      { label: 'Email', field: 'email' },
      { label: 'Role', field: 'role', align: 'center' },
      { label: 'Status', field: 'status', render: statusCell },
      { label: 'Actions', field: 'actions', align: 'right', render: actionsCell }
    ],
    initialPageSize: 10,
    selectable: true,
    rowKey: 'id'
  });
</script>

{#snippet statusCell(row)}
  <Chip color={row.status === 'active' ? 'success' : 'danger'} size="xs">
    {row.status}
  </Chip>
{/snippet}

{#snippet actionsCell(row)}
  <div class="flex gap-2">
    <Button size="xs" variant="ghost">Edit</Button>
    <Button size="xs" variant="ghost" color="danger">Delete</Button>
  </div>
{/snippet}

<Section isBoxed>
  <Card>
    <h2 class="card-title">Users</h2>
    <Table 
      {table}
      color="primary"
      hasDividers
      showPagination
      showSearch
      showRowsPerPage
      showTotal
      searchPlaceholder="Search users..."
    >
      {#snippet selectionActions(selectedRows)}
        <Button size="sm" color="danger" variant="soft">
          Delete ({selectedRows.length})
        </Button>
      {/snippet}
    </Table>
  </Card>
</Section>
```

## Best Practices

1. **Always use within Section and Card**
   ```svelte
   <Section isBoxed>
     <Card>
       <h2 class="card-title">Table Title</h2>
       <Table {table} />
     </Card>
   </Section>
   ```

2. **Set appropriate page sizes**
   ```svelte
   const table = useTable({
     data,
     columns,
     initialPageSize: 10, // Good default
     rowsPerPageOptions: [10, 25, 50] // Reasonable options
   });
   ```

3. **Use snippets for complex cells**
   ```svelte
   // ✅ Good - Custom rendering
   { label: 'Status', field: 'status', render: statusCell }
   
   // ❌ Avoid - Plain text only
   { label: 'Status', field: 'status' }
   ```

4. **Handle loading and error states**
   ```svelte
   <script>
     const table = useTable({
       url: '/api/data',
       columns,
       onError: (error) => {
         console.error('Failed to load:', error);
       },
       onSuccess: (data) => {
         console.log('Loaded:', data);
       }
     });
   </script>
   ```

5. **Debounce search for server-side**
   ```svelte
   const table = useTable({
     url: '/api/data',
     columns,
     debounceSearch: 300 // Wait 300ms before searching
   });
   ```

## Related Documentation

- **Typography:** https://ui-svelte.sappsdev.com/llm/starter/typography.md
- **Page Structure:** https://ui-svelte.sappsdev.com/llm/layout/page.md
- **Section Component:** https://ui-svelte.sappsdev.com/llm/display/section.md
- **Card Component:** https://ui-svelte.sappsdev.com/llm/display/card.md
- **Button Component:** https://ui-svelte.sappsdev.com/llm/control/button.md
- **Chip Component:** https://ui-svelte.sappsdev.com/llm/display/chip.md

## Notes

- **Always use card-title class** for table headers in Card components
- Table component uses `useTable` hook for state management
- Supports both client-side (data prop) and server-side (url prop) modes
- Client-side mode handles sorting, filtering, and pagination automatically
- Server-side mode requires `queryParams` and `parseResponse` configuration
- Custom cell rendering uses Svelte 5 snippets
- Row selection requires `selectable: true` and `rowKey` configuration
- Use `hasDividers` for cleaner visual separation between rows
- Combine with typography classes for consistent text styling