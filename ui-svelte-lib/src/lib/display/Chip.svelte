<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import type { IconData } from './Icon.svelte';
	import { Icon, IconButton } from '$lib/index.js';
	import { Dismiss24RegularIcon } from '$lib/icons/index.js';

	type Props = {
		children: Snippet;
		onclose?: () => void;
		type?: 'solid' | 'soft';
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft' | 'outlined' | 'overlay';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
		startIcon?: IconData;
		endIcon?: IconData;
		hasShadow?: boolean;
		isSolid?: boolean;
	};

	const {
		children,
		onclose,
		color = 'primary',
		variant = 'solid',
		size = 'md',
		class: className,
		startIcon,
		endIcon
	}: Props = $props();

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning'
	};

	const variants = {
		solid: 'is-solid',
		soft: 'is-soft',
		outlined: 'is-outlined',
		overlay: 'is-overlay'
	};

	const sizes = {
		xs: 'is-xs',
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg',
		xl: 'is-xl'
	};
</script>

<div
	class={cn(
		'chip',
		variants[variant],
		sizes[size],
		colors[color],
		onclose && 'has-close',
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
	{#if onclose}
		<button class="chip-close" onclick={() => onclose?.()}>
			<Icon icon={Dismiss24RegularIcon} />
		</button>
	{/if}
</div>
