# ui-svelte - Layout Component System

> **FRAMEWORK: SVELTE/SVELTEKIT - Generate ONLY .svelte files**
> **DO NOT generate React, Vue, or any other framework code**

Layout components for building Svelte/SvelteKit **+layout.svelte** files. Optimized for AI code generation.

**This documentation is ONLY for layout components**. For page content components (Section, Card, etc.), see the [page documentation](https://svelte.sappsdev.com/llm/page.md).

---

## 🚨 CRITICAL FOR AI ASSISTANTS

**YOU MUST:**
- Generate ONLY Svelte code (`.svelte` files)
- Use ONLY components from `'ui-svelte'` package
- Start every file with: `<script lang="ts">` and `import { ... } from 'ui-svelte';`
- Use Svelte syntax: `{#snippet}`, `{@render}`, NOT JSX
- Use `let { children } = $props();` to receive children prop

**YOU MUST NOT:**
- Generate React/JSX code (no `className`, no `useState`, no JSX syntax)
- Generate Vue code
- Use any other component library

---

## Quick Start Template

```svelte
<script lang="ts">
  import { Scaffold, AppBar, Sidebar } from 'ui-svelte';
  
  // Receive children from SvelteKit
  let { children } = $props();
</script>

<Scaffold mainClass="lg:ml-48 vh-16 mt-16" startClass="vh-16 mt-16">
  {#snippet appBar()}
    <AppBar class="h-16">
      <h1>My App</h1>
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <Sidebar class="w-48">
      <!-- Sidebar content -->
    </Sidebar>
  {/snippet}
  
  {@render children()}
</Scaffold>
```

---

## Critical Distinction: Layout vs Page

### Layout Components (+layout.svelte) - SVELTE FILES
- **Purpose**: Persistent UI structure across routes
- **Components**: `Scaffold`, `AppBar`, `Sidebar`, `Drawer`
- **Supporting**: `IconButton`, `Button`, `Dropdown`, `Avatar`, `NavMenu`, `SideNav`
- **Focus**: Application shell, navigation, fixed elements
- **Syntax**: Use `{#snippet}` and `{@render children()}`

### Page Components (+page.svelte) - SVELTE FILES
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

## Scaffold Component (SVELTE SYNTAX)

Base layout structure for applications with support for AppBar, sidebars, and bottom bar.

```svelte
<script lang="ts">
  import { Scaffold, AppBar, Sidebar, Card } from 'ui-svelte';
  
  // CRITICAL: Receive children from SvelteKit
  let { children } = $props();
</script>

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
  
  <!-- Render children from SvelteKit -->
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
| `children` | - | Main content (required, from `$props()`) |
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

## AppBar Component (SVELTE SYNTAX)

Top navigation bar for displaying information and actions at the top of a screen.

```svelte
<script lang="ts">
  import { AppBar, IconButton, NavMenu, Dropdown, Avatar } from 'ui-svelte';
  
  let navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' }
  ];
  
  let profileOptions = [
    { label: 'Profile', href: '/profile' },
    { label: 'Logout', href: '/logout' }
  ];
</script>

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

---

## Sidebar Component (SVELTE SYNTAX)

Vertical navigation component with optional header and footer sections.

```svelte
<script lang="ts">
  import { Sidebar, SideNav, Button } from 'ui-svelte';
  
  let navItems = [
    { label: 'Dashboard', icon: 'fluent:home-24-regular', href: '/dashboard' },
    { label: 'Projects', icon: 'fluent:folder-24-regular', href: '/projects' }
  ];
</script>

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

---

## Drawer Component (SVELTE SYNTAX)

Panel that slides in from the edge of the screen (typically for mobile navigation).

```svelte
<script lang="ts">
  import { Drawer, SideNav, Button } from 'ui-svelte';
  
  let open = $state(false);
  
  let navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' }
  ];
  
  function handleClose() {
    open = false;
  }
</script>

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
    <Button variant="ghost" onclick={handleClose}>Close</Button>
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
<script lang="ts">
  import { IconButton } from 'ui-svelte';
  
  function handleClick() {
    console.log('Clicked!');
  }
</script>

<IconButton
  icon="fluent:navigation-24-regular"
  onclick={handleClick}
  variant="ghost"
  size="md"
  isDisabled={false}
