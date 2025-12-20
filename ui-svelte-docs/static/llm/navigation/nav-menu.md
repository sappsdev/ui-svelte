# NavMenu Component

Horizontal navigation menu with links, submenus, and megamenu support.

## Import

```svelte
import { NavMenu, type NavMenuItem } from 'ui-svelte';
```

## Props

| Prop      | Type                                                                                  | Default   | Description  |
| --------- | ------------------------------------------------------------------------------------- | --------- | ------------ |
| `items`   | `NavMenuItem[]`                                                                       | `[]`      | Menu items   |
| `size`    | `'sm' \| 'md' \| 'lg'`                                                                | `'md'`    | Item size    |
| `variant` | `'solid' \| 'soft' \| 'ghost'`                                                        | `'ghost'` | Visual style |
| `color`   | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'muted'` | Color theme  |

## NavMenuItem Type

| Prop          | Type                                | Description                                      |
| ------------- | ----------------------------------- | ------------------------------------------------ |
| `label`       | `string`                            | Display text (required)                          |
| `href`        | `string`                            | Link URL                                         |
| `onclick`     | `(item) => void`                    | Click handler                                    |
| `icon`        | `IconData`                          | Icon component                                   |
| `description` | `string`                            | Secondary text                                   |
| `type`        | `'item' \| 'submenu' \| 'megamenu'` | Menu type (default: `'item'`)                    |
| `subitems`    | `NavMenuSubItem[]`                  | Dropdown items (for `type: 'submenu'`)           |
| `megamenu`    | `Snippet`                           | Custom megamenu content (for `type: 'megamenu'`) |

## Patterns

### Basic Navigation

```svelte
<script>
	const items: NavMenuItem[] = [
		{ label: 'Home', href: '/home', icon: HomeIcon },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/contact' }
	];
</script>

<NavMenu {items} />
```

### With Submenu Dropdown

```svelte
<NavMenu
	items={[
		{ label: 'Home', href: '/home' },
		{
			label: 'Products',
			type: 'submenu',
			icon: FolderIcon,
			subitems: [
				{ label: 'All Products', description: 'Browse catalog', href: '/products' },
				{ label: 'Categories', href: '/categories' }
			]
		}
	]}
/>
```

### With Megamenu

```svelte
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

<NavMenu items={[{ label: 'Resources', type: 'megamenu', megamenu: megamenuContent }]} />
```

### Styled Variants

```svelte
<NavMenu color="primary" variant="soft" {items} />
<NavMenu color="success" variant="solid" {items} />
```

## Megamenu CSS Classes

- `.navmenu-header` - Section header
- `.navmenu-submenu-item` - Individual item
- `.navmenu-submenu-content` - Content wrapper
- `.navmenu-submenu-label` - Item label
- `.navmenu-submenu-description` - Item description
- `.navmenu-divider` - Horizontal divider

## Notes

- Items with `href` render as links; items with `onclick` render as buttons
- Submenus appear as dropdowns on hover
- Megamenus use Svelte snippets for custom content
- Active state auto-detected from current URL path

## Component References

- **@see icons.md** - Icon usage
