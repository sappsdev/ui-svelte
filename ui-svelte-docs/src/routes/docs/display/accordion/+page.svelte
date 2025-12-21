<script lang="ts">
	import { Accordion, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' }
	];

	let color: any = $state('default');
	let variant: any = $state('ghost');
	let multiple = $state(false);

	const sampleItems = [
		{
			id: '1',
			label: 'What is ui-svelte?',
			content:
				'ui-svelte is a modern Svelte component library that provides a set of beautiful and accessible UI components.'
		},
		{
			id: '2',
			label: 'How do I install it?',
			content:
				'You can install ui-svelte using npm or bun: npm install ui-svelte or bun add ui-svelte.'
		},
		{
			id: '3',
			label: 'Is it customizable?',
			content:
				'Yes! All components support variants, colors, and custom classes for complete styling flexibility.'
		}
	];

	let hasProps = $derived([color !== 'default', variant !== 'ghost', multiple].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Accordion } from 'ui-svelte';`,
			``,
			`\tconst items = [`,
			`\t\t{ id: '1', label: 'Question 1', content: 'Answer 1' },`,
			`\t\t{ id: '2', label: 'Question 2', content: 'Answer 2' },`,
			`\t\t{ id: '3', label: 'Question 3', content: 'Answer 3' }`,
			`\t];`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<Accordion`,
			hasProps && `\t{items}`,
			color !== 'default' && `\tcolor="${color}"`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			multiple && `\tmultiple`,
			hasProps && `/>`,
			!hasProps && `<Accordion {items} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'items', type: 'AccordionItem[]', initial: '[]' },
		{
			prop: 'variant',
			type: 'solid | soft | outlined | ghost',
			initial: 'ghost'
		},
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning | surface | default',
			initial: 'default'
		},
		{ prop: 'multiple', type: 'boolean', initial: 'false' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'itemClass', type: 'string', initial: '' },
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'contentClass', type: 'string', initial: '' }
	];

	const accordionItemProps = [
		{ prop: 'id', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'content', type: 'Snippet | string', initial: '' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' },
		{ prop: 'defaultOpen', type: 'boolean', initial: 'false' }
	];
</script>

<DocsHeader title="Accordion" llmUrl="https://ui-svelte.sappsdev.com/llm/display/accordion.md">
	Accordions display a list of expandable items, allowing users to show and hide content.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
		<div class="grid-2 md:grid-3 gap-2">
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
			<Checkbox bind:checked={multiple} label="Multiple" />
		</div>

		<div class="doc-preview">
			<Accordion {color} {variant} {multiple} items={sampleItems} />
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card>
		{#each variantOptions as item}
			<p class="text-sm mb-2">{item.label}</p>
			<div class="grid gap-4 mb-6">
				{#each colorOptions as colorItem}
					<Accordion
						variant={item.id as any}
						color={colorItem.id as any}
						items={[
							{
								id: `${item.id}-${colorItem.id}`,
								label: `${item.label} ${colorItem.label}`,
								content: `This is a ${item.label.toLowerCase()} accordion with ${colorItem.label.toLowerCase()} color.`
							}
						]}
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Multiple Open Items</p>
	<Card>
		<p class="text-sm mb-4">
			Use the <code>multiple</code> prop to allow multiple items to be open simultaneously.
		</p>
		<Accordion
			multiple
			items={[
				{
					id: 'multi-1',
					label: 'First Section',
					content: 'Content for the first section.',
					defaultOpen: true
				},
				{
					id: 'multi-2',
					label: 'Second Section',
					content: 'Content for the second section.',
					defaultOpen: true
				},
				{ id: 'multi-3', label: 'Third Section', content: 'Content for the third section.' }
			]}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Default Open Items</p>
	<Card>
		<p class="text-sm mb-4">
			Use the <code>defaultOpen</code> property on items to have them expanded by default.
		</p>
		<Accordion
			items={[
				{
					id: 'default-1',
					label: 'This is open by default',
					content: 'This content is visible by default.',
					defaultOpen: true
				},
				{
					id: 'default-2',
					label: 'Click to expand',
					content: 'This content was hidden initially.'
				},
				{ id: 'default-3', label: 'Another collapsed item', content: 'More hidden content here.' }
			]}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Disabled Items</p>
	<Card>
		<p class="text-sm mb-4">
			Use the <code>disabled</code> property on items to prevent them from being toggled.
		</p>
		<Accordion
			items={[
				{ id: 'disabled-1', label: 'Enabled Item', content: 'You can toggle this item.' },
				{
					id: 'disabled-2',
					label: 'Disabled Item (cannot expand)',
					content: 'This content cannot be accessed.',
					disabled: true
				},
				{
					id: 'disabled-3',
					label: 'Another Enabled Item',
					content: 'You can toggle this item too.'
				}
			]}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Accordion Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">AccordionItem Type</p>
	<DocsProps props={accordionItemProps} />
</Section>
