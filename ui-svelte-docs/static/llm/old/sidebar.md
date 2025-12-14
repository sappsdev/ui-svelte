## Sidebar Component

Vertical navigation component with optional header and footer sections.

```svelte
<Sidebar
  class="w-48"
  contentClass=""
  headerClass=""
  footerClass=""
>
  {#snippet header()}
    <h3 class="text-lg font-semibold">Menu</h3>
  {/snippet}
  
  <SideNav items={navItems} />
  
  {#snippet footer()}
    <Button variant="ghost" class="w-full">Sign Out</Button>
  {/snippet}
</Sidebar>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `children` | - | Main content (required) |
| `header` | - | Snippet for header section |
| `footer` | - | Snippet for footer section |
| `class` | - | Custom CSS classes (set width here) |
| `contentClass` | - | Classes for content wrapper |
| `headerClass` | - | Classes for header section |
| `footerClass` | - | Classes for footer section |

### Usage with Scaffold

When used in Scaffold's `start` or `end` snippets, Sidebar receives `fixed` positioning automatically.

**Required margin rules:**
- If Sidebar has `w-48`, use `ml-48` or `mr-48` in Scaffold's `mainClass`
- If Sidebar has `w-64`, use `ml-64` or `mr-64` in Scaffold's `mainClass`
- With AppBar (`h-16`), use `vh-16` and `mt-16` in Scaffold's `startClass`/`endClass`

### Common Patterns

```svelte
<script>
  const navItems = [
    { type: 'header', label: 'Navigation' },
    { label: 'Dashboard', icon: 'fluent:home-24-regular', href: '/dashboard' },
    { label: 'Projects', icon: 'fluent:folder-24-regular', href: '/projects' },
    { label: 'Settings', icon: 'fluent:settings-24-regular', href: '/settings' }
  ];
</script>

<!-- Basic sidebar -->
<Sidebar class="w-48">
  <SideNav items={navItems} />
</Sidebar>

<!-- With header and footer -->
<Sidebar class="w-64">
  {#snippet header()}
    <h3 class="text-lg font-semibold">Navigation</h3>
  {/snippet}
  
  <SideNav items={navItems} />
  
  {#snippet footer()}
    <Button variant="ghost" class="w-full">Sign Out</Button>
  {/snippet}
</Sidebar>

<!-- Within Scaffold (standard pattern) -->
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
      {#snippet header()}
        <h3>Navigation</h3>
      {/snippet}
      
      <SideNav items={navItems} />
      
      {#snippet footer()}
        <Button variant="ghost">Sign Out</Button>
      {/snippet}
    </Sidebar>
  {/snippet}
  
  <div class="p-4">Main content</div>
</Scaffold>

<!-- Responsive: desktop sidebar + mobile drawer -->
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

<!-- Mobile drawer -->
<Drawer bind:open={drawerOpen}>
  <Sidebar class="w-64">
    <SideNav items={navItems} />
  </Sidebar>
</Drawer>

<!-- Right sidebar (end position) -->
<Scaffold
  mainClass="xl:mr-56 vh-16 mt-16"
  endClass="vh-16 mt-16"
>
  {#snippet appBar()}
    <AppBar class="h-16">
      <!-- AppBar content -->
    </AppBar>
  {/snippet}
  
  <div class="p-4">Main content</div>
  
  {#snippet end()}
    <Sidebar class="w-56">
      <!-- Right sidebar content -->
    </Sidebar>
  {/snippet}
</Scaffold>

<!-- Custom content (not just navigation) -->
<Sidebar class="w-64">
  {#snippet header()}
    <div class="flex items-center gap-2">
      <Avatar src="/user.jpg" />
      <span>John Doe</span>
    </div>
  {/snippet}
  
  <div class="space-y-4 p-4">
    <Card>Quick stats</Card>
    <Card>Recent activity</Card>
  </div>
  
  {#snippet footer()}
    <div class="text-xs text-muted-foreground">
      Version 1.0.0
    </div>
  {/snippet}
</Sidebar>
```

**For LLMs**: Sidebar for vertical navigation. Use `header` and `footer` snippets for optional sections. Main content (usually `SideNav`) goes in children. **MUST** set width via `class` prop (e.g., `w-48`, `w-64`). When used in Scaffold's `start`/`end`, it becomes fixed positioned—apply matching margins to Scaffold's `mainClass`. For responsive layouts, use `invisible lg:visible` in Scaffold's `startClass` and provide mobile Drawer alternative. Commonly paired with `SideNav` component for navigation items.
