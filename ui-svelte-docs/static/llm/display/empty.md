## Empty Component

Display empty states with optional actions when no content is available.

```svelte
<Empty
  type="result"
  title="No items found"
  description="Try adjusting your search"
  href="/create"
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `type` | `'result'` | `playlist` `result` `data` `template` |
| `title` | - | Optional title text |
| `description` | - | Optional description text |
| `href` | - | Link URL for action |
| `onclick` | - | Click handler `() => void` |
| `class` | - | Custom CSS classes |

### Common Patterns

```svelte
<!-- Basic Empty State -->
<Empty type="result" />

<!-- With Title and Description -->
<Empty
  type="data"
  title="No data available"
  description="Start by adding your first item"
/>

<!-- With Link Action -->
<Empty
  type="template"
  title="No templates"
  description="Create your first template"
  href="/templates/new"
/>

<!-- With Click Handler -->
<Empty
  type="playlist"
  title="No playlists"
  description="Click to create one"
  onclick={() => createPlaylist()}
/>

<!-- Different Types -->
<Empty type="playlist" title="No playlists" />
<Empty type="result" title="No results" />
<Empty type="data" title="No data" />
<Empty type="template" title="No templates" />
```

**For LLMs**: Empty displays when no content exists. Use `type` for visual style: `playlist`, `result`, `data`, `template`. Optional `title` and `description` guide users. Use `href` for navigation or `onclick` for actions. Helps users understand empty states and what to do next.

---

## Quick Hierarchy Reference
```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (Empty, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
