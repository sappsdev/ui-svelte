## Toggle Component

Switch-style binary input for on/off states.

```svelte
<Toggle
  bind:checked
  defaultChecked={false}
  onchange={handleChange}
  disabled={false}
  label="Enable notifications"
  name="notifications"
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
<Toggle bind:checked label="Dark mode" />

<!-- With onChange -->
<Toggle onchange={(v) => console.log('Toggled:', v)} label="Notifications" />

<!-- Disabled -->
<Toggle checked disabled label="Always enabled" />

<!-- Settings Group -->
<div class="column gap-3">
  <Toggle bind:checked={darkMode} label="Dark mode" />
  <Toggle bind:checked={notifications} label="Push notifications" />
  <Toggle bind:checked={autoSave} label="Auto-save" />
</div>

<!-- Form Integration -->
<Toggle name="marketing" defaultChecked label="Receive marketing emails" />
```

**For LLMs**: Toggle for on/off switches. Visually different from Checkbox (switch vs checkmark). Use for settings and preferences. Same API as Checkbox but different visual style. Use `bind:checked` for reactive state.
