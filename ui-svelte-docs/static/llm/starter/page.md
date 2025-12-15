# ui-svelte - Page Components Documentation

> **FRAMEWORK: SVELTE/SVELTEKIT**
> **CRITICAL: You MUST generate ONLY .svelte files using ui-svelte components**

This documentation provides complete guidance for building Svelte/SvelteKit **+page.svelte** files using the ui-svelte component library. Optimized for AI code generation.

---

## 🚨 MANDATORY RULES FOR CODE GENERATION

### YOU MUST:
1. **Generate ONLY Svelte code** - Output `.svelte` files exclusively
2. **Use ONLY ui-svelte components** - Import from `'ui-svelte'` package
3. **Start every file with:**
   ```svelte
   <script lang="ts">
     import { Section, Card, Button, TextField } from 'ui-svelte';
   </script>
   ```
4. **Use Svelte 5 syntax:**
   - Reactive state: `let count = $state(0);`
   - Derived values: `let doubled = $derived(count * 2);`
   - Side effects: `$effect(() => { /* ... */ });`
   - Conditionals: `{#if condition}...{/if}`
   - Loops: `{#each items as item}...{/each}`
5. **Use correct attribute names:**
   - ✅ `class` (NOT `className`)
   - ✅ `onclick` (NOT `onClick`)
   - ✅ `onchange` (NOT `onChange`)

### YOU MUST NOT:
1. ❌ **Generate React/JSX code** - No React components or hooks
2. ❌ **Use React patterns** - No `useState`, `useEffect`, `className`, `onClick`
3. ❌ **Use native HTML elements for UI** - Never use:
   - `<button>` → Use `<Button>` from ui-svelte
   - `<input>` → Use `<TextField>` from ui-svelte
   - `<textarea>` → Use `<Textarea>` from ui-svelte
   - `<select>` → Use `<Select>` from ui-svelte
   - Plain `<div>` for containers → Use `<Section>`, `<Card>`
4. ❌ **Use hex color codes** - Never use `#FFFFFF`, `#000000`, etc.
   - ✅ Use CSS variables: `var(--primary)`, `var(--surface)`, etc.
5. ❌ **Import from other libraries** - Only use `'ui-svelte'`

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
<div style="background: var(--primary); color: var(--on-primary);">
  Primary background with proper text color
