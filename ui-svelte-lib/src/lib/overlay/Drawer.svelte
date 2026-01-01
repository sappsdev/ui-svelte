<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { popover } from '$lib/utils/popover.js';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';
	import { Dismiss24RegularIcon } from '$lib/icons/index.js';
	import { IconButton } from '$lib/index.js';

	type Props = {
		open: boolean;
		onclose?: () => void;
		position?: 'start' | 'end' | 'top' | 'bottom';
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
		class?: string;
		headerClass?: string;
		footerClass?: string;
		bodyClass?: string;
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
		variant?: 'solid' | 'soft';
		disableOverlayClose?: boolean;
		hideCloseButton?: boolean;
	};

	let {
		open = $bindable(),
		onclose,
		position = 'start',
		header,
		footer,
		children,
		class: className,
		headerClass,
		bodyClass,
		footerClass,
		color = 'background',
		variant = 'solid',
		disableOverlayClose,
		hideCloseButton
	}: Props = $props();

	const positionClasses = {
		start: 'is-start',
		end: 'is-end',
		top: 'is-top',
		bottom: 'is-bottom'
	};

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning',
		surface: 'is-surface',
		background: 'is-background'
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
		background: 'muted'
	};

	let openDrawer = $state(false);
	let openContent = $state(false);

	const handleOverlayClick = () => {
		if (!disableOverlayClose) {
			open = false;
		}
	};

	$effect(() => {
		afterNavigate(() => {
			if (open) {
				open = false;
			}
		});
	});

	$effect(() => {
		if (open) {
			openDrawer = true;
			setTimeout(() => {
				openContent = true;
			}, 100);
		} else {
			onclose?.();
			openContent = false;
			setTimeout(() => {
				openDrawer = false;
			}, 300);
		}
	});
</script>

{#if openDrawer}
	<div transition:fade class="drawer-panel" use:popover>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="drawer-overlay" onclick={handleOverlayClick}></div>
		<div
			class={cn('drawer', positionClasses[position], variants[variant], colors[color], className)}
			class:is-active={openContent}
		>
			{#if header}
				<div class={cn('drawer-header', headerClass)}>
					{@render header()}
				</div>
			{/if}
			<div class={cn('drawer-body', bodyClass)}>
				{@render children()}
			</div>
			{#if footer}
				<div class={cn('drawer-footer', footerClass)}>
					{@render footer()}
				</div>
			{/if}
			{#if !hideCloseButton}
				<div class="drawer-btn-close">
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
	</div>
{/if}
