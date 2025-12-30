# ArcChart Component

Circular progress chart with concentric arcs for multiple metrics.

## Import

```svelte
import {ArcChart} from 'ui-svelte';
```

## Props

| Prop               | Type                                                                  | Default   | Description           |
| ------------------ | --------------------------------------------------------------------- | --------- | --------------------- |
| `data`             | `ArcData[]`                                                           | `[]`      | Arc data array        |
| `centerText`       | `string`                                                              | -         | Center label text     |
| `centerValue`      | `string \| number`                                                    | -         | Center value display  |
| `thickness`        | `number`                                                              | `16`      | Arc stroke thickness  |
| `gap`              | `number`                                                              | `8`       | Gap between arcs      |
| `size`             | `'sm' \| 'md' \| 'lg' \| 'xl'`                                        | `'md'`    | Chart size            |
| `palette`          | `'default' \| 'rainbow' \| 'ocean' \| 'sunset' \| 'forest' \| 'neon'` | -         | Color palette         |
| `legendPosition`   | `'top' \| 'right' \| 'bottom' \| 'left' \| 'none'`                    | `'right'` | Legend placement      |
| `linecap`          | `'round' \| 'butt' \| 'square'`                                       | `'round'` | Arc end style         |
| `showGradient`     | `boolean`                                                             | `false`   | Gradient fill         |
| `showGlow`         | `boolean`                                                             | `false`   | Glow effect           |
| `hideLegend`       | `boolean`                                                             | `false`   | Hide legend           |
| `hideValues`       | `boolean`                                                             | `false`   | Hide values in legend |
| `showInlineLabels` | `boolean`                                                             | `false`   | Labels on arcs        |
| `disableAnimation` | `boolean`                                                             | `false`   | Disable animation     |
| `loading`          | `boolean`                                                             | `false`   | Loading state         |
| `empty`            | `boolean`                                                             | `false`   | Empty state           |

## Types

```typescript
type ArcData = {
	value: number;
	max: number;
	label: string;
	color?: Color;
	unit?: string;
};
```

## Patterns

### Single Gauge

```svelte
<ArcChart
	data={[{ value: 72, max: 100, label: 'Score', color: 'primary' }]}
	centerText="Score"
	centerValue="72%"
	hideLegend
/>
```

### Multiple Metrics

```svelte
<script>
	const data = [
		{ value: 75, max: 100, label: 'Progress', color: 'primary' },
		{ value: 60, max: 100, label: 'Tasks', color: 'success' },
		{ value: 45, max: 100, label: 'Goals', color: 'warning' }
	];
</script>

<ArcChart {data} />
```

### With Effects

```svelte
<ArcChart {data} showGradient showGlow />
```

## Notes

- Multiple arcs display as concentric rings
- Use `centerText`/`centerValue` for single-arc gauges
- Background track shows remaining progress
