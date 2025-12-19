# Modal Component

Overlays that require users to interact before continuing with the application.

## Basic Usage

```svelte
<script>
  import { Modal, Button } from 'ui-svelte';
  
  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Modal</Button>

<Modal bind:open>
  <p class="body-md">Modal content goes here.</p>
</Modal>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls modal visibility (use bind:open) |
| `children` | `Snippet` | - | Main modal content |
| `header` | `Snippet` | - | Optional header section |
| `footer` | `Snippet` | - | Optional footer section |
| `onclose` | `() => void` | - | Callback when modal closes |
| `color` | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Modal color theme |
| `variant` | `'solid' \| 'soft'` | `'solid'` | Visual style variant |
| `disableOverlayClose` | `boolean` | `false` | Prevent closing by clicking overlay |
| `hideCloseButton` | `boolean` | `false` | Hide the close button |
| `rootClass` | `string` | - | Additional classes for modal wrapper |
| `headerClass` | `string` | - | Additional classes for header |
| `contentClass` | `string` | - | Additional classes for content |
| `footerClass` | `string` | - | Additional classes for footer |

## Common Patterns

### With Header & Footer
```svelte
<script>
  import { Modal, Button } from 'ui-svelte';
  
  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Modal</Button>

<Modal bind:open>
  {#snippet header()}
    <h4 class="card-title">Confirm Action</h4>
  {/snippet}
  
  <p class="card-description">Are you sure you want to continue?</p>
  
  {#snippet footer()}
    <div class="flex justify-end gap-2">
      <Button variant="ghost" onclick={() => (open = false)}>
        Cancel
      </Button>
      <Button color="primary" onclick={() => (open = false)}>
        Confirm
      </Button>
    </div>
  {/snippet}
</Modal>
```

### Confirmation Dialog
```svelte
<script>
  import { Modal, Button } from 'ui-svelte';
  
  let deleteOpen = $state(false);
  
  function handleDelete() {
    console.log('Item deleted');
    deleteOpen = false;
  }
</script>

<Button color="danger" onclick={() => (deleteOpen = true)}>
  Delete Item
</Button>

<Modal bind:open={deleteOpen} color="danger">
  {#snippet header()}
    <h4 class="card-title">Delete Item?</h4>
  {/snippet}
  
  <p class="card-description">
    This action cannot be undone. Are you sure?
  </p>
  
  {#snippet footer()}
    <div class="flex justify-end gap-2">
      <Button variant="ghost" onclick={() => (deleteOpen = false)}>
        Cancel
      </Button>
      <Button color="danger" onclick={handleDelete}>
        Delete
      </Button>
    </div>
  {/snippet}
</Modal>
```

### Form Modal
```svelte
<script>
  import { Modal, Button, Input } from 'ui-svelte';
  
  let formOpen = $state(false);
  let name = $state('');
  let email = $state('');
  
  function handleSubmit() {
    console.log({ name, email });
    formOpen = false;
  }
</script>

<Button onclick={() => (formOpen = true)}>Add User</Button>

<Modal bind:open={formOpen} color="primary">
  {#snippet header()}
    <h4 class="card-title">Add New User</h4>
  {/snippet}
  
  <form onsubmit|preventDefault={handleSubmit}>
    <div class="column gap-4">
      <Input label="Name" type="text" bind:value={name} />
      <Input label="Email" type="email" bind:value={email} />
    </div>
  </form>
  
  {#snippet footer()}
    <div class="flex justify-end gap-2">
      <Button variant="ghost" onclick={() => (formOpen = false)}>
        Cancel
      </Button>
      <Button color="primary" onclick={handleSubmit}>
        Add User
      </Button>
    </div>
  {/snippet}
</Modal>
```

### Success/Info Modals
```svelte
<script>
  import { Modal, Button } from 'ui-svelte';
  
  let successOpen = $state(false);
  let infoOpen = $state(false);
</script>

<!-- Success Modal -->
<Modal bind:open={successOpen} color="success">
  {#snippet header()}
    <h4 class="card-title">Success!</h4>
  {/snippet}
  
  <p class="card-description">Your changes have been saved.</p>
  
  {#snippet footer()}
    <Button color="success" onclick={() => (successOpen = false)}>
      OK
    </Button>
  {/snippet}
</Modal>

<!-- Info Modal -->
<Modal bind:open={infoOpen} color="info">
  {#snippet header()}
    <h4 class="card-title">Information</h4>
  {/snippet}
  
  <p class="card-description">Here's some important information.</p>
  
  {#snippet footer()}
    <Button color="info" onclick={() => (infoOpen = false)}>
      Got it
    </Button>
  {/snippet}
</Modal>
```

### Prevent Close on Overlay
```svelte
<script>
  import { Modal, Button } from 'ui-svelte';
  
  let open = $state(false);
</script>

<Modal bind:open disableOverlayClose>
  {#snippet header()}
    <h4 class="card-title">Required Action</h4>
  {/snippet}
  
  <p class="card-description">
    You must complete this action before continuing.
  </p>
  
  {#snippet footer()}
    <Button color="primary" onclick={() => (open = false)}>
      Complete
    </Button>
  {/snippet}
</Modal>
```

### Without Close Button
```svelte
<script>
  import { Modal, Button } from 'ui-svelte';
  
  let open = $state(false);
</script>

<Modal bind:open hideCloseButton>
  <p class="card-description">This modal has no close button.</p>
  
  {#snippet footer()}
    <Button onclick={() => (open = false)}>Close</Button>
  {/snippet}
</Modal>
```

### Colors & Variants
```svelte
<!-- Primary Solid -->
<Modal open color="primary" variant="solid">
  <p class="card-description">Primary solid modal</p>
</Modal>

<!-- Success Soft -->
<Modal open color="success" variant="soft">
  <p class="card-description">Success soft modal</p>
</Modal>

<!-- Danger Solid -->
<Modal open color="danger" variant="solid">
  <p class="card-description">Danger solid modal</p>
</Modal>

<!-- Surface Soft -->
<Modal open color="surface" variant="soft">
  <p class="card-description">Surface soft modal</p>
</Modal>
```

### Complete Example
```svelte
<script>
  import { Section, Card, Modal, Button, Input } from 'ui-svelte';
  
  let editOpen = $state(false);
  let deleteOpen = $state(false);
  let user = $state({ name: 'John Doe', email: 'john@example.com' });
  
  function handleSave() {
    console.log('Saved:', user);
    editOpen = false;
  }
  
  function handleDelete() {
    console.log('Deleted user');
    deleteOpen = false;
  }
</script>

<Section isBoxed>
  <Card>
    <h2 class="card-title">User Profile</h2>
    <p class="card-description">{user.name} - {user.email}</p>
    
    <div class="flex gap-2">
      <Button onclick={() => (editOpen = true)}>Edit</Button>
      <Button color="danger" variant="ghost" onclick={() => (deleteOpen = true)}>
        Delete
      </Button>
    </div>
  </Card>
</Section>

<!-- Edit Modal -->
<Modal bind:open={editOpen} color="primary">
  {#snippet header()}
    <h4 class="card-title">Edit User</h4>
  {/snippet}
  
  <div class="column gap-4">
    <Input label="Name" bind:value={user.name} />
    <Input label="Email" bind:value={user.email} />
  </div>
  
  {#snippet footer()}
    <div class="flex justify-end gap-2">
      <Button variant="ghost" onclick={() => (editOpen = false)}>
        Cancel
      </Button>
      <Button color="primary" onclick={handleSave}>
        Save Changes
      </Button>
    </div>
  {/snippet}
</Modal>

<!-- Delete Confirmation -->
<Modal bind:open={deleteOpen} color="danger">
  {#snippet header()}
    <h4 class="card-title">Delete User?</h4>
  {/snippet}
  
  <p class="card-description">
    Are you sure you want to delete {user.name}? This action cannot be undone.
  </p>
  
  {#snippet footer()}
    <div class="flex justify-end gap-2">
      <Button variant="ghost" onclick={() => (deleteOpen = false)}>
        Cancel
      </Button>
      <Button color="danger" onclick={handleDelete}>
        Delete
      </Button>
    </div>
  {/snippet}
</Modal>
```

## Best Practices

1. **Always use bind:open for state management**
   ```svelte
   <!-- ✅ Correct -->
   <Modal bind:open>Content</Modal>
   
   <!-- ❌ Incorrect -->
   <Modal open={isOpen}>Content</Modal>
   ```

2. **Use typography classes for content**
   ```svelte
   <Modal bind:open>
     {#snippet header()}
       <h4 class="card-title">Title</h4>
     {/snippet}
     
     <p class="card-description">Description</p>
   </Modal>
   ```

3. **Provide clear actions in footer**
   ```svelte
   {#snippet footer()}
     <div class="flex justify-end gap-2">
       <Button variant="ghost" onclick={cancel}>Cancel</Button>
       <Button color="primary" onclick={confirm}>Confirm</Button>
     </div>
   {/snippet}
   ```

4. **Match button colors to modal theme**
   ```svelte
   <Modal color="danger">
     {#snippet footer()}
       <Button variant="ghost">Cancel</Button>
       <Button color="danger">Delete</Button>
     {/snippet}
   </Modal>
   ```

5. **Use disableOverlayClose for critical actions**
   ```svelte
   <Modal bind:open disableOverlayClose>
     <p>You must complete this action.</p>
   </Modal>
   ```

6. **Close modal after actions complete**
   ```svelte
   function handleSave() {
     // Perform action
     saveData();
     // Then close
     open = false;
   }
   ```

## Related Documentation

- **Typography:** https://ui-svelte.sappsdev.com/llm/starter/typography.md
- **Page Structure:** https://ui-svelte.sappsdev.com/llm/layout/page.md
- **Card Component:** https://ui-svelte.sappsdev.com/llm/display/card.md
- **Button Component:** https://ui-svelte.sappsdev.com/llm/control/button.md
- **Input Component:** https://ui-svelte.sappsdev.com/llm/form/input.md

## Notes

- **Always use typography classes** for modal content (card-title, card-description)
- Use `bind:open` for two-way binding of modal state
- Modal automatically handles backdrop and focus management
- Pressing Escape key closes modal by default (unless disableOverlayClose is true)
- Use appropriate colors for different modal types (danger for delete, success for confirmation)
- Footer typically contains action buttons aligned to the right
- Header snippet is optional but recommended for clarity
- Modal centers on screen with responsive sizing
- Use `disableOverlayClose` for modals requiring explicit user action