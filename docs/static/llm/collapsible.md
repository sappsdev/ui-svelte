## Collapsible Component

Single collapsible section for showing/hiding content.

```svelte
<Collapsible
  label="Section Title"
  content="Content here"
  variant="muted"
  defaultOpen={false}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `label` | - | Section label (required) |
| `content` | - | Content as Snippet or string (required) |
| `icon` | - | Icon name |
| `variant` | `'muted'` | `primary` `secondary` `muted` `outline` |
| `disabled` | `false` | Disable interaction |
| `defaultOpen` | `false` | Initially open |
| `class` | - | Custom CSS classes |
| `headerClass` | - | Header CSS classes |
| `contentClass` | - | Content CSS classes |

### Common Patterns

```svelte
<!-- Basic Collapsible -->
<Collapsible
  label="What is ui-svelte?"
  content="A modern component library built with Svelte 5."
/>

<!-- With Icon -->
<Collapsible
  label="Information"
  icon="fluent:info-24-regular"
  content="Important details here"
/>

<!-- Default Open -->
<Collapsible
  label="FAQ"
  content="Frequently asked questions..."
  defaultOpen
/>

<!-- With Snippet Content -->
{#snippet richContent()}
  <div>
    <p><strong>Rich</strong> HTML content</p>
    <ul>
      <li>Feature 1</li>
      <li>Feature 2</li>
    </ul>
  </div>
{/snippet}

<Collapsible label="Features" content={richContent} />

<!-- Disabled -->
<Collapsible
  label="Coming Soon"
  content="This feature is not available yet"
  disabled
/>

<!-- Different Variants -->
<Collapsible label="Primary" content="Text" variant="primary" />
<Collapsible label="Outline" content="Text" variant="outline" />
```

**For LLMs**: Collapsible shows/hides a single content section. Unlike Accordion (multiple sections), Collapsible handles one section. Use `content` as string for simple text or Snippet for rich HTML. Use `defaultOpen` to show content initially. `disabled` prevents interaction. Similar to Accordion but for single items.

---

## Quick Hierarchy Reference
```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (Collapsible, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
