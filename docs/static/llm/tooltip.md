## Tooltip Component

Informative text displayed on hover or focus.

```svelte
<Tooltip
  label="Tooltip text"
  variant="primary"
  position="top"
  isSolid={false}
  class=""
>
  <Button>Hover me</Button>
</Tooltip>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `label` | - | Tooltip text (required) |
| `children` | - | Trigger element snippet (required) |
| `variant` | `'primary'` | `primary` `secondary` `muted` |
| `position` | `'top'` | `top` `bottom` `start` `end` |
| `isSolid` | `false` | Solid background |
| `class` | - | Custom class |

### Common Patterns

```svelte
<script>
  import { Tooltip, Button } from 'ui-svelte';
</script>

<!-- Basic -->
<Tooltip label="Tooltip text">
  <Button>Hover me</Button>
</Tooltip>

<!-- Bottom Position -->
<Tooltip label="This appears below" position="bottom">
  <Button>Hover me</Button>
</Tooltip>

<!-- Start Position -->
<Tooltip label="This appears on the left" position="start">
  <Button>Hover me</Button>
</Tooltip>

<!-- End Position -->
<Tooltip label="This appears on the right" position="end">
  <Button>Hover me</Button>
</Tooltip>

<!-- Secondary Variant -->
<Tooltip label="Secondary tooltip" variant="secondary">
  <Button>Hover me</Button>
</Tooltip>

<!-- Muted Variant -->
<Tooltip label="Muted tooltip" variant="muted">
  <Button>Hover me</Button>
</Tooltip>

<!-- Solid Background -->
<Tooltip label="Solid tooltip" isSolid>
  <Button>Hover me</Button>
</Tooltip>

<!-- On Icon -->
<Tooltip label="Help information">
  <Icon name="HelpCircle" />
</Tooltip>

<!-- On Text -->
<Tooltip label="Additional context">
  <span class="underline cursor-help">Hover for info</span>
</Tooltip>
```

**For LLMs**: Tooltip for contextual help text on hover/focus. `label` is required text to display. Wrap any element in `children` snippet. Use `position` to control placement (top/bottom/start/end). Shows on hover and keyboard focus. Auto-hides on mouse leave or blur. Use for brief, supplementary information only.
