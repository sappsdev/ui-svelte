# ui-svelte - Page Component System

> **FRAMEWORK: SVELTE/SVELTEKIT - Generate ONLY .svelte files**
> **DO NOT generate React, Vue, or any other framework code**

Semantic components for building Svelte/SvelteKit **+page.svelte** files. Optimized for AI code generation.

**This documentation is ONLY for page components**. For layout components (Navbar, Sidebar, etc.), see the separate layout documentation.

---

## 🚨 CRITICAL FOR AI ASSISTANTS

**YOU MUST:**
- Generate ONLY Svelte code (`.svelte` files)
- Use ONLY components from `'ui-svelte'` package
- Start every file with: `<script lang="ts">` and `import { ... } from 'ui-svelte';`
- Use Svelte syntax: `{#if}`, `{#each}`, `{@html}`, NOT JSX

**YOU MUST NOT:**
- Generate React/JSX code (no `className`, no `useState`, no JSX syntax)
- Generate Vue code
- Use any other component library
- Use HTML `class` attribute (Svelte uses `class` not `className`)

---

## Quick Start Template

```svelte
<script lang="ts">
  import { Section, Card, Button } from 'ui-svelte';
  
  // Your TypeScript code here
  let count = $state(0);
</script>

<!-- Your Svelte markup here -->
<Section variant="primary" isSolid bodyClass="center gap-6">
  <h1>Hello World</h1>
  <Button onclick={() => count++}>Count: {count}</Button>
</Section>
```

---

## Component Documentation

**Read these for detailed APIs and examples:**

