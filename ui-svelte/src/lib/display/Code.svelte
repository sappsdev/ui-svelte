<script lang="ts">
	import { codeToHtml } from 'shiki';
	import { useClipboard } from '$lib/hooks/use-clipboard.svelte.js';
	import { Button, IconButton } from '$lib/index.js';
	import { Checkmark24RegularIcon, Copy24RegularIcon } from '$lib/icons/index.js';

	type Props = {
		code: string;
		lang?: string;
		theme?: string;
		showCopy?: boolean;
	};

	let { code, lang = 'html', theme = 'catppuccin-frappe', showCopy }: Props = $props();

	let html: string = $state('');
	let open = $state(false);

	const generateCode = async (value: string) => {
		html = await codeToHtml(value, {
			lang,
			theme
		});
		open = true;
	};

	$effect(() => {
		generateCode(code);
	});

	const clipboard = useClipboard();

	const handleCopy = () => {
		clipboard.copy(code);
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="code">
	{#if open}
		{#if showCopy}
			<div class="code-info">
				<IconButton
					onclick={handleCopy}
					variant="primary"
					size="sm"
					icon={clipboard.copied ? Checkmark24RegularIcon : Copy24RegularIcon}
				/>
			</div>
		{/if}

		<div class="code-content">
			{@html html}
		</div>
	{/if}
</div>
