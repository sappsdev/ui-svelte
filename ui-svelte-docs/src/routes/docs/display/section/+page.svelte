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
		{ id: 'ghost', label: 'Ghost' }
	];

	let color: any = $state('default');
	let variant: any = $state('ghost');
	let isBoxed = $state(false);
	let hasCover = $state(false);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Section } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`<Section`,
			color !== 'default' && `\tcolor="${color}"`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			isBoxed && `\tisBoxed`,
			hasCover && `\tcover="/path/to/image.jpg"`,
			`>`,
			`\t<h2>Section Title</h2>`,
			`\t<p>Section content goes here.</p>`,
			`</Section>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'children', type: 'Snippet', initial: '' },
		{ prop: 'cover', type: 'string', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | warning | danger | surface | default',
			initial: 'default'
		},
		{
			prop: 'variant',
			type: 'solid | soft | ghost',
			initial: 'ghost'
		},
		{ prop: 'isBoxed', type: 'boolean', initial: 'false' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'bodyClass', type: 'string', initial: '' },
		{ prop: 'coverClass', type: 'string', initial: '' },
		{ prop: 'overlayClass', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Section" llmUrl="https://ui-svelte.sappsdev.com/llm/display/section.md">
	Sections are layout containers for organizing page content with optional backgrounds and covers.
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
			<Checkbox bind:checked={isBoxed} label="Boxed" />
			<Checkbox bind:checked={hasCover} label="Cover Image" />
		</div>

		<div class="doc-preview">
			<Section
				{color}
				{variant}
				{isBoxed}
				cover={hasCover ? 'https://picsum.photos/seed/section/1200/400' : undefined}
				rootClass="min-h-48"
			>
				<h3>Section Title</h3>
				<p>This is the section content. You can place any content here.</p>
			</Section>
		</div>

		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<h4>Variants & Colors</h4>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorItem}
					<Section variant={item.id as any} color={colorItem.id as any} rootClass="p-4 min-w-32">
						<span class="text-sm">{item.label} {colorItem.label}</span>
					</Section>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<h4>Boxed Content</h4>
	<Card>
		<p class="mb-4">
			The <code>isBoxed</code> prop constrains the content width for better readability on large screens.
		</p>
		<div class="column gap-4">
			<Section color="surface" variant="soft" isBoxed rootClass="min-h-32">
				<h4>Boxed Section</h4>
				<p>Content is centered and constrained to a maximum width.</p>
			</Section>
			<Section color="primary" variant="soft" rootClass="min-h-32">
				<h4>Full Width Section</h4>
				<p>Content spans the full width of the section.</p>
			</Section>
		</div>
	</Card>
</Section>

<Section>
	<h4>With Cover Image</h4>
	<Card>
		<div class="column gap-4">
			{#each variantOptions as item}
				<Section
					variant={item.id as any}
					cover="https://picsum.photos/seed/{item.id}/1200/300"
					rootClass="min-h-48"
				>
					<div class="stack gap-2 center text-white">
						<h4>{item.label} with Cover</h4>
						<p>Section with a background cover image.</p>
					</div>
				</Section>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<h4>The component accepts the following props:</h4>
	<DocsProps {props} />
</Section>
