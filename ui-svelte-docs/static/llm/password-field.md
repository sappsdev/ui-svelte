## PasswordField Component

Password input with strength indicator and visibility toggle.

```svelte
<PasswordField
  bind:value
  placeholder="Enter password"
  name="password"
  label="Password"
  helpText=""
  errorText=""
  variant="soft"
  color="primary"
  inputSize="medium"
  labelOutside={false}
  labels={{
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong'
  }}
  onchange={handleChange}
  oninput={handleInput}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `value` | - | Password value (bindable) |
| `placeholder` | - | Placeholder text |
| `name` | - | Form field name |
| `label` | - | Label text |
| `helpText` | - | Help message |
| `errorText` | - | Error message |
| `variant` | `'soft'` | `solid` `outlined` `soft` `line` |
| `color` | `'primary'` | `primary` `secondary` `muted` |
| `inputSize` | `'medium'` | `small` `medium` `large` |
| `labelOutside` | `false` | Label outside input |
| `labels` | - | Custom strength labels |
| `onchange` | - | Handler `(value: string) => void` |
| `oninput` | - | Handler `(value: string) => void` |

### Strength Calculation

Password strength is calculated based on:
- Length (8+ chars, 12+ chars)
- Lowercase letters
- Uppercase letters
- Numbers
- Special characters

### Common Patterns

```svelte
<!-- Basic -->
<PasswordField bind:value label="Password" />

<!-- With Validation -->
<PasswordField 
  bind:value 
  label="Password" 
  errorText={value.length < 8 ? 'Min 8 characters' : ''}
/>

<!-- Custom Labels -->
<PasswordField 
  bind:value 
  label="Password"
  labels={{
    weak: 'Too weak',
    medium: 'Getting better',
    strong: 'Excellent!'
  }}
/>

<!-- Form Integration -->
<PasswordField 
  bind:value 
  name="password" 
  label="Password"
  labelOutside
/>
```

**For LLMs**: PasswordField for password input with strength indicator. Shows visual strength bars (weak/medium/strong). Includes eye icon to toggle visibility. Automatically calculates strength based on length, character types. Use for signup/password change forms.
