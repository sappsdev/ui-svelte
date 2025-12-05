## Tabs Component

Organize content into different sections that users can navigate between.

```svelte
<Tabs
  tabs={tabs}
  variant="muted"
  position="top"
  pill={false}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `tabs` | `[]` | Array of tab items (required) |
| `position` | `'top'` | `top` `bottom` `start` `end` |
| `variant` | `'muted'` | `primary` `secondary` `muted` `outlined` `line` `ghost` |
| `pill` | `false` | Pill-shaped tabs |
| `class` | - | Custom CSS classes |
| `tabListClass` | - | Tab list CSS classes |
| `tabClass` | - | Individual tab CSS classes |
| `tabContentClass` | - | Tab content CSS classes |

### Tab Type

| Prop | Type | Required |
|------|------|----------|
| `id` | `string` | Yes |
| `label` | `string` | Yes |
| `icon` | `IconName` | No |
| `content` | `Snippet \| string` | Yes |

### Common Patterns

```svelte
<!-- Basic Tabs -->
<script>
  const tabs = [
    { id: '1', label: 'Tab 1', content: 'Content for Tab 1' },
    { id: '2', label: 'Tab 2', content: 'Content for Tab 2' },
    { id: '3', label: 'Tab 3', content: 'Content for Tab 3' }
  ];
</script>

<Tabs {tabs} />

<!-- With Icons -->
<script>
  const tabs = [
    { 
      id: '1', 
      label: 'Home', 
      icon: 'fluent:home-24-regular',
      content: 'Home content' 
    },
    { 
      id: '2', 
      label: 'Profile', 
      icon: 'fluent:person-24-regular',
      content: 'Profile content' 
    },
    { 
      id: '3', 
      label: 'Settings', 
      icon: 'fluent:settings-24-regular',
      content: 'Settings content' 
    }
  ];
</script>

<Tabs {tabs} />

<!-- With Snippet Content -->
<script>
  const tabs = [
    { id: '1', label: 'Tab 1', content: content1 },
    { id: '2', label: 'Tab 2', content: content2 },
    { id: '3', label: 'Tab 3', content: content3 }
  ];
</script>

{#snippet content1()}
  <div>
    <h3>Rich Content</h3>
    <p>HTML content for Tab 1</p>
  </div>
{/snippet}

{#snippet content2()}
  <div>
    <h3>More Content</h3>
    <p>HTML content for Tab 2</p>
  </div>
{/snippet}

{#snippet content3()}
  <div>
    <h3>Even More</h3>
    <p>HTML content for Tab 3</p>
  </div>
{/snippet}

<Tabs {tabs} />

<!-- Different Positions -->
<Tabs {tabs} position="bottom" />
<Tabs {tabs} position="start" />
<Tabs {tabs} position="end" />

<!-- Different Variants -->
<Tabs {tabs} variant="primary" />
<Tabs {tabs} variant="line" />
<Tabs {tabs} variant="ghost" />
<Tabs {tabs} variant="outlined" pill />

<!-- Pill Style -->
<Tabs {tabs} pill />
```

**For LLMs**: Tabs organize content into switchable sections. Each tab needs `id`, `label`, and `content` (string or Snippet for rich HTML). `position` controls tab placement: `top` (default), `bottom`, `start` (left), `end` (right). Variants: `primary`, `secondary`, `muted`, `outlined`, `line`, `ghost`. Use `pill` for rounded tabs. Optional icons per tab. Content can be simple strings or Svelte snippets for complex layouts.

---

## Quick Hierarchy Reference
```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (Tabs, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
