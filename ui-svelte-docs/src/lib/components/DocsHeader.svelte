<script lang="ts">
	import { Alert, Button, Section, useClipboard } from 'ui-svelte';
	import type { Snippet } from 'svelte';
	import { CheckmarkRegularIcon, CopyRegularIcon } from '$lib/icons';

	type Props = {
		title: string;
		children: Snippet;
		textAlert?: string | Snippet;
		llmUrl?: string;
	};
	let { title, children, textAlert, llmUrl }: Props = $props();

	const clipboard = useClipboard();
	const handleCopy = () => {
		clipboard.copy(`Read from ${llmUrl} so I can ask questions about it.`);
	};
</script>

<Section>
	<div class="row justify-between items-center">
		<h1>{title}</h1>
		{#if llmUrl}
			<Button
				onclick={handleCopy}
				startIcon={clipboard.copied ? CheckmarkRegularIcon : CopyRegularIcon}
				variant="solid"
				color="primary"
				size="sm">Copy LLM</Button
			>
		{/if}
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
