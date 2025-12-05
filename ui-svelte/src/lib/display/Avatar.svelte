<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		src?: string;
		name?: string;
		alt?: string;
		variant?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'success'
			| 'warning'
			| 'danger'
			| 'info'
			| 'transparent';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		status?: 'online' | 'offline' | 'busy' | 'away';
		isBordered?: boolean;
		class?: string;
	};

	const {
		src,
		name,
		alt = 'Avatar',
		size = 'lg',
		variant = 'primary',
		status,
		isBordered,
		class: className
	}: Props = $props();

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		warning: 'is-warning',
		danger: 'is-danger',
		info: 'is-info',
		transparent: 'is-transparent'
	};

	const sizeClasses = {
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
</script>

<div
	class={cn(
		'avatar',
		sizeClasses[size],
		variantClasses[variant],
		isBordered && 'is-bordered',
		className
	)}
>
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
</div>
