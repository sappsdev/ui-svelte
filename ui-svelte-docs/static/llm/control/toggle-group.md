# ToggleGroup Component

Single-select option group with toggle buttons.

## Import

```svelte
import {ToggleGroup} from 'ui-svelte';
```

## Props

| Prop         | Type                                                                                  | Default        | Description               |
| ------------ | ------------------------------------------------------------------------------------- | -------------- | ------------------------- |
| `items`      | `ToggleGroupItem[]`                                                                   | `[]`           | Toggle options            |
| `value`      | `string`                                                                              | `items[0]?.id` | Selected value (bindable) |
| `color`      | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'muted'`      | Color theme               |
| `variant`    | `'solid' \| 'soft' \| 'outlined' \| 'ghost'`                                          | `'soft'`       | Visual style              |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg'`                                                        | `'md'`         | Button size               |
| `isWide`     | `boolean`                                                                             | `false`        | Full width                |
| `isVertical` | `boolean`                                                                             | `false`        | Vertical layout           |
| `isDisabled` | `boolean`                                                                             | `false`        | Disable all               |
| `onchange`   | `(value: string) => void`                                                             | -              | Change callback           |

## Types

```typescript
type ToggleGroupItem = {
	id: string;
	label: string;
	icon?: IconData;
};
```

## Patterns

### Basic

```svelte
<script>
	const items = [
		{ id: 'option1', label: 'Option 1' },
		{ id: 'option2', label: 'Option 2' },
		{ id: 'option3', label: 'Option 3' }
	];

	let value = $state('option1');
</script>

<ToggleGroup {items} bind:value />
```

### With Icons

```svelte
<script>
	import { GridIcon, ListIcon, TableIcon } from '$lib/icons';

	const items = [
		{ id: 'grid', label: 'Grid', icon: GridIcon },
		{ id: 'list', label: 'List', icon: ListIcon },
		{ id: 'table', label: 'Table', icon: TableIcon }
	];
</script>

<ToggleGroup {items} bind:value />
```

### Vertical Layout

```svelte
<ToggleGroup {items} bind:value isVertical />
```

### Wide (Full Width)

```svelte
<ToggleGroup {items} bind:value isWide />
```

## Notes

- Only one option can be selected at a time
- Icons display alongside labels when provided
- Use `isWide` for form-like layouts
- Use `isVertical` for sidebar-like layouts
