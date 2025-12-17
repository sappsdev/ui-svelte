<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
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
			| 'default';
		variant?: 'solid' | 'soft' | 'outlined' | 'ghost';
		rootClass?: string;
		headerClass?: string;
		footerClass?: string;
		bodyClass?: string;
		coverClass?: string;
		overlayClass?: string;
	};

	const {
		children,
		header,
		footer,
		rootClass,
		cover,
		color = 'default',
		variant = 'outlined',
		headerClass,
		bodyClass,
		footerClass,
		coverClass,
		overlayClass
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
		default: 'is-default'
	};

	const variants = {
		solid: 'is-solid',
		soft: 'is-soft',
		outlined: 'is-outlined',
		ghost: 'is-ghost'
	};
</script>

<div class={cn('card', colors[color], variants[variant], rootClass)}>
	{#if cover}
		<img src={cover} alt="cover" class={cn('card-cover', coverClass)} />
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
