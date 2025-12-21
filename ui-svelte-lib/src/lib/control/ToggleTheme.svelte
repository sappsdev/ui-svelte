<script lang="ts">
	import { MoonStarsLinearIcon, Sun2LinearIcon } from '$lib/icons/index.js';
	import { IconButton } from '$lib/index.js';
	import { theme } from '$lib/stores/theme.svelte.js';

	type Props = {
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft' | 'outlined' | 'ghost';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
	};

	let { color = 'muted', variant = 'ghost', size = 'md', class: className }: Props = $props();
</script>

<IconButton
	icon={theme.isDark ? Sun2LinearIcon : MoonStarsLinearIcon}
	{size}
	{color}
	{variant}
	class={className}
	onclick={theme.toggleTheme}
/>
