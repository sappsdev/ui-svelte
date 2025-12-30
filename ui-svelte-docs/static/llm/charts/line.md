# LineChart Component

Line chart for trends with single or multiple series.

## Import

```svelte
import {LineChart} from 'ui-svelte';
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
| `hidePoints`       | `boolean`                                                             | `false`     | Hide data points     |
| `hideGrid`         | `boolean`                                                             | `false`     | Hide grid lines      |
| `hideLegend`       | `boolean`                                                             | `false`     | Hide legend          |
| `hideXAxis`        | `boolean`                                                             | `false`     | Hide X axis          |
| `hideYAxis`        | `boolean`                                                             | `false`     | Hide Y axis          |
| `showGradientFill` | `boolean`                                                             | `false`     | Fill under line      |
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
		{ x: 0, y: 10 },
		{ x: 1, y: 25 },
		{ x: 2, y: 15 },
		{ x: 3, y: 40 }
	];
</script>

<LineChart {data} color="primary" />
```

### Multiple Series

```svelte
<script>
	const series = [
		{
			name: 'Sales',
			data: [
				{ x: 0, y: 10 },
				{ x: 1, y: 25 }
			]
		},
		{
			name: 'Revenue',
			data: [
				{ x: 0, y: 15 },
				{ x: 1, y: 20 }
			]
		}
	];
</script>

<LineChart {series} palette="ocean" />
```

### Smooth Curve

```svelte
<LineChart {data} curve="smooth" />
```

### With Effects

```svelte
<LineChart {data} showGradientFill showGlow curve="smooth" />
```

## Notes

- Use `data` for single series, `series` for multiple
- Points highlight on hover with tooltip
- `showGradientFill` adds area fill below line
