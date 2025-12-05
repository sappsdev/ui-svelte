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
		type?: 'button' | 'submit' | 'reset';
		variant?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'success'
			| 'info'
			| 'danger'
			| 'warning'
			| 'outlined'
			| 'ghost';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		class?: string;
		isLoading?: boolean;
		startIcon?: IconData;
		endIcon?: IconData;
		isWide?: boolean;
		isDisabled?: boolean;
		hasShadow?: boolean;
		isSolid?: boolean;
		isIcon?: boolean;
	};

	const {
		children,
		onclick,
		href,
		type = 'button',
		variant = 'primary',
		size = 'md',
		class: className,
		startIcon,
		endIcon,
		isLoading,
		isWide,
		isDisabled,
		hasShadow,
		isSolid,
		isIcon
	}: Props = $props();

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning',
		outlined: 'is-outlined',
		ghost: 'is-ghost'
	};

	const sizeClasses = {
		xs: 'is-xs',
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg',
		xl: 'is-xl'
	};

	let baseClasses = $derived(
		cn(
			'btn',
			variantClasses[variant],
			sizeClasses[size],
			isIcon && 'is-icon',
			isSolid && 'is-solid',
			isWide && 'has-wide',
			hasShadow && 'has-shadow',
			className
		)
	);
</script>

{#snippet content()}
	{#if startIcon}
		<Icon icon={startIcon} class={cn(isLoading && 'invisible')} />
	{/if}
	<span class:invisible={isLoading}>{@render children()}</span>
	{#if endIcon}
		<Icon icon={endIcon} class={cn(isLoading && 'invisible')} />
	{/if}
{/snippet}

{#if href}
	<a class={baseClasses} {href}>
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
