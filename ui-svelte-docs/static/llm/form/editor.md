# Editor Component

Rich text editor with formatting toolbar.

## Import

```svelte
import {Editor} from 'ui-svelte';
```

## Props

| Prop          | Type                                                                                  | Default      | Description             |
| ------------- | ------------------------------------------------------------------------------------- | ------------ | ----------------------- |
| `value`       | `string`                                                                              | `''`         | HTML content (bindable) |
| `placeholder` | `string`                                                                              | `''`         | Placeholder text        |
| `label`       | `string`                                                                              | -            | Field label             |
| `helpText`    | `string`                                                                              | -            | Helper text             |
| `errorText`   | `string`                                                                              | -            | Error message           |
| `minHeight`   | `string`                                                                              | `'200px'`    | Minimum height          |
| `color`       | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'muted'`    | Color theme             |
| `variant`     | `'soft' \| 'solid' \| 'outlined' \| 'line'`                                           | `'outlined'` | Visual style            |
| `size`        | `'sm' \| 'md' \| 'lg'`                                                                | `'md'`       | Component size          |
| `isDisabled`  | `boolean`                                                                             | `false`      | Disable editing         |
| `isReadonly`  | `boolean`                                                                             | `false`      | Read-only mode          |
| `hideToolbar` | `boolean`                                                                             | `false`      | Hide formatting toolbar |
| `labels`      | `EditorLabels`                                                                        | `{}`         | Custom labels for i18n  |
| `onchange`    | `(value: string) => void`                                                             | -            | Change callback         |

## Patterns

### Basic

```svelte
<script>
	let content = $state('');
</script>

<Editor bind:value={content} placeholder="Write here..." />
```

### With Label

```svelte
<Editor label="Description" bind:value={content} minHeight="150px" />
```

### Read-only Display

```svelte
<Editor value={articleContent} isReadonly hideToolbar />
```

### Custom i18n Labels

```svelte
<Editor
	labels={{
		bold: 'Negrita (Ctrl+B)',
		italic: 'Cursiva (Ctrl+I)',
		underline: 'Subrayado (Ctrl+U)',
		insertLink: 'Insertar enlace',
		insertImage: 'Insertar imagen'
	}}
/>
```

## Toolbar Features

- **Text Formatting**: Bold, Italic, Underline, Strikethrough
- **Alignment**: Left, Center, Right, Justify
- **Lists**: Ordered and Unordered
- **Headings**: H1, H2, H3
- **Insert**: Links, Images, Quotes, Code, Horizontal Rules
- **History**: Undo, Redo, Clear Formatting

## Keyboard Shortcuts

| Shortcut       | Action    |
| -------------- | --------- |
| `Ctrl+B`       | Bold      |
| `Ctrl+I`       | Italic    |
| `Ctrl+U`       | Underline |
| `Ctrl+Z`       | Undo      |
| `Ctrl+Shift+Z` | Redo      |

## Notes

- Value is HTML string for easy storage
- Use `hideToolbar` for read-only display
- All toolbar labels customizable via `labels` prop
