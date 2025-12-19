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

	type Props = {
		title?: string;
		description?: string;
		children?: Snippet;
		showIcon?: boolean;
		icon?: IconData;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft';
	};

	let {
		title,
		description,
		children,
		showIcon,
		icon,
		color = 'info',
		variant = 'soft'
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
		soft: 'is-soft'
	};

	const DEFAULT_ICONS: Record<
		'primary' | 'secondary' | 'muted' | 'info' | 'success' | 'warning' | 'danger',
		IconData
	> = {
		primary: Info24RegularIcon,
		secondary: Info24RegularIcon,
		muted: Info24RegularIcon,
		info: Info24RegularIcon,
		success: CheckmarkCircle24RegularIcon,
		warning: Warning24RegularIcon,
		danger: DismissCircle24RegularIcon
	};

	const currentIcon = $derived(icon ?? DEFAULT_ICONS[color as keyof typeof DEFAULT_ICONS]);
	const hasContent = $derived(description || children);
</script>

<div class={cn('alert', colors[color], variants[variant])}>
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
</div>
