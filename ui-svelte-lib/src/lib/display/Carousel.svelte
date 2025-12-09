<script lang="ts">
	import {
		ArrowDown24RegularIcon,
		ArrowLeft24RegularIcon,
		ArrowRight24RegularIcon,
		ArrowUp24RegularIcon
	} from '$lib/icons/index.js';
	import { Button, Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import { onMount, tick } from 'svelte';

	type Slide = {
		id: string | number;
		content: Snippet;
	};

	type Props = {
		slides: Slide[];
		autoplay?: boolean;
		autoplayInterval?: number;
		loop?: boolean;
		showControls?: boolean;
		showIndicators?: boolean;
		showNavigation?: boolean;
		showCounter?: boolean;
		orientation?: 'horizontal' | 'vertical';
		variant?: 'primary' | 'secondary' | 'muted' | 'default';
		size?: 'sm' | 'md' | 'lg';
		indicatorType?: 'bar' | 'dot';
		class?: string;
		slideClass?: string;
		onSlideChange?: (index: number) => void;
	};

	const {
		class: className,
		slideClass,
		slides = [],
		autoplay = false,
		autoplayInterval = 3000,
		loop = true,
		showControls = true,
		showIndicators = true,
		showNavigation = false,
		showCounter = false,
		orientation = 'horizontal',
		variant = 'default',
		size = 'md',
		indicatorType = 'bar',
		onSlideChange
	}: Props = $props();

	let currentIndex = $state(0);
	let containerEl = $state<HTMLElement>();
	let viewportEl = $state<HTMLElement>();
	let isDragging = $state(false);
	let startPos = $state(0);
	let currentTranslate = $state(0);
	let prevTranslate = $state(0);
	let autoplayTimer: ReturnType<typeof setTimeout> | null = $state(null);

	const isVertical = $derived(orientation === 'vertical');
	const canGoPrev = $derived(loop || currentIndex > 0);
	const canGoNext = $derived(loop || currentIndex < slides.length - 1);

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const updateTransform = () => {
		if (!containerEl) return;
		const offset = -currentIndex * 100;
		const property = isVertical ? 'translateY' : 'translateX';
		containerEl.style.transform = `${property}(${offset}%)`;
	};

	const goToSlide = (index: number) => {
		if (index < 0 || index >= slides.length) return;
		currentIndex = index;
		updateTransform();
		onSlideChange?.(index);
		resetAutoplay();
	};

	const goToPrev = () => {
		if (!canGoPrev) return;
		const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
		goToSlide(newIndex);
	};

	const goToNext = () => {
		if (!canGoNext) return;
		const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
		goToSlide(newIndex);
	};

	const startAutoplay = () => {
		if (!autoplay) return;
		autoplayTimer = setInterval(() => {
			if (loop || currentIndex < slides.length - 1) {
				goToNext();
			} else {
				stopAutoplay();
			}
		}, autoplayInterval);
	};

	const stopAutoplay = () => {
		if (autoplayTimer) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
	};

	const resetAutoplay = () => {
		stopAutoplay();
		startAutoplay();
	};

	const handleDragStart = (event: MouseEvent | TouchEvent) => {
		isDragging = true;
		stopAutoplay();

		if (event instanceof MouseEvent) {
			startPos = isVertical ? event.clientY : event.clientX;
		} else {
			startPos = isVertical ? event.touches[0].clientY : event.touches[0].clientX;
		}

		if (containerEl) {
			containerEl.classList.add('is-dragging');
		}
	};

	const handleDragMove = (event: MouseEvent | TouchEvent) => {
		if (!isDragging || !containerEl || !viewportEl) return;

		const currentPos =
			event instanceof MouseEvent
				? isVertical
					? event.clientY
					: event.clientX
				: isVertical
					? event.touches[0].clientY
					: event.touches[0].clientX;

		const diff = currentPos - startPos;
		const viewportSize = isVertical ? viewportEl.offsetHeight : viewportEl.offsetWidth;
		const percentageMoved = (diff / viewportSize) * 100;

		currentTranslate = prevTranslate + percentageMoved;

		const property = isVertical ? 'translateY' : 'translateX';
		containerEl.style.transform = `${property}(calc(-${currentIndex * 100}% + ${diff}px))`;
	};

	const handleDragEnd = () => {
		if (!isDragging) return;
		isDragging = false;

		if (containerEl) {
			containerEl.classList.remove('is-dragging');
		}

		const movedBy = currentTranslate - prevTranslate;
		const threshold = 15;

		if (movedBy < -threshold && canGoNext) {
			goToNext();
		} else if (movedBy > threshold && canGoPrev) {
			goToPrev();
		} else {
			updateTransform();
		}

		currentTranslate = 0;
		prevTranslate = 0;

		resetAutoplay();
	};

	const handleMouseDown = (event: MouseEvent) => {
		event.preventDefault();
		handleDragStart(event);
	};

	const handleMouseMove = (event: MouseEvent) => {
		handleDragMove(event);
	};

	const handleMouseUp = () => {
		handleDragEnd();
	};

	const handleTouchStart = (event: TouchEvent) => {
		handleDragStart(event);
	};

	const handleTouchMove = (event: TouchEvent) => {
		handleDragMove(event);
	};

	const handleTouchEnd = () => {
		handleDragEnd();
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'ArrowLeft':
			case 'ArrowUp':
				event.preventDefault();
				goToPrev();
				break;
			case 'ArrowRight':
			case 'ArrowDown':
				event.preventDefault();
				goToNext();
				break;
		}
	};

	onMount(() => {
		tick();
		updateTransform();

		if (autoplay) {
			startAutoplay();
		}

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			stopAutoplay();
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	$effect(() => {
		if (containerEl) {
			updateTransform();
		}
	});

	$effect(() => {
		slides;
		if (containerEl) {
			updateTransform();
		}
	});
</script>

<div class={cn('carousel', isVertical && 'is-vertical', className)}>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="carousel-viewport"
		bind:this={viewportEl}
		class:is-dragging={isDragging}
		onmousedown={handleMouseDown}
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
	>
		<div
			class={cn('carousel-container', isDragging && 'is-dragging', isVertical && 'is-vertical')}
			bind:this={containerEl}
		>
			{#each slides as slide (slide.id)}
				<div class={cn('carousel-slide', slideClass)}>
					{@render slide.content()}
				</div>
			{/each}
		</div>

		{#if showNavigation}
			<button
				type="button"
				class={cn('carousel-nav is-prev', sizeClasses[size])}
				onclick={goToPrev}
				disabled={!canGoPrev}
				aria-label="Previous slide"
			>
				{#if isVertical}
					<Icon icon={ArrowUp24RegularIcon} />
				{:else}
					<Icon icon={ArrowLeft24RegularIcon} />
				{/if}
			</button>

			<button
				type="button"
				class={cn('carousel-nav is-next', sizeClasses[size])}
				onclick={goToNext}
				disabled={!canGoNext}
				aria-label="Next slide"
			>
				{#if isVertical}
					<Icon icon={ArrowDown24RegularIcon} />
				{:else}
					<Icon icon={ArrowRight24RegularIcon} />
				{/if}
			</button>
		{/if}
	</div>

	{#if showControls || showIndicators || showCounter}
		<div class={cn('carousel-controls', isVertical && 'is-vertical')}>
			{#if showControls}
				<Button isDisabled={!canGoPrev} onclick={goToPrev} variant="ghost">
					{#if isVertical}
						<Icon icon={ArrowUp24RegularIcon} />
					{:else}
						<Icon icon={ArrowLeft24RegularIcon} />
					{/if}
				</Button>
			{/if}

			{#if showIndicators}
				<div class={cn('carousel-indicators', isVertical && 'is-vertical')}>
					{#each slides as slide, index (slide.id)}
						<button
							type="button"
							class={cn(
								'carousel-indicator',
								sizeClasses[size],
								currentIndex === index && 'is-active',
								indicatorType === 'dot' && 'is-dot'
							)}
							onclick={() => goToSlide(index)}
							aria-label={`Go to slide ${index + 1}`}
						></button>
					{/each}
				</div>
			{/if}

			{#if showCounter}
				<div class="carousel-counter">
					{currentIndex + 1} / {slides.length}
				</div>
			{/if}

			{#if showControls}
				<Button isDisabled={!canGoNext} onclick={goToNext} variant="ghost">
					{#if isVertical}
						<Icon icon={ArrowDown24RegularIcon} />
					{:else}
						<Icon icon={ArrowRight24RegularIcon} />
					{/if}
				</Button>
			{/if}
		</div>
	{/if}
</div>
