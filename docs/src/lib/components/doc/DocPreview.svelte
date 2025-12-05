<script lang="ts">
	import { Card, Divider, Section } from 'ui-svelte';
	import type { Snippet } from 'svelte';
	type Props = {
		children: Snippet;
		builder?: Snippet;
	};
	let { children, builder }: Props = $props();
</script>

<Section>
	<Card>
		<div class="column xl:row w-full gap-3">
			<div class="column flex-1 xl:min-w-0">
				<h4>Preview</h4>
				<div class="column center gap-4 flex-1 p-4">
					{@render children()}
				</div>
			</div>
			{#if builder}
				<Divider class="invisible xl:visible" vertical />
				<Divider class="xl:hidden" />
				<div class="column gap-3 xl:w-64 xl:min-w-64 xl:shrink-0 w-full">
					<h4>Builder</h4>

					{@render builder()}
				</div>
			{/if}
		</div>
	</Card>
</Section>
