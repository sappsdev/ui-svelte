<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import Avatar from './Avatar.svelte';

	type AvatarItem = {
		src?: string;
		name?: string;
		alt?: string;
		href?: string;
		onclick?: () => void;
		target?: '_self' | '_blank' | '_parent' | '_top';
	};

	type Props = {
		items: AvatarItem[];
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
		max?: number;
		stacked?: boolean;
		isBordered?: boolean;
		class?: string;
	};

	const {
		items,
		variant = 'primary',
		size = 'lg',
		max,
		stacked = true,
		isBordered = false,
		class: className
	}: Props = $props();

	const visibleItems = $derived(max && max < items.length ? items.slice(0, max) : items);
	const remainingCount = $derived(max && max < items.length ? items.length - max : 0);
</script>

<div class={cn('avatar-group', stacked && 'is-stacked', className)}>
	{#each visibleItems as item, i}
		<Avatar
			src={item.src}
			name={item.name}
			alt={item.alt || `Avatar ${i + 1}`}
			href={item.href}
			onclick={item.onclick}
			target={item.target}
			{variant}
			{size}
			{isBordered}
		/>
	{/each}
	{#if remainingCount > 0}
		<div class={cn('avatar-group-counter', `is-${size}`, `is-${variant}`)}>
			+{remainingCount}
		</div>
	{/if}
</div>
