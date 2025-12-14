## Modal Component

Dialog window that overlays main content.

```svelte
<Modal
  bind:open
  onclose={handleClose}
  header={headerSnippet}
  footer={footerSnippet}
  variant="ghost"
  closeOnOverlay={false}
  hideCloseButton={false}
  isSolid={false}
  class=""
  headerClass=""
  footerClass=""
  contentClass=""
>
  <p>Modal content goes here</p>
</Modal>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `open` | `false` | Visibility state (bindable, required) |
| `children` | - | Content snippet (required) |
| `onclose` | - | Handler `() => void` |
| `header` | - | Header snippet |
| `footer` | - | Footer snippet |
| `variant` | `'ghost'` | `ghost` `surface` `primary` `secondary` `muted` |
| `closeOnOverlay` | `false` | Allow closing by clicking overlay |
| `hideCloseButton` | `false` | Hide default close button |
| `isSolid` | `false` | Solid background |
| `class` | - | Custom class |
| `headerClass` | - | Header custom class |
| `footerClass` | - | Footer custom class |
| `contentClass` | - | Content custom class |

### Common Patterns

```svelte
<script>
  import { Modal, Button } from 'ui-svelte';
  let open = $state(false);
</script>

<!-- Basic -->
<Modal bind:open>
  <p>Modal content</p>
</Modal>
<Button onclick={() => open = true}>Open Modal</Button>

<!-- With Header and Footer -->
<Modal bind:open>
  {#snippet header()}
    <h3>Modal Title</h3>
  {/snippet}
  
  <p>Modal content</p>
  
  {#snippet footer()}
    <div class="flex gap-2 justify-end">
      <Button variant="ghost" onclick={() => open = false}>Cancel</Button>
      <Button onclick={() => open = false}>Confirm</Button>
    </div>
  {/snippet}
</Modal>

<!-- Close on Overlay Click -->
<Modal bind:open closeOnOverlay>
  <p>Click outside to close</p>
</Modal>

<!-- Without Close Button -->
<Modal bind:open hideCloseButton>
  <p>Must use custom close action</p>
  <Button onclick={() => open = false}>Close</Button>
</Modal>

<!-- With Variant -->
<Modal bind:open variant="surface" isSolid>
  <p>Modal content</p>
</Modal>

<!-- With Close Handler -->
<Modal bind:open onclose={() => console.log('Modal closed')}>
  <p>Modal content</p>
</Modal>
```

**For LLMs**: Modal for dialog windows. Use `bind:open` for state control. Use `header` and `footer` snippets for sections. Set `closeOnOverlay` to allow closing by clicking outside. Set `hideCloseButton` to remove default close button. Closes on ESC key, triggering `onclose`. Use `isSolid` for opaque background.