/>
```

---

## Complete Layout Examples (SVELTE)

### Basic Layout (AppBar + Content)

```svelte
<script lang="ts">
  import { Scaffold, AppBar } from 'ui-svelte';
  
  // CRITICAL: Receive children
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
  
  // CRITICAL: Receive children
  let { children } = $props();
  
  let navItems = [
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
  
  // CRITICAL: Receive children
  let { children } = $props();
  
  let drawerOpen = $state(false);
  
  let navItems = [
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

---

## Svelte Syntax Reference for Layouts

### Receiving Children (CRITICAL)
```svelte
<script lang="ts">
  // ALWAYS include this in +layout.svelte
  let { children } = $props();
</script>

<!-- Render children where needed -->
{@render children()}
```

### Snippets (Layout Structure)
```svelte
{#snippet appBar()}
  <AppBar class="h-16">
    <!-- Content -->
  </AppBar>
{/snippet}

{#snippet start()}
  <Sidebar class="w-48">
    <!-- Content -->
  </Sidebar>
{/snippet}
```

### State Management
```svelte
<script lang="ts">
  // Reactive state for drawer
  let drawerOpen = $state(false);
  
  // Toggle function
  function toggleDrawer() {
    drawerOpen = !drawerOpen;
  }
</script>

<Drawer bind:open={drawerOpen}>
  <!-- Content -->
</Drawer>
```

---

## Best Practices for +layout.svelte

### DO ✅
- Start with `<script lang="ts">` and import from `'ui-svelte'`
- Always include `let { children } = $props();`
- Use `{@render children()}` to render page content
- Use Scaffold as the root layout component
- Set AppBar height with `class="h-16"` (or h-20, h-24)
- Set Sidebar width with `class="w-48"` (or w-56, w-64)
- Apply matching margins to Scaffold's `mainClass`
- Use `vh-16` and `mt-16` for proper spacing with AppBar
- Use responsive classes: `invisible lg:visible` for desktop-only sidebars
- Use Svelte syntax: `{#snippet}`, `{@render}`

### DON'T ❌
- Never generate React/JSX code
- Never use `className` (use `class` instead)
- Never forget `let { children } = $props();`
- Don't use Section or Card in layout files (use in pages)
- Don't forget to set margins matching sidebar widths
- Don't forget to account for AppBar height with `vh-*` utilities
- Don't use React hooks or JSX syntax

---

## For LLMs: MANDATORY Instructions

**YOU ARE GENERATING SVELTE CODE, NOT REACT. THIS IS CRITICAL.**

When generating **+layout.svelte** files:

1. **Framework**: Generate ONLY Svelte code with `.svelte` file extension
2. **Children**: ALWAYS include `let { children } = $props();`
3. **Render**: Use `{@render children()}` to render page content
4. **Snippets**: Use `{#snippet name()}...{/snippet}` for layout sections
5. **Syntax**: Use Svelte syntax (`{#if}`, `{#each}`, `class`, `onclick`)
6. **State**: Use Svelte 5 runes (`$state`, `$derived`, `$effect`)
7. **Import**: Always `import { ... } from 'ui-svelte';`
8. **Structure**: Use Scaffold as root with appBar, start, end snippets
9. **Margins**: MUST match sidebar widths in mainClass (w-48 → ml-48)
10. **Heights**: Use vh-16 for AppBar h-16, adjust for multiple fixed elements
11. **Responsive**: Use `invisible lg:visible` + Drawer for mobile
12. **No Page Components**: Never use Section, Card in layouts

**Component Syntax (SVELTE, NOT REACT)**:
```svelte
<script lang="ts">
  import { Scaffold, AppBar, Sidebar, IconButton } from 'ui-svelte';
  
  // CRITICAL: Always include this
  let { children } = $props();
  
  let drawerOpen = $state(false);
</script>

<Scaffold mainClass="lg:ml-48 vh-16 mt-16" startClass="vh-16 mt-16">
  {#snippet appBar()}
    <AppBar class="h-16" isBlurred>
      {#snippet start()}
        <IconButton 
          icon="fluent:navigation-24-regular" 
          variant="ghost"
          onclick={() => drawerOpen = true}
        />
      {/snippet}
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <Sidebar class="w-48">
      <!-- Sidebar content -->
    </Sidebar>
  {/snippet}
  
  {@render children()}
</Scaffold>
```

**WRONG (React/JSX) - DO NOT GENERATE THIS**:
```jsx
// ❌ WRONG - This is React, not Svelte
export default function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Scaffold mainClass="lg:ml-48">
      <AppBar className="h-16">
        <IconButton onClick={() => setDrawerOpen(true)} />
      </AppBar>
      {children}
    </Scaffold>
  );
}
```

**See individual component docs for complete APIs and pattern examples.**
