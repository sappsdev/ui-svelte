## SideNav Component

Vertical side navigation for application navigation with collapsible submenus.

```svelte
<SideNav
  items={items}
  variant="primary"
  size="md"
  isWide={false}
  isCompact={false}
  isCollapsible={false}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `items` | `[]` | Array of nav items (required) |
| `variant` | `'primary'` | `primary` `secondary` `muted` |
| `size` | `'md'` | `sm` `md` `lg` |
| `isWide` | `false` | Full width of container |
| `isCompact` | `false` | Reduced padding |
| `isCollapsible` | `false` | Hover-to-expand (64px → 256px) |
| `class` | - | Custom CSS classes |

### NavItem Type

| Prop | Type | Description |
|------|------|-------------|
| `type` | `'item' \| 'divider' \| 'header' \| 'submenu'` | Item type |
| `label` | `string` | Item label |
| `description` | `string` | Optional description |
| `icon` | `IconName` | Optional icon |
| `href` | `string` | Link URL |
| `onclick` | `(item) => void` | Click handler |
| `status` | `string \| Snippet` | Status badge |
| `subitems` | `SubmenuItem[]` | For submenu type |
| `open` | `boolean` | Submenu initially open |

### SubmenuItem Type

| Prop | Type | Required |
|------|------|----------|
| `label` | `string` | Yes |
| `href` | `string` | No |
| `onclick` | `(item) => void` | No |
| `icon` | `IconName` | No |
| `description` | `string` | No |
| `status` | `string \| Snippet` | No |

### Common Patterns

```svelte
<!-- Basic SideNav -->
<script>
  const items = [
    { 
      label: 'Dashboard', 
      icon: 'fluent:home-24-regular', 
      href: '/dashboard' 
    },
    { 
      label: 'Projects', 
      icon: 'fluent:folder-24-regular', 
      href: '/projects' 
    },
    { 
      label: 'Team', 
      icon: 'fluent:people-24-regular', 
      href: '/team' 
    }
  ];
</script>

<SideNav {items} />

<!-- With Headers and Dividers -->
<script>
  const items = [
    { 
      type: 'header', 
      label: 'Navigation',
      icon: 'fluent:navigation-24-regular'
    },
    { label: 'Dashboard', icon: 'fluent:home-24-regular', href: '/dashboard' },
    { label: 'Projects', icon: 'fluent:folder-24-regular', href: '/projects' },
    { type: 'divider' },
    { label: 'Team', icon: 'fluent:people-24-regular', href: '/team' }
  ];
</script>

<SideNav {items} />

<!-- With Submenu -->
<script>
  const items = [
    { label: 'Dashboard', icon: 'fluent:home-24-regular', href: '/dashboard' },
    {
      type: 'submenu',
      label: 'Settings',
      icon: 'fluent:settings-24-regular',
      open: true,
      subitems: [
        { 
          label: 'Profile', 
          icon: 'fluent:person-24-regular',
          href: '/settings/profile' 
        },
        { 
          label: 'Security', 
          icon: 'fluent:shield-24-regular',
          href: '/settings/security',
          status: '!'
        },
        { 
          label: 'Notifications', 
          icon: 'fluent:alert-24-regular',
          href: '/settings/notifications' 
        }
      ]
    }
  ];
</script>

<SideNav {items} />

<!-- With Status Badges -->
<script>
  const items = [
    { 
      label: 'Dashboard', 
      icon: 'fluent:home-24-regular', 
      href: '/dashboard',
      status: '3'
    },
    { 
      label: 'Projects', 
      icon: 'fluent:folder-24-regular', 
      href: '/projects',
      status: 'New'
    }
  ];
</script>

<SideNav {items} />

<!-- Collapsible Sidebar -->
<SideNav {items} isCollapsible />

<!-- Compact Layout -->
<SideNav {items} isCompact />

<!-- Wide Layout -->
<SideNav {items} isWide />
```

**For LLMs**: SideNav creates vertical navigation with 4 item types: **item** (standard link), **divider** (separator), **header** (section label), **submenu** (collapsible group). Auto-detects active state from route. Supports icons, descriptions, and status badges. `isCollapsible` creates hover-to-expand sidebar (64px collapsed, 256px expanded). `isCompact` reduces padding. `isWide` takes full container width. Use for app sidebars, dashboards, admin panels.

---

## Quick Hierarchy Reference
```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (SideNav, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
