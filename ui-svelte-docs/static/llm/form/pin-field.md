## PinField Component

Multi-digit PIN/OTP input with auto-focus.

```svelte
<PinField
  bind:values
  length={6}
  type="text"
  name="pin"
  label="Enter PIN"
  helpText="Enter 6-digit code"
  errorText=""
  variant="soft"
  color="primary"
  inputSize="medium"
  oncomplete={handleComplete}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `values` | `[]` | Array of digit values (bindable) |
| `length` | `6` | Number of digits |
| `type` | `'text'` | `text` `password` `number` |
| `name` | - | Form field name |
| `label` | - | Label text |
| `helpText` | - | Help message |
| `errorText` | - | Error message |
| `variant` | `'soft'` | `solid` `outlined` `soft` `line` |
| `color` | `'primary'` | `primary` `secondary` `muted` |
| `inputSize` | `'medium'` | `small` `medium` `large` |
| `oncomplete` | - | Handler `(value: string) => void` |

### Common Patterns

```svelte
<script>
  let values = $state(Array(6).fill(''));
  
  const handleComplete = (pin) => {
    console.log('PIN entered:', pin);
    // Verify PIN
  };
</script>

<!-- Basic 6-digit PIN -->
<PinField bind:values oncomplete={handleComplete} />

<!-- 4-digit PIN -->
<PinField bind:values length={4} label="PIN" oncomplete={handleComplete} />

<!-- Password Type (hidden) -->
<PinField bind:values type="password" label="PIN" oncomplete={handleComplete} />

<!-- OTP Code -->
<PinField 
  bind:values 
  length={6} 
  label="Verification Code"
  helpText="Enter code from email"
  oncomplete={handleComplete}
/>

<!-- With Validation -->
<PinField 
  bind:values 
  label="PIN" 
  errorText={values.some(v => !v) ? 'Complete all digits' : ''}
  oncomplete={handleComplete}
/>
```

**For LLMs**: PinField for PIN/OTP input. Creates separate input for each digit. Auto-focuses next input on entry. Supports backspace navigation. Paste support for full code. Use `oncomplete` callback when all digits entered. Good for 2FA, PIN codes, verification codes.
