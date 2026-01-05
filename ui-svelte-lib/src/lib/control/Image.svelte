<script lang="ts">
	import {
		MaximizeSquareMinimalisticLinearIcon,
		ArrowDownloadRegularIcon
	} from '$lib/icons/index.js';
	import { IconButton } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		src: string;
		alt?: string;
		aspect?: 'horizontal' | 'vertical' | 'square' | 'auto';
		class?: string;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'warning' | 'danger';
		hideControls?: boolean;
		loading?: 'lazy' | 'eager';
		objectFit?: 'cover' | 'contain' | 'fill' | 'none';
	};

	let {
		src,
		alt = '',
		aspect = 'auto',
		class: className,
		color = 'primary',
		hideControls = false,
		loading = 'lazy',
		objectFit = 'cover'
	}: Props = $props();

	let showControls = $state(false);
	let isLoading = $state(true);
	let hasError = $state(false);

	const handleMouseEnter = () => {
		showControls = true;
	};

	const handleMouseLeave = () => {
		showControls = false;
	};

	const handleLoad = () => {
		isLoading = false;
	};

	const handleError = () => {
		isLoading = false;
		hasError = true;
	};

	const handleToggleMaximize = () => {
		const containerElement = document.querySelector('.image');

		if (!document.fullscreenElement) {
			if (containerElement?.requestFullscreen) {
				containerElement.requestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	};

	const handleDownload = async () => {
		try {
			const response = await fetch(src);
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = alt || 'image';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Download error:', error);
		}
	};
</script>

<div
	class={cn('image', aspect, `fit-${objectFit}`, className)}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	role="img"
	aria-label={alt}
>
	{#if isLoading}
		<div class="image-skeleton"></div>
	{/if}

	{#if hasError}
		<div class="image-error">
			<span>Failed to load image</span>
		</div>
	{:else}
		<img {src} {alt} {loading} onload={handleLoad} onerror={handleError} class="image-element" />
	{/if}

	{#if !hideControls && !hasError}
		<div class={cn('image-controls', showControls ? 'visible' : 'invisible')}>
			<div class="image-actions">
				<IconButton
					onclick={handleDownload}
					icon={ArrowDownloadRegularIcon}
					{color}
					variant="overlay"
					size="sm"
					ariaLabel="Download image"
				/>
				<IconButton
					onclick={handleToggleMaximize}
					icon={MaximizeSquareMinimalisticLinearIcon}
					{color}
					variant="overlay"
					size="sm"
					ariaLabel="Toggle fullscreen"
				/>
			</div>
		</div>
	{/if}
</div>
