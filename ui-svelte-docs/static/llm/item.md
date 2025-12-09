## Item Component

Display list items with avatars, icons, descriptions, and actions.

```svelte
<Item
  label="John Doe"
  description="Designer at Company"
  src="/avatar.jpg"
  variant="ghost"
  size="md"
  status="online"
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `label` | - | Item label (required) |
| `id` | - | Unique identifier |
| `description` | - | Secondary text |
| `icon` | - | Icon name |
| `src` | - | Avatar image URL |
| `variant` | `'ghost'` | `ghost` `outline` `surface` `primary` `secondary` `soft` |
| `size` | `'md'` | `sm` `md` `lg` |
| `status` | - | `online` `offline` `busy` `away` |
| `href` | - | Link URL |
| `isDisabled` | `false` | Disable interaction |
| `isActive` | `false` | Selected/active state |
| `isCompact` | `false` | Compact spacing |
| `hasDivider` | `false` | Bottom divider |
| `hasShadow` | `false` | Drop shadow |
| `isSolid` | `false` | Solid background |
| `onclick` | - | Click handler `(id) => void` |
| `actions` | - | Snippet for action buttons |

### Common Patterns

```svelte
<!-- Basic Item -->
<Item label="John Doe" />

<!-- With Avatar -->
<Item label="Jane Smith" src="/avatar.jpg" />

<!-- With Icon -->
<Item label="Settings" icon="fluent:settings-24-regular" />

<!-- With Description -->
<Item
  label="John Doe"
  description="Designer at Company"
  src="/avatar.jpg"
/>

<!-- With Status -->
<Item
  label="Alice"
  src="/avatar.jpg"
  status="online"
/>

<!-- As Link -->
<Item
  label="Profile"
  description="View your profile"
  href="/profile"
/>

<!-- Active/Selected -->
<Item
  label="Dashboard"
  icon="fluent:home-24-regular"
  isActive
/>

<!-- With Actions -->
<Item
  label="Document.pdf"
  description="2.5 MB"
  onclick={(id) => console.log('Clicked:', id)}
>
  {#snippet actions()}
    <Button variant="ghost" size="sm">Edit</Button>
    <Button variant="ghost" size="sm">Delete</Button>
  {/snippet}
</Item>

<!-- Compact List -->
<Item label="Item 1" isCompact hasDivider />
<Item label="Item 2" isCompact hasDivider />
<Item label="Item 3" isCompact />

<!-- Different Sizes -->
<Item label="Small" size="sm" src="/avatar.jpg" />
<Item label="Medium" size="md" src="/avatar.jpg" />
<Item label="Large" size="lg" src="/avatar.jpg" />
```

**For LLMs**: Item displays list entries with optional avatar/icon, description, and actions. Use `src` for avatar or `icon` for icon (not both). `status` adds presence indicator. Use `href` for navigation or `onclick` for interactions. `actions` snippet adds custom buttons. `isActive` highlights selected items. `isCompact` reduces spacing. `hasDivider` adds separator. Versatile for lists, navigation, contacts, files, etc.

---

## Quick Hierarchy Reference
```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (Item, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
