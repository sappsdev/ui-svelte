## Dropdown Component

Menu of options triggered by a button or element.

```svelte
<Dropdown
  options={options}
  variant="primary"
  header={headerSnippet}
  footer={footerSnippet}
>
  <Button>Open Menu</Button>
</Dropdown>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `options` | `[]` | Array of Option objects (required) |
| `children` | - | Trigger element snippet (required) |
| `variant` | `'primary'` | `primary` `secondary` `muted` |
| `header` | - | Header snippet |
| `footer` | - | Footer snippet |

### Option Type

```typescript
type Option = {
  id?: string | number;
  label: string;              // Required
  description?: string;
  icon?: IconName;
  src?: string;               // Avatar image
  href?: string;              // Renders as link
  onclick?: (option: Option) => void;
}
```

### Common Patterns

```svelte
<script>
  import { Dropdown, Button } from 'ui-svelte';
  
  const options = [
    { id: '1', label: 'Profile', icon: 'User' },
    { id: '2', label: 'Settings', icon: 'Settings' },
    { id: '3', label: 'Logout', icon: 'LogOut' }
  ];
</script>

<!-- Basic -->
<Dropdown options={options}>
  <Button>Open Menu</Button>
</Dropdown>

<!-- With Description -->
<script>
  const options = [
    { id: '1', label: 'Profile', description: 'View your profile' },
    { id: '2', label: 'Settings', description: 'Manage preferences' }
  ];
</script>
<Dropdown options={options}>
  <Button>Open Menu</Button>
</Dropdown>

<!-- With Avatar -->
<script>
  const users = [
    { id: '1', label: 'John', src: '/avatar-1.jpg' },
    { id: '2', label: 'Jane', src: '/avatar-2.jpg' }
  ];
</script>
<Dropdown options={users}>
  <Button>Select User</Button>
</Dropdown>

<!-- With Links -->
<script>
  const navOptions = [
    { id: '1', label: 'Home', href: '/' },
    { id: '2', label: 'About', href: '/about' }
  ];
</script>
<Dropdown options={navOptions}>
  <Button>Navigate</Button>
</Dropdown>

<!-- With Header and Footer -->
<Dropdown options={options}>
  {#snippet header()}
    <div class="px-4 py-2 border-b">
      <p class="font-semibold">Account</p>
      <p class="text-sm text-muted-foreground">user@example.com</p>
    </div>
  {/snippet}
  
  <Button>Open Menu</Button>
  
  {#snippet footer()}
    <div class="px-4 py-2 border-t">
      <p class="text-xs text-muted-foreground">Version 1.0.0</p>
    </div>
  {/snippet}
</Dropdown>

<!-- With Click Handler -->
<script>
  const options = [
    { 
      id: '1', 
      label: 'Delete', 
      onclick: (opt) => console.log('Delete clicked', opt) 
    }
  ];
</script>
<Dropdown options={options}>
  <Button>Actions</Button>
</Dropdown>
```

**For LLMs**: Dropdown for menus. Requires `options` array and trigger element in `children` snippet. Options support icons OR avatars (not both). Use `href` for navigation links, `onclick` for actions. Use `header`/`footer` snippets for context. Better than Select for actions/navigation menus.
