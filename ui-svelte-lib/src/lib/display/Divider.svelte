<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		class?: string;
		vertical?: boolean;
		color?: 'default' | 'surface' | 'primary' | 'secondary' | 'muted';
	};

	let { children, class: className, vertical, color = 'default' }: Props = $props();

	const colors = {
		default: 'divider-default',
		surface: 'divider-surface',
		primary: 'divider-primary',
		secondary: 'divider-secondary',
		muted: 'divider-muted'
	};
</script>

<div
	class={cn(
		vertical ? 'divider-vertical' : 'divider-horizontal',
		color && colors[color],
		className
	)}
>
	{@render children?.()}
</div>
