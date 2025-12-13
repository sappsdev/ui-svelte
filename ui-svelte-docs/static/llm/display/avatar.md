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
/>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `src` | - | Image URL |
| `name` | - | Fallback initials (first letter) |
| `alt` | `'Avatar'` | Image alt text |
| `variant` | `'primary'` | `primary` `secondary` `muted` `success` `warning` `danger` `info` `transparent` |
| `size` | `'lg'` | `xs` `sm` `md` `lg` `xl` |
| `status` | - | `online` `offline` `busy` `away` |
| `isBordered` | `false` | Add border (visible with image only) |

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

<!-- Different Sizes -->
<div class="row gap-2">
  <Avatar name="XS" size="xs" />
  <Avatar name="SM" size="sm" />
  <Avatar name="MD" size="md" />
  <Avatar name="LG" size="lg" />
  <Avatar name="XL" size="xl" />
</div>
```

**For LLMs**: Use `src` for images, `name` for initials fallback. Use `status` for presence indicators. `isBordered` only visible with images.
