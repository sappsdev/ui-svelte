<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { useScroll } from '$lib/hooks/use-scroll.svelte.js';
	import type { Snippet } from 'svelte';

	type Props = {
		start?: Snippet;
		center?: Snippet;
		end?: Snippet;
		class?: string;
		contentClass?: string;
		startClass?: string;
		centerClass?: string;
		endClass?: string;
		isBlurred?: boolean;
		isBordered?: boolean;
		hideOnScroll?: boolean;
	};

	const {
		start,
		center,
		end,
		class: className,
		contentClass,
		startClass,
		centerClass,
		endClass,
		isBordered,
		isBlurred,
		hideOnScroll
	}: Props = $props();

	let headerElement = $state<HTMLElement | null>(null);
	let headerHeight = $state<number>(0);
	let lastScrollY = $state<number>(0);
	let isHidden = $state<boolean>(false);

	const scroll = useScroll();

	$effect(() => {
		if (headerElement) {
			headerHeight = headerElement.offsetHeight;
			if (isBlurred) {
				scroll.setThreshold(headerHeight);
			}
		}
	});

	$effect(() => {
		if (hideOnScroll && scroll.scrollY > headerHeight) {
			if (scroll.scrollY > lastScrollY) {
				isHidden = true;
			} else if (scroll.scrollY < lastScrollY) {
				isHidden = false;
			}
			lastScrollY = scroll.scrollY;
		} else if (hideOnScroll) {
			isHidden = false;
			lastScrollY = scroll.scrollY;
		}
	});

	const shouldBlur = $derived(isBlurred && scroll.isScrolled);
</script>

<header
	bind:this={headerElement}
	class={cn(
		'appbar',
		isBordered && 'is-bordered',
		shouldBlur && 'is-blurred',
		isHidden && 'is-hidden',
		className
	)}
>
	<div class={cn('appbar-content', contentClass)}>
		{#if start}
			<div class={cn('appbar-start', startClass)}>
				{@render start()}
			</div>
		{/if}
		{#if center}
			<div class={cn('appbar-center', centerClass)}>
				{@render center()}
			</div>
		{/if}
		{#if end}
			<div class={cn('appbar-end', endClass)}>
				{@render end()}
			</div>
		{/if}
	</div>
</header>
