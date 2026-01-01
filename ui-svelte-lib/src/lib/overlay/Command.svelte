<script lang="ts">
	import type { SearchState, SearchOption } from '$lib/hooks/use-search.svelte.js';
	import { Search24RegularIcon, DotsMoveIcon } from '$lib/icons/index.js';
	import { Icon, Item, type IconData } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { popover } from '$lib/utils/popover.js';
	import { tick } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';

	type CommandGroup = {
		label: string;
		icon?: IconData;
		options: SearchOption[];
	};

	type Props = {
		search: SearchState;
		open?: boolean;
		placeholder?: string;
		emptyText?: string;
		loadingText?: string;
		loadingMoreText?: string;
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
		placeholder = 'Search...',
		emptyText = 'No results found',
		loadingText = 'Loading...',
		loadingMoreText = 'Loading more...',
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

	let openContent = $state(false);
	let optionsEl = $state<HTMLElement>();
	let searchInputEl = $state<HTMLInputElement>();
	let focusedIndex = $state(-1);
	let hasSearched = $state(false);

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

	const handleOverlayClick = () => {
		if (!disableOverlayClose) {
			handleClose();
		}
	};

	const handleClose = () => {
		open = false;
		focusedIndex = -1;
		hasSearched = false;
		search.setSearch('');
		onclose?.();
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
			setTimeout(() => {
				openContent = true;
			}, 20);
			document.addEventListener('keydown', handleKeyDown);
		} else {
			openContent = false;
			document.removeEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	$effect(() => {
		if (openContent && searchInputEl) {
			tick().then(() => {
				searchInputEl?.focus();
				focusedIndex = -1;
				hasSearched = false;
			});
		}
	});

	$effect(() => {
		if (!disableGlobalShortcut) {
			document.addEventListener('keydown', handleGlobalKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleGlobalKeyDown);
		};
	});

	const isMac =
		typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
	const modifierKey = isMac ? '⌘' : 'Ctrl';
</script>

{#if open}
	<div transition:fade class="command-dialog" use:popover>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="command-overlay" onclick={handleOverlayClick}></div>
		{#if openContent}
			<div in:scale={{ duration: 100 }} class={cn('command', className)}>
				<div class="command-search">
					<Icon icon={Search24RegularIcon} class="command-search-icon" />
					<input
						bind:this={searchInputEl}
						type="text"
						class="command-search-input"
						{placeholder}
						bind:value={search.search}
					/>
					<div class="command-kbd">
						<kbd>Esc</kbd>
						<span>to close</span>
					</div>
				</div>

				<div class="command-results" bind:this={optionsEl} onscroll={handleScroll}>
					{#if search.isLoading}
						<div class="command-loading">
							<Icon icon={DotsMoveIcon} class="command-loading-spinner" />
							<span>{loadingText}</span>
						</div>
					{:else if flatOptions().length === 0 && hasSearched}
						<div class="command-empty">{emptyText}</div>
					{:else if filteredGroups().length > 0}
						{#each filteredGroups() as group}
							{#if group.options.length > 0}
								<div class="command-group">
									<div class="command-group-label">
										{#if group.icon}
											<Icon icon={group.icon} class="command-group-icon" />
										{/if}
										{group.label}
									</div>
									{#each group.options as item}
										{@const globalIndex = flatOptions().indexOf(item)}
										{#if item.href}
											<Item
												id={item.id}
												label={item.label}
												icon={item.icon as IconData}
												src={item.src}
												description={item.description}
												href={item.href as string}
												isFocused={focusedIndex === globalIndex}
												isDisabled={item.disabled}
												{color}
												size="sm"
												isCompact
												onclick={() => handleSelect(item)}
											/>
										{:else}
											<Item
												id={item.id}
												label={item.label}
												icon={item.icon as IconData}
												src={item.src}
												description={item.description}
												isFocused={focusedIndex === globalIndex}
												isDisabled={item.disabled}
												{color}
												size="sm"
												isCompact
												onclick={() => handleSelect(item)}
											/>
										{/if}
									{/each}
								</div>
							{/if}
						{/each}

						{#if search.isLoadingMore}
							<div class="command-loading">
								<Icon icon={DotsMoveIcon} class="command-loading-spinner" />
								<span>{loadingMoreText}</span>
							</div>
						{/if}
					{:else if search.options.length > 0}
						{#each search.options as item, index}
							{#if item.href}
								<Item
									id={item.id}
									label={item.label}
									icon={item.icon as IconData}
									src={item.src}
									description={item.description}
									href={item.href as string}
									isFocused={focusedIndex === index}
									isDisabled={item.disabled}
									{color}
									size="sm"
									isCompact
									onclick={() => handleSelect(item)}
								/>
							{:else}
								<Item
									id={item.id}
									label={item.label}
									icon={item.icon as IconData}
									src={item.src}
									description={item.description}
									isFocused={focusedIndex === index}
									isDisabled={item.disabled}
									{color}
									size="sm"
									isCompact
									onclick={() => handleSelect(item)}
								/>
							{/if}
						{/each}

						{#if search.isLoadingMore}
							<div class="command-loading">
								<Icon icon={DotsMoveIcon} class="command-loading-spinner" />
								<span>{loadingMoreText}</span>
							</div>
						{/if}
					{/if}
				</div>

				{#if showFooter}
					<div class="command-footer">
						<div class="command-shortcut">
							<div class="command-shortcut-item">
								<kbd>↑</kbd><kbd>↓</kbd>
								<span>Navigate</span>
							</div>
							<div class="command-shortcut-item">
								<kbd>↵</kbd>
								<span>Select</span>
							</div>
						</div>
						<div class="command-shortcut-item">
							<kbd>{modifierKey}</kbd><kbd>{shortcut.toUpperCase()}</kbd>
							<span>Toggle</span>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/if}
