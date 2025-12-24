<script lang="ts">
	import type { SearchState, SearchOption } from '$lib/hooks/use-search.svelte.js';
	import { Search24RegularIcon, DotsMoveIcon } from '$lib/icons/index.js';
	import { Icon, Item, Modal, TextField, type IconData } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import { tick } from 'svelte';

	type Props = {
		search: SearchState;
		open?: boolean;
		placeholder?: string;
		emptyText?: string;
		loadingText?: string;
		loadingMoreText?: string;
		color?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'success'
			| 'info'
			| 'warning'
			| 'danger'
			| 'surface'
			| 'default';
		variant?: 'solid' | 'soft';
		hideCloseButton?: boolean;
		onselect?: (item: SearchOption) => void;
		trigger?: Snippet;
		class?: string;
	};

	let {
		search,
		open = $bindable(false),
		placeholder = 'Search...',
		emptyText = 'No results found',
		loadingText = 'Loading...',
		loadingMoreText = 'Loading more...',
		color = 'default',
		variant = 'solid',
		hideCloseButton = true,
		onselect,
		trigger,
		class: className
	}: Props = $props();

	let optionsEl = $state<HTMLElement>();
	let searchInputEl = $state<HTMLInputElement>();
	let focusedIndex = $state(-1);
	let hasSearched = $state(false);

	const itemVariants = {
		primary: 'primary',
		secondary: 'secondary',
		muted: 'muted',
		success: 'success',
		info: 'info',
		warning: 'warning',
		danger: 'danger',
		surface: 'muted',
		default: 'muted'
	} as const;

	const scrollToItem = (index: number) => {
		if (!optionsEl) return;
		const items = Array.from(optionsEl.querySelectorAll('.item'));
		const target = items[index] as HTMLElement;
		if (!target) return;

		target.scrollIntoView({ block: 'nearest' });
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!open) return;

		const items = search.options;
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
				open = false;
				break;
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
		if (item.href) {
			// Navigation will happen via the Item's href
			open = false;
			search.setSearch('');
		} else {
			onselect?.(item);
			open = false;
			search.setSearch('');
		}
	};

	const handleOpen = async () => {
		open = true;
		await tick();
		focusedIndex = -1;
		hasSearched = false;
		// Focus the search input
		searchInputEl?.focus();
	};

	const handleClose = () => {
		focusedIndex = -1;
		hasSearched = false;
		search.setSearch('');
	};

	$effect(() => {
		if (search.search && search.search.length > 0) {
			hasSearched = true;
		}
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
</script>

<div class={cn('command-trigger', className)}>
	{#if trigger}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div onclick={handleOpen}>
			{@render trigger()}
		</div>
	{/if}
</div>

<Modal
	bind:open
	{color}
	{variant}
	{hideCloseButton}
	onclose={handleClose}
	rootClass="command-modal"
>
	<div class="command-content">
		<div class="command-search">
			<TextField
				bind:el={searchInputEl}
				bind:value={search.search}
				startIcon={Search24RegularIcon}
				{placeholder}
				variant="line"
				color="muted"
				size="lg"
			/>
		</div>

		<div class="command-results" bind:this={optionsEl} onscroll={handleScroll}>
			{#if search.isLoading}
				<div class="command-loading">
					<Icon icon={DotsMoveIcon} class="command-loading-spinner" />
					<span>{loadingText}</span>
				</div>
			{:else if search.options.length === 0 && hasSearched}
				<div class="command-empty">{emptyText}</div>
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
							variant="ghost"
							color={itemVariants[color]}
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
							variant="ghost"
							color={itemVariants[color]}
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
	</div>
</Modal>

<style>
	:global(.command-modal) {
		max-width: 32rem;
		width: 100%;
		padding: 0;
	}

	:global(.command-modal .modal-body) {
		padding: 0;
	}

	.command-content {
		display: flex;
		flex-direction: column;
		min-height: 20rem;
		max-height: 24rem;
	}

	.command-search {
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--color-outline);
	}

	.command-results {
		flex: 1;
		overflow-y: auto;
		padding: 0.5rem;
	}

	.command-loading,
	.command-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 2rem;
		color: var(--color-on-muted);
	}

	:global(.command-loading-spinner) {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
