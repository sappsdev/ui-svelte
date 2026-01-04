<script lang="ts">
	import { Card, Checkbox, Code, Section, Select, ImageCropper } from 'ui-svelte';
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
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	const sizeOptions = [
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' },
		{ id: 'xl', label: 'xl' }
	];

	const shapeOptions = [
		{ id: 'circle', label: 'Circle' },
		{ id: 'square', label: 'Square' }
	];

	const aspectRatioOptions = [
		{ id: 'free', label: 'Free' },
		{ id: '1', label: '1:1 (Square)' },
		{ id: '1.77', label: '16:9' },
		{ id: '1.33', label: '4:3' }
	];

	// States
	let color: any = $state('muted');
	let variant: any = $state('soft');
	let size: any = $state('md');
	let shape: any = $state('circle');
	let aspectRatio: any = $state('1');
	let disabled = $state(false);
	let croppedImage = $state('');
	let uploadedFile = $state<File | null>(null);

	let aspectRatioValue = $derived(aspectRatio === 'free' ? undefined : Number(aspectRatio));

	let hasProps = $derived(
		[
			color !== 'muted',
			variant !== 'soft',
			size !== 'md',
			shape !== 'circle',
			aspectRatio !== '1',
			disabled
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { ImageCropper } from 'ui-svelte';`,
			`\n\tlet croppedImage = $state('');`,
			`\n\tfunction handleCrop(cropped: string) {`,
			`\t\tcroppedImage = cropped;`,
			`\t}`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<ImageCropper`,
			hasProps && `\tlabel="Profile Picture"`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'soft' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			shape !== 'circle' && `\tshape="${shape}"`,
			aspectRatio !== '1' && aspectRatio !== 'free' && `\taspectRatio={${aspectRatio}}`,
			disabled && `\tdisabled`,
			hasProps && `\tonCrop={handleCrop}`,
			hasProps && `/>`,
			!hasProps && `<ImageCropper label="Profile Picture" aspectRatio={1} onCrop={handleCrop} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'src', type: 'string', initial: '', description: 'Initial image source URL' },
		{ prop: 'alt', type: 'string', initial: 'Avatar' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'size', type: 'xs | sm | md | lg | xl', initial: 'md' },
		{ prop: 'shape', type: 'circle | square', initial: 'circle' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'muted'
		},
		{ prop: 'variant', type: 'solid | soft | outlined | ghost', initial: 'soft' },
		{ prop: 'aspectRatio', type: 'number', initial: 'undefined' },
		{ prop: 'minWidth', type: 'number', initial: '50' },
		{ prop: 'minHeight', type: 'number', initial: '50' },
		{ prop: 'maxWidth', type: 'number', initial: 'undefined' },
		{ prop: 'maxHeight', type: 'number', initial: 'undefined' },
		{ prop: 'accept', type: 'string', initial: 'image/*' },
		{ prop: 'placeholder', type: 'string', initial: 'Upload' },
		{ prop: 'icon', type: 'IconData', initial: 'ImageAddRegularIcon' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' },
		{ prop: 'onCrop', type: '(croppedImage: string) => void', initial: '' },
		{ prop: 'onChange', type: '(file: File | null) => void', initial: '' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	function handleCrop(cropped: string) {
		croppedImage = cropped;
	}

	function handleChange(file: File | null) {
		uploadedFile = file;
	}
</script>

<DocsHeader title="ImageCropper" llmUrl="https://ui-svelte.sappsdev.com/llm/form/image-cropper.md">
	ImageCropper provides an avatar-style upload button that opens a modal for image cropping. Perfect
	for profile pictures and thumbnails.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
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
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Shape"
				size="sm"
				options={shapeOptions}
				bind:value={shape}
			/>
		</div>

		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Aspect Ratio"
				size="sm"
				options={aspectRatioOptions}
				bind:value={aspectRatio}
			/>
			<Checkbox bind:checked={disabled} label="Disabled" />
		</div>

		<div class="doc-preview">
			<ImageCropper
				label="Profile Picture"
				{color}
				{variant}
				{size}
				{shape}
				aspectRatio={aspectRatioValue}
				{disabled}
				onCrop={handleCrop}
				onChange={handleChange}
			/>
		</div>

		{#if croppedImage}
			<div class="mt-2 text-sm">✓ Image cropped successfully</div>
		{/if}

		{#if uploadedFile}
			<div class="text-xs opacity-70">
				File: {uploadedFile.name}
			</div>
		{/if}

		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-6 center">
			{#each sizeOptions as sizeItem}
				<div class="flex flex-col items-center gap-2">
					<ImageCropper size={sizeItem.id as any} />
					<span class="text-xs opacity-70">{sizeItem.label}</span>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Shapes</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-6 center">
			<div class="flex flex-col items-center gap-2">
				<ImageCropper shape="circle" size="lg" />
				<span class="text-xs opacity-70">Circle</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<ImageCropper shape="square" size="lg" />
				<span class="text-xs opacity-70">Square</span>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Features</p>
	<Card color="background" variant="outlined">
		<ul>
			<li><strong>Avatar Style:</strong> Compact button that displays the cropped image</li>
			<li><strong>Click to Upload:</strong> Click the avatar to select an image file</li>
			<li><strong>Modal Cropper:</strong> Full cropping interface opens in a modal</li>
			<li><strong>Circle/Square Shapes:</strong> Choose between circular or square avatars</li>
			<li><strong>Drag to Move:</strong> Drag the crop area to reposition</li>
			<li><strong>Resize Handles:</strong> Eight handles for precise resizing</li>
			<li><strong>Aspect Ratio Lock:</strong> Maintain specific proportions</li>
			<li><strong>Visual Grid:</strong> Rule of thirds guide on hover</li>
			<li><strong>Edit Existing:</strong> Click avatar to re-crop the image</li>
			<li><strong>Remove Image:</strong> Clear and upload a new image</li>
		</ul>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Usage Examples</p>
	<Card color="background" variant="outlined">
		<h4>Profile Picture Upload</h4>
		<Code
			lang="svelte"
			code={`<ImageCropper
  label="Profile Picture"
  shape="circle"
  aspectRatio={1}
  onCrop={(cropped) => saveAvatar(cropped)}
/>`}
		/>

		<h4>Square Thumbnail</h4>
		<Code
			lang="svelte"
			code={`<ImageCropper
  label="Cover Image"
  shape="square"
  size="lg"
  aspectRatio={16/9}
  onCrop={handleCrop}
/>`}
		/>

		<h4>With Initial Image</h4>
		<Code
			lang="svelte"
			code={`<ImageCropper
  src="/existing-avatar.jpg"
  shape="circle"
  aspectRatio={1}
  onCrop={handleCrop}
/>`}
		/>

		<h4>Form Integration</h4>
		<Code
			lang="svelte"
			code={`<ImageCropper
  name="avatar"
  label="Your Photo"
  helpText="Click to upload"
  errorText={errors.avatar}
  onCrop={handleCrop}
  onChange={(file) => console.log(file)}
/>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
