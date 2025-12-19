# Typography

CSS classes for responsive text styling.

## Semantic Classes (Recommended)

Use these pre-defined classes for consistent styling:

### Hero Section
```html
<h1 class="hero-title">Main Title</h1>
<p class="hero-subtitle">Subtitle text</p>
<p class="hero-description">Description text</p>
```

### Page Sections
```html
<h2 class="section-title">Section Title</h2>
<p class="section-subtitle">Subtitle</p>
<p class="section-description">Description</p>
```

### Call to Action
```html
<h3 class="cta-title">CTA Title</h3>
<p class="cta-subtitle">CTA subtitle</p>
<p class="cta-description">CTA description</p>
```

### Features & Cards
```html
<h4 class="feature-title">Feature Title</h4>
<p class="feature-description">Feature description</p>

<h5 class="card-title">Card Title</h5>
<p class="card-description">Card description</p>
```

## Size Classes

### Display (Large headlines)
| Class | Size |
|-------|------|
| `display-2xl` | 3rem → 6rem |
| `display-xl` | 2.5rem → 4.5rem |
| `display-lg` | 2rem → 3.75rem |
| `display-md` | 1.75rem → 3rem |
| `display-sm` | 1.5rem → 2.25rem |

### Heading
| Class | Size |
|-------|------|
| `heading-xl` | 1.75rem → 2.5rem |
| `heading-lg` | 1.5rem → 2rem |
| `heading-md` | 1.25rem → 1.5rem |
| `heading-sm` | 1.125rem → 1.25rem |

### Body
| Class | Size |
|-------|------|
| `body-xl` | 1.125rem → 1.25rem |
| `body-lg` | 1rem → 1.125rem |
| `body-md` | 1rem |
| `body-sm` | 0.875rem |

### Labels & Captions
| Class | Description |
|-------|-------------|
| `label-lg/md/sm` | Medium weight labels |
| `caption-lg/md/sm` | 70% opacity captions |

## Utility Classes

```html
<!-- Weight -->
<span class="text-bold">Bold</span>
<span class="text-semibold">Semibold</span>

<!-- Special -->
<span class="subheading">UPPERCASE SUBHEADING</span>
<span class="overline-primary">OVERLINE</span>
<p class="lead">Lead paragraph text</p>

<!-- Width constraints -->
<p class="prose-normal">Max 65ch (optimal reading)</p>
<p class="prose-narrow">Max 45ch (sidebars)</p>

<!-- Truncation -->
<p class="truncate-lines-2">Truncate after 2 lines...</p>
```

## Notes

- All display/heading classes use `clamp()` for fluid responsive sizing
- Use semantic classes first (hero-title, section-title, etc.)
- Sizes are in rem and scale with root font size