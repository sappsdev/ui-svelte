# Select Component

Dropdown for selecting from a list of options.

## Import

```svelte
import {Select} from 'ui-svelte';
```

## Props

| Prop           | Type                                                                                  | Default              | Description                       |
| -------------- | ------------------------------------------------------------------------------------- | -------------------- | --------------------------------- |
| `options`      | `Option[]`                                                                            | `[]`                 | Array of options (required)       |
| `value`        | `unknown`                                                                             | -                    | Selected value (bindable)         |
| `selected`     | `Option`                                                                              | -                    | Selected option object (bindable) |
| `color`        | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'muted'`            | Color theme                       |
| `variant`      | `'solid' \| 'soft' \| 'outlined' \| 'line'`                                           | `'outlined'`         | Visual style                      |
| `size`         | `'sm' \| 'md' \| 'lg'`                                                                | `'md'`               | Select size                       |
| `label`        | `string`                                                                              | -                    | Label text                        |
| `isFloatLabel` | `boolean`                                                                             | `false`              | Floating label style              |
| `isSolid`      | `boolean`                                                                             | `false`              | Solid background                  |
| `placeholder`  | `string`                                                                              | `'Select an option'` | Placeholder text                  |
| `helpText`     | `string`                                                                              | -                    | Help message below select         |
| `errorText`    | `string`                                                                              | -                    | Error message below select        |

## Option Type

```typescript
type Option = {
	id: string | number; // Required
	label: string; // Required
	description?: string; // Optional subtitle
	src?: string; // Optional avatar URL
};
```

## Patterns

### Basic Select

```svelte
<Select {options} bind:value />
```

### With Label

```svelte
<Select label="Role" {options} bind:value />

<Select label="Role" isFloatLabel {options} bind:value />
```

### With Avatar

```svelte
<script>
	const users = [
		{ id: '1', label: 'John Doe', src: '/avatar.jpg' },
		{ id: '2', label: 'Jane Smith', src: '/avatar2.jpg' }
	];
</script>

<Select options={users} bind:value />
```

### With Description

```svelte
<script>
	const roles = [
		{ id: 'admin', label: 'Admin', description: 'Full access' },
		{ id: 'user', label: 'User', description: 'Limited access' }
	];
</script>

<Select options={roles} bind:value />
```

### Validation States

```svelte
<Select label="Role" helpText="Choose your role" {options} />

<Select label="Role" errorText="Selection required" {options} />
```
