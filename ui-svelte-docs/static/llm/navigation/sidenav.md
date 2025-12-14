## SideNav Component

Vertical sidebar navigation for applications with headers, dividers, and collapsible submenus.

```svelte
<SideNav
  items={[]}
  size="md"
  isSolid={false}
  variant="muted"
  isWide={false}
  isCompact={false}
  isCollapsible={false}
  class=""
/>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `items` | `[]` | Array of SideNavItem objects (required) |
| `size` | `'md'` | `sm` `md` `lg` |
| `isSolid` | `false` | When true, uses solid background for active states |
| `variant` | `'muted'` | `primary` `secondary` `muted` `success` `info` `warning` `danger` |
| `isWide` | `false` | Full width items |
| `isCompact` | `false` | Reduced spacing |
| `isCollapsible` | `false` | Collapse on hover |
| `class` | - | Custom CSS classes |

### SideNavItem Type

| Prop | Type | Description |
|------|------|-------------|
| `type` | `'item' \| 'header' \| 'divider' \| 'submenu'` | Item type (default: item) |
| `label` | `string` | Display text |
| `href` | `string` | Link destination |
| `icon` | `IconData` | Icon to display |
| `description` | `string` | Secondary text |
| `status` | `string \| Snippet` | Status badge |
| `subitems` | `SideNavSubItem[]` | Submenu items |
| `open` | `boolean` | Submenu initially open |

### Item Types

- **item** - Standard navigation link (default)
- **header** - Section header with optional icon
- **divider** - Horizontal separator line
- **submenu** - Collapsible group with subitems

### Examples

```svelte
<script lang="ts">
  import { SideNav } from 'ui-svelte';
  import { DashboardIcon, SettingsIcon } from '$lib/icons';

  const items = [
    { type: 'header', label: 'Main' },
    { label: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
    { label: 'Settings', href: '/settings', icon: SettingsIcon },
    { type: 'divider' },
    {
      type: 'submenu',
      label: 'Documents',
      subitems: [
        { label: 'All Files', href: '/docs' },
        { label: 'Recent', href: '/docs/recent' }
      ],
      open: true
    }
  ];
</script>

<SideNav {items} />

<!-- Wide items -->
<SideNav {items} isWide />

<!-- Solid style with variant -->
<SideNav {items} isSolid variant="primary" />

<!-- Collapsible sidebar -->
<SideNav {items} isCollapsible />
```

**For LLMs**: SideNav creates vertical navigation. Use `items` array with `type` to define structure (header, item, divider, submenu). Set `isWide` for full width items. Use `isSolid` with `variant` for button-like active states. Use `isCollapsible` for expandable sidebars.
