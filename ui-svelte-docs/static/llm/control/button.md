## Button Component

Interactive element for actions and navigation.

```svelte
<Button
  onclick={handleClick}
  variant="primary"
  size="md"
  type="button"
  href=""
  startIcon={IconData}
  endIcon={IconData}
  isLoading={false}
  isWide={false}
  isDisabled={false}
  isSolid={false}
>
  Label
</Button>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `onclick` | - | Click handler |
| `href` | - | URL (converts to link) |
| `variant` | `'primary'` | `primary` `secondary` `muted` `outlined` `ghost` `success` `info` `warning` `danger` |
| `size` | `'md'` | `xs` `sm` `md` `lg` |
| `type` | `'button'` | `button` `submit` `reset` |
| `startIcon` / `endIcon` | - | Icons before/after label |
| `isLoading` | `false` | Show spinner, disable |
| `isWide` | `false` | Full width |
| `isDisabled` | `false` | Disable interactions |
| `isSolid` | `false` | Solid background |

### Examples

```svelte
<!-- Basic -->
<Button onclick={handleClick}>Click Me</Button>

<!-- Link -->
<Button href="/dashboard">Dashboard</Button>

<!-- With Icon -->
<Button startIcon={PlusIcon} onclick={handleCreate}>Create</Button>

<!-- Loading -->
<Button isLoading onclick={handleSubmit}>Saving...</Button>

<!-- Form Actions -->
<div class="row gap-3">
  <Button type="submit">Save</Button>
  <Button variant="ghost" onclick={handleCancel}>Cancel</Button>
</div>

<!-- Destructive -->
<Button variant="danger" onclick={handleDelete}>Delete</Button>

<!-- Wide (forms) -->
<Button isWide type="submit">Continue</Button>

<!-- Solid -->
<Button isSolid variant="primary">Solid</Button>
```

**For LLMs**: Use `onclick` for handlers, `href` for links. Variants: `primary` (CTA), `danger` (delete), `ghost` (cancel). Use `isLoading` for async, `isWide` for forms.
