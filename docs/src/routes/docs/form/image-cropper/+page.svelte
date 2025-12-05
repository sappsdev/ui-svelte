<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Select, Checkbox, TextField, Section, ImageCropper } from 'ui-svelte';

	const aspectRatioOptions = [
		{ id: 'free', label: 'Free' },
		{ id: '1', label: '1:1 (Square)' },
		{ id: '1.77', label: '16:9' },
		{ id: '1.33', label: '4:3' },
		{ id: '0.75', label: '3:4' },
		{ id: '0.56', label: '9:16' }
	];

	// States
	let aspectRatio: any = $state('free');
	let minWidth = $state('50');
	let minHeight = $state('50');
	let maxWidth = $state('');
	let maxHeight = $state('');
	let croppedImage = $state('');

	// Image source
	let imageSrc = $state('/example-image.jpg');

	let aspectRatioValue = $derived(aspectRatio === 'free' ? undefined : Number(aspectRatio));

	let hasProps = $derived(
		[aspectRatio !== 'free', minWidth !== '50', minHeight !== '50', maxWidth, maxHeight].some(
			Boolean
		)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { ImageCropper } from 'ui-svelte';`,
			`\n\tlet croppedImage = $state('');`,
			`\n\tfunction handleCrop(cropped: string) {`,
			`\t\tcroppedImage = cropped;`,
			`\t\tconsole.log('Image cropped:', cropped);`,
			`\t}`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<ImageCropper`,
			hasProps && `\tsrc="/your-image.jpg"`,
			hasProps && `\talt="Image to crop"`,
			aspectRatio !== 'free' && `\taspectRatio={${aspectRatio}}`,
			minWidth !== '50' && `\tminWidth={${minWidth}}`,
			minHeight !== '50' && `\tminHeight={${minHeight}}`,
			maxWidth && `\tmaxWidth={${maxWidth}}`,
			maxHeight && `\tmaxHeight={${maxHeight}}`,
			hasProps && `\tonCrop={handleCrop}`,
			hasProps && `/>`,
			!hasProps && `<ImageCropper src="/your-image.jpg" alt="Image to crop" onCrop={handleCrop} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'src', type: 'string', initial: '', required: true },
		{ prop: 'alt', type: 'string', initial: 'Image to crop' },
		{ prop: 'aspectRatio', type: 'number', initial: 'undefined' },
		{ prop: 'minWidth', type: 'number', initial: '50' },
		{ prop: 'minHeight', type: 'number', initial: '50' },
		{ prop: 'maxWidth', type: 'number', initial: 'undefined' },
		{ prop: 'maxHeight', type: 'number', initial: 'undefined' },
		{ prop: 'onCrop', type: '(croppedImage: string) => void', initial: '' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	function handleCrop(cropped: string) {
		croppedImage = cropped;
		console.log('Image cropped successfully');
	}
</script>

{#snippet preview()}
	<div class="space-y-4 w-full">
		<ImageCropper
			src={imageSrc}
			alt="Image to crop"
			aspectRatio={aspectRatioValue}
			minWidth={Number(minWidth)}
			minHeight={Number(minHeight)}
			maxWidth={maxWidth ? Number(maxWidth) : undefined}
			maxHeight={maxHeight ? Number(maxHeight) : undefined}
			onCrop={handleCrop}
		/>

		{#if croppedImage}
			<div class="mt-6">
				<h4 class="text-sm font-medium mb-2">Cropped Result:</h4>
				<img src={croppedImage} alt="Cropped" class="max-w-xs rounded-ui border-2 border-muted" />
			</div>
		{/if}
	</div>
{/snippet}

{#snippet builder()}
	<Select label="Aspect Ratio" size="sm" options={aspectRatioOptions} bind:value={aspectRatio} />

	<DocOptions title="Size Constraints">
		<TextField label="Min Width" type="number" size="sm" bind:value={minWidth} placeholder="50" />
		<TextField label="Min Height" type="number" size="sm" bind:value={minHeight} placeholder="50" />
		<TextField
			label="Max Width"
			type="number"
			size="sm"
			bind:value={maxWidth}
			placeholder="Optional"
		/>
		<TextField
			label="Max Height"
			type="number"
			size="sm"
			bind:value={maxHeight}
			placeholder="Optional"
		/>
	</DocOptions>

	<DocOptions title="Image Source">
		<TextField label="Image URL" size="sm" bind:value={imageSrc} placeholder="/example-image.jpg" />
	</DocOptions>
{/snippet}

<DocHeader title="ImageCropper">
	ImageCropper component allows users to select and crop a specific area of an image with
	drag-and-drop and resize functionality.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<Section class="prose mt-8">
	<h3>Features</h3>
	<ul>
		<li><strong>Drag to Move:</strong> Click and drag the crop area to reposition it</li>
		<li><strong>Resize Handles:</strong> Eight handles for resizing from any corner or edge</li>
		<li><strong>Aspect Ratio Lock:</strong> Maintain specific proportions when resizing</li>
		<li><strong>Visual Grid:</strong> Rule of thirds guide appears on hover</li>
		<li><strong>Size Constraints:</strong> Set minimum and maximum crop dimensions</li>
		<li><strong>Reset Function:</strong> Restore the crop area to default position</li>
		<li><strong>Base64 Output:</strong> Returns cropped image as PNG data URL</li>
	</ul>

	<h3>Usage Examples</h3>

	<h4>Basic Usage</h4>
	<pre><code
			>{`<ImageCropper
  src="/photo.jpg"
  onCrop={(cropped) => console.log(cropped)}
/>`}</code
		></pre>

	<h4>Square Crop (Profile Picture)</h4>
	<pre><code
			>{`<ImageCropper
  src="/profile.jpg"
  aspectRatio={1}
  minWidth={100}
  minHeight={100}
  onCrop={handleCrop}
/>`}</code
		></pre>

	<h4>Widescreen Crop (16:9)</h4>
	<pre><code
			>{`<ImageCropper
  src="/banner.jpg"
  aspectRatio={16/9}
  minWidth={400}
  maxWidth={1920}
  onCrop={handleCrop}
/>`}</code
		></pre>

	<h4>Portrait Crop (9:16)</h4>
	<pre><code
			>{`<ImageCropper
  src="/story.jpg"
  aspectRatio={9/16}
  minWidth={200}
  minHeight={355}
  onCrop={handleCrop}
/>`}</code
		></pre>

	<h3>Aspect Ratio Reference</h3>
	<ul>
		<li><strong>1</strong> - Square (1:1) - Profile pictures, thumbnails</li>
		<li><strong>16/9 (1.77...)</strong> - Widescreen - YouTube, presentations</li>
		<li><strong>4/3 (1.33...)</strong> - Standard - Traditional photography</li>
		<li><strong>3/4 (0.75)</strong> - Portrait - Prints, posters</li>
		<li><strong>9/16 (0.56...)</strong> - Vertical - Instagram Stories, TikTok</li>
	</ul>

	<h3>Notes</h3>
	<ul>
		<li>The component automatically scales images to fit the container</li>
		<li>Crop coordinates are calculated based on the original image dimensions</li>
		<li>The cropped image is returned as a PNG data URL (base64)</li>
		<li>Grid lines appear when hovering over the crop area</li>
		<li>All resize handles are visible on hover for better precision</li>
	</ul>
</Section>
