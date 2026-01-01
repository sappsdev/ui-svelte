<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
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
		variant?: 'solid' | 'soft' | 'outlined' | 'ghost';
		rootClass?: string;
		contentClass?: string;
		headerClass?: string;
		footerClass?: string;
	};

	const {
		children,
		header,
		footer,
		rootClass,
		contentClass,
		headerClass,
		footerClass,
		color = 'surface',
		variant = 'ghost'
	}: Props = $props();

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
		soft: 'is-soft',
		outlined: 'is-outlined',
		ghost: 'is-ghost'
	};
</script>

<aside class={cn('sidebar', colors[color], variants[variant], rootClass)}>
	{#if header}
		<div class={cn('sidebar-header', headerClass)}>
			{@render header()}
		</div>
	{/if}
	<div class={cn('sidebar-body', contentClass)}>
		{@render children()}
	</div>
	{#if footer}
		<div class={cn('sidebar-footer', footerClass)}>
			{@render footer()}
		</div>
	{/if}
</aside>
