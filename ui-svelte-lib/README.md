# Ui Svelte

**A modern, accessible UI component library built for Svelte 5**

Ui Svelte is a comprehensive UI component library designed to leverage Svelte 5's latest features. Build beautiful, accessible interfaces with minimal configuration and maximum developer experience.

---

## ✨ Features

### 🎨 Modern Design System

Beautiful, pre-styled components with multiple variants and customization options. Choose from primary, secondary, soft, outlined, and ghost variants to match your design needs.

### 🎯 Built for Svelte 5

Fully optimized for Svelte 5's runes system with `$state`, `$derived`, and snippets. Experience the full power of Svelte's reactivity with a modern component API.

### 🔧 Highly Customizable

Every component accepts custom classes and styling props. Customize individual sections with dedicated class props for headers, bodies, footers, and more.

### 📱 Responsive Design

Mobile-first design approach with responsive sizing options (xs, sm, md, lg, xl). Components adapt seamlessly to different screen sizes and devices.

### ♿ Accessibility First

Built with accessibility in mind, following WCAG guidelines. Proper ARIA attributes, keyboard navigation, and semantic HTML ensure your apps are usable by everyone.

### 🎭 Rich Component Variants

Multiple style variants for every component including primary, secondary, soft, outlined, ghost, and semantic variants (success, info, warning, danger) for contextual feedback.

### 🖼️ Icon Integration

Seamless integration with Iconify for thousands of icon options. Add icons to buttons, text fields, and other components with a simple prop.

### 📝 Form Components

Comprehensive form component suite with built-in validation, error states, help text, and floating labels. Build complex forms with ease.

### 🎪 Interactive Elements

Rich interactive components including tabs, cards, selects, and more. Create dynamic user interfaces with minimal code.

### 🎨 Theming Support

Flexible theming system with support for custom color schemes. Adapt components to match your brand identity effortlessly.

### 📦 TypeScript Support

Full TypeScript support with comprehensive type definitions. Enjoy autocomplete, type checking, and compile-time error detection throughout your development process.

### 🚀 Lightweight & Fast

Optimized bundle size with tree-shaking support. Only import what you need for blazing-fast load times and minimal overhead.

---

## 📦 Installation

```bash
# or
bun add ui-svelte
```

---

## 🚀 Quick Start

```svelte
<script lang="ts">
	import { Button, Card, TextField } from 'ui-svelte';

	let name = $state('');
</script>

<Card>
	<h2>Welcome to Ui Svelte</h2>

	<TextField name="username" label="Your Name" placeholder="Enter your name..." bind:value={name} />

	<Button label="Submit" variant="primary" onclick={() => console.log('Hello', name)} />
</Card>
```

---

## 📖 Documentation

For detailed documentation, examples, and interactive component previews, visit our [official documentation](https://ui-svelte.sappsdev.com).

---

## 🎨 Component Library

SappsUI includes a comprehensive set of components for building modern web applications:

- **Buttons & Actions**: Button, IconButton
- **Forms**: TextField, Select, Checkbox
- **Layout**: Card, Divider, Section
- **Navigation**: Tabs
- **Data Display**: Avatar, Code
- **Feedback**: Status indicators, Error states
- **And more...**

---

## 🌟 Support

If you find UiSvelte helpful, please consider giving it a star on GitHub! Your support helps us continue improving the library.

For questions, issues, or feature requests, please visit our [GitHub Issues](https://github.com/sappsdev/ui-svelte/issues) page.

---

**Built with ❤️ by the SappsDev Team**
