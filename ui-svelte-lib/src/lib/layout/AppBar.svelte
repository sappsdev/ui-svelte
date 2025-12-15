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
		isBlurred?: boolean;
		isBordered?: boolean;
		borderOnScrollOnly?: boolean;
		hideOnScroll?: boolean;
		solidOnScroll?: boolean;
		isSticky?: boolean;
		isBoxed?: boolean;
		variant?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'success'
			| 'info'
			| 'warning'
			| 'danger'
			| 'surface'
			| 'ghost';
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
		isBordered,
		borderOnScrollOnly = false,
		isBlurred,
		isSticky,
		isBoxed,
		variant = 'ghost',
		hideOnScroll,
		solidOnScroll = false
	}: Props = $props();

	let headerElement = $state<HTMLElement | null>(null);
	let headerHeight = $state<number>(0);
	let lastScrollY = $state<number>(0);
	let isHidden = $state<boolean>(false);

	const scroll = useScroll();

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger',
		surface: 'is-surface',
		ghost: 'is-ghost'
	};

	$effect(() => {
		if (headerElement) {
			headerHeight = headerElement.offsetHeight;
			if (isBlurred) {
				scroll.setThreshold(headerHeight);
			}
		}
	});

	$effect(() => {
		if (!hideOnScroll) {
			return;
		}

		if (scroll.scrollY > headerHeight) {
			if (scroll.scrollY > lastScrollY) {
				isHidden = true;
			} else if (scroll.scrollY < lastScrollY) {
				isHidden = false;
			}
			lastScrollY = scroll.scrollY;
		} else {
			isHidden = false;
			lastScrollY = scroll.scrollY;
		}
	});

	const shouldBlur = $derived(isBlurred && scroll.isScrolled);
	const shouldShowBorder = $derived(isBordered && (!borderOnScrollOnly || scroll.isScrolled));
	const isTransparent = $derived(solidOnScroll && !scroll.isScrolled);
</script>

<header
	bind:this={headerElement}
	class={cn(
		'appbar',
		variantClasses[variant],
		shouldShowBorder && 'is-bordered',
		shouldBlur && 'is-blurred',
		isHidden && 'is-hidden',
		isTransparent && 'is-transparent',
		isSticky && 'is-sticky',
		rootClass
	)}
>
	<div class={cn('appbar-content', isBoxed && 'boxed', contentClass)}>
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
