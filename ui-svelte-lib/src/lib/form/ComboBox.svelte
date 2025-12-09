<script lang="ts">
	import type { SearchState, SearchOption } from '$lib/hooks/use-search.svelte.js';
	import { Avatar, Icon, Item } from '$lib/index.js';
	import type { IconName } from '$lib/types.js';
	import { cn } from '$lib/utils/class-names.js';
	import { onMount, tick } from 'svelte';

	type Props = {
		search: SearchState;
		value?: string | number | null;
		selected?: SearchOption;
		placeholder?: string;
		searchPlaceholder?: string;
		emptyText?: string;
		loadingText?: string;
		loadingMoreText?: string;
		onchange?: (value: string | number | null) => void;
		variant?: 'primary' | 'secondary' | 'muted' | 'outlined' | 'line';
		size?: 'sm' | 'md' | 'lg';
		name?: string;
		class?: string;
		label?: string;
		isLabelActive?: boolean;
		helpText?: string;
		errorText?: string;
		isFloatLabel?: boolean;
		isSolid?: boolean;
		isClearable?: boolean;
		isDisabled?: boolean;
		arrowIcon?: IconName;
	};

	let {
		class: className,
		search,
		value = $bindable(null),
		selected = $bindable(),
		placeholder = 'Select an option',
		searchPlaceholder = 'Search...',
		emptyText = 'No options found',
		loadingText = 'Loading...',
		loadingMoreText = 'Loading more...',
		onchange,
		variant = 'outlined',
		size = 'md',
		name,
		label,
		isLabelActive,
		helpText,
		errorText,
		isFloatLabel,
		isSolid,
		isClearable = false,
		isDisabled = false,
		arrowIcon = 'fluent:arrow-sort-down-24-regular'
	}: Props = $props();

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		outlined: 'is-outlined',
		line: 'is-line'
	};

	const itemVariants = {
		primary: 'primary',
		secondary: 'secondary',
		muted: 'muted',
		outlined: 'primary',
		line: 'primary'
	} as const;

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const avatarSizes = {
		sm: 'xs',
		md: 'sm',
		lg: 'md'
	} as const;

	let isOpen = $state(false);
	let controlElement = $state<HTMLElement>();
	let contentEl = $state<HTMLElement>();
	let optionsEl = $state<HTMLElement>();
	let focusedIndex = $state(-1);
	let searchTerm = $state('');
	let searchTimeout: ReturnType<typeof setTimeout> | null = $state(null);
	let hasSearched = $state(false);
	let position = $state({
		top: 0,
		left: 0,
		width: 0,
		isBottomHalf: false
	});

	let isActive = $state(false);
	let isFocused = $state(false);

	const style = $derived(
		`top: ${position.top}px; left: ${position.left}px; width: ${position.width}px; transform-origin: ${position.isBottomHalf ? 'bottom' : 'top'} center;`
	);

	const getItems = () => {
		if (!optionsEl) return [];
		return Array.from(optionsEl.querySelectorAll('li'));
	};

	const updatePosition = async () => {
		if (!controlElement || !contentEl) return;

		const rect = controlElement.getBoundingClientRect();
		const windowHeight = window.innerHeight;
		const contentHeight = contentEl.getBoundingClientRect().height;
		const isBottomHalf = rect.top + rect.height / 2 > windowHeight / 2;

		const top = isBottomHalf ? rect.top - contentHeight - 8 : rect.top + rect.height;
		position = {
			top: top,
			left: rect.left + window.scrollX,
			width: rect.width,
			isBottomHalf
		};
	};

	const scrollToItem = (index: number) => {
		const items = getItems();
		const target = items[index] as HTMLElement;
		if (!target || !optionsEl) return;

		const containerHeight = optionsEl.clientHeight;
		const itemTop = target.offsetTop;
		const itemHeight = target.clientHeight;

		if (itemTop > containerHeight * 0.7) {
			optionsEl.scrollTop = itemTop - containerHeight + itemHeight + 40;
		} else {
			target.scrollIntoView({ block: 'nearest' });
		}
	};

	const resetSearch = () => {
		searchTerm = '';
		if (searchTimeout) {
			clearTimeout(searchTimeout);
			searchTimeout = null;
		}
	};

	const handleSearch = () => {
		const foundIndex = search.options.findIndex((opt) =>
			opt.label.toLowerCase().includes(searchTerm)
		);

		if (foundIndex !== -1) {
			focusedIndex = foundIndex;
			scrollToItem(focusedIndex);
		}

		if (searchTimeout) clearTimeout(searchTimeout);
		searchTimeout = setTimeout(resetSearch, 1500);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!isOpen) return;

		const items = search.options;
		if (!items.length) return;

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
				toggleDropdown();
				break;
			default:
				if (event.key.length === 1 && /[a-zA-Z0-9 ]/.test(event.key)) {
					searchTerm += event.key.toLowerCase();
					handleSearch();
				}
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

	const initializeFocusedIndex = async () => {
		setTimeout(() => {
			focusedIndex = search.options.findIndex((opt) => opt.id === value);
			if (focusedIndex === -1 && search.options.length) focusedIndex = 0;
		}, 100);
	};

	const scrollToSelectedItem = async () => {
		setTimeout(() => {
			if (!optionsEl || !selected) return;

			const selectedIndex = search.options.findIndex((opt) => opt.id === selected?.id);
			if (selectedIndex !== -1) {
				scrollToItem(selectedIndex);
			}
		}, 100);
	};

	const toggleDropdown = async () => {
		if (isDisabled) return;

		if (!isOpen) {
			startEventListeners();
			await initializeFocusedIndex();
			await scrollToSelectedItem();
			await tick();
			await updatePosition();
			isOpen = true;
			hasSearched = false;
		} else {
			stopEventListeners();
			focusedIndex = -1;
			isOpen = false;
			hasSearched = false;
		}
	};

	const handleSelect = (item: SearchOption) => {
		selected = item;
		value = item.id;
		search.setSelectedValue(item.id);
		onchange?.(value);
		stopEventListeners();
		focusedIndex = -1;
		isOpen = false;
		hasSearched = false;
	};

	const handleClear = (event: Event) => {
		event.stopPropagation();
		selected = undefined;
		value = null;
		search.setSelectedValue(null);
		search.setSearch('');
		onchange?.(null);
	};

	const handleClickOutside = (event: Event) => {
		if (
			isOpen &&
			!controlElement?.contains(event.target as Node) &&
			!contentEl?.contains(event.target as Node)
		) {
			isOpen = false;
			focusedIndex = -1;
			hasSearched = false;
		}
	};

	const startEventListeners = () => {
		window.addEventListener('resize', updatePosition);
		window.addEventListener('scroll', updatePosition, true);
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
	};

	const stopEventListeners = () => {
		window.removeEventListener('resize', updatePosition);
		window.removeEventListener('scroll', updatePosition, true);
		document.removeEventListener('click', handleClickOutside);
		document.removeEventListener('keydown', handleKeyDown);
	};

	onMount(() => {
		return () => stopEventListeners();
	});

	$effect(() => {
		if (!value) {
			selected = undefined;
		}
	});

	$effect(() => {
		if (search.search && search.search.length > 0) {
			hasSearched = true;
		}
	});

	$effect(() => {
		if (isOpen && search.options) {
			updatePosition();
		}
	});
