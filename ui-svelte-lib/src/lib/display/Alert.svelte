<script lang="ts">
	import {
		CheckmarkCircle24RegularIcon,
		DismissCircle24RegularIcon,
		Info24RegularIcon,
		Warning24RegularIcon
	} from '$lib/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import type { IconData } from './Icon.svelte';

	type AlertStatus = 'info' | 'success' | 'warning' | 'danger';

	type Props = {
		title?: string;
		description?: string;
		children?: Snippet;
		showIcon?: boolean;
		icon?: IconData;
		status?: AlertStatus;
		isSolid?: boolean;
	};

	let { title, description, children, showIcon, icon, status = 'info', isSolid }: Props = $props();

	const STATUS_COLORS: Record<AlertStatus, string> = {
		info: 'is-info',
		success: 'is-success',
		warning: 'is-warning',
		danger: 'is-danger'
	};

	const DEFAULT_ICONS: Record<AlertStatus, IconData> = {
		info: Info24RegularIcon,
		success: CheckmarkCircle24RegularIcon,
		warning: Warning24RegularIcon,
		danger: DismissCircle24RegularIcon
	};

	const currentIcon = $derived(icon ?? DEFAULT_ICONS[status]);
	const hasContent = $derived(description || children);
</script>

<div class={cn('alert', STATUS_COLORS[status], isSolid && 'is-solid')}>
	{#if showIcon}
		<div class="alert-start">
			<Icon icon={currentIcon} class="alert-icon" />
		</div>
	{/if}

	<div class="alert-content">
		{#if title}
			<div class="alert-title">{title}</div>
		{/if}
		{#if hasContent}
			<div class="alert-description">
				{description ?? ''}
				{@render children?.()}
			</div>
		{/if}
	</div>

	<div class="alert-end"></div>
</div>
