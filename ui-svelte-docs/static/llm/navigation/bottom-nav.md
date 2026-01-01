# BottomNav Component

Mobile-friendly bottom navigation bar with icons, badges, FAB support, and CSS custom properties for advanced customization.

## Import

```svelte
import {BottomNav} from 'ui-svelte';
```

## Props

| Prop          | Type                                                                                                               | Default     | Description                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------ | ----------- | --------------------------- |
| `items`       | `BottomNavItem[]`                                                                                                  | `[]`        | Navigation items            |
| `size`        | `'sm' \| 'md' \| 'lg'`                                                                                             | `'md'`      | Size                        |
| `color`       | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'background'` | `'surface'` | Color theme for the nav bar |
| `fabColor`    | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'background'` | `'primary'` | Color for the FAB button    |
| `variant`     | `'solid' \| 'soft' \| 'blur'`                                                                                      | `'solid'`   | Visual style                |
| `activeStyle` | `'line' \| 'pill'`                                                                                                 | `'line'`    | Active indicator style      |
| `isBlock`     | `boolean`                                                                                                          | `false`     | Non-fixed positioning       |
| `isBordered`  | `boolean`                                                                                                          | `true`      | Show border                 |
| `class`       | `string`                                                                                                           | -           | Additional classes          |

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

## CSS Custom Properties

Customize the component using CSS variables:

```css
.bottomnav {
	--bn-pill-radius: 9999px; /* Pill border radius */
	--bn-pill-padding-x: 1rem; /* Pill horizontal padding */
	--bn-pill-padding-y: 0.25rem; /* Pill vertical padding */
	--bn-pill-opacity: 0.15; /* Pill background opacity */
	--bn-fab-size: 3rem; /* FAB button size */
	--bn-fab-offset: -1.5rem; /* FAB vertical offset */
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
<script lang="ts">
	import { BottomNav } from 'ui-svelte';
	import { HomeLinearIcon, HeartLinearIcon, UserCircleLinearIcon } from '$lib/icons';

	const items = [
		{ id: 'home', label: 'Home', icon: HomeLinearIcon },
		{ id: 'add', icon: HeartLinearIcon, isFab: true, onclick: () => {} },
		{ id: 'profile', label: 'Profile', icon: UserCircleLinearIcon }
	];
</script>

<BottomNav {items} fabColor="success" />
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

### Pill Active Style (Icon Only)

The `pill` activeStyle applies a rounded background to the **icon only**, not the entire item:

```svelte
<BottomNav {items} activeStyle="pill" />
```

### Custom FAB Color

Use `fabColor` to set an independent color for the FAB button:

```svelte
<BottomNav {items} color="surface" fabColor="danger" />
```

## Notes

- Use `isFab: true` for floating action button style
- Items can have `href` for links or `onclick` for actions
- Active state set via `isActive` or matches current URL
- `pill` activeStyle applies pill background to icon only (not entire item)
- Use `fabColor` to customize FAB independently from nav color
- CSS custom properties allow advanced customization of pill and FAB styling
