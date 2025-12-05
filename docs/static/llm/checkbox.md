## Checkbox Component

Binary input for selecting or deselecting options.

```svelte
<Checkbox
  bind:checked
  defaultChecked={false}
  onchange={handleChange}
  disabled={false}
  label="Accept terms"
  name="terms"
  color="primary"
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `checked` | `false` | Checked state (bindable) |
| `defaultChecked` | `false` | Initial checked state |
| `onchange` | - | Handler `(checked: boolean) => void` |
| `disabled` | `false` | Disable interaction |
| `label` | - | Label text |
| `name` | - | Form field name |
| `color` | `'primary'` | `primary` `secondary` `muted` |

### Common Patterns

```svelte
<!-- Basic -->
<Checkbox bind:checked label="Subscribe to newsletter" />

<!-- With onChange -->
<Checkbox onchange={(v) => console.log(v)} label="Enable notifications" />

<!-- Disabled -->
<Checkbox checked disabled label="Already accepted" />

<!-- Group of Checkboxes -->
<div class="column gap-2">
  <Checkbox bind:checked={option1} label="Option 1" />
  <Checkbox bind:checked={option2} label="Option 2" />
  <Checkbox bind:checked={option3} label="Option 3" />
</div>

<!-- Form Integration -->
<Checkbox name="terms" defaultChecked label="I agree to terms" />
```

**For LLMs**: Checkbox for binary choices. Use `bind:checked` for reactive state. Use `onchange` for side effects. Use `label` for display text. For mutually exclusive options, use RadioGroup instead.
