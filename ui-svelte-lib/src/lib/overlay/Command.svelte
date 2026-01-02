<script lang="ts">
	import type { SearchState, SearchOption } from '$lib/hooks/use-search.svelte.js';
	import { Search24RegularIcon, DotsMoveIcon } from '$lib/icons/index.js';
	import { Icon, Item, Modal, TextField, type IconData } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	type CommandGroup = {
		label: string;
		icon?: IconData;
		options: SearchOption[];
	};

	type CommandLabels = {
		placeholder?: string;
		emptyText?: string;
		loadingText?: string;
		loadingMoreText?: string;
		closeText?: string;
		navigateText?: string;
		selectText?: string;
		toggleText?: string;
	};

	type Props = {
		search: SearchState;
		open?: boolean;
		labels?: CommandLabels;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'warning' | 'danger';
		disableOverlayClose?: boolean;
		disableGlobalShortcut?: boolean;
		shortcut?: string;
		showFooter?: boolean;
		groups?: CommandGroup[];
		onselect?: (item: SearchOption) => void;
		onclose?: () => void;
		class?: string;
	};

	let {
		search,
		open = $bindable(false),
		labels = {},
		color = 'muted',
		disableOverlayClose = false,
		disableGlobalShortcut = false,
		shortcut = 'k',
		showFooter = true,
		groups,
		onselect,
		onclose,
		class: className
	}: Props = $props();

	const defaultLabels: Required<CommandLabels> = {
		placeholder: 'Search...',
		emptyText: 'No results found',
		loadingText: 'Loading...',
		loadingMoreText: 'Loading more...',
		closeText: 'to close',
		navigateText: 'Navigate',
		selectText: 'Select',
		toggleText: 'Toggle'
	};

	const t = $derived({ ...defaultLabels, ...labels });

	let optionsEl = $state<HTMLElement>();
	let searchInputEl = $state<HTMLInputElement>();
	let focusedIndex = $state(-1);
	let hasSearched = $state(false);
	let modifierKey = $state('Ctrl');

	const filteredGroups = $derived(() => {
		if (!groups || groups.length === 0) return [];
		const query = search.search?.toLowerCase() ?? '';
		if (!query) return groups;

		return groups
			.map((group) => ({
				...group,
				options: group.options.filter((opt) => opt.label.toLowerCase().includes(query))
			}))
			.filter((group) => group.options.length > 0);
	});

	const flatOptions = $derived(() => {
		const filtered = filteredGroups();
		if (filtered.length > 0) {
			return filtered.flatMap((g) => g.options);
		}
		return search.options;
	});

	const scrollToItem = (index: number) => {
		if (!optionsEl) return;
		const items = Array.from(optionsEl.querySelectorAll('.item'));
		const target = items[index] as HTMLElement;
		if (!target) return;

		target.scrollIntoView({ block: 'nearest' });
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		const items = flatOptions();
		if (!items.length && event.key !== 'Escape') return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				focusedIndex = (focusedIndex + 1) % items.length;
				scrollToItem(focusedIndex);
				break;
			case 'ArrowUp':
				event.preventDefault();
				focusedIndex = (focusedIndex - 1 + items.length) % items.length;
				scrollToItem(focusedIndex);
				break;
			case 'Enter': {
				event.preventDefault();
				if (focusedIndex >= 0 && focusedIndex < items.length) {
					handleSelect(items[focusedIndex]);
				}
				break;
			}
			case 'Escape':
				event.preventDefault();
				handleClose();
				break;
		}
	};

	const handleGlobalKeyDown = (event: KeyboardEvent) => {
		if (disableGlobalShortcut) return;
		if (typeof navigator === 'undefined') return;

		const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
		const modifier = isMac ? event.metaKey : event.ctrlKey;

		if (modifier && event.key.toLowerCase() === shortcut.toLowerCase()) {
			event.preventDefault();
			open = !open;
		}
	};

	const handleScroll = async () => {
		if (!optionsEl || !search.hasMore || search.isLoadingMore) return;

		const { scrollTop, scrollHeight, clientHeight } = optionsEl;
		const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

		if (scrollPercentage >= 0.8) {
			await search.loadMore();
		}
	};

	const handleSelect = (item: SearchOption) => {
		onselect?.(item);
		open = false;
		search.setSearch('');
	};

	const handleClose = () => {
		open = false;
		focusedIndex = -1;
		hasSearched = false;
		search.setSearch('');
		onclose?.();
	};

	const handleModalClose = () => {
		handleClose();
	};

	$effect(() => {
		if (search.search && search.search.length > 0) {
			hasSearched = true;
		}
	});

	$effect(() => {
		afterNavigate(() => {
			if (open) {
				open = false;
				focusedIndex = -1;
				hasSearched = false;
				search.setSearch('');
			}
		});
	});

	$effect(() => {
		if (open) {
			document.addEventListener('keydown', handleKeyDown);
		} else {
			document.removeEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	$effect(() => {
		if (open && searchInputEl) {
			tick().then(() => {
				searchInputEl?.focus();
				focusedIndex = -1;
				hasSearched = false;
			});
		}
	});

	$effect(() => {
		if (typeof document === 'undefined') return;

		if (!disableGlobalShortcut) {
			document.addEventListener('keydown', handleGlobalKeyDown);
		}

		if (typeof navigator !== 'undefined') {
			const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
			modifierKey = isMac ? '⌘' : 'Ctrl';
		}

		return () => {
			document.removeEventListener('keydown', handleGlobalKeyDown);
		};
	});
</script>

{#snippet commandKbd()}
	<div class="command-kbd">
		<kbd>Esc</kbd>
		<span>{t.closeText}</span>
	</div>
{/snippet}

{#snippet renderItem(item: SearchOption, index: number)}
	{@const hasVisualElement = !!item.icon || !!item.src}
	<Item
		id={item.id}
		label={item.label}
		icon={item.icon as IconData}
		src={item.src}
		description={item.description}
		href={item.href as string | undefined}
		isFocused={focusedIndex === index}
		isDisabled={item.disabled}
		hasBullet={!hasVisualElement}
		{color}
		size="sm"
		isCompact
		onclick={() => handleSelect(item)}
	/>
{/snippet}

<Modal
	bind:open
	onclose={handleModalClose}
	rootClass={cn(className)}
	color="background"
	{disableOverlayClose}
	hideCloseButton
>
	{#snippet header()}
		<TextField
			bind:el={searchInputEl}
			bind:value={search.search}
			placeholder={t.placeholder}
			startIcon={Search24RegularIcon}
			variant="line"
			{color}
			size="md"
			endText={commandKbd}
		/>
	{/snippet}

	<div class="command-results" bind:this={optionsEl} onscroll={handleScroll}>
		{#if search.isLoading}
			<div class="command-loading">
				<Icon icon={DotsMoveIcon} class="command-loading-spinner" />
				<span>{t.loadingText}</span>
			</div>
		{:else if flatOptions().length === 0 && hasSearched}
			<div class="command-empty">{t.emptyText}</div>
		{:else if filteredGroups().length > 0}
			{#each filteredGroups() as group}
				<div class="command-group">
					<div class="command-group-label">
						{#if group.icon}
							<Icon icon={group.icon} class="command-group-icon" />
						{/if}
						{group.label}
					</div>
					<div class="command-group-items">
						{#each group.options as item}
							{@render renderItem(item, flatOptions().indexOf(item))}
						{/each}
					</div>
				</div>
			{/each}

			{#if search.isLoadingMore}
				<div class="command-loading">
					<Icon icon={DotsMoveIcon} class="command-loading-spinner" />
					<span>{t.loadingMoreText}</span>
				</div>
			{/if}
		{:else if search.options.length > 0}
			<div class="command-group-items">
				{#each search.options as item, index}
					{@render renderItem(item, index)}
				{/each}
			</div>

			{#if search.isLoadingMore}
				<div class="command-loading">
					<Icon icon={DotsMoveIcon} class="command-loading-spinner" />
					<span>{t.loadingMoreText}</span>
				</div>
			{/if}
		{/if}
	</div>

	{#snippet footer()}
		{#if showFooter}
			<div class="command-shortcuts">
				<div class="command-shortcut">
					<div class="command-shortcut-item">
						<kbd>↑</kbd><kbd>↓</kbd>
						<span>{t.navigateText}</span>
					</div>
					<div class="command-shortcut-item">
						<kbd>↵</kbd>
						<span>{t.selectText}</span>
					</div>
				</div>
				<div class="command-shortcut-item">
					<kbd>{modifierKey}</kbd><kbd>{shortcut.toUpperCase()}</kbd>
					<span>{t.toggleText}</span>
				</div>
			</div>
		{/if}
	{/snippet}
</Modal>
