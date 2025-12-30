# RadioGroup Component

Radio button group for single selection from options.

## Import

```svelte
import {RadioGroup} from 'ui-svelte';
```

## Props

| Prop       | Type                                  | Default     | Description               |
| ---------- | ------------------------------------- | ----------- | ------------------------- |
| `options`  | `Option[]`                            | `[]`        | Available options         |
| `value`    | `string \| number`                    | -           | Selected value (bindable) |
| `name`     | `string`                              | -           | Form field name           |
| `label`    | `string`                              | -           | Group label               |
| `info`     | `string`                              | -           | Helper text               |
| `error`    | `string`                              | -           | Error message             |
| `color`    | `'primary' \| 'secondary' \| 'muted'` | `'primary'` | Color theme               |
| `size`     | `'sm' \| 'md' \| 'lg'`                | `'md'`      | Component size            |
| `onchange` | `(value: string \| number) => void`   | -           | Change callback           |

## Types

```typescript
type Option = {
	id: string | number;
	label: string;
};
```

## Patterns

### Basic

```svelte
<script>
	const options = [
		{ id: 'option1', label: 'Option 1' },
		{ id: 'option2', label: 'Option 2' },
		{ id: 'option3', label: 'Option 3' }
	];

	let value = $state('option1');
</script>

<RadioGroup {options} bind:value />
```

### With Label

```svelte
<RadioGroup options={paymentOptions} bind:value={paymentMethod} label="Payment Method" />
```

### With Helper Text

```svelte
<RadioGroup
	options={shippingOptions}
	bind:value={shipping}
	label="Shipping Speed"
	info="Choose delivery speed"
/>
```

### With Error

```svelte
<RadioGroup
	options={planOptions}
	bind:value={plan}
	label="Select Plan"
	error={!plan ? 'Please select a plan' : ''}
/>
```

### Different Sizes

```svelte
<RadioGroup {options} bind:value size="sm" label="Small" />
<RadioGroup {options} bind:value size="md" label="Medium" />
<RadioGroup {options} bind:value size="lg" label="Large" />
```

## Notes

- Only one option can be selected at a time
- Use `bind:value` for two-way binding
- Options require `id` and `label` properties
