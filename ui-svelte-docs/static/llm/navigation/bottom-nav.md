# BottomNav Component

Mobile-friendly bottom navigation bar with icons, badges, and FAB support.

## Import

```svelte
import {BottomNav} from 'ui-svelte';
```

## Props

| Prop          | Type                                                                                                            | Default     | Description            |
| ------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------- |
| `items`       | `BottomNavItem[]`                                                                                               | `[]`        | Navigation items       |
| `size`        | `'sm' \| 'md' \| 'lg'`                                                                                          | `'md'`      | Size                   |
| `variant`     | `'solid' \| 'soft' \| 'blur'`                                                                                   | `'soft'`    | Visual style           |
| `color`       | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'primary'` | Active color           |
| `activeStyle` | `'line' \| 'pill'`                                                                                              | `'line'`    | Active indicator style |
| `isBlock`     | `boolean`                                                                                                       | `false`     | Non-fixed positioning  |
| `isBordered`  | `boolean`                                                                                                       | `true`      | Show top border        |
| `class`       | `string`                                                                                                        | -           | Custom classes         |

## BottomNavItem Type

| Property   | Type               | Description                  |
| ---------- | ------------------ | ---------------------------- |
| `id`       | `string`           | Unique identifier            |
| `label`    | `string`           | Text label (optional)        |
| `icon`     | `IconData`         | Icon to display              |
| `href`     | `string`           | Link destination             |
| `onclick`  | `function`         | Click handler                |
| `badge`    | `string \| number` | Badge content                |
| `isFab`    | `boolean`          | Floating action button style |
| `isActive` | `boolean`          | Manual active state          |

## Patterns

### Basic Navigation

```svelte
<BottomNav
	items={[
		{ id: 'home', label: 'Home', icon: HomeIcon, href: '/' },
		{ id: 'search', label: 'Search', icon: SearchIcon, href: '/search' },
		{ id: 'profile', label: 'Profile', icon: UserIcon, href: '/profile' }
	]}
/>
```

### With FAB Button

```svelte
<BottomNav
	items={[
		{ id: 'home', label: 'Home', icon: HomeIcon, href: '/' },
		{ id: 'add', icon: PlusIcon, isFab: true, onclick: () => openModal() },
		{ id: 'profile', label: 'Profile', icon: UserIcon, href: '/profile' }
	]}
/>
```

### With Badges

```svelte
<BottomNav
	items={[
		{ id: 'home', label: 'Home', icon: HomeIcon, href: '/' },
		{ id: 'cart', label: 'Cart', icon: CartIcon, href: '/cart', badge: 3 },
		{ id: 'alerts', label: 'Alerts', icon: BellIcon, badge: 'New' }
	]}
/>
```

### Icon Only

```svelte
<BottomNav
	items={[
		{ id: 'home', icon: HomeIcon, href: '/' },
		{ id: 'search', icon: SearchIcon, href: '/search' }
	]}
/>
```

## Notes

- Fixed to bottom by default; use `isBlock` for inline placement
- Omit `label` for icon-only navigation
- Use `isFab: true` for elevated center action buttons
- Use `badge` for notification indicators
