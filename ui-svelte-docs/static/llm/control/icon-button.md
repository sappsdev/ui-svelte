# IconButton Component

Compact buttons that display only an icon, ideal for toolbars and actions where space is limited.

## Basic Usage

```svelte
<script>
  import { IconButton } from 'ui-svelte';
  import { HeartIcon } from '$lib/icons';
</script>

<IconButton 
  icon={HeartIcon} 
  onclick={() => console.log('clicked')} 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `IconData` | - | Required. Icon to display |
| `onclick` | `() => void` | - | Click handler function |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type attribute |
| `href` | `string` | - | Renders as link when provided |
| `target` | `'_self' \| '_blank' \| '_parent' \| '_top'` | - | Link target (when href is set) |
| `color` | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Button color theme |
| `variant` | `'solid' \| 'soft' \| 'outlined' \| 'ghost'` | `'solid'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `isLoading` | `boolean` | `false` | Shows loading state |
| `isDisabled` | `boolean` | `false` | Disables interaction |
| `class` | `string` | - | Additional CSS classes (rarely needed) |

## Common Patterns

### Colors & Variants
```svelte
<script>
  import { IconButton } from 'ui-svelte';
  import { HeartIcon, SettingsIcon, TrashIcon } from '$lib/icons';
</script>

<!-- Solid variants -->
<IconButton icon={HeartIcon} color="primary" variant="solid" />
<IconButton icon={HeartIcon} color="danger" variant="solid" />
<IconButton icon={HeartIcon} color="success" variant="solid" />

<!-- Soft variants -->
<IconButton icon={SettingsIcon} color="muted" variant="soft" />
<IconButton icon={SettingsIcon} color="info" variant="soft" />

<!-- Outlined variants -->
<IconButton icon={TrashIcon} color="danger" variant="outlined" />

<!-- Ghost variants -->
<IconButton icon={SettingsIcon} color="muted" variant="ghost" />
```

### Sizes
```svelte
<IconButton icon={HeartIcon} size="xs" />
<IconButton icon={HeartIcon} size="sm" />
<IconButton icon={HeartIcon} size="md" />
<IconButton icon={HeartIcon} size="lg" />
<IconButton icon={HeartIcon} size="xl" />
```

### States
```svelte
<!-- Loading state -->
<IconButton icon={DownloadIcon} isLoading color="primary" />

<!-- Disabled state -->
<IconButton icon={SendIcon} isDisabled />
```

### As Link
```svelte
<IconButton 
  icon={ExternalLinkIcon} 
  href="https://example.com" 
  target="_blank"
  color="info"
/>
```

### In Card Headers
```svelte
<script>
  import { Section, Card, IconButton } from 'ui-svelte';
  import { EditIcon, TrashIcon, MoreIcon } from '$lib/icons';
</script>

<Section isBoxed>
  <Card>
    {#snippet header()}
      <div class="row justify-between center">
        <h3 class="card-title">Card Title</h3>
        <div class="row gap-2">
          <IconButton icon={EditIcon} variant="ghost" size="sm" />
          <IconButton icon={TrashIcon} variant="ghost" size="sm" color="danger" />
          <IconButton icon={MoreIcon} variant="ghost" size="sm" />
        </div>
      </div>
    {/snippet}
    
    <p class="card-description">Card content here</p>
  </Card>
</Section>
```

### Toolbar Actions
```svelte
<script>
  import { Section, Card, IconButton } from 'ui-svelte';
  import { SaveIcon, UndoIcon, RedoIcon, PrintIcon } from '$lib/icons';
</script>

<Section isBoxed>
  <Card>
    <h2 class="card-title">Document Editor</h2>
    
    <!-- Toolbar -->
    <div class="row gap-2 border-b pb-4">
      <IconButton icon={SaveIcon} color="primary" variant="soft" />
      <IconButton icon={UndoIcon} variant="ghost" />
      <IconButton icon={RedoIcon} variant="ghost" />
      <IconButton icon={PrintIcon} variant="ghost" />
    </div>
    
    <p class="card-description">Document content...</p>
  </Card>
</Section>
```

