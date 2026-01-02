<script lang="ts">
	import { Avatar, Icon } from '$lib/index.js';
	import { ChevronRight24RegularIcon } from '$lib/icons/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import type { IconData } from './Icon.svelte';

	type Props = {
		id?: string | number;
		label?: string;
		description?: string;
		icon?: IconData;
		src?: string;
		color?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'success'
			| 'info'
			| 'warning'
			| 'danger'
			| 'surface'
			| 'default';
		variant?: 'solid' | 'soft' | 'outlined' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		status?: 'online' | 'offline' | 'busy' | 'away';
		href?: string;
		isDisabled?: boolean;
		isActive?: boolean;
		isFocused?: boolean;
		isCompact?: boolean;
		hasDivider?: boolean;
		hasShadow?: boolean;
		hasBullet?: boolean;
		hasIndicator?: boolean;
		onclick?: (id: string | number) => void;
		actions?: Snippet;
		class?: string;
	};

	let {
		id,
		label,
		description,
		src,
		icon,
		color = 'default',
		variant = 'ghost',
		size = 'md',
		status,
		href,
		isDisabled,
		isActive,
		isFocused,
		isCompact,
		hasDivider,
		hasShadow,
		hasBullet,
		hasIndicator,
		onclick,
		actions,
		class: className
	}: Props = $props();

	const colorClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger',
		surface: 'is-surface',
		default: 'is-default'
	};

	const variantClasses = {
		solid: 'is-solid',
		soft: 'is-soft',
		outlined: 'is-outlined',
		ghost: 'is-ghost'
	};

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const isInteractive = $derived(!!href || !!onclick);

	let itemClasses = $derived(
		cn(
			'item',
			colorClasses[color],
			variantClasses[variant],
			sizeClasses[size],
			isInteractive && !isDisabled && 'is-interactive',
			isActive && 'is-active',
			isFocused && 'is-focused',
			isDisabled && 'is-disabled',
			isCompact && 'is-compact',
			hasDivider && 'has-divider',
			hasShadow && 'has-shadow',
			!!src && !label && !description && 'has-icon-only',
			className
		)
	);
</script>

{#snippet itemContent()}
	{#if icon}
		<Icon {icon} class="h-6 w-auto" />
	{:else if hasBullet}
		<span class="item-bullet"></span>
	{/if}
	{#if src}
		<Avatar {src} {status} {size} variant="soft" />
	{/if}
	<div class="item-body">
		<div class="item-label">{label}</div>
		{#if description}
			<div class="item-description">{description}</div>
		{/if}
	</div>
	{#if actions}
		<div class="item-actions">
			{@render actions()}
		</div>
	{/if}
	{#if hasIndicator}
		<span class="item-indicator">
			<Icon icon={ChevronRight24RegularIcon} />
		</span>
	{/if}
{/snippet}

{#if href && !isDisabled}
	<a {href} class={itemClasses} aria-disabled={isDisabled}>
		{@render itemContent()}
	</a>
{:else if onclick && id !== undefined && !isDisabled}
	<button type="button" class={itemClasses} onclick={() => onclick(id)} disabled={isDisabled}>
		{@render itemContent()}
	</button>
{:else}
	<div class={itemClasses} aria-disabled={isDisabled} aria-selected={isActive}>
		{@render itemContent()}
	</div>
{/if}
