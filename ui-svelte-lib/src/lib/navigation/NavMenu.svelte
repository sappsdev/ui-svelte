<script lang="ts" module>
	import type { IconData } from '$lib/index.js';

	export type NavMenuSubItem = {
		label: string;
		description?: string;
		href?: string;
		onclick?: (item: NavMenuSubItem) => void;
		icon?: IconData;
	};

	export type NavMenuItem = {
		label: string;
		description?: string;
		href?: string;
		onclick?: (item: NavMenuItem) => void;
		subitems?: NavMenuSubItem[];
		megamenu?: Snippet;
		type?: 'item' | 'submenu' | 'megamenu';
		icon?: IconData;
	};
</script>

<script lang="ts">
	import { page } from '$app/state';
	import { ChevronDown24RegularIcon } from '$lib/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';

	type Props = {
		items: NavMenuItem[];
		size?: 'sm' | 'md' | 'lg';
		variant?: 'solid' | 'soft' | 'ghost';
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'warning' | 'danger';
		class?: string;
	};

	const {
		items = [],
		class: className,
		size = 'md',
		variant = 'ghost',
		color = 'muted'
	}: Props = $props();

	let openSubmenuIndex = $state<number | null>(null);
	let triggerElements = $state<Record<number, HTMLElement>>({});
	let popoverElement = $state<HTMLElement>();
	let activeHash = $state<string | null>(null);
	let sectionObserver: IntersectionObserver | null = null;
	let position = $state({
		top: 0,
		left: 0,
		width: 'auto',
		isBottomHalf: false,
		isMegamenu: false
	});

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const variantClasses = {
		solid: 'is-solid',
		soft: 'is-soft',
		ghost: 'is-ghost'
	};

	const colorClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger'
	};

	const style = $derived(
		`top: ${position.top}px; left: ${position.left}px; ${position.width !== 'auto' ? `width: ${position.width}px;` : ''} transform-origin: ${position.isBottomHalf ? 'bottom' : 'top'} center;`
	);

	function isItemActive(href?: string): boolean {
		if (!href) return false;

		if (href.startsWith('#')) {
			return activeHash === href;
		}

		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}

	function hasActiveSubmenu(subitems?: NavMenuSubItem[]): boolean {
		if (!subitems) return false;
		return subitems.some((item) => isItemActive(item.href));
	}

	function updatePosition(index: number) {
		const triggerEl = triggerElements[index];
		if (!triggerEl || !popoverElement) return;

		const rect = triggerEl.getBoundingClientRect();
		const windowHeight = window.innerHeight;
		const popoverHeight = popoverElement.getBoundingClientRect().height;
		const isBottomHalf = rect.bottom + popoverHeight > windowHeight;
		const isMegamenu = items[index]?.type === 'megamenu';

		let left = rect.left + window.scrollX;
		let width: number | 'auto' = 'auto';

		if (isMegamenu) {
			const popoverWidth = popoverElement.getBoundingClientRect().width;
			left = rect.left + rect.width / 2 - popoverWidth / 2 + window.scrollX;

			if (left < 8) left = 8;
			if (left + popoverWidth > window.innerWidth - 8) {
				left = window.innerWidth - popoverWidth - 8;
			}
		}

		position = {
			top: isBottomHalf ? rect.top - popoverHeight - 8 : rect.bottom + 8,
			left,
			width,
			isBottomHalf,
			isMegamenu
		};
	}

	function toggleSubmenu(index: number) {
		if (openSubmenuIndex === index) {
			stopEventListeners();
			openSubmenuIndex = null;
		} else {
			openSubmenuIndex = index;
			startEventListeners();
			requestAnimationFrame(() => updatePosition(index));
		}
	}

	function handleClickOutside(event: Event) {
		const target = event.target as Node;
		const isInsideTrigger = Object.values(triggerElements).some((el) => el?.contains(target));
		const isInsidePopover = popoverElement?.contains(target);

		if (!isInsideTrigger && !isInsidePopover) {
			openSubmenuIndex = null;
			stopEventListeners();
		}
	}

	function startEventListeners() {
		window.addEventListener('resize', () => {
			if (openSubmenuIndex !== null) updatePosition(openSubmenuIndex);
		});
		window.addEventListener(
			'scroll',
			() => {
				if (openSubmenuIndex !== null) updatePosition(openSubmenuIndex);
			},
			true
		);
		document.addEventListener('click', handleClickOutside);
	}

	function stopEventListeners() {
		window.removeEventListener('resize', () => {
			if (openSubmenuIndex !== null) updatePosition(openSubmenuIndex);
		});
		window.removeEventListener(
			'scroll',
			() => {
				if (openSubmenuIndex !== null) updatePosition(openSubmenuIndex);
			},
			true
		);
		document.removeEventListener('click', handleClickOutside);
	}

	function handleItemClick(item: NavMenuItem, index: number) {
		if (item.subitems || item.megamenu) {
			toggleSubmenu(index);
		} else if (item.onclick) {
			item.onclick(item);
		}
	}

	function handleSubmenuItemClick(item: NavMenuSubItem) {
		if (item.onclick) {
			item.onclick(item);
		}
		openSubmenuIndex = null;
		stopEventListeners();
	}

	onMount(() => {
		const hashLinks = items
			.flatMap((item) => [item.href, ...(item.subitems?.map((s) => s.href) || [])])
			.filter((href): href is string => !!href && href.startsWith('#'))
			.map((href) => href.slice(1));

		if (hashLinks.length > 0) {
			sectionObserver = new IntersectionObserver(
				(entries) => {
					const visibleEntries = entries.filter((e) => e.isIntersecting);
					if (visibleEntries.length > 0) {
						const mostVisible = visibleEntries.reduce((prev, curr) =>
							curr.intersectionRatio > prev.intersectionRatio ? curr : prev
						);
						activeHash = '#' + mostVisible.target.id;
					}
				},
				{
					threshold: [0.1, 0.5, 0.9],
					rootMargin: '-10% 0px -10% 0px'
				}
			);

			hashLinks.forEach((id) => {
				const el = document.getElementById(id);
				if (el) sectionObserver!.observe(el);
			});
		}

		return () => {
			sectionObserver?.disconnect();
			stopEventListeners();
		};
	});
