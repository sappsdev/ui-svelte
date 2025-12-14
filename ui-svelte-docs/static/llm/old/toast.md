## Toast Component

Lightweight notification that auto-dismisses.

```svelte
<script>
  import { toast } from 'ui-svelte';
  
  toast.show({
    description: 'This is a toast notification',
    title: 'Success',
    status: 'success',
    duration: 3000,
    position: 'bottom-right',
    icon: 'CheckCircle',
    isSolid: false,
    id: 'custom-id'
  });
</script>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `description` | - | Message text (required) |
| `title` | - | Optional title |
| `status` | `'info'` | `success` `danger` `info` `warning` |
| `duration` | `0` | Auto-dismiss time in ms (0 = manual) |
| `position` | `'bottom-right'` | `top-left` `top-right` `bottom-left` `bottom-right` |
| `icon` | - | Icon name |
| `isSolid` | `false` | Solid background |
| `id` | auto | Custom ID |

### Common Patterns

```svelte
<script>
  import { toast } from 'ui-svelte';
</script>

<!-- Basic -->
<Button onclick={() => toast.show({ description: 'Action completed' })}>
  Show Toast
</Button>

<!-- Success Toast -->
<Button onclick={() => toast.show({
  title: 'Success',
  description: 'Item saved successfully',
  status: 'success',
  duration: 3000
})}>
  Save
</Button>

<!-- Error Toast -->
<Button onclick={() => toast.show({
  title: 'Error',
  description: 'Failed to save item',
  status: 'danger',
  duration: 5000
})}>
  Show Error
</Button>

<!-- Warning Toast -->
<Button onclick={() => toast.show({
  title: 'Warning',
  description: 'This action cannot be undone',
  status: 'warning',
  duration: 4000
})}>
  Show Warning
</Button>

<!-- Info Toast -->
<Button onclick={() => toast.show({
  description: 'New updates available',
  status: 'info',
  duration: 3000
})}>
  Show Info
</Button>

<!-- Manual Dismiss -->
<Button onclick={() => toast.show({
  description: 'Click X to dismiss',
  duration: 0
})}>
  Manual Toast
</Button>

<!-- With Icon -->
<Button onclick={() => toast.show({
  description: 'Task completed',
  icon: 'CheckCircle',
  status: 'success'
})}>
  With Icon
</Button>

<!-- Custom Position -->
<Button onclick={() => toast.show({
  description: 'Top left notification',
  position: 'top-left'
})}>
  Top Left
</Button>

<!-- Solid Background -->
<Button onclick={() => toast.show({
  description: 'Solid toast',
  isSolid: true
})}>
  Solid Toast
</Button>
```

### Toast API

```typescript
// Show toast
toast.show(options);

// Dismiss specific toast
toast.dismiss(id);

// Dismiss all toasts
toast.dismissAll();
```

**For LLMs**: Toast for brief notifications. Use `toast.show()` to display. `description` is required. Set `duration` in ms for auto-dismiss (0 for manual). Use `status` for visual feedback (success/danger/info/warning). Position with `position` prop. Use `toast.dismiss(id)` or `toast.dismissAll()` to programmatically close.
