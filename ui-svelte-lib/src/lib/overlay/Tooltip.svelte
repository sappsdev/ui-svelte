<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		label: string;
		children: Snippet;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft';
		position?: 'top' | 'bottom' | 'start' | 'end';
		class?: string;
	};

	let {
		label,
		children,
		color = 'primary',
		variant = 'soft',
		position = 'top',
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
		soft: 'is-soft'
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

		const padding = 8;
		if (left < padding) left = padding;
		if (left + tooltipRect.width > window.innerWidth - padding) {
			left = window.innerWidth - tooltipRect.width - padding;
		}
		if (top < padding) top = padding;
		if (top + tooltipRect.height > window.innerHeight - padding) {
			top = window.innerHeight - tooltipRect.height - padding;
		}

		tooltipPosition = { top, left };
	};

	const handleMouseEnter = () => {
		startEventListeners();
		isOpen = true;
		requestAnimationFrame(() => {
			updatePosition();
		});
	};

	const handleMouseLeave = () => {
		stopEventListeners();
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
</div>

<div
	bind:this={tooltipElement}
	class={cn(
		'tooltip-popover',
		colors[color],
		variants[variant],
		positionClasses[position],
		isOpen && 'is-active'
	)}
	{style}
>
	<div class="tooltip-arrow"></div>
	{label}
</div>
