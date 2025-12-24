<script lang="ts" module>
	export type DragDropItem = {
		id: string;
		[key: string]: unknown;
	};

	export type DragDropGroup = {
		id: string;
		title?: string;
		items: DragDropItem[];
		[key: string]: unknown;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		groups?: DragDropGroup[];
		items?: DragDropItem[];
		class?: string;
		groupClass?: string;
		itemClass?: string;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'soft' | 'solid' | 'outlined' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		direction?: 'horizontal' | 'vertical';
		isDisabled?: boolean;
		allowGroupTransfer?: boolean;
		onReorder?: (items: DragDropItem[], fromGroup?: string, toGroup?: string) => void;
		onGroupReorder?: (groups: DragDropGroup[]) => void;
		itemSnippet?: Snippet<[DragDropItem, number]>;
		groupHeaderSnippet?: Snippet<[DragDropGroup, number]>;
		emptySnippet?: Snippet<[DragDropGroup?]>;
	};

	let {
		groups = $bindable([]),
		items = $bindable([]),
		class: className,
		groupClass,
		itemClass,
		color = 'muted',
		variant = 'soft',
		size = 'md',
		direction = 'vertical',
		isDisabled = false,
		allowGroupTransfer = true,
		onReorder,
		onGroupReorder,
		itemSnippet,
		groupHeaderSnippet,
		emptySnippet
	}: Props = $props();

	let draggedItem = $state<DragDropItem | null>(null);
	let draggedFromGroup = $state<string | null>(null);
	let draggedFromIndex = $state<number>(-1);
	let dragOverGroup = $state<string | null>(null);
	let dragOverIndex = $state<number>(-1);
	let isDragging = $state(false);

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning'
	};

	const variants = {
		soft: 'is-soft',
		solid: 'is-solid',
		outlined: 'is-outlined',
		ghost: 'is-ghost'
	};

	const sizes = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const isSingleMode = $derived(groups.length === 0);

	function handleDragStart(e: DragEvent, item: DragDropItem, index: number, groupId?: string) {
		if (isDisabled) return;

		draggedItem = item;
		draggedFromIndex = index;
		draggedFromGroup = groupId ?? null;
		isDragging = true;

		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', item.id);
		}

		const target = e.target as HTMLElement;
		requestAnimationFrame(() => {
			target.classList.add('is-dragging');
		});
	}

	function handleDragEnd(e: DragEvent) {
		const target = e.target as HTMLElement;
		target.classList.remove('is-dragging');

		draggedItem = null;
		draggedFromGroup = null;
		draggedFromIndex = -1;
		dragOverGroup = null;
		dragOverIndex = -1;
		isDragging = false;
	}

	function handleDragOver(e: DragEvent, index: number, groupId?: string) {
		e.preventDefault();
		if (!draggedItem || isDisabled) return;

		if (!allowGroupTransfer && groupId !== draggedFromGroup) return;

		dragOverIndex = index;
		dragOverGroup = groupId ?? null;

		if (e.dataTransfer) {
			e.dataTransfer.dropEffect = 'move';
		}
	}

	function handleDragLeave() {
		dragOverIndex = -1;
	}

	function handleDrop(e: DragEvent, dropIndex: number, groupId?: string) {
		e.preventDefault();
		if (!draggedItem || isDisabled) return;

		if (!allowGroupTransfer && groupId !== draggedFromGroup) {
			handleDragEnd(e);
			return;
		}

		if (isSingleMode) {
			const newItems = [...items];
			newItems.splice(draggedFromIndex, 1);
			newItems.splice(dropIndex > draggedFromIndex ? dropIndex - 1 : dropIndex, 0, draggedItem);
			items = newItems;
			onReorder?.(newItems);
		} else {
			const newGroups = groups.map((g) => ({ ...g, items: [...g.items] }));

			if (draggedFromGroup === groupId) {
				const group = newGroups.find((g) => g.id === groupId);
				if (group) {
					group.items.splice(draggedFromIndex, 1);
					group.items.splice(
						dropIndex > draggedFromIndex ? dropIndex - 1 : dropIndex,
						0,
						draggedItem
					);
				}
			} else {
				const fromGroup = newGroups.find((g) => g.id === draggedFromGroup);
				const toGroup = newGroups.find((g) => g.id === groupId);

				if (fromGroup && toGroup) {
					fromGroup.items.splice(draggedFromIndex, 1);
					toGroup.items.splice(dropIndex, 0, draggedItem);
				}
			}

			groups = newGroups;
			onReorder?.(
				newGroups.find((g) => g.id === groupId)?.items || [],
				draggedFromGroup ?? undefined,
				groupId
			);
			onGroupReorder?.(newGroups);
		}

		handleDragEnd(e);
	}

	function handleDropOnEmpty(e: DragEvent, groupId?: string) {
		e.preventDefault();
		if (!draggedItem || isDisabled) return;

		if (!allowGroupTransfer && groupId !== draggedFromGroup) {
			handleDragEnd(e);
			return;
		}

		if (!isSingleMode && groupId) {
			const newGroups = groups.map((g) => ({ ...g, items: [...g.items] }));
			const fromGroup = newGroups.find((g) => g.id === draggedFromGroup);
			const toGroup = newGroups.find((g) => g.id === groupId);

			if (fromGroup && toGroup) {
				fromGroup.items.splice(draggedFromIndex, 1);
				toGroup.items.push(draggedItem);
			}

			groups = newGroups;
			onReorder?.(toGroup?.items || [], draggedFromGroup ?? undefined, groupId);
			onGroupReorder?.(newGroups);
		}

		handleDragEnd(e);
	}
