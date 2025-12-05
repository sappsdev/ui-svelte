<script lang="ts">
	import { Avatar, Icon, Item } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { onMount, tick } from 'svelte';
	import { normalizedCountries, type Country } from './js/countries.js';
	import type { IconName } from '$lib/types.js';
	import { ChevronDown24RegularIcon, DotsMoveIcon, Search24RegularIcon } from '$lib/icons/index.js';

	type Props = {
		value?: string;
		countryCode?: string;
		dialCode?: string;
		placeholder?: string;
		onchange?: (value: string) => void;
		variant?: 'primary' | 'secondary' | 'muted' | 'outlined' | 'line';
		size?: 'sm' | 'md' | 'lg';
		name?: string;
		dialCodeName?: string;
		class?: string;
		label?: string;
		isLabelActive?: boolean;
		helpText?: string;
		errorText?: string;
		isFloatLabel?: boolean;
		isSolid?: boolean;
		priorityCountries?: string[];
		searchPlaceholder?: string;
		emptyText?: string;
		loadingText?: string;
	};

	let {
		class: className,
		value = $bindable(''),
		countryCode = $bindable(''),
		dialCode = $bindable(''),
		placeholder = 'Enter phone number',
		onchange,
		variant = 'outlined',
		size = 'md',
		name,
		dialCodeName = 'dialCode',
		label,
		isLabelActive,
		helpText,
		errorText,
		isFloatLabel,
		isSolid,
		priorityCountries = [],
		searchPlaceholder = 'Search country...',
		emptyText = 'No countries found',
		loadingText = 'Loading...'
	}: Props = $props();

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		outlined: 'is-outlined',
		line: 'is-line'
	};

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

	let displayedCountries = $state<Country[]>([]);
	let allSortedCountries = $state<Country[]>([]);
	let currentPage = $state(0);
	const PAGE_SIZE = 20;
	let isLoadingMore = $state(false);
	let searchQuery = $state('');

	let isOpen = $state(false);
	let controlElement = $state<HTMLElement>();
	let contentEl = $state<HTMLElement>();
	let optionsEl = $state<HTMLElement>();
	let phoneInputEl = $state<HTMLInputElement>();
	let focusedIndex = $state(-1);
	let searchTerm = $state('');
	let searchTimeout: ReturnType<typeof setTimeout> | null = $state(null);
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

	const selectedCountry = $derived(normalizedCountries.find((c) => c.id === countryCode));

	const getItems = () => {
		if (!optionsEl) return [];
		return Array.from(optionsEl.querySelectorAll('li'));
	};

	const sortCountries = () => {
		const selected = normalizedCountries.find((c) => c.id === countryCode);
		const priority = normalizedCountries.filter(
			(c) => priorityCountries.includes(c.id.toLowerCase()) && c.id !== countryCode
		);
		const rest = normalizedCountries.filter(
			(c) => c.id !== countryCode && !priorityCountries.includes(c.id.toLowerCase())
		);

		allSortedCountries = [...(selected ? [selected] : []), ...priority, ...rest];
	};

	const filterCountries = async () => {
		if (!searchQuery.trim()) {
			return allSortedCountries;
		}
		const query = searchQuery.toLowerCase();
		return allSortedCountries.filter(
			(c) => c.name.toLowerCase().includes(query) || c.dialCode.includes(query)
		);
	};

	const loadInitialCountries = async () => {
		sortCountries();
		const filtered = await filterCountries();
		displayedCountries = filtered.slice(0, PAGE_SIZE);
		currentPage = 0;
	};

	const loadMoreCountries = async () => {
		if (isLoadingMore) return;

		isLoadingMore = true;
		const filtered = await filterCountries();
		const nextPage = currentPage + 1;
		const start = nextPage * PAGE_SIZE;
		const end = start + PAGE_SIZE;

		if (start < filtered.length) {
			const newCountries = filtered.slice(start, end);
			displayedCountries = [...displayedCountries, ...newCountries];
			currentPage = nextPage;
		}

		setTimeout(() => {
			isLoadingMore = false;
		}, 100);
	};

	const handleScroll = async (event: Event) => {
		const target = event.target as HTMLElement;
		const scrollPercentage = (target.scrollTop + target.clientHeight) / target.scrollHeight;

		if (scrollPercentage > 0.8) {
			await loadMoreCountries();
		}
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
		const foundIndex = displayedCountries.findIndex((opt) =>
			opt.name.toLowerCase().includes(searchTerm)
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

		const items = displayedCountries;
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

	const initializeFocusedIndex = async () => {
		setTimeout(() => {
			focusedIndex = displayedCountries.findIndex((opt) => opt.id === countryCode);
			if (focusedIndex === -1 && displayedCountries.length) focusedIndex = 0;
		}, 100);
	};

	const scrollToSelectedItem = async () => {
		setTimeout(() => {
			if (!optionsEl || !countryCode) return;

			const selectedIndex = displayedCountries.findIndex((opt) => opt.id === countryCode);
			if (selectedIndex !== -1) {
				scrollToItem(selectedIndex);
			}
		}, 100);
	};

	const toggleDropdown = async () => {
		if (!isOpen) {
			await loadInitialCountries();
			startEventListeners();
			await initializeFocusedIndex();
			await scrollToSelectedItem();
			await tick();
			await updatePosition();
			isOpen = true;
		} else {
			stopEventListeners();
			focusedIndex = -1;
			searchQuery = '';
			isOpen = false;
		}
	};

	const handleSelect = async (item: Country) => {
		countryCode = item.id;
		dialCode = item.dialCode;
		stopEventListeners();
		focusedIndex = -1;
		searchQuery = '';
		isOpen = false;
		await tick();
		phoneInputEl?.focus();
	};

	const handleClickOutside = (event: Event) => {
		if (
			isOpen &&
			!controlElement?.contains(event.target as Node) &&
			!contentEl?.contains(event.target as Node)
		) {
			isOpen = false;
			focusedIndex = -1;
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

	const handleSearchInput = async () => {
		await loadInitialCountries();
		await updatePosition();
	};

	const handlePhoneInput = () => {
		onchange?.(value);
	};

	onMount(() => {
		return () => stopEventListeners();
	});

	$effect(() => {
		if (!countryCode && priorityCountries.length > 0) {
			const firstPriority = normalizedCountries.find(
				(c) => c.id.toLowerCase() === priorityCountries[0].toLowerCase()
			);
			if (firstPriority) {
				countryCode = firstPriority.id;
				dialCode = firstPriority.dialCode;
			}
		}
	});
</script>

<div class={cn('field', className)}>
	<input type="hidden" name={dialCodeName} bind:value={dialCode} />

	{#if !isFloatLabel && label}
		<div class="field-label">{label}</div>
	{/if}

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={controlElement}
		class={cn(
			'control',
			variantClasses[variant],
			sizeClasses[size],
			isFloatLabel && 'is-float',
			isSolid && 'is-solid',
			(isActive || isFocused || isOpen) && 'is-active'
		)}
		class:is-error={errorText}
		onmouseenter={() => (isActive = true)}
		onmouseleave={() => (isActive = false)}
	>
		{#if isFloatLabel && label}
			<span
				class={cn(
					'control-label',
					(isActive || isFocused || isLabelActive || isOpen || value !== '' || countryCode) &&
						'is-active'
				)}
			>
				{label}
			</span>
		{/if}

		<button
			type="button"
			class="phone-country-btn"
			onclick={toggleDropdown}
			aria-label="Select country"
		>
			{#if selectedCountry}
				<Avatar name={selectedCountry.name} {size} variant="transparent" />
				<span class="phone-dial-code">+{dialCode}</span>
			{:else}
				<Avatar name="Select country" {size} variant="transparent" />
				<span class="phone-dial-code">+--</span>
			{/if}
			<Icon icon={ChevronDown24RegularIcon} class={cn('control-arrow', isOpen && 'is-active')} />
		</button>

		<input
			bind:this={phoneInputEl}
			type="tel"
			{name}
			bind:value
			class={cn(
				'control-input',
				isFloatLabel && !isActive && !isFocused && !value && !countryCode && 'invisible'
			)}
			{placeholder}
			oninput={handlePhoneInput}
			onfocusin={() => (isFocused = true)}
			onfocusout={() => (isFocused = false)}
		/>
	</div>

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-danger')}>{errorText || helpText}</div>
	{/if}

	<div class:is-active={isOpen} class="combo-box-popover" bind:this={contentEl} {style}>
		<div class={cn('combo-box-search', variantClasses[variant])}>
			<Icon icon={Search24RegularIcon} class="combo-box-search-icon" />
			<input
				type="text"
				class="combo-box-search-input"
				placeholder={searchPlaceholder}
				bind:value={searchQuery}
				oninput={handleSearchInput}
			/>
		</div>

		{#if displayedCountries.length === 0 && !isLoadingMore}
			<div class="combo-box-empty">{emptyText}</div>
		{:else}
			<ul class="combo-box-options" bind:this={optionsEl} onscroll={handleScroll}>
				{#each displayedCountries as item, index}
					<li>
						<Item
							label={item.name}
							description="+{item.dialCode}"
							id={item.id}
							onclick={() => handleSelect(item)}
							isActive={countryCode === item.id}
							isFocused={focusedIndex === index}
							variant="primary"
							size="sm"
							isCompact
						/>
					</li>
				{/each}
				{#if isLoadingMore}
					<div class="combo-box-loading">
						<Icon icon={DotsMoveIcon} class="combo-box-loading-spinner" />
						<span>{loadingText}</span>
					</div>
				{/if}
			</ul>
		{/if}
	</div>
</div>

<style>
	.phone-country-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
		flex-shrink: 0;
	}

	.phone-dial-code {
		font-size: inherit;
		color: inherit;
	}
</style>
