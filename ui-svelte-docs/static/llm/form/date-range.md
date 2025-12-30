# DateRange Component

Dual calendar picker for selecting date ranges.

## Import

```svelte
import {DateRange} from 'ui-svelte';
```

## Props

| Prop           | Type                                                                                  | Default               | Description             |
| -------------- | ------------------------------------------------------------------------------------- | --------------------- | ----------------------- |
| `startDate`    | `Date \| null`                                                                        | `null`                | Start date (bindable)   |
| `endDate`      | `Date \| null`                                                                        | `null`                | End date (bindable)     |
| `minDate`      | `Date \| null`                                                                        | `null`                | Minimum selectable date |
| `maxDate`      | `Date \| null`                                                                        | `null`                | Maximum selectable date |
| `placeholder`  | `string`                                                                              | `'Select date range'` | Input placeholder       |
| `label`        | `string`                                                                              | -                     | Field label             |
| `isFloatLabel` | `boolean`                                                                             | `false`               | Floating label style    |
| `helpText`     | `string`                                                                              | -                     | Helper text             |
| `errorText`    | `string`                                                                              | -                     | Error message           |
| `color`        | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'muted'`             | Color theme             |
| `variant`      | `'solid' \| 'soft' \| 'outlined' \| 'line'`                                           | `'outlined'`          | Visual style            |
| `size`         | `'sm' \| 'md' \| 'lg'`                                                                | `'md'`                | Component size          |
| `onchange`     | `(range: { start: Date \| null; end: Date \| null }) => void`                         | -                     | Change callback         |

## Patterns

### Basic

```svelte
<script>
	let startDate: Date | null = $state(null);
	let endDate: Date | null = $state(null);
</script>

<DateRange bind:startDate bind:endDate placeholder="Select date range" />
```

### With Label

```svelte
<DateRange label="Booking Period" isFloatLabel bind:startDate bind:endDate />
```

### With Constraints

```svelte
<DateRange
	bind:startDate
	bind:endDate
	minDate={new Date()}
	maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
/>
```

### With Validation

```svelte
<DateRange
	label="Travel Dates"
	bind:startDate
	bind:endDate
	helpText="Select check-in and check-out dates"
	errorText={!startDate ? 'Required' : ''}
/>
```

## Notes

- Displays dual calendars for easy range selection
- Click start date, then end date to select range
- Range is highlighted between selected dates
- Hover preview shows potential range selection
