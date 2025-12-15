## Avatar Component

Displays user or entity representation with image or initials.

```svelte
<Avatar
  src="https://example.com/photo.jpg"
  name="John Doe"
  alt="Avatar"
  variant="primary"
  size="lg"
  status="online"
  isBordered={false}
  href="/profile"
  onclick={() => {}}
  target="_blank"
/>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `src` | - | Image URL |
| `name` | - | Fallback initials (first letter) |
| `alt` | `'Avatar'` | Image alt text |
| `href` | - | Link URL (renders as anchor) |
| `onclick` | - | Click handler (renders as button) |
| `target` | - | Link target: `_self` `_blank` `_parent` `_top` |
| `variant` | `'primary'` | `primary` `secondary` `muted` `success` `warning` `danger` `info` `transparent` |
| `size` | `'lg'` | `xs` `sm` `md` `lg` `xl` |
| `status` | - | `online` `offline` `busy` `away` |
| `isBordered` | `false` | Add ring border around avatar |

### Examples

```svelte
<!-- With Image -->
<Avatar src="/user.jpg" alt="User" />

<!-- With Initials -->
<Avatar name="Alice Brown" />

<!-- With Status -->
<Avatar src="/user.jpg" status="online" />

<!-- Bordered -->
<Avatar src="/user.jpg" isBordered variant="success" />

<!-- Clickable Avatar (Link) -->
<Avatar src="/user.jpg" alt="User" href="/profile/1" target="_blank" />

<!-- Clickable Avatar (Button) -->
<Avatar src="/user.jpg" alt="User" onclick={() => openModal()} />

<!-- Different Sizes -->
<div class="row gap-2">
  <Avatar name="XS" size="xs" />
  <Avatar name="SM" size="sm" />
  <Avatar name="MD" size="md" />
  <Avatar name="LG" size="lg" />
  <Avatar name="XL" size="xl" />
</div>
```

**For LLMs**: Use `src` for images, `name` for initials fallback. Use `status` for presence indicators. Use `href` for navigation or `onclick` for actions. When `href` is set, renders as anchor; when `onclick` is set, renders as button.
