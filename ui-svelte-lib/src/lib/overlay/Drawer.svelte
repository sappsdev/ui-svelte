<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { popover } from '$lib/utils/popover.js';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';
	import { Dismiss24RegularIcon } from '$lib/icons/index.js';
	import { Icon } from '$lib/index.js';

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
		variant?: 'ghost' | 'surface' | 'primary' | 'secondary' | 'muted';
		disableOverlayClose?: boolean;
		hideCloseButton?: boolean;
		isSolid?: boolean;
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
		variant = 'ghost',
		disableOverlayClose,
		hideCloseButton,
		isSolid
	}: Props = $props();

	const positionClasses = {
		start: 'is-start',
		end: 'is-end',
		top: 'is-top',
		bottom: 'is-bottom'
	};

	const variants = {
		ghost: 'is-ghost',
		surface: 'is-surface',
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted'
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
			class={cn(
				'drawer',
				positionClasses[position],
				variants[variant],
				isSolid && 'is-solid',
				className
			)}
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
				<div class="btn-close">
					<button onclick={() => (open = false)}>
						<Icon icon={Dismiss24RegularIcon} class="btn-close-icon" />
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}
