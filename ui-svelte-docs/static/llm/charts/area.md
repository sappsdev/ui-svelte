# AreaChart Component

Filled area chart for trends and stacked data visualization.

## Import

```svelte
import {AreaChart} from 'ui-svelte';
```

## Props

| Prop               | Type                                                                  | Default     | Description          |
| ------------------ | --------------------------------------------------------------------- | ----------- | -------------------- |
| `data`             | `DataPoint[]`                                                         | `[]`        | Single series data   |
| `series`           | `Series[]`                                                            | `[]`        | Multiple series data |
| `color`            | `Color`                                                               | `'primary'` | Single series color  |
| `size`             | `'sm' \| 'md' \| 'lg' \| 'xl'`                                        | `'md'`      | Chart size           |
| `curve`            | `'linear' \| 'smooth'`                                                | `'linear'`  | Line interpolation   |
| `palette`          | `'default' \| 'rainbow' \| 'ocean' \| 'sunset' \| 'forest' \| 'neon'` | -           | Color palette        |
| `legendPosition`   | `'top' \| 'right' \| 'bottom' \| 'left' \| 'none'`                    | `'bottom'`  | Legend placement     |
| `stacked`          | `boolean`                                                             | `false`     | Stack series         |
| `hideLine`         | `boolean`                                                             | `false`     | Hide line stroke     |
| `showPoints`       | `boolean`                                                             | `false`     | Show data points     |
| `hideGrid`         | `boolean`                                                             | `false`     | Hide grid lines      |
| `hideLegend`       | `boolean`                                                             | `false`     | Hide legend          |
| `hideGradient`     | `boolean`                                                             | `false`     | Hide area gradient   |
| `hideXAxis`        | `boolean`                                                             | `false`     | Hide X axis          |
| `hideYAxis`        | `boolean`                                                             | `false`     | Hide Y axis          |
| `showGlow`         | `boolean`                                                             | `false`     | Glow effect          |
| `disableAnimation` | `boolean`                                                             | `false`     | Disable animation    |
| `loading`          | `boolean`                                                             | `false`     | Loading state        |

## Types

```typescript
type DataPoint = { x: number; y: number };
type Series = { name: string; data: DataPoint[]; color?: Color };
```

## Patterns

### Single Series

```svelte
<script>
	const data = [
		{ x: 1, y: 45 },
		{ x: 2, y: 35 },
		{ x: 3, y: 55 },
		{ x: 4, y: 70 }
	];
</script>

<AreaChart {data} color="primary" curve="smooth" />
```

### Multiple Series

```svelte
<script>
	const series = [
		{
			name: 'Revenue',
			data: [
				{ x: 1, y: 45 },
				{ x: 2, y: 55 }
			]
		},
		{
			name: 'Expenses',
			data: [
				{ x: 1, y: 30 },
				{ x: 2, y: 40 }
			]
		}
	];
</script>

<AreaChart {series} palette="ocean" />
```

### Stacked

```svelte
<AreaChart {series} stacked curve="smooth" />
```

## Notes

- Use `data` for single series, `series` for multiple
- Area fills from line to x-axis
- `stacked` mode stacks series vertically
