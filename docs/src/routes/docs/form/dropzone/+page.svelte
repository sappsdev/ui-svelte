<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Dropzone, Select, Checkbox, Section } from 'ui-svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'line', label: 'Line' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	// Selects
	let variant: any = $state('outlined');
	let size: any = $state('md');

	// Props
	let label = $state('');
	let helpText = $state('');
	let errorText = $state('');
	let placeholder = $state('');

	// States
	let multiple = $state(true);
	let disabled = $state(false);
	let isSolid = $state(false);
	let withIcon = $state(true);
	let withAccept = $state(false);

	let files: any = $state([]);

	let hasProps = $derived(
		[
			variant !== 'outlined',
			size !== 'md',
			label,
			helpText,
			errorText,
			placeholder,
			!multiple,
			disabled,
			isSolid,
			!withIcon,
			withAccept
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Dropzone } from 'ui-svelte';`,
			`\n\tlet files = $state([]);`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Dropzone`,
			hasProps && `\tname="dropzone"`,
			placeholder && `\tplaceholder="${placeholder}"`,
			label && `\tlabel="${label}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			!multiple && `\tmultiple={false}`,
			disabled && `\tdisabled`,
			withAccept && `\taccept="image/*"`,
			!withIcon && `\ticon={undefined}`,
			helpText && `\thelpText="${helpText}"`,
			errorText && `\terrorText="${errorText}"`,
			isSolid && `\tisSolid`,
			hasProps && `\tbind:files`,
			hasProps && `/>`,
			!hasProps && `<Dropzone name="dropzone" bind:files />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'files', type: 'FileWithUrl[]', initial: '[]' },
		{ prop: 'accept', type: 'string', initial: '' },
		{ prop: 'multiple', type: 'boolean', initial: 'true' },
		{ prop: 'maxSize', type: 'number', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: 'Arrastra archivos aquí o haz clic...' },
		{ prop: 'icon', type: 'IconName', initial: 'upload' },
		{ prop: 'onchange', type: '(files: FileWithUrl[]) => void', initial: '' },
		{ prop: 'variant', type: 'primary | secondary | muted | outlined | line', initial: 'outlined' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'controlClass', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' }
	];

	const fileTypeProps = [
		{ prop: 'file', type: 'File', initial: '', required: true },
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'size', type: 'number', initial: '', required: true },
		{ prop: 'url', type: 'Promise<string>', initial: '', required: true },
		{ prop: 'uploadedAt', type: 'number', initial: '', required: true }
	];
</script>

{#snippet preview()}
	<Dropzone
		name="dropzone"
		{variant}
		{size}
		{multiple}
		{disabled}
		{isSolid}
		accept={withAccept ? 'image/*' : undefined}
		label={label || undefined}
		helpText={helpText || undefined}
		errorText={errorText || undefined}
		bind:files
	/>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />

	<DocOptions title="Options">
		<Checkbox bind:checked={multiple} label="Multiple" />
		<Checkbox bind:checked={disabled} label="Disabled" />
		<Checkbox bind:checked={withIcon} label="Icon" />
		<Checkbox bind:checked={withAccept} label="Accept (image/*)" />
	</DocOptions>

	<DocOptions title="Labels & Messages">
		<Checkbox onchange={(v) => (v ? (label = 'Subir archivos') : (label = ''))} label="Label" />
		<Checkbox
			onchange={(v) => (v ? (placeholder = 'Arrastra tus archivos aquí') : (placeholder = ''))}
			label="Custom Placeholder"
		/>
		<Checkbox
			onchange={(v) => (v ? (helpText = 'Archivos permitidos: JPG, PNG, PDF') : (helpText = ''))}
			label="helpText"
		/>
		<Checkbox
			onchange={(v) => (v ? (errorText = 'Debes subir al menos un archivo') : (errorText = ''))}
			label="errorText"
		/>
		<Checkbox bind:checked={isSolid} label="solid" />
	</DocOptions>
{/snippet}

<DocHeader title="Dropzone">
	Dropzone components allow users to upload files via drag and drop or file selection.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<Section class="prose mt-8">
	<h3>FileWithUrl Type</h3>
	<p>Each file in the files array follows this structure:</p>
</Section>

<DocProps props={fileTypeProps} />

<Section class="prose mt-8">
	<h3>Accept Attribute</h3>
	<p>The accept prop allows you to specify which file types are allowed:</p>
	<ul>
		<li><code>accept="image/*"</code> - All image types</li>
		<li><code>accept=".pdf,.doc,.docx"</code> - Specific file extensions</li>
		<li><code>accept="image/png,image/jpeg"</code> - Specific MIME types</li>
	</ul>
</Section>

<Section class="prose mt-8">
	<h3>Usage Example</h3>
	<pre><code
			>{`<script lang="ts">
  import { Dropzone } from 'ui-svelte';

  let files = $state([]);

  function handleChange(newFiles) {
    console.log('Files uploaded:', newFiles);
  }
<\/script>

<Dropzone
  name="documents"
  label="Upload Documents"
  accept=".pdf,.doc,.docx"
  multiple={true}
  helpText="PDF, DOC, or DOCX files only"
  onchange={handleChange}
  bind:files
/>`}</code
		></pre>
</Section>
