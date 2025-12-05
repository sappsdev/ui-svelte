## Alert Component

Display brief messages for users without interrupting their workflow.

```svelte
<Alert
  title="Alert Title"
  description="Alert message"
  status="info"
  showIcon={true}
  isSolid={false}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `title` | - | Alert title text |
| `description` | - | Alert description text |
| `children` | - | Snippet for custom content |
| `status` | `'info'` | `info` `success` `warning` `danger` |
| `showIcon` | `true` | Display status icon |
| `icon` | - | Custom icon (IconData) |
| `isSolid` | `false` | Solid background style |

### Common Patterns

```svelte
<!-- Basic Alert -->
<Alert title="Success" description="Operation completed successfully" status="success" />

<!-- Without Icon -->
<Alert title="Notice" description="Please review" showIcon={false} />

<!-- Solid Style -->
<Alert title="Error" description="Something went wrong" status="danger" isSolid />

<!-- Custom Icon -->
<Alert title="Custom" description="With custom icon" icon={HeartIcon} />

<!-- With Children (Rich Content) -->
<Alert title="Rich Content" status="info">
  <div>
    <p>Custom HTML content</p>
    <ul>
      <li>Point 1</li>
      <li>Point 2</li>
    </ul>
  </div>
</Alert>

<!-- Warning Alert -->
<Alert title="Warning" description="This action cannot be undone" status="warning" isSolid />
```

**For LLMs**: Alert displays contextual messages. Use `status` for semantic meaning: `info` (neutral), `success` (positive), `warning` (caution), `danger` (error). Use `isSolid` for emphasis. Can use `children` for rich content instead of `description`.

---

## Quick Hierarchy Reference
```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (Alert, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
