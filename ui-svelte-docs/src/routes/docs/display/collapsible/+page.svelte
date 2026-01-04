<script lang="ts">
	import { Collapsible, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import { FolderLinearIcon } from '$lib/icons';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';
	import { Icon } from 'ui-svelte';

	const colorOptions = [
		{ id: 'background', label: 'Background' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const variantOptions = [
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'solid', label: 'Solid' }
	];

	let color: any = $state('background');
	let variant: any = $state('ghost');

	let startContent = $state(false);
	let disabled = $state(false);
	let defaultOpen = $state(false);

	let hasProps = $derived(
		[color !== 'background', variant !== 'ghost', startContent, disabled, defaultOpen].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Collapsible } from 'ui-svelte';`,
			startContent && `\timport { Icon } from 'ui-svelte';`,
			startContent && `\timport { FolderLinearIcon } from '$lib/icons';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Collapsible`,
			hasProps && `\tlabel="Collapsible Header"`,
			color !== 'background' && `\tcolor="${color}"`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			disabled && `\tdisabled`,
			defaultOpen && `\tdefaultOpen`,
			hasProps && `>`,
			startContent && `\t{#snippet startContent()}`,
			startContent && `\t\t<Icon icon={FolderLinearIcon} />`,
			startContent && `\t{/snippet}`,
			hasProps && `\t{#snippet content()}`,
			hasProps && `\t\t<p>This is the collapsible content.</p>`,
			hasProps && `\t{/snippet}`,
			hasProps && `</Collapsible>`,
			!hasProps && `<Collapsible label="Collapsible Header">`,
			!hasProps && `\t{#snippet content()}`,
			!hasProps && `\t\t<p>This is the collapsible content.</p>`,
			!hasProps && `\t{/snippet}`,
			!hasProps && `</Collapsible>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'content', type: 'Snippet | string', initial: '' },
		{ prop: 'startContent', type: 'Snippet', initial: '' },
		{
			prop: 'variant',
			type: 'solid | soft | outlined | ghost',
			initial: 'ghost'
		},
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning | surface | background',
			initial: 'background'
		},
		{ prop: 'disabled', type: 'boolean', initial: 'false' },
		{ prop: 'defaultOpen', type: 'boolean', initial: 'false' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'contentClass', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Collapsible" llmUrl="https://ui-svelte.sappsdev.com/llm/display/collapsible.md">
	Collapsible is a component that allows users to toggle the visibility of content.
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
			<Checkbox bind:checked={startContent} label="startContent" />
			<Checkbox bind:checked={disabled} label="Disabled" />
			<Checkbox bind:checked={defaultOpen} label="Default Open" />
		</div>

		<div class="doc-preview">
			<Collapsible label="Collapsible Header" {color} {variant} {disabled} {defaultOpen}>
				{#snippet startContent()}
					{#if startContent}
						<Icon icon={FolderLinearIcon} />
					{/if}
				{/snippet}
				{#snippet content()}
					<p>
						This is the collapsible content. Click the header to expand or collapse this section.
					</p>
				{/snippet}
			</Collapsible>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Start Content</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4">
			{#each colorOptions.slice(0, 4) as colorItem}
				<Collapsible label={colorItem.label + ' with Icon'} color={colorItem.id as any}>
					{#snippet startContent()}
						<Icon icon={FolderLinearIcon} class="h-5 w-auto" />
					{/snippet}
					{#snippet content()}
						<p>This collapsible has a start icon.</p>
					{/snippet}
				</Collapsible>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Other Props</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4">
			<Collapsible label="Default Open" defaultOpen>
				{#snippet content()}
					<p>This collapsible is open by default.</p>
				{/snippet}
			</Collapsible>
			<Collapsible label="Disabled Collapsible" disabled>
				{#snippet content()}
					<p>This content should not be visible.</p>
				{/snippet}
			</Collapsible>
			<Collapsible label="String Content" content="This is a simple string content." />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
