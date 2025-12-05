<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
		class?: string;
		contentClass?: string;
		headerClass?: string;
		footerClass?: string;
	};

	const {
		children,
		header,
		footer,
		class: className,
		contentClass,
		headerClass,
		footerClass
	}: Props = $props();
</script>

<aside class={cn('sidebar', className)}>
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
