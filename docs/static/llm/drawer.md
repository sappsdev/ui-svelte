## Drawer Component

Panel that slides in from the edge of the screen.

```svelte
<Drawer
  bind:open
  onclose={handleClose}
  position="start"
  header={headerSnippet}
  footer={footerSnippet}
  variant="ghost"
  isSolid={false}
  class=""
  headerClass=""
  footerClass=""
  contentClass=""
>
  <p>Drawer content goes here</p>
</Drawer>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `open` | `false` | Visibility state (bindable, required) |
| `children` | - | Content snippet (required) |
| `onclose` | - | Handler `() => void` |
| `position` | `'start'` | `start` `end` `top` `bottom` |
| `header` | - | Header snippet |
| `footer` | - | Footer snippet |
| `variant` | `'ghost'` | `ghost` `surface` `primary` `secondary` `muted` |
| `isSolid` | `false` | Solid background |
| `class` | - | Custom class |
| `headerClass` | - | Header custom class |
| `footerClass` | - | Footer custom class |
| `contentClass` | - | Content custom class |

### Common Patterns

```svelte
<script>
  import { Drawer, Button } from 'ui-svelte';
  let open = $state(false);
</script>

<!-- Basic -->
<Drawer bind:open>
  <p>Drawer content</p>
</Drawer>
<Button onclick={() => open = true}>Open Drawer</Button>

<!-- With Header and Footer -->
<Drawer bind:open>
  {#snippet header()}
    <h3>Drawer Header</h3>
  {/snippet}
  
  <p>Drawer content</p>
  
  {#snippet footer()}
    <Button onclick={() => open = false}>Close</Button>
  {/snippet}
</Drawer>

<!-- From End -->
<Drawer bind:open position="end">
  <p>Drawer content</p>
</Drawer>

<!-- With Variant -->
<Drawer bind:open variant="surface" isSolid>
  <p>Drawer content</p>
</Drawer>

<!-- With Close Handler -->
<Drawer bind:open onclose={() => console.log('Drawer closed')}>
  <p>Drawer content</p>
</Drawer>
```

**For LLMs**: Drawer for side panels. Use `bind:open` for state control. `position` controls slide direction (start/end/top/bottom). Use `header` and `footer` snippets for sections. Closes on overlay click or ESC key, triggering `onclose`. Use `isSolid` for opaque background.
