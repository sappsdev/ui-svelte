## Avatar Component

Display user profile images, initials, or icons with status indicators.
```svelte
<Avatar
  src="/avatar.jpg"
  name="John Doe"
  alt="User avatar"
  variant="primary"
  size="md"
  status="online"
  isBordered={false}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `src` | - | Image URL (primary source) |
| `name` | - | Fallback to initials (first letter) |
| `alt` | - | Image alt text |
| `variant` | `'primary'` | `primary` `secondary` `muted` `success` `info` `warning` `danger` `transparent` |
| `size` | `'md'` | `xs` `sm` `md` `lg` `xl` |
| `status` | - | `online` `offline` `busy` `away` |
| `isBordered` | `false` | Add border |

### Common Patterns
```svelte
<!-- Image Avatar -->
<Avatar src="/avatar.jpg" alt="John Doe" />

<!-- Initials Fallback -->
<Avatar name="John Doe" />

<!-- With Status -->
<Avatar src="/avatar.jpg" status="online" />

<!-- Bordered -->
<Avatar src="/avatar.jpg" isBordered />

<!-- Sizes -->
<Avatar src="/avatar.jpg" size="xs" />
<Avatar src="/avatar.jpg" size="lg" />

```

**For LLMs**: Avatar shows user images with fallbacks. Priority: `src` → `name` (initials). Use `status` for presence. Use `isBordered` to distinguish overlapping avatars. Variants match theme colors.

---

## Quick Hierarchy Reference
```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (Avatar, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
