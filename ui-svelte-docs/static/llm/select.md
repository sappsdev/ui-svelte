## Select Component

Dropdown for choosing one option from a list.

```svelte
<Select
  name="user"
  placeholder="Select an option..."
  options={options}
  bind:value
  bind:selected
  onchange={handleChange}
  variant="outlined"
  size="md"
  label="User"
  helpText="Choose a user"
  errorText=""
  isFloatLabel={false}
  isSolid={false}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `name` | - | Form field name (required) |
| `options` | `[]` | Array of Option objects (required) |
| `value` | - | Selected value (bindable) |
| `selected` | - | Selected Option object (bindable) |
| `placeholder` | - | Placeholder text |
| `onchange` | - | Handler `(value: unknown) => void` |
| `variant` | `'outlined'` | `primary` `secondary` `muted` `outlined` `line` |
| `size` | `'md'` | `sm` `md` `lg` |
| `label` | - | Label text |
| `helpText` | - | Help message |
| `errorText` | - | Error message |
| `isFloatLabel` | `false` | Floating label style |
| `isSolid` | `false` | Solid background |

### Option Type

```typescript
type Option = {
  id: string | number;      // Required
  label: string;            // Required
  description?: string;     // Optional description
  src?: string;             // Optional avatar image
}
```

### Common Patterns

```svelte
<script>
  const options = [
    { id: '1', label: 'John Doe' },
    { id: '2', label: 'Jane Smith' },
    { id: '3', label: 'Mike Johnson' }
  ];
  let value = $state('');
</script>

<!-- Basic -->
<Select name="user" placeholder="Select user..." options={options} bind:value />

<!-- With Label -->
<Select name="user" label="User" options={options} bind:value />

<!-- With Avatar -->
<script>
  const users = [
    { id: '1', label: 'John', src: '/avatar-1.jpg' },
    { id: '2', label: 'Jane', src: '/avatar-2.jpg' }
  ];
</script>
<Select name="user" options={users} bind:value />

<!-- With Description -->
<script>
  const roles = [
    { id: '1', label: 'Admin', description: 'Full access' },
    { id: '2', label: 'User', description: 'Limited access' }
  ];
</script>
<Select name="role" options={roles} bind:value />

<!-- Float Label -->
<Select name="user" label="User" isFloatLabel options={options} bind:value />

<!-- With Validation -->
<Select 
  name="user" 
  label="User" 
  options={options} 
  bind:value 
  errorText={!value ? 'User is required' : ''}
/>
```

**For LLMs**: Select for single choice from list. `options` array is required. Use `bind:value` for selected ID or `bind:selected` for full object. Supports avatars (`src`) and descriptions. Use `errorText` for validation.
