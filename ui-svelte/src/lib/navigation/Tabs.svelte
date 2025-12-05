<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Tab = {
		id: string;
		label: string;
		content: Snippet | string;
	};
	type Props = {
		tabs: Tab[];
		position?: 'top' | 'bottom' | 'start' | 'end';
		variant?: 'primary' | 'secondary' | 'muted' | 'outline' | 'line' | 'ghost';
		pill?: boolean;
		class?: string;
		tabListClass?: string;
		tabClass?: string;
		tabContentClass?: string;
	};
	const {
		class: className,
		tabClass,
		tabListClass,
		tabContentClass,
		tabs,
		variant = 'muted',
		pill,
		position = 'top'
	}: Props = $props();

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		outline: 'is-outline',
		line: 'is-line',
		ghost: 'is-ghost'
	};

	const positionClasses = {
		top: 'is-top',
		bottom: 'is-bottom',
		start: 'is-start',
		end: 'is-end'
	};

	let activeTab = $state(tabs[0]);

	function handleTabChange(tab: Tab) {
		activeTab = tab;
	}
</script>

<div class={cn('tabs', positionClasses[position], className)}>
	<div class={cn('tabs-list', variantClasses[variant], pill && 'is-pill', tabListClass)}>
		{#each tabs as tab}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class:on-active={activeTab.id === tab.id}
				class={cn('tab', tabClass)}
				onclick={() => handleTabChange(tab)}
			>
				<span class="tabs-label">{tab.label}</span>
			</div>
		{/each}
	</div>
	<div class={cn('tabs-wrapper', tabContentClass)}>
		{#key activeTab.id}
			<div class="tabs-content">
				{#if typeof activeTab.content === 'string'}
					{activeTab.content}
				{:else}
					{@render activeTab.content()}
				{/if}
			</div>
		{/key}
	</div>
</div>
