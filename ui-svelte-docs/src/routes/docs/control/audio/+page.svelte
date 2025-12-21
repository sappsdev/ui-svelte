<script lang="ts">
	import { Audio, Card, Section, Select, TextField, Code, Checkbox } from 'ui-svelte';
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
	let showAvatar = $state(false);
	let subtitle = $state('');

	let avatarSrc = 'https://i.pravatar.cc/150?img=32';

	let hasProps = $derived(
		[color !== 'primary', variant !== 'soft', showAvatar, subtitle].some(Boolean)
	);

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
			showAvatar && `\tavatarSrc="/user.jpg"`,
			subtitle && `\tsubtitle="${subtitle}"`,
			hasProps && `/>`,
			!hasProps && `<Audio src="https://example.com/audio.mp3" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'src', type: 'string', initial: '', description: 'Audio source URL' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary',
			description: 'Color theme'
		},
		{
			prop: 'variant',
			type: 'solid | soft',
			initial: 'soft',
			description: 'Visual style'
		},
		{
			prop: 'avatarSrc',
			type: 'string',
			initial: '',
			description: 'Optional avatar image URL (displays on the right side)'
		},
		{
			prop: 'subtitle',
			type: 'string',
			initial: '',
			description: 'Optional subtitle text (e.g., timestamp or date)'
		},
		{ prop: 'class', type: 'string', initial: '', description: 'Custom CSS classes' }
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
			<Checkbox label="Show Avatar" bind:checked={showAvatar} />
			<TextField
				isFloatLabel
				rootClass="col-span-2"
				label="Subtitle (e.g., time)"
				size="sm"
				bind:value={subtitle}
				placeholder="5:24 p.m."
			/>
		</div>

		<div class="doc-preview">
			<Audio
				class="max-w-xs"
				src={audioSrc}
				{color}
				{variant}
				avatarSrc={showAvatar ? avatarSrc : undefined}
				{subtitle}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Avatar & Subtitle</p>
	<Card>
		<div class="doc-preview flex-col gap-4">
			<Audio
				class="max-w-xs"
				src={audioSrc}
				color="success"
				avatarSrc="https://i.pravatar.cc/150?img=12"
				subtitle="5:24 p.m."
			/>
			<Audio
				class="max-w-xs"
				src={audioSrc}
				color="muted"
				variant="solid"
				avatarSrc="https://i.pravatar.cc/150?img=5"
				subtitle="Yesterday, 10:30 a.m."
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
