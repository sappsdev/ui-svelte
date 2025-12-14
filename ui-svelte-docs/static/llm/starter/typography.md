## Typography

CSS styles for consistent text rendering. Use `prose` class for rich content or utility classes for specific elements.

### Prose Class

Apply to container for automatic styling of all typography elements:

```svelte
<Section class="prose">
  <h1>Title</h1>
  <p class="lead">Introduction text</p>
  <p>Regular paragraph with <strong>bold</strong> and <em>italic</em>.</p>
  <blockquote>Important quote</blockquote>
</Section>
```

### Utility Classes

| Class | Description |
|-------|-------------|
| `prose` | Rich text container with automatic spacing/styling |
| `lead` | Larger intro text |
| `tiny` | Small annotation text |
| `label` | Form label text |
| `snippet` | Inline code style |
| `link` | Link style without `<a>` tag |
| `hero-title` | Large hero headline |
| `hero-subtitle` | Hero subtitle text |

### Examples

```svelte
<!-- Hero section -->
<div>
  <h1 class="hero-title">Welcome</h1>
  <p class="hero-subtitle">A beautiful landing page</p>
</div>

<!-- Text utilities -->
<span class="tiny">Small note</span>
<span class="label">Field label</span>
<span class="snippet">code</span>
<span class="link">Styled link</span>
```

**For LLMs**: Use `prose` class on Section/Card for articles/docs. Use utility classes (`lead`, `tiny`, `label`, `hero-title`) for specific text styling outside prose containers.
