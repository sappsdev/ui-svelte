<script lang="ts">
	import { slide } from 'svelte/transition';

	import { Icon, toast } from '$lib/index.js';
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
		isSolid?: boolean;
	};

	const { class: className, position = 'bottom-left', isSolid, showIcon }: Props = $props();

	const positionClasses = {
		'top-left': 'is-top-left',
		'top-right': 'is-top-right',
		'bottom-left': 'is-bottom-left',
		'bottom-right': 'is-bottom-right'
	};

	const status = {
		info: 'is-info',
		success: 'is-success',
		warning: 'is-warning',
		danger: 'is-danger'
	};

	const icons = {
		info: 'fluent:error-circle-24-regular',
		success: 'fluent:checkmark-circle-24-regular',
		warning: 'fluent:warning-24-regular',
		danger: 'fluent:block-24-regular'
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
				class={cn('toast', status[message.status], (message.isSolid || isSolid) && 'is-solid')}
				style="--toast-index: {index}; --toast-total: {toast.messages.length}"
			>
				{#if showIcon}
					{#if message.status === 'info'}
						<Icon icon={Info24RegularIcon} class="toast-icon" />
					{:else if message.status === 'success'}
						<Icon icon={CheckmarkCircle24RegularIcon} class="toast-icon" />
					{:else if message.status === 'warning'}
						<Icon icon={Warning24RegularIcon} class="toast-icon" />
					{:else if message.status === 'danger'}
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
					<button onclick={() => toast.close(message.id)}>
						<Icon icon={Dismiss24RegularIcon} class="btn-close-icon" />
					</button>
				</div>
			</div>
		{/each}
	</div>
{/if}
