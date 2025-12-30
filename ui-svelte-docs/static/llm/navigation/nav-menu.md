# NavMenu Component

Horizontal navigation with links, submenus, and megamenus.

## Import

```svelte
import {NavMenu} from 'ui-svelte';
```

## Props

| Prop      | Type                                                                                  | Default   | Description        |
| --------- | ------------------------------------------------------------------------------------- | --------- | ------------------ |
| `items`   | `NavMenuItem[]`                                                                       | `[]`      | Menu items         |
| `size`    | `'sm' \| 'md' \| 'lg'`                                                                | `'md'`    | Size               |
| `color`   | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'muted'` | Color theme        |
| `variant` | `'solid' \| 'soft' \| 'ghost'`                                                        | `'ghost'` | Visual style       |
| `class`   | `string`                                                                              | -         | Additional classes |

## NavMenuItem Type

```ts
interface NavMenuItem {
	label: string;
	href?: string;
	onclick?: (item: NavMenuItem) => void;
	description?: string;
	icon?: IconData;
	type?: 'item' | 'submenu' | 'megamenu';
	subitems?: NavMenuSubItem[];
	megamenu?: Snippet;
}

interface NavMenuSubItem {
	label: string;
	href?: string;
	onclick?: (item: NavMenuSubItem) => void;
	description?: string;
	icon?: IconData;
}
```

## Patterns

### Simple Links

```svelte
<script lang="ts">
	import { NavMenu } from 'ui-svelte';
	import { HomeLinearIcon, SettingsLinearIcon } from '$lib/icons';

	const items = [
		{ label: 'Home', href: '/home', icon: HomeLinearIcon },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/contact' }
	];
</script>

<NavMenu {items} />
```

### With Submenu

```svelte
const items = [
  { label: 'Home', href: '/home' },
  {
    label: 'Products',
    type: 'submenu',
    icon: FolderLinearIcon,
    subitems: [
      { label: 'All Products', description: 'Browse catalog', href: '/products' },
      { label: 'Categories', href: '/categories' }
    ]
  },
  { label: 'Contact', href: '/contact' }
];

<NavMenu {items} color="primary" />
```

### With Megamenu

```svelte
{#snippet megamenuContent()}
	<div class="grid-3 gap-6 p-4">
		<div>
			<div class="navmenu-header">Documentation</div>
			<a href="/docs" class="navmenu-submenu-item">
				<div class="navmenu-submenu-content">
					<div class="navmenu-submenu-label">Getting Started</div>
					<div class="navmenu-submenu-description">Quick start guide</div>
				</div>
			</a>
		</div>
	</div>
{/snippet}

<NavMenu items={[{ label: 'Resources', type: 'megamenu', megamenu: megamenuContent }]} />
```

## Megamenu CSS Classes

- `.navmenu-header` - Section header
- `.navmenu-submenu-item` - Menu item
- `.navmenu-submenu-content` - Content wrapper
- `.navmenu-submenu-label` - Item label
- `.navmenu-submenu-description` - Item description
- `.navmenu-divider` - Horizontal divider

## Notes

- Use `type: 'submenu'` for dropdown menus
- Use `type: 'megamenu'` with Snippet for custom layouts
- Active state matches current URL automatically
