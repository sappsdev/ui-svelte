<script lang="ts">
	import type { IconData } from '$lib/display/Icon.svelte';
	import {
		ImageAddRegularIcon,
		ArrowResetRegularIcon,
		CropRegularIcon,
		Dismiss24RegularIcon
	} from '$lib/icons/index.js';
	import { Icon, IconButton, Modal, Button } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		src?: string;
		alt?: string;
		aspectRatio?: number;
		minWidth?: number;
		minHeight?: number;
		maxWidth?: number;
		maxHeight?: number;
		accept?: string;
		placeholder?: string;
		icon?: IconData;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		shape?: 'circle' | 'square';
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft' | 'outlined' | 'ghost';
		disabled?: boolean;
		onCrop?: (croppedImage: string) => void;
		onChange?: (file: File | null) => void;
		class?: string;
		name?: string;
		label?: string;
		helpText?: string;
		errorText?: string;
	};

	const {
		src: initialSrc,
		alt = 'Avatar',
		aspectRatio,
		minWidth = 50,
		minHeight = 50,
		maxWidth,
		maxHeight,
		accept = 'image/*',
		placeholder = 'Upload',
		icon = ImageAddRegularIcon,
		size = 'md',
		shape = 'circle',
		color = 'muted',
		variant = 'soft',
		disabled = false,
		onCrop,
		onChange,
		class: className,
		name,
		label,
		helpText,
		errorText
	}: Props = $props();

	const uid = $props.id();

	let canvas = $state<HTMLCanvasElement>();
	let image = $state<HTMLImageElement>();
	let containerDiv = $state<HTMLDivElement>();
	let fileInput = $state<HTMLInputElement>();

	// svelte-ignore state_referenced_locally
	let currentSrc = $state(initialSrc || '');
	// svelte-ignore state_referenced_locally
	let croppedSrc = $state(initialSrc || '');
	let uploadedFile = $state<File | null>(null);

	let showModal = $state(false);

	let isCropDragging = $state(false);
	let isResizing = $state(false);
	let resizeHandle = $state<string>('');

	let cropX = $state(0);
	let cropY = $state(0);
	let cropWidth = $state(200);
	let cropHeight = $state(200);

	let startX = $state(0);
	let startY = $state(0);
	let startCropX = $state(0);
	let startCropY = $state(0);
	let startCropWidth = $state(0);
	let startCropHeight = $state(0);

	let imageLoaded = $state(false);
	let imageWidth = $state(0);
	let imageHeight = $state(0);
	let scale = $state(1);

	const sizeClasses = {
		xs: 'is-xs',
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg',
		xl: 'is-xl'
	};

	const colorClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning'
	};

	const variantClasses = {
		solid: 'is-solid',
		soft: 'is-soft',
		outlined: 'is-outlined',
		ghost: 'is-ghost'
	};

	$effect(() => {
		if (initialSrc && initialSrc !== currentSrc) {
			currentSrc = initialSrc;
			croppedSrc = initialSrc;
			imageLoaded = false;
		}
	});

	function handleFiles(fileList: FileList | null) {
		if (!fileList || fileList.length === 0 || disabled) return;

		const file = fileList[0];
		if (!file.type.startsWith('image/')) return;

		if (uploadedFile && currentSrc.startsWith('blob:')) {
			URL.revokeObjectURL(currentSrc);
		}

		uploadedFile = file;
		currentSrc = URL.createObjectURL(file);
		imageLoaded = false;
		onChange?.(file);

		showModal = true;
	}

	function handleImageLoad() {
		if (!image || !containerDiv) return;

		const containerWidth = containerDiv.clientWidth;
		const containerHeight = containerDiv.clientHeight;

		const naturalWidth = image.naturalWidth;
		const naturalHeight = image.naturalHeight;

		const scaleX = containerWidth / naturalWidth;
		const scaleY = containerHeight / naturalHeight;
		scale = Math.min(scaleX, scaleY, 1);

		imageWidth = naturalWidth * scale;
		imageHeight = naturalHeight * scale;

		const initialSize = Math.min(imageWidth, imageHeight) * 0.8;
		cropWidth = aspectRatio ? initialSize : initialSize;
		cropHeight = aspectRatio ? initialSize / aspectRatio : initialSize;
		cropX = (imageWidth - cropWidth) / 2;
		cropY = (imageHeight - cropHeight) / 2;

		imageLoaded = true;
	}

	function handleMouseDown(e: MouseEvent, handle?: string) {
		e.preventDefault();
		e.stopPropagation();

		if (handle) {
			isResizing = true;
			resizeHandle = handle;
		} else {
			isCropDragging = true;
		}

		startX = e.clientX;
		startY = e.clientY;
		startCropX = cropX;
		startCropY = cropY;
		startCropWidth = cropWidth;
		startCropHeight = cropHeight;

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseMove(e: MouseEvent) {
		const deltaX = e.clientX - startX;
		const deltaY = e.clientY - startY;

		if (isCropDragging) {
			cropX = Math.max(0, Math.min(imageWidth - cropWidth, startCropX + deltaX));
			cropY = Math.max(0, Math.min(imageHeight - cropHeight, startCropY + deltaY));
		} else if (isResizing) {
			let newWidth = startCropWidth;
			let newHeight = startCropHeight;
			let newX = startCropX;
			let newY = startCropY;

			if (resizeHandle.includes('e')) {
				newWidth = Math.max(minWidth, Math.min(imageWidth - startCropX, startCropWidth + deltaX));
			}
			if (resizeHandle.includes('w')) {
				newWidth = Math.max(minWidth, startCropWidth - deltaX);
				newX = startCropX + (startCropWidth - newWidth);
			}
			if (resizeHandle.includes('s')) {
				newHeight = Math.max(
					minHeight,
					Math.min(imageHeight - startCropY, startCropHeight + deltaY)
				);
			}
			if (resizeHandle.includes('n')) {
				newHeight = Math.max(minHeight, startCropHeight - deltaY);
				newY = startCropY + (startCropHeight - newHeight);
			}

			if (aspectRatio) {
				if (resizeHandle.includes('e') || resizeHandle.includes('w')) {
					newHeight = newWidth / aspectRatio;
				} else {
					newWidth = newHeight * aspectRatio;
				}
			}

			if (maxWidth) newWidth = Math.min(newWidth, maxWidth);
			if (maxHeight) newHeight = Math.min(newHeight, maxHeight);

			cropWidth = newWidth;
			cropHeight = newHeight;
			cropX = Math.max(0, Math.min(imageWidth - cropWidth, newX));
			cropY = Math.max(0, Math.min(imageHeight - cropHeight, newY));
		}
	}

	function handleMouseUp() {
		isCropDragging = false;
		isResizing = false;
		resizeHandle = '';
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	}

	function handleCrop() {
		if (!canvas || !image) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const scaleX = image.naturalWidth / imageWidth;
		const scaleY = image.naturalHeight / imageHeight;

		canvas.width = cropWidth * scaleX;
		canvas.height = cropHeight * scaleY;

		ctx.drawImage(
			image,
			cropX * scaleX,
			cropY * scaleY,
			cropWidth * scaleX,
			cropHeight * scaleY,
			0,
			0,
			canvas.width,
			canvas.height
		);

		const croppedImageUrl = canvas.toDataURL('image/png');
		croppedSrc = croppedImageUrl;
		onCrop?.(croppedImageUrl);
		showModal = false;
	}

	function handleReset() {
		if (!imageLoaded) return;
		const initialSize = Math.min(imageWidth, imageHeight) * 0.8;
		cropWidth = aspectRatio ? initialSize : initialSize;
		cropHeight = aspectRatio ? initialSize / aspectRatio : initialSize;
		cropX = (imageWidth - cropWidth) / 2;
		cropY = (imageHeight - cropHeight) / 2;
	}

	function handleRemoveImage() {
		if (uploadedFile && currentSrc.startsWith('blob:')) {
			URL.revokeObjectURL(currentSrc);
		}
		uploadedFile = null;
		currentSrc = '';
		croppedSrc = '';
		imageLoaded = false;
		onChange?.(null);
	}

	function openCropModal() {
		if (currentSrc && !disabled) {
			showModal = true;
		}
	}

	function closeModal() {
		showModal = false;
	}
</script>

<div class={cn('field', className)}>
	{#if label}
		<span class="field-label">{label}</span>
	{/if}

	<div class="image-cropper-wrapper">
		<input
			bind:this={fileInput}
			id={`${uid}-${name}`}
			type="file"
			hidden
			{accept}
			{disabled}
			{name}
			onchange={(e) => handleFiles((e.target as HTMLInputElement).files)}
		/>

		<button
			type="button"
			class={cn(
				'image-cropper-avatar',
				sizeClasses[size],
				colorClasses[color],
				variantClasses[variant],
				shape === 'circle' && 'is-circle',
				disabled && 'is-disabled'
			)}
			class:is-error={errorText}
			onclick={() => (croppedSrc ? openCropModal() : fileInput?.click())}
			{disabled}
		>
			{#if croppedSrc}
				<img src={croppedSrc} {alt} class="image-cropper-preview" />
				<div class="image-cropper-overlay-edit">
					<Icon icon={CropRegularIcon} />
				</div>
			{:else}
				<Icon {icon} class="image-cropper-icon" />
				<span class="image-cropper-placeholder">{placeholder}</span>
			{/if}
		</button>

		{#if croppedSrc}
			<div class="image-cropper-actions">
				<IconButton
					icon={ImageAddRegularIcon}
					variant="ghost"
					{color}
					size="sm"
					onclick={() => fileInput?.click()}
				/>
				{#if uploadedFile}
					<IconButton
						icon={Dismiss24RegularIcon}
						variant="ghost"
						color="danger"
						size="sm"
						onclick={handleRemoveImage}
					/>
				{/if}
			</div>
		{/if}
	</div>

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-danger')}>
			{errorText || helpText}
		</div>
	{/if}
</div>

<Modal bind:open={showModal} onclose={closeModal} color="surface" rootClass="image-cropper-modal">
	{#snippet header()}
		<h2 class="image-cropper-modal-title">Crop Image</h2>
	{/snippet}

	<div class="image-cropper-modal-body">
		<div class="image-cropper-container" bind:this={containerDiv}>
			<img
				bind:this={image}
				src={currentSrc}
				{alt}
				class="image-cropper-image"
				onload={handleImageLoad}
				style="width: {imageWidth}px; height: {imageHeight}px;"
			/>

			{#if imageLoaded}
				<div
					class="image-cropper-crop-overlay"
					style="width: {imageWidth}px; height: {imageHeight}px;"
				>
					<div class="overlay-top" style="height: {cropY}px;"></div>
					<div class="overlay-middle" style="top: {cropY}px; height: {cropHeight}px;">
						<div class="overlay-left" style="width: {cropX}px;"></div>
						<div
							class="overlay-right"
							style="left: {cropX + cropWidth}px; width: {imageWidth - cropX - cropWidth}px;"
						></div>
					</div>
					<div
						class="overlay-bottom"
						style="top: {cropY + cropHeight}px; height: {imageHeight - cropY - cropHeight}px;"
					></div>

					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="crop-area"
						class:is-circle={shape === 'circle'}
						style="left: {cropX}px; top: {cropY}px; width: {cropWidth}px; height: {cropHeight}px;"
						onmousedown={(e) => handleMouseDown(e)}
					>
						<div class="crop-grid">
							<div class="grid-line grid-line-v" style="left: 33.33%;"></div>
							<div class="grid-line grid-line-v" style="left: 66.66%;"></div>
							<div class="grid-line grid-line-h" style="top: 33.33%;"></div>
							<div class="grid-line grid-line-h" style="top: 66.66%;"></div>
						</div>

						<div
							class="resize-handle handle-nw"
							onmousedown={(e) => handleMouseDown(e, 'nw')}
						></div>
						<div class="resize-handle handle-n" onmousedown={(e) => handleMouseDown(e, 'n')}></div>
						<div
							class="resize-handle handle-ne"
							onmousedown={(e) => handleMouseDown(e, 'ne')}
						></div>
						<div class="resize-handle handle-e" onmousedown={(e) => handleMouseDown(e, 'e')}></div>
						<div
							class="resize-handle handle-se"
							onmousedown={(e) => handleMouseDown(e, 'se')}
						></div>
						<div class="resize-handle handle-s" onmousedown={(e) => handleMouseDown(e, 's')}></div>
						<div
							class="resize-handle handle-sw"
							onmousedown={(e) => handleMouseDown(e, 'sw')}
						></div>
						<div class="resize-handle handle-w" onmousedown={(e) => handleMouseDown(e, 'w')}></div>
					</div>
				</div>
			{/if}
		</div>

		<canvas bind:this={canvas} class="image-cropper-canvas"></canvas>
	</div>

	{#snippet footer()}
		<div class="image-cropper-modal-footer">
			<Button
				color="muted"
				variant="ghost"
				size="sm"
				onclick={handleReset}
				startIcon={ArrowResetRegularIcon}
			>
				Reset
			</Button>
			<Button color="muted" variant="outlined" size="sm" onclick={closeModal}>Cancel</Button>
			<Button
				color="primary"
				variant="solid"
				size="sm"
				onclick={handleCrop}
				startIcon={CropRegularIcon}
			>
				Apply
			</Button>
		</div>
	{/snippet}
</Modal>
