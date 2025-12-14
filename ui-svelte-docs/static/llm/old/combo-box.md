## ComboBox Component

Searchable dropdown with async data loading support.

```svelte
<ComboBox
  search={searchState}
  bind:value
  bind:selected
  placeholder="Select option..."
  searchPlaceholder="Search..."
  emptyText="No options found"
  loadingText="Loading..."
  onchange={handleChange}
  variant="outlined"
  size="md"
  label="User"
  helpText=""
  errorText=""
  isFloatLabel={false}
  isSolid={false}
  isClearable={false}
  isDisabled={false}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `search` | - | SearchState object (required) |
| `value` | `null` | Selected value (bindable) |
| `selected` | - | Selected option (bindable) |
| `placeholder` | `'Select an option'` | Button placeholder |
| `searchPlaceholder` | `'Search...'` | Search input placeholder |
| `emptyText` | `'No options found'` | Empty state text |
| `loadingText` | `'Loading...'` | Loading state text |
| `loadingMoreText` | `'Loading more...'` | Pagination loading text |
| `onchange` | - | Handler `(value: string \| number \| null) => void` |
| `variant` | `'outlined'` | `primary` `secondary` `muted` `outlined` `line` |
| `size` | `'md'` | `sm` `md` `lg` |
| `label` | - | Label text |
| `helpText` | - | Help message |
| `errorText` | - | Error message |
| `isFloatLabel` | `false` | Floating label style |
| `isSolid` | `false` | Solid background |
| `isClearable` | `false` | Show clear button |
| `isDisabled` | `false` | Disable interaction |

### SearchState

Use `useSearch` hook to create search state:

```typescript
const search = useSearch({
  fetchFn: async (query, page) => {
    // Fetch data based on query and page
    return { data, hasMore };
  },
  debounceMs: 300
});
```

### Common Patterns

```svelte
<script>
  import { useSearch } from 'ui-svelte';
  
  const search = useSearch({
    fetchFn: async (query, page) => {
      const res = await fetch(`/api/users?q=${query}&page=${page}`);
      const data = await res.json();
      return { data: data.users, hasMore: data.hasMore };
    }
  });
  
  let value = $state(null);
</script>

<!-- Basic -->
<ComboBox search={search} bind:value />

<!-- With Label -->
<ComboBox search={search} bind:value label="User" />

<!-- Clearable -->
<ComboBox search={search} bind:value isClearable />

<!-- With Validation -->
<ComboBox 
  search={search} 
  bind:value 
  label="User" 
  errorText={!value ? 'User is required' : ''}
/>
```

**For LLMs**: ComboBox for searchable dropdown with async data. Requires `search` state from `useSearch` hook. Supports infinite scroll pagination. Use `isClearable` for optional selections. Better than Select for large datasets or API-driven options.
