# Collapsible Component

Expandable/collapsible content section with animated toggle.

## Import

```svelte
import {Collapsible} from 'ui-svelte';
```

## Props

| Prop           | Type                                                                                                            | Default     | Description               |
| -------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------- |
| `label`        | `string`                                                                                                        | -           | Header label text         |
| `content`      | `Snippet \| string`                                                                                             | -           | Collapsible content       |
| `startContent` | `Snippet`                                                                                                       | -           | Icon/content before label |
| `color`        | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning' \| 'surface' \| 'default'` | `'default'` | Color theme               |
| `variant`      | `'solid' \| 'soft' \| 'outlined' \| 'ghost'`                                                                    | `'ghost'`   | Visual style              |
| `disabled`     | `boolean`                                                                                                       | `false`     | Disable toggle            |
| `defaultOpen`  | `boolean`                                                                                                       | `false`     | Start expanded            |
| `rootClass`    | `string`                                                                                                        | -           | Root container class      |
| `headerClass`  | `string`                                                                                                        | -           | Header class              |
| `contentClass` | `string`                                                                                                        | -           | Content section class     |

## Patterns

### Basic

```svelte
<Collapsible label="Click to expand">
	{#snippet content()}
		<p>This is the collapsible content.</p>
	{/snippet}
</Collapsible>
```

### With Icon

```svelte
<Collapsible label="Folder Contents">
	{#snippet startContent()}
		<Icon icon={FolderIcon} />
	{/snippet}
	{#snippet content()}
		<p>Files inside this folder...</p>
	{/snippet}
</Collapsible>
```

### Default Open

```svelte
<Collapsible label="Already Open" defaultOpen>
	{#snippet content()}
		<p>This section starts expanded.</p>
	{/snippet}
</Collapsible>
```

### String Content

```svelte
<Collapsible label="Simple" content="Plain text content without snippet." />
```

## Notes

- Header shows chevron indicator for expand/collapse state
- Smooth animation on toggle
- Use `startContent` for icons or badges before label
- `content` accepts both Snippet and string
