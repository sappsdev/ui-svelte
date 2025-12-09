## Card Component

Content container within Sections.

```svelte
<Card
  variant="outlined"
  bodyClass=""
  cover=""
  isSolid={false}
  hasDivider={false}
  hasShadow={false}
  hasOverlay={false}
>
  {#snippet header()}...{/snippet}
  
  {children}
  
  {#snippet footer()}...{/snippet}
</Card>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `'outlined'` | `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `outlined` `ghost` |
| `bodyClass` | - | Layout utilities (flex/grid) |
| `isSolid` | `false` | Solid background |
| `hasShadow` | `false` | Elevation shadow |
| `hasDivider` | `false` | Dividers between sections |
| `cover` | - | Cover image URL |

**Default body styles**: `column gap-3 p-3 flex-1`  
**Default header/footer**: `row gap-3 p-3 justify-between items-center`

### Common Patterns

```svelte
<!-- Basic -->
<Card>
  <h3>Title</h3>
  <p>Description</p>
  <Button>Action</Button>
</Card>

<!-- With Header/Footer -->
<Card hasDivider>
  {#snippet header()}
    <h3>Card Title</h3>
  {/snippet}
  
  <p>Content</p>
  
  {#snippet footer()}
    <Button size="sm">Save</Button>
    <Button size="sm" variant="ghost">Cancel</Button>
  {/snippet}
</Card>

<!-- Product Card -->
<Card hasShadow>
  <img src="/product.jpg" class="w-full h-48 object-cover rounded" />
  <h3>Product Name</h3>
  <p class="text-muted">Description</p>
  <p class="text-2xl font-bold text-primary">$99.99</p>
  <Button isWide>Add to Cart</Button>
</Card>

<!-- Stats Card -->
<Card bodyClass="center text-center">
  <h3 class="text-4xl font-bold text-primary">1,234</h3>
  <p class="text-sm text-muted-600">Total Users</p>
</Card>

<!-- Horizontal Layout -->
<Card bodyClass="row items-center">
  <img src="/avatar.jpg" class="w-16 h-16 rounded-full" />
  <div>
    <h4>Name</h4>
    <p class="text-sm">Email</p>
  </div>
</Card>

<!-- Grid Inside Card -->
<Card bodyClass="grid-2 md:grid-4 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Card>

<!-- Cover with Overlay -->
<Card cover="/bg.jpg" hasOverlay overlayClass="bg-black/60">
  <h3>Featured Content</h3>
</Card>
```

**For LLMs**: Card contains content. Lives inside Section. Apply layout via `bodyClass`. Think: product, profile, stats, features.