</div>
```

---

## Quick Start Template

**Use this as your starting point for every page:**

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

## Component Documentation Links

**Before generating code, READ the specific documentation for each component you plan to use:**

### 🎨 Layout & Styling
- **[Flex & Grid](https://svelte.sappsdev.com/llm/starter/flex-grid.md)** - Layout utilities (`row`, `column`, `grid-1`, `grid-2`, `grid-3`, `gap-4`, etc.)
- **[Typography](https://svelte.sappsdev.com/llm/starter/typography.md)** - Text styles (`prose`, `lead`, `hero-title`, utility classes)
- **[Icons](https://svelte.sappsdev.com/llm/starter/icons.md)** - Icon component with API endpoint for searching icons
- **[i18n](https://svelte.sappsdev.com/llm/starter/i18n.md)** - Internationalization with translations, formatting, pluralization

### 🎛️ Control Components (User Actions)
- **[Button](https://svelte.sappsdev.com/llm/control/button.md)** - Buttons for actions and navigation (USE THIS instead of `<button>`)
- **[IconButton](https://svelte.sappsdev.com/llm/control/icon-button.md)** - Compact icon-only buttons for toolbars

### 📦 Display Components (Content Presentation)
- **[Section](https://svelte.sappsdev.com/llm/display/section.md)** - Top-level page containers (hero, features, etc.) - **NEVER NEST SECTIONS**
- **[Card](https://svelte.sappsdev.com/llm/display/card.md)** - Content containers (products, profiles, stats)
- **[Accordion](https://svelte.sappsdev.com/llm/display/accordion.md)** - Collapsible sections
- **[Alert](https://svelte.sappsdev.com/llm/display/alert.md)** - Status messages (info, success, warning, danger)
- **[Avatar](https://svelte.sappsdev.com/llm/display/avatar.md)** - User profile images
- **[AvatarGroup](https://svelte.sappsdev.com/llm/display/avatar-group.md)** - Stacked avatar collections
- **[Badge](https://svelte.sappsdev.com/llm/display/badge.md)** - Status indicators
- **[Carousel](https://svelte.sappsdev.com/llm/display/carousel.md)** - Content sliders
- **[Chip](https://svelte.sappsdev.com/llm/display/chip.md)** - Labels, tags, status indicators
- **[Code](https://svelte.sappsdev.com/llm/display/code.md)** - Syntax-highlighted code blocks
- **[Collapsible](https://svelte.sappsdev.com/llm/display/collapsible.md)** - Single expand/collapse section
- **[Empty](https://svelte.sappsdev.com/llm/display/empty.md)** - Empty state placeholders
- **[Marquee](https://svelte.sappsdev.com/llm/display/marquee.md)** - Auto-scrolling content
- **[Table](https://svelte.sappsdev.com/llm/display/table.md)** - Data tables with pagination, sorting, filtering

### 📝 Form Components (User Input)
- **[TextField](https://svelte.sappsdev.com/llm/form/text-field.md)** - Single-line text input (USE THIS instead of `<input type="text">`)
- **[PasswordField](https://svelte.sappsdev.com/llm/form/password-field.md)** - Password input with strength meter (USE THIS instead of `<input type="password">`)
- **[Textarea](https://svelte.sappsdev.com/llm/form/textarea.md)** - Multi-line text input (USE THIS instead of `<textarea>`)
- **[Select](https://svelte.sappsdev.com/llm/form/select.md)** - Dropdown menu (USE THIS instead of `<select>`)
- **[Checkbox](https://svelte.sappsdev.com/llm/form/checkbox.md)** - Binary selection (USE THIS instead of `<input type="checkbox">`)
- **[Toggle](https://svelte.sappsdev.com/llm/form/toggle.md)** - Switch-style binary input
- **[ComboBox](https://svelte.sappsdev.com/llm/form/combo-box.md)** - Searchable dropdown with async support
- **[DateField](https://svelte.sappsdev.com/llm/form/date-field.md)** - Date picker input
- **[PhoneField](https://svelte.sappsdev.com/llm/form/phone-field.md)** - International phone number input
- **[Slider](https://svelte.sappsdev.com/llm/form/slider.md)** - Numeric range slider
- **[PinField](https://svelte.sappsdev.com/llm/form/pin-field.md)** - Multi-digit PIN/OTP input
- **[Dropzone](https://svelte.sappsdev.com/llm/form/dropzone.md)** - Drag-and-drop file upload
- **[CsvField](https://svelte.sappsdev.com/llm/form/csv-field.md)** - CSV import with column mapping

### 🧭 Navigation Components
- **[Tabs](https://svelte.sappsdev.com/llm/navigation/tabs.md)** - Organize content into switchable sections

---

## Page Structure Pattern

**Standard pattern for building pages:**

```svelte
<script lang="ts">
  import { Section, Card, Button } from 'ui-svelte';
  
  let isOpen = $state(false);
</script>

<!-- Hero Section (Full-screen introduction) -->
<Section variant="primary" isSolid bodyClass="center gap-6 min-h-screen">
  <h1 class="text-5xl font-bold">Welcome to Our Product</h1>
  <p class="text-xl">Tagline or brief description</p>
  <Button variant="secondary" onclick={() => isOpen = true}>Get Started</Button>
</Section>

