<script lang="ts">
	import { MoonStarsLinearIcon, Sun2LinearIcon } from '$lib/icons/index.js';
	import { Button, Icon } from '$lib/index.js';
	import { theme } from '$lib/stores/theme.svelte.js';

	type Props = {
		variant?: 'primary' | 'secondary' | 'muted' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	};

	let { variant = 'ghost', size = 'md', class: className }: Props = $props();
</script>

<Button onclick={theme.toggleTheme} {size} {variant} class={className} isIcon>
	{#if theme.isDark}
		<Icon icon={Sun2LinearIcon} />
	{:else}
		<Icon icon={MoonStarsLinearIcon} />
	{/if}
</Button>
