<script lang="ts">
	import { ArrowLeft24RegularIcon, ArrowRight24RegularIcon } from '$lib/icons/index.js';
	import { Button, formatDate, getWeekdays, Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';

	type Props = {
		value?: unknown;
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
		value = $bindable(),
		placeholder = 'Select an option',
		onchange,
		variant = 'outlined',
		size = 'md',
		name,
		label,
		isLabelActive,
		helpText,
		errorText,
		class: className,
		isFloatLabel,
		isSolid
	}: Props = $props();

	let selectedDate = $state<Date>(new Date());
	let currentMonth = $derived(selectedDate.getMonth());
	let currentYear = $derived(selectedDate.getFullYear());
	let contentEl = $state<HTMLDivElement>();
	let controlElement = $state<HTMLElement>();

	let isOpen = $state(false);
	const uid = $props.id();

	let isActive = $state(false);
	let isFocused = $state(false);

	let position = $state({
		top: 0,
		left: 0,
		width: 'auto',
		isBottomHalf: false
	});

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

	const style = $derived(
		`top: ${position.top}px; left: ${position.left}px; width: ${position.width}px; transform-origin: ${position.isBottomHalf ? 'bottom' : 'top'} center;`
	);

	const getDaysInMonth = (month: number, year: number) => {
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days = [];

		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			days.push(new Date(year, month, day));
		}

		return days;
	};

	const changeMonth = (direction: 'prev' | 'next') => {
		if (direction === 'prev') {
			currentMonth--;
			if (currentMonth < 0) {
				currentMonth = 11;
				currentYear--;
			}
		} else {
			currentMonth++;
			if (currentMonth > 11) {
				currentMonth = 0;
				currentYear++;
			}
		}
	};

	const selectDate = (date: Date) => {
		selectedDate = new Date(date);
		selectedDate;
	};

	const isToday = (date: Date) => {
		const today = new Date();
		return (
			date &&
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	};

	const isSelected = (date: Date) => {
		return (
			date &&
			date.getDate() === selectedDate.getDate() &&
			date.getMonth() === selectedDate.getMonth() &&
			date.getFullYear() === selectedDate.getFullYear()
		);
	};

	const monthName = $derived(
		formatDate(new Date(currentYear, currentMonth, 1), {
			month: 'short'
		})
	);

	const days = $derived(getDaysInMonth(currentMonth, currentYear));
	const weekdays = $derived(getWeekdays('short'));

	const formattedSelectedDate = $derived(
		formatDate(selectedDate, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	);

	const handleClickOutside = (event: Event) => {
		if (
			isOpen &&
			!controlElement?.contains(event.target as Node) &&
			!contentEl?.contains(event.target as Node)
		) {
			isOpen = false;
		}
	};

	const toggleDropdown = () => {
		if (!isOpen) {
			startEventListeners();
			updatePosition();
			isOpen = true;
		} else {
			stopEventListeners();
			isOpen = false;
		}
	};

	const updatePosition = () => {
		if (!controlElement || !contentEl) return;

		const rect = controlElement.getBoundingClientRect();
		const windowHeight = window.innerHeight;
		const contentHeight = contentEl.getBoundingClientRect().height;
		const isBottomHalf = rect.top + rect.height / 2 > windowHeight / 2;

		const top = isBottomHalf ? rect.top - contentHeight - 8 : rect.top + rect.height;
		position = {
			top: top,
			left: rect.left + window.scrollX,
			width: 'auto',
			isBottomHalf
		};
	};

	const startEventListeners = () => {
		window.addEventListener('resize', updatePosition);
		window.addEventListener('scroll', updatePosition, true);
		document.addEventListener('click', handleClickOutside);
	};

	const stopEventListeners = () => {
		window.removeEventListener('resize', updatePosition);
		window.removeEventListener('scroll', updatePosition, true);
		document.removeEventListener('click', handleClickOutside);
	};

	onMount(() => {
		return () => stopEventListeners();
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
		<div class="control-selected">
			{#if formattedSelectedDate}
				{formattedSelectedDate}
			{:else if isFloatLabel}
				{#if isActive || isOpen}
					{placeholder}
				{/if}
			{:else}
				{placeholder}
			{/if}
		</div>
	</button>

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-error')}>{errorText || helpText}</div>
	{/if}

	<div class:is-open={isOpen} class="date-popover" {style} bind:this={contentEl}>
		<div class="date-picker-header">
			<Button variant="ghost" onclick={() => changeMonth('prev')}>
				<Icon icon={ArrowLeft24RegularIcon} />
			</Button>

			<span>{monthName} {currentYear}</span>

			<Button variant="ghost" onclick={() => changeMonth('next')}>
				<Icon icon={ArrowRight24RegularIcon} />
			</Button>
		</div>
		<div class="date-picker-weekdays">
			{#each weekdays as weekday}
				<div class="weekday">{weekday}</div>
			{/each}
		</div>
		<div class="date-picker-days">
			{#each days as day}
				{#if day}
					<button
						class="date-picker-day-button"
						class:today={isToday(day)}
						class:selected={isSelected(day)}
						onclick={() => selectDate(day)}
						type="button"
					>
						{day.getDate()}
					</button>
				{:else}
					<div class="date-picker-empty-day"></div>
				{/if}
			{/each}
		</div>
	</div>
</div>
