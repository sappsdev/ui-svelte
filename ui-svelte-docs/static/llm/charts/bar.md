# BarChart Component

Bar chart for categorical data with grouped and stacked layouts.

## Import

```svelte
import {BarChart} from 'ui-svelte';
```

## Props

| Prop               | Type                                                                  | Default     | Description             |
| ------------------ | --------------------------------------------------------------------- | ----------- | ----------------------- |
| `data`             | `DataPoint[]`                                                         | `[]`        | Single series data      |
| `series`           | `Series[]`                                                            | `[]`        | Multiple series data    |
| `color`            | `Color`                                                               | `'primary'` | Single series color     |
| `size`             | `'sm' \| 'md' \| 'lg' \| 'xl'`                                        | `'md'`      | Chart size              |
| `palette`          | `'default' \| 'rainbow' \| 'ocean' \| 'sunset' \| 'forest' \| 'neon'` | -           | Color palette           |
| `legendPosition`   | `'top' \| 'right' \| 'bottom' \| 'left' \| 'none'`                    | `'bottom'`  | Legend placement        |
| `grouped`          | `boolean`                                                             | `false`     | Group bars side by side |
| `stacked`          | `boolean`                                                             | `false`     | Stack bars vertically   |
| `hideGrid`         | `boolean`                                                             | `false`     | Hide grid lines         |
| `showLegend`       | `boolean`                                                             | `false`     | Show legend             |
| `showValues`       | `boolean`                                                             | `false`     | Show values on bars     |
| `showGradient`     | `boolean`                                                             | `false`     | Gradient fill           |
| `showGlow`         | `boolean`                                                             | `false`     | Glow effect             |
| `disableAnimation` | `boolean`                                                             | `false`     | Disable animation       |
| `loading`          | `boolean`                                                             | `false`     | Loading state           |

## Types

```typescript
type DataPoint = { label: string; value: number };
type Series = { name: string; data: DataPoint[]; color?: Color };
```

## Patterns

### Single Series

```svelte
<script>
	const data = [
		{ label: 'Jan', value: 65 },
		{ label: 'Feb', value: 59 },
		{ label: 'Mar', value: 80 }
	];
</script>

<BarChart {data} color="primary" />
```

### Grouped Bars

```svelte
<script>
  const series = [
    { name: 'Product A', data: [{ label: 'Jan', value: 65 }, ...], color: 'primary' },
    { name: 'Product B', data: [{ label: 'Jan', value: 28 }, ...], color: 'secondary' }
  ];
</script>

<BarChart {series} grouped showLegend />
```

### Stacked Bars

```svelte
<BarChart {series} stacked showLegend />
```

### With Effects

```svelte
<BarChart {data} showGradient showGlow showValues />
```

## Notes

- Use `data` for single series, `series` for multiple
- `grouped` places bars side by side
- `stacked` stacks bars vertically
- `showValues` displays value labels on bars
