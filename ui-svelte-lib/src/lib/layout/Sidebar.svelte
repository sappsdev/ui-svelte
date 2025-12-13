<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
		rootClass?: string;
		contentClass?: string;
		headerClass?: string;
		footerClass?: string;
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
		children,
		header,
		footer,
		rootClass,
		contentClass,
		headerClass,
		footerClass,
		variant = 'ghost'
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

<aside class={cn('sidebar', variantClasses[variant], rootClass)}>
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
