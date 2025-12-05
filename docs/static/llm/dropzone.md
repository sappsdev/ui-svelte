## Dropzone Component

File upload area with drag-and-drop support.

```svelte
<Dropzone
  bind:files
  accept="image/*"
  multiple={true}
  maxSize={5242880}
  icon="upload"
  placeholder="Drag files here or click to select"
  variant="outlined"
  size="md"
  label="Upload Files"
  helpText="Max 5MB per file"
  errorText=""
  disabled={false}
  onchange={handleChange}
  isSolid={false}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `files` | `[]` | Array of FileWithUrl objects (bindable) |
| `accept` | - | Accepted file types (e.g., `'image/*'`, `'.pdf'`) |
| `multiple` | `true` | Allow multiple files |
| `maxSize` | - | Max file size in bytes |
| `icon` | `'upload'` | Icon name |
| `placeholder` | - | Placeholder text |
| `variant` | `'outlined'` | `primary` `secondary` `muted` `outlined` `line` |
| `size` | `'md'` | `sm` `md` `lg` |
| `name` | - | Form field name |
| `label` | - | Label text |
| `helpText` | - | Help message |
| `errorText` | - | Error message |
| `disabled` | `false` | Disable interaction |
| `onchange` | - | Handler `(files: FileWithUrl[]) => void` |
| `isSolid` | `false` | Solid background |

### FileWithUrl Type

```typescript
type FileWithUrl = {
  file: File;
  name: string;
  size: number;
  url: Promise<string>;
  uploadedAt: number;
}
```

### Common Patterns

```svelte
<script>
  let files = $state([]);
</script>

<!-- Basic -->
<Dropzone bind:files />

<!-- Images Only -->
<Dropzone bind:files accept="image/*" label="Upload Images" />

<!-- Single File -->
<Dropzone bind:files multiple={false} label="Upload Avatar" />

<!-- With Size Limit -->
<Dropzone 
  bind:files 
  maxSize={5242880} 
  label="Upload" 
  helpText="Max 5MB per file"
/>

<!-- PDF Only -->
<Dropzone bind:files accept=".pdf" label="Upload PDF" />

<!-- With onChange -->
<Dropzone 
  bind:files 
  onchange={(files) => console.log('Files:', files)}
/>
```

**For LLMs**: Dropzone for file uploads with drag-and-drop. Use `accept` to filter file types. Use `maxSize` for size limits. Shows preview for images, file icon for others. Use `multiple={false}` for single file. Files are bindable array with preview URLs.
