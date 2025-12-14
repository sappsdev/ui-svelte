## BottomNav Component

Mobile-friendly bottom navigation bar for primary app destinations.

```svelte
<BottomNav
  items={[]}
  variant="primary"
  size="md"
  isSolid={false}
  isBlock={false}
  class=""
/>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `items` | `[]` | Array of BottomNavItem objects (required) |
| `variant` | `'primary'` | `primary` `secondary` `ghost` `line` |
| `size` | `'md'` | `sm` `md` `lg` |
| `isSolid` | `false` | Adds background pill on active item |
| `isBlock` | `false` | Renders inline (non-fixed) for custom layouts |
| `class` | - | Custom CSS classes |

### BottomNavItem Type

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier (required) |
| `label` | `string` | Display text (optional, omit for icon-only) |
| `icon` | `IconData` | Icon to display (required) |
| `href` | `string` | Link destination |
| `onclick` | `function` | Click handler |
| `badge` | `string \| number` | Notification badge |
| `isFab` | `boolean` | Floating action button style |
| `isActive` | `boolean` | Manual active state override |

### Variants

- **primary** - Primary color for active state
- **secondary** - Secondary color for active state
- **ghost** - Subtle text weight change only
- **line** - Underline indicator on active item

### Examples

```svelte
<!-- Basic Navigation -->
<script lang="ts">
  import { BottomNav } from 'ui-svelte';
  import { HomeIcon, SearchIcon, HeartIcon, PersonIcon } from '$lib/icons';

  const items = [
    { id: 'home', label: 'Home', icon: HomeIcon, href: '/' },
    { id: 'search', label: 'Search', icon: SearchIcon, href: '/search' },
    { id: 'favorites', label: 'Favorites', icon: HeartIcon, href: '/favorites' },
    { id: 'profile', label: 'Profile', icon: PersonIcon, href: '/profile' }
  ];
</script>

<BottomNav {items} />

<!-- With Badge -->
<script lang="ts">
  const items = [
    { id: 'home', label: 'Home', icon: HomeIcon, href: '/' },
    { id: 'cart', label: 'Cart', icon: CartIcon, href: '/cart', badge: 3 }
  ];
</script>

<BottomNav {items} />

<!-- With FAB (Floating Action Button) -->
<script lang="ts">
  const items = [
    { id: 'home', label: 'Home', icon: HomeIcon, href: '/' },
    { id: 'add', icon: AddIcon, isFab: true, onclick: () => openModal() },
    { id: 'profile', label: 'Profile', icon: PersonIcon, href: '/profile' }
  ];
</script>

<BottomNav {items} />

<!-- Solid Style -->
<BottomNav {items} isSolid />
<BottomNav {items} variant="secondary" isSolid />

<!-- Line Variant -->
<BottomNav {items} variant="line" />

<!-- Icon Only (omit label) -->
<script lang="ts">
  const items = [
    { id: 'home', icon: HomeIcon, href: '/' },
    { id: 'search', icon: SearchIcon, href: '/search' }
  ];
</script>

<BottomNav {items} />
```

**For LLMs**: BottomNav creates fixed bottom navigation. Use `items` array with `id`, `icon`, optional `label` and `href`. Use `isFab: true` for elevated center buttons. Use `badge` for notifications. Set `isSolid` for background pill on active. Use `variant="line"` for underline indicator.
