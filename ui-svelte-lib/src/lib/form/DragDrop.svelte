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
	import { onMount } from 'svelte';

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
		emptyText?: string;
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
		emptySnippet,
		emptyText = 'Drop items here'
	}: Props = $props();

	let draggedItem = $state<DragDropItem | null>(null);
	let draggedFromGroup = $state<string | null>(null);
	let draggedFromIndex = $state(-1);
	let dragOverGroup = $state<string | null>(null);
	let dragOverIndex = $state(-1);
	let isDragging = $state(false);

	let containerEl = $state<HTMLElement>();
	let isTouchDragging = $state(false);
	let isTouchPending = $state(false);
	let touchDraggedElement = $state<HTMLElement | null>(null);
	let ghostElement = $state<HTMLElement | null>(null);
	let isTouchDevice = $state(false);

	let touchStart = { x: 0, y: 0 };
	let touchCurrent = { x: 0, y: 0 };
	let longPressTimer: ReturnType<typeof setTimeout> | null = null;
	const LONG_PRESS_DURATION = 400;
	const SCROLL_THRESHOLD = 8;

	const colorClass = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning'
	};

	const variantClass = {
		soft: 'is-soft',
		solid: 'is-solid',
		outlined: 'is-outlined',
		ghost: 'is-ghost'
	};

	const sizeClass = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const isSingleMode = $derived(groups.length === 0);

	function performReorder(dropIndex: number, dropGroupId?: string) {
		if (!draggedItem) return;

		if (isSingleMode) {
			const newItems = [...items];
			newItems.splice(draggedFromIndex, 1);
			const adjustedIndex = dropIndex > draggedFromIndex ? dropIndex - 1 : dropIndex;
			newItems.splice(adjustedIndex, 0, draggedItem);
			items = newItems;
			onReorder?.(newItems);
		} else {
			const newGroups = groups.map((g) => ({ ...g, items: [...g.items] }));

			if (draggedFromGroup === dropGroupId) {
				const group = newGroups.find((g) => g.id === dropGroupId);
				if (group) {
					group.items.splice(draggedFromIndex, 1);
					const adjustedIndex = dropIndex > draggedFromIndex ? dropIndex - 1 : dropIndex;
					group.items.splice(adjustedIndex, 0, draggedItem);
				}
			} else {
				const fromGroup = newGroups.find((g) => g.id === draggedFromGroup);
				const toGroup = newGroups.find((g) => g.id === dropGroupId);
				if (fromGroup && toGroup) {
					fromGroup.items.splice(draggedFromIndex, 1);
					toGroup.items.splice(dropIndex, 0, draggedItem);
				}
			}

			groups = newGroups;
			onReorder?.(
				newGroups.find((g) => g.id === dropGroupId)?.items || [],
				draggedFromGroup ?? undefined,
				dropGroupId
			);
			onGroupReorder?.(newGroups);
		}
	}

	function performDropOnEmpty(groupId: string) {
		if (!draggedItem || isSingleMode) return;

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

	function resetDragState() {
		draggedItem = null;
		draggedFromGroup = null;
		draggedFromIndex = -1;
		dragOverGroup = null;
		dragOverIndex = -1;
		isDragging = false;
		isTouchDragging = false;
	}

	function handleDragStart(e: DragEvent, item: DragDropItem, index: number, groupId?: string) {
		if (isDisabled || isTouchDevice || isTouchDragging) {
			e.preventDefault();
			return;
		}

		draggedItem = item;
		draggedFromIndex = index;
		draggedFromGroup = groupId ?? null;
		isDragging = true;

		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', item.id);
		}

		const target = e.target as HTMLElement;
		requestAnimationFrame(() => target.classList.add('is-dragging'));
	}

	function handleDragEnd(e: DragEvent) {
		(e.target as HTMLElement).classList.remove('is-dragging');
		resetDragState();
	}

	function handleDragOver(e: DragEvent, index: number, groupId?: string) {
		e.preventDefault();
		if (!draggedItem || isDisabled) return;
		if (!allowGroupTransfer && groupId !== draggedFromGroup) return;

		dragOverIndex = index;
		dragOverGroup = groupId ?? null;

		if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
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

		performReorder(dropIndex, groupId);
		handleDragEnd(e);
	}

	function handleDropOnEmpty(e: DragEvent, groupId?: string) {
		e.preventDefault();
		if (!draggedItem || isDisabled) return;

		if (!allowGroupTransfer && groupId !== draggedFromGroup) {
			handleDragEnd(e);
			return;
		}

		if (groupId) performDropOnEmpty(groupId);
		handleDragEnd(e);
	}

	function createGhostElement(source: HTMLElement): HTMLElement {
		const ghost = source.cloneNode(true) as HTMLElement;
		Object.assign(ghost.style, {
			position: 'fixed',
			pointerEvents: 'none',
			zIndex: '9999',
			opacity: '0.9',
			width: `${source.offsetWidth}px`,
			transform: 'scale(1.02)',
			boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
		});
		ghost.classList.add('drag-drop-ghost');
		document.body.appendChild(ghost);
		return ghost;
	}

	function updateGhostPosition(x: number, y: number) {
		if (ghostElement) {
			ghostElement.style.left = `${x - ghostElement.offsetWidth / 2}px`;
			ghostElement.style.top = `${y - ghostElement.offsetHeight / 2}px`;
		}
	}

	function removeGhostElement() {
		ghostElement?.remove();
		ghostElement = null;
	}

	function clearTimers() {
		if (longPressTimer) {
			clearTimeout(longPressTimer);
			longPressTimer = null;
		}
	}

	function cancelTouchDrag() {
		clearTimers();
		removeGhostElement();
		touchDraggedElement?.classList.remove('is-dragging');
		isTouchPending = false;
		resetDragState();
	}

	function getItemAtPoint(
		x: number,
		y: number
	): { element: HTMLElement; index: number; groupId?: string } | null {
		if (!containerEl) return null;

		const allItems = containerEl.querySelectorAll('.drag-drop-item');
		for (const item of allItems) {
			const rect = item.getBoundingClientRect();
			if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
				const groupEl = item.closest('.drag-drop-group');
				const groupId = groupEl?.getAttribute('data-group-id') || undefined;
				const listEl = item.closest('.drag-drop-list');
				const siblings = listEl?.querySelectorAll('.drag-drop-item') || [];
				const index = Array.from(siblings).indexOf(item);
				return { element: item as HTMLElement, index, groupId };
			}
		}

		const emptyZones = containerEl.querySelectorAll('.drag-drop-empty');
		for (const zone of emptyZones) {
			const rect = zone.getBoundingClientRect();
			if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
				const groupEl = zone.closest('.drag-drop-group');
				const groupId = groupEl?.getAttribute('data-group-id') || undefined;
				return { element: zone as HTMLElement, index: 0, groupId };
			}
		}

		return null;
	}

	function handleTouchStart(e: TouchEvent, item: DragDropItem, index: number, groupId?: string) {
		if (isDisabled) return;

		const touch = e.touches[0];
		touchStart = { x: touch.clientX, y: touch.clientY };
		touchCurrent = { ...touchStart };

		touchDraggedElement = e.currentTarget as HTMLElement;
		isTouchPending = true;

		longPressTimer = setTimeout(() => {
			if (!isTouchPending) return;

			isTouchDragging = true;
			isDragging = true;
			isTouchPending = false;
			draggedItem = item;
			draggedFromIndex = index;
			draggedFromGroup = groupId ?? null;

			touchDraggedElement?.classList.add('is-dragging');
			ghostElement = createGhostElement(touchDraggedElement!);
			updateGhostPosition(touchCurrent.x, touchCurrent.y);

			navigator.vibrate?.(50);
		}, LONG_PRESS_DURATION);
	}

	function handleTouchMove(e: TouchEvent) {
		const touch = e.touches[0];
		touchCurrent = { x: touch.clientX, y: touch.clientY };

		const deltaX = Math.abs(touchCurrent.x - touchStart.x);
		const deltaY = Math.abs(touchCurrent.y - touchStart.y);

		if (!isTouchDragging && (deltaX > SCROLL_THRESHOLD || deltaY > SCROLL_THRESHOLD)) {
			cancelTouchDrag();
			return;
		}

		if (!isTouchDragging || !draggedItem) return;

		e.preventDefault();
		updateGhostPosition(touchCurrent.x, touchCurrent.y);

		containerEl
			?.querySelectorAll('.is-touch-drag-over')
			.forEach((el) => el.classList.remove('is-touch-drag-over'));

		const itemAtPoint = getItemAtPoint(touchCurrent.x, touchCurrent.y);
		if (itemAtPoint && itemAtPoint.element !== touchDraggedElement) {
			if (!allowGroupTransfer && itemAtPoint.groupId !== draggedFromGroup) return;

			dragOverIndex = itemAtPoint.index;
			dragOverGroup = itemAtPoint.groupId ?? null;
			itemAtPoint.element.classList.add('is-touch-drag-over');
		} else {
			dragOverIndex = -1;
			dragOverGroup = null;
		}
	}

	function handleTouchEnd() {
		clearTimers();
		isTouchPending = false;

		if (!isTouchDragging || !draggedItem) {
			isTouchDragging = false;
			touchDraggedElement = null;
			return;
		}

		containerEl
			?.querySelectorAll('.is-touch-drag-over')
			.forEach((el) => el.classList.remove('is-touch-drag-over'));

		const itemAtPoint = getItemAtPoint(touchCurrent.x, touchCurrent.y);
		if (itemAtPoint) {
			if (allowGroupTransfer || itemAtPoint.groupId === draggedFromGroup) {
				performReorder(itemAtPoint.index, itemAtPoint.groupId);
			}
		}

		touchDraggedElement?.classList.remove('is-dragging');
		removeGhostElement();
		touchDraggedElement = null;
		resetDragState();
	}

	onMount(() => {
		isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

		const onGlobalTouchMove = (e: TouchEvent) => {
			if (isTouchPending || isTouchDragging) {
				handleTouchMove(e);
			}
		};

		const onGlobalTouchEnd = () => {
			if (isTouchPending || isTouchDragging) {
				handleTouchEnd();
			}
		};

		document.addEventListener('touchmove', onGlobalTouchMove, { passive: false });
		document.addEventListener('touchend', onGlobalTouchEnd);
		document.addEventListener('touchcancel', onGlobalTouchEnd);

		return () => {
			document.removeEventListener('touchmove', onGlobalTouchMove);
			document.removeEventListener('touchend', onGlobalTouchEnd);
			document.removeEventListener('touchcancel', onGlobalTouchEnd);
			clearTimers();
		};
	});

	function isItemDragging(item: DragDropItem) {
		return draggedItem?.id === item.id;
	}

	function isItemDragOver(index: number, groupId?: string): boolean {
		if (dragOverIndex !== index) return false;
		if (dragOverGroup !== (groupId ?? null)) return false;
		if (!draggedItem) return false;

		const targetId = isSingleMode
			? items[index]?.id
			: groups.find((g) => g.id === groupId)?.items[index]?.id;

		return draggedItem.id !== targetId;
	}
