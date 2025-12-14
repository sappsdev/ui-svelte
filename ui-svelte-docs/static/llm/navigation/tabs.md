## Tabs Component

Navigation component for organizing content into switchable sections.

```svelte
<Tabs
  tabs={[]}
  variant="muted"
  position="top"
  pill={false}
  rootClass=""
  tabListClass=""
  tabClass=""
  tabContentClass=""
/>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `tabs` | `[]` | Array of Tab objects (required) |
| `variant` | `'muted'` | `primary` `secondary` `muted` `outline` `line` `ghost` |
| `position` | `'top'` | `top` `bottom` `start` `end` |
| `pill` | `false` | Rounded pill style |
| `rootClass` | - | Root container styles |
| `tabListClass` | - | Tab list styles |
| `tabClass` | - | Individual tab styles |
| `tabContentClass` | - | Content area styles |

### Tab Type

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier (required) |
| `label` | `string` | Tab label (required) |
| `content` | `Snippet \| string` | Tab content (required) |

### Examples

```svelte
<!-- Basic with String Content -->
<script lang="ts">
  const tabs = [
    { id: '1', label: 'Tab 1', content: 'Content 1' },
    { id: '2', label: 'Tab 2', content: 'Content 2' }
  ];
</script>

<Tabs {tabs} />

<!-- With Snippet Content -->
{#snippet content1()}
  <p>Rich content with components</p>
{/snippet}

{#snippet content2()}
  <p>More content here</p>
{/snippet}

<script lang="ts">
  const tabs = [
    { id: '1', label: 'Tab 1', content: content1 },
    { id: '2', label: 'Tab 2', content: content2 }
  ];
</script>

<Tabs {tabs} />

<!-- Variant & Position -->
<Tabs {tabs} variant="primary" position="start" />

<!-- Pill Style -->
<Tabs {tabs} variant="secondary" pill />
```

**For LLMs**: Tabs organize content into switchable sections. Use `tabs` array with `id`, `label`, and `content`. Content can be string or Snippet for rich content. Use `position` for tab placement, `variant` for styling.
