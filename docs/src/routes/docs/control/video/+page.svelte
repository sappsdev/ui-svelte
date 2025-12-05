<script lang="ts">
	import { Video, Card, Checkbox, Code, Section, Divider, Select, TextField } from 'ui-svelte';

	const aspectOptions = [
		{ id: 'horizontal', label: 'Horizontal (16:9)' },
		{ id: 'vertical', label: 'Vertical (9:16)' },
		{ id: 'square', label: 'Square (1:1)' }
	];

	let selectedAspect: any = $state('horizontal');
	let videoSrc = $state('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
	let posterSrc = $state(
		'https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png'
	);
	let autoplay = $state(false);
	let hasPoster = $state(true);

	let hasProps = $derived([selectedAspect !== 'horizontal', autoplay, !hasPoster].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [`<script lang="ts">`, `\timport { Video } from 'ui-svelte';`, `<\/script>`];

		const componentLines = [
			hasProps && `<Video`,
			hasProps && `\tsrc="${videoSrc}"`,
			hasPoster && hasProps && `\tposter="${posterSrc}"`,
			selectedAspect !== 'horizontal' && `\taspect="${selectedAspect}"`,
			autoplay && `\tautoplay`,
			hasProps && `/>`,
			!hasProps &&
				(hasPoster
					? `<Video src="${videoSrc}" poster="${posterSrc}" />`
					: `<Video src="${videoSrc}" />`)
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});
</script>

<Section>
	<div class="prose">
		<h1>Video</h1>
		<p>
			The Video component provides a custom-styled video player with controls for playback, volume,
			fullscreen, and support for different aspect ratios.
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
						<Video
							src={videoSrc}
							poster={hasPoster ? posterSrc : undefined}
							aspect={selectedAspect}
							{autoplay}
						/>
					</div>
				</div>
			</div>
			<Divider class="invisible lg:visible" vertical />
			<Divider class="lg:hidden" />
			<div class="column gap-3 min-w-64">
				<h4>Builder</h4>

				<TextField
					label="Video URL"
					name="video_src"
					size="sm"
					type="url"
					bind:value={videoSrc}
					placeholder="https://example.com/video.mp4"
				/>

				<TextField
					label="Poster URL"
					name="poster_src"
					size="sm"
					type="url"
					bind:value={posterSrc}
					placeholder="https://example.com/poster.jpg"
				/>

				<Select
					label="Aspect Ratio"
					name="aspect"
					size="sm"
					options={aspectOptions}
					bind:value={selectedAspect}
				/>

				<div class="flex flex-col gap-2">
					<h6>Options</h6>
					<Checkbox bind:checked={autoplay} name="autoplay" label="Autoplay" />
					<Checkbox bind:checked={hasPoster} name="has-poster" label="Show Poster" />
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
		<p>The Video component accepts the following props:</p>
		<ul>
			<li>
				<code>src</code> - URL of the video file to play. Supports MP4, WebM, and HLS streams (required)
			</li>
			<li><code>poster</code> - URL of the poster image displayed before playback starts</li>
			<li>
				<code>aspect</code> - Aspect ratio: horizontal (16:9), vertical (9:16), or square (1:1) (default:
				horizontal)
			</li>
			<li><code>autoplay</code> - Automatically start playback when loaded (default: false)</li>
			<li><code>class</code> - Additional CSS classes to apply</li>
		</ul>

		<h3>Features</h3>
		<ul>
			<li><strong>Multiple Formats</strong> - Supports MP4, WebM, and HLS streaming formats</li>
			<li><strong>Custom Controls</strong> - Play/pause, volume, progress bar, and fullscreen</li>
			<li><strong>Responsive</strong> - Adapts to different screen sizes and aspect ratios</li>
			<li><strong>Poster Image</strong> - Optional thumbnail displayed before playback</li>
			<li><strong>Keyboard Support</strong> - Space for play/pause, arrow keys for seeking</li>
		</ul>

		<h3>Example Usage</h3>
		<p>Basic usage with poster:</p>
		<Code
			lang="svelte"
			code={`<Video
	src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
	poster="https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png"
/>`}
		/>

		<p>Vertical video with autoplay:</p>
		<Code
			lang="svelte"
			code={`<Video
	src="https://example.com/vertical-video.mp4"
	aspect="vertical"
	autoplay
/>`}
		/>

		<p>Square video without poster:</p>
		<Code
			lang="svelte"
			code={`<Video
	src="https://example.com/square-video.mp4"
	aspect="square"
/>`}
		/>

		<h3>Supported Video Formats</h3>
		<ul>
			<li><strong>MP4</strong> - Standard video format (.mp4)</li>
			<li><strong>WebM</strong> - Open video format (.webm)</li>
			<li><strong>HLS</strong> - HTTP Live Streaming (.m3u8) for adaptive streaming</li>
		</ul>

		<h3>Browser Autoplay Policy</h3>
		<p>
			Note that most browsers restrict autoplay with sound. If using autoplay, the video may be
			muted by default or require user interaction to play with sound.
		</p>
	</div>
</Section>
