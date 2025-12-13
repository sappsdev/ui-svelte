<script lang="ts">
	import { Alert, Button, Section } from 'ui-svelte';
	import type { Snippet } from 'svelte';
	import { CopyRegularIcon } from '$lib/icons';

	type Props = {
		title: string;
		children: Snippet;
		textAlert?: string | Snippet;
	};
	let { title, children, textAlert }: Props = $props();
</script>

<Section bodyClass="prose">
	<div class="row justify-between">
		<h1>{title}</h1>
		<Button startIcon={CopyRegularIcon} variant="muted" size="sm">Copy LLM</Button>
	</div>
	<p>{@render children()}</p>
	{#if textAlert}
		<Alert showIcon>
			{#if typeof textAlert === 'string'}
				<strong>Note:</strong>
				{textAlert}
			{:else}
				{@render textAlert()}
			{/if}
		</Alert>
	{/if}
</Section>
