<script lang="ts">
	import { codeToHtml } from 'shiki';
	import { useClipboard } from '$lib/hooks/use-clipboard.svelte.js';
	import { Chip, IconButton } from '$lib/index.js';
	import { Checkmark24RegularIcon, Copy24RegularIcon } from '$lib/icons/index.js';
	import { theme } from '$lib/stores/theme.svelte.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		code: string;
		lang: string;
		lightTheme?: string;
		darkTheme?: string;
		disableCopy?: boolean;
		hideLang?: boolean;
		class?: string;
	};

	let {
		code,
		lang,
		lightTheme = 'catppuccin-latte',
		darkTheme = 'catppuccin-frappe',
		disableCopy,
		hideLang,
		class: className
	}: Props = $props();

	let html: string = $state('');
	let open = $state(false);
	let hover = $state(false);

	const generateCode = async (value: string, currentTheme: string) => {
		html = await codeToHtml(value, {
			lang,
			theme: currentTheme
		});
		open = true;
	};

	$effect(() => {
		const currentTheme = theme.isDark ? darkTheme : lightTheme;
		generateCode(code, currentTheme);
	});

	const clipboard = useClipboard();

	const handleCopy = () => {
		clipboard.copy(code);
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={cn('code', className)}
	onmouseenter={() => (hover = true)}
	onmouseleave={() => (hover = false)}
>
	{#if open}
		{#if (!hover && !hideLang && !clipboard.copied) || (disableCopy && !hideLang)}
			<div class="code-info">
				<Chip variant="muted">{lang}</Chip>
			</div>
		{/if}
		{#if (hover && !disableCopy) || clipboard.copied || (!disableCopy && hideLang)}
			<div class="code-info">
				<IconButton
					onclick={handleCopy}
					variant="muted"
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
