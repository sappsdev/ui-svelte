<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		src?: string;
		name?: string;
		alt?: string;
		href?: string;
		onclick?: () => void;
		target?: '_self' | '_blank' | '_parent' | '_top';
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		status?: 'online' | 'offline' | 'busy' | 'away';
		isBordered?: boolean;
		class?: string;
	};

	const {
		src,
		name,
		alt = 'Avatar',
		href,
		onclick,
		target,
		color = 'primary',
		variant = 'solid',
		size = 'md',
		status,
		isBordered,
		class: className
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
		soft: 'is-soft'
	};

	const sizes = {
		xs: 'is-xs',
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg',
		xl: 'is-xl'
	};

	const statusClasses = {
		online: 'is-online',
		offline: 'is-offline',
		busy: 'is-busy',
		away: 'is-away'
	};

	const baseClasses = $derived(
		cn(
			'avatar',
			colors[color],
			sizes[size],
			variants[variant],
			isBordered && 'is-bordered',
			(href || onclick) && 'is-clickable',
			className
		)
	);
</script>

{#snippet avatarContent()}
	{#if status}
		<div class="avatar-status">
			<div class={cn('avatar-indicator', statusClasses[status])}></div>
		</div>
	{/if}
	{#if src}
		<img {src} {alt} class="avatar-image" />
	{:else}
		<span class="avatar-name">{name?.charAt(0).toUpperCase() || alt.charAt(0).toUpperCase()}</span>
	{/if}
{/snippet}

{#if href}
	<a class={baseClasses} {href} {target}>
		{@render avatarContent()}
	</a>
{:else if onclick}
	<button type="button" class={baseClasses} {onclick}>
		{@render avatarContent()}
	</button>
{:else}
	<div class={baseClasses}>
		{@render avatarContent()}
	</div>
{/if}
