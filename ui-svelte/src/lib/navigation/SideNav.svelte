<script lang="ts">
	import { page } from '$app/state';
	import type { IconData } from '$lib/display/Icon.svelte';
	import { ChevronRight24RegularIcon } from '$lib/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	type SubmenuItem = {
		label: string;
		href?: string;
		onclick?: (item: SubmenuItem) => void;
		description?: string;
		status?: string | Snippet;
		icon?: IconData;
	};

	type NavItem = {
		type?: 'item' | 'divider' | 'header' | 'submenu';
		label?: string;
		description?: string;
		href?: string;
		onclick?: (item: NavItem) => void;
		status?: string | Snippet;
		icon?: IconData;
		subitems?: SubmenuItem[];
		open?: boolean;
	};

	type Props = {
		items: NavItem[];
		variant?: 'primary' | 'secondary' | 'muted';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
		isWide?: boolean;
		isCompact?: boolean;
		isCollapsible?: boolean;
	};

	const {
		items = [],
		class: className,
		variant = 'primary',
		size = 'md',
		isWide = false,
		isCompact = false,
		isCollapsible = false
	}: Props = $props();

	let openSubmenus = $state<Record<number, boolean>>(
		items.reduce(
			(acc, item, index) => {
				if (item.type === 'submenu' && item.open) {
					acc[index] = true;
				}
				return acc;
			},
			{} as Record<number, boolean>
		)
	);

	let isExpanded = $state(!isCollapsible);

	const variantClasses = {
		primary: 'sidenav-primary',
		secondary: 'sidenav-secondary',
		muted: 'sidenav-muted'
	};

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	function toggleSubmenu(index: number) {
		openSubmenus[index] = !openSubmenus[index];
	}

	function isItemActive(href?: string): boolean {
		if (!href) return false;
		return page.url.pathname.includes(href);
	}

	function toggleExpand() {
		if (isCollapsible) {
			isExpanded = !isExpanded;
		}
	}
</script>

{#snippet navItemContent(item: NavItem | SubmenuItem, isSubitem = false)}
	<div class="sidenav-content">
		<div class="sidenav-label">{item.label}</div>
		{#if item.description && (isExpanded || !isCollapsible)}
			<div class="sidenav-description">{item.description}</div>
		{/if}
	</div>
	{#if item.status && (isExpanded || !isCollapsible)}
		<div class="sidenav-status-wrapper">
			{#if typeof item.status === 'string'}
				<span class="sidenav-status">{item.status}</span>
			{:else}
				{@render item.status()}
			{/if}
		</div>
	{/if}
{/snippet}

<nav
	class={cn(
		'sidenav',
		variantClasses[variant],
		sizeClasses[size],
		isCompact && 'is-compact',
		isCollapsible && 'is-collapsible',
		!isExpanded && 'is-collapsed',
		className
	)}
	onmouseenter={() => isCollapsible && (isExpanded = true)}
	onmouseleave={() => isCollapsible && (isExpanded = false)}
>
	{#each items as item, index}
		{#if item.type === 'divider'}
			<div class="sidenav-divider"></div>
		{:else if item.type === 'header'}
			{#if item.href || item.onclick}
				{#if item.href}
					<a
						href={item.href}
						class={cn('sidenav-header sidenav-header-link', isItemActive(item.href) && 'is-active')}
					>
						{#if item.icon}
							<Icon icon={item.icon} />
						{/if}
						{#if isExpanded || !isCollapsible}
							<div class="sidenav-header-content">
								<div class="sidenav-header-label">{item.label}</div>
								{#if item.description}
									<div class="sidenav-header-description">{item.description}</div>
								{/if}
							</div>
						{/if}
					</a>
				{:else}
					<button
						type="button"
						class="sidenav-header sidenav-header-link"
						onclick={() => item.onclick?.(item)}
					>
						{#if item.icon}
							<Icon icon={item.icon} />
						{/if}
						{#if isExpanded || !isCollapsible}
							<div class="sidenav-header-content">
								<div class="sidenav-header-label">{item.label}</div>
								{#if item.description}
									<div class="sidenav-header-description">{item.description}</div>
								{/if}
							</div>
						{/if}
					</button>
				{/if}
			{:else}
				<div class="sidenav-header">
					{#if item.icon}
						<Icon icon={item.icon} />
					{/if}
					{#if isExpanded || !isCollapsible}
						<div class="sidenav-header-content">
							<div class="sidenav-header-label">{item.label}</div>
							{#if item.description}
								<div class="sidenav-header-description">{item.description}</div>
							{/if}
						</div>
					{/if}
				</div>
			{/if}
		{:else if item.type === 'submenu'}
			<div class="sidenav-submenu-wrapper">
				<button
					type="button"
					class="sidenav-header sidenav-submenu-trigger"
					onclick={() => toggleSubmenu(index)}
				>
					{#if isExpanded || !isCollapsible}
						<div class="sidenav-header-content">
							<div class="sidenav-header-label">{item.label}</div>
							{#if item.description}
								<div class="sidenav-header-description">{item.description}</div>
							{/if}
						</div>
					{/if}
					{#if isExpanded || !isCollapsible}
						<div class="sidenav-arrow-wrapper">
							<Icon
								icon={ChevronRight24RegularIcon}
								class={cn('sidenav-arrow', openSubmenus[index] && 'is-open')}
							/>
						</div>
					{/if}
				</button>

				{#if openSubmenus[index] && item.subitems && (isExpanded || !isCollapsible)}
					<div transition:slide class="sidenav-submenu-content">
						{#each item.subitems as subitem}
							{#if subitem.href}
								<a
									href={subitem.href}
									class={cn(
										'sidenav-item sidenav-subitem',
										isWide && 'is-wide',
										isItemActive(subitem.href) && 'is-active'
									)}
								>
									{@render navItemContent(subitem, true)}
								</a>
							{:else}
								<button
									type="button"
									class="sidenav-item sidenav-subitem"
									onclick={() => subitem.onclick?.(subitem)}
								>
									{@render navItemContent(subitem, true)}
								</button>
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		{:else if item.href}
			<a
				href={item.href}
				class={cn('sidenav-item', isWide && 'is-wide', isItemActive(item.href) && 'is-active')}
			>
				{@render navItemContent(item)}
			</a>
		{:else}
			<button
				type="button"
				class={cn('sidenav-item', isWide && 'is-wide')}
				onclick={() => item.onclick?.(item)}
			>
				{@render navItemContent(item)}
			</button>
		{/if}
	{/each}
</nav>
