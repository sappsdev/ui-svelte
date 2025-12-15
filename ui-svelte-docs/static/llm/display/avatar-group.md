## AvatarGroup Component

Displays a group of avatars with stacked (overlapping) or separated layout.

```svelte
<AvatarGroup
  items={[
    { src: "/user1.jpg", name: "Alice", href: "/profile/1" },
    { src: "/user2.jpg", name: "Bob", onclick: () => {} },
    { name: "Carol Davis" }
  ]}
  variant="primary"
  size="lg"
  max={4}
  stacked={true}
  isBordered={false}
/>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `items` | `[]` | Array of `{ src?, name?, alt?, href?, onclick?, target? }` objects |
| `variant` | `'primary'` | `primary` `secondary` `muted` `success` `warning` `danger` `info` `transparent` |
| `size` | `'lg'` | `xs` `sm` `md` `lg` `xl` |
| `max` | - | Maximum visible avatars (shows "+N" counter for overflow) |
| `stacked` | `true` | `true` for overlapping avatars, `false` for separated |
| `isBordered` | `false` | Add border to avatars |

### AvatarItem Properties

| Property | Description |
|----------|-------------|
| `src` | Image URL |
| `name` | Fallback initials (first letter) |
| `alt` | Image alt text |
| `href` | Link URL (makes avatar clickable as anchor) |
| `onclick` | Click handler (makes avatar clickable as button) |
| `target` | Link target: `_self` `_blank` `_parent` `_top` |

### Examples

```svelte
<!-- Stacked (Overlapping) -->
<AvatarGroup
  items={users}
  max={4}
  stacked={true}
/>

<!-- Separated -->
<AvatarGroup
  items={users}
  max={4}
  stacked={false}
/>

<!-- With Names Only -->
<AvatarGroup
  items={[
    { name: "Alice Brown" },
    { name: "Bob Smith" },
    { name: "Carol Davis" }
  ]}
  variant="secondary"
/>

<!-- Clickable Avatars -->
<AvatarGroup
  items={[
    { src: "/user1.jpg", name: "Alice", href: "/profile/1" },
    { src: "/user2.jpg", name: "Bob", onclick: () => openProfile('bob') },
    { src: "/user3.jpg", name: "Carol", href: "/profile/3", target: "_blank" }
  ]}
  max={3}
/>

<!-- Different Sizes -->
<AvatarGroup items={users} size="sm" max={3} />
<AvatarGroup items={users} size="lg" max={3} />
<AvatarGroup items={users} size="xl" max={3} />
```

**For LLMs**: Use `items` array with `src` for images or `name` for initials. Add `href` or `onclick` to make individual avatars interactive. Use `max` to limit visible avatars (shows "+N" counter). Set `stacked={true}` for overlapping layout, `stacked={false}` for separated. All avatars share the same `variant` and `size`.

