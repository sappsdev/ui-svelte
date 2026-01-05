<script lang="ts">
	import { Avatar } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

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
		autoFit?: boolean;
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
		autoFit = false,
		isInline,
		isBordered,
		classRoot,
		classAvatar,
		classCounter
	}: Props = $props();

	const avatarSizes: Record<string, number> = {
		xs: 24,
		sm: 32,
		md: 40,
		xl: 64
	};

	const counterSizes: Record<string, number> = {
		xs: 20,
		sm: 24,
		md: 28,
		lg: 40,
		xl: 56
	};

	const OVERLAP = 12;
	const GAP_INLINE = 8;

	let containerRef: HTMLDivElement | null = $state(null);
	let autoFitMax: number | null = $state(null);

	function calculateFitCount(containerWidth: number): number {
		const avatarSize = avatarSizes[size];
		const counterSize = counterSizes[size];

		if (isInline) {
			const gap = GAP_INLINE;
			const reservedForCounter = counterSize + gap;
			const availableWidth = containerWidth - reservedForCounter;

			if (availableWidth < avatarSize) return 1;

			const firstAvatar = avatarSize;
			const subsequentAvatar = avatarSize + gap;

			const count = 1 + Math.floor((availableWidth - firstAvatar) / subsequentAvatar);
			return Math.max(1, count);
		} else {
			const reservedForCounter = counterSize - OVERLAP;
			const availableWidth = containerWidth - reservedForCounter;

			if (availableWidth < avatarSize) return 1;

			const firstAvatar = avatarSize;
			const subsequentAvatar = avatarSize - OVERLAP;

			const count = 1 + Math.floor((availableWidth - firstAvatar) / subsequentAvatar);
			return Math.max(1, count);
		}
	}

	$effect(() => {
		if (!autoFit || !containerRef) return;

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const width = entry.contentRect.width;
				const fitCount = calculateFitCount(width);
				autoFitMax = fitCount < items.length ? fitCount : null;
			}
		});

		observer.observe(containerRef);

		return () => observer.disconnect();
	});

	const effectiveMax = $derived(autoFit && autoFitMax !== null ? autoFitMax : max);
	const visibleItems = $derived(
		effectiveMax && effectiveMax < items.length ? items.slice(0, effectiveMax) : items
	);
	const remainingCount = $derived(
		effectiveMax && effectiveMax < items.length ? items.length - effectiveMax : 0
	);
</script>

<div bind:this={containerRef} class={cn('avatar-group', !isInline && 'is-stacked', classRoot)}>
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
