<script lang="ts">
	import type { Snippet } from 'svelte';
	type Props = {
		title?: string;
		children: Snippet;
	};
	let { title, children }: Props = $props();
</script>

<div class="flex flex-col gap-2">
	{#if title}
		<h6>{title}</h6>
	{/if}
	<div class="grid grid-cols-2 gap-2">
		{@render children()}
	</div>
</div>
