<script lang="ts">
	import { Card, Code, Section, Select, TextField, Video } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const aspectOptions = [
		{ id: 'horizontal', label: 'Horizontal' },
		{ id: 'vertical', label: 'Vertical' },
		{ id: 'square', label: 'Square' }
	];

	let videoSrc = $state('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
	let posterSrc = $state('/images/poster.png');
	let color: any = $state('primary');
	let aspect: any = $state('horizontal');

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Video } from 'ui-svelte';`,
			`<\/script>`
		];

		const componentLines = [
			`<Video`,
			`\tsrc="${videoSrc}"`,
			posterSrc && `\tposter="${posterSrc}"`,
			color !== 'primary' && `\tcolor="${color}"`,
			aspect !== 'horizontal' && `\taspect="${aspect}"`,
			`/>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'src', type: 'string', initial: '' },
		{ prop: 'poster', type: 'string', initial: '' },
		{ prop: 'autoplay', type: 'boolean', initial: 'false' },
		{ prop: 'aspect', type: 'horizontal | vertical | square', initial: 'horizontal' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Video">
	A video player component with support for HLS streams and standard video files. Includes custom
	controls for play/pause, volume, picture-in-picture, and fullscreen.
</DocsHeader>

<Section>
	<Card>
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Aspect"
				size="sm"
				options={aspectOptions}
				bind:value={aspect}
			/>
		</div>
		<div class="col gap-2">
			<TextField
				label="Video Source (URL)"
				size="sm"
				bind:value={videoSrc}
				placeholder="Enter video URL or HLS stream"
			/>
			<TextField
				label="Poster Image (URL)"
				size="sm"
				bind:value={posterSrc}
				placeholder="Enter poster image URL"
			/>
		</div>

		<Video src={videoSrc} poster={posterSrc} {color} {aspect} />

		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Aspect Ratios</p>
	<Card>
		<div class="grid-1 md:grid-3 gap-4">
			{#each aspectOptions as item}
				<div class="col gap-2">
					<p class="text-sm">{item.label}</p>
					<Video
						src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
						poster="https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png"
						aspect={item.id as any}
					/>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card>
		<div class="grid-1 md:grid-2 gap-4">
			{#each colorOptions as item}
				<div class="col gap-2">
					<p class="text-sm">{item.label}</p>
					<Video
						src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
						poster="https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png"
						color={item.id as any}
					/>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
