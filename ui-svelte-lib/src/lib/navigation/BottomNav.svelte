<script lang="ts">
	import { page } from '$app/state';
	import { Icon, type IconData } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type BottomNavItem = {
		id: string;
		label?: string;
		icon: IconData;
		href?: string;
		onclick?: (item: BottomNavItem) => void;
		badge?: string | number;
		isFab?: boolean;
		isActive?: boolean;
	};

	type Props = {
		items: BottomNavItem[];
		variant?: 'primary' | 'secondary' | 'ghost' | 'line';
		size?: 'sm' | 'md' | 'lg';
		isSolid?: boolean;
		isBlock?: boolean;
		class?: string;
	};

	const {
		items = [],
		class: className,
		variant = 'primary',
		size = 'md',
		isSolid = false,
		isBlock = false
	}: Props = $props();

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		ghost: 'is-ghost',
		line: 'is-line'
	};

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	// Determine if any item has a label
	const hasLabels = $derived(items.some((item) => item.label));

	function isItemActive(item: BottomNavItem): boolean {
		// If item has explicit isActive, use that
		if (item.isActive !== undefined) return item.isActive;
		// Otherwise check against current URL
		if (!item.href) return false;
		return page.url.pathname === item.href || page.url.pathname.startsWith(item.href + '/');
	}

	function handleItemClick(item: BottomNavItem) {
		if (item.onclick) {
			item.onclick(item);
		}
	}
</script>

<nav
	class={cn(
		'bottomnav',
		variantClasses[variant],
		sizeClasses[size],
		isSolid && 'is-solid',
		!hasLabels && 'is-icon-only',
		!isBlock && 'is-fixed',
		className
	)}
>
	{#each items as item}
		{@const active = isItemActive(item)}
		{@const itemClass = cn('bottomnav-item', active && 'is-active', item.isFab && 'is-fab')}

		{#if item.href}
			<a href={item.href} class={itemClass}>
				<span class="bottomnav-icon-wrapper">
					<Icon icon={item.icon} class="bottomnav-icon" />
					{#if item.badge !== undefined}
						<span class="bottomnav-badge">{item.badge}</span>
					{/if}
				</span>
				{#if item.label}
					<span class="bottomnav-label">{item.label}</span>
				{/if}
			</a>
		{:else}
			<button type="button" class={itemClass} onclick={() => handleItemClick(item)}>
				<span class="bottomnav-icon-wrapper">
					<Icon icon={item.icon} class="bottomnav-icon" />
					{#if item.badge !== undefined}
						<span class="bottomnav-badge">{item.badge}</span>
					{/if}
				</span>
				{#if item.label}
					<span class="bottomnav-label">{item.label}</span>
				{/if}
			</button>
		{/if}
	{/each}
</nav>
