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

	let footerElement = $state<HTMLElement | null>(null);
	let footerHeight = $state<number>(0);
	let lastScrollY = $state<number>(0);
	let isHidden = $state<boolean>(false);

	const scroll = useScroll();

	$effect(() => {
		if (footerElement) {
			footerHeight = footerElement.offsetHeight;
			if (isBlurred) {
				scroll.setThreshold(footerHeight);
			}
		}
	});

	$effect(() => {
		if (hideOnScroll && scroll.scrollY > footerHeight) {
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

<footer
	bind:this={footerElement}
	class={cn(
		'footer',
		isBordered && 'is-bordered',
		shouldBlur && 'is-blurred',
		isHidden && 'is-hidden',
		className
	)}
>
	<div class={cn('footer-content', contentClass)}>
		{#if start}
			<div class={cn('footer-start', startClass)}>
				{@render start()}
			</div>
		{/if}
		{#if center}
			<div class={cn('footer-center', centerClass)}>
				{@render center()}
			</div>
		{/if}
		{#if end}
			<div class={cn('footer-end', endClass)}>
				{@render end()}
			</div>
		{/if}
	</div>
</footer>
