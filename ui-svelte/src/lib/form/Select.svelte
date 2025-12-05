<script lang="ts">
	import { ArrowDown24RegularIcon } from '$lib/icons/index.js';
	import { Avatar, Icon, Item } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';

	type Option = {
		id: string | number;
		label: string;
		description?: string;
		src?: string;
	};

	type Props = {
		options: Option[];
		value?: unknown;
		selected?: Option;
		placeholder?: string;
		onchange?: (value: unknown) => void;
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
	};

	let {
		class: className,
		options = [],
		value = $bindable(),
		selected = $bindable(),
		placeholder = 'Select an option',
		onchange,
		variant = 'outlined',
		size = 'md',
		name,
		label,
		isLabelActive,
		helpText,
		errorText,
		isFloatLabel,
		isSolid
	}: Props = $props();

	let isOpen = $state(false);
	let controlElement = $state<HTMLElement>();
	let contentEl = $state<HTMLElement>();
	let optionsEl = $state<HTMLElement>();
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

	const avatarSizes: any = {
		sm: 'xs',
		md: 'sm',
		lg: 'md'
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
		if (!optionsEl) return;

		const items = optionsEl.querySelectorAll('li');
		const target = items[index] as HTMLElement;
		if (!target) return;

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
		const foundIndex = options.findIndex((opt) => opt.label.toLowerCase().includes(searchTerm));

		if (foundIndex !== -1) {
			focusedIndex = foundIndex;
			scrollToItem(focusedIndex);
		}

		if (searchTimeout) clearTimeout(searchTimeout);
		searchTimeout = setTimeout(resetSearch, 1500);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!isOpen) return;
		if (!options.length) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				focusedIndex = (focusedIndex + 1) % options.length;
				scrollToItem(focusedIndex);
				break;
			case 'ArrowUp':
				event.preventDefault();
				focusedIndex = (focusedIndex - 1 + options.length) % options.length;
				scrollToItem(focusedIndex);
				break;
			case 'Enter': {
				event.preventDefault();
				if (focusedIndex >= 0 && focusedIndex < options.length) {
					handleSelect(options[focusedIndex]);
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
			focusedIndex = options.findIndex((opt) => opt.id === value);
			if (focusedIndex === -1 && options.length) focusedIndex = 0;
		}, 50);
	};

	const scrollToSelectedItem = async () => {
		setTimeout(() => {
			if (!optionsEl || !selected) return;

			const selectedIndex = options.findIndex((opt) => opt.id === selected?.id);
			if (selectedIndex !== -1) {
				scrollToItem(selectedIndex);
			}
		}, 50);
	};

	const toggleDropdown = async () => {
		if (!isOpen) {
			startEventListeners();
			initializeFocusedIndex();
			scrollToSelectedItem();
			updatePosition();
			isOpen = true;
		} else {
			stopEventListeners();
			focusedIndex = -1;
			isOpen = false;
		}
	};

	const handleSelect = (item: Option) => {
		selected = item;
		value = item.id;
		onchange?.(value);
		stopEventListeners();
		focusedIndex = -1;
		isOpen = false;
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

	onMount(() => {
		if (value && !selected) {
			selected = options.find((opt) => opt.id === value);
		} else if (selected) {
			value = selected.id;
		}
		updatePosition();
		return () => stopEventListeners();
	});

	$effect(() => {
		if (!value) {
			selected = undefined;
		}
	});
</script>

<div class={cn('field', className)}>
	<input type="text" {name} bind:value hidden />

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
			(isActive || isFocused) && 'is-active'
		)}
		class:is-error={errorText}
		onclick={toggleDropdown}
		onmouseenter={() => (isActive = true)}
		onmouseleave={() => (isActive = false)}
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

		{#if selected?.src}
			<Avatar src={selected.src} name={selected.label} size={avatarSizes[size]} />
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

		<div class="control-btn">
			<Icon icon={ArrowDown24RegularIcon} class={cn('control-arrow', isOpen && 'is-active')} />
		</div>
	</button>

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-danger')}>{errorText || helpText}</div>
	{/if}

	<div class:is-active={isOpen} class="select-popover" bind:this={contentEl} {style}>
		<ul class="select-options" bind:this={optionsEl}>
			{#each options as item, index}
				<li>
					<Item
						label={item.label}
						src={item.src}
						description={item.description}
						id={item.id}
						onclick={() => handleSelect(item)}
						isActive={value === item.id}
						isFocused={focusedIndex === index}
						variant={itemVariants[variant]}
						size="sm"
						isCompact
					/>
				</li>
			{/each}
		</ul>
	</div>
</div>
