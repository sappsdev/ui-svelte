<script lang="ts">
	import Button from '$lib/control/Button.svelte';
	import Modal from './Modal.svelte';

	type Props = {
		open: boolean;
		title?: string;
		description?: string;
		confirmText?: string;
		cancelText?: string;
		onconfirm?: () => void;
		oncancel?: () => void;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'warning' | 'danger';
		isLoading?: boolean;
		rootClass?: string;
	};

	let {
		open = $bindable(false),
		title = 'Are you sure?',
		description = 'This action cannot be undone.',
		confirmText = 'Confirm',
		cancelText = 'Cancel',
		onconfirm,
		oncancel,
		color = 'danger',
		isLoading = false,
		rootClass
	}: Props = $props();

	function handleConfirm() {
		onconfirm?.();
	}

	function handleCancel() {
		open = false;
		oncancel?.();
	}
</script>

<Modal bind:open hideCloseButton disableOverlayClose {rootClass}>
	{#snippet header()}
		<h3 class="alert-dialog-title">{title}</h3>
	{/snippet}

	<p class="alert-dialog-description">{description}</p>

	{#snippet footer()}
		<div class="alert-dialog-actions">
			<Button variant="outlined" color="muted" onclick={handleCancel} isDisabled={isLoading}>
				{cancelText}
			</Button>
			<Button {color} onclick={handleConfirm} {isLoading}>
				{confirmText}
			</Button>
		</div>
	{/snippet}
</Modal>
