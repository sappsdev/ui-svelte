<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
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
			| 'outlined'
			| 'ghost';
		rootClass?: string;
		headerClass?: string;
		footerClass?: string;
		bodyClass?: string;
		coverClass?: string;
		overlayClass?: string;
		isSolid?: boolean;
		hasOverlay?: boolean;
	};

	const {
		children,
		header,
		footer,
		rootClass,
		cover,
		variant = 'outlined',
		headerClass,
		bodyClass,
		footerClass,
		coverClass,
		overlayClass,
		isSolid,
		hasOverlay
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
		outlined: 'is-outlined',
		ghost: 'is-ghost'
	};
</script>

<div class={cn('card', variantClasses[variant], isSolid && 'is-solid', rootClass)}>
	{#if cover}
		<img src={cover} alt="cover" class={cn('card-cover', coverClass)} />
	{/if}
	{#if hasOverlay}
		<div class={cn('card-overlay', overlayClass)}></div>
	{/if}
	{#if header}
		<div class={cn('card-header', headerClass)}>
			{@render header()}
		</div>
	{/if}
	<div class={cn('card-body', bodyClass)}>
		{@render children()}
	</div>
	{#if footer}
		<div class={cn('card-footer', footerClass)}>
			{@render footer()}
		</div>
	{/if}
</div>
