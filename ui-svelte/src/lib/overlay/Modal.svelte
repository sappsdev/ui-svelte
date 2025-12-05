<script lang="ts">
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
		class?: string;
		headerClass?: string;
		footerClass?: string;
		contentClass?: string;
		variant?: 'ghost' | 'surface' | 'primary' | 'secondary' | 'muted';
		disableOverlayClose?: boolean;
		hideCloseButton?: boolean;
		isSolid?: boolean;
	};

	let {
		open = $bindable(),
		onclose,
		header,
		footer,
		children,
		class: className,
		headerClass,
		contentClass,
		footerClass,
		variant = 'ghost',
		disableOverlayClose,
		hideCloseButton,
		isSolid
	}: Props = $props();

	let openContent = $state(false);

	const variants = {
		ghost: 'is-ghost',
		surface: 'is-surface',
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted'
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
				class={cn('modal', variants[variant], isSolid && 'is-solid', className)}
			>
				{#if header}
					<div class={cn('modal-header', headerClass)}>
						{@render header()}
					</div>
				{/if}
				<div class={cn('modal-content', contentClass)}>
					{@render children()}
				</div>
				{#if footer}
					<div class={cn('modal-footer', footerClass)}>
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
		{/if}
	</div>
{/if}
