<script lang="ts">
	import { Card, Checkbox, Code, Divider, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'default', label: 'Default' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const orientationOptions = [
		{ id: 'horizontal', label: 'Horizontal' },
		{ id: 'vertical', label: 'Vertical' }
	];

	let color: any = $state('default');
	let orientation: any = $state('horizontal');
	let hasContent = $state(false);

	let hasProps = $derived(
		[color !== 'default', orientation === 'vertical', hasContent].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Divider } from 'ui-svelte';`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<Divider`,
			orientation === 'vertical' && `\tvertical`,
			color !== 'default' && `\tcolor="${color}"`,
			hasProps && hasContent && `>`,
			hasProps && hasContent && `\tOR`,
			hasProps && hasContent && `</Divider>`,
			hasProps && !hasContent && `/>`,
			!hasProps && `<Divider />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'vertical', type: 'boolean', initial: 'false' },
		{
			prop: 'color',
			type: 'default | surface | primary | secondary | muted',
			initial: 'default'
		},
		{ prop: 'children', type: 'Snippet', initial: '' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Divider" llmUrl="https://ui-svelte.sappsdev.com/llm/display/divider.md">
	A visual separator for content sections. Supports horizontal and vertical orientations with
	optional centered content and color variants.
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
				label="Orientation"
				size="sm"
				options={orientationOptions}
				bind:value={orientation}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hasContent} label="With Content" />
		</div>

		<div class="doc-preview min-h-[150px] {orientation === 'vertical' ? 'row' : 'column'} gap-4">
			<div class="p-4 bg-primary text-on-primary rounded">Content Before</div>
			{#if hasContent}
				<Divider vertical={orientation === 'vertical'} {color}>OR</Divider>
			{:else}
				<Divider vertical={orientation === 'vertical'} {color} />
			{/if}
			<div class="p-4 bg-secondary text-on-secondary rounded">Content After</div>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card>
		<div class="column gap-6">
			{#each colorOptions as colorItem}
				<div class="column gap-2">
					<span class="text-sm font-medium">{colorItem.label}</span>
					<Divider color={colorItem.id as any} />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Orientations</p>
	<Card bodyClass="grid-2 gap-4">
		<div class="column gap-2">
			<span class="text-sm font-medium">Horizontal</span>
			<div class="column gap-2 p-4 border border-muted-200 rounded">
				<div class="p-2 bg-muted text-on-muted rounded text-sm center">Above</div>
				<Divider />
				<div class="p-2 bg-muted text-on-muted rounded text-sm center">Below</div>
			</div>
		</div>
		<div class="column gap-2">
			<span class="text-sm font-medium">Vertical</span>
			<div class="row gap-2 min-h-[100px] p-4 border border-muted-200 rounded">
				<div class="p-2 bg-muted text-on-muted rounded text-sm center flex-1">Left</div>
				<Divider vertical />
				<div class="p-2 bg-muted text-on-muted rounded text-sm center flex-1">Right</div>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Content</p>
	<Card bodyClass="grid-2 gap-4">
		<div class="column gap-2">
			<span class="text-sm font-medium">Text Label</span>
			<div class="column gap-2 p-4 border border-muted-200 rounded">
				<div class="p-2 bg-muted text-on-muted rounded text-sm center">Above</div>
				<Divider>OR</Divider>
				<div class="p-2 bg-muted text-on-muted rounded text-sm center">Below</div>
			</div>
		</div>
		<div class="column gap-2">
			<span class="text-sm font-medium">Custom Content</span>
			<div class="column gap-2 p-4 border border-muted-200 rounded">
				<div class="p-2 bg-muted text-on-muted rounded text-sm center">Section 1</div>
				<Divider><span class="text-primary font-semibold">✦</span></Divider>
				<div class="p-2 bg-muted text-on-muted rounded text-sm center">Section 2</div>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Responsive Example</p>
	<Card>
		<p class="text-sm text-muted-600 mb-4">
			Use visibility classes to switch between horizontal and vertical orientations responsively.
		</p>
		<div class="column xl:row gap-4 min-h-[100px] p-4 border border-muted-200 rounded">
			<div class="p-4 bg-success text-on-success rounded text-sm center flex-1">Content A</div>
			<Divider class="invisible xl:visible" vertical />
			<Divider class="xl:hidden" />
			<div class="p-4 bg-success text-on-success rounded text-sm center flex-1">Content B</div>
		</div>
		<Code
			lang="svelte"
			code={`<div class="column xl:row gap-4">
	<div>Content A</div>
	<Divider class="invisible xl:visible" vertical />
	<Divider class="xl:hidden" />
	<div>Content B</div>
</div>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Usage Examples</p>
	<Card>
		<Code
			lang="svelte"
			code={`<!-- Basic Horizontal Divider -->
<Divider />

<!-- Vertical Divider -->
<div class="row min-h-[100px]">
	<div>Left Content</div>
	<Divider vertical />
	<div>Right Content</div>
</div>

<!-- Divider with Label -->
<Divider>OR</Divider>

<!-- Colored Dividers -->
<Divider color="primary" />
<Divider color="secondary" />`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
