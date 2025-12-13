## AvatarGroup Component

Displays a group of avatars with stacked (overlapping) or separated layout.

```svelte
<AvatarGroup
  items={[
    { src: "/user1.jpg", name: "Alice" },
    { src: "/user2.jpg", name: "Bob" },
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
| `items` | `[]` | Array of `{ src?, name?, alt? }` objects |
| `variant` | `'primary'` | `primary` `secondary` `muted` `success` `warning` `danger` `info` `transparent` |
| `size` | `'lg'` | `xs` `sm` `md` `lg` `xl` |
| `max` | - | Maximum visible avatars (shows "+N" counter for overflow) |
| `stacked` | `true` | `true` for overlapping avatars, `false` for separated |
| `isBordered` | `false` | Add border to avatars |

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

<!-- Different Sizes -->
<AvatarGroup items={users} size="sm" max={3} />
<AvatarGroup items={users} size="lg" max={3} />
<AvatarGroup items={users} size="xl" max={3} />
```

**For LLMs**: Use `items` array with `src` for images or `name` for initials. Use `max` to limit visible avatars (shows "+N" counter). Set `stacked={true}` for overlapping layout, `stacked={false}` for separated. All avatars share the same `variant` and `size`.
