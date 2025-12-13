<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Card } from 'ui-svelte';
	type Props = {
		children: Snippet;
		class?: string;
	};
	let { children, class: className = 'md:span-2' }: Props = $props();
</script>

<Card rootClass={className}>
	{#snippet header()}
		<h4>Preview</h4>
	{/snippet}
	<div class="border-2 border-dashed border-on-muted row center h-full min-h-32 p-2 md:p-4">
		{@render children()}
	</div>
</Card>
