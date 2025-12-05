<script lang="ts">
	import {
		Checkmark24RegularIcon,
		Delete24RegularIcon,
		Pause24RegularIcon,
		Play24RegularIcon,
		Record24RegularIcon,
		RecordStop24RegularIcon
	} from '$lib/icons/index.js';
	import { Button, Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		class?: string;
		name: string;
		variant?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'outlined'
			| 'ghost'
			| 'success'
			| 'info'
			| 'danger'
			| 'warning';
		url?: string;
		headers?: Record<string, string>;
		onRecordingComplete?: (blob: Blob, url: string) => void;
	};

	let {
		class: className,
		name,
		variant = 'primary',
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

	let baseClasses = $derived(cn('media', variant, className));

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
			alert('No se pudo acceder al micrófono');
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

			console.log('Audio uploaded successfully');
		} catch (error) {
			console.error('Error uploading audio:', error);
			alert('Error al subir el audio');
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

	function handleToggleRecording() {
		if (!isRecording) {
			startRecording();
		} else if (isPaused) {
			resumeRecording();
		} else {
			pauseRecording();
		}
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

	function continueRecording() {
		isReviewing = false;
		isRecording = false;
		isPaused = false;
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

			for (let i = 0; i < samples; i++) {
				let sum = 0;
				for (let j = 0; j < blockSize; j++) {
					sum += Math.abs(rawData[i * blockSize + j]);
				}
				filteredData.push(sum / blockSize);
			}

			const max = Math.max(...filteredData);
			playbackWaveform = filteredData.map((value) => (value / max) * 0.8 + 0.2);

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
		<Button onclick={togglePlayback} size="md" variant="ghost">
			{#if isPlaying}
				<Icon icon={Pause24RegularIcon} />
			{:else}
				<Icon icon={Play24RegularIcon} />
			{/if}
		</Button>

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

		<span class="media-time">{formatTime(recordingTime)}</span>

		<div class="flex gap-2">
			<Button onclick={discardRecording} size="md" variant="ghost">
				<Icon icon={Delete24RegularIcon} />
			</Button>
			<Button onclick={continueRecording} size="md" variant="ghost">
				<Icon icon={Record24RegularIcon} />
			</Button>
			<Button onclick={confirmRecording} size="md" variant="ghost">
				<Icon icon={Checkmark24RegularIcon} />
			</Button>
		</div>
	{:else if !isRecording}
		<Button onclick={startRecording} size="md" variant="ghost">
			<Icon icon={Record24RegularIcon} />
		</Button>

		<div class="media-waveform">
			<div class="media-bars">
				{#each waveformBars as height}
					<div class="media-bar" style="height: {height * 100}%"></div>
				{/each}
			</div>
		</div>

		<span class="media-time">{formatTime(recordingTime)}</span>
	{:else}
		<Button onclick={handleToggleRecording} size="md" variant="ghost">
			{#if isPaused}
				<Icon icon={Play24RegularIcon} />
			{:else}
				<Icon icon={Pause24RegularIcon} />
			{/if}
		</Button>

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

		<span class="media-time">{formatTime(recordingTime)}</span>

		<Button onclick={stopRecording} size="md" variant="ghost" isLoading={isUploading}>
			<Icon icon={RecordStop24RegularIcon} />
		</Button>
	{/if}
</div>
