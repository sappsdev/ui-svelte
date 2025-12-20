# SideNav Component

Vertical navigation for sidebars with headers, dividers, submenus, and collapsible behavior.

## Import

```svelte
import { SideNav, type SideNavItem } from 'ui-svelte';
```

## Props

| Prop            | Type                                                                                  | Default   | Description                                |
| --------------- | ------------------------------------------------------------------------------------- | --------- | ------------------------------------------ |
| `items`         | `SideNavItem[]`                                                                       | `[]`      | Navigation items                           |
| `size`          | `'sm' \| 'md' \| 'lg'`                                                                | `'md'`    | Item size                                  |
| `variant`       | `'solid' \| 'soft' \| 'ghost'`                                                        | `'ghost'` | Visual style                               |
| `color`         | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'muted'` | Color theme                                |
| `isWide`        | `boolean`                                                                             | `false`   | Wider item padding                         |
| `isCollapsible` | `boolean`                                                                             | `false`   | Collapse to icons on idle, expand on hover |

## SideNavItem Type

| Prop          | Type                                           | Description                           |
| ------------- | ---------------------------------------------- | ------------------------------------- |
| `type`        | `'item' \| 'divider' \| 'header' \| 'submenu'` | Item type (default: `'item'`)         |
| `label`       | `string`                                       | Text label                            |
| `href`        | `string`                                       | Link URL                              |
| `onclick`     | `(item) => void`                               | Click handler                         |
| `icon`        | `IconData`                                     | Icon component                        |
| `description` | `string`                                       | Secondary text                        |
| `status`      | `string \| Snippet`                            | Badge/status indicator                |
| `subitems`    | `SideNavSubItem[]`                             | Submenu items (for `type: 'submenu'`) |
| `open`        | `boolean`                                      | Submenu initially open                |

## Patterns

### Basic Navigation

```svelte
<script>
	const items: SideNavItem[] = [
		{ type: 'header', label: 'Menu', icon: HomeIcon },
		{ type: 'divider' },
		{ label: 'Home', href: '/home', icon: HomeIcon },
		{ label: 'Settings', href: '/settings', icon: SettingsIcon }
	];
</script>

<SideNav {items} />
```

### With Submenus

```svelte
<SideNav
	items={[
		{
			type: 'submenu',
			label: 'Analytics',
			icon: ChartIcon,
			open: true,
			subitems: [
				{ label: 'Overview', href: '/analytics/overview' },
				{ label: 'Reports', href: '/analytics/reports' }
			]
		}
	]}
/>
```

### With Descriptions & Status

```svelte
<SideNav
	items={[
		{ label: 'Dashboard', href: '#', description: 'View analytics', icon: ChartIcon },
		{ label: 'Messages', href: '#', description: 'Check inbox', status: '5', icon: MailIcon }
	]}
/>
```

### Collapsible Mode

```svelte
<SideNav
	isCollapsible
	items={[
		{ label: 'Home', href: '#', icon: HomeIcon },
		{ label: 'Settings', href: '#', icon: SettingsIcon }
	]}
/>
```

### Styled Variants

```svelte
<SideNav color="primary" variant="soft" {items} />
<SideNav color="success" variant="solid" {items} />
```

## Notes

- Items with `href` render as links; items with `onclick` render as buttons
- Active state auto-detected from current URL path
- Icons required for `isCollapsible` mode
- Submenus animate open/close

## Component References

- **@see icons.md** - Icon usage
