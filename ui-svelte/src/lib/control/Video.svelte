<script lang="ts">
	import {
		MaximizeSquareMinimalisticLinearIcon,
		Pause24RegularIcon,
		PictureInPicture24RegularIcon,
		Play24RegularIcon,
		Speaker24RegularIcon,
		SpeakerMute24RegularIcon
	} from '$lib/icons/index.js';
	import { Icon, Slider } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import Hls from 'hls.js';

	type Props = {
		src: string;
		autoplay?: boolean;
		poster?: string;
		aspect?: 'horizontal' | 'vertical' | 'square';
		class?: string;
	};

	let { src, poster, autoplay, aspect = 'horizontal', class: className }: Props = $props();

	let videoElement: HTMLVideoElement | null = $state(null);

	let showControls = $state(false);
	let showVolume = $state(false);
	let videoParams = $state({
		src,
		time: 0,
		duration: 0,
		formattedTime: '00:00',
		formattedDuration: '00:00',
		controls: true,
		muted: false,
		paused: false,
		volume: 1
	});

	const setSource = () => {
		if (src.includes('.m3u8')) {
			if (Hls.isSupported() && videoElement) {
				const hls = new Hls();
				hls.loadSource(src);
				hls.attachMedia(videoElement);
				hls.on(Hls.Events.MANIFEST_PARSED, () => {
					if (autoplay) {
						videoElement?.play();
					}
				});
			} else if (videoElement?.canPlayType('application/vnd.apple.mpegurl')) {
				videoElement.src = src;
			}
		} else {
			if (!videoElement) return;
			videoElement.src = src;
		}
	};

	const handleMouseEnter = () => {
		if (showControls) return;
		showControls = true;
		setTimeout(() => {
			showControls = false;
		}, 5000);
	};

	const togglePlay = () => {
		if (videoElement?.paused) {
			videoElement.play();
		} else {
			videoElement?.pause();
		}
	};
	const toggleMute = () => {
		if (!videoElement) return;
		videoElement.muted = !videoElement.muted;
		localStorage.setItem('video-muted', videoElement.muted.toString());
	};

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs < 10 ? '0' + secs : secs}`;
	};

	const handleToggleMaximize = () => {
		const containerElement = document.querySelector('.video');

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

	const handleTogglePip = async () => {
		if (!document.pictureInPictureEnabled) return;

		try {
			if (document.pictureInPictureElement === videoElement) {
				await document.exitPictureInPicture();
			} else {
				await videoElement?.requestPictureInPicture();
			}
		} catch (error) {
			console.error('PiP error:', error);
		}
	};

	$effect(() => {
		if (localStorage.getItem('video-muted') === 'true') {
			videoParams.muted = true;
		}
	});

	$effect(() => {
		if (localStorage.getItem('video-volume')) {
			videoParams.volume = parseFloat(localStorage.getItem('video-volume') || '1');
		}
	});

	$effect(() => {
		videoParams.formattedTime = formatTime(videoParams.time);
		videoParams.formattedDuration = formatTime(videoParams.duration);
	});

	$effect(() => {
		setSource();
	});
</script>

<svelte:window onmousemove={handleMouseEnter} />

<div class={cn('video', aspect, className)}>
	<!-- svelte-ignore component_name_lowercase -->
	<video
		bind:this={videoElement}
		bind:currentTime={videoParams.time}
		bind:duration={videoParams.duration}
		bind:paused={videoParams.paused}
		bind:muted={videoParams.muted}
		bind:volume={videoParams.volume}
		class="rounded-lg"><track kind="captions" /></video
	>
	{#if poster && videoParams.paused && videoElement.currentTime === 0}
		<img src={poster} class="video-poster rounded-md" alt="poster" />
	{/if}

	<button onclick={togglePlay} aria-label="Play" class="video-control-play"></button>
	<div class="video-controls">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<div class={cn('video-control-actions', showControls ? 'visible' : 'invisible')}>
			<div class="video-actions-start">
				<button class="video-btn" onclick={togglePlay}>
					{#if videoParams.paused}
						<Icon icon={Play24RegularIcon} class="video-btn-icon" />
					{:else}
						<Icon icon={Pause24RegularIcon} class="video-btn-icon" />
					{/if}
				</button>
				<div class="video-btn">
					<span class="video-duration-info"
						>{videoParams.formattedTime} / {videoParams.formattedDuration}</span
					>
				</div>
			</div>
			<div class="video-actions-end">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="video-volume-wrapper"
					onmouseenter={() => (showVolume = true)}
					onmouseleave={() => (showVolume = false)}
				>
					{#if !videoParams.muted && showVolume}
						<div class="video-volume">
							<Slider
								bind:value={videoParams.volume}
								onchange={(value: number) => {
									localStorage.setItem('video-volume', String(value));
								}}
								min={0}
								max={1}
								step={0.1}
								size="sm"
								name="video-volume"
								hideLabel
							/>
						</div>
					{/if}
					<button class="video-btn" onclick={toggleMute}>
						{#if videoParams.muted}
							<Icon icon={Speaker24RegularIcon} class="video-btn-icon" />
						{:else}
							<Icon icon={SpeakerMute24RegularIcon} class="video-btn-icon" />
						{/if}
					</button>
				</div>
				<button class="video-btn" onclick={handleTogglePip}>
					<Icon icon={PictureInPicture24RegularIcon} class="video-btn-icon" />
				</button>
				<button class="video-btn" onclick={handleToggleMaximize}>
					<Icon icon={MaximizeSquareMinimalisticLinearIcon} class="video-btn-icon" />
				</button>
			</div>
		</div>
		<div class={cn('video-control-progress', showControls ? 'visible' : 'invisible')}>
			<Slider
				min={0}
				size="sm"
				max={videoParams.duration}
				bind:value={videoParams.time}
				name="video-time"
				hideLabel
			/>
		</div>
	</div>
</div>
