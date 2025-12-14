## Scaffold

Layout component for application structure. **Use only in +layout.svelte files.**

### Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | Snippet | Main content (required) |
| `appBar` | Snippet | Fixed top navigation bar |
| `start` | Snippet | Left sidebar content |
| `end` | Snippet | Right sidebar content |
| `bottomBar` | Snippet | Fixed bottom navigation |
| `bodyClass` | string | Classes for body container |
| `mainClass` | string | Classes for main content area |
| `startClass` | string | Classes for left sidebar wrapper |
| `endClass` | string | Classes for right sidebar wrapper |
| `isBoxed` | boolean | Limits max-width to boxed container |

### Examples

```svelte
<!-- Landing Page -->
<Scaffold mainClass="vh-16 mt-16">
  {#snippet appBar()}
    <AppBar class="h-16" isBoxed isSticky>
      {#snippet start()}<h4>Brand</h4>{/snippet}
      {#snippet center()}<NavMenu items={navItems} />{/snippet}
    </AppBar>
  {/snippet}
  {@render children()}
  <Footer isBoxed />
</Scaffold>

<!-- Dashboard with Sidebar -->
<Scaffold
  mainClass="lg:p-4 pb-16"
  startClass="invisible lg:visible lg:w-56"
  bodyClass="bg-background mt-16"
  isBoxed
>
  {#snippet appBar()}
    <AppBar class="h-16" isSticky isBoxed />
  {/snippet}
  {#snippet start()}
    <Sidebar rootClass="pb-8 vh-16">
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  {@render children()}
</Scaffold>

<!-- Mobile App -->
<Scaffold mainClass="mt-16 pb-16" bodyClass="mt-16">
  {#snippet appBar()}
    <AppBar class="h-16" />
  {/snippet}
  {@render children()}
  {#snippet bottomBar()}
    <BottomNav items={bottomNavItems} />
  {/snippet}
</Scaffold>
```

### Key Concepts

- **AppBar spacing**: Match `bodyClass="mt-16"` to AppBar height `h-16`
- **Sidebar width**: Use `startClass="lg:w-56"` for fixed width
- **Responsive sidebar**: `startClass="invisible lg:visible lg:w-56"`
- **vh utilities**: Use `vh-16` for `calc(100vh - 4rem)` on Sidebar

**For LLMs**: Scaffold wraps the entire page layout. Use `appBar` for fixed header, `start/end` for sidebars, `bottomBar` for mobile nav. Always add top margin to `bodyClass` matching AppBar height.