### Table Row Actions
```svelte
<script>
  import { Table, useTable, IconButton } from 'ui-svelte';
  import { EditIcon, TrashIcon, ViewIcon } from '$lib/icons';
  
  const table = useTable({
    data: users,
    columns: [
      { label: 'Name', field: 'name' },
      { label: 'Email', field: 'email' },
      { label: 'Actions', field: 'actions', align: 'right', render: actionsCell }
    ]
  });
</script>

{#snippet actionsCell(row)}
  <div class="row gap-2 justify-end">
    <IconButton 
      icon={ViewIcon} 
      variant="ghost" 
      size="sm"
      onclick={() => viewUser(row)}
    />
    <IconButton 
      icon={EditIcon} 
      variant="ghost" 
      size="sm"
      onclick={() => editUser(row)}
    />
    <IconButton 
      icon={TrashIcon} 
      variant="ghost" 
      size="sm"
      color="danger"
      onclick={() => deleteUser(row)}
    />
  </div>
{/snippet}

<Table {table} hasDividers showPagination />
```

### Modal Actions
```svelte
<script>
  import { Modal, IconButton } from 'ui-svelte';
  import { CloseIcon } from '$lib/icons';
  
  let open = $state(false);
</script>

<Modal bind:open hideCloseButton>
  {#snippet header()}
    <div class="row justify-between center">
      <h4 class="card-title">Custom Modal</h4>
      <IconButton 
        icon={CloseIcon} 
        variant="ghost" 
        size="sm"
        onclick={() => (open = false)}
      />
    </div>
  {/snippet}
  
  <p class="card-description">Modal content</p>
</Modal>
```

### Icon Button Groups
```svelte
<script>
  import { IconButton } from 'ui-svelte';
  import { BoldIcon, ItalicIcon, UnderlineIcon } from '$lib/icons';
</script>

<!-- Text formatting toolbar -->
<div class="row gap-1">
  <IconButton icon={BoldIcon} variant="ghost" size="sm" />
  <IconButton icon={ItalicIcon} variant="ghost" size="sm" />
  <IconButton icon={UnderlineIcon} variant="ghost" size="sm" />
</div>

<!-- Social actions -->
<div class="row gap-2">
  <IconButton icon={LikeIcon} color="primary" variant="outlined" />
  <IconButton icon={CommentIcon} color="info" variant="outlined" />
  <IconButton icon={ShareIcon} color="success" variant="outlined" />
</div>
```

### Floating Action Buttons
```svelte
<script>
  import { Section, IconButton } from 'ui-svelte';
  import { PlusIcon } from '$lib/icons';
</script>

<Section isBoxed rootClass="relative">
  <!-- Content -->
  <div class="prose-normal">
    <p class="body-md">Page content...</p>
  </div>
  
  <!-- Floating action button -->
  <div class="fixed bottom-8 right-8">
    <IconButton 
      icon={PlusIcon} 
      color="primary" 
      size="xl"
      onclick={() => createNew()}
      rootClass="shadow-lg"
    />
  </div>
</Section>
```

### Different Icon Types
```svelte
<script>
  import { IconButton } from 'ui-svelte';
  import { 
    HeartIcon,
    SettingsIcon,
    SearchIcon,
    TrashIcon,
    DownloadIcon,
    SendIcon,
    BellIcon,
    UserIcon
  } from '$lib/icons';
</script>

<!-- Different semantic actions -->
<div class="row gap-2">
  <IconButton icon={HeartIcon} color="danger" />
  <IconButton icon={SettingsIcon} color="muted" />
  <IconButton icon={SearchIcon} color="info" />
  <IconButton icon={TrashIcon} color="danger" variant="soft" />
  <IconButton icon={DownloadIcon} color="success" variant="outlined" />
  <IconButton icon={SendIcon} color="primary" variant="ghost" />
  <IconButton icon={BellIcon} color="warning" />
  <IconButton icon={UserIcon} color="secondary" />
</div>
```

