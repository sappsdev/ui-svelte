<script lang="ts">
	import { Record, Card, Checkbox, Code, Section, Divider, Select, TextField } from 'ui-svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'outline', label: 'Outline' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	let selectedVariant: any = $state('primary');
	let recordName = $state('voice-recording');
	let uploadUrl = $state('');
	let useUploadUrl = $state(false);

	let hasProps = $derived([selectedVariant !== 'primary', useUploadUrl].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Record } from 'ui-svelte';`,
			`\n\tconst handleRecordingComplete = (blob: Blob, url: string) => {`,
			`\t\tconsole.log('Recording complete:', { blob, url });`,
			`\t\t// Do something with the audio blob or URL`,
			`\t};`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<Record`,
			hasProps && `\tname="${recordName}"`,
			selectedVariant !== 'solid' && `\tvariant="${selectedVariant}"`,
			useUploadUrl && uploadUrl && `\turl="${uploadUrl}"`,
			hasProps && `\tonRecordingComplete={handleRecordingComplete}`,
			hasProps && `/>`,
			!hasProps && `<Record name="${recordName}" onRecordingComplete={handleRecordingComplete} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const handleRecordingComplete = (blob: Blob, url: string) => {
		console.log('Recording complete:', { blob, url });
	};
</script>

<Section>
	<div class="prose">
		<h1>Record</h1>
		<p>
			The Record component provides an audio recording interface with real-time waveform
			visualization, allowing users to record, pause, resume, and save audio clips.
		</p>
	</div>
</Section>

<Section>
	<Card>
		<div class="column lg:row w-full gap-3">
			<div class="column flex-1">
				<h4>Preview</h4>
				<div class="column center gap-4 flex-1 p-4">
					<div class="w-full max-w-2xl">
						<Record
							name={recordName}
							variant={selectedVariant}
							url={useUploadUrl && uploadUrl ? uploadUrl : undefined}
							onRecordingComplete={handleRecordingComplete}
						/>
						<p class="text-sm mt-4">
							Click the record button to start recording. Use pause/resume controls while recording,
							and stop to save the audio.
						</p>
					</div>
				</div>
			</div>
			<Divider class="invisible lg:visible" vertical />
			<Divider class="lg:hidden" />
			<div class="column gap-3 min-w-64">
				<h4>Builder</h4>

				<TextField
					label="Name"
					name="record_name"
					size="sm"
					type="text"
					bind:value={recordName}
					placeholder="voice-recording"
				/>

				<Select
					label="Variant"
					name="variant"
					size="sm"
					options={variantOptions}
					bind:value={selectedVariant}
				/>

				<div class="flex flex-col gap-2">
					<h6>Upload Options</h6>
					<Checkbox bind:checked={useUploadUrl} name="use-upload-url" label="Enable Upload URL" />
					{#if useUploadUrl}
						<TextField
							label="Upload URL"
							name="upload_url"
							size="sm"
							type="url"
							bind:value={uploadUrl}
							placeholder="https://api.example.com/upload"
						/>
					{/if}
				</div>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Code lang="svelte" code={code()} />
</Section>

<Section>
	<div class="prose">
		<h3>Props</h3>
		<p>The Record component accepts the following props:</p>
		<ul>
			<li><code>name</code> - Input name attribute for the audio file (required)</li>
			<li><code>variant</code> - Visual style: solid or soft (default: solid)</li>
			<li>
				<code>color</code> - Color theme: default, surface, primary, secondary, error, or muted (default:
				error)
			</li>
			<li>
				<code>url</code> - Optional upload URL. If provided, the audio will be uploaded via POST request
			</li>
			<li>
				<code>headers</code> - Optional headers to include in the upload request (e.g., authentication)
			</li>
			<li>
				<code>onRecordingComplete</code> - Callback function called when recording is complete. Receives
				the audio Blob and object URL
			</li>
			<li><code>class</code> - Additional CSS classes to apply</li>
		</ul>

		<h3>Features</h3>
		<ul>
			<li>
				<strong>Real-time Waveform</strong> - Visual feedback during recording with animated waveform
			</li>
			<li><strong>Pause/Resume</strong> - Pause and resume recording without losing progress</li>
			<li><strong>Timer</strong> - Shows recording duration in MM:SS format</li>
			<li>
				<strong>Dual Mode</strong> - Can either upload to a server or save to a hidden file input
			</li>
			<li><strong>WebM Format</strong> - Recordings are saved in WebM format</li>
		</ul>

		<h3>Example Usage</h3>
		<p>Basic usage with local file input:</p>
		<Code
			lang="svelte"
			code={`<Record
	name="voice-message"
	onRecordingComplete={(blob, url) => {
		console.log('Audio recorded:', blob);
	}}
/>`}
		/>

		<p>With upload to server:</p>
		<Code
			lang="svelte"
			code={`<Record
	name="audio-file"
	url="https://api.example.com/upload"
	headers={{ Authorization: 'Bearer token123' }}
	variant="soft"
	color="primary"
	onRecordingComplete={(blob, url) => {
		console.log('Audio uploaded');
	}}
/>`}
		/>

		<h3>Browser Permissions</h3>
		<p>
			This component requires microphone access. The browser will prompt the user for permission on
			first use. Make sure your site is served over HTTPS for microphone access to work.
		</p>
	</div>
</Section>
