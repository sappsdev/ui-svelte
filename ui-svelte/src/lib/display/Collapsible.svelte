<script lang="ts">
	import { ChevronDown24RegularIcon } from '$lib/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	type Props = {
		label: string;
		startContent?: Snippet;
		content: Snippet | string;
		disabled?: boolean;
		defaultOpen?: boolean;
		variant?: 'primary' | 'secondary' | 'muted' | 'outline';
		class?: string;
		headerClass?: string;
		contentClass?: string;
	};

	const {
		label,
		startContent,
		content,
		disabled = false,
		defaultOpen = false,
		variant = 'muted',
		class: className,
		headerClass,
		contentClass
	}: Props = $props();

	let isOpen = $state(defaultOpen);

	const variants = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		outline: 'is-outline'
	};

	function toggle() {
		if (disabled) return;
		isOpen = !isOpen;
	}
</script>

<div class={cn('collapsible', variants[variant], className, disabled && 'is-disabled')}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class={cn('collapsible-header', headerClass, isOpen && 'is-open')} onclick={toggle}>
		<div class="collapsible-start">
			{@render startContent?.()}
			<span class="collapsible-label">{label}</span>
		</div>
		<div class="collapsible-end">
			<Icon
				icon={ChevronDown24RegularIcon}
				class={cn('collapsible-arrow', isOpen && 'is-active')}
			/>
		</div>
	</div>
	{#if isOpen}
		<div transition:slide class={cn('collapsible-content', contentClass)}>
			{#if typeof content === 'string'}
				{content}
			{:else}
				{@render content()}
			{/if}
		</div>
	{/if}
</div>
