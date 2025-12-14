# ui-svelte - Page Components

> **FRAMEWORK: SVELTE/SVELTEKIT - Generate ONLY .svelte files**
> **DO NOT generate React, Vue, or any other framework code**

Semantic components for building Svelte/SvelteKit **+page.svelte** files. Optimized for AI code generation.

**This documentation is ONLY for page components**. For layouts (Navbar, Sidebar) and installation, see separate documentation.

---

## 🚨 CRITICAL FOR AI ASSISTANTS

**YOU MUST:**
- Generate ONLY Svelte code (`.svelte` files)
- Use ONLY components from `'ui-svelte'` package
- Start every file with: `<script lang="ts">` and `import { ... } from 'ui-svelte';`
- Use Svelte syntax: `{#if}`, `{#each}`, `{@html}`, NOT JSX
- Use `class` attribute, NOT `className`
- Use `onclick`, NOT `onClick`
- Use Svelte 5 runes: `$state`, `$derived`, `$effect`

**YOU MUST NOT:**
- Generate React/JSX code
- Use React hooks (`useState`, `useEffect`, etc.)
- Use any other component library

---

## Quick Start Template

```svelte
<script lang="ts">
  import { Section, Card, Button } from 'ui-svelte';
  
  let count = $state(0);
</script>

<Section variant="primary" isSolid bodyClass="center gap-6">
  <h1>Hello World</h1>
  <Button onclick={() => count++}>Count: {count}</Button>
</Section>
```

---

## Component Documentation

**Read these for detailed APIs and examples:**

### Starter
- [Flex & Grid](https://svelte.sappsdev.com/llm/starter/flex-grid.md): Layout utilities (`row`, `column`, `grid-*`, `gap-*`)
- [Typography](https://svelte.sappsdev.com/llm/starter/typography.md): Text styles (`prose`, `lead`, `hero-title`, utility classes)
- [Icons](https://svelte.sappsdev.com/llm/starter/icons.md): Icon component with API endpoint for searching icons
- [i18n](https://svelte.sappsdev.com/llm/starter/i18n.md): Internationalization with translations, formatting, and pluralization

### Control Components
- [Button](https://svelte.sappsdev.com/llm/control/button.md): Interactive button component for actions and navigation

### Display Components
- [Card](https://svelte.sappsdev.com/llm/display/card.md): Content container for displaying grouped information
- [Code](https://svelte.sappsdev.com/llm/display/code.md): Syntax-highlighted code blocks with copy functionality
- [Avatar](https://svelte.sappsdev.com/llm/display/avatar.md): Display user profile images, initials, or icons
- [AvatarGroup](https://svelte.sappsdev.com/llm/display/avatar-group.md): Display stacked or separated avatar collections

### Navigation Components
- [Tabs](https://svelte.sappsdev.com/llm/navigation/tabs.md): Organize content into switchable sections

---

## Page Structure Pattern

```svelte
<script lang="ts">
  import { Section, Card, Button } from 'ui-svelte';
  
  let isOpen = $state(false);
</script>

<!-- Hero Section -->
<Section variant="primary" isSolid bodyClass="center gap-6 min-h-screen">
  <h1 class="text-5xl font-bold">Welcome</h1>
  <Button variant="secondary" onclick={() => isOpen = true}>Get Started</Button>
</Section>

<!-- Features Section -->
<Section variant="muted" isBoxed bodyClass="gap-12 py-20">
  <h2 class="text-3xl font-bold text-center">Features</h2>
  
  <div class="grid-1 md:grid-3 gap-6">
    <Card hasShadow bodyClass="column gap-4">
      <h3>Feature 1</h3>
      <p>Amazing feature description</p>
    </Card>
  </div>
</Section>
```

---

## Hierarchy

```
+page.svelte
├── Section (hero, features, pricing, CTA)
│   └── Card (products, profiles, stats)
│       └── Elements (Button, text, images)
```

**Critical Rule**: Never nest Sections. Use Cards for nested content.

---

## Svelte Syntax Reference

```svelte
<script lang="ts">
  // Reactive state
  let count = $state(0);
  
  // Derived state
  let doubled = $derived(count * 2);
  
  // Effects
  $effect(() => {
    console.log('Count changed:', count);
  });
</script>

<!-- Conditionals -->
{#if condition}
  <p>True</p>
{:else}
  <p>False</p>
{/if}

<!-- Loops -->
{#each items as item (item.id)}
  <Card>{item.name}</Card>
{/each}

<!-- Event Handlers -->
<Button onclick={() => count++}>Click</Button>
```

---

## For LLMs: Summary

1. **Framework**: Svelte/SvelteKit ONLY
2. **Syntax**: `{#if}`, `{#each}`, `class`, `onclick`
3. **State**: `$state`, `$derived`, `$effect`
4. **Import**: `from 'ui-svelte'`
5. **Structure**: Section → Card → Elements
6. **Layout**: `bodyClass` with flex/grid utilities
7. **No Nesting**: Never nest Sections

**See individual component docs for complete APIs.**
