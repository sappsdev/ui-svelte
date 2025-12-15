## Table Component

Data table with pagination, sorting, filtering, and server-side support.

```svelte
<script>
  import { Table, useTable } from 'ui-svelte';
  
  const table = useTable({
    data: users,  // or url: 'https://api.example.com/users'
    columns: [
      { label: 'Name', field: 'name', sortable: true },
      { label: 'Email', field: 'email' },
      { label: 'Role', field: 'role', align: 'center' }
    ],
    initialPageSize: 10
  });
</script>

<Table table={table} showPagination isStriped />
```

### useTable Hook Props

| Prop | Default | Description |
|------|---------|-------------|
| `columns` | `[]` | Column definitions (required) |
| `data` | - | Static data array (client-side mode) |
| `url` | - | API endpoint (server-side mode) |
| `queryParams` | - | `(params) => Record<string, string>` |
| `parseResponse` | - | `(data, params) => PaginatedResponse` |
| `headers` | `{}` | Custom request headers |
| `initialPage` | `1` | Starting page |
| `initialPageSize` | `10` | Rows per page |
| `initialSortBy` | - | Initial sort field |
| `initialSortOrder` | `'ASC'` | `ASC` `DESC` |
| `initialSearch` | `''` | Initial search query |
| `debounceSearch` | `0` | Search debounce (ms) |
| `selectable` | `false` | Enable row selection |
| `rowKey` | `'id'` | Unique row identifier |
| `onSelectionChange` | - | `(selectedRows) => void` |
| `onError` | - | `(error) => void` |
| `onSuccess` | - | `(response) => void` |

### Column Props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Column header (required) |
| `field` | `string` | Data field key (required) |
| `width` | `string` | Column width (CSS) |
| `align` | `'left' \| 'center' \| 'right'` | Text alignment |
| `sortable` | `boolean` | Enable sorting |
| `render` | `Snippet` | Custom cell renderer |

### Table Component Props

| Prop | Default | Description |
|------|---------|-------------|
| `table` | - | Table state from useTable (required) |
| `showPagination` | `false` | Show pagination controls |
| `isStriped` | `false` | Striped rows |
| `isBordered` | `false` | Table borders |
| `hasDividers` | `true` | Row dividers |
| `size` | `'md'` | `sm` `md` `lg` |
| `paginationAlign` | `'center'` | `start` `center` `end` |
| `showSearch` | `false` | Show search input |
| `searchPlaceholder` | `'Search...'` | Search placeholder |
| `showRowsPerPage` | `false` | Show rows selector |
| `rowsPerPageOptions` | `[10, 25, 50, 100]` | Page size options |
| `showTotal` | `false` | Show total count |
| `toolbarEnd` | - | Snippet for toolbar actions |
| `selectionActions` | - | Snippet for selection actions |

### Table State Methods

- `updateData(data)` - Update client-side data
- `refresh()` - Reload data
- `reset()` - Reset to initial state
- `setSort(field, order)` - Set sorting
- `selectAll()` - Select all rows
- `clearSelection()` - Clear selection
- `selectedRows` - Array of selected rows
- `isAllSelected` - Boolean
- `isIndeterminate` - Boolean

### Common Patterns

```svelte
<!-- Client-Side Table -->
<script>
  const users = [
    { id: 1, name: 'John', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane', email: 'jane@example.com', role: 'User' }
  ];
  
  const table = useTable({
    data: users,
    columns: [
      { label: 'ID', field: 'id', width: '80px' },
      { label: 'Name', field: 'name', sortable: true },
      { label: 'Email', field: 'email' },
      { label: 'Role', field: 'role', align: 'center' }
    ],
    initialPageSize: 10
  });
</script>

<Table table={table} showPagination isStriped />

<!-- Server-Side Table -->
<script>
  const table = useTable({
    url: 'https://api.example.com/users',
    columns: [
      { label: 'Name', field: 'name', sortable: true },
      { label: 'Email', field: 'email' }
    ],
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
    headers: { 'Authorization': 'Bearer token' }
  });
</script>

<Table table={table} showPagination isBordered />

<!-- Custom Cell Rendering -->
<script>
  const table = useTable({
    data: users,
    columns: [
      { label: 'Name', field: 'name' },
      { label: 'Status', field: 'status', render: statusSnippet },
      { label: 'Actions', field: 'actions', render: actionsSnippet }
    ]
  });
</script>

{#snippet statusSnippet(user)}
  <Chip variant={user.status === 'active' ? 'success' : 'warning'} isSolid>
    {user.status}
  </Chip>
{/snippet}

{#snippet actionsSnippet(user)}
  <div class="flex gap-2">
    <IconButton icon="fluent:edit-24-regular" size="xs" />
    <IconButton icon="fluent:delete-24-regular" size="xs" variant="danger" />
  </div>
{/snippet}

<Table table={table} showPagination />

<!-- With Search and Toolbar -->
<script>
  const table = useTable({
    data: users,
    columns: [...],
    debounceSearch: 300
  });
</script>

<Table
  table={table}
  showPagination
  showSearch
  searchPlaceholder="Search users..."
  showRowsPerPage
  showTotal
>
  {#snippet toolbarEnd()}
    <Button variant="primary" size="sm">Add User +</Button>
  {/snippet}
</Table>

<!-- Row Selection -->
<script>
  const table = useTable({
    data: users,
    columns: [...],
    selectable: true,
    rowKey: 'id',
    onSelectionChange: (selected) => console.log('Selected:', selected)
  });
  
  function handleDelete() {
    console.log('Deleting:', table.selectedRows);
    table.clearSelection();
  }
</script>

<Table table={table} showPagination>
  {#snippet selectionActions(selectedRows)}
    <Button size="sm" variant="danger" onclick={handleDelete}>
      Delete ({selectedRows.length})
    </Button>
  {/snippet}
</Table>

<!-- Sorting -->
<script>
  const table = useTable({
    data: users,
    columns: [
      { label: 'ID', field: 'id', sortable: true },
      { label: 'Name', field: 'name', sortable: true },
      { label: 'Email', field: 'email', sortable: true }
    ],
    initialSortBy: 'name',
    initialSortOrder: 'ASC'
  });
</script>

<Table table={table} showPagination isStriped />
```

**For LLMs**: Table displays tabular data with pagination, sorting, and filtering. Use `useTable` hook for state management. **Client-side mode**: provide `data` array for local operations. **Server-side mode**: provide `url` for API integration with `queryParams` and `parseResponse`. Columns can have custom `render` snippets. Enable `selectable` for row selection with checkboxes. Use `showSearch`, `showRowsPerPage`, `showTotal` for toolbar features. `toolbarEnd` and `selectionActions` snippets add custom UI. Sorting enabled per-column with `sortable: true`. Table state provides methods like `updateData()`, `refresh()`, `reset()`, `selectAll()`, `clearSelection()`.

---

## Quick Hierarchy Reference
```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (Table, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
