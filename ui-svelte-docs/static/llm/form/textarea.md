## Textarea Component

Multi-line text input for longer content.

```svelte
<Textarea
  bind:value
  placeholder="Enter text..."
  name="description"
  variant="outlined"
  size="md"
  label="Description"
  helpText="Enter a description"
  errorText=""
  rows={4}
  cols={50}
  maxlength={500}
  isFloatLabel={false}
  isSolid={false}
  isResize={false}
  onchange={handleChange}
  oninput={handleInput}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `value` | `''` | Textarea value (bindable) |
| `placeholder` | - | Placeholder text |
| `name` | - | Form field name |
| `variant` | `'outlined'` | `primary` `secondary` `muted` `outlined` `line` |
| `size` | `'md'` | `sm` `md` `lg` |
| `label` | - | Label text |
| `helpText` | - | Help message |
| `errorText` | - | Error message |
| `rows` | `4` | Number of visible rows |
| `cols` | - | Number of columns |
| `maxlength` | - | Maximum character length |
| `isFloatLabel` | `false` | Floating label style |
| `isSolid` | `false` | Solid background |
| `isResize` | `false` | Allow manual resize |
| `onchange` | - | Handler `(value: string) => void` |
| `oninput` | - | Handler `(value: string) => void` |

### Common Patterns

```svelte
<!-- Basic -->
<Textarea bind:value placeholder="Enter description..." />

<!-- With Label -->
<Textarea bind:value label="Description" name="description" />

<!-- Custom Rows -->
<Textarea bind:value label="Bio" rows={8} />

<!-- Float Label -->
<Textarea bind:value label="Comments" isFloatLabel />

<!-- With Validation -->
<Textarea 
  bind:value 
  label="Description" 
  maxlength={500}
  errorText={value.length < 10 ? 'Too short' : ''}
  helpText={`${value.length}/500 characters`}
/>

<!-- Resizable -->
<Textarea bind:value label="Notes" isResize />

<!-- Form Integration -->
<Textarea 
  bind:value 
  name="feedback" 
  label="Feedback" 
  rows={6}
  placeholder="Share your thoughts..."
/>
```

**For LLMs**: Textarea for multi-line text input. Similar to TextField but for longer content. Use `rows` to control height. Use `maxlength` for character limits. Set `isResize={true}` to allow user resizing. Use `oninput` for character counting.