</script>

<div
	bind:this={containerEl}
	class={cn(
		'drag-drop',
		colorClass[color],
		variantClass[variant],
		sizeClass[size],
		direction === 'horizontal' ? 'is-horizontal' : 'is-vertical',
		isDisabled && 'is-disabled',
		isDragging && 'is-dragging',
		isTouchDragging && 'is-touch-dragging',
		className
	)}
>
	{#if isSingleMode}
		<div class="drag-drop-list">
			{#each items as item, index (item.id)}
				<div
					class={cn(
						'drag-drop-item',
						isItemDragging(item) && 'is-dragging',
						isItemDragOver(index) && 'is-drag-over',
						itemClass
					)}
					draggable={!isDisabled && !isTouchDevice}
					ondragstart={(e) => handleDragStart(e, item, index)}
					ondragend={handleDragEnd}
					ondragover={(e) => handleDragOver(e, index)}
					ondragleave={handleDragLeave}
					ondrop={(e) => handleDrop(e, index)}
					ontouchstart={(e) => handleTouchStart(e, item, index)}
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
						<span>{emptyText}</span>
					{/if}
				</div>
			{/if}
		</div>
	{:else}
		{#each groups as group, groupIndex (group.id)}
			<div class={cn('drag-drop-group', groupClass)} data-group-id={group.id}>
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
								isItemDragging(item) && 'is-dragging',
								isItemDragOver(index, group.id) && 'is-drag-over',
								itemClass
							)}
							draggable={!isDisabled && !isTouchDevice}
							ondragstart={(e) => handleDragStart(e, item, index, group.id)}
							ondragend={handleDragEnd}
							ondragover={(e) => handleDragOver(e, index, group.id)}
							ondragleave={handleDragLeave}
							ondrop={(e) => handleDrop(e, index, group.id)}
							ontouchstart={(e) => handleTouchStart(e, item, index, group.id)}
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
								<span>{emptyText}</span>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	{/if}
</div>
