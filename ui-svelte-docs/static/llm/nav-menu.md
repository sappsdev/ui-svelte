## NavMenu Component

Horizontal navigation menu for AppBars and landing pages with dropdown submenus and megamenus.

```svelte
<NavMenu
  items={items}
  variant="primary"
  size="md"
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `items` | `[]` | Array of menu items (required) |
| `variant` | `'primary'` | `primary` `secondary` `muted` |
| `size` | `'md'` | `sm` `md` `lg` |
| `class` | - | Custom CSS classes |

### MenuItem Type

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Menu item label (required) |
| `description` | `string` | Optional description |
| `icon` | `IconName` | Optional icon |
| `href` | `string` | Link URL |
| `onclick` | `(item) => void` | Click handler |
| `type` | `'item' \| 'submenu' \| 'megamenu'` | Menu type |
| `subitems` | `SubmenuItem[]` | For submenu type |
| `megamenu` | `Snippet` | For megamenu type |

### SubmenuItem Type

| Prop | Type | Required |
|------|------|----------|
| `label` | `string` | Yes |
| `description` | `string` | No |
| `icon` | `IconName` | No |
| `href` | `string` | No |
| `onclick` | `(item) => void` | No |

### Common Patterns

```svelte
<!-- Basic Menu -->
<script>
  const items = [
    { label: 'Home', icon: 'fluent:home-24-regular', href: '/' },
    { label: 'About', icon: 'fluent:info-24-regular', href: '/about' },
    { label: 'Contact', icon: 'fluent:mail-24-regular', href: '/contact' }
  ];
</script>

<NavMenu {items} />

<!-- With Simple Submenu -->
<script>
  const items = [
    { label: 'Home', href: '/' },
    {
      label: 'Products',
      type: 'submenu',
      icon: 'fluent:box-24-regular',
      subitems: [
        { 
          label: 'All Products', 
          icon: 'fluent:grid-24-regular',
          description: 'Browse our catalog',
          href: '/products' 
        },
        { 
          label: 'New Arrivals', 
          icon: 'fluent:star-24-regular',
          description: 'Latest additions',
          href: '/products/new' 
        }
      ]
    },
    { label: 'Contact', href: '/contact' }
  ];
</script>

<NavMenu {items} />

<!-- With Megamenu -->
<script>
  const items = [
    { label: 'Home', href: '/' },
    {
      label: 'Resources',
      type: 'megamenu',
      icon: 'fluent:book-24-regular',
      megamenu: megamenuContent
    }
  ];
</script>

{#snippet megamenuContent()}
  <div class="grid grid-cols-3 gap-6 p-4 min-w-[600px]">
    <div>
      <div class="navmenu-header">Documentation</div>
      <div class="flex flex-col gap-1">
        <a href="/docs" class="navmenu-submenu-item">
          <div class="navmenu-submenu-content">
            <div class="navmenu-submenu-label">Getting Started</div>
            <div class="navmenu-submenu-description">Quick start guide</div>
          </div>
        </a>
      </div>
    </div>
    <!-- More columns -->
  </div>
{/snippet}

<NavMenu {items} />

<!-- Different Variants -->
<NavMenu {items} variant="secondary" />
<NavMenu {items} variant="muted" size="lg" />
```

**For LLMs**: NavMenu creates horizontal navigation with 3 menu types: **item** (simple link), **submenu** (dropdown list with optional descriptions), **megamenu** (custom content via Snippet). Auto-detects active state from current route. Supports icons and descriptions. Megamenus use CSS classes: `.navmenu-header`, `.navmenu-submenu-item`, `.navmenu-submenu-content`, `.navmenu-submenu-label`, `.navmenu-submenu-description`. Ideal for AppBars, landing pages, e-commerce navigation.

---

## Quick Hierarchy Reference
```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (NavMenu, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
