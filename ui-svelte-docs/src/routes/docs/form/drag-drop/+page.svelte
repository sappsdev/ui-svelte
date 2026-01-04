<script lang="ts">
	import {
		DragDrop,
		Card,
		Checkbox,
		Code,
		Section,
		Select,
		type DragDropItem,
		type DragDropGroup
	} from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const variantOptions = [
		{ id: 'soft', label: 'Soft' },
		{ id: 'solid', label: 'Solid' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	const directionOptions = [
		{ id: 'vertical', label: 'Vertical' },
		{ id: 'horizontal', label: 'Horizontal' }
	];

	let color: any = $state('muted');
	let variant: any = $state('soft');
	let size: any = $state('md');
	let direction: any = $state('vertical');

	let isDisabled = $state(false);
	let allowGroupTransfer = $state(true);

	let singleItems: DragDropItem[] = $state([
		{ id: '1', title: 'Item 1' },
		{ id: '2', title: 'Item 2' },
		{ id: '3', title: 'Item 3' },
		{ id: '4', title: 'Item 4' }
	]);

	let kanbanGroups: DragDropGroup[] = $state([
		{
			id: 'todo',
			title: 'To Do',
			items: [
				{ id: 'task-1', title: 'Design UI', priority: 'high' },
				{ id: 'task-2', title: 'Create components', priority: 'medium' }
			]
		},
		{
			id: 'in-progress',
			title: 'In Progress',
			items: [{ id: 'task-3', title: 'Implement API', priority: 'high' }]
		},
		{
			id: 'done',
			title: 'Completed',
			items: [{ id: 'task-4', title: 'Project setup', priority: 'low' }]
		}
	]);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { DragDrop, type DragDropItem } from 'ui-svelte';`,
			``,
			`\tlet items: DragDropItem[] = $state([`,
			`\t\t{ id: '1', title: 'Item 1' },`,
			`\t\t{ id: '2', title: 'Item 2' },`,
			`\t\t{ id: '3', title: 'Item 3' }`,
			`\t]);`,
			`<\/script>`
		];

		const componentLines = [
			`<DragDrop`,
			`\tbind:items`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'soft' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			direction !== 'vertical' && `\tdirection="${direction}"`,
			isDisabled && `\tisDisabled`,
			`>`
		].filter(Boolean);

		const snippetLines = [
			`\t{#snippet itemSnippet(item)}`,
			`\t\t<span>{item.title}</span>`,
			`\t{/snippet}`,
			`</DragDrop>`
		];

		return [...scriptLines, ...componentLines, ...snippetLines].join('\n');
	});

	const props = [
		{
			prop: 'items',
			type: 'DragDropItem[]',
			initial: '[]',
			description: 'Items for single list mode (bindable)'
		},
		{
			prop: 'groups',
			type: 'DragDropGroup[]',
			initial: '[]',
			description: 'Groups for Kanban mode (bindable)'
		},
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'muted'
		},
		{
			prop: 'variant',
			type: 'soft | solid | outlined | ghost',
			initial: 'soft'
		},
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'direction', type: 'horizontal | vertical', initial: 'vertical' },
		{ prop: 'isDisabled', type: 'boolean', initial: 'false' },
		{ prop: 'allowGroupTransfer', type: 'boolean', initial: 'true' },
		{ prop: 'emptyText', type: 'string', initial: "'Drop items here'" },
		{ prop: 'onReorder', type: '(items, fromGroup?, toGroup?) => void', initial: '' },
		{ prop: 'onGroupReorder', type: '(groups) => void', initial: '' },
		{ prop: 'itemSnippet', type: 'Snippet<[DragDropItem, number]>', initial: '' },
		{ prop: 'groupHeaderSnippet', type: 'Snippet<[DragDropGroup, number]>', initial: '' },
		{ prop: 'emptySnippet', type: 'Snippet<[DragDropGroup?]>', initial: '' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'groupClass', type: 'string', initial: '' },
		{ prop: 'itemClass', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="DragDrop" llmUrl="https://ui-svelte.sappsdev.com/llm/form/drag-drop.md">
	A drag and drop component for reorderable lists and Kanban-style boards with support for
	cross-group transfers.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Direction"
				size="sm"
				options={directionOptions}
				bind:value={direction}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={isDisabled} label="Disabled" />
		</div>

		<div class="doc-preview">
			<DragDrop bind:items={singleItems} {color} {variant} {size} {direction} {isDisabled}>
				{#snippet itemSnippet(item)}
					<span>{item.title}</span>
				{/snippet}
			</DragDrop>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Kanban Board</p>
	<Card color="background" variant="outlined">
		<p class="mb-4 opacity-70">
			Use groups prop for multi-column Kanban-style layouts. Try dragging items between columns.
		</p>
		<div class="grid-2 gap-2 mb-4">
			<Checkbox bind:checked={allowGroupTransfer} label="Allow Group Transfer" />
		</div>
		<DragDrop
			bind:groups={kanbanGroups}
			direction="horizontal"
			color="primary"
			variant="soft"
			{allowGroupTransfer}
		>
			{#snippet itemSnippet(item)}
				<div class="flex flex-col gap-1">
					<span class="font-medium">{item.title}</span>
					<span class="text-xs opacity-60 capitalize">{item.priority} priority</span>
				</div>
			{/snippet}
		</DragDrop>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card color="background" variant="outlined">
		<div class="grid md:grid-2 gap-6">
			{#each variantOptions.slice(0, 2) as variantItem}
				{#each colorOptions.slice(0, 3) as colorItem}
					<div>
						<p class="text-sm font-semibold mb-2 opacity-60">
							{variantItem.label}
							{colorItem.label}
						</p>
						<DragDrop
							variant={variantItem.id as any}
							color={colorItem.id as any}
							items={[
								{ id: `${variantItem.id}-${colorItem.id}-1`, title: 'Item 1' },
								{ id: `${variantItem.id}-${colorItem.id}-2`, title: 'Item 2' }
							]}
						>
							{#snippet itemSnippet(item)}
								<span>{item.title}</span>
							{/snippet}
						</DragDrop>
					</div>
				{/each}
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card color="background" variant="outlined">
		<div class="grid md:grid-3 gap-6">
			{#each sizeOptions as sizeItem}
				<div>
					<p class="text-sm font-semibold mb-2 opacity-60">Size: {sizeItem.label}</p>
					<DragDrop
						size={sizeItem.id as any}
						items={[
							{ id: `size-${sizeItem.id}-1`, title: 'Item 1' },
							{ id: `size-${sizeItem.id}-2`, title: 'Item 2' }
						]}
					>
						{#snippet itemSnippet(item)}
							<span>{item.title}</span>
						{/snippet}
					</DragDrop>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Custom Item Rendering</p>
	<Card color="background" variant="outlined">
		<p class="mb-4 opacity-70">Use the itemSnippet to render custom content for each item.</p>
		<DragDrop
			items={[
				{ id: 'user-1', name: 'John Doe', email: 'john@example.com', avatar: '👨‍💼' },
				{ id: 'user-2', name: 'Jane Smith', email: 'jane@example.com', avatar: '👩‍💼' },
				{ id: 'user-3', name: 'Bob Johnson', email: 'bob@example.com', avatar: '👨‍🔧' }
			]}
			color="primary"
			variant="outlined"
		>
			{#snippet itemSnippet(item)}
				<div class="flex items-center gap-3">
					<span class="text-2xl">{item.avatar}</span>
					<div class="flex flex-col">
						<span class="font-semibold">{item.name}</span>
						<span class="text-xs opacity-60">{item.email}</span>
					</div>
				</div>
			{/snippet}
		</DragDrop>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Types</p>
	<Card color="background" variant="outlined">
		<Code
			lang="typescript"
			code={`// Item type
type DragDropItem = {
  id: string;
  [key: string]: unknown;
};

// Group type (for Kanban mode)
type DragDropGroup = {
  id: string;
  title?: string;
  items: DragDropItem[];
  [key: string]: unknown;
};`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Usage Examples</p>
	<Card color="background" variant="outlined">
		<p class="font-semibold mb-2">Single List Mode</p>
		<Code
			lang="svelte"
			code={`<script lang="ts">
  import { DragDrop, type DragDropItem } from 'ui-svelte';

  let items: DragDropItem[] = $state([
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 2' },
    { id: '3', title: 'Task 3' }
  ]);

  function handleReorder(newItems: DragDropItem[]) {
    console.log('New order:', newItems);
  }
<\/script>

<DragDrop bind:items onReorder={handleReorder}>
  {#snippet itemSnippet(item)}
    <span>{item.title}</span>
  {/snippet}
</DragDrop>`}
		/>

		<p class="font-semibold mb-2 mt-6">Kanban Mode</p>
		<Code
			lang="svelte"
			code={`<script lang="ts">
  import { DragDrop, type DragDropGroup } from 'ui-svelte';

  let groups: DragDropGroup[] = $state([
    { id: 'todo', title: 'To Do', items: [{ id: '1', title: 'Task 1' }] },
    { id: 'doing', title: 'In Progress', items: [] },
    { id: 'done', title: 'Done', items: [] }
  ]);
<\/script>

<DragDrop
  bind:groups
  direction="horizontal"
  allowGroupTransfer
>
  {#snippet itemSnippet(item)}
    <span>{item.title}</span>
  {/snippet}
</DragDrop>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
