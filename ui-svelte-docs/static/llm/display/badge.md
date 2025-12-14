## Badge Component

Status indicator overlay for UI elements like avatars and cards.

```svelte
<Badge
  text="5"
  variant="primary"
  position="top-right"
>
  <Avatar src="/user.jpg" alt="User" />
</Badge>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `text` | - | Badge content (required) |
| `children` | - | Element to overlay (Snippet) |
| `variant` | `'primary'` | `primary` `secondary` `muted` `success` `info` `warning` `danger` |
| `position` | `'top-right'` | `top-left` `top-right` `bottom-left` `bottom-right` |
| `class` | - | Custom CSS class |

### Examples

```svelte
<!-- Notification count on Avatar -->
<Badge text="5" variant="danger">
  <Avatar src="/user.jpg" alt="User" />
</Badge>

<!-- Status on Avatar -->
<Badge text="New" variant="success">
  <Avatar name="John Doe" />
</Badge>

<!-- Messages on Card -->
<Badge text="3" variant="info">
  <Card>
    <p>Inbox</p>
  </Card>
</Badge>

<!-- Sale tag on product -->
<Badge text="Sale" variant="danger" position="top-left">
  <Card cover="/product.jpg" hasOverlay>
    <h4>Product Name</h4>
  </Card>
</Badge>

<!-- Pricing "Most Popular" -->
<Badge text="Most Popular" variant="primary">
  <Card variant="primary">
    <h4>Pro Plan</h4>
    <p>$29/mo</p>
  </Card>
</Badge>
```

**For LLMs**: Use `text` for the badge label. Common variants: `danger` (notifications), `success` (new/pro status), `info` (counts). Wrap any component as children—works best with Avatar and Card.
