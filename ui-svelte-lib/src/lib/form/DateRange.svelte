<script lang="ts">
	import { ArrowLeft24RegularIcon, ArrowRight24RegularIcon } from '$lib/icons/index.js';
	import { formatDate, getWeekdays, IconButton } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';

	type Props = {
		startDate?: Date | null;
		endDate?: Date | null;
		placeholder?: string;
		onchange?: (range: { start: Date | null; end: Date | null }) => void;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft' | 'outlined' | 'line';
		size?: 'sm' | 'md' | 'lg';
		name?: string;
		class?: string;
		label?: string;
		isLabelActive?: boolean;
		helpText?: string;
		errorText?: string;
		isFloatLabel?: boolean;
		minDate?: Date | null;
		maxDate?: Date | null;
	};

	let {
		startDate = $bindable(null),
		endDate = $bindable(null),
		placeholder = 'Select date range',
		onchange,
		variant = 'outlined',
		color = 'primary',
		size = 'md',
		name,
		label,
		isLabelActive,
		helpText,
		errorText,
		class: className,
		isFloatLabel,
		minDate = null,
		maxDate = null
	}: Props = $props();

	let currentViewDate = $state<Date>(startDate ? new Date(startDate) : new Date());
	let currentMonth = $derived(currentViewDate.getMonth());
	let currentYear = $derived(currentViewDate.getFullYear());
	let contentEl = $state<HTMLDivElement>();
	let controlElement = $state<HTMLElement>();

	let isOpen = $state(false);
	let hoverDate = $state<Date | null>(null);
	let selectionMode = $state<'start' | 'end'>('start');

	let isActive = $state(false);
	let isFocused = $state(false);

	let position = $state({
		top: 0,
		left: 0,
		width: 'auto',
		isBottomHalf: false
	});

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
		solid: 'is-solid',
		soft: 'is-soft',
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

	const nextMonth = $derived((currentMonth + 1) % 12);
	const nextMonthYear = $derived(currentMonth === 11 ? currentYear + 1 : currentYear);

	const getDaysInMonth = (month: number, year: number) => {
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days: (Date | null)[] = [];

		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			days.push(new Date(year, month, day));
		}

		return days;
	};

	const changeMonth = (direction: 'prev' | 'next') => {
		const newDate = new Date(currentViewDate);
		if (direction === 'prev') {
			newDate.setMonth(newDate.getMonth() - 1);
		} else {
			newDate.setMonth(newDate.getMonth() + 1);
		}
		currentViewDate = newDate;
	};

	const selectDate = (date: Date) => {
		if (selectionMode === 'start') {
			startDate = new Date(date);
			endDate = null;
			selectionMode = 'end';
		} else {
			if (startDate && date < startDate) {
				endDate = new Date(startDate);
				startDate = new Date(date);
			} else {
				endDate = new Date(date);
			}
			selectionMode = 'start';
			onchange?.({ start: startDate, end: endDate });
		}
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

	const isStartDate = (date: Date) => {
		return (
			startDate &&
			date &&
			date.getDate() === startDate.getDate() &&
			date.getMonth() === startDate.getMonth() &&
			date.getFullYear() === startDate.getFullYear()
		);
	};

	const isEndDate = (date: Date) => {
		return (
			endDate &&
			date &&
			date.getDate() === endDate.getDate() &&
			date.getMonth() === endDate.getMonth() &&
			date.getFullYear() === endDate.getFullYear()
		);
	};

	const isInRange = (date: Date) => {
		if (!date || !startDate) return false;

		const effectiveEnd = endDate ?? hoverDate;
		if (!effectiveEnd) return false;

		const start = startDate < effectiveEnd ? startDate : effectiveEnd;
		const end = startDate < effectiveEnd ? effectiveEnd : startDate;

		return date > start && date < end;
	};

	const isDisabled = (date: Date) => {
		if (!date) return false;
		if (minDate && date < minDate) return true;
		if (maxDate && date > maxDate) return true;
		return false;
	};

	const monthNameLeft = $derived(
		formatDate(new Date(currentYear, currentMonth, 1), {
			month: 'short'
		})
	);

	const monthNameRight = $derived(
		formatDate(new Date(nextMonthYear, nextMonth, 1), {
			month: 'short'
		})
	);

	const daysLeft = $derived(getDaysInMonth(currentMonth, currentYear));
	const daysRight = $derived(getDaysInMonth(nextMonth, nextMonthYear));
	const weekdays = $derived(getWeekdays('narrow'));

	const formattedRange = $derived.by(() => {
		if (!startDate && !endDate) return '';

		const formatOptions = {
			year: 'numeric' as const,
			month: 'short' as const,
			day: 'numeric' as const
		};

		const startStr = startDate ? formatDate(startDate, formatOptions) : '';
		const endStr = endDate ? formatDate(endDate, formatOptions) : '';

		if (startStr && endStr) {
			return `${startStr} - ${endStr}`;
		}
		return startStr || endStr;
	});

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
	<input type="text" {name} value={formattedRange} hidden />

	{#if !isFloatLabel && label}
		<div class="field-label">{label}</div>
	{/if}

	<button
		type="button"
		bind:this={controlElement}
		class={cn(
			'control',
			colors[color],
			variants[variant],
			sizeClasses[size],
			isFloatLabel && 'is-float',
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
					(isActive || isFocused || isLabelActive || isOpen || formattedRange !== '') && 'is-active'
				)}
			>
				{label}
			</span>
		{/if}
		<div class="control-selected">
			{#if formattedRange}
				{formattedRange}
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

	<div class:is-active={isOpen} class="date-range-popover" {style} bind:this={contentEl}>
		<div class="date-range-calendars">
			<div class="date-range-calendar">
				<div class="date-picker-header">
					<IconButton
						onclick={() => changeMonth('prev')}
						icon={ArrowLeft24RegularIcon}
						{color}
						variant="ghost"
						size="sm"
					/>

					<span>{monthNameLeft} {currentYear}</span>

					<div class="date-range-spacer"></div>
				</div>
				<div class="date-picker-weekdays">
					{#each weekdays as weekday}
						<div class="weekday">{weekday}</div>
					{/each}
				</div>
				<div class="date-picker-days">
					{#each daysLeft as day}
						{#if day}
							<button
								class={cn('date-range-day-button', colors[color])}
								class:today={isToday(day)}
								class:is-start={isStartDate(day)}
								class:is-end={isEndDate(day)}
								class:is-in-range={isInRange(day)}
								class:is-disabled={isDisabled(day)}
								disabled={isDisabled(day)}
								onclick={() => selectDate(day)}
								onmouseenter={() => (hoverDate = day)}
								onmouseleave={() => (hoverDate = null)}
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

			<div class="date-range-calendar">
				<div class="date-picker-header">
					<div class="date-range-spacer"></div>

					<span>{monthNameRight} {nextMonthYear}</span>

					<IconButton
						onclick={() => changeMonth('next')}
						icon={ArrowRight24RegularIcon}
						{color}
						variant="ghost"
						size="sm"
					/>
				</div>
				<div class="date-picker-weekdays">
					{#each weekdays as weekday}
						<div class="weekday">{weekday}</div>
					{/each}
				</div>
				<div class="date-picker-days">
					{#each daysRight as day}
						{#if day}
							<button
								class={cn('date-range-day-button', colors[color])}
								class:today={isToday(day)}
								class:is-start={isStartDate(day)}
								class:is-end={isEndDate(day)}
								class:is-in-range={isInRange(day)}
								class:is-disabled={isDisabled(day)}
								disabled={isDisabled(day)}
								onclick={() => selectDate(day)}
								onmouseenter={() => (hoverDate = day)}
								onmouseleave={() => (hoverDate = null)}
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

		{#if startDate || endDate}
			<div class="date-range-footer">
				<span class="date-range-selection">
					{#if startDate && !endDate}
						{formatDate(startDate, { month: 'short', day: 'numeric', year: 'numeric' })} - Select end
						date
					{:else if startDate && endDate}
						{formatDate(startDate, { month: 'short', day: 'numeric', year: 'numeric' })} - {formatDate(
							endDate,
							{ month: 'short', day: 'numeric', year: 'numeric' }
						)}
					{/if}
				</span>
			</div>
		{/if}
	</div>
</div>