</script>

<div class={cn('field', className)}>
	<input type="hidden" {name} bind:value />

	{#if !isFloatLabel && label}
		<div class="field-label">{label}</div>
	{/if}

	<button
		type="button"
		bind:this={controlElement}
		class={cn(
			'control',
			variantClasses[variant],
			sizeClasses[size],
			isFloatLabel && 'is-float',
			isSolid && 'is-solid',
			(isActive || isFocused || isOpen) && 'is-active',
			isDisabled && 'opacity-50 cursor-not-allowed'
		)}
		class:is-error={errorText}
		onclick={toggleDropdown}
		onmouseenter={() => (isActive = true)}
		onmouseleave={() => (isActive = false)}
		onfocusin={() => (isFocused = true)}
		onfocusout={() => (isFocused = false)}
		disabled={isDisabled}
	>
		{#if isFloatLabel && label}
			<span
				class={cn(
					'control-label',
					(isActive || isFocused || isLabelActive || isOpen || value !== '') && 'is-active'
				)}
			>
				{label}
			</span>
		{/if}

		{#if selected?.src || selected?.icon}
			<Avatar
				src={selected.src}
				name={selected.label}
				icon={selected.icon as IconName}
				size={avatarSizes[size]}
			/>
		{/if}

		<div class="control-selected">
			{#if selected}
				{selected.label}
			{:else if isFloatLabel}
				{#if isActive || isOpen}
					{placeholder}
				{/if}
			{:else}
				{placeholder}
			{/if}
		</div>

		<div class="control-btn flex items-center gap-1">
			{#if isClearable && selected}
				<!-- svelte-ignore node_invalid_placement_ssr -->
				<button
					type="button"
					class="combo-box-clear"
					onclick={handleClear}
					aria-label="Clear selection"
				>
					<Icon name="fluent:dismiss-16-regular" />
				</button>
			{/if}
			<Icon name={arrowIcon} class={cn('control-arrow', isOpen && 'is-active')} />
		</div>
	</button>

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-danger')}>{errorText || helpText}</div>
	{/if}

	<div class:is-active={isOpen} class="combo-box-popover" bind:this={contentEl} {style}>
		<div class={cn('combo-box-search', variantClasses[variant])}>
			<Icon name="fluent:search-24-regular" class="combo-box-search-icon" />
			<input
				type="text"
				class="combo-box-search-input"
				placeholder={searchPlaceholder}
				bind:value={search.search}
			/>
		</div>

		{#if search.isLoading}
			<div class="combo-box-loading">
				<Icon name="fluent:spinner-ios-20-regular" class="combo-box-loading-spinner" />
				<span>{loadingText}</span>
			</div>
		{:else if search.options.length === 0 && hasSearched}
			<div class="combo-box-empty">{emptyText}</div>
		{:else if search.options.length > 0}
			<ul class="combo-box-options" bind:this={optionsEl} onscroll={handleScroll}>
				{#each search.options as item, index}
					<li>
						<Item
							label={item.label}
							icon={item.icon as IconName}
							src={item.src}
							description={item.description}
							id={item.id}
							onclick={() => handleSelect(item)}
							isActive={value === item.id}
							isFocused={focusedIndex === index}
							isDisabled={item.disabled}
							variant={itemVariants[variant]}
							size="sm"
							isCompact
						/>
					</li>
				{/each}

				{#if search.isLoadingMore}
					<li class="combo-box-loading-more">
						<Icon name="fluent:spinner-ios-20-regular" class="combo-box-loading-spinner" />
						<span>{loadingMoreText}</span>
					</li>
				{/if}
			</ul>
		{/if}
	</div>
</div>