</script>

<div
	class={cn(
		'drag-drop',
		colors[color],
		variants[variant],
		sizes[size],
		direction === 'horizontal' ? 'is-horizontal' : 'is-vertical',
		isDisabled && 'is-disabled',
		isDragging && 'is-dragging',
		className
	)}
>
	{#if isSingleMode}
		<div class="drag-drop-list">
			{#each items as item, index (item.id)}
				<div
					class={cn(
						'drag-drop-item',
						draggedItem?.id === item.id && 'is-dragging',
						dragOverIndex === index && draggedItem?.id !== item.id && 'is-drag-over',
						itemClass
					)}
					draggable={!isDisabled}
					ondragstart={(e) => handleDragStart(e, item, index)}
					ondragend={handleDragEnd}
					ondragover={(e) => handleDragOver(e, index)}
					ondragleave={handleDragLeave}
					ondrop={(e) => handleDrop(e, index)}
					role="listitem"
				>
					{#if itemSnippet}
						{@render itemSnippet(item, index)}
					{:else}
						<span class="drag-drop-item-content">{item.id}</span>
					{/if}
					<div class="drag-drop-handle">
						<svg viewBox="0 0 24 24" fill="currentColor">
							<circle cx="9" cy="6" r="1.5" />
							<circle cx="15" cy="6" r="1.5" />
							<circle cx="9" cy="12" r="1.5" />
							<circle cx="15" cy="12" r="1.5" />
							<circle cx="9" cy="18" r="1.5" />
							<circle cx="15" cy="18" r="1.5" />
						</svg>
					</div>
				</div>
			{/each}

			{#if items.length === 0}
				<div
					class="drag-drop-empty"
					ondragover={(e) => e.preventDefault()}
					ondrop={(e) => handleDropOnEmpty(e)}
					role="listitem"
				>
					{#if emptySnippet}
						{@render emptySnippet()}
					{:else}
						<span>Arrastra elementos aquí</span>
					{/if}
				</div>
			{/if}
		</div>
	{:else}
		{#each groups as group, groupIndex (group.id)}
			<div class={cn('drag-drop-group', groupClass)}>
				{#if groupHeaderSnippet}
					{@render groupHeaderSnippet(group, groupIndex)}
				{:else if group.title}
					<div class="drag-drop-group-header">
						<span class="drag-drop-group-title">{group.title}</span>
						<span class="drag-drop-group-count">{group.items.length}</span>
					</div>
				{/if}

				<div class="drag-drop-list">
					{#each group.items as item, index (item.id)}
						<div
							class={cn(
								'drag-drop-item',
								draggedItem?.id === item.id && 'is-dragging',
								dragOverIndex === index &&
									dragOverGroup === group.id &&
									draggedItem?.id !== item.id &&
									'is-drag-over',
								itemClass
							)}
							draggable={!isDisabled}
							ondragstart={(e) => handleDragStart(e, item, index, group.id)}
							ondragend={handleDragEnd}
							ondragover={(e) => handleDragOver(e, index, group.id)}
							ondragleave={handleDragLeave}
							ondrop={(e) => handleDrop(e, index, group.id)}
							role="listitem"
						>
							{#if itemSnippet}
								{@render itemSnippet(item, index)}
							{:else}
								<span class="drag-drop-item-content">{item.id}</span>
							{/if}
							<div class="drag-drop-handle">
								<svg viewBox="0 0 24 24" fill="currentColor">
									<circle cx="9" cy="6" r="1.5" />
									<circle cx="15" cy="6" r="1.5" />
									<circle cx="9" cy="12" r="1.5" />
									<circle cx="15" cy="12" r="1.5" />
									<circle cx="9" cy="18" r="1.5" />
									<circle cx="15" cy="18" r="1.5" />
								</svg>
							</div>
						</div>
					{/each}

					{#if group.items.length === 0}
						<div
							class={cn('drag-drop-empty', dragOverGroup === group.id && 'is-drag-over')}
							ondragover={(e) => handleDragOver(e, 0, group.id)}
							ondragleave={handleDragLeave}
							ondrop={(e) => handleDropOnEmpty(e, group.id)}
							role="listitem"
						>
							{#if emptySnippet}
								{@render emptySnippet(group)}
							{:else}
								<span>Arrastra elementos aquí</span>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	{/if}
</div>
