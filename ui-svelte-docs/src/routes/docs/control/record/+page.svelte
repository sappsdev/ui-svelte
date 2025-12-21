<script lang="ts">
	import { Record, Card, Section, Select, TextField, Code, Checkbox } from 'ui-svelte';
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
	let recordName = $state('voice-message');
	let useUploadUrl = $state(false);
	let uploadUrl = $state('');

	let hasProps = $derived([color !== 'primary', variant !== 'soft', useUploadUrl].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Record } from 'ui-svelte';`,
			``,
			`\tconst handleComplete = (blob: Blob, url: string) => {`,
			`\t\tconsole.log('Recording complete:', { blob, url });`,
			`\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Record`,
			hasProps && `\tname="${recordName}"`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'soft' && `\tvariant="${variant}"`,
			useUploadUrl && uploadUrl && `\turl="${uploadUrl}"`,
			hasProps && `\tonRecordingComplete={handleComplete}`,
			hasProps && `/>`,
			!hasProps && `<Record name="${recordName}" onRecordingComplete={handleComplete} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '', description: 'Input name attribute (required)' },
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
			prop: 'url',
			type: 'string',
			initial: '',
			description: 'Upload URL (POST request). If not provided, saves to hidden file input'
		},
		{
			prop: 'headers',
			type: 'Record<string, string>',
			initial: '{}',
			description: 'Headers for upload request (e.g., authentication)'
		},
		{
			prop: 'onRecordingComplete',
			type: '(blob: Blob, url: string) => void',
			initial: '',
			description: 'Callback when recording is confirmed'
		},
		{ prop: 'class', type: 'string', initial: '', description: 'Custom CSS classes' }
	];
</script>

<DocsHeader title="Record">
	An audio recording component with real-time waveform visualization, pause/resume controls, and
	review functionality before saving.
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
				label="Name"
				size="sm"
				bind:value={recordName}
			/>
			<Checkbox label="Enable Upload URL" bind:checked={useUploadUrl} />
			{#if useUploadUrl}
				<TextField
					isFloatLabel
					rootClass="col-span-2"
					label="Upload URL"
					size="sm"
					bind:value={uploadUrl}
					placeholder="https://api.example.com/upload"
				/>
			{/if}
		</div>

		<div class="doc-preview">
			<Record
				class="max-w-md"
				name={recordName}
				{color}
				{variant}
				url={useUploadUrl && uploadUrl ? uploadUrl : undefined}
				onRecordingComplete={(blob, url) => console.log('Complete:', { blob, url })}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card>
		<div class="doc-preview flex-col gap-4">
			<Record class="max-w-md" name="primary-demo" color="primary" />
			<Record class="max-w-md" name="success-demo" color="success" />
			<Record class="max-w-md" name="warning-demo" color="warning" />
			<Record class="max-w-md" name="danger-demo" color="danger" />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants</p>
	<Card>
		<div class="doc-preview flex-col gap-4">
			<Record class="max-w-md" name="soft-demo" variant="soft" color="info" />
			<Record class="max-w-md" name="solid-demo" variant="solid" color="info" />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
