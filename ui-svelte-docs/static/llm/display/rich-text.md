# Rich Text

CSS classes to decorate inline text with effects.

## Available Styles

| Class | Effect |
|-------|--------|
| `mark` | Background highlight |
| `grad` | Gradient text |
| `pill` | Rounded border |
| `slant` | Angled background |
| `glow` | Glowing text shadow |
| `under` | Animated underline |
| `strike` | Strikethrough |
| `box` | Framed border |
| `wave` | Wavy underline |
| `neon` | Neon flicker effect |
| `pop` | 3D pop-out |
| `tag` | Badge/tag style |

## Color Variants

Add suffix for colors: `-primary`, `-secondary`, `-success`, `-warning`, `-danger`, `-info`

```html
<span class="mark mark-primary">Primary</span>
<span class="grad grad-success">Success</span>
<span class="glow glow-danger">Danger</span>
```

## Usage

Apply to `<span>` elements inside headings:

```svelte
<h1 class="hero-title">
  Build <span class="grad grad-primary">amazing</span> apps
</h1>

<h2 class="section-title">
  Why choose <span class="slant slant-primary">our platform</span>?
</h2>

<h3 class="cta-title text-white">
  Start building <span class="neon neon-secondary">today</span>
</h3>
```

## Example

```svelte
<Section cover="/hero.jpg" variant="solid">
  <h1 class="hero-title text-white">
    The <span class="grad grad-primary">Future</span> of Web
  </h1>
  <p class="hero-subtitle text-white">
    Build <span class="neon neon-warning">faster</span>, ship 
    <span class="glow glow-success">better</span>
  </p>
</Section>
```

## Notes

- Use with typography classes (hero-title, section-title, etc.)
- Wrap only 1-2 words per heading for best impact
- Default colors work in most contexts
- Test contrast on colored backgrounds