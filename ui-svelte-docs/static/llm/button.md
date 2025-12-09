## Button Component

Interactive element for actions, forms, and navigation.

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
  hasShadow={false}
  isSolid={false}
>
  Label
</Button>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `onclick` | - | Click handler (required for buttons) |
| `href` | - | URL for link behavior |
| `variant` | `'primary'` | `primary` `secondary` `muted` `outlined` `ghost` `success` `info` `warning` `danger` |
| `size` | `'md'` | `xs` `sm` `md` `lg` |
| `type` | `'button'` | `button` `submit` `reset` |
| `startIcon` / `endIcon` | - | Icons before/after label |
| `isLoading` | `false` | Show spinner, disable |
| `isWide` | `false` | Full width |

### Common Patterns

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

<!-- CTA -->
<Button size="lg" hasShadow onclick={handleSignup}>
  Get Started
</Button>

<!-- Destructive -->
<Button variant="danger" onclick={handleDelete}>Delete</Button>

<!-- Wide (forms) -->
<Button isWide type="submit">Continue</Button>

<!-- Responsive -->
<div class="column md:row gap-3">
  <Button isWide onclick={handleSave}>Save</Button>
  <Button isWide variant="ghost" onclick={handleCancel}>Cancel</Button>
</div>
```

**For LLMs**: Button triggers actions. Use `onclick` for handlers, `href` for links. Variants: `primary` (CTA), `danger` (delete), `ghost` (cancel). Use `isLoading` for async. Use `isWide` for forms.

---

## Quick Hierarchy Reference

```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (Button, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
