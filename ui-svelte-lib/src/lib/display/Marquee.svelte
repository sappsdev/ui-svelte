<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import { onMount, tick } from 'svelte';

	type MarqueeItem = {
		id: string | number;
		content: Snippet;
	};

	type Props = {
		items?: MarqueeItem[];
		speed?: 'slow' | 'normal' | 'fast';
		pauseOnHover?: boolean;
		reverse?: boolean;
		orientation?: 'horizontal' | 'vertical';
		fade?: boolean;
		fadeColor?: string;
		gap?: string;
		class?: string;
		itemClass?: string;
		children?: Snippet;
	};

	const {
		class: className,
		itemClass,
		items = [],
		speed = 'normal',
		pauseOnHover = false,
		reverse = false,
		orientation = 'horizontal',
		fade = false,
		fadeColor = 'white',
		gap = '0',
		children
	}: Props = $props();

	let containerEl = $state<HTMLElement>();
	let viewportEl = $state<HTMLElement>();
	let contentEl = $state<HTMLElement>();
	let isPaused = $state(false);
	let shouldAnimate = $state(false);

	const isVertical = $derived(orientation === 'vertical');

	const speedClasses = {
		slow: 'is-slow',
		normal: 'is-normal',
		fast: 'is-fast'
	};

	const checkOverflow = () => {
		if (!contentEl || !viewportEl) return;

		if (isVertical) {
			shouldAnimate = contentEl.scrollHeight > viewportEl.clientHeight;
		} else {
			shouldAnimate = contentEl.scrollWidth > viewportEl.clientWidth;
		}
	};

	const handleMouseEnter = () => {
		if (pauseOnHover) {
			isPaused = true;
		}
	};

	const handleMouseLeave = () => {
		if (pauseOnHover) {
			isPaused = false;
		}
	};

	onMount(() => {
		tick().then(() => {
			checkOverflow();
		});

		// Observer para detectar cambios en el tamaño
		const resizeObserver = new ResizeObserver(() => {
			checkOverflow();
		});

		if (viewportEl) {
			resizeObserver.observe(viewportEl);
		}

		return () => {
			resizeObserver.disconnect();
		};
	});

	$effect(() => {
		items;
		tick().then(() => {
			checkOverflow();
		});
	});

	$effect(() => {
		if (containerEl && fadeColor) {
			containerEl.style.setProperty('--fade-color', fadeColor);
		}
	});
</script>

<div
	class={cn('marquee', isVertical && 'is-vertical', fade && 'has-fade', className)}
	bind:this={containerEl}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	role="region"
	aria-label="Scrolling content"
>
	<div class={cn('marquee-viewport', isVertical && 'is-vertical')} bind:this={viewportEl}>
		<div
			class={cn(
				'marquee-container',
				speedClasses[speed],
				shouldAnimate && 'is-animating',
				isPaused && 'is-paused',
				reverse && 'is-reverse',
				isVertical && 'is-vertical'
			)}
			style="gap: {gap};"
		>
			<div
				class={cn('marquee-content', isVertical && 'is-vertical')}
				bind:this={contentEl}
				style="gap: {gap};"
			>
				{#if children}
					{@render children()}
				{:else}
					{#each items as item (item.id)}
						<div class={cn('marquee-item', itemClass)}>
							{@render item.content()}
						</div>
					{/each}
				{/if}
			</div>

			{#if shouldAnimate}
				<!-- Duplicado para el efecto infinito -->
				<div
					class={cn('marquee-content', isVertical && 'is-vertical')}
					aria-hidden="true"
					style="gap: {gap};"
				>
					{#if children}
						{@render children()}
					{:else}
						{#each items as item (`${item.id}-duplicate`)}
							<div class={cn('marquee-item', itemClass)}>
								{@render item.content()}
							</div>
						{/each}
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
