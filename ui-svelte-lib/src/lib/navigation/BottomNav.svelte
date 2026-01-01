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

	type Color =
		| 'primary'
		| 'secondary'
		| 'muted'
		| 'success'
		| 'info'
		| 'warning'
		| 'danger'
		| 'surface'
		| 'background';

	type Props = {
		items: BottomNavItem[];
		color?: Color;
		fabColor?: Color;
		variant?: 'solid' | 'soft' | 'blur';
		activeStyle?: 'line' | 'pill';
		size?: 'sm' | 'md' | 'lg';
		isBlock?: boolean;
		isBordered?: boolean;
		class?: string;
	};

	const {
		items = [],
		class: className,
		color = 'surface',
		fabColor = 'primary',
		variant = 'solid',
		activeStyle = 'line',
		size = 'md',
		isBlock = false,
		isBordered = true
	}: Props = $props();

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger',
		surface: 'is-surface',
		background: 'is-background'
	};

	const variants = {
		solid: 'is-solid',
		soft: 'is-soft',
		blur: 'is-blur'
	};

	const activeStyles = {
		line: 'active-line',
		pill: 'active-pill'
	};

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const hasLabels = $derived(items.some((item) => item.label));

	function isItemActive(item: BottomNavItem): boolean {
		if (item.isActive !== undefined) return item.isActive;
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
		colors[color],
		variants[variant],
		activeStyles[activeStyle],
		sizeClasses[size],
		!hasLabels && 'is-icon-only',
		!isBlock && 'is-fixed',
		isBordered && 'is-bordered',
		className
	)}
>
	{#each items as item}
		{@const active = isItemActive(item)}
		{@const itemClass = cn(
			'bottomnav-item',
			active && 'is-active',
			item.isFab && 'is-fab',
			item.isFab && colors[fabColor]
		)}

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
