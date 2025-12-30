# DragDrop Component

Reorderable list and Kanban-style board with drag and drop.

## Import

```svelte
import { DragDrop, type DragDropItem, type DragDropGroup } from 'ui-svelte';
```

## Props

| Prop                 | Type                                                                                  | Default      | Description                           |
| -------------------- | ------------------------------------------------------------------------------------- | ------------ | ------------------------------------- |
| `items`              | `DragDropItem[]`                                                                      | `[]`         | Items for single list mode (bindable) |
| `groups`             | `DragDropGroup[]`                                                                     | `[]`         | Groups for Kanban mode (bindable)     |
| `color`              | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'muted'`    | Color theme                           |
| `variant`            | `'soft' \| 'solid' \| 'outlined' \| 'ghost'`                                          | `'soft'`     | Visual style                          |
| `size`               | `'sm' \| 'md' \| 'lg'`                                                                | `'md'`       | Component size                        |
| `direction`          | `'horizontal' \| 'vertical'`                                                          | `'vertical'` | Layout direction                      |
| `isDisabled`         | `boolean`                                                                             | `false`      | Disable dragging                      |
| `allowGroupTransfer` | `boolean`                                                                             | `true`       | Allow items between groups            |
| `onReorder`          | `(items, fromGroup?, toGroup?) => void`                                               | -            | Reorder callback                      |
| `onGroupReorder`     | `(groups) => void`                                                                    | -            | Group reorder callback                |
| `itemSnippet`        | `Snippet<[DragDropItem, number]>`                                                     | -            | Custom item render                    |
| `groupHeaderSnippet` | `Snippet<[DragDropGroup, number]>`                                                    | -            | Custom header render                  |

## Types

```typescript
type DragDropItem = {
	id: string;
	[key: string]: unknown;
};

type DragDropGroup = {
	id: string;
	title?: string;
	items: DragDropItem[];
	[key: string]: unknown;
};
```

## Patterns

### Single List

```svelte
<script>
	let items: DragDropItem[] = $state([
		{ id: '1', title: 'Item 1' },
		{ id: '2', title: 'Item 2' },
		{ id: '3', title: 'Item 3' }
	]);
</script>

<DragDrop bind:items>
	{#snippet itemSnippet(item)}
		<span>{item.title}</span>
	{/snippet}
</DragDrop>
```

### Kanban Board

```svelte
<script>
	let groups: DragDropGroup[] = $state([
		{ id: 'todo', title: 'To Do', items: [{ id: '1', title: 'Task 1' }] },
		{ id: 'doing', title: 'In Progress', items: [] },
		{ id: 'done', title: 'Done', items: [] }
	]);
</script>

<DragDrop bind:groups direction="horizontal" allowGroupTransfer>
	{#snippet itemSnippet(item)}
		<span>{item.title}</span>
	{/snippet}
</DragDrop>
```

### Custom Rendering

```svelte
<DragDrop bind:items color="primary" variant="outlined">
	{#snippet itemSnippet(item)}
		<div class="flex items-center gap-3">
			<span class="text-2xl">{item.avatar}</span>
			<div>
				<span class="font-semibold">{item.name}</span>
				<span class="text-xs opacity-60">{item.email}</span>
			</div>
		</div>
	{/snippet}
</DragDrop>
```

## Notes

- Use `items` for single list, `groups` for Kanban
- `itemSnippet` required for custom content rendering
- Items can be dragged between groups when `allowGroupTransfer` is true
