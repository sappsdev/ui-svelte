<script lang="ts">
	import { ChevronDown24RegularIcon } from '$lib/icons/index.js';
	import { Icon } from '$lib/index.js';

	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	type AccordionItem = {
		id: string;
		label: string;
		content: Snippet | string;
		disabled?: boolean;
		defaultOpen?: boolean;
	};

	type Props = {
		items: AccordionItem[];
		variant?: 'solid' | 'soft' | 'outlined' | 'ghost';
		color?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'success'
			| 'info'
			| 'warning'
			| 'danger'
			| 'surface'
			| 'background';
		multiple?: boolean;
		rootClass?: string;
		itemClass?: string;
		headerClass?: string;
		contentClass?: string;
	};

	const {
		items = [],
		variant = 'solid',
		color = 'background',
		multiple = false,
		rootClass,
		itemClass,
		headerClass,
		contentClass
	}: Props = $props();

	let openItems = $state<Record<string, boolean>>(
		// svelte-ignore state_referenced_locally
		items.reduce(
			(acc, item) => {
				if (item.defaultOpen) {
					acc[item.id] = true;
				}
				return acc;
			},
			{} as Record<string, boolean>
		)
	);

	const variants = {
		solid: 'is-solid',
		soft: 'is-soft',
		outlined: 'is-outlined',
		ghost: 'is-ghost'
	};

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

	function toggleItem(itemId: string, disabled?: boolean) {
		if (disabled) return;

		if (multiple) {
			openItems[itemId] = !openItems[itemId];
		} else {
			const isCurrentlyOpen = openItems[itemId];
			openItems = { [itemId]: !isCurrentlyOpen };
		}
	}
</script>

<div class={cn('accordion', variants[variant], colors[color], rootClass)}>
	{#each items as item}
		<div class={cn('accordion-item', itemClass, item.disabled && 'is-disabled')}>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class={cn('accordion-header', headerClass, openItems[item.id] && 'is-open')}
				onclick={() => toggleItem(item.id, item.disabled)}
			>
				<div class="accordion-start">
					<span class="accordion-label">{item.label}</span>
				</div>
				<div class="accordion-end">
					<Icon
						icon={ChevronDown24RegularIcon}
						class={cn('accordion-arrow', openItems[item.id] && 'is-active')}
					/>
				</div>
			</div>
			{#if openItems[item.id]}
				<div transition:slide class={cn('accordion-content', contentClass)}>
					{#if typeof item.content === 'string'}
						{item.content}
					{:else}
						{@render item.content()}
					{/if}
				</div>
			{/if}
		</div>
	{/each}
</div>
