## Scaffold Component

Base layout structure for applications with support for AppBar, sidebars, and bottom bar.

```svelte
<Scaffold
  mainClass="lg:ml-48 vh-16 mt-16"
  startClass="vh-16 mt-16"
  endClass="vh-16 mt-16"
  bodyClass=""
>
  {#snippet appBar()}
    <AppBar class="h-16">
      <!-- AppBar content -->
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <Sidebar class="w-48">
      <!-- Left sidebar content -->
    </Sidebar>
  {/snippet}
  
  <!-- Main content (children) -->
  <div class="p-4">
    <h1>Main Content</h1>
  </div>
  
  {#snippet end()}
    <Card class="w-56">
      <!-- Right sidebar content -->
    </Card>
  {/snippet}
  
  {#snippet bottomBar()}
    <AppBar class="h-16">
      <!-- Bottom bar content -->
    </AppBar>
  {/snippet}
</Scaffold>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `children` | - | Main content (required) |
| `appBar` | - | Snippet for top AppBar |
| `start` | - | Snippet for left sidebar (fixed) |
| `end` | - | Snippet for right sidebar (fixed) |
| `bottomBar` | - | Snippet for bottom bar (fixed) |
| `bodyClass` | - | Classes for body wrapper |
| `mainClass` | - | Classes for main content area |
| `startClass` | - | Classes for start sidebar |
| `endClass` | - | Classes for end sidebar |

### vh Utilities

Calculate viewport height by subtracting fixed element heights:

| Utility | Calculation | Use Case |
|---------|-------------|----------|
| `vh-8` | `calc(100vh - 2rem)` | Small header (h-8) |
| `vh-10` | `calc(100vh - 2.5rem)` | Small header (h-10) |
| `vh-12` | `calc(100vh - 3rem)` | Medium header (h-12) |
| `vh-14` | `calc(100vh - 3.5rem)` | Medium header (h-14) |
| `vh-16` | `calc(100vh - 4rem)` | Standard AppBar (h-16) |
| `vh-20` | `calc(100vh - 5rem)` | Large header (h-20) |
| `vh-24` | `calc(100vh - 6rem)` | Extra large header (h-24) |
| `vh-32` | `calc(100vh - 8rem)` | AppBar + BottomBar (h-16 each) |
| `vh-40` | `calc(100vh - 10rem)` | Multiple fixed elements |

### Margin Rules

**CRITICAL**: `start` and `end` snippets have `fixed` positioning. You MUST use margins:

- If `start` sidebar has `w-48`, use `ml-48` in `mainClass`
- If `end` sidebar has `w-56`, use `mr-56` in `mainClass`
- If `appBar` has `h-16`, use `mt-16` in `mainClass`, `startClass`, and `endClass`
- If both `appBar` and `bottomBar` have `h-16`, use `vh-32` instead of `vh-16`

### Common Patterns

```svelte
<!-- Basic with AppBar and content -->
<Scaffold mainClass="vh-16 mt-16">
  {#snippet appBar()}
    <AppBar class="h-16">
      <h1>My App</h1>
    </AppBar>
  {/snippet}
  
  <div class="p-4">Main content</div>
</Scaffold>

<!-- With left sidebar -->
<Scaffold 
  mainClass="lg:ml-48 vh-16 mt-16"
  startClass="vh-16 mt-16"
>
  {#snippet appBar()}
    <AppBar class="h-16">
      <!-- AppBar content -->
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <Sidebar class="w-48">
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  
  <div class="p-4">Main content</div>
</Scaffold>

<!-- Full layout: AppBar + both sidebars -->
<Scaffold
  mainClass="lg:ml-48 xl:mr-56 vh-16 mt-16"
  startClass="vh-16 mt-16"
  endClass="vh-16 mt-16"
>
  {#snippet appBar()}
    <AppBar class="h-16">
      <!-- AppBar content -->
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <Sidebar class="w-48">
      <!-- Navigation -->
    </Sidebar>
  {/snippet}
  
  <div class="p-4">Main content</div>
  
  {#snippet end()}
    <Card class="w-56">
      <!-- Side panel -->
    </Card>
  {/snippet}
</Scaffold>

<!-- With AppBar and BottomBar -->
<Scaffold
  mainClass="vh-32 mt-16 mb-16"
>
  {#snippet appBar()}
    <AppBar class="h-16">
      <!-- Top bar -->
    </AppBar>
  {/snippet}
  
  <div class="p-4">Main content</div>
  
  {#snippet bottomBar()}
    <AppBar class="h-16">
      <!-- Bottom bar -->
    </AppBar>
  {/snippet}
</Scaffold>

<!-- Responsive sidebar (desktop only) -->
<Scaffold
  mainClass="lg:ml-48 vh-16 mt-16"
  startClass="invisible lg:visible vh-16 mt-16"
>
  {#snippet appBar()}
    <AppBar class="h-16">
      {#snippet start()}
        <IconButton 
          icon="fluent:navigation-24-regular"
          onclick={() => drawerOpen = true}
          class="lg:hidden"
        />
      {/snippet}
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <Sidebar class="w-48">
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  
  <div class="p-4">Main content</div>
</Scaffold>

<!-- Mobile drawer for responsive design -->
<Drawer bind:open={drawerOpen}>
  <Sidebar class="w-64">
    <SideNav items={navItems} />
  </Sidebar>
</Drawer>
```

**For LLMs**: Scaffold provides app layout structure. `appBar`, `start`, `end`, and `bottomBar` are fixed positioned. Main content goes in children. **MUST** use margins in `mainClass` matching sidebar widths (e.g., `ml-48` for `w-48` sidebar). Use `vh-*` utilities to calculate proper heights (e.g., `vh-16` for AppBar with `h-16`). Use `mt-16` to offset fixed AppBar. For responsive layouts, use Tailwind breakpoints (e.g., `lg:ml-48`) and combine with Drawer for mobile.
