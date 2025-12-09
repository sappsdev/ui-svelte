<script lang="ts">
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		src: string;
		alt?: string;
		aspectRatio?: number;
		minWidth?: number;
		minHeight?: number;
		maxWidth?: number;
		maxHeight?: number;
		onCrop?: (croppedImage: string) => void;
		class?: string;
	};

	const {
		src,
		alt = 'Image to crop',
		aspectRatio,
		minWidth = 50,
		minHeight = 50,
		maxWidth,
		maxHeight,
		onCrop,
		class: className
	}: Props = $props();

	let canvas: HTMLCanvasElement;
	let image: HTMLImageElement;
	let containerDiv: HTMLDivElement;

	let isDragging = $state(false);
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

		const initialSize = Math.min(imageWidth, imageHeight) * 0.6;
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
			isDragging = true;
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

		if (isDragging) {
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
		isDragging = false;
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
		onCrop?.(croppedImageUrl);
	}

	function handleReset() {
		if (!imageLoaded) return;
		const initialSize = Math.min(imageWidth, imageHeight) * 0.6;
		cropWidth = aspectRatio ? initialSize : initialSize;
		cropHeight = aspectRatio ? initialSize / aspectRatio : initialSize;
		cropX = (imageWidth - cropWidth) / 2;
		cropY = (imageHeight - cropHeight) / 2;
	}
</script>

<div class={cn('image-cropper', className)}>
	<div class="image-cropper-container" bind:this={containerDiv}>
		<img
			bind:this={image}
			{src}
			{alt}
			class="image-cropper-image"
			onload={handleImageLoad}
			style="width: {imageWidth}px; height: {imageHeight}px;"
		/>

		{#if imageLoaded}
			<div class="image-cropper-overlay">
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
					style="left: {cropX}px; top: {cropY}px; width: {cropWidth}px; height: {cropHeight}px;"
					onmousedown={(e) => handleMouseDown(e)}
				>
					<div class="crop-grid">
						<div class="grid-line grid-line-v" style="left: 33.33%;"></div>
						<div class="grid-line grid-line-v" style="left: 66.66%;"></div>
						<div class="grid-line grid-line-h" style="top: 33.33%;"></div>
						<div class="grid-line grid-line-h" style="top: 66.66%;"></div>
					</div>

					<div class="resize-handle handle-nw" onmousedown={(e) => handleMouseDown(e, 'nw')}></div>
					<div class="resize-handle handle-n" onmousedown={(e) => handleMouseDown(e, 'n')}></div>
					<div class="resize-handle handle-ne" onmousedown={(e) => handleMouseDown(e, 'ne')}></div>
					<div class="resize-handle handle-e" onmousedown={(e) => handleMouseDown(e, 'e')}></div>
					<div class="resize-handle handle-se" onmousedown={(e) => handleMouseDown(e, 'se')}></div>
					<div class="resize-handle handle-s" onmousedown={(e) => handleMouseDown(e, 's')}></div>
					<div class="resize-handle handle-sw" onmousedown={(e) => handleMouseDown(e, 'sw')}></div>
					<div class="resize-handle handle-w" onmousedown={(e) => handleMouseDown(e, 'w')}></div>
				</div>
			</div>
		{/if}
	</div>

	<div class="image-cropper-controls">
		<button class="btn is-md is-outlined" onclick={handleReset}> refresh icon </button>
		<button class="btn is-md is-primary is-solid" onclick={handleCrop}> crop icon </button>
	</div>

	<canvas bind:this={canvas} class="image-cropper-canvas"></canvas>
</div>
