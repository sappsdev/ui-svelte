<script lang="ts">
	import { Button, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'background', label: 'Background' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	let color: any = $state('surface');
	let variant: any = $state('solid');
	let hasHeader = $state(true);
	let hasFooter = $state(true);
	let hasCover = $state(false);

	let hasProps = $derived([color !== 'surface', variant !== 'solid', hasCover].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Card } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			!hasProps && `<Card>`,
			hasProps && `<Card`,
			color !== 'surface' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			hasCover && `\tcover="/path/to/image.jpg"`,
			hasProps && `>`,
			hasHeader && `\t{#snippet header()}`,
			hasHeader && `\t\t<h4 class="card-title">Card Header</h4>`,
			hasHeader && `\t{/snippet}`,
			`\t<p class="card-description">Card body content goes here.</p>`,
			hasFooter && `\t{#snippet footer()}`,
			hasFooter && `\t\t<Button>Action</Button>`,
			hasFooter && `\t{/snippet}`,
			`</Card>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'children', type: 'Snippet', initial: '' },
		{ prop: 'header', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' },
		{ prop: 'cover', type: 'string', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | warning | danger | surface | background',
			initial: 'background'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined | ghost',
			initial: 'outlined'
		},
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'bodyClass', type: 'string', initial: '' },
		{ prop: 'footerClass', type: 'string', initial: '' },
		{ prop: 'coverClass', type: 'string', initial: '' },
		{ prop: 'overlayClass', type: 'string', initial: '' }
	];
</script>

{#snippet header()}
	<h4 class="card-title">Card Header</h4>
{/snippet}

{#snippet footer()}
	<Button size="sm">Action</Button>
{/snippet}

<DocsHeader title="Card" llmUrl="https://ui-svelte.sappsdev.com/llm/display/card.md">
	Cards are versatile containers for grouping related content and actions.
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
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hasHeader} label="Header" />
			<Checkbox bind:checked={hasFooter} label="Footer" />
			<Checkbox bind:checked={hasCover} label="Cover Image" />
		</div>

		<div class="doc-preview">
			<Card
				{color}
				{variant}
				cover={hasCover ? 'https://picsum.photos/seed/card/400/200' : undefined}
				header={hasHeader ? header : undefined}
				footer={hasFooter ? footer : undefined}
				rootClass="max-w-sm w-full"
			>
				<p class="card-description">
					This is the card body content. You can place any content here.
				</p>
			</Card>
		</div>

		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Header & Footer</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<Card variant="solid" color="primary" rootClass="max-w-xs">
				{#snippet header()}
					<h5 class="card-title">Premium Plan</h5>
				{/snippet}
				<p class="card-description">
					Unlock all features with our premium subscription. Best value for teams.
				</p>
				{#snippet footer()}
					<Button color="secondary" variant="solid">Upgrade Now</Button>
				{/snippet}
			</Card>

			<Card variant="soft" color="success" rootClass="max-w-xs">
				{#snippet header()}
					<h5 class="card-title">Payment Complete</h5>
				{/snippet}
				<p class="card-description">
					Your transaction was successful. Check your email for the receipt.
				</p>
				{#snippet footer()}
					<Button color="success" variant="solid">View Receipt</Button>
				{/snippet}
			</Card>

			<Card variant="outlined" color="info" rootClass="max-w-xs">
				{#snippet header()}
					<h5 class="card-title">New Update</h5>
				{/snippet}
				<p class="card-description">
					Version 2.0 is now available with exciting new features and improvements.
				</p>
				{#snippet footer()}
					<Button color="info" variant="solid">Learn More</Button>
				{/snippet}
			</Card>

			<Card variant="ghost" color="warning" rootClass="max-w-xs">
				{#snippet header()}
					<h5 class="card-title">Action Required</h5>
				{/snippet}
				<p class="card-description">
					Please verify your email address to continue using all features.
				</p>
				{#snippet footer()}
					<Button color="warning" variant="solid">Verify Email</Button>
				{/snippet}
			</Card>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Cover Image</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			{#each variantOptions as item}
				<Card
					variant={item.id as any}
					cover="https://picsum.photos/seed/{item.id}/300/150"
					rootClass="max-w-xs"
				>
					{#snippet header()}
						<h5 class="card-title">{item.label} Card</h5>
					{/snippet}
					<p class="card-description">Card with a cover image.</p>
				</Card>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Typography</p>
	<Card color="background" variant="outlined">
		<p class="card-description pb-4">
			Use these typography classes for consistent text styling within cards:
		</p>

		<div class="wrap gap-4 center">
			<Card rootClass="max-w-xs">
				{#snippet header()}
					<h5 class="card-title">Card Title</h5>
				{/snippet}
				<p class="card-description">
					This is a card description with the <code>card-description</code> class applied.
				</p>
			</Card>

			<Card rootClass="max-w-xs">
				{#snippet header()}
					<h4 class="feature-title">Feature Title</h4>
				{/snippet}
				<p class="feature-description">
					You can also use <code>feature-title</code> and <code>feature-description</code> for slightly
					larger typography.
				</p>
			</Card>
		</div>

		<Code
			lang="html"
			code={`<!-- Card Typography -->
<h5 class="card-title">Card Title</h5>
<p class="card-description">Card description</p>

<!-- Feature Typography (larger) -->
<h4 class="feature-title">Feature Title</h4>
<p class="feature-description">Feature description</p>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
