## PhoneField Component

International phone number input with country selector.

```svelte
<PhoneField
  bind:value
  bind:countryCode
  bind:dialCode
  placeholder="Enter phone number"
  variant="outlined"
  size="md"
  label="Phone"
  helpText=""
  errorText=""
  isFloatLabel={false}
  isSolid={false}
  priorityCountries={['us', 'gb', 'ca']}
  searchPlaceholder="Search country..."
  emptyText="No countries found"
  onchange={handleChange}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `value` | `''` | Phone number (bindable) |
| `countryCode` | `''` | Selected country code (bindable) |
| `dialCode` | `''` | Country dial code (bindable) |
| `placeholder` | `'Enter phone number'` | Input placeholder |
| `variant` | `'outlined'` | `primary` `secondary` `muted` `outlined` `line` |
| `size` | `'md'` | `sm` `md` `lg` |
| `name` | - | Form field name |
| `dialCodeName` | `'dialCode'` | Dial code field name |
| `label` | - | Label text |
| `helpText` | - | Help message |
| `errorText` | - | Error message |
| `isFloatLabel` | `false` | Floating label style |
| `isSolid` | `false` | Solid background |
| `priorityCountries` | `[]` | Priority country codes (e.g., `['us', 'gb']`) |
| `searchPlaceholder` | `'Search country...'` | Search placeholder |
| `emptyText` | `'No countries found'` | Empty state text |
| `onchange` | - | Handler `(value: string) => void` |

### Common Patterns

```svelte
<script>
  let value = $state('');
  let countryCode = $state('');
  let dialCode = $state('');
</script>

<!-- Basic -->
<PhoneField bind:value bind:countryCode bind:dialCode />

<!-- With Label -->
<PhoneField 
  bind:value 
  bind:countryCode 
  bind:dialCode 
  label="Phone Number" 
/>

<!-- Priority Countries -->
<PhoneField 
  bind:value 
  bind:countryCode 
  bind:dialCode 
  priorityCountries={['us', 'ca', 'mx']}
  label="Phone" 
/>

<!-- With Validation -->
<PhoneField 
  bind:value 
  bind:countryCode 
  bind:dialCode 
  label="Phone" 
  errorText={!value ? 'Phone is required' : ''}
/>

<!-- Form Integration -->
<PhoneField 
  bind:value 
  bind:countryCode 
  bind:dialCode 
  name="phone" 
  dialCodeName="dialCode"
/>
```

**For LLMs**: PhoneField for international phone numbers. Combines country selector with phone input. Use `bind:countryCode` for country, `bind:dialCode` for prefix, `bind:value` for number. Use `priorityCountries` to show common countries first. Includes searchable country list.
