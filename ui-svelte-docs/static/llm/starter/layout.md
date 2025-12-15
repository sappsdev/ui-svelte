# ui-svelte - Layout Components

> **FRAMEWORK: SVELTE/SVELTEKIT - Generate ONLY .svelte files**
> **DO NOT generate React, Vue, or any other framework code**

Layout components for building Svelte/SvelteKit **+layout.svelte** files. Optimized for AI code generation.

**This documentation is ONLY for layout components**. For page content (Section, Card, etc.), see the [page documentation](https://ui-svelte.sappsdev.com/llm/starter/page.md).

---

## 🚨 CRITICAL FOR AI ASSISTANTS

**YOU MUST:**
- Generate ONLY Svelte code (`.svelte` files)
- Use ONLY components from `'ui-svelte'` package
- Start every file with: `<script lang="ts">` and `import { ... } from 'ui-svelte';`
- Use `let { children } = $props();` to receive children prop
- Use `{@render children()}` to render page content
- Use Svelte syntax: `{#snippet}`, `{@render}`, NOT JSX

**YOU MUST NOT:**
- Generate React/JSX code (no `className`, no `useState`)
- Use any other component library
- **NEVER** use hex color codes (e.g. `#FFFFFF`, `#000000`). Use theme variables only.

---

## Color System

**ALWAYS use these variables for colors. NEVER use hex codes.**

| Token | Description | Light Theme | Dark Theme |
|-------|-------------|-------------|------------|
| `--primary` | Main brand color | Violet | Violet |
| `--on-primary` | Text on primary | White | White |
| `--secondary` | Accent color | Pink | Pink |
| `--on-secondary` | Text on secondary | White | White |
| `--surface` | Card/Container background | White | Dark Grey |
| `--on-surface` | Text on surface | Dk Grey | Lt Grey |
| `--background` | Page background | White | Very Dark |
| `--on-background` | Text on background | Black | White |
| `--muted` | Secondary text/bg | Lt Grey | Dk Grey |
| `--on-muted` | Text on muted | Grey | Grey |
| `--outline` | Borders/Dividers | Grey | Grey |
| `--success` | Success state | Green | Green |
| `--warning` | Warning state | Orange | Orange |
| `--danger` | Error state | Red | Red |

---

## Quick Start Template

```svelte
<script lang="ts">
  import { Scaffold, AppBar, Sidebar, SideNav } from 'ui-svelte';
  
  let { children } = $props();
  
  const navItems = [
    { label: 'Home', icon: 'fluent:home-24-regular', href: '/' },
    { label: 'Settings', icon: 'fluent:settings-24-regular', href: '/settings' }
  ];
</script>

<Scaffold mainClass="lg:p-4" startClass="invisible lg:visible lg:w-56" bodyClass="mt-16" isBoxed>
  {#snippet appBar()}
    <AppBar class="h-16" isSticky isBoxed>
      {#snippet start()}<h4>My App</h4>{/snippet}
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

## Component Documentation

**Read these for detailed APIs and examples:**

### Layout Components
- [Scaffold](https://ui-svelte.sappsdev.com/llm/layout/scaffold.md): Base application structure with AppBar, Sidebar, BottomNav
- [AppBar](https://ui-svelte.sappsdev.com/llm/layout/app-bar.md): Top navigation bar with `start`, `center`, `end` snippets
- [Footer](https://ui-svelte.sappsdev.com/llm/layout/footer.md): Bottom section with copyright, navigation links, and actions

### Navigation Components
- [NavMenu](https://ui-svelte.sappsdev.com/llm/navigation/nav-menu.md): Horizontal navigation for AppBar
- [SideNav](https://ui-svelte.sappsdev.com/llm/navigation/sidenav.md): Vertical navigation items for Sidebar
- [BottomNav](https://ui-svelte.sappsdev.com/llm/navigation/bottom-nav.md): Fixed bottom navigation for mobile apps

### Supporting Components (used within layouts)
- [Sidebar](https://ui-svelte.sappsdev.com/llm/layout/sidebar.md): Vertical navigation panel with `header`, `footer` snippets
- Drawer: Slide-in panel for mobile navigation
- Footer: Page footer component

---

## Layout Structure Pattern

```
+layout.svelte
├── Scaffold (root layout wrapper)
│   ├── appBar → AppBar (fixed top)
│   ├── start → Sidebar + SideNav (left panel)
│   ├── end → Sidebar (right panel)
│   ├── bottomBar → BottomNav (fixed bottom)
│   └── children → {@render children()} (page content)
```

**Critical Rule**: Always use `let { children } = $props();` and `{@render children()}`.

---

## Key Spacing Rules

| AppBar Height | bodyClass | vh utility |
|---------------|-----------|------------|
| `h-16` | `mt-16` | `vh-16` |
| `h-20` | `mt-20` | `vh-20` |
| `h-16` + BottomNav | `mt-16 pb-16` | `vh-32` |

**vh utilities**: `vh-16` = `calc(100vh - 4rem)` for Sidebar height.

---

## Common Layout Patterns

### Landing Page (AppBar + Footer)
```svelte
<Scaffold mainClass="vh-16 mt-16">
  {#snippet appBar()}
    <AppBar class="h-16" isBoxed isSticky />
  {/snippet}
  {@render children()}
  <Footer isBoxed />
</Scaffold>
```

### Dashboard (AppBar + Sidebar)
```svelte
<Scaffold
  mainClass="lg:p-4"
  startClass="invisible lg:visible lg:w-56"
  bodyClass="mt-16"
  isBoxed
>
  {#snippet appBar()}
    <AppBar class="h-16" isSticky isBoxed />
  {/snippet}
  {#snippet start()}
    <Sidebar rootClass="vh-16">
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}
  {@render children()}
</Scaffold>
```

### Mobile App (AppBar + BottomNav)
```svelte
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

### Responsive (Sidebar + Drawer for mobile)
```svelte
<script lang="ts">
  let { children } = $props();
  let drawerOpen = $state(false);
</script>

<Scaffold startClass="invisible lg:visible lg:w-56" bodyClass="mt-16">
  {#snippet appBar()}
    <AppBar class="h-16">
      {#snippet start()}
        <IconButton icon="fluent:navigation-24-regular" onclick={() => drawerOpen = true} class="lg:hidden" />
        <h4>My App</h4>
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

<Drawer bind:open={drawerOpen}>
  <SideNav items={navItems} />
</Drawer>
```

---

## For LLMs: Summary

1. **Framework**: Svelte/SvelteKit ONLY
2. **Children**: Always `let { children } = $props();` + `{@render children()}`
3. **Snippets**: Use `{#snippet name()}...{/snippet}` for layout sections
4. **Structure**: Scaffold → (appBar, start, end, bottomBar) → children
5. **Spacing**: Match `bodyClass="mt-16"` to AppBar `class="h-16"`
6. **Responsive**: Use `invisible lg:visible` + Drawer for mobile
7. **No Page Components**: Never use Section, Card in layouts

**See [Scaffold docs](https://ui-svelte.sappsdev.com/llm/layout/scaffold.md) for complete API.**
