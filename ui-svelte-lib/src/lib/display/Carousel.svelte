<script lang="ts">
	import {
		ArrowDown24RegularIcon,
		ArrowLeft24RegularIcon,
		ArrowRight24RegularIcon,
		ArrowUp24RegularIcon
	} from '$lib/icons/index.js';
	import { IconButton } from '$lib/index.js';
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
		disableLoop?: boolean;
		hideControls?: boolean;
		hideIndicators?: boolean;
		showNavigation?: boolean;
		showCounter?: boolean;
		orientation?: 'horizontal' | 'vertical';
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'warning' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		indicatorType?: 'bar' | 'dot';
		rootClass?: string;
		slideClass?: string;
		onSlideChange?: (index: number) => void;
		title?: string | Snippet;
		slideWidth?: number;
		slideHeight?: number;
		slidesPerView?: number;
		gap?: number;
	};

	const {
		rootClass,
		slideClass,
		slides = [],
		autoplay = false,
		autoplayInterval = 3000,
		disableLoop = false,
		hideControls = false,
		hideIndicators = false,
		showNavigation = false,
		showCounter = false,
		orientation = 'horizontal',
		color = 'primary',
		size = 'md',
		indicatorType = 'bar',
		onSlideChange,
		title,
		slideWidth: slideWidthProp,
		slideHeight: slideHeightProp,
		slidesPerView: slidesPerViewProp,
		gap = 0
	}: Props = $props();

	let currentIndex = $state(0);
	let containerEl = $state<HTMLElement>();
	let viewportEl = $state<HTMLElement>();
	let isDragging = $state(false);
	let startPos = $state(0);
	let currentTranslate = $state(0);
	let prevTranslate = $state(0);
	let autoplayTimer: ReturnType<typeof setTimeout> | null = $state(null);
	let computedSlideWidth = $state(0);
	let computedSlideHeight = $state(0);
	let computedSlidesPerView = $state(1);

	const isVertical = $derived(orientation === 'vertical');
	const maxIndex = $derived(Math.max(0, slides.length - Math.floor(computedSlidesPerView)));
	const canGoPrev = $derived(!disableLoop || currentIndex > 0);
	const canGoNext = $derived(!disableLoop || currentIndex < maxIndex);

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const colorClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger'
	};

	const updateTransform = () => {
		if (!containerEl || !viewportEl) return;

		const slideElements = containerEl.querySelectorAll('.carousel-slide');

		if (isVertical) {
			let slideHeight: number;

			if (slideHeightProp) {
				slideHeight = slideHeightProp;
			} else {
				const firstSlide = slideElements[0] as HTMLElement;
				slideHeight = firstSlide?.offsetHeight || 200;
			}

			computedSlideHeight = slideHeight;
			computedSlidesPerView = 1;

			viewportEl.style.height = `${slideHeight}px`;

			slideElements.forEach((el) => {
				(el as HTMLElement).style.height = `${slideHeight}px`;
				(el as HTMLElement).style.width = '100%';
			});

			const offset = -currentIndex * (slideHeight + gap);
			containerEl.style.transform = `translateY(${offset}px)`;
		} else {
			const viewportWidth = viewportEl.offsetWidth;
			let slideWidth: number;

			if (slidesPerViewProp && slidesPerViewProp > 1) {
				const totalGap = (slidesPerViewProp - 1) * gap;
				slideWidth = (viewportWidth - totalGap) / slidesPerViewProp;
				computedSlidesPerView = slidesPerViewProp;
			} else if (slideWidthProp) {
				slideWidth = slideWidthProp;
				computedSlidesPerView = viewportWidth / (slideWidth + gap);
			} else {
				slideWidth = viewportWidth;
				computedSlidesPerView = 1;
			}

			computedSlideWidth = slideWidth;

			viewportEl.style.height = '';

			slideElements.forEach((el) => {
				(el as HTMLElement).style.width = `${slideWidth}px`;
				(el as HTMLElement).style.height = '';
			});

			const offset = -currentIndex * (slideWidth + gap);
			containerEl.style.transform = `translateX(${offset}px)`;
		}
	};

	const goToSlide = (index: number) => {
		if (index < 0 || index > maxIndex) return;
		currentIndex = index;
		updateTransform();
		onSlideChange?.(index);
		resetAutoplay();
	};

	const goToSlideInstant = (index: number) => {
		if (index < 0 || index > maxIndex) return;
		if (containerEl) {
			containerEl.style.transition = 'none';
		}
		currentIndex = index;
		updateTransform();
		onSlideChange?.(index);
		requestAnimationFrame(() => {
			if (containerEl) {
				containerEl.style.transition = '';
			}
		});
		resetAutoplay();
	};

	const goToPrev = () => {
		if (!canGoPrev) return;
		if (currentIndex === 0) {
			goToSlideInstant(maxIndex);
		} else {
			goToSlide(currentIndex - 1);
		}
	};

	const goToNext = () => {
		if (!canGoNext) return;
		if (currentIndex === maxIndex) {
			goToSlideInstant(0);
		} else {
			goToSlide(currentIndex + 1);
		}
	};

	const startAutoplay = () => {
		if (!autoplay) return;
		autoplayTimer = setInterval(() => {
			if (!disableLoop || currentIndex < slides.length - 1) {
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

		if (isVertical) {
			const slideHeight = computedSlideHeight || slideHeightProp || 200;
			const baseOffset = -currentIndex * (slideHeight + gap);
			containerEl.style.transform = `translateY(${baseOffset + diff}px)`;
		} else if (slideWidthProp) {
			const slideWidth = computedSlideWidth || slideWidthProp;
			const baseOffset = -currentIndex * (slideWidth + gap);
			containerEl.style.transform = `translateX(${baseOffset + diff}px)`;
		} else {
			containerEl.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diff}px))`;
		}
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

	const handleResize = () => {
		updateTransform();
	};

	onMount(() => {
		tick();
		updateTransform();

		if (autoplay) {
			startAutoplay();
		}

		window.addEventListener('resize', handleResize);
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			stopAutoplay();
			window.removeEventListener('resize', handleResize);
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

<div class={cn('carousel', isVertical && 'is-vertical', rootClass)}>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="carousel-viewport"
		bind:this={viewportEl}
		class:is-dragging={isDragging}
		onmousedown={handleMouseDown}
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
		style="--slides-per-view: {computedSlidesPerView}; --gap: {gap}px;"
	>
		{#if title}
			<div class="carousel-header">
				<div class="carousel-title">
					{#if typeof title === 'string'}
						<h2>{title}</h2>
					{:else}
						{@render title()}
					{/if}
				</div>
				<div class="carousel-header-controls">
					<IconButton
						onclick={goToPrev}
						isDisabled={!canGoPrev}
						icon={isVertical ? ArrowUp24RegularIcon : ArrowLeft24RegularIcon}
						{color}
						variant="ghost"
						size="sm"
					/>
					<IconButton
						onclick={goToNext}
						isDisabled={!canGoNext}
						icon={isVertical ? ArrowDown24RegularIcon : ArrowRight24RegularIcon}
						{color}
						variant="ghost"
						size="sm"
					/>
				</div>
			</div>
		{/if}

		<div
			class={cn('carousel-container', isDragging && 'is-dragging', isVertical && 'is-vertical')}
			bind:this={containerEl}
			style="gap: {gap}px;"
		>
			{#each slides as slide (slide.id)}
				<div class={cn('carousel-slide', slideClass)}>
					{@render slide.content()}
				</div>
			{/each}
		</div>

		{#if showNavigation}
			<IconButton
				class={cn('carousel-nav is-prev', sizeClasses[size])}
				onclick={goToPrev}
				isDisabled={!canGoPrev}
				icon={isVertical ? ArrowUp24RegularIcon : ArrowLeft24RegularIcon}
				{color}
				variant="overlay"
				{size}
			/>
			<IconButton
				class={cn('carousel-nav is-next', sizeClasses[size])}
				onclick={goToNext}
				isDisabled={!canGoNext}
				icon={isVertical ? ArrowDown24RegularIcon : ArrowRight24RegularIcon}
				{color}
				variant="overlay"
				{size}
			/>
		{/if}
	</div>

	{#if !hideControls || !hideIndicators || showCounter}
		<div class={cn('carousel-controls', isVertical && 'is-vertical')}>
			{#if !hideControls}
				<IconButton
					isDisabled={!canGoPrev}
					onclick={goToPrev}
					icon={isVertical ? ArrowUp24RegularIcon : ArrowLeft24RegularIcon}
					{color}
					variant="ghost"
					{size}
				/>
			{/if}

			{#if !hideIndicators}
				<div class={cn('carousel-indicators', isVertical && 'is-vertical')}>
					{#each slides as slide, index (slide.id)}
						<button
							type="button"
							class={cn(
								'carousel-indicator',
								sizeClasses[size],
								colorClasses[color],
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

			{#if !hideControls}
				<IconButton
					isDisabled={!canGoNext}
					onclick={goToNext}
					icon={isVertical ? ArrowDown24RegularIcon : ArrowRight24RegularIcon}
					{color}
					variant="ghost"
					{size}
				/>
			{/if}
		</div>
	{/if}
</div>