### Layout & Structure
- [flex & grid](https://svelte.sappsdev.com/llm/flex-grid.md) - Layout utilities (`row`, `column`, `grid-*`, `gap-*`)
- [Section](https://svelte.sappsdev.com/llm/section.md) - Page structure component (hero, features, pricing)
- [Card](https://svelte.sappsdev.com/llm/card.md) - Content container component (products, profiles, stats)

### Interactive Components
- [Button](https://svelte.sappsdev.com/llm/button.md) - Interactive button component (actions, links, forms)
- [Accordion](https://svelte.sappsdev.com/llm/accordion.md) - Collapsible sections for organizing related content
- [Collapsible](https://svelte.sappsdev.com/llm/collapsible.md) - Single collapsible section for showing/hiding content
- [Carousel](https://svelte.sappsdev.com/llm/carousel.md) - Cycle through slides or content panels with navigation

### Display Components
- [Avatar](https://svelte.sappsdev.com/llm/avatar.md) - Display user profile images, initials, or icons with status indicators
- [Alert](https://svelte.sappsdev.com/llm/alert.md) - Display brief messages for users without interrupting workflow
- [Item](https://svelte.sappsdev.com/llm/item.md) - Display list items with avatars, icons, descriptions, and actions
- [Empty](https://svelte.sappsdev.com/llm/empty.md) - Display empty states with optional actions when no content is available
- [Marquee](https://svelte.sappsdev.com/llm/marquee.md) - Scrolling content widget for horizontal or vertical overflow

### Form Components
- [Checkbox](https://svelte.sappsdev.com/llm/checkbox.md) - Binary selection input for options
- [Toggle](https://svelte.sappsdev.com/llm/toggle.md) - Switch-style on/off input for settings
- [RadioGroup](https://svelte.sappsdev.com/llm/radio-group.md) - Mutually exclusive option selection
- [TextField](https://svelte.sappsdev.com/llm/text-field.md) - Single-line text input with validation
- [Textarea](https://svelte.sappsdev.com/llm/textarea.md) - Multi-line text input for longer content
- [Select](https://svelte.sappsdev.com/llm/select.md) - Dropdown selection from options list
- [ComboBox](https://svelte.sappsdev.com/llm/combo-box.md) - Searchable dropdown with async data loading
- [DateField](https://svelte.sappsdev.com/llm/date-field.md) - Date picker with calendar interface
- [PhoneField](https://svelte.sappsdev.com/llm/phone-field.md) - International phone number input with country selector
- [Slider](https://svelte.sappsdev.com/llm/slider.md) - Range input for numeric values
- [PasswordField](https://svelte.sappsdev.com/llm/password-field.md) - Password input with strength indicator
- [PinField](https://svelte.sappsdev.com/llm/pin-field.md) - Multi-digit PIN/OTP input with auto-focus
- [Dropzone](https://svelte.sappsdev.com/llm/dropzone.md) - File upload with drag-and-drop support
- [ImageCropper](https://svelte.sappsdev.com/llm/image-cropper.md) - Interactive image cropping tool
- [CsvField](https://svelte.sappsdev.com/llm/csv-field.md) - CSV file import with column mapping

### Overlay Components
- [Drawer](https://svelte.sappsdev.com/llm/drawer.md) - Panel that slides in from screen edges (start, end, top, bottom)
- [Dropdown](https://svelte.sappsdev.com/llm/dropdown.md) - Menu of options triggered by button or element
- [Modal](https://svelte.sappsdev.com/llm/modal.md) - Dialog window that overlays main content
- [Toast](https://svelte.sappsdev.com/llm/toast.md) - Lightweight auto-dismissing notifications
- [Tooltip](https://svelte.sappsdev.com/llm/tooltip.md) - Informative text displayed on hover or focus

### Advanced Components
- [Table](https://svelte.sappsdev.com/llm/table.md) - Data table with pagination, sorting, filtering, and server-side support
- [ChatBox](https://svelte.sappsdev.com/llm/chat-box.md) - Complete chat interface with real-time messaging and WebSocket support

---

## System Overview

### Hierarchy for +page.svelte

```
+page.svelte (SVELTE FILE, NOT REACT)
|-- Section (page structure: hero, features, pricing, footer)
    |-- Card (content blocks: products, profiles, stats)
        |-- Elements (Button, text, images, forms)
```

**Critical Rule**: Never nest Sections. Use Cards for nested content.

### Component Quick Reference

| Component | Purpose | Key Prop | Default | Import |
|-----------|---------|----------|---------|--------|
| **Section** | Page regions & structure | `bodyClass` | `variant="ghost"` | `'ui-svelte'` |
| **Card** | Content containers | `bodyClass` | `variant="outlined"` | `'ui-svelte'` |
| **Button** | Actions & navigation | `onclick` / `href` | `variant="primary"` | `'ui-svelte'` |

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

---

## Layout System

**Apply via `bodyClass`** on Section/Card:

- **Flex**: `row` `column` `center` `wrap`
- **Grid**: `grid-1` `grid-2` `grid-3` `grid-4` `grid-6` `grid-12` `grid-auto-fit`
- **Spacing**: `gap-2` `gap-4` `gap-6` `gap-8` `gap-12`
- **Responsive**: `column md:row`, `grid-1 md:grid-3`, `gap-2 md:gap-6`

**Breakpoints**: `sm:640px` `md:768px` `lg:1024px` `xl:1280px` `2xl:1536px`

---

## Page Structure Pattern (SVELTE SYNTAX)

```svelte
<script lang="ts">
  import { Section, Card, Button } from 'ui-svelte';
  
  // Svelte 5 reactive state
  let isOpen = $state(false);
  
  // Event handlers
  function handleClick() {
    console.log('Clicked!');
  }
</script>

<!-- Hero Section -->
<Section variant="primary" isSolid bodyClass="center gap-6 min-h-screen">
  <h1 class="text-5xl font-bold">Welcome</h1>
  <p class="text-xl">Build amazing things</p>
  <Button variant="secondary" onclick={handleClick}>Get Started</Button>
</Section>

<!-- Features Section -->
<Section variant="muted" isBoxed bodyClass="gap-12 py-20">
  <h2 class="text-3xl font-bold text-center">Features</h2>
  
  <div class="grid-1 md:grid-3 gap-6">
    <Card hasShadow bodyClass="column gap-4">
      <h3 class="text-xl font-semibold">Feature 1</h3>
      <p>Amazing feature description</p>
    </Card>
    
    <Card hasShadow bodyClass="column gap-4">
      <h3 class="text-xl font-semibold">Feature 2</h3>
      <p>Another great feature</p>
    </Card>
    
    <Card hasShadow bodyClass="column gap-4">
      <h3 class="text-xl font-semibold">Feature 3</h3>
      <p>Even more features</p>
    </Card>
  </div>
</Section>

<!-- CTA Section -->
<Section variant="secondary" isSolid bodyClass="center gap-4 py-16">
  <h2 class="text-3xl font-bold">Ready to Start?</h2>
  <Button variant="primary" size="lg">Sign Up Now</Button>
</Section>
```

---

## Svelte Syntax Reference

### State Management (Svelte 5)
```svelte
<script lang="ts">
  // Reactive state
  let count = $state(0);
  let user = $state({ name: 'John', age: 30 });
  
  // Derived state
  let doubled = $derived(count * 2);
  
  // Effects
  $effect(() => {
    console.log('Count changed:', count);
  });
</script>
```

### Conditionals
```svelte
{#if condition}
  <p>True branch</p>
{:else if otherCondition}
  <p>Else if branch</p>
{:else}
  <p>Else branch</p>
{/if}
```

### Loops
```svelte
{#each items as item, index (item.id)}
  <Card>
    <p>{index + 1}. {item.name}</p>
  </Card>
{/each}
```

### Event Handlers
```svelte
<Button onclick={() => count++}>Increment</Button>
<Button onclick={handleClick}>Handle</Button>
```

---

## Best Practices for +page.svelte

### DO ✅
- Start with `<script lang="ts">` and import from `'ui-svelte'`
- Stack Sections vertically to build pages
- Use `isBoxed` on content sections (not hero)
- Apply `bodyClass` for layouts: `row`, `column`, `grid-3`
- Always use `gap` utilities for spacing
- Mobile-first responsive: `column md:row`
- Use `class` for HTML attributes (NOT `className`)
- Use Svelte syntax: `{#if}`, `{#each}`, `onclick`
- Section for structure, Card for content, Button for actions

### DON'T ❌
- Never generate React/JSX code
- Never use `className` (use `class` instead)
- Never use React hooks (`useState`, `useEffect`, etc.)
- Never nest Sections inside Sections
- Don't use layout components here (use layout files)
- Don't apply padding via `bodyClass` (components handle it)
- Don't forget responsive breakpoints

---

## For LLMs: MANDATORY Instructions

**YOU ARE GENERATING SVELTE CODE, NOT REACT. THIS IS CRITICAL.**

When generating **+page.svelte** files:

1. **Framework**: Generate ONLY Svelte code with `.svelte` file extension
2. **Syntax**: Use Svelte syntax (`{#if}`, `{#each}`, `class`, `onclick`)
3. **State**: Use Svelte 5 runes (`$state`, `$derived`, `$effect`)
4. **Import**: Always `import { ... } from 'ui-svelte';`
5. **Structure**: Use Section for page regions (hero, features, pricing, CTA)
6. **Content**: Use Card for content blocks (products, profiles, stats)
7. **Layout**: Apply via `bodyClass` with flex/grid utilities
8. **Spacing**: Always use `gap` utilities
9. **Responsive**: Mobile-first with breakpoint prefixes
10. **No Nesting**: Never nest Sections
11. **Page Only**: This is for page content, not persistent layouts

**Component Syntax (SVELTE, NOT REACT)**:
```svelte
<script lang="ts">
  import { Section, Card, Button } from 'ui-svelte';
  let count = $state(0);
</script>

<Section variant="primary" isSolid isBoxed bodyClass="center gap-6">
  <Card variant="outlined" hasShadow bodyClass="column gap-4">
    <Button variant="primary" size="lg" onclick={() => count++}>
      Clicked {count} times
    </Button>
  </Card>
</Section>
```

**WRONG (React/JSX) - DO NOT GENERATE THIS**:
```jsx
// ❌ WRONG - This is React, not Svelte
import { useState } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);
  return (
    <Section variant="primary" className="center gap-6">
      <Button onClick={() => setCount(count + 1)}>
        Count: {count}
      </Button>
    </Section>
  );
}
```

**See individual component docs for complete APIs and pattern examples.**
