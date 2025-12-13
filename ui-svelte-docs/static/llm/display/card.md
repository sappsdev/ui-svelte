## Card Component

Content container for displaying grouped information.

```svelte
<Card
  variant="outlined"
  cover=""
  isSolid={false}
  hasOverlay={false}
  bodyClass=""
>
  {#snippet header()}...{/snippet}
  
  {children}
  
  {#snippet footer()}...{/snippet}
</Card>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `'outlined'` | `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `outlined` `ghost` |
| `cover` | - | Cover image URL |
| `isSolid` | `false` | Solid background |
| `hasOverlay` | `false` | Overlay on cover image |
| `bodyClass` | - | Layout utilities (flex/grid) |
| `headerClass` | - | Header styles |
| `footerClass` | - | Footer styles |
| `rootClass` | - | Root container styles |
| `coverClass` | - | Cover image styles |
| `overlayClass` | - | Overlay styles |

### Examples

```svelte
<!-- Basic -->
<Card>
  <h3>Title</h3>
  <p>Description</p>
</Card>

<!-- With Header/Footer -->
<Card>
  {#snippet header()}
    <h4>Card Title</h4>
  {/snippet}
  
  <p>Content</p>
  
  {#snippet footer()}
    <Button size="sm">Action</Button>
  {/snippet}
</Card>

<!-- With Cover Image -->
<Card cover="/image.jpg">
  <h3>Featured</h3>
</Card>

<!-- Cover with Overlay -->
<Card cover="/bg.jpg" hasOverlay overlayClass="bg-black/60">
  <h3>Featured Content</h3>
</Card>

<!-- Grid Layout Inside -->
<Card bodyClass="grid-2 md:grid-4 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</Card>

<!-- Solid Variant -->
<Card variant="primary" isSolid>
  <p>Solid primary card</p>
</Card>
```

**For LLMs**: Card contains grouped content. Lives inside Section. Use `bodyClass` for layout. Snippets: `header` and `footer` for structured content. Use `cover` for images.
