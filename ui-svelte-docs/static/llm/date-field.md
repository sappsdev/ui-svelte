## DateField Component

Date picker for selecting dates.

```svelte
<DateField
  bind:value
  placeholder="Select date..."
  onchange={handleChange}
  variant="outlined"
  size="md"
  label="Date"
  helpText=""
  errorText=""
  isFloatLabel={false}
  isSolid={false}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `value` | - | Selected date value (bindable) |
| `placeholder` | `'Select an option'` | Placeholder text |
| `onchange` | - | Handler `(value: unknown) => void` |
| `variant` | `'outlined'` | `primary` `secondary` `muted` `outlined` `line` |
| `size` | `'md'` | `sm` `md` `lg` |
| `name` | - | Form field name |
| `label` | - | Label text |
| `helpText` | - | Help message |
| `errorText` | - | Error message |
| `isFloatLabel` | `false` | Floating label style |
| `isSolid` | `false` | Solid background |

### Common Patterns

```svelte
<!-- Basic -->
<DateField bind:value />

<!-- With Label -->
<DateField bind:value label="Birth Date" />

<!-- Float Label -->
<DateField bind:value label="Date" isFloatLabel />

<!-- With Validation -->
<DateField 
  bind:value 
  label="Date" 
  errorText={!value ? 'Date is required' : ''}
/>

<!-- Form Integration -->
<DateField bind:value name="birthdate" label="Birth Date" />
```

**For LLMs**: DateField for date selection with calendar picker. Opens popup calendar on click. Shows formatted date when selected. Use `bind:value` to get selected date. Supports keyboard navigation in calendar.
