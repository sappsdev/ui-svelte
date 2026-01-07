<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { useScroll } from '$lib/hooks/use-scroll.svelte.js';
	import type { Snippet } from 'svelte';

	type Props = {
		start?: Snippet;
		center?: Snippet;
		end?: Snippet;
		rootClass?: string;
		contentClass?: string;
		startClass?: string;
		centerClass?: string;
		endClass?: string;
		color?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'success'
			| 'info'
			| 'warning'
			| 'danger'
			| 'surface'
			| 'background';
		variant?: 'solid' | 'soft';
		isBlurred?: boolean;
		isBordered?: boolean;
		isBoxed?: boolean;
		hideOnScroll?: boolean;
	};

	const {
		start,
		center,
		end,
		rootClass,
		contentClass,
		startClass,
		centerClass,
		endClass,
		color = 'surface',
		variant = 'solid',
		isBordered,
		isBlurred,
		isBoxed,
		hideOnScroll
	}: Props = $props();

	let footerElement = $state<HTMLElement | null>(null);
	let footerHeight = $state<number>(0);
	let lastScrollY = $state<number>(0);
	let isHidden = $state<boolean>(false);

	const scroll = useScroll();

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger',
		surface: 'is-surface',
		background: 'is-background'
	};

	const variants = {
		solid: 'is-solid',
		soft: 'is-soft'
	};

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
		colors[color],
		variants[variant],
		isBordered && 'is-bordered',
		shouldBlur && 'is-blurred',
		isHidden && 'is-hidden',
		rootClass
	)}
>
	<div class={cn('footer-content', isBoxed && 'boxed', contentClass)}>
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
