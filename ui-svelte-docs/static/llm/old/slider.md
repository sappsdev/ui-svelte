## Slider Component

Range input for selecting numeric values.

```svelte
<Slider
  bind:value
  min={0}
  max={100}
  step={1}
  onchange={handleChange}
  label="Volume"
  name="volume"
  color="primary"
  size="md"
  hideLabel={false}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `value` | - | Current value (bindable) |
| `min` | `0` | Minimum value |
| `max` | `100` | Maximum value |
| `step` | - | Step increment |
| `onchange` | - | Handler `(value: number) => void` |
| `label` | - | Label text |
| `name` | - | Form field name |
| `color` | `'primary'` | `primary` `secondary` `muted` |
| `size` | `'md'` | `sm` `md` `lg` |
| `hideLabel` | `false` | Hide label and value display |

### Common Patterns

```svelte
<!-- Basic -->
<Slider bind:value min={0} max={100} />

<!-- With Label -->
<Slider bind:value min={0} max={100} label="Volume" />

<!-- Custom Range -->
<Slider bind:value min={-10} max={10} step={0.5} label="Temperature" />

<!-- Price Range -->
<Slider bind:value min={0} max={1000} step={10} label="Max Price" />

<!-- Percentage -->
<Slider bind:value min={0} max={100} label="Opacity %" />

<!-- Without Label -->
<Slider bind:value min={0} max={100} hideLabel />

<!-- Form Integration -->
<Slider bind:value name="rating" min={1} max={5} label="Rating" />
```

**For LLMs**: Slider for numeric input within a range. Use `min` and `max` to define range. Use `step` for increment size. Shows current value next to label. Use `hideLabel` to hide label/value display. Good for settings, filters, ratings.
