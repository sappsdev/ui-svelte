# ui-svelte - Layout Component System

> Optimized for AI code generation. Layout components for building Svelte/SvelteKit **+layout.svelte** files.

**This documentation is ONLY for layout components**. For page content components (Section, Card, etc.), see the [page documentation](https://svelte.sappsdev.com/llm/page.md).

---

## Critical Distinction: Layout vs Page

### Layout Components (+layout.svelte)
- **Purpose**: Persistent UI structure across routes
- **Components**: `Scaffold`, `AppBar`, `Sidebar`, `Drawer`
- **Supporting**: `IconButton`, `Button`, `Dropdown`, `Avatar`, `NavMenu`, `SideNav`
- **Focus**: Application shell, navigation, fixed elements

### Page Components (+page.svelte)
- **Purpose**: Route-specific content
- **Components**: `Section`, `Card`, `Button`, forms, displays
- **Focus**: Content structure, user interactions, data display

**Never use Section or Card in layouts. Never use Scaffold or AppBar in pages.**

---

## Core Layout Components

### Quick Links
- [Scaffold](#scaffold-component) - Base layout structure
- [AppBar](#appbar-component) - Top navigation bar
- [Sidebar](#sidebar-component) - Vertical navigation panel
- [Drawer](#drawer-component) - Slide-in panel (mobile)

### Supporting Components
- [Button](https://svelte.sappsdev.com/llm/button.md) - Actions in AppBar/Sidebar
- [IconButton](#iconbutton-component) - Icon-only buttons for AppBar
- [Avatar](https://svelte.sappsdev.com/llm/avatar.md) - User profile in AppBar
- [Dropdown](https://svelte.sappsdev.com/llm/dropdown.md) - Menus in AppBar
- [NavMenu](https://svelte.sappsdev.com/llm/nav-menu.md) - Horizontal navigation for AppBar
- [SideNav](https://svelte.sappsdev.com/llm/sidenav.md) - Vertical navigation for Sidebar

---

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
  {@render children()}
  
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
| `vh-16` | `calc(100vh - 4rem)` | Standard AppBar (h-16) |
| `vh-20` | `calc(100vh - 5rem)` | Large header (h-20) |
| `vh-32` | `calc(100vh - 8rem)` | AppBar + BottomBar (h-16 each) |

### Margin Rules

**CRITICAL**: `start` and `end` snippets have `fixed` positioning. You MUST use margins:

- If `start` sidebar has `w-48`, use `ml-48` in `mainClass`
- If `end` sidebar has `w-56`, use `mr-56` in `mainClass`
- If `appBar` has `h-16`, use `mt-16` in `mainClass`, `startClass`, and `endClass`
- Use `vh-16` to account for AppBar height in sidebars

---

## AppBar Component

Top navigation bar for displaying information and actions at the top of a screen.

```svelte
<AppBar
  class="h-16"
  contentClass=""
  startClass=""
  centerClass=""
  endClass=""
  isBlurred={false}
  isBordered={false}
  hideOnScroll={false}
>
  {#snippet start()}
    <IconButton icon="fluent:navigation-24-regular" variant="ghost" />
  {/snippet}
  
  {#snippet center()}
    <NavMenu items={navItems} variant="ghost" />
  {/snippet}
  
  {#snippet end()}
    <Dropdown options={profileOptions} variant="ghost">
      <Avatar size="sm" src="/avatar.jpg" />
    </Dropdown>
  {/snippet}
</AppBar>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `start` | - | Snippet for left content |
| `center` | - | Snippet for center content |
| `end` | - | Snippet for right content |
| `class` | - | Custom CSS classes (set height here) |
| `contentClass` | - | Classes for content wrapper |
| `isBlurred` | `false` | Apply blur effect (glassmorphism) |
| `isBordered` | `false` | Show bottom border |
| `hideOnScroll` | `false` | Hide when scrolling down |

### Common AppBar Patterns

```svelte
<!-- Basic with title -->
<AppBar class="h-16">
  <h1>My App</h1>
</AppBar>

<!-- With menu button and profile -->
<AppBar class="h-16" isBordered>
  {#snippet start()}
    <IconButton 
      icon="fluent:navigation-24-regular" 
      variant="ghost"
      onclick={() => toggleMenu()}
    />
  {/snippet}
  
  {#snippet end()}
    <Dropdown options={profileOptions} variant="ghost">
      <IconButton icon="fluent:person-24-regular" variant="ghost" />
    </Dropdown>
  {/snippet}
</AppBar>

<!-- With navigation menu -->
<AppBar class="h-16">
  {#snippet center()}
    <NavMenu items={navItems} variant="ghost" />
  {/snippet}
</AppBar>
```

---

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

### Usage with Scaffold

When used in Scaffold's `start` or `end` snippets, Sidebar receives `fixed` positioning automatically.

**Required margin rules:**
- If Sidebar has `w-48`, use `ml-48` or `mr-48` in Scaffold's `mainClass`
- If Sidebar has `w-64`, use `ml-64` or `mr-64` in Scaffold's `mainClass`
- With AppBar (`h-16`), use `vh-16` and `mt-16` in Scaffold's `startClass`/`endClass`

---

## Drawer Component

Panel that slides in from the edge of the screen (typically for mobile navigation).

```svelte
<Drawer
  bind:open
  onclose={handleClose}
  position="start"
  variant="ghost"
  class="w-64"
>
  {#snippet header()}
    <h3>Navigation</h3>
  {/snippet}
  
  <SideNav items={navItems} />
  
  {#snippet footer()}
    <Button variant="ghost">Close</Button>
  {/snippet}
</Drawer>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `open` | `false` | Visibility state (bindable, required) |
| `children` | - | Content snippet (required) |
| `onclose` | - | Handler `() => void` |
| `position` | `'start'` | `start` `end` `top` `bottom` |
| `header` | - | Header snippet |
| `footer` | - | Footer snippet |
| `variant` | `'ghost'` | `ghost` `surface` `primary` `secondary` `muted` |
| `class` | - | Custom class (set width here) |

---

## IconButton Component

Icon-only button for compact actions (commonly used in AppBar).

```svelte
<IconButton
  icon="fluent:navigation-24-regular"
  onclick={handleClick}
  variant="ghost"
  size="md"
  isDisabled={false}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `icon` | - | Icon name (required) |
| `onclick` | - | Click handler |
| `href` | - | URL for link behavior |
| `variant` | `'primary'` | `primary` `secondary` `muted` `ghost` `outlined` `success` `info` `warning` `danger` |
| `size` | `'md'` | `xs` `sm` `md` `lg` |
| `isDisabled` | `false` | Disabled state |

---

## Complete Layout Examples

### Basic Layout (AppBar + Content)

```svelte
<script lang="ts">
  import { Scaffold, AppBar } from 'ui-svelte';
  let { children } = $props();
</script>

<Scaffold mainClass="vh-16 mt-16">
  {#snippet appBar()}
    <AppBar class="h-16">
      <h1>My App</h1>
    </AppBar>
  {/snippet}
  
  {@render children()}
</Scaffold>
```

### Standard App Layout (AppBar + Sidebar)

```svelte
<script lang="ts">
  import { Scaffold, AppBar, Sidebar, SideNav } from 'ui-svelte';
  
  let { children } = $props();
  
  const navItems = [
    { label: 'Dashboard', icon: 'fluent:home-24-regular', href: '/dashboard' },
    { label: 'Projects', icon: 'fluent:folder-24-regular', href: '/projects' },
    { label: 'Settings', icon: 'fluent:settings-24-regular', href: '/settings' }
  ];
</script>

<Scaffold
  mainClass="lg:ml-48 vh-16 mt-16"
  startClass="vh-16 mt-16"
>
  {#snippet appBar()}
    <AppBar class="h-16" isBlurred>
      {#snippet start()}
        <h4>My App</h4>
      {/snippet}
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <Sidebar class="w-48">
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  
  {@render children()}
</Scaffold>
```

### Responsive Layout (Desktop Sidebar + Mobile Drawer)

```svelte
<script lang="ts">
  import { Scaffold, AppBar, Sidebar, Drawer, IconButton, SideNav } from 'ui-svelte';
  
  let { children } = $props();
  let drawerOpen = $state(false);
  
  const navItems = [
    { label: 'Dashboard', icon: 'fluent:home-24-regular', href: '/dashboard' },
    { label: 'Projects', icon: 'fluent:folder-24-regular', href: '/projects' }
  ];
</script>

<Scaffold
  mainClass="lg:ml-48 vh-16 mt-16"
  startClass="invisible lg:visible vh-16 mt-16"
>
  {#snippet appBar()}
    <AppBar class="h-16" isBlurred>
      {#snippet start()}
        <IconButton 
          icon="fluent:navigation-24-regular"
          onclick={() => drawerOpen = true}
          class="lg:hidden"
          variant="ghost"
        />
        <h4>My App</h4>
      {/snippet}
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <Sidebar class="w-48">
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  
  {@render children()}
</Scaffold>

<!-- Mobile drawer -->
<Drawer bind:open={drawerOpen} class="w-64">
  <SideNav items={navItems} />
</Drawer>
```

### Full Layout (AppBar + Both Sidebars)

```svelte
<script lang="ts">
  import { Scaffold, AppBar, Sidebar, Card, SideNav, Avatar, Dropdown } from 'ui-svelte';
  
  let { children } = $props();
  
  const navItems = [
    { label: 'Dashboard', icon: 'fluent:home-24-regular', href: '/dashboard' }
  ];
  
  const profileOptions = [
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' }
  ];
</script>

<Scaffold
  mainClass="lg:ml-48 2xl:mr-56 vh-16 mt-16"
  startClass="vh-16 mt-16"
  endClass="vh-16 mt-16"
>
  {#snippet appBar()}
    <AppBar class="h-16" isBlurred>
      {#snippet start()}
        <h4>My App</h4>
      {/snippet}
      
      {#snippet end()}
        <Dropdown options={profileOptions}>
          <Avatar size="sm" src="/avatar.jpg" />
        </Dropdown>
      {/snippet}
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <Sidebar class="w-48">
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  
  {@render children()}
  
  {#snippet end()}
    <Card class="w-56">
      <!-- Side panel content -->
    </Card>
  {/snippet}
</Scaffold>
```

---

## Best Practices for +layout.svelte

### DO
- Use Scaffold as the root layout component
- Set AppBar height with `class="h-16"` (or h-20, h-24)
- Set Sidebar width with `class="w-48"` (or w-56, w-64)
- Apply matching margins to Scaffold's `mainClass` (e.g., `ml-48` for `w-48` sidebar)
- Use `vh-16` and `mt-16` for proper spacing with AppBar
- Use responsive classes: `invisible lg:visible` for desktop-only sidebars
- Provide mobile Drawer alternative for responsive layouts
- Use IconButton in AppBar for compact actions
- Use NavMenu in AppBar center for horizontal navigation
- Use SideNav in Sidebar for vertical navigation

### DON'T
- Don't use Section or Card in layout files (use in pages)
- Don't forget to set margins matching sidebar widths
- Don't forget to account for AppBar height with `vh-*` utilities
- Don't nest layout components incorrectly
- Don't use page components (Section, Card) for layout structure

---

## Component Combinations

### AppBar Can Contain:
- `IconButton` - Menu toggles, actions
- `Button` - Primary actions
- `Avatar` - User profile
- `Dropdown` - User menus, settings
- `NavMenu` - Horizontal navigation (in center snippet)
- Text/headings - App title, branding

### Sidebar Can Contain:
- `SideNav` - Primary navigation (most common)
- `Button` - Actions in header/footer
- Custom content - Stats, widgets, user info
- Text/headings - Section titles

### Drawer Can Contain:
- Same as Sidebar
- Typically used for mobile navigation
- Often contains a Sidebar component inside

---

## For LLMs: Key Instructions

When generating **+layout.svelte** files:

1. **Structure**: Use Scaffold as root with appBar, start, end snippets
2. **Margins**: MUST match sidebar widths in mainClass (w-48 → ml-48)
3. **Heights**: Use vh-16 for AppBar h-16, adjust for multiple fixed elements
4. **Responsive**: Use `invisible lg:visible` + Drawer for mobile
5. **Components**: AppBar for top nav, Sidebar for side nav, Drawer for mobile
6. **Navigation**: NavMenu in AppBar center, SideNav in Sidebar
7. **Actions**: IconButton in AppBar, Button in Sidebar footer
8. **No Page Components**: Never use Section, Card in layouts

**Component Syntax**:
```svelte
<Scaffold mainClass="lg:ml-48 vh-16 mt-16" startClass="vh-16 mt-16">
  {#snippet appBar()}
    <AppBar class="h-16" isBlurred>
      {#snippet start()}
        <IconButton icon="fluent:navigation-24-regular" variant="ghost" />
      {/snippet}
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <Sidebar class="w-48">
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  
  {@render children()}
</Scaffold>
```

**See individual component docs for complete APIs and pattern examples.**