<!-- Features Section (Content grid) -->
<Section variant="muted" isBoxed bodyClass="gap-12 py-20">
  <h2 class="text-3xl font-bold text-center">Our Features</h2>
  
  <div class="grid-1 md:grid-3 gap-6">
    <Card hasShadow bodyClass="column gap-4">
      <h3>Feature 1</h3>
      <p>Feature description goes here</p>
    </Card>
    
    <Card hasShadow bodyClass="column gap-4">
      <h3>Feature 2</h3>
      <p>Feature description goes here</p>
    </Card>
    
    <Card hasShadow bodyClass="column gap-4">
      <h3>Feature 3</h3>
      <p>Feature description goes here</p>
    </Card>
  </div>
</Section>

<!-- Call to Action Section -->
<Section variant="primary" isSolid bodyClass="center gap-4 py-20">
  <h2 class="text-3xl font-bold">Ready to Get Started?</h2>
  <Button variant="secondary" size="lg">Sign Up Now</Button>
</Section>
```

---

## Component Hierarchy Rules

```
+page.svelte
├── Section (Top-level: hero, features, pricing, CTA)
│   ├── Card (Nested content: products, profiles, stats)
│   │   └── Elements (UI components: Button, TextField, etc.)
│   └── Elements (Direct children: headings, paragraphs)
```

### ⚠️ CRITICAL RULES:
1. **Never nest Sections inside other Sections** - Sections are top-level only
2. **Use Cards for nested content containers** - Cards go inside Sections
3. **UI elements go inside Cards or directly in Sections** - Buttons, TextFields, etc.

**❌ WRONG:**
```svelte
<Section>
  <Section> <!-- Never nest Sections! -->
    <p>Content</p>
  </Section>
</Section>
```

**✅ CORRECT:**
```svelte
<Section>
  <Card>
    <p>Content</p>
  </Card>
</Section>
```

---

## Svelte 5 Syntax Reference

**Use these patterns in your generated code:**

### State Management
```svelte
<script lang="ts">
  // Reactive state
  let count = $state(0);
  
  // Derived/computed values
  let doubled = $derived(count * 2);
  let isEven = $derived(count % 2 === 0);
  
  // Side effects (runs when dependencies change)
  $effect(() => {
    console.log('Count changed:', count);
    document.title = `Count: ${count}`;
  });
  
  // Functions
  function increment() {
    count++;
  }
