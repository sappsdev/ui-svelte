<script lang="ts">
	import type { IconData } from '$lib/display/Icon.svelte';
	import { DotsMoveIcon } from '$lib/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		onclick?: () => void;
		href?: string;
		target?: '_self' | '_blank' | '_parent' | '_top';
		type?: 'button' | 'submit' | 'reset';
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft' | 'outlined' | 'ghost' | 'overlay';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
		isLoading?: boolean;
		startIcon?: IconData;
		endIcon?: IconData;
		isWide?: boolean;
		isDisabled?: boolean;
		isSolid?: boolean;
	};

	const {
		children,
		onclick,
		href,
		target,
		type = 'button',
		color = 'primary',
		variant = 'solid',
		size = 'md',
		class: className,
		startIcon,
		endIcon,
		isLoading,
		isWide,
		isDisabled
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
		ghost: 'is-ghost',
		overlay: 'is-overlay'
	};

	const sizes = {
		xs: 'is-xs',
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg',
		xl: 'is-xl'
	};

	let baseClasses = $derived(
		cn('btn', variants[variant], sizes[size], colors[color], isWide && 'is-wide', className)
	);
</script>

{#snippet content()}
	{#if startIcon}
		<Icon icon={startIcon} class={cn(isLoading && 'invisible')} />
	{/if}
	<span class:invisible={isLoading} class="btn-label">{@render children()}</span>
	{#if endIcon}
		<Icon icon={endIcon} class={cn(isLoading && 'invisible')} />
	{/if}
{/snippet}

{#if href}
	<a class={baseClasses} {href} {target}>
		{@render content()}
	</a>
{:else}
	<button
		{type}
		{onclick}
		disabled={isDisabled || isLoading}
		class={baseClasses}
		aria-busy={isLoading}
	>
		{#if isLoading}
			<span class="btn-loading">
				<Icon icon={DotsMoveIcon} class="loading-icon" />
			</span>
		{/if}
		{@render content()}
	</button>
{/if}
