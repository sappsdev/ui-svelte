<script lang="ts">
	import { Dropzone, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import { CloudUploadLinearIcon } from '$lib/icons';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'default', label: 'Default' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'surface', label: 'Surface' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	let color: any = $state('default');
	let variant: any = $state('outlined');
	let size: any = $state('md');

	let multiple = $state(true);
	let disabled = $state(false);
	let withIcon = $state(true);
	let withAccept = $state(false);
	let withLabel = $state(false);
	let withHelpText = $state(false);
	let withErrorText = $state(false);

	let files: any = $state([]);

	let hasProps = $derived(
		[
			color !== 'default',
			variant !== 'outlined',
			size !== 'md',
			!multiple,
			disabled,
			withIcon,
			withAccept,
			withLabel,
			withHelpText,
			withErrorText
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Dropzone } from 'ui-svelte';`,
			withIcon && `\timport { CloudUploadLinearIcon } from '$lib/icons';`,
			`\n\tlet files = $state([]);`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Dropzone`,
			hasProps && `\tname="dropzone"`,
			color !== 'default' && `\tcolor="${color}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			!multiple && `\tmultiple={false}`,
			disabled && `\tdisabled`,
			withAccept && `\taccept="image/*"`,
			withIcon && `\ticon={CloudUploadLinearIcon}`,
			withLabel && `\tlabel="Upload Files"`,
			withHelpText && `\thelpText="Allowed files: JPG, PNG, PDF"`,
			withErrorText && `\terrorText="You must upload at least one file"`,
			hasProps && `\tbind:files`,
			hasProps && `/>`,
			!hasProps && `<Dropzone name="dropzone" bind:files />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'files', type: 'FileWithUrl[]', initial: '[]' },
		{ prop: 'accept', type: 'string', initial: '' },
		{ prop: 'multiple', type: 'boolean', initial: 'true' },
		{ prop: 'maxSize', type: 'number', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: 'Drag & drop files here or click to select' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'onchange', type: '(files: FileWithUrl[]) => void', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | warning | danger | surface | default',
			initial: 'default'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined | ghost',
			initial: 'outlined'
		},
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'controlClass', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' }
	];

	const fileTypeProps = [
		{ prop: 'file', type: 'File', initial: '', required: true },
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'size', type: 'number', initial: '', required: true },
		{ prop: 'url', type: 'Promise<string>', initial: '', required: true },
		{ prop: 'uploadedAt', type: 'number', initial: '', required: true }
	];
</script>

<DocsHeader title="Dropzone" llmUrl="https://ui-svelte.sappsdev.com/llm/form/dropzone.md">
	Dropzone components allow users to upload files via drag and drop or file selection.
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
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={multiple} label="Multiple" />
			<Checkbox bind:checked={disabled} label="Disabled" />
			<Checkbox bind:checked={withIcon} label="Icon" />
			<Checkbox bind:checked={withAccept} label="Accept (image/*)" />
			<Checkbox bind:checked={withLabel} label="Label" />
			<Checkbox bind:checked={withHelpText} label="Help Text" />
			<Checkbox bind:checked={withErrorText} label="Error Text" />
		</div>

		<div class="doc-preview">
			<Dropzone
				name="dropzone"
				{color}
				{variant}
				{size}
				{multiple}
				{disabled}
				icon={withIcon ? CloudUploadLinearIcon : undefined}
				accept={withAccept ? 'image/*' : undefined}
				label={withLabel ? 'Upload Files' : undefined}
				helpText={withHelpText ? 'Allowed files: JPG, PNG, PDF' : undefined}
				errorText={withErrorText ? 'You must upload at least one file' : undefined}
				bind:files
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorItem}
					<Dropzone
						name={`dropzone-${item.id}-${colorItem.id}`}
						variant={item.id as any}
						color={colorItem.id as any}
						size="sm"
						placeholder={item.label + ' ' + colorItem.label}
						icon={CloudUploadLinearIcon}
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		{#each sizeOptions as sizeItem}
			<div class="wrap gap-4 center">
				<Dropzone
					name={`dropzone-size-${sizeItem.id}`}
					size={sizeItem.id as any}
					placeholder={`Size: ${sizeItem.label}`}
					icon={CloudUploadLinearIcon}
				/>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">FileWithUrl Type</p>
	<p class="text-muted mb-4">Each file in the files array follows this structure:</p>
	<DocsProps props={fileTypeProps} />
</Section>

<Section>
	<p class="section-subtitle">Accept Attribute</p>
	<Card>
		<p class="mb-4">The accept prop allows you to specify which file types are allowed:</p>
		<ul class="list-disc list-inside space-y-2">
			<li><code>accept="image/*"</code> - All image types</li>
			<li><code>accept=".pdf,.doc,.docx"</code> - Specific file extensions</li>
			<li><code>accept="image/png,image/jpeg"</code> - Specific MIME types</li>
		</ul>
	</Card>
</Section>
