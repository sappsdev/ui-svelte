# SideNav Component

Vertical sidebar navigation with headers, dividers, submenus, and collapsible behavior.

## Import

```svelte
import {SideNav} from 'ui-svelte';
```

## Props

| Prop            | Type                                                                                  | Default   | Description        |
| --------------- | ------------------------------------------------------------------------------------- | --------- | ------------------ |
| `items`         | `SideNavItem[]`                                                                       | `[]`      | Navigation items   |
| `size`          | `'sm' \| 'md' \| 'lg'`                                                                | `'md'`    | Size               |
| `color`         | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'muted'` | Color theme        |
| `variant`       | `'solid' \| 'soft' \| 'ghost'`                                                        | `'ghost'` | Visual style       |
| `isWide`        | `boolean`                                                                             | `false`   | Wide layout        |
| `isCollapsible` | `boolean`                                                                             | `false`   | Collapse on hover  |
| `class`         | `string`                                                                              | -         | Additional classes |

## SideNavItem Type

```ts
interface SideNavItem {
	type?: 'item' | 'divider' | 'header' | 'submenu';
	label?: string;
	description?: string;
	href?: string;
	onclick?: (item: SideNavItem) => void;
	status?: string | Snippet;
	icon?: IconData;
	subitems?: SideNavSubItem[];
	open?: boolean;
}

interface SideNavSubItem {
	label: string;
	href?: string;
	onclick?: (item: SideNavSubItem) => void;
	description?: string;
	status?: string | Snippet;
	icon?: IconData;
}
```

## Patterns

### Basic SideNav

```svelte
<script lang="ts">
	import { SideNav } from 'ui-svelte';
	import { HomeLinearIcon, DocumentLinearIcon, SettingsLinearIcon } from '$lib/icons';

	const items = [
		{ type: 'header', label: 'Menu', icon: HomeLinearIcon },
		{ type: 'divider' },
		{ label: 'Home', href: '/home', icon: HomeLinearIcon },
		{ label: 'Documents', href: '/documents', icon: DocumentLinearIcon },
		{ label: 'Settings', href: '/settings', icon: SettingsLinearIcon }
	];
</script>

<SideNav {items} />
```

### With Submenus

```svelte
const items = [
  {
    type: 'submenu',
    label: 'Analytics',
    icon: ChartLinearIcon,
    open: true,
    subitems: [
      { label: 'Overview', href: '/analytics/overview' },
      { label: 'Reports', href: '/analytics/reports' },
      { label: 'Statistics', href: '/analytics/stats', status: 'New' }
    ]
  },
  {
    type: 'submenu',
    label: 'Projects',
    icon: FolderLinearIcon,
    subitems: [
      { label: 'Active', href: '/projects/active' },
      { label: 'Archived', href: '/projects/archived' }
    ]
  }
];

<SideNav {items} color="primary" />
```

### With Descriptions & Status

```svelte
const items = [
  { label: 'Dashboard', href: '#', description: 'View analytics', icon: ChartLinearIcon },
  { label: 'Messages', href: '#', description: 'Check inbox', status: '5', icon: MessageIcon },
  { label: 'Settings', href: '#', description: 'Configure app', status: 'New', icon: SettingsLinearIcon }
];

<SideNav {items} />
```

### Collapsible Mode

```svelte
<SideNav
	isCollapsible
	items={[
		{ label: 'Home', href: '#', icon: HomeLinearIcon },
		{ label: 'Documents', href: '#', icon: DocumentLinearIcon },
		{ label: 'Settings', href: '#', icon: SettingsLinearIcon }
	]}
/>
```

## Notes

- Use `type: 'header'` for section headers
- Use `type: 'divider'` for separators
- Set `open: true` on submenus to expand by default
- `isCollapsible` shows only icons, expands on hover
