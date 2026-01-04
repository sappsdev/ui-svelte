<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		rootClass?: string;
		bodyClass?: string;
		coverClass?: string;
		overlayClass?: string;
		children: Snippet;
		cover?: string;
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
		variant?: 'solid' | 'soft' | 'ghost';
		id?: string;
		isBoxed?: boolean;
	};

	let {
		rootClass,
		bodyClass,
		coverClass,
		overlayClass,
		cover,
		color = 'background',
		variant = 'solid',
		children,
		id,
		isBoxed
	}: Props = $props();

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning',
		surface: 'is-surface',
		background: 'is-background'
	};

	const variants = {
		solid: 'is-solid',
		soft: 'is-soft',
		ghost: 'is-ghost'
	};
</script>

<section {id} class={cn('section', variants[variant], colors[color], rootClass)}>
	{#if cover}
		<img src={cover} alt="cover" class={cn('section-cover', coverClass)} />
		<div class={cn('section-overlay', overlayClass)}></div>
	{/if}
	<div class={cn('section-body', isBoxed && 'boxed', bodyClass)}>
		{@render children()}
	</div>
</section>
