<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		bodyClass?: string;
		coverClass?: string;
		overlayClass?: string;
		children: Snippet;
		cover?: string;
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
		isSolid?: boolean;
		isBoxed?: boolean;
		hasOverlay?: boolean;
	};

	const {
		class: className,
		bodyClass,
		coverClass,
		overlayClass,
		cover,
		hasOverlay,
		variant = 'ghost',
		isSolid,
		children,
		isBoxed
	}: Props = $props();

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
</script>

<div class={cn('section', variantClasses[variant], isSolid && 'is-solid', className)}>
	{#if cover}
		<img src={cover} alt="cover" class={cn('section-cover', coverClass)} />
	{/if}
	{#if hasOverlay}
		<div class={cn('section-overlay', overlayClass)}></div>
	{/if}
	<div class={cn('section-body', isBoxed && 'boxed', bodyClass)}>
		{@render children()}
	</div>
</div>
