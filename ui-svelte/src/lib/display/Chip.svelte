<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import type { IconData } from './Icon.svelte';
	import { Icon } from '$lib/index.js';

	type Props = {
		children: Snippet;
		onclose?: () => void;
		type?: 'solid' | 'soft';
		variant?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
		startIcon?: IconData;
		endIcon?: IconData;
		hasShadow?: boolean;
		isSolid?: boolean;
	};

	const {
		children,
		onclose,
		variant = 'primary',
		size = 'sm',
		class: className,
		startIcon,
		endIcon,
		hasShadow,
		isSolid
	}: Props = $props();

	const variants = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger'
	};

	const sizes = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};
</script>

<button
	onclick={() => onclose?.()}
	class={cn(
		'chip',
		variants[variant],
		sizes[size],
		isSolid && 'is-solid',
		hasShadow && 'has-shadow',
		className
	)}
>
	{#if startIcon}
		<Icon icon={startIcon} />
	{/if}
	{@render children()}
	{#if endIcon}
		<Icon icon={endIcon} />
	{/if}
</button>
