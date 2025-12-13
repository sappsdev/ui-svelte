<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import Avatar from './Avatar.svelte';

	type AvatarItem = {
		src?: string;
		name?: string;
		alt?: string;
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
			{variant}
			{size}
			{isBordered}
		/>
	{/each}
	{#if remainingCount > 0}
		<div class={cn('avatar-group-counter', `is-${size}`)}>
			+{remainingCount}
		</div>
	{/if}
</div>
