<script lang="ts">
	import { page } from '$app/state';
	import { ChevronDown24RegularIcon } from '$lib/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';

	type SubmenuItem = {
		label: string;
		description?: string;
		href?: string;
		onclick?: (item: SubmenuItem) => void;
	};

	type MenuItem = {
		label: string;
		description?: string;
		href?: string;
		onclick?: (item: MenuItem) => void;
		subitems?: SubmenuItem[];
		megamenu?: Snippet;
		type?: 'item' | 'submenu' | 'megamenu';
	};

	type Props = {
		items: MenuItem[];
		variant?: 'primary' | 'secondary' | 'muted';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	};

	const { items = [], class: className, variant = 'primary', size = 'md' }: Props = $props();

	let openSubmenuIndex = $state<number | null>(null);
	let triggerElements = $state<Record<number, HTMLElement>>({});
	let popoverElement = $state<HTMLElement>();
	let position = $state({
		top: 0,
		left: 0,
		width: 'auto',
		isBottomHalf: false,
		isMegamenu: false
	});

	const variantClasses = {
		primary: 'navmenu-primary',
		secondary: 'navmenu-secondary',
		muted: 'navmenu-muted'
	};

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const style = $derived(
		`top: ${position.top}px; left: ${position.left}px; ${position.width !== 'auto' ? `width: ${position.width}px;` : ''} transform-origin: ${position.isBottomHalf ? 'bottom' : 'top'} center;`
	);

	function isItemActive(href?: string): boolean {
		if (!href) return false;
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}

	function hasActiveSubmenu(subitems?: SubmenuItem[]): boolean {
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

	function handleItemClick(item: MenuItem, index: number) {
		if (item.subitems || item.megamenu) {
			toggleSubmenu(index);
		} else if (item.onclick) {
			item.onclick(item);
		}
	}

	function handleSubmenuItemClick(item: SubmenuItem) {
		if (item.onclick) {
			item.onclick(item);
		}
		openSubmenuIndex = null;
		stopEventListeners();
	}

	onMount(() => {
		return () => stopEventListeners();
	});
</script>

<nav class={cn('navmenu', variantClasses[variant], sizeClasses[size], className)}>
	{#each items as item, index}
		{#if item.href && !item.subitems && !item.megamenu}
			<a href={item.href} class={cn('navmenu-item', isItemActive(item.href) && 'is-active')}>
				<span class="navmenu-label">{item.label}</span>
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
			>
				<span class="navmenu-label">{item.label}</span>
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
		class={cn(
			'navmenu-popover',
			openSubmenuIndex !== null && 'is-active',
			position.isMegamenu && 'is-megamenu'
		)}
		bind:this={popoverElement}
		{style}
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
						>
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
						>
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
