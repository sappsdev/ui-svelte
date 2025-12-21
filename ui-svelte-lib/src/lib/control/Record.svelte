<script lang="ts">
	import {
		CheckmarkCircle24RegularIcon,
		Delete24RegularIcon,
		DismissCircle24RegularIcon,
		Microphone2LinearIcon,
		PauseFilledIcon,
		PlayFilledIcon,
		RecordStop24RegularIcon
	} from '$lib/icons/index.js';
	import { IconButton } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		class?: string;
		name: string;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'soft' | 'solid';
		url?: string;
		headers?: Record<string, string>;
		onRecordingComplete?: (blob: Blob, url: string) => void;
	};

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger'
	};

	const variants = {
		soft: 'is-soft',
		solid: 'is-solid'
	};

	let {
		class: className,
		name,
		color = 'primary',
		variant = 'soft',
		url,
		headers,
		onRecordingComplete
	}: Props = $props();

	let mediaRecorder: MediaRecorder | null = null;
	let audioContext: AudioContext | null = null;
	let analyser: AnalyserNode | null = null;
	let dataArray: Uint8Array | null = null;
	let animationId: number | null = null;
	let fileInput = $state<HTMLInputElement>();

	let isRecording = $state(false);
	let isPaused = $state(false);
	let recordingTime = $state(0);
	let waveformBars = $state<number[]>(Array(50).fill(0.2));
	let audioChunks: Blob[] = [];
	let timerInterval: number | null = null;
	let isUploading = $state(false);
	let isReviewing = $state(false);
	let reviewAudioUrl: string | null = null;
	let audioElement: HTMLAudioElement | null = null;
	let isPlaying = $state(false);
	let playbackTime = $state(0);
	let playbackDuration = $state(0);
	let playbackWaveform = $state<number[]>(Array(50).fill(0.2));

	const BAR_COUNT = 50;

	let baseClasses = $derived(cn('media', colors[color], variants[variant], className));

	async function startRecording() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

			audioContext = new AudioContext();
			const source = audioContext.createMediaStreamSource(stream);
			analyser = audioContext.createAnalyser();
			analyser.fftSize = 256;
			source.connect(analyser);

			const bufferLength = analyser.frequencyBinCount;
			dataArray = new Uint8Array(bufferLength);

			mediaRecorder = new MediaRecorder(stream);
			audioChunks = [];

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					audioChunks.push(event.data);
				}
			};

			mediaRecorder.onstop = async () => {
				const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
				reviewAudioUrl = URL.createObjectURL(audioBlob);

				await analyzeRecordedAudio(audioBlob);

				isReviewing = true;

				stream.getTracks().forEach((track) => track.stop());
				if (audioContext) {
					audioContext.close();
				}
			};

			mediaRecorder.start();
			isRecording = true;
			recordingTime = 0;

			timerInterval = window.setInterval(() => {
				recordingTime += 1;
			}, 1000);

			visualize();
		} catch (error) {
			console.error('Error accessing microphone:', error);
		}
	}

	async function uploadAudio(blob: Blob) {
		if (!url) return;

		try {
			isUploading = true;
			const formData = new FormData();
			formData.append(name, blob, `${name}.webm`);

			const requestHeaders: HeadersInit = {
				...headers
			};

			const response = await fetch(url, {
				method: 'POST',
				headers: requestHeaders,
				body: formData
			});

			if (!response.ok) {
				throw new Error(`Upload failed: ${response.statusText}`);
			}
		} catch (error) {
			console.error('Error uploading audio:', error);
		} finally {
			isUploading = false;
		}
	}

	function visualize() {
		if (!analyser || !dataArray) return;

		analyser.getByteFrequencyData(dataArray as any);
		const newBars: number[] = [];
		const step = Math.floor(dataArray.length / BAR_COUNT);

		for (let i = 0; i < BAR_COUNT; i++) {
			const index = i * step;
			const value = dataArray[index] / 255;
			newBars.push(value * 0.7 + 0.15);
		}

		waveformBars = newBars;

		if (isRecording && !isPaused) {
			animationId = requestAnimationFrame(visualize);
		}
	}

	function pauseRecording() {
		if (mediaRecorder && isRecording) {
			mediaRecorder.pause();
			isPaused = true;

			if (timerInterval) {
				clearInterval(timerInterval);
			}

			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		}
	}

	function resumeRecording() {
		if (mediaRecorder && isPaused) {
			mediaRecorder.resume();
			isPaused = false;

			timerInterval = window.setInterval(() => {
				recordingTime += 1;
			}, 1000);

			visualize();
		}
	}

	function stopRecording() {
		if (mediaRecorder) {
			mediaRecorder.stop();
			isRecording = false;
			isPaused = false;

			if (timerInterval) {
				clearInterval(timerInterval);
			}

			if (animationId) {
				cancelAnimationFrame(animationId);
			}

			waveformBars = Array(50).fill(0.2);
		}
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	async function confirmRecording() {
		if (!reviewAudioUrl) return;

		try {
			const response = await fetch(reviewAudioUrl);
			const audioBlob = await response.blob();

			if (url) {
				await uploadAudio(audioBlob);
			} else {
				const file = new File([audioBlob], `${name}.webm`, { type: 'audio/webm' });
				const dataTransfer = new DataTransfer();
				dataTransfer.items.add(file);
				fileInput!.files = dataTransfer.files;

				const event = new Event('change', { bubbles: true });
				fileInput?.dispatchEvent(event);
			}

			if (onRecordingComplete) {
				onRecordingComplete(audioBlob, reviewAudioUrl);
			}

			cleanup();
		} catch (error) {
			console.error('Error confirming recording:', error);
		}
	}

	function discardRecording() {
		cleanup();
	}

	async function analyzeRecordedAudio(blob: Blob) {
		try {
			const context = new AudioContext();
			const arrayBuffer = await blob.arrayBuffer();
			const audioBuffer = await context.decodeAudioData(arrayBuffer);

			const rawData = audioBuffer.getChannelData(0);
			const samples = BAR_COUNT;
			const blockSize = Math.floor(rawData.length / samples);
			const filteredData: number[] = [];

			const samplesPerBlock = Math.min(blockSize, 500);
			const stride = Math.max(1, Math.floor(blockSize / samplesPerBlock));

			for (let i = 0; i < samples; i++) {
				let sum = 0;
				let count = 0;
				const blockStart = i * blockSize;
				const blockEnd = Math.min(blockStart + blockSize, rawData.length);

				for (let j = blockStart; j < blockEnd; j += stride) {
					sum += Math.abs(rawData[j]);
					count++;
				}
				filteredData.push(count > 0 ? sum / count : 0);
			}

			const max = Math.max(...filteredData);
			playbackWaveform = filteredData.map((value) => (max > 0 ? (value / max) * 0.8 + 0.2 : 0.5));

			await context.close();
		} catch (error) {
			console.error('Error analyzing audio:', error);
			playbackWaveform = Array(50).fill(0.5);
		}
	}

	function cleanup() {
		if (reviewAudioUrl) {
			URL.revokeObjectURL(reviewAudioUrl);
			reviewAudioUrl = null;
		}
		if (audioElement) {
			audioElement.pause();
			audioElement = null;
		}
		isReviewing = false;
		isRecording = false;
		isPaused = false;
		isPlaying = false;
		recordingTime = 0;
		playbackTime = 0;
		playbackDuration = 0;
		waveformBars = Array(50).fill(0.2);
		playbackWaveform = Array(50).fill(0.2);
		audioChunks = [];
	}

	function togglePlayback() {
		if (!reviewAudioUrl) return;

		if (!audioElement) {
			audioElement = new Audio(reviewAudioUrl);

			audioElement.addEventListener('loadedmetadata', () => {
				playbackDuration = audioElement!.duration;
			});

			audioElement.addEventListener('timeupdate', () => {
				if (audioElement) {
					playbackTime = audioElement.currentTime;
				}
			});

			audioElement.addEventListener('ended', () => {
				isPlaying = false;
				playbackTime = 0;
			});
		}

		if (isPlaying) {
			audioElement.pause();
			isPlaying = false;
		} else {
			audioElement.play();
			isPlaying = true;
		}
	}
</script>

{#if !url}
	<input type="file" bind:this={fileInput} {name} accept="audio/*" class="hidden" />
{/if}

<div class={baseClasses}>
	{#if isReviewing}
		<!-- REVIEW STATE: Play/Pause preview, waveform, time, confirm/discard -->
		<IconButton
			onclick={togglePlayback}
			icon={isPlaying ? PauseFilledIcon : PlayFilledIcon}
			{color}
			variant={variant === 'solid' ? 'soft' : 'solid'}
			size="md"
		/>

		<div class="media-content">
			<div class="media-waveform">
				<div class="media-bars">
					{#each playbackWaveform as height, i}
						{@const progress = playbackDuration > 0 ? playbackTime / playbackDuration : 0}
						{@const barPosition = (i + 0.5) / playbackWaveform.length}
						{@const isPlayed = barPosition <= progress}
						<div class="media-bar" class:active={isPlayed} style="height: {height * 100}%"></div>
					{/each}
				</div>
			</div>
			<div class="media-footer">
				<span class="media-time">{formatTime(recordingTime)}</span>
			</div>
		</div>

		<div class="flex gap-1">
			<IconButton
				onclick={discardRecording}
				icon={DismissCircle24RegularIcon}
				color="danger"
				variant="ghost"
				size="sm"
			/>
			<IconButton
				onclick={confirmRecording}
				icon={CheckmarkCircle24RegularIcon}
				color="success"
				variant="ghost"
				size="sm"
				isLoading={isUploading}
			/>
		</div>
	{:else if !isRecording}
		<!-- IDLE STATE: Start recording button -->
		<IconButton
			onclick={startRecording}
			icon={Microphone2LinearIcon}
			{color}
			variant={variant === 'solid' ? 'soft' : 'solid'}
			size="md"
		/>

		<div class="media-content">
			<div class="media-waveform">
				<div class="media-bars">
					{#each waveformBars as height}
						<div class="media-bar" style="height: {height * 100}%"></div>
					{/each}
				</div>
			</div>
			<div class="media-footer">
				<span class="media-time">{formatTime(recordingTime)}</span>
			</div>
		</div>
	{:else}
		<!-- RECORDING STATE: Pause/Resume, waveform, time, discard, stop -->
		{#if isPaused}
			<IconButton
				onclick={resumeRecording}
				icon={PlayFilledIcon}
				{color}
				variant={variant === 'solid' ? 'soft' : 'solid'}
				size="md"
			/>
		{:else}
			<IconButton
				onclick={pauseRecording}
				icon={PauseFilledIcon}
				{color}
				variant={variant === 'solid' ? 'soft' : 'solid'}
				size="md"
			/>
		{/if}

		<div class="media-content">
			<div class="media-waveform">
				<div class="media-bars">
					{#each waveformBars as height}
						<div
							class="media-bar"
							class:recording={isRecording && !isPaused}
							style="height: {height * 100}%"
						></div>
					{/each}
				</div>
			</div>
			<div class="media-footer">
				<span class="media-time">{formatTime(recordingTime)}</span>
			</div>
		</div>

		<div class="flex gap-1">
			<IconButton
				onclick={discardRecording}
				icon={Delete24RegularIcon}
				color="danger"
				variant="ghost"
				size="sm"
			/>
			<IconButton
				onclick={stopRecording}
				icon={RecordStop24RegularIcon}
				{color}
				variant="ghost"
				size="sm"
			/>
		</div>
	{/if}
</div>
