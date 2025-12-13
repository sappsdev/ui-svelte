## ArcChart Component

Customizable arc/radial chart for progress, metrics, and proportional data.

```svelte
<ArcChart
  data={[{ value: 75, max: 100, color: 'primary', label: 'Progress' }]}
  size="md"
  thickness={16}
  gap={8}
  showLegend={true}
  legendPosition="right"
  palette="default"
  showGradient={false}
  showGlow={false}
  linecap="round"
  centerText="Total"
  centerValue={75}
  animated={true}
  onClick={(arc, i) => {}}
  valueFormatter={(v) => `${v}%`}
/>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `data` | `[]` | Array of `ArcData` objects |
| `size` | `'md'` | `sm` `md` `lg` `xl` |
| `thickness` | `16` | Arc stroke width |
| `gap` | `8` | Space between arcs |
| `legendPosition` | `'right'` | `top` `right` `bottom` `left` `none` |
| `palette` | - | `default` `rainbow` `ocean` `sunset` `forest` `neon` |
| `showGradient` | `false` | Enable arc gradients |
| `showGlow` | `false` | Add glow effect |
| `linecap` | `'round'` | `round` `butt` `square` |
| `centerText` | - | Label in center |
| `centerValue` | - | Value in center (auto-sum if empty) |
| `valueFormatter` | - | Format values `(v) => string` |
| `onClick` | - | Click handler `(arc, index) => void` |
| `selected` | `[]` | Selected arc indices |
| `centerContent` | - | Snippet for custom center |
| `animated` | `true` | Entry animation |
| `loading` / `empty` | `false` | State indicators |

### ArcData Type

| Prop | Required | Description |
|------|----------|-------------|
| `value` | ✓ | Current value |
| `max` | - | Maximum value (default: value) |
| `color` | - | `primary` `secondary` `success` `info` `warning` `danger` `muted` |
| `label` | - | Arc label |
| `unit` | - | Unit suffix (e.g., `'%'`, `'GB'`) |
| `disabled` | - | Disable arc interactions |

### Examples

```svelte
<!-- Single Progress -->
<ArcChart data={[{ value: 75, max: 100, color: 'success' }]} />

<!-- Multiple Metrics -->
<ArcChart
  data={[
    { value: 85, max: 100, label: 'CPU', color: 'primary' },
    { value: 62, max: 100, label: 'RAM', color: 'warning' },
    { value: 45, max: 100, label: 'Disk', color: 'info' }
  ]}
  centerText="System"
/>

<!-- With Palette -->
<ArcChart data={metrics} palette="ocean" showGlow />

<!-- Value Formatting -->
<ArcChart
  data={[{ value: 5280, max: 10000, label: 'Users' }]}
  valueFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}K` : v}
/>

<!-- Custom Center -->
<ArcChart data={data} showLegend={false}>
  {#snippet centerContent()}
    <div class="text-2xl">✓</div>
    <div class="text-xs">Done</div>
  {/snippet}
</ArcChart>

<!-- Interactive -->
<ArcChart
  data={metrics}
  onClick={(arc, i) => selectMetric(i)}
  selected={selectedIndices}
/>
```

**For LLMs**: Use `data` array with `value`/`max`/`color`/`label`. Use `palette` for auto-colors, `showGlow` for emphasis. Use `valueFormatter` for K/M/% formats. Use `centerContent` snippet for custom center display.
