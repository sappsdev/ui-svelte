# Skeleton Component

Placeholder preview of content before data loads.

## Import

```svelte
import {Skeleton} from 'ui-svelte';
```

## Props

| Prop        | Type                                                 | Default  | Description        |
| ----------- | ---------------------------------------------------- | -------- | ------------------ |
| `width`     | `string`                                             | -        | Skeleton width     |
| `height`    | `string`                                             | -        | Skeleton height    |
| `variant`   | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'text'` | Shape variant      |
| `animation` | `'wave' \| 'pulse' \| 'none'`                        | `'wave'` | Animation type     |
| `class`     | `string`                                             | -        | Additional classes |

## Patterns

### Basic

```svelte
<Skeleton width="200px" height="20px" />
```

### Variants

```svelte
<Skeleton variant="text" width="200px" height="20px" />
<Skeleton variant="circular" width="64px" height="64px" />
<Skeleton variant="rectangular" width="200px" height="100px" />
<Skeleton variant="rounded" width="200px" height="100px" />
```

### Animations

```svelte
<Skeleton animation="wave" width="200px" height="20px" />
<Skeleton animation="pulse" width="200px" height="20px" />
<Skeleton animation="none" width="200px" height="20px" />
```

### User Profile Placeholder

```svelte
<div class="flex gap-4 items-start">
	<Skeleton variant="circular" width="48px" height="48px" />
	<div class="column gap-2 flex-1">
		<Skeleton width="40%" height="16px" />
		<Skeleton width="100%" height="12px" />
		<Skeleton width="80%" height="12px" />
	</div>
</div>
```

### Card Placeholder

```svelte
<div class="column gap-4 max-w-xs">
	<Skeleton variant="rounded" width="100%" height="140px" />
	<div class="column gap-2">
		<Skeleton width="60%" height="20px" />
		<Skeleton width="100%" height="12px" />
		<Skeleton width="100%" height="12px" />
		<Skeleton width="40%" height="12px" />
	</div>
</div>
```

## Notes

- Use `text` variant for inline text placeholders
- Use `circular` for avatar placeholders
- Use `rectangular`/`rounded` for image or card placeholders
- `wave` animation provides subtle shimmer effect
- `pulse` animation provides opacity pulsing
