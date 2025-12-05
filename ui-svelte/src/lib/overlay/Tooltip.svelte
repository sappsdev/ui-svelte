<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		label: string;
		children: Snippet;
		variant?: 'primary' | 'secondary' | 'muted';
		position?: 'top' | 'bottom' | 'start' | 'end';
		isSolid?: boolean;
		class?: string;
	};

	let {
		label,
		children,
		variant = 'primary',
		position = 'top',
		isSolid = false,
		class: className
	}: Props = $props();

	let isOpen = $state(false);
	let triggerElement = $state<HTMLElement>();
	let tooltipElement = $state<HTMLElement>();
	let tooltipPosition = $state({
		top: 0,
		left: 0
	});

	const style = $derived(`top: ${tooltipPosition.top}px; left: ${tooltipPosition.left}px;`);

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted'
	};

	const positionClasses = {
		top: 'position-top',
		bottom: 'position-bottom',
		start: 'position-start',
		end: 'position-end'
	};

	const updatePosition = () => {
		if (!triggerElement || !tooltipElement) return;

		const triggerRect = triggerElement.getBoundingClientRect();
		const tooltipRect = tooltipElement.getBoundingClientRect();
		const gap = 8;

		let top = 0;
		let left = 0;

		switch (position) {
			case 'top':
				top = triggerRect.top - tooltipRect.height - gap;
				left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
				break;
			case 'bottom':
				top = triggerRect.bottom + gap;
				left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
				break;
			case 'start':
				top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
				left = triggerRect.left - tooltipRect.width - gap;
				break;
			case 'end':
				top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
				left = triggerRect.right + gap;
				break;
		}

		top += window.scrollY;
		left += window.scrollX;

		const padding = 8;
		if (left < padding) left = padding;
		if (left + tooltipRect.width > window.innerWidth - padding) {
			left = window.innerWidth - tooltipRect.width - padding;
		}
		if (top < padding) top = padding;
		if (top + tooltipRect.height > window.innerHeight + window.scrollY - padding) {
			top = window.innerHeight + window.scrollY - tooltipRect.height - padding;
		}

		tooltipPosition = { top, left };
	};

	const handleMouseEnter = () => {
		isOpen = true;
		setTimeout(updatePosition, 0);
	};

	const handleMouseLeave = () => {
		isOpen = false;
	};

	const startEventListeners = () => {
		window.addEventListener('resize', updatePosition);
		window.addEventListener('scroll', updatePosition, true);
	};

	const stopEventListeners = () => {
		window.removeEventListener('resize', updatePosition);
		window.removeEventListener('scroll', updatePosition, true);
	};

	onMount(() => {
		startEventListeners();
		return () => stopEventListeners();
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={cn('tooltip', className)}
	bind:this={triggerElement}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	{@render children()}

	<div
		bind:this={tooltipElement}
		class={cn(
			'tooltip-popover',
			variantClasses[variant],
			positionClasses[position],
			isSolid && 'is-solid',
			isOpen && 'is-active'
		)}
		{style}
	>
		<div class={cn('tooltip-arrow', variantClasses[variant], isSolid && 'is-solid')}></div>
		{label}
	</div>
</div>
