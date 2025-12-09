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
	};

	type Props = {
		items: BottomNavItem[];
		variant?: 'primary' | 'secondary' | 'muted';
		size?: 'sm' | 'md' | 'lg';
		showLabels?: boolean;
		class?: string;
	};

	const {
		items = [],
		class: className,
		variant = 'primary',
		size = 'md',
		showLabels = true
	}: Props = $props();

	const variantClasses = {
		primary: 'bottomnav-primary',
		secondary: 'bottomnav-secondary',
		muted: 'bottomnav-muted'
	};

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	function isItemActive(href?: string): boolean {
		if (!href) return false;
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
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
		!showLabels && 'is-icon-only',
		className
	)}
>
	{#each items as item}
		{#if item.href}
			<a href={item.href} class={cn('bottomnav-item', isItemActive(item.href) && 'is-active')}>
				<Icon icon={item.icon} class="bottomnav-icon" />
				{#if showLabels && item.label}
					<span class="bottomnav-label">{item.label}</span>
				{/if}
			</a>
		{:else}
			<button type="button" class="bottomnav-item" onclick={() => handleItemClick(item)}>
				<Icon icon={item.icon} class="bottomnav-icon" />
				{#if showLabels && item.label}
					<span class="bottomnav-label">{item.label}</span>
				{/if}
			</button>
		{/if}
	{/each}
</nav>
