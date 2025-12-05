<script lang="ts">
	import { Pause24RegularIcon, Play24RegularIcon } from '$lib/icons/index.js';
	import { Button, Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		class?: string;
		src: string;
		variant?:
			| 'primary'
			| 'secondary'
			| 'soft'
			| 'outlined'
			| 'ghost'
			| 'success'
			| 'info'
			| 'danger'
			| 'warning';
	};

	let { class: className, src, variant = 'success' }: Props = $props();

	let audio: HTMLAudioElement;
	let currentTime = $state(0);
	let duration = $state(0);
	let isPlaying = $state(false);
	let waveformData = $state<number[]>([]);
	let isAnalyzing = $state(true);
	let isDragging = $state(false);

	const BAR_COUNT = 50;

	let baseClasses = $derived(cn('media', variant, className));

	async function analyzeAudio() {
		try {
			const audioContext = new AudioContext();
			const response = await fetch(src);
			const arrayBuffer = await response.arrayBuffer();
			const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

			const rawData = audioBuffer.getChannelData(0);
			const samples = BAR_COUNT;
			const blockSize = Math.floor(rawData.length / samples);
			const filteredData: number[] = [];

			for (let i = 0; i < samples; i++) {
				let sum = 0;
				for (let j = 0; j < blockSize; j++) {
					sum += Math.abs(rawData[i * blockSize + j]);
				}
				filteredData.push(sum / blockSize);
			}

			const max = Math.max(...filteredData);
			waveformData = filteredData.map((value) => (value / max) * 0.8 + 0.2);
			isAnalyzing = false;

			await audioContext.close();
		} catch (error) {
			console.error('Error analyzing audio:', error);
			waveformData = Array.from({ length: BAR_COUNT }, () => Math.random() * 0.6 + 0.4);
			isAnalyzing = false;
		}
	}

	function togglePlay() {
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
		isPlaying = !isPlaying;
	}

	function handleLoadedMetadata() {
		duration = audio.duration;
	}

	function handleCanPlay() {
		if (duration === 0 && audio.duration) {
			duration = audio.duration;
		}
	}

	function handleDurationChange() {
		if (audio.duration) {
			duration = audio.duration;
		}
	}

	function handleTimeUpdate() {
		if (!isDragging) {
			currentTime = audio.currentTime;
		}
	}

	function handleEnded() {
		isPlaying = false;
	}

	function seek(clientX: number, element: HTMLElement) {
		if (duration === 0) return;
		const rect = element.getBoundingClientRect();
		const x = clientX - rect.left;
		const percentage = Math.max(0, Math.min(1, x / rect.width));
		const newTime = percentage * duration;
		audio.currentTime = newTime;
		currentTime = newTime;
	}

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		seek(event.clientX, event.currentTarget as HTMLElement);
	}

	function handleMouseMove(event: MouseEvent) {
		if (isDragging) {
			const waveformEl = document.querySelector('.media-waveform') as HTMLElement;
			if (waveformEl) {
				seek(event.clientX, waveformEl);
			}
		}
	}

	function handleMouseUp() {
		isDragging = false;
	}

	function formatTime(seconds: number): string {
		if (!isFinite(seconds)) return '0:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	$effect(() => {
		analyzeAudio();
	});

	$effect(() => {
		if (audio) {
			audio.addEventListener('loadedmetadata', handleLoadedMetadata);
			audio.addEventListener('canplay', handleCanPlay);
			audio.addEventListener('durationchange', handleDurationChange);
			audio.addEventListener('timeupdate', handleTimeUpdate);
			audio.addEventListener('ended', handleEnded);

			if (audio.duration && audio.duration > 0) {
				duration = audio.duration;
			}

			return () => {
				audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
				audio.removeEventListener('canplay', handleCanPlay);
				audio.removeEventListener('durationchange', handleDurationChange);
				audio.removeEventListener('timeupdate', handleTimeUpdate);
				audio.removeEventListener('ended', handleEnded);
			};
		}
	});

	$effect(() => {
		if (isDragging) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);

			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
				window.removeEventListener('mouseup', handleMouseUp);
			};
		}
	});
</script>

<div class={baseClasses}>
	<audio bind:this={audio} {src}></audio>

	<Button onclick={togglePlay} size="md" variant="ghost">
		{#if isPlaying}
			<Icon icon={Pause24RegularIcon} />
		{:else}
			<Icon icon={Play24RegularIcon} />
		{/if}
	</Button>

	<div
		class="media-waveform clickable"
		onmousedown={handleMouseDown}
		role="slider"
		tabindex="0"
		aria-label="Posición del audio"
		aria-valuenow={Math.round((currentTime / duration) * 100) || 0}
		aria-valuemin="0"
		aria-valuemax="100"
	>
		{#if isAnalyzing}
			<div class="media-loading">Analizando...</div>
		{:else}
			<div class="media-bars">
				{#each waveformData as height, i}
					{@const progress = duration > 0 ? currentTime / duration : 0}
					{@const barPosition = (i + 0.5) / waveformData.length}
					{@const isPlayed = barPosition <= progress}
					<div class="media-bar" class:active={isPlayed} style="height: {height * 100}%"></div>
				{/each}
			</div>
		{/if}
	</div>

	<span class="media-time">{duration > 0 ? formatTime(duration - currentTime) : '0:00'}</span>
</div>