</script>

<nav
	class={cn('navmenu', sizeClasses[size], variantClasses[variant], colorClasses[color], className)}
>
	{#each items as item, index}
		{#if item.href && !item.subitems && !item.megamenu}
			<a href={item.href} class={cn('navmenu-item', isItemActive(item.href) && 'is-active')}>
				{#if item.icon}
					<Icon icon={item.icon} class="navmenu-icon" />
				{/if}
				<span class="navmenu-label" data-text={item.label}>{item.label}</span>
			</a>
		{:else}
			<button
				type="button"
				class={cn(
					'navmenu-item',
					openSubmenuIndex === index && 'is-active',
					hasActiveSubmenu(item.subitems) && 'is-active'
				)}
				bind:this={triggerElements[index]}
				onclick={() => handleItemClick(item, index)}
				aria-haspopup={!!(item.subitems || item.megamenu)}
				aria-expanded={openSubmenuIndex === index}
				aria-controls={openSubmenuIndex === index ? `navmenu-popover-${index}` : undefined}
			>
				{#if item.icon}
					<Icon icon={item.icon} class="navmenu-icon" />
				{/if}
				<span class="navmenu-label" data-text={item.label}>{item.label}</span>
				{#if item.subitems || item.megamenu}
					<Icon
						icon={ChevronDown24RegularIcon}
						class={cn('navmenu-arrow', openSubmenuIndex === index && 'is-open')}
					/>
				{/if}
			</button>
		{/if}
	{/each}
</nav>

{#if openSubmenuIndex !== null}
	{@const currentItem = items[openSubmenuIndex]}
	<div
		id={`navmenu-popover-${openSubmenuIndex}`}
		class={cn(
			'navmenu-popover',
			sizeClasses[size],
			openSubmenuIndex !== null && 'is-active',
			position.isMegamenu && 'is-megamenu'
		)}
		bind:this={popoverElement}
		{style}
		role="menu"
	>
		{#if currentItem?.megamenu}
			{@render currentItem.megamenu()}
		{:else if currentItem?.subitems}
			<div class="navmenu-popover-content">
				{#each currentItem.subitems as subitem}
					{#if subitem.href}
						<a
							href={subitem.href}
							class={cn('navmenu-submenu-item', isItemActive(subitem.href) && 'is-active')}
							onclick={() => {
								openSubmenuIndex = null;
								stopEventListeners();
							}}
							role="menuitem"
						>
							{#if subitem.icon}
								<Icon icon={subitem.icon} class="navmenu-submenu-icon" />
							{/if}
							<div class="navmenu-submenu-content">
								<div class="navmenu-submenu-label">{subitem.label}</div>
								{#if subitem.description}
									<div class="navmenu-submenu-description">{subitem.description}</div>
								{/if}
							</div>
						</a>
					{:else}
						<button
							type="button"
							class="navmenu-submenu-item"
							onclick={() => handleSubmenuItemClick(subitem)}
							role="menuitem"
						>
							{#if subitem.icon}
								<Icon icon={subitem.icon} class="navmenu-submenu-icon" />
							{/if}
							<div class="navmenu-submenu-content">
								<div class="navmenu-submenu-label">{subitem.label}</div>
								{#if subitem.description}
									<div class="navmenu-submenu-description">{subitem.description}</div>
								{/if}
							</div>
						</button>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
{/if}
