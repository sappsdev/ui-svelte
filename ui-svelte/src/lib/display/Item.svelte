<script lang="ts">
	import { Avatar } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		id?: string | number;
		label?: string;
		description?: string;
		src?: string;
		variant?: 'ghost' | 'outlined' | 'surface' | 'primary' | 'secondary' | 'muted';
		size?: 'sm' | 'md' | 'lg';
		status?: 'online' | 'offline' | 'busy' | 'away';
		href?: string;
		isDisabled?: boolean;
		isActive?: boolean;
		isFocused?: boolean;
		isCompact?: boolean;
		hasDivider?: boolean;
		hasShadow?: boolean;
		onclick?: (id: string | number) => void;
		actions?: Snippet;
		isSolid?: boolean;
		class?: string;
	};

	let {
		id,
		label,
		description,
		src,
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
		onclick,
		actions,
		isSolid,
		class: className
	}: Props = $props();

	const variantClasses = {
		ghost: 'is-ghost',
		outlined: 'is-outlined',
		surface: 'is-surface',
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted'
	};

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const avatarSizes: Record<string, 'sm' | 'md' | 'lg' | 'xl'> = {
		sm: 'md',
		md: 'lg',
		lg: 'xl'
	};

	const isInteractive = $derived(!!href || !!onclick);

	let itemClasses = $derived(
		cn(
			'item',
			variantClasses[variant],
			sizeClasses[size],
			isInteractive && !isDisabled && 'is-interactive',
			isActive && 'is-active',
			isFocused && 'is-focused',
			isDisabled && 'is-disabled',
			isCompact && 'is-compact',
			isSolid && 'is-solid',
			hasDivider && 'has-divider',
			hasShadow && 'has-shadow',
			!!src && !label && !description && 'has-icon-only',
			className
		)
	);
</script>

{#snippet itemContent()}
	{#if src}
		<Avatar {src} {status} size={avatarSizes[size]} variant="transparent" />
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
{/snippet}

{#if href && !isDisabled}
	<a {href} class={itemClasses} aria-disabled={isDisabled}>
		{@render itemContent()}
	</a>
{:else if onclick && id && !isDisabled}
	<button type="button" class={itemClasses} onclick={() => onclick(id)} disabled={isDisabled}>
		{@render itemContent()}
	</button>
{:else}
	<div class={itemClasses} aria-disabled={isDisabled} aria-selected={isActive}>
		{@render itemContent()}
	</div>
{/if}
