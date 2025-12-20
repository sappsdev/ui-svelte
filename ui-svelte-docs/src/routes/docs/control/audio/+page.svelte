<script lang="ts">
	import { Audio, Card, Section, Select, TextField, Code } from 'ui-svelte';
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

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' }
	];

	let color: any = $state('primary');
	let variant: any = $state('soft');
	let audioSrc = $state('https://cdn.pixabay.com/audio/2022/04/25/audio_5d61b5204f.mp3');

	let hasProps = $derived([color !== 'primary', variant !== 'soft'].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Audio } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Audio`,
			hasProps && `\tsrc="https://example.com/audio.mp3"`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'soft' && `\tvariant="${variant}"`,
			hasProps && `/>`,
			!hasProps && `<Audio src="https://example.com/audio.mp3" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'src', type: 'string', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{
			prop: 'variant',
			type: 'solid | soft',
			initial: 'soft'
		},
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Audio">
	A custom audio player with waveform visualization, play/pause controls, and seek functionality.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
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
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
			/>
			<TextField
				isFloatLabel
				rootClass="col-span-2"
				label="Audio URL"
				size="sm"
				bind:value={audioSrc}
			/>
		</div>

		<div class="doc-preview">
			<Audio class="max-w-xs" src={audioSrc} {color} {variant} />
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
