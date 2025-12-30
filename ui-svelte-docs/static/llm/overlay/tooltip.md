# Tooltip Component

Brief, informative messages displayed on hover.

## Import

```svelte
import {Tooltip} from 'ui-svelte';
```

## Props

| Prop       | Type                                                                                  | Default     | Description        |
| ---------- | ------------------------------------------------------------------------------------- | ----------- | ------------------ |
| `label`    | `string`                                                                              | -           | Tooltip text       |
| `color`    | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Color theme        |
| `variant`  | `'solid' \| 'soft'`                                                                   | `'soft'`    | Visual style       |
| `position` | `'top' \| 'bottom' \| 'start' \| 'end'`                                               | `'top'`     | Placement          |
| `class`    | `string`                                                                              | -           | Additional classes |

## Patterns

### Basic Tooltip

```svelte
<script lang="ts">
	import { Tooltip, Button } from 'ui-svelte';
</script>

<Tooltip label="Click to save">
	<Button>Save</Button>
</Tooltip>
```

### Positions

```svelte
<Tooltip label="Top tooltip" position="top">
	<Button>Top</Button>
</Tooltip>

<Tooltip label="Bottom tooltip" position="bottom">
	<Button>Bottom</Button>
</Tooltip>

<Tooltip label="Left tooltip" position="start">
	<Button>Start</Button>
</Tooltip>

<Tooltip label="Right tooltip" position="end">
	<Button>End</Button>
</Tooltip>
```

### Color Variants

```svelte
<Tooltip label="Primary info" color="primary" variant="solid">
	<Button color="primary">Solid</Button>
</Tooltip>

<Tooltip label="Success message" color="success" variant="soft">
	<Button color="success">Soft</Button>
</Tooltip>

<Tooltip label="Warning note" color="warning">
	<Button color="warning">Warning</Button>
</Tooltip>
```

## Notes

- Wrap any element to add tooltip functionality
- Shows on hover, hides on mouse leave
- Use `start`/`end` for horizontal positioning (LTR/RTL aware)
