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
		variant?: 'solid' | 'outline' | 'line' | 'ghost' | 'pills';
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		rootClass?: string;
		tabListClass?: string;
		tabClass?: string;
		tabContentClass?: string;
	};
	const {
		rootClass,
		tabClass,
		tabListClass,
		tabContentClass,
		tabs,
		variant = 'solid',
		color = 'muted',
		position = 'top'
	}: Props = $props();

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning'
	};

	const variants = {
		solid: 'is-solid',
		outline: 'is-outline',
		line: 'is-line',
		ghost: 'is-ghost',
		pills: 'is-pills'
	};

	const positionClasses = {
		top: 'is-top',
		bottom: 'is-bottom',
		start: 'is-start',
		end: 'is-end'
	};

	// svelte-ignore state_referenced_locally
	let activeTab = $state(tabs[0]);

	function handleTabChange(tab: Tab) {
		activeTab = tab;
	}
</script>

<div class={cn('tabs', positionClasses[position], rootClass)}>
	<div class={cn('tabs-list', variants[variant], colors[color], tabListClass)}>
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
