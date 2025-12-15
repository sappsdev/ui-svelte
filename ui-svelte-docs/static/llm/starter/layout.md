# ui-svelte - Layout Components Documentation

> **FRAMEWORK: SVELTE/SVELTEKIT**
> **CRITICAL: You MUST generate ONLY .svelte layout files using ui-svelte components**

This documentation provides complete guidance for building Svelte/SvelteKit **+layout.svelte** files using the ui-svelte component library. Optimized for AI code generation.

**This documentation is ONLY for layout components** (Scaffold, AppBar, Sidebar, etc.). For page content components (Section, Card, Button, etc.), see the [page documentation](https://ui-svelte.sappsdev.com/llm/starter/page.md).

---

## 🚨 MANDATORY RULES FOR LAYOUT CODE GENERATION

### YOU MUST:
1. **Generate ONLY Svelte code** - Output `.svelte` files exclusively for SvelteKit layouts
2. **Use ONLY ui-svelte components** - Import from `'ui-svelte'` package
3. **Start every layout file with:**
   ```svelte
   <script lang="ts">
     import { Scaffold, AppBar, Sidebar, SideNav } from 'ui-svelte';
     
     let { children } = $props();
   </script>
   ```
4. **Always receive and render children:**
   - Receive: `let { children } = $props();`
   - Render: `{@render children()}`
   - This is how SvelteKit passes page content to layouts
5. **Use Svelte 5 snippet syntax for layout sections:**
   - Define sections: `{#snippet appBar()}...{/snippet}`
   - Render sections in Scaffold: `{#snippet appBar()}..{/snippet}`
6. **Use correct attribute names:**
   - ✅ `class` (NOT `className`)
   - ✅ `onclick` (NOT `onClick`)

### YOU MUST NOT:
1. ❌ **Generate React/JSX code** - No React components, hooks, or JSX syntax
2. ❌ **Use React patterns** - No `useState`, `useEffect`, `className`, `onClick`, `children` as JSX
3. ❌ **Use page components in layouts** - Never use:
   - `<Section>` → Only for pages, NOT layouts
   - `<Card>` → Only for pages, NOT layouts
   - Form components → Only for pages, NOT layouts
4. ❌ **Use hex color codes** - Never use `#FFFFFF`, `#000000`, etc.
   - ✅ Use CSS variables: `var(--primary)`, `var(--surface)`, etc.
5. ❌ **Forget to render children** - Always include `{@render children()}`
6. ❌ **Use wrong props syntax** - In Svelte 5, use `$props()` not `export let`

---

## Color System - ALWAYS Use These Variables

**CRITICAL: Never use hex codes (#FFFFFF, #000000). Always use these CSS variables:**

| CSS Variable | Purpose | Light Theme | Dark Theme |
|--------------|---------|-------------|------------|
| `--primary` | Main brand color | Violet | Violet |
| `--on-primary` | Text on primary | White | White |
| `--secondary` | Accent color | Pink | Pink |
| `--on-secondary` | Text on secondary | White | White |
| `--surface` | Card/Container background | White | Dark Grey |
| `--on-surface` | Text on surface | Dark Grey | Light Grey |
| `--background` | Page background | White | Very Dark |
| `--on-background` | Text on background | Black | White |
| `--muted` | Secondary text/backgrounds | Light Grey | Dark Grey |
| `--on-muted` | Text on muted | Grey | Grey |
| `--outline` | Borders/Dividers | Grey | Grey |
| `--success` | Success states | Green | Green |
| `--warning` | Warning states | Orange | Orange |
| `--danger` | Error/Danger states | Red | Red |

**Usage Example:**
```svelte
<AppBar style="background: var(--primary); color: var(--on-primary);">
  Primary background with proper text color
</AppBar>
```

---

## Quick Start Template

**Use this as your starting point for every layout:**

```svelte
<script lang="ts">
  import { Scaffold, AppBar, Sidebar, SideNav } from 'ui-svelte';
  
  // CRITICAL: Always receive children prop
  let { children } = $props();
  
  const navItems = [
    { label: 'Home', icon: 'fluent:home-24-regular', href: '/' },
    { label: 'Dashboard', icon: 'fluent:grid-24-regular', href: '/dashboard' },
    { label: 'Settings', icon: 'fluent:settings-24-regular', href: '/settings' }
  ];
</script>

<Scaffold mainClass="lg:p-4" startClass="invisible lg:visible lg:w-56" bodyClass="mt-16" isBoxed>
  {#snippet appBar()}
    <AppBar class="h-16" isSticky isBoxed>
      {#snippet start()}
        <h4>My App</h4>
      {/snippet}
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <Sidebar rootClass="vh-16">
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  
  <!-- CRITICAL: Always render children to show page content -->
  {@render children()}
</Scaffold>
```

---

## Component Documentation Links

**Before generating layout code, READ the specific documentation for each component you plan to use:**

### 🏗️ Core Layout Components
- **[Scaffold](https://ui-svelte.sappsdev.com/llm/layout/scaffold.md)** - Base application structure wrapper (MUST READ - this is the root)
- **[AppBar](https://ui-svelte.sappsdev.com/llm/layout/app-bar.md)** - Top navigation bar with `start`, `center`, `end` snippets
- **[Sidebar](https://ui-svelte.sappsdev.com/llm/layout/sidebar.md)** - Vertical navigation panel with `header`, `footer` snippets
- **[Footer](https://ui-svelte.sappsdev.com/llm/layout/footer.md)** - Bottom page section with copyright, links, and actions

### 🧭 Navigation Components (use inside layouts)
- **[NavMenu](https://ui-svelte.sappsdev.com/llm/navigation/nav-menu.md)** - Horizontal navigation menu for AppBar
- **[SideNav](https://ui-svelte.sappsdev.com/llm/navigation/sidenav.md)** - Vertical navigation items for Sidebar
- **[BottomNav](https://ui-svelte.sappsdev.com/llm/navigation/bottom-nav.md)** - Fixed bottom navigation for mobile apps

### 🎨 Supporting Components (use sparingly in layouts)
- **[Drawer](https://ui-svelte.sappsdev.com/llm/layout/drawer.md)** - Slide-in panel for mobile navigation
- **[IconButton](https://ui-svelte.sappsdev.com/llm/control/icon-button.md)** - Icon-only buttons for AppBar actions

---

## Layout Structure & Hierarchy

**Understanding the component structure:**

```
+layout.svelte (SvelteKit layout file)
└── Scaffold (root wrapper - controls overall layout structure)
    ├── {#snippet appBar()} → AppBar (fixed top navigation bar)
    │   ├── {#snippet start()} → Logo, menu button, title
    │   ├── {#snippet center()} → Search, tabs
    │   └── {#snippet end()} → User menu, notifications, actions
    ├── {#snippet start()} → Sidebar (left navigation panel)
    │   ├── {#snippet header()} → Logo, user profile
    │   ├── SideNav (navigation items)
    │   └── {#snippet footer()} → Settings, logout
    ├── {#snippet end()} → Sidebar (right panel - optional)
    ├── {#snippet bottomBar()} → BottomNav (mobile bottom navigation)
    └── {@render children()} → Page content from +page.svelte files
```

### ⚠️ CRITICAL RULES:
1. **Scaffold is the root** - All layouts start with `<Scaffold>`
2. **Children must be rendered** - Always include `{@render children()}` inside Scaffold
3. **Snippets for sections** - Use `{#snippet name()}...{/snippet}` for layout sections
4. **No page components** - Never use Section, Card, form components in layouts
5. **Spacing coordination** - Match AppBar height with body margin (see spacing rules below)

---

## Key Spacing & Sizing Rules

**CRITICAL: AppBar height and body margin must match to prevent content overlap**

| AppBar Height | Scaffold bodyClass | Sidebar rootClass | Notes |
|---------------|-------------------|-------------------|-------|
| `class="h-16"` | `bodyClass="mt-16"` | `rootClass="vh-16"` | Standard (64px) |
| `class="h-20"` | `bodyClass="mt-20"` | `rootClass="vh-20"` | Taller (80px) |
| `h-16` + BottomNav | `bodyClass="mt-16 mb-16"` | `rootClass="vh-32"` | Mobile with bottom nav |

### Understanding vh Utilities:
- `vh-16` = `calc(100vh - 4rem)` → Full viewport height minus 64px
- `vh-20` = `calc(100vh - 5rem)` → Full viewport height minus 80px
- `vh-32` = `calc(100vh - 8rem)` → Full viewport height minus 128px (for AppBar + BottomNav)

**Example:**
```svelte
<Scaffold bodyClass="mt-16" mainClass="lg:p-4">
  {#snippet appBar()}
    <AppBar class="h-16" isSticky> <!-- h-16 matches mt-16 -->
      <!-- AppBar content -->
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <Sidebar rootClass="vh-16"> <!-- vh-16 = 100vh - 64px -->
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  
  {@render children()}
</Scaffold>
```

---

## Common Layout Patterns

### Pattern 1: Landing Page (AppBar + Footer, No Sidebar)
**Use case:** Marketing sites, landing pages, documentation sites

```svelte
<script lang="ts">
  import { Scaffold, AppBar, Footer } from 'ui-svelte';
  
  let { children } = $props();
</script>

<Scaffold mainClass="vh-16 mt-16">
  {#snippet appBar()}
    <AppBar class="h-16" isBoxed isSticky>
      {#snippet start()}
        <h4>Brand</h4>
      {/snippet}
      {#snippet end()}
        <NavMenu items={[
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Contact', href: '/contact' }
        ]} />
      {/snippet}
    </AppBar>
  {/snippet}
  
  {@render children()}
  
  <Footer isBoxed>
    {#snippet start()}
      <p>© 2024 Brand. All rights reserved.</p>
    {/snippet}
  </Footer>
</Scaffold>
```

---

### Pattern 2: Dashboard (AppBar + Sidebar)
**Use case:** Admin panels, dashboards, management interfaces

```svelte
<script lang="ts">
  import { Scaffold, AppBar, Sidebar, SideNav, IconButton } from 'ui-svelte';
  
  let { children } = $props();
  
  const navItems = [
    { label: 'Dashboard', icon: 'fluent:home-24-regular', href: '/dashboard' },
    { label: 'Users', icon: 'fluent:people-24-regular', href: '/users' },
    { label: 'Reports', icon: 'fluent:document-24-regular', href: '/reports' },
    { label: 'Settings', icon: 'fluent:settings-24-regular', href: '/settings' }
  ];
</script>

<Scaffold
  mainClass="lg:p-4"
  startClass="invisible lg:visible lg:w-56"
  bodyClass="mt-16"
  isBoxed
>
  {#snippet appBar()}
    <AppBar class="h-16" isSticky isBoxed>
      {#snippet start()}
        <h4>Dashboard</h4>
      {/snippet}
      {#snippet end()}
        <IconButton icon="fluent:person-24-regular" />
      {/snippet}
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <Sidebar rootClass="vh-16">
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  
  {@render children()}
</Scaffold>
```

---

### Pattern 3: Mobile App (AppBar + BottomNav)
**Use case:** Mobile-first apps, PWAs

```svelte
<script lang="ts">
  import { Scaffold, AppBar, BottomNav } from 'ui-svelte';
  
  let { children } = $props();
  
  const bottomNavItems = [
    { label: 'Home', icon: 'fluent:home-24-regular', href: '/' },
    { label: 'Search', icon: 'fluent:search-24-regular', href: '/search' },
    { label: 'Favorites', icon: 'fluent:heart-24-regular', href: '/favorites' },
    { label: 'Profile', icon: 'fluent:person-24-regular', href: '/profile' }
  ];
</script>

<Scaffold mainClass="mt-16 mb-16" bodyClass="mt-16">
  {#snippet appBar()}
    <AppBar class="h-16" isSticky>
      {#snippet center()}
        <h4>My App</h4>
      {/snippet}
    </AppBar>
  {/snippet}
  
  {@render children()}
  
  {#snippet bottomBar()}
    <BottomNav items={bottomNavItems} />
  {/snippet}
</Scaffold>
```

---

### Pattern 4: Responsive (Desktop Sidebar + Mobile Drawer)
**Use case:** Cross-platform applications that adapt to screen size

```svelte
<script lang="ts">
  import { Scaffold, AppBar, Sidebar, SideNav, Drawer, IconButton } from 'ui-svelte';
  
  let { children } = $props();
  let drawerOpen = $state(false);
  
  const navItems = [
    { label: 'Home', icon: 'fluent:home-24-regular', href: '/' },
    { label: 'Products', icon: 'fluent:grid-24-regular', href: '/products' },
    { label: 'Orders', icon: 'fluent:cart-24-regular', href: '/orders' },
    { label: 'Settings', icon: 'fluent:settings-24-regular', href: '/settings' }
  ];
</script>

<Scaffold 
  startClass="invisible lg:visible lg:w-56" 
  bodyClass="mt-16" 
  mainClass="lg:p-4"
  isBoxed
>
  {#snippet appBar()}
    <AppBar class="h-16" isSticky isBoxed>
      {#snippet start()}
        <!-- Mobile menu button (hidden on desktop) -->
        <IconButton 
          icon="fluent:navigation-24-regular" 
          onclick={() => drawerOpen = true} 
          class="lg:hidden" 
        />
        <h4>My App</h4>
      {/snippet}
    </AppBar>
  {/snippet}
  
  {#snippet start()}
    <!-- Desktop sidebar (hidden on mobile) -->
    <Sidebar rootClass="vh-16">
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  
  {@render children()}
</Scaffold>

<!-- Mobile drawer (shown when hamburger menu clicked) -->
<Drawer bind:open={drawerOpen}>
  <SideNav items={navItems} onclick={() => drawerOpen = false} />
</Drawer>
```

---

### Pattern 5: Complex Dashboard (AppBar + Left & Right Sidebars)
**Use case:** Advanced dashboards with side panels

```svelte
<script lang="ts">
  import { Scaffold, AppBar, Sidebar, SideNav } from 'ui-svelte';
  
  let { children } = $props();
  
  const mainNavItems = [
    { label: 'Dashboard', icon: 'fluent:home-24-regular', href: '/dashboard' }
  ];
</script>

<Scaffold
  startClass="invisible lg:visible lg:w-56"
  endClass="invisible xl:visible xl:w-64"
  bodyClass="mt-16"
  mainClass="lg:p-4"
>
  {#snippet appBar()}
    <AppBar class="h-16" isSticky isBoxed />
  {/snippet}
  
  {#snippet start()}
    <Sidebar rootClass="vh-16">
      <SideNav items={mainNavItems} />
    </Sidebar>
  {/snippet}
  
  {#snippet end()}
    <Sidebar rootClass="vh-16">
      <!-- Right sidebar content (notifications, activity feed, etc.) -->
      <div class="column gap-4 p-4">
        <h5>Activity</h5>
        <p class="text-sm text-muted">Recent updates...</p>
      </div>
    </Sidebar>
  {/snippet}
  
  {@render children()}
</Scaffold>
```

---

## Svelte 5 Layout Syntax Reference

### Receiving and Rendering Children
```svelte
<script lang="ts">
  // CRITICAL: Always receive children in layouts
  let { children } = $props();
</script>

<!-- CRITICAL: Always render children inside Scaffold -->
<Scaffold>
  {@render children()}
</Scaffold>
```

### Defining Layout Sections with Snippets
```svelte
<Scaffold>
  <!-- Define snippet for AppBar section -->
  {#snippet appBar()}
    <AppBar class="h-16">
      {#snippet start()}
        <h4>Title</h4>
      {/snippet}
    </AppBar>
  {/snippet}
  
  <!-- Define snippet for Sidebar section -->
  {#snippet start()}
    <Sidebar>
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  
  {@render children()}
</Scaffold>
```

### State Management in Layouts
```svelte
<script lang="ts">
  import { Scaffold, Drawer } from 'ui-svelte';
  
  let { children } = $props();
  
  // State for drawer visibility
  let drawerOpen = $state(false);
  
  // State for user data
  let user = $state({ name: 'John Doe', avatar: '/avatar.jpg' });
  
  // Function to toggle drawer
  function toggleDrawer() {
    drawerOpen = !drawerOpen;
  }
</script>

<Scaffold>
  {#snippet appBar()}
    <AppBar>
      {#snippet start()}
        <IconButton 
          icon="fluent:navigation-24-regular" 
          onclick={toggleDrawer} 
        />
      {/snippet}
    </AppBar>
  {/snippet}
  
  {@render children()}
</Scaffold>

<Drawer bind:open={drawerOpen}>
  <!-- Drawer content -->
</Drawer>
```

---

## Responsive Design Patterns

### Breakpoint Classes
Use Tailwind breakpoints for responsive layouts:
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

### Common Responsive Patterns

#### Hide/Show Elements by Screen Size
```svelte
<!-- Show on mobile, hide on desktop -->
<IconButton class="lg:hidden" />

<!-- Hide on mobile, show on desktop -->
<Sidebar class="invisible lg:visible" />
```

#### Responsive Sidebar Width
```svelte
<Scaffold startClass="w-full sm:w-64 lg:w-56 xl:w-72">
  {#snippet start()}
    <Sidebar>
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
</Scaffold>
```

#### Responsive Padding
```svelte
<Scaffold mainClass="p-2 sm:p-4 lg:p-6 xl:p-8">
  {@render children()}
</Scaffold>
```

---

## Navigation Items Structure

### SideNav Items Format
```typescript
const navItems = [
  {
    label: 'Dashboard',          // Display text
    icon: 'fluent:home-24-regular', // Icon name
    href: '/dashboard',           // URL to navigate to
    isActive: false,              // Optional: highlight as active
    badge: '3',                   // Optional: show badge with count
  },
  {
    label: 'Settings',
    icon: 'fluent:settings-24-regular',
    href: '/settings',
    children: [                   // Optional: nested items
      { label: 'Profile', href: '/settings/profile' },
      { label: 'Security', href: '/settings/security' }
    ]
  }
];
```

### NavMenu Items Format
```typescript
const menuItems = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' }
];
```

### BottomNav Items Format
```typescript
const bottomNavItems = [
  {
    label: 'Home',
    icon: 'fluent:home-24-regular',
    href: '/',
    isActive: false
  },
  {
    label: 'Search',
    icon: 'fluent:search-24-regular',
    href: '/search'
  }
];
```

---

## Step-by-Step Layout Generation Process

**Follow this process when generating layout code:**

1. **Identify the layout type** - Landing page? Dashboard? Mobile app?
2. **Choose the pattern** - Select from common patterns above
3. **Read component documentation** - Fetch and read docs for:
   - Scaffold (always needed)
   - AppBar (if using top navigation)
   - Sidebar (if using side navigation)
   - SideNav (if using navigation items)
   - BottomNav (if using bottom navigation)
4. **Plan the structure:**
   - What goes in AppBar? (logo, search, user menu)
   - What goes in Sidebar? (navigation items, user profile)
   - Do you need a Footer?
   - Do you need mobile responsiveness?
5. **Set up spacing:**
   - Match AppBar height with bodyClass margin
   - Calculate vh utility for Sidebar if needed
6. **Generate the code:**
   - Start with `let { children } = $props();`
   - Wrap everything in Scaffold
   - Use snippets for sections
   - Always render children: `{@render children()}`
7. **Verify compliance** - Check that you:
   - ✅ Used only ui-svelte layout components
   - ✅ Received children with `$props()`
   - ✅ Rendered children with `{@render children()}`
   - ✅ Used snippets for layout sections
   - ✅ Matched spacing (AppBar height = body margin)
   - ✅ Used CSS variables for colors (no hex codes)
   - ✅ Did NOT use page components (Section, Card, etc.)

---

## Common Mistakes to Avoid

### ❌ WRONG: Not receiving or rendering children
```svelte
<script lang="ts">
  import { Scaffold, AppBar } from 'ui-svelte';
  // Missing: let { children } = $props();
</script>

<Scaffold>
  {#snippet appBar()}
    <AppBar class="h-16" />
  {/snippet}
  <!-- Missing: {@render children()} -->
</Scaffold>
```

### ✅ CORRECT: Properly handle children
```svelte
<script lang="ts">
  import { Scaffold, AppBar } from 'ui-svelte';
  
  let { children } = $props(); // ✅ Receive children
</script>

<Scaffold>
  {#snippet appBar()}
    <AppBar class="h-16" />
  {/snippet}
  
  {@render children()} {/* ✅ Render children */}
</Scaffold>
```

---

### ❌ WRONG: Mismatched spacing
```svelte
<Scaffold bodyClass="mt-16"> <!-- Body has 64px top margin -->
  {#snippet appBar()}
    <AppBar class="h-20" /> <!-- But AppBar is 80px tall! -->
  {/snippet}
</Scaffold>
```

### ✅ CORRECT: Matched spacing
```svelte
<Scaffold bodyClass="mt-20"> <!-- Body has 80px top margin -->
  {#snippet appBar()}
    <AppBar class="h-20" /> <!-- AppBar is 80px tall ✅ -->
  {/snippet}
</Scaffold>
```

---

### ❌ WRONG: Using page components in layout
```svelte
<Scaffold>
  {#snippet appBar()}
    <AppBar class="h-16" />
  {/snippet}
  
  <Section> <!-- ❌ Section is for pages, not layouts! -->
    {@render children()}
  </Section>
</Scaffold>
```

### ✅ CORRECT: Layout components only
```svelte
<Scaffold>
  {#snippet appBar()}
    <AppBar class="h-16" />
  {/snippet}
  
  {@render children()} {/* ✅ Children renders the page content */}
</Scaffold>
```

---

### ❌ WRONG: Using React syntax
```svelte
<Scaffold className="container"> <!-- ❌ className is React! -->
  <AppBar onClick={() => {}} /> <!-- ❌ onClick is React! -->
  {children} <!-- ❌ This is React JSX syntax! -->
</Scaffold>
```

### ✅ CORRECT: Svelte syntax
```svelte
<Scaffold class="container"> <!-- ✅ class -->
  {#snippet appBar()}
    <AppBar onclick={() => {}} /> <!-- ✅ onclick -->
  {/snippet}
  {@render children()} {/* ✅ Svelte 5 render syntax */}
</Scaffold>
```

---

## Quick Reference Checklist

Before generating layout code, verify:

- [ ] I will generate **ONLY** Svelte layout code (`.svelte` files)
- [ ] I will use **ONLY** ui-svelte layout components (Scaffold, AppBar, Sidebar, etc.)
- [ ] I will **receive children** with `let { children } = $props();`
- [ ] I will **render children** with `{@render children()}`
- [ ] I will use **snippets** for layout sections: `{#snippet appBar()}...{/snippet}`
- [ ] I will **match spacing**: AppBar height = body margin
- [ ] I will **NOT use page components** (Section, Card, Button, TextField) in layouts
- [ ] I will use Svelte syntax: `class`, `onclick` (NOT `className`, `onClick`)
- [ ] I will use CSS variables for colors, NOT hex codes
- [ ] I have read the specific layout component documentation I need

---

## Summary for LLMs

**When a user asks you to create a Svelte layout:**

1. **ALWAYS use ui-svelte layout components** - Scaffold, AppBar, Sidebar, SideNav, etc.
2. **Component mapping for layouts:**
   - Root wrapper → `<Scaffold from 'ui-svelte'>`
   - Top navigation → `<AppBar from 'ui-svelte'>`
   - Side navigation → `<Sidebar from 'ui-svelte'>` + `<SideNav from 'ui-svelte'>`
   - Bottom navigation → `<BottomNav from 'ui-svelte'>`
   - Mobile menu → `<Drawer from 'ui-svelte'>`
3. **Critical layout requirements:**
   - Always: `let { children } = $props();`
   - Always: `{@render children()}` inside Scaffold
   - Use snippets: `{#snippet appBar()}...{/snippet}`
   - Match spacing: `h-16` AppBar = `mt-16` body margin
4. **Never use page components in layouts** - No Section, Card, Button, TextField, etc.
5. **Read documentation first** - Fetch specific layout component docs before generating code
6. **Choose the right pattern** - Landing page? Dashboard? Mobile app? Use common patterns above

**Your layout code should ALWAYS start with:**
```svelte
<script lang="ts">
  import { Scaffold, AppBar, Sidebar, SideNav } from 'ui-svelte';
  
  let { children } = $props(); // CRITICAL: Receive children
  
  // Navigation items, state, functions here
</script>

<Scaffold bodyClass="mt-16">
  {#snippet appBar()}
    <AppBar class="h-16" />
  {/snippet}
  
  {#snippet start()}
    <Sidebar>
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  
  {@render children()} {/* CRITICAL: Render page content */}
</Scaffold>
```

**If you're unsure about a layout component's API, ALWAYS read its documentation before generating code.**