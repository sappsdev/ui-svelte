# ui-svelte Page Documentation

Complete reference for building pages with ui-svelte components.

---

## Page Structure

Pages are composed of Section components. Never place components directly in page root.

```
+page.svelte
└── Section (one or more)
    └── Card, Button, Typography, etc.
```

### Quick Start

```svelte
<script>
	import { Section, Card, Button } from 'ui-svelte';
</script>

<!-- Hero -->
<Section cover="/hero.jpg" variant="solid" rootClass="min-h-screen" bodyClass="text-center">
	<h1 class="hero-title">Welcome</h1>
	<p class="hero-subtitle">Amazing things start here</p>
	<Button color="primary" size="lg">Get Started</Button>
</Section>

<!-- Features -->
<Section color="surface" variant="soft" isBoxed>
	<h2 class="section-title text-center">Features</h2>
	<div class="grid-3 gap-6">
		<Card>
			<h3 class="feature-title">Feature 1</h3>
			<p class="feature-description">Description</p>
		</Card>
	</div>
</Section>

<!-- CTA -->
<Section color="primary" variant="solid" bodyClass="text-center">
	<h2 class="cta-title text-white">Ready to Start?</h2>
	<Button color="secondary" size="lg">Sign Up Now</Button>
</Section>
```

### Section Patterns

| Pattern | Props                                                  | Use Case          |
| ------- | ------------------------------------------------------ | ----------------- |
| Hero    | `cover`, `variant="solid"`, `rootClass="min-h-screen"` | Full-screen hero  |
| Content | `color="surface"`, `variant="soft"`, `isBoxed`         | Readable sections |
| CTA     | `color="primary"`, `variant="solid"`                   | Call-to-action    |

---

## Component Documentation Links

**Read specific docs for detailed API:**

### Display Components

