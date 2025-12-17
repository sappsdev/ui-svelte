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
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		max?: number;
		isInline?: boolean;
		isBordered?: boolean;
		classRoot?: string;
		classAvatar?: string;
		classCounter?: string;
	};

	const {
		items,
		variant = 'solid',
		color = 'primary',
		size = 'md',
		max,
		isInline,
		isBordered,
		classRoot,
		classAvatar,
		classCounter
	}: Props = $props();

	const visibleItems = $derived(max && max < items.length ? items.slice(0, max) : items);
	const remainingCount = $derived(max && max < items.length ? items.length - max : 0);
</script>

<div class={cn('avatar-group', !isInline && 'is-stacked', classRoot)}>
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
			{color}
			{isBordered}
			class={classAvatar}
		/>
	{/each}
	{#if remainingCount > 0}
		<div
			class={cn('avatar-group-counter', `is-${size}`, `is-${variant}`, `is-${color}`, classCounter)}
		>
			+{remainingCount}
		</div>
	{/if}
</div>
