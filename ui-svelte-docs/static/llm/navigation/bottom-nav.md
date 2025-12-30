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
| `color`       | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'primary'` | Color theme            |
| `variant`     | `'solid' \| 'soft' \| 'blur'`                                                                                   | `'soft'`    | Visual style           |
| `activeStyle` | `'line' \| 'pill'`                                                                                              | `'line'`    | Active indicator style |
| `isBlock`     | `boolean`                                                                                                       | `false`     | Non-fixed positioning  |
| `isBordered`  | `boolean`                                                                                                       | `true`      | Show border            |
| `class`       | `string`                                                                                                        | -           | Additional classes     |

## BottomNavItem Type

```ts
interface BottomNavItem {
	id: string;
	label?: string;
	icon: IconData;
	href?: string;
	onclick?: (item: BottomNavItem) => void;
	badge?: string | number;
	isFab?: boolean;
	isActive?: boolean;
}
```

## Patterns

### Basic Bottom Nav

```svelte
<script lang="ts">
	import { BottomNav } from 'ui-svelte';
	import { HomeLinearIcon, Search24RegularIcon, UserCircleLinearIcon } from '$lib/icons';

	const items = [
		{ id: 'home', label: 'Home', href: '/home', icon: HomeLinearIcon },
		{ id: 'search', label: 'Search', href: '/search', icon: Search24RegularIcon },
		{ id: 'profile', label: 'Profile', href: '/profile', icon: UserCircleLinearIcon }
	];
</script>

<BottomNav {items} />
```

### With FAB Button

```svelte
const items = [
  { id: 'home', label: 'Home', icon: HomeLinearIcon },
  { id: 'add', icon: HeartLinearIcon, isFab: true, onclick: () => {} },
  { id: 'profile', label: 'Profile', icon: UserCircleLinearIcon }
];

<BottomNav {items} />
```

### With Badges

```svelte
const items = [
  { id: 'home', label: 'Home', icon: HomeLinearIcon },
  { id: 'messages', label: 'Messages', icon: MessageIcon, badge: 5 },
  { id: 'alerts', label: 'Alerts', icon: AlertIcon, badge: 'New' }
];

<BottomNav {items} color="primary" />
```

## Notes

- Use `isFab: true` for floating action button style
- Items can have `href` for links or `onclick` for actions
- Active state set via `isActive` or matches current URL
