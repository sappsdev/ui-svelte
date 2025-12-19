<script lang="ts">
	import IconButton from '$lib/control/IconButton.svelte';
	import { Dismiss24RegularIcon } from '$lib/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { popover } from '$lib/utils/popover.js';
	import type { Snippet } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	type Props = {
		open: boolean;
		onclose?: () => void;
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
		rootClass?: string;
		headerClass?: string;
		footerClass?: string;
		contentClass?: string;
		color?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'success'
			| 'info'
			| 'warning'
			| 'danger'
			| 'surface'
			| 'default';
		variant?: 'solid' | 'soft';
		disableOverlayClose?: boolean;
		hideCloseButton?: boolean;
	};

	let {
		open = $bindable(),
		onclose,
		header,
		footer,
		children,
		rootClass,
		headerClass,
		contentClass,
		footerClass,
		color = 'default',
		variant = 'solid',
		disableOverlayClose,
		hideCloseButton
	}: Props = $props();

	let openContent = $state(false);

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning',
		surface: 'is-surface',
		default: 'is-default'
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
		danger: 'danger',
		surface: 'muted',
		default: 'muted'
	};

	const handleOverlayClick = () => {
		if (!disableOverlayClose) {
			open = false;
		}
	};

	$effect(() => {
		if (open) {
			setTimeout(() => {
				openContent = true;
			}, 20);
		} else {
			onclose?.();
			openContent = false;
		}
	});
</script>

{#if open}
	<div transition:fade class="modal-dialog" use:popover>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="modal-overlay" onclick={handleOverlayClick}></div>
		{#if openContent}
			<div
				in:scale={{ duration: 100 }}
				class={cn('modal', variants[variant], colors[color], rootClass)}
			>
				{#if header}
					<div class={cn('modal-header', headerClass)}>
						{@render header()}
					</div>
				{/if}
				<div class={cn('modal-body', contentClass)}>
					{@render children()}
				</div>
				{#if footer}
					<div class={cn('modal-footer', footerClass)}>
						{@render footer()}
					</div>
				{/if}
				{#if !hideCloseButton}
					<div class="btn-close">
						<IconButton
							icon={Dismiss24RegularIcon}
							variant={variant === 'solid' ? 'soft' : 'solid'}
							color={closeColors[color] as any}
							size="xs"
							onclick={() => (open = false)}
						/>
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/if}
