<script lang="ts">
	import type { IconData } from '$lib/display/Icon.svelte';
	import { DotsMoveIcon } from '$lib/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
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
		icon: IconData;
		isDisabled?: boolean;
		hasShadow?: boolean;
		isSolid?: boolean;
	};

	const {
		onclick,
		href,
		type = 'button',
		variant = 'primary',
		size = 'md',
		class: className,
		icon,
		isLoading,
		isDisabled,
		hasShadow,
		isSolid
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
			'is-icon',
			variantClasses[variant],
			sizeClasses[size],
			isSolid && 'is-solid',
			hasShadow && 'has-shadow',
			className
		)
	);
</script>

{#snippet content()}
	<Icon {icon} />
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
			<span style="visibility: hidden; pointer-events: none;">
				{@render content()}
			</span>
		{:else}
			{@render content()}
		{/if}
	</button>
{/if}
