# PieChart Component

Pie and donut charts for proportional data display.

## Import

```svelte
import {PieChart} from 'ui-svelte';
```

## Props

| Prop               | Type                                                                  | Default     | Description        |
| ------------------ | --------------------------------------------------------------------- | ----------- | ------------------ |
| `data`             | `DataPoint[]`                                                         | `[]`        | Slice data         |
| `size`             | `'sm' \| 'md' \| 'lg' \| 'xl'`                                        | `'md'`      | Chart size         |
| `palette`          | `'default' \| 'rainbow' \| 'ocean' \| 'sunset' \| 'forest' \| 'neon'` | `'default'` | Color palette      |
| `legendPosition`   | `'top' \| 'right' \| 'bottom' \| 'left' \| 'none'`                    | `'right'`   | Legend placement   |
| `donut`            | `boolean`                                                             | `false`     | Donut style        |
| `donutWidth`       | `number`                                                              | `60`        | Donut ring width   |
| `centerLabel`      | `string`                                                              | `'Total'`   | Donut center label |
| `centerValue`      | `string \| number`                                                    | -           | Donut center value |
| `showGlow`         | `boolean`                                                             | `false`     | Glow effect        |
| `showGradient`     | `boolean`                                                             | `false`     | Gradient fill      |
| `hideLabels`       | `boolean`                                                             | `false`     | Hide slice labels  |
| `hideValues`       | `boolean`                                                             | `false`     | Hide values        |
| `hideLegend`       | `boolean`                                                             | `false`     | Hide legend        |
| `hidePercentages`  | `boolean`                                                             | `false`     | Hide percentages   |
| `disableAnimation` | `boolean`                                                             | `false`     | Disable animation  |
| `loading`          | `boolean`                                                             | `false`     | Loading state      |

## Types

```typescript
type DataPoint = {
	label: string;
	value: number;
	color?: Color;
	disabled?: boolean;
};
```

## Patterns

### Basic Pie

```svelte
<script>
	const data = [
		{ label: 'Product A', value: 30 },
		{ label: 'Product B', value: 25 },
		{ label: 'Product C', value: 20 },
		{ label: 'Product D', value: 15 },
		{ label: 'Product E', value: 10 }
	];
</script>

<PieChart {data} />
```

### Donut

```svelte
<PieChart {data} donut centerLabel="Total" centerValue={100} />
```

### Custom Colors

```svelte
<script>
	const data = [
		{ label: 'Success', value: 70, color: 'success' },
		{ label: 'Warning', value: 20, color: 'warning' },
		{ label: 'Error', value: 10, color: 'danger' }
	];
</script>

<PieChart {data} />
```

### With Effects

```svelte
<PieChart {data} showGlow showGradient />
```

## Notes

- Slices highlight on hover with tooltip
- Legend interactive: click to toggle slice
- Donut center supports custom content via `centerContent` snippet
