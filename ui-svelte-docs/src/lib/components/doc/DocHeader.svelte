<script lang="ts">
	import { Alert, Section } from 'ui-svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		children: Snippet;
		textAlert?: string;
	};
	let { title, children, textAlert }: Props = $props();
</script>

<Section bodyClass="prose">
	<h1>{title}</h1>
	<p>{@render children()}</p>
	{#if textAlert}
		<Alert showIcon>
			<strong>Note:</strong>
			{textAlert}
		</Alert>
	{/if}
</Section>