### Complete Dashboard Example
```svelte
<script>
  import { Section, Card, IconButton, Button } from 'ui-svelte';
  import { EditIcon, TrashIcon, MoreIcon, RefreshIcon } from '$lib/icons';
</script>

<Section isBoxed>
  <Card>
    {#snippet header()}
      <div class="row justify-between center">
        <h2 class="card-title">Dashboard</h2>
        <div class="row gap-2">
          <IconButton 
            icon={RefreshIcon} 
            variant="ghost"
            onclick={() => refresh()}
          />
          <Button size="sm">New Item</Button>
        </div>
      </div>
    {/snippet}
    
    <!-- Stats Grid -->
    <div class="grid-4 gap-4">
      <Card color="primary" variant="soft">
        {#snippet header()}
          <div class="row justify-between center">
            <h3 class="body-md text-medium">Total Users</h3>
            <IconButton icon={MoreIcon} variant="ghost" size="xs" />
          </div>
        {/snippet}
        <h3 class="display-md">1,234</h3>
      </Card>
      
      <Card color="success" variant="soft">
        {#snippet header()}
          <div class="row justify-between center">
            <h3 class="body-md text-medium">Active</h3>
            <IconButton icon={MoreIcon} variant="ghost" size="xs" />
          </div>
        {/snippet}
        <h3 class="display-md">567</h3>
      </Card>
      
      <Card color="warning" variant="soft">
        {#snippet header()}
          <div class="row justify-between center">
            <h3 class="body-md text-medium">Pending</h3>
            <IconButton icon={MoreIcon} variant="ghost" size="xs" />
          </div>
        {/snippet}
        <h3 class="display-md">89</h3>
      </Card>
      
      <Card color="danger" variant="soft">
        {#snippet header()}
          <div class="row justify-between center">
            <h3 class="body-md text-medium">Issues</h3>
            <IconButton icon={MoreIcon} variant="ghost" size="xs" />
          </div>
        {/snippet}
        <h3 class="display-md">12</h3>
      </Card>
    </div>
  </Card>
</Section>
```

## Best Practices

1. **Use semantic icons and colors**
   ```svelte
   <!-- ✅ Clear semantic meaning -->
   <IconButton icon={TrashIcon} color="danger" />
   <IconButton icon={CheckIcon} color="success" />
   <IconButton icon={EditIcon} color="primary" />
   
   <!-- ❌ Confusing colors -->
   <IconButton icon={TrashIcon} color="success" />
   ```

2. **Use ghost variant for secondary actions**
   ```svelte
   <!-- ✅ Good hierarchy -->
   <div class="row gap-2">
     <Button color="primary">Primary Action</Button>
     <IconButton icon={MoreIcon} variant="ghost" />
   </div>
   ```

3. **Size appropriately for context**
   ```svelte
   <!-- ✅ Toolbar: small -->
   <IconButton icon={EditIcon} size="sm" variant="ghost" />
   
   <!-- ✅ Card actions: medium -->
   <IconButton icon={MoreIcon} size="md" variant="ghost" />
   
   <!-- ✅ FAB: large -->
   <IconButton icon={PlusIcon} size="xl" color="primary" />
   ```

4. **Use loading state for async actions**
   ```svelte
   <script>
     let saving = $state(false);
     
     async function handleSave() {
       saving = true;
       await saveData();
       saving = false;
     }
   </script>
   
   <IconButton 
     icon={SaveIcon} 
     isLoading={saving}
     onclick={handleSave}
   />
   ```

5. **Group related actions**
   ```svelte
   <!-- ✅ Clear grouping -->
   <div class="row gap-1 border-r pr-2">
     <IconButton icon={UndoIcon} variant="ghost" />
     <IconButton icon={RedoIcon} variant="ghost" />
   </div>
   <div class="row gap-1">
     <IconButton icon={SaveIcon} variant="ghost" />
     <IconButton icon={PrintIcon} variant="ghost" />
   </div>
   ```

6. **Provide tooltips for clarity (when available)**
   ```svelte
   <!-- Icon-only buttons should have clear purpose -->
   <IconButton 
     icon={TrashIcon} 
     color="danger"
     onclick={deleteItem}
     aria-label="Delete item"
   />
   ```

## Related Documentation

- **Typography:** https://ui-svelte.sappsdev.com/llm/starter/typography.md
- **Icons:** https://ui-svelte.sappsdev.com/llm/starter/icons.md
- **Button Component:** https://ui-svelte.sappsdev.com/llm/control/button.md
- **Card Component:** https://ui-svelte.sappsdev.com/llm/display/card.md
- **Table Component:** https://ui-svelte.sappsdev.com/llm/display/table.md

## Notes

- **Icon is required** - use IconData format from your icon library
- **Always use semantic colors** for actions (danger for delete, success for confirm)
- Icon buttons are compact - perfect for toolbars, card headers, and table actions
- Use `variant="ghost"` for secondary/tertiary actions
- Use `size="sm"` or `size="xs"` in dense UIs (toolbars, tables)
- Use `size="xl"` for floating action buttons (FABs)
- Loading state automatically shows spinner
- When using as link, provide `href` prop
- Combine with Button component for primary/secondary action pairs
- Works great in card headers with `justify-between` layout
- **For icon documentation, see:** https://ui-svelte.sappsdev.com/llm/starter/ico