- [Section](https://ui-svelte.sappsdev.com/llm/display/section.md) - Page content wrapper
- [Card](https://ui-svelte.sappsdev.com/llm/display/card.md) - Content container
- [Alert](https://ui-svelte.sappsdev.com/llm/display/alert.md) - Notifications
- [Avatar](https://ui-svelte.sappsdev.com/llm/display/avatar.md) - User images
- [Badge](https://ui-svelte.sappsdev.com/llm/display/badge.md) - Status indicators
- [Chip](https://ui-svelte.sappsdev.com/llm/display/chip.md) - Tags and filters
- [Table](https://ui-svelte.sappsdev.com/llm/display/table.md) - Data tables
- [Accordion](https://ui-svelte.sappsdev.com/llm/display/accordion.md) - Collapsible sections
- [Carousel](https://ui-svelte.sappsdev.com/llm/display/carousel.md) - Image sliders
- [Skeleton](https://ui-svelte.sappsdev.com/llm/display/skeleton.md) - Loading states

### Form Components

- [TextField](https://ui-svelte.sappsdev.com/llm/form/text-field.md) - Text input
- [Select](https://ui-svelte.sappsdev.com/llm/form/select.md) - Dropdown select
- [Checkbox](https://ui-svelte.sappsdev.com/llm/form/checkbox.md) - Boolean input
- [Toggle](https://ui-svelte.sappsdev.com/llm/form/toggle.md) - Switch input
- [RadioGroup](https://ui-svelte.sappsdev.com/llm/form/radio-group.md) - Radio options
- [DateField](https://ui-svelte.sappsdev.com/llm/form/date-field.md) - Date picker
- [ComboBox](https://ui-svelte.sappsdev.com/llm/form/combo-box.md) - Autocomplete
- [Editor](https://ui-svelte.sappsdev.com/llm/form/editor.md) - Rich text editor
- [Form](https://ui-svelte.sappsdev.com/llm/form/form.md) - Form validation

### Control Components

- [Button](https://ui-svelte.sappsdev.com/llm/control/button.md) - Actions
- [IconButton](https://ui-svelte.sappsdev.com/llm/control/icon-button.md) - Icon actions
- [Image](https://ui-svelte.sappsdev.com/llm/control/image.md) - Optimized images
- [Video](https://ui-svelte.sappsdev.com/llm/control/video.md) - Video player

---

## Section Component

Layout container for page content. Must be direct child of pages.

### Props

| Prop        | Type                           | Default     | Description                 |
| ----------- | ------------------------------ | ----------- | --------------------------- |
| `cover`     | `string`                       | -           | Background image URL        |
| `color`     | `ColorType`                    | `'default'` | Color theme                 |
| `variant`   | `'solid' \| 'soft' \| 'ghost'` | `'ghost'`   | Visual style                |
| `isBoxed`   | `boolean`                      | `false`     | Constrain content width     |
| `rootClass` | `string`                       | -           | Classes for container       |
| `bodyClass` | `string`                       | -           | Classes for content wrapper |

### Examples

```svelte
<!-- Hero -->
<Section cover="/hero.jpg" variant="solid" rootClass="min-h-screen">
	<div class="text-white text-center">
		<h1 class="hero-title">Welcome</h1>
		<Button color="primary" size="lg">Get Started</Button>
	</div>
</Section>

<!-- Content -->
<Section color="surface" variant="soft" isBoxed>
	<h2 class="section-title">Features</h2>
	<div class="grid-3 gap-6">
		<Card><h3 class="feature-title">Fast</h3></Card>
	</div>
</Section>

<!-- CTA -->
<Section color="primary" variant="solid" bodyClass="text-center">
	<h2 class="cta-title text-white">Ready?</h2>
	<Button color="secondary">Sign Up</Button>
</Section>
```

---

## Card Component

Container for content and actions.

### Props

| Prop        | Type                                         | Default      |
| ----------- | -------------------------------------------- | ------------ |
| `cover`     | `string`                                     | -            |
| `color`     | `ColorType`                                  | `'default'`  |
| `variant`   | `'solid' \| 'soft' \| 'outlined' \| 'ghost'` | `'outlined'` |
| `rootClass` | `string`                                     | -            |

### Examples

```svelte
<!-- Basic -->
<Card>
	<h3 class="card-title">Title</h3>
	<p class="card-description">Description</p>
</Card>

<!-- With header/footer -->
<Card>
	{#snippet header()}
		<h4 class="card-title">Title</h4>
	{/snippet}
	<p class="body-md">Content</p>
	{#snippet footer()}
		<Button size="sm">Action</Button>
	{/snippet}
</Card>

<!-- With cover -->
<Card cover="/image.jpg">
	<h4 class="card-title">Product</h4>
	<p class="card-description">$99.99</p>
</Card>

<!-- Color variants -->
<Card color="primary" variant="soft">
	<h3 class="display-md">1,234</h3>
	<p class="body-sm text-on-muted">Total Users</p>
</Card>
```

---

## Button Component

### Props

| Prop         | Type                                         | Default     |
| ------------ | -------------------------------------------- | ----------- |
| `onclick`    | `() => void`                                 | -           |
| `type`       | `'button' \| 'submit' \| 'reset'`            | `'button'`  |
| `href`       | `string`                                     | -           |
| `color`      | `ColorType`                                  | `'primary'` |
| `variant`    | `'solid' \| 'soft' \| 'outlined' \| 'ghost'` | `'solid'`   |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`       | `'md'`      |
| `isLoading`  | `boolean`                                    | `false`     |
| `isWide`     | `boolean`                                    | `false`     |
| `isDisabled` | `boolean`                                    | `false`     |

### Examples

```svelte
<Button color="primary" variant="solid">Primary</Button>
<Button color="danger" variant="soft">Delete</Button>
<Button color="secondary" variant="ghost">Cancel</Button>
<Button size="lg">Large</Button>
<Button href="/dashboard">Link</Button>
<Button isLoading>Processing...</Button>

<!-- Button group -->
<div class="row gap-2">
	<Button variant="ghost">Cancel</Button>
	<Button color="primary">Confirm</Button>
</div>
```

---

## TextField Component

Single-line text input.

### Props

| Prop          | Default      | Description                                     |
| ------------- | ------------ | ----------------------------------------------- |
| `value`       | `''`         | Input value (bindable)                          |
| `type`        | `'text'`     | `text` `password` `email` `number` `tel` `url`  |
| `label`       | -            | Label text                                      |
| `placeholder` | -            | Placeholder                                     |
| `helpText`    | -            | Help message                                    |
| `errorText`   | -            | Error message                                   |
| `variant`     | `'outlined'` | `primary` `secondary` `muted` `outlined` `line` |
| `size`        | `'md'`       | `sm` `md` `lg`                                  |

### Examples

```svelte
<TextField bind:value label="Username" />
<TextField bind:value type="email" label="Email" />
<TextField bind:value type="password" label="Password" />
<TextField bind:value label="Name" errorText={!value ? 'Required' : ''} />
```

---

## Select Component

Dropdown for choosing options.

### Props

| Prop          | Description                                  |
| ------------- | -------------------------------------------- |
| `name`        | Form field name (required)                   |
| `options`     | Array of `{ id, label, description?, src? }` |
| `value`       | Selected value (bindable)                    |
| `label`       | Label text                                   |
| `placeholder` | Placeholder                                  |
| `errorText`   | Error message                                |

### Examples

```svelte
<script>
	const options = [
		{ id: '1', label: 'Option 1' },
		{ id: '2', label: 'Option 2' }
	];
	let value = $state('');
</script>

<Select name="option" {options} bind:value label="Choose" />
<Select name="option" {options} bind:value errorText={!value ? 'Required' : ''} />
```

---

## Typography

CSS classes for responsive text styling.

### Semantic Classes

```html
<!-- Hero -->
<h1 class="hero-title">Main Title</h1>
<p class="hero-subtitle">Subtitle</p>
<p class="hero-description">Description</p>

<!-- Section -->
<h2 class="section-title">Section Title</h2>
<p class="section-subtitle">Subtitle</p>
<p class="section-description">Description</p>

<!-- CTA -->
<h3 class="cta-title">CTA Title</h3>
<p class="cta-subtitle">Subtitle</p>

<!-- Features & Cards -->
<h4 class="feature-title">Feature</h4>
<p class="feature-description">Description</p>
<h5 class="card-title">Card Title</h5>
<p class="card-description">Description</p>
```

### Size Classes

| Display                | Heading                    | Body      |
| ---------------------- | -------------------------- | --------- |
| `display-2xl` (3-6rem) | `heading-xl` (1.75-2.5rem) | `body-xl` |
| `display-xl`           | `heading-lg`               | `body-lg` |
| `display-lg`           | `heading-md`               | `body-md` |
| `display-md`           | `heading-sm`               | `body-sm` |
| `display-sm`           |                            |           |

### Utilities

```html
<span class="text-bold">Bold</span>
<span class="subheading">UPPERCASE</span>
<span class="overline-primary">OVERLINE</span>
<p class="lead">Lead paragraph</p>
<p class="caption-lg">Caption text</p>
```

---

## Flex & Grid

Layout utility classes.

### Flex

| Class    | Description       |
| -------- | ----------------- |
| `row`    | Horizontal layout |
| `column` | Vertical layout   |
| `wrap`   | Allow wrapping    |
| `center` | Center both axes  |

### Grid

| Class                | Description         |
| -------------------- | ------------------- |
| `grid-1` to `grid-6` | Fixed columns       |
| `grid-auto-fit`      | Responsive auto-fit |

### Examples

```svelte
<!-- Row -->
<div class="row gap-4">
	<div>Item 1</div>
	<div>Item 2</div>
</div>

<!-- Column -->
<div class="column gap-4">
	<div>Item 1</div>
	<div>Item 2</div>
</div>

<!-- Grid -->
<div class="grid-3 gap-6">
	<Card>1</Card>
	<Card>2</Card>
	<Card>3</Card>
</div>

<!-- Responsive -->
<div class="grid-1 md:grid-2 lg:grid-3 gap-4">
	<Card>Responsive</Card>
</div>

<!-- Centered -->
<div class="column center gap-6 min-h-screen">
	<h1 class="hero-title">Centered</h1>
</div>
```

---

## Rich Text

CSS classes for inline text decorations.

### Styles

| Class   | Effect               |
| ------- | -------------------- |
| `mark`  | Background highlight |
| `grad`  | Gradient text        |
| `glow`  | Glowing shadow       |
| `slant` | Angled background    |
| `neon`  | Neon flicker         |
| `pop`   | 3D pop-out           |
| `pill`  | Rounded border       |
| `under` | Animated underline   |
| `box`   | Framed border        |
| `tag`   | Badge style          |

### Color Variants

Add suffix: `-primary`, `-secondary`, `-success`, `-warning`, `-danger`, `-info`

### Usage

```svelte
<h1 class="hero-title">
	Build <span class="grad grad-primary">amazing</span> apps
</h1>

<h2 class="section-title">
	Why choose <span class="slant slant-primary">our platform</span>?
</h2>

<h3 class="cta-title text-white">
	Start building <span class="neon neon-secondary">today</span>
</h3>
```

---

## Color Types

Available for `color` prop on most components:

```typescript
type ColorType =
	| 'primary'
	| 'secondary'
	| 'muted'
	| 'success'
	| 'info'
	| 'warning'
	| 'danger'
	| 'surface'
	| 'default';
```

---

## Import Statement

```svelte
<script>
	import {
		Section,
		Card,
		Button,
		TextField,
		Select,
		Checkbox,
		Toggle,
		RadioGroup,
		Alert,
		Avatar,
		Badge,
		Chip,
		Table
	} from 'ui-svelte';
</script>
```
