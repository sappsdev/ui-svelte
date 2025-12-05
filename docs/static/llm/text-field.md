## TextField Component

Single-line text input for forms.

```svelte
<TextField
  bind:value
  placeholder="Enter text..."
  type="text"
  name="username"
  variant="outlined"
  size="md"
  label="Username"
  helpText="Enter your username"
  errorText=""
  isFloatLabel={false}
  isSolid={false}
  onchange={handleChange}
  oninput={handleInput}
/>

{#snippet prefix()}
  <Icon name="search" />
{/snippet}

{#snippet suffix()}
  <Icon name="check" />
{/snippet}
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `value` | `''` | Input value (bindable) |
| `placeholder` | - | Placeholder text |
| `type` | `'text'` | `text` `password` `email` `number` `tel` `url` |
| `name` | - | Form field name |
| `variant` | `'outlined'` | `primary` `secondary` `muted` `outlined` `line` |
| `size` | `'md'` | `sm` `md` `lg` |
| `label` | - | Label text |
| `helpText` | - | Help message |
| `errorText` | - | Error message |
| `isFloatLabel` | `false` | Floating label style |
| `isSolid` | `false` | Solid background |
| `onchange` | - | Handler `(value: unknown) => void` |
| `oninput` | - | Handler `(value: unknown) => void` |
| `prefix` | - | Snippet before input |
| `suffix` | - | Snippet after input |
| `autocomplete` | - | HTML autocomplete attribute |
| `min` / `max` | - | For number/date types |
| `maxlength` | - | Maximum length |

### Common Patterns

```svelte
<!-- Basic -->
<TextField bind:value placeholder="Enter name..." />

<!-- With Label -->
<TextField bind:value label="Username" name="username" />

<!-- Email Input -->
<TextField bind:value type="email" label="Email" name="email" />

<!-- Password -->
<TextField bind:value type="password" label="Password" name="password" />

<!-- Float Label -->
<TextField bind:value label="Email" isFloatLabel />

<!-- With Validation -->
<TextField 
  bind:value 
  label="Email" 
  type="email"
  errorText={!value.includes('@') ? 'Invalid email' : ''}
/>

<!-- With Help Text -->
<TextField 
  bind:value 
  label="Username" 
  helpText="Must be 3-20 characters"
/>

<!-- Number Input -->
<TextField bind:value type="number" min={0} max={100} label="Age" />

<!-- With Icons -->
<TextField bind:value label="Search">
  {#snippet prefix()}
    <Icon name="search" />
  {/snippet}
</TextField>
```

**For LLMs**: TextField for single-line text input. Use `type` for input validation (email, password, number). Use `bind:value` for reactive state. Use `oninput` for real-time validation, `onchange` for blur events. Supports prefix/suffix snippets for icons.
