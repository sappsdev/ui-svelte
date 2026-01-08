<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { IconData } from '$lib/display/Icon.svelte';
	import { Avatar, IconButton } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { Add24RegularIcon } from '$lib/icons/index.js';
	import { slide } from 'svelte/transition';

	export type FabAction = {
		icon: IconData;
		label?: string;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		href?: string;
		target?: '_blank' | '_self' | '_parent' | '_top';
		onclick?: () => void;
	};

	type Props = {
		class?: string;
		position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		icon?: IconData;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		actions?: FabAction[];
		isBlock?: boolean;
		offsetX?: string;
		offsetY?: string;
		onclick?: () => void;
		children?: Snippet;
		ariaLabel?: string;
		src?: string;
		name?: string;
		alt?: string;
		status?: 'online' | 'offline' | 'busy' | 'away';
		isBordered?: boolean;
	};

	const {
		class: className,
		position = 'bottom-right',
		icon = Add24RegularIcon,
		color = 'primary',
		variant = 'solid',
		size = 'lg',
		actions = [],
		isBlock = false,
		offsetX,
		offsetY,
		onclick,
		children,
		ariaLabel,
		src,
		name,
		alt,
		status,
		isBordered
	}: Props = $props();

	let isOpen = $state(false);

	const positionClasses = {
		'top-left': 'is-top-left',
		'top-right': 'is-top-right',
		'bottom-left': 'is-bottom-left',
		'bottom-right': 'is-bottom-right'
	};

	function handleTriggerClick() {
		if (actions.length > 0) {
			isOpen = !isOpen;
		}
		onclick?.();
	}

	function handleActionClick(action: FabAction) {
		action.onclick?.();
		isOpen = false;
	}
</script>

<div
	class={cn('fab-container', positionClasses[position], !isBlock && 'is-fixed', className)}
	style:--fab-offset-x={offsetX}
	style:--fab-offset-y={offsetY}
>
	{#if isOpen && actions.length > 0}
		<div class="fab-actions" transition:slide={{ duration: 200 }}>
			{#each actions as action, index}
				<div
					class="fab-action"
					style="--fab-action-index: {index}; --fab-action-delay: {index * 50}ms"
					transition:slide={{ duration: 150, delay: index * 50 }}
				>
					{#if action.href}
						<a
							href={action.href}
							target={action.target}
							class="fab-action-link"
							onclick={() => handleActionClick(action)}
						>
							{#if action.label}
								<span class="fab-action-label">{action.label}</span>
							{/if}
							<IconButton icon={action.icon} color={action.color ?? 'muted'} {variant} size="md" />
						</a>
					{:else}
						{#if action.label}
							<span class="fab-action-label">{action.label}</span>
						{/if}
						<IconButton
							icon={action.icon}
							color={action.color ?? 'muted'}
							{variant}
							size="md"
							onclick={() => handleActionClick(action)}
						/>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	<div class="fab-trigger" class:is-open={isOpen}>
		{#if children}
			{@render children()}
		{:else}
			<Avatar
				{src}
				{name}
				{alt}
				{color}
				{variant}
				{size}
				{status}
				{isBordered}
				{icon}
				onclick={handleTriggerClick}
			/>
		{/if}
	</div>
</div>
