<script lang="ts">
	import { Audio, Card, Code, Section, Divider, Select, TextField } from 'ui-svelte';

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
	let audioSrc = $state('https://cdn.pixabay.com/audio/2022/04/25/audio_5d61b5204f.mp3');

	let hasProps = $derived([selectedVariant !== 'primary'].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [`<script lang="ts">`, `\timport { Audio } from 'ui-svelte';`, `<\/script>`];

		const componentLines = [
			hasProps && `<Audio`,
			hasProps && `\tsrc="${audioSrc}"`,
			selectedVariant !== 'solid' && `\tvariant="${selectedVariant}"`,
			hasProps && `/>`,
			!hasProps && `<Audio src="${audioSrc}" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});
</script>

<Section>
	<div class="prose">
		<h1>Audio</h1>
		<p>
			Audio players provide a custom-styled interface for playing audio files with controls for
			play, pause, volume, and progress tracking.
		</p>
	</div>
</Section>

<Section>
	<Card>
		<div class="column lg:row w-full gap-3">
			<div class="column flex-1">
				<h4>Preview</h4>
				<div class="column center gap-4 flex-1 p-4">
					<div class="w-full max-w-md">
						<Audio src={audioSrc} variant={selectedVariant} />
					</div>
				</div>
			</div>
			<Divider class="invisible lg:visible" vertical />
			<Divider class="lg:hidden" />
			<div class="column gap-3 min-w-64">
				<h4>Builder</h4>

				<TextField
					label="Audio URL"
					name="audio_src"
					size="sm"
					type="url"
					bind:value={audioSrc}
					placeholder="https://example.com/audio.mp3"
				/>

				<Select
					label="Variant"
					name="variant"
					size="sm"
					options={variantOptions}
					bind:value={selectedVariant}
				/>
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
		<p>The Audio component accepts the following props:</p>
		<ul>
			<li><code>src</code> - URL of the audio file to play (required)</li>
			<li><code>variant</code> - Visual style: solid or soft (default: solid)</li>
			<li>
				<code>color</code> - Color theme: default, surface, primary, secondary, success, or muted (default:
				default)
			</li>
			<li><code>class</code> - Additional CSS classes to apply</li>
		</ul>

		<h3>Example Usage</h3>
		<p>Basic usage with minimal props:</p>
		<Code
			lang="svelte"
			code={`<Audio src="https://cdn.pixabay.com/audio/2022/04/25/audio_5d61b5204f.mp3" />`}
		/>

		<p>With custom styling:</p>
		<Code
			lang="svelte"
			code={`<Audio
	src="https://example.com/audio.mp3"
	variant="soft"
	color="primary"
/>`}
		/>
	</div>
</Section>
