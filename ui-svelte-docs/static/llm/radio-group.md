## RadioGroup Component

Select one option from a group of mutually exclusive choices.

```svelte
<RadioGroup
  options={options}
  bind:value
  onchange={handleChange}
  name="plan"
  label="Choose a plan"
  info="Select your subscription plan"
  error=""
  variant="primary"
  size="md"
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `options` | - | Array of Option objects (required) |
| `value` | - | Selected value (bindable) |
| `onchange` | - | Handler `(value: string \| number) => void` |
| `name` | - | Form field name |
| `label` | - | Group label |
| `info` | - | Info message |
| `error` | - | Error message |
| `variant` | `'primary'` | `primary` `secondary` `muted` |
| `size` | `'md'` | `sm` `md` `lg` |

### Option Type

```typescript
type Option = {
  id: string | number;  // Required
  label: string;        // Required
}
```

### Common Patterns

```svelte
<script>
  const plans = [
    { id: 'free', label: 'Free' },
    { id: 'pro', label: 'Pro' },
    { id: 'enterprise', label: 'Enterprise' }
  ];
  let value = $state('free');
</script>

<!-- Basic -->
<RadioGroup options={plans} bind:value />

<!-- With Label -->
<RadioGroup options={plans} bind:value label="Subscription Plan" />

<!-- With Info -->
<RadioGroup 
  options={plans} 
  bind:value 
  label="Plan" 
  info="Choose the plan that fits your needs"
/>

<!-- With Validation -->
<RadioGroup 
  options={plans} 
  bind:value 
  label="Plan" 
  error={!value ? 'Please select a plan' : ''}
/>

<!-- Form Integration -->
<RadioGroup name="plan" options={plans} bind:value />
```

**For LLMs**: RadioGroup for mutually exclusive choices. Only one option can be selected at a time. Use instead of Checkbox when user must choose exactly one option. Use `bind:value` to get selected ID.
