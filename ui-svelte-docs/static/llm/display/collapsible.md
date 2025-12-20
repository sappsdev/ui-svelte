# Collapsible Component

Single toggleable section for showing/hiding content.

## Import

```svelte
import {Collapsible} from 'ui-svelte';
```

## Props

| Prop           | Type                                                                                                            | Default     | Description               |
| -------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------- |
| `label`        | `string`                                                                                                        | -           | Header text               |
| `content`      | `Snippet \| string`                                                                                             | -           | Body content              |
| `startContent` | `Snippet`                                                                                                       | -           | Icon/content before label |
| `variant`      | `'solid' \| 'soft' \| 'outlined' \| 'ghost'`                                                                    | `'ghost'`   | Visual style              |
| `color`        | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'surface' \| 'default'` | `'default'` | Color theme               |
| `disabled`     | `boolean`                                                                                                       | `false`     | Prevent toggling          |
| `defaultOpen`  | `boolean`                                                                                                       | `false`     | Start expanded            |
| `rootClass`    | `string`                                                                                                        | -           | Container classes         |
| `headerClass`  | `string`                                                                                                        | -           | Header classes            |
| `contentClass` | `string`                                                                                                        | -           | Content classes           |

## Patterns

### Basic Collapsible

```svelte
<Collapsible label="Click to expand">
	{#snippet content()}
		<p>Hidden content here.</p>
	{/snippet}
</Collapsible>
```

### With String Content

```svelte
<Collapsible label="Simple" content="This is plain text content." />
```

### With Start Icon

```svelte
<Collapsible label="Files" color="primary">
	{#snippet startContent()}
		<Icon icon={FolderIcon} />
	{/snippet}
	{#snippet content()}
		<p>Folder contents here.</p>
	{/snippet}
</Collapsible>
```

### Default Open & Disabled

```svelte
<Collapsible label="Open by default" defaultOpen>
	{#snippet content()}
		<p>Visible on load.</p>
	{/snippet}
</Collapsible>

<Collapsible label="Locked" disabled content="Cannot toggle." />
```

## Notes

- Use for single expandable sections (use Accordion for multiple)
- `content` accepts string or Snippet for rich content
- `startContent` snippet adds icon/element before label
- Use `defaultOpen` to show content initially