</script>
```

### Conditionals
```svelte
<!-- If/Else -->
{#if count > 10}
  <p>Count is greater than 10</p>
{:else if count > 5}
  <p>Count is between 6 and 10</p>
{:else}
  <p>Count is 5 or less</p>
{/if}
```

### Loops
```svelte
<!-- Each Loop (with key for performance) -->
{#each items as item (item.id)}
  <Card>
    <h3>{item.name}</h3>
    <p>{item.description}</p>
  </Card>
{/each}

<!-- Each Loop with index -->
{#each items as item, index}
  <p>{index + 1}. {item.name}</p>
{/each}

<!-- Empty state -->
{#each items as item}
  <Card>{item.name}</Card>
{:else}
  <Empty>No items found</Empty>
{/each}
```

### Event Handlers
```svelte
<!-- Click events -->
<Button onclick={() => count++}>Increment</Button>
<Button onclick={handleClick}>Handle Click</Button>

<!-- Input events -->
<TextField bind:value={name} onchange={() => console.log('Changed!')} />

<!-- Form submission -->
<form onsubmit={(e) => {
  e.preventDefault();
  handleSubmit();
}}>
  <TextField bind:value={email} />
  <Button type="submit">Submit</Button>
</form>
```

### Two-way Binding
```svelte
<script lang="ts">
  let text = $state('');
  let checked = $state(false);
  let selected = $state('');
</script>

<TextField bind:value={text} />
<Checkbox bind:checked />
<Select bind:value={selected} options={[...]} />
```

---

## Common Patterns & Examples

### Login Form
```svelte
<script lang="ts">
  import { Section, Card, TextField, PasswordField, Button } from 'ui-svelte';
  
  let email = $state('');
  let password = $state('');
  let isLoading = $state(false);
  
  async function handleLogin() {
    isLoading = true;
    // Login logic here
    isLoading = false;
  }
</script>

<Section bodyClass="center min-h-screen">
  <Card bodyClass="column gap-4 w-full max-w-md">
    <h1 class="text-2xl font-bold">Login</h1>
    
    <TextField
      label="Email"
      type="email"
      bind:value={email}
      placeholder="you@example.com"
    />
    
    <PasswordField
      label="Password"
      bind:value={password}
    />
    
    <Button
      isWide
      isLoading={isLoading}
      onclick={handleLogin}
    >
      Sign In
    </Button>
  </Card>
</Section>
```

### Data Table with Actions
```svelte
<script lang="ts">
  import { Section, Table, Button } from 'ui-svelte';
  
  let users = $state([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
  
  function handleEdit(user) {
    console.log('Edit:', user);
  }
  
  function handleDelete(user) {
    users = users.filter(u => u.id !== user.id);
  }
</script>

<Section bodyClass="column gap-6">
  <h1>Users</h1>
  
  <Table
    data={users}
    columns={[
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      {
        key: 'actions',
        label: 'Actions',
        render: (user) => `
          <div class="row gap-2">
            <Button size="sm" onclick={() => handleEdit(user)}>Edit</Button>
            <Button size="sm" variant="danger" onclick={() => handleDelete(user)}>Delete</Button>
          </div>
        `
      }
    ]}
  />
</Section>
```

---

## Step-by-Step Code Generation Process

**Follow this process when generating code:**

1. **Read the requirements** - Understand what the user wants to build
2. **Identify needed components** - Determine which ui-svelte components are required
3. **Read component documentation** - Fetch and read the specific docs for each component
4. **Plan the structure** - Outline Sections → Cards → Elements hierarchy
5. **Generate the code** - Write complete, working Svelte code using ui-svelte components
6. **Verify compliance** - Check that you:
   - ✅ Used only ui-svelte components (no `<button>`, `<input>`, etc.)
   - ✅ Used Svelte 5 syntax (`$state`, `{#if}`, etc.)
   - ✅ Used correct attribute names (`class`, `onclick`)
   - ✅ Used CSS variables for colors (no hex codes)
   - ✅ Imported from `'ui-svelte'`

---

## Quick Reference Checklist

Before generating code, verify:

- [ ] I will generate **ONLY** Svelte code (`.svelte` files)
- [ ] I will use **ONLY** components from `'ui-svelte'`
- [ ] I will **NOT** use native HTML elements (`<button>`, `<input>`, `<div>` for UI)
- [ ] I will use Svelte 5 syntax (`$state`, `$derived`, `$effect`)
- [ ] I will use `class` not `className`, `onclick` not `onClick`
- [ ] I will use CSS variables for colors, not hex codes
- [ ] I will import: `import { ... } from 'ui-svelte';`
- [ ] I will **NOT** nest Sections (use Cards instead)
- [ ] I have read the specific component documentation I need

---

## Summary for LLMs

**When a user asks you to create a Svelte page:**

1. **ALWAYS use ui-svelte components** - Never use native HTML for UI elements
2. **Component mapping:**
   - `<button>` → `<Button from 'ui-svelte'>`
   - `<input>` → `<TextField from 'ui-svelte'>`
   - `<textarea>` → `<Textarea from 'ui-svelte'>`
   - `<select>` → `<Select from 'ui-svelte'>`
   - Container divs → `<Section>` or `<Card from 'ui-svelte'>`
3. **Read documentation first** - Fetch the specific component docs before generating code
4. **Use Svelte 5 syntax** - `$state`, `$derived`, `$effect`, `{#if}`, `{#each}`
5. **CSS variables only** - Never use hex color codes
6. **Structure pattern** - Section → Card → Elements (no nested Sections)

**Your code should ALWAYS start with:**
```svelte
<script lang="ts">
  import { Section, Card, Button, TextField /* ... */ } from 'ui-svelte';
  
  // State and logic here
</script>

<!-- UI components from ui-svelte here -->
```

**If you're unsure about a component's API, ALWAYS read its documentation before generating code.**