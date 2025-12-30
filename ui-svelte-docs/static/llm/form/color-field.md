# ColorField Component

Color picker field displaying multiple color formats (HEX, RGB, CMYK, OKLCH).

## Import

```svelte
import {ColorField} from 'ui-svelte';
```

## Props

| Prop           | Type                                                                                  | Default      | Description                             |
| -------------- | ------------------------------------------------------------------------------------- | ------------ | --------------------------------------- |
| `hex`          | `string`                                                                              | `'#3b82f6'`  | HEX color value (bindable)              |
| `rgb`          | `string`                                                                              | `''`         | RGB value (bindable)                    |
| `cmyk`         | `string`                                                                              | `''`         | CMYK value (bindable)                   |
| `oklch`        | `string`                                                                              | `''`         | OKLCH value (bindable)                  |
| `foreground`   | `string`                                                                              | `''`         | Contrasting foreground color (bindable) |
| `showHex`      | `boolean`                                                                             | `false`      | Show HEX in picker                      |
| `showRgb`      | `boolean`                                                                             | `false`      | Show RGB in picker                      |
| `showCmyk`     | `boolean`                                                                             | `false`      | Show CMYK in picker                     |
| `showOklch`    | `boolean`                                                                             | `false`      | Show OKLCH in picker                    |
| `color`        | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'muted'`    | Color theme                             |
| `variant`      | `'solid' \| 'soft' \| 'outlined' \| 'line'`                                           | `'outlined'` | Visual style                            |
| `size`         | `'sm' \| 'md' \| 'lg'`                                                                | `'md'`       | Component size                          |
| `label`        | `string`                                                                              | -            | Field label                             |
| `isFloatLabel` | `boolean`                                                                             | `false`      | Floating label style                    |
| `helpText`     | `string`                                                                              | -            | Helper text                             |
| `errorText`    | `string`                                                                              | -            | Error message                           |

## Patterns

### Basic

```svelte
<script>
	let hex = $state('#3b82f6');
</script>

<ColorField bind:hex />
```

### With All Formats

```svelte
<script>
	let hex = $state('#3b82f6');
	let rgb = $state('');
	let cmyk = $state('');
	let oklch = $state('');
	let foreground = $state('');
</script>

<ColorField
	bind:hex
	bind:rgb
	bind:cmyk
	bind:oklch
	bind:foreground
	showHex
	showRgb
	showCmyk
	showOklch
/>
```

### With Label

```svelte
<ColorField label="Brand Color" isFloatLabel bind:hex />
```

## Notes

- All color values are bindable for two-way sync
- `foreground` returns best contrasting text color
- Popover opens on click with color picker
