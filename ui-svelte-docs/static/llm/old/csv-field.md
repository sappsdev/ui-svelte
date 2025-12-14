## CsvField Component

CSV file import with column mapping interface.

```svelte
<CsvField
  requiredColumns={['name', 'email', 'phone']}
  onMappingComplete={handleComplete}
  acceptMultipleFiles={false}
  variant="primary"
  size="md"
  buttonText="Select CSV File"
  isSolid={false}
  showPreview={true}
  previewRows={5}
  previewPageSize={10}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `requiredColumns` | `[]` | Array of required column names |
| `onMappingComplete` | - | Handler with mapped data |
| `acceptMultipleFiles` | `false` | Allow multiple files |
| `variant` | `'primary'` | Button variant |
| `size` | `'md'` | `xs` `sm` `md` `lg` |
| `buttonText` | `'Select CSV File'` | Button label |
| `isSolid` | `false` | Solid button style |
| `showPreview` | `true` | Show data preview table |
| `previewRows` | `5` | Rows to preview |
| `previewPageSize` | `10` | Table page size |

### Callback Data

```typescript
onMappingComplete: (data: {
  file: File;
  mapping: Record<string, string>;
  data: any[];
  originalData: any[];
}) => void
```

### Common Patterns

```svelte
<script>
  const handleComplete = (data) => {
    console.log('Mapped data:', data.data);
    console.log('Mapping:', data.mapping);
  };
</script>

<!-- Basic -->
<CsvField 
  requiredColumns={['name', 'email']} 
  onMappingComplete={handleComplete} 
/>

<!-- Custom Button -->
<CsvField 
  requiredColumns={['name', 'email', 'phone']} 
  onMappingComplete={handleComplete}
  buttonText="Import Users"
  variant="success"
  isSolid
/>

<!-- Without Preview -->
<CsvField 
  requiredColumns={['name', 'email']} 
  onMappingComplete={handleComplete}
  showPreview={false}
/>
```

**For LLMs**: CsvField for CSV imports with column mapping. Opens modal to map CSV columns to required fields. Shows preview of first row. Returns mapped data via callback. Use `requiredColumns` to specify expected columns. Automatically detects delimiter (comma or semicolon).
