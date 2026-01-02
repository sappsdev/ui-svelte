# Countdown Component

Displays a clock countdown with large 2-digit numbers in styled boxes.

## Import

```svelte
import {Countdown} from 'ui-svelte';
```

## Props

| Prop          | Type                                                                                               | Default                 | Description                  |
| ------------- | -------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------- |
| `targetDate`  | `Date`                                                                                             | -                       | Target date for countdown    |
| `showDays`    | `boolean`                                                                                          | `true`                  | Show days unit               |
| `showHours`   | `boolean`                                                                                          | `true`                  | Show hours unit              |
| `showMinutes` | `boolean`                                                                                          | `true`                  | Show minutes unit            |
| `showSeconds` | `boolean`                                                                                          | `true`                  | Show seconds unit            |
| `size`        | `'sm' \| 'md' \| 'lg' \| 'xl'`                                                                     | `'md'`                  | Size of countdown boxes      |
| `color`       | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning' \| 'surface'` | `'primary'`             | Color theme                  |
| `variant`     | `'solid' \| 'soft' \| 'outlined' \| 'ghost'`                                                       | `'solid'`               | Visual style                 |
| `labels`      | `{ days?: string; hours?: string; minutes?: string; seconds?: string }`                            | `{ days: 'Days', ... }` | Custom labels                |
| `onComplete`  | `() => void`                                                                                       | -                       | Callback when countdown ends |
| `class`       | `string`                                                                                           | -                       | Additional classes           |

## Patterns

### Basic Countdown

```svelte
<script lang="ts">
	import { Countdown } from 'ui-svelte';

	const targetDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
</script>

<Countdown {targetDate} />
```

### With Callback

```svelte
<Countdown {targetDate} onComplete={() => console.log('Done!')} />
```

### Custom Style

```svelte
<Countdown {targetDate} color="success" variant="soft" size="lg" />
```

### Partial Units

```svelte
<Countdown {targetDate} showDays={false} showHours={false} />
```

### Custom Labels (i18n)

```svelte
<Countdown
	{targetDate}
	labels={{
		days: 'Días',
		hours: 'Horas',
		minutes: 'Min',
		seconds: 'Seg'
	}}
/>
```

## Notes

- Each unit displays as 2-digit box with label below
- Use `show*` props to hide specific units
- Use `labels` prop for internationalization
