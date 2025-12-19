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
		{ id: 'default', label: 'Default' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	let color: any = $state('default');
	let variant: any = $state('outlined');
	let hasHeader = $state(true);
	let hasFooter = $state(true);
	let hasCover = $state(false);

	let hasProps = $derived(
		[color !== 'default', variant !== 'outlined', hasHeader, hasFooter, hasCover].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Card } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`<Card`,
			color !== 'default' && `\tcolor="${color}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			hasCover && `\tcover="/path/to/image.jpg"`,
			`>`,
			hasHeader && `\t{#snippet header()}`,
			hasHeader && `\t\t<h4>Card Header</h4>`,
			hasHeader && `\t{/snippet}`,
			`\t<p>Card body content goes here.</p>`,
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
			type: 'primary | secondary | muted | success | info | warning | danger | surface | default',
			initial: 'default'
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
	<p class="section-subtitle">Variants & Colors</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorItem}
					<Card variant={item.id as any} color={colorItem.id as any} rootClass="p-4">
						<span class="card-description">{item.label} {colorItem.label}</span>
					</Card>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Header & Footer</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each variantOptions as item}
				<Card variant={item.id as any} color="primary" rootClass="max-w-xs">
					{#snippet header()}
						<h5 class="card-title">{item.label} Header</h5>
					{/snippet}
					<p class="card-description">Card content with header and footer snippets.</p>
					{#snippet footer()}
						<Button size="sm" color="muted">Action</Button>
					{/snippet}
				</Card>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Cover Image</p>
	<Card>
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
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
