<script lang="ts">
	import { slide } from 'svelte/transition';

	import { Icon, IconButton, toast } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { popover } from '$lib/utils/popover.js';
	import {
		CheckmarkCircle24RegularIcon,
		Dismiss24RegularIcon,
		DismissCircle24RegularIcon,
		Info24RegularIcon,
		Warning24RegularIcon
	} from '$lib/icons/index.js';

	type Props = {
		class?: string;
		position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		showIcon?: boolean;
		variant?: 'solid' | 'soft';
	};

	const {
		class: className,
		position = 'bottom-left',
		variant = 'solid',
		showIcon
	}: Props = $props();

	const positionClasses = {
		'top-left': 'is-top-left',
		'top-right': 'is-top-right',
		'bottom-left': 'is-bottom-left',
		'bottom-right': 'is-bottom-right'
	};

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		info: 'is-info',
		success: 'is-success',
		warning: 'is-warning',
		danger: 'is-danger'
	};

	const variants = {
		solid: 'is-solid',
		soft: 'is-soft'
	};

	const closeColors = {
		primary: 'primary',
		secondary: 'secondary',
		muted: 'muted',
		success: 'success',
		info: 'info',
		warning: 'warning',
		danger: 'danger'
	};
</script>

{#if toast.messages.length > 0}
	<div
		use:popover
		transition:slide
		class={cn('toast-container', positionClasses[position], className)}
	>
		{#each toast.messages as message, index (message.id)}
			<div
				transition:slide
				class={cn(
					'toast',
					colors[message.color],
					message.variant ? variants[message.variant] : variants[variant]
				)}
				style="--toast-index: {index}; --toast-total: {toast.messages.length}"
			>
				{#if showIcon}
					{#if message.color === 'info'}
						<Icon icon={Info24RegularIcon} class="toast-icon" />
					{:else if message.color === 'success'}
						<Icon icon={CheckmarkCircle24RegularIcon} class="toast-icon" />
					{:else if message.color === 'warning'}
						<Icon icon={Warning24RegularIcon} class="toast-icon" />
					{:else if message.color === 'danger'}
						<Icon icon={DismissCircle24RegularIcon} class="toast-icon" />
					{/if}
				{/if}
				<div class="toast-content">
					{#if message.title}
						<div class="toast-title">{message.title}</div>
					{/if}
					<div class="toast-description">{message.description}</div>
				</div>
				<div class="btn-close">
					<IconButton
						icon={Dismiss24RegularIcon}
						variant={variant === 'solid' ? 'soft' : 'solid'}
						color={closeColors[message.color] as any}
						size="xs"
						onclick={() => toast.close(message.id)}
					/>
				</div>
			</div>
		{/each}
	</div>
{/if}
