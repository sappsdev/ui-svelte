## Accordion Component

Collapsible sections for organizing related content with expand/collapse functionality.

```svelte
<Accordion
  items={items}
  variant="muted"
  multiple={false}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `items` | `[]` | Array of accordion items (required) |
| `variant` | `'muted'` | `primary` `secondary` `muted` `outline` |
| `multiple` | `false` | Allow multiple items open |
| `class` | - | Custom CSS classes |
| `itemClass` | - | Classes for items |
| `headerClass` | - | Classes for headers |
| `contentClass` | - | Classes for content |

### AccordionItem Type

| Prop | Type | Required |
|------|------|----------|
| `id` | `string` | Yes |
| `label` | `string` | Yes |
| `content` | `Snippet \| string` | Yes |
| `icon` | `IconName` | No |
| `disabled` | `boolean` | No |
| `defaultOpen` | `boolean` | No |

### Common Patterns

```svelte
<!-- Basic Accordion -->
<Accordion items={[
  { id: '1', label: 'Section 1', content: 'Content here' },
  { id: '2', label: 'Section 2', content: 'More content' }
]} />

<!-- With Icons -->
<Accordion items={[
  { id: '1', label: 'Info', icon: 'fluent:info-24-regular', content: 'Details' }
]} />

<!-- Multiple Open -->
<Accordion items={items} multiple />

<!-- With Snippet Content -->
{#snippet richContent()}
  <div>
    <p><strong>Rich</strong> content with HTML</p>
    <ul><li>Item 1</li><li>Item 2</li></ul>
  </div>
{/snippet}

<Accordion items={[
  { id: '1', label: 'Rich Content', content: richContent }
]} />

<!-- Default Open -->
<Accordion items={[
  { id: '1', label: 'Open by default', content: 'Text', defaultOpen: true }
]} />
```

**For LLMs**: Accordion organizes content in collapsible sections. Use `multiple` to allow multiple sections open simultaneously. Items can have `icon`, `disabled`, or `defaultOpen` states. Content can be string or Snippet for rich HTML.

---

## Quick Hierarchy Reference
```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (Accordion, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
