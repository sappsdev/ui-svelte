<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		appBar?: Snippet;
		start?: Snippet;
		end?: Snippet;
		bottomBar?: Snippet;
		bodyClass?: string;
		mainClass?: string;
		startClass?: string;
		endClass?: string;
	};

	const {
		children,
		appBar,
		start,
		end,
		bottomBar,
		bodyClass,
		mainClass,
		startClass,
		endClass
	}: Props = $props();
</script>

{@render appBar?.()}
<div class={cn('scaffold-body', bodyClass)}>
	{#if start}
		<aside class={cn('scaffold-start', startClass)}>
			{@render start()}
		</aside>
	{/if}
	<div class={cn('scaffold-main', mainClass)}>
		{@render children()}
	</div>
	{#if end}
		<aside class={cn('scaffold-end', endClass)}>
			{@render end()}
		</aside>
	{/if}
</div>
{@render bottomBar?.()}
