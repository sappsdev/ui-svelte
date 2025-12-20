# Accordion Component

Expandable list for showing/hiding content sections.

## Import

```svelte
import {Accordion} from 'ui-svelte';
```

## Props

| Prop           | Type                                                                                                            | Default     | Description               |
| -------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------- |
| `items`        | `AccordionItem[]`                                                                                               | `[]`        | Array of accordion items  |
| `variant`      | `'solid' \| 'soft' \| 'outlined' \| 'ghost'`                                                                    | `'ghost'`   | Visual style              |
| `color`        | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Color theme               |
| `multiple`     | `boolean`                                                                                                       | `false`     | Allow multiple open items |
| `rootClass`    | `string`                                                                                                        | -           | Container classes         |
| `itemClass`    | `string`                                                                                                        | -           | Item classes              |
| `headerClass`  | `string`                                                                                                        | -           | Header classes            |
| `contentClass` | `string`                                                                                                        | -           | Content classes           |

## AccordionItem Type

| Property      | Type                | Default | Description       |
| ------------- | ------------------- | ------- | ----------------- |
| `id`          | `string`            | -       | Unique identifier |
| `label`       | `string`            | -       | Header text       |
| `content`     | `Snippet \| string` | -       | Body content      |
| `disabled`    | `boolean`           | `false` | Prevent toggling  |
| `defaultOpen` | `boolean`           | `false` | Start expanded    |

## Patterns

### Basic FAQ

```svelte
<Accordion
	items={[
		{ id: '1', label: 'What is this?', content: 'Answer here.' },
		{ id: '2', label: 'How to use?', content: 'Instructions here.' }
	]}
/>
```

### Multiple Open

```svelte
<Accordion
	multiple
	items={[
		{ id: '1', label: 'Section 1', content: 'Content 1', defaultOpen: true },
		{ id: '2', label: 'Section 2', content: 'Content 2', defaultOpen: true }
	]}
/>
```

### Styled Accordion

```svelte
<Accordion
	color="primary"
	variant="soft"
	items={[
		{ id: '1', label: 'Feature 1', content: 'Details about feature 1.' },
		{ id: '2', label: 'Feature 2', content: 'Details about feature 2.' }
	]}
/>
```

### With Disabled Items

```svelte
<Accordion
	items={[
		{ id: '1', label: 'Active', content: 'Toggleable content.' },
		{ id: '2', label: 'Locked', content: 'Cannot access.', disabled: true }
	]}
/>
```

## Notes

- Use `multiple` prop to allow multiple sections open at once
- Use `defaultOpen` on items to expand them initially
- Use `disabled` on items to prevent user interaction
- Content can be a string or Svelte snippet for complex content
