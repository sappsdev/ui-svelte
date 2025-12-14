## NavMenu Component

Horizontal navigation menu with links, submenus, and megamenu support.

```svelte
<NavMenu
  items={[]}
  size="md"
  isSolid={false}
  variant="muted"
  class=""
/>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `items` | `[]` | Array of MenuItem objects (required) |
| `size` | `'md'` | `sm` `md` `lg` |
| `isSolid` | `false` | When true, uses solid/filled background for active states |
| `variant` | `'muted'` | `primary` `secondary` `muted` `success` `info` `warning` `danger` |
| `class` | - | Custom CSS classes |

### MenuItem Type

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Display text (required) |
| `href` | `string` | Link destination |
| `onclick` | `function` | Click handler |
| `subitems` | `SubmenuItem[]` | Dropdown items (for submenu type) |
| `megamenu` | `Snippet` | Custom megamenu content |
| `type` | `'item' \| 'submenu' \| 'megamenu'` | Menu item type |

### SubmenuItem Type

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Display text (required) |
| `description` | `string` | Secondary text |
| `href` | `string` | Link destination |
| `onclick` | `function` | Click handler |

### Menu Types

- **item** - Standard navigation link
- **submenu** - Dropdown with list of items (uses `subitems`)
- **megamenu** - Large dropdown with custom Snippet content

### Examples

```svelte
<!-- Basic Navigation -->
<script lang="ts">
  const items = [
    { label: 'Home', href: '/home' },
    { label: 'About', href: '/about' }
  ];
</script>

<NavMenu {items} />

<!-- With Submenu -->
<script lang="ts">
  const items = [
    { label: 'Home', href: '/home' },
    {
      label: 'Products',
      type: 'submenu',
      subitems: [
        { label: 'Category A', description: 'Browse A', href: '/a' },
        { label: 'Category B', href: '/b' }
      ]
    }
  ];
</script>

<NavMenu {items} />

<!-- Megamenu with Snippet -->
{#snippet megamenuContent()}
  <div class="grid-3 gap-6 p-4">
    <div>
      <div class="navmenu-header">Section</div>
      <a href="/link" class="navmenu-submenu-item">
        <div class="navmenu-submenu-content">
          <div class="navmenu-submenu-label">Label</div>
          <div class="navmenu-submenu-description">Description</div>
        </div>
      </a>
    </div>
  </div>
{/snippet}

<script lang="ts">
  const items = [
    { label: 'Resources', type: 'megamenu', megamenu: megamenuContent }
  ];
</script>

<NavMenu {items} />

<!-- Solid Style with Variant -->
<NavMenu {items} isSolid variant="primary" />
```

### CSS Classes for Megamenus

- `.navmenu-header` - Section header
- `.navmenu-submenu-item` - Menu item
- `.navmenu-submenu-content` - Content wrapper
- `.navmenu-submenu-label` - Item label
- `.navmenu-submenu-description` - Item description
- `.navmenu-divider` - Horizontal divider

**For LLMs**: NavMenu creates horizontal navigation. Use `items` array with `label`, optional `href`. For dropdowns, set `type: 'submenu'` with `subitems`. For rich content, set `type: 'megamenu'` with a Snippet. Use `isSolid` with `variant` for button-like active states.
