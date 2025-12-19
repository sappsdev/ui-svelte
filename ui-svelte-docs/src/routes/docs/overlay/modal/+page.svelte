<script lang="ts">
	import { Button, Card, Checkbox, Code, Modal, Section, Select } from 'ui-svelte';
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
		{ id: 'soft', label: 'Soft' }
	];

	let color: any = $state('default');
	let variant: any = $state('solid');
	let hasHeader = $state(true);
	let hasFooter = $state(true);
	let disableOverlayClose = $state(false);
	let hideCloseButton = $state(false);

	let open = $state(false);
	let openVariants = $state(false);
	let openColors = $state(false);
	let openHeaderFooter = $state(false);
	let selectedVariant: any = $state('solid');

	const handleOpenVariant = (variantId: string) => {
		selectedVariant = variantId;
		openVariants = true;
	};

	let selectedColor: any = $state('default');

	const handleOpenColor = (colorId: string) => {
		selectedColor = colorId;
		openColors = true;
	};

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Button, Modal } from 'ui-svelte';`,
			``,
			`\tlet open = $state(false);`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`<Button onclick={() => (open = true)}>Open Modal</Button>`,
			``,
			`<Modal`,
			`\tbind:open`,
			color !== 'default' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			disableOverlayClose && `\tdisableOverlayClose`,
			hideCloseButton && `\thideCloseButton`,
			`>`,
			hasHeader && `\t{#snippet header()}`,
			hasHeader && `\t\t<h4>Modal Header</h4>`,
			hasHeader && `\t{/snippet}`,
			`\t<p>Modal body content goes here.</p>`,
			hasFooter && `\t{#snippet footer()}`,
			hasFooter && `\t\t<Button onclick={() => (open = false)}>Close</Button>`,
			hasFooter && `\t{/snippet}`,
			`</Modal>`
		].filter(Boolean);

		return [...scriptLines, '', ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'open', type: 'boolean', initial: 'false' },
		{ prop: 'onclose', type: '() => void', initial: '' },
		{ prop: 'children', type: 'Snippet', initial: '' },
		{ prop: 'header', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | warning | danger | surface | default',
			initial: 'default'
		},
		{
			prop: 'variant',
			type: 'solid | soft',
			initial: 'solid'
		},
		{ prop: 'disableOverlayClose', type: 'boolean', initial: 'false' },
		{ prop: 'hideCloseButton', type: 'boolean', initial: 'false' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'contentClass', type: 'string', initial: '' },
		{ prop: 'footerClass', type: 'string', initial: '' }
	];
</script>

{#snippet header()}
	<h4 class="card-title">Modal Header</h4>
{/snippet}

{#snippet footer()}
	<Button size="sm" onclick={() => (open = false)}>Close</Button>
{/snippet}

<DocsHeader title="Modal" llmUrl="https://ui-svelte.sappsdev.com/llm/overlay/modal.md">
	Modals are dialog overlays that focus user attention on important content or actions.
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
			<Checkbox bind:checked={disableOverlayClose} label="Disable Overlay Close" />
			<Checkbox bind:checked={hideCloseButton} label="Hide Close Button" />
		</div>

		<div class="doc-preview">
			<Button onclick={() => (open = true)}>Open Modal</Button>
			<Modal
				bind:open
				{color}
				{variant}
				{disableOverlayClose}
				{hideCloseButton}
				header={hasHeader ? header : undefined}
				footer={hasFooter ? footer : undefined}
			>
				<p class="card-description">
					This is the modal body content. You can place any content here.
				</p>
			</Modal>
		</div>

		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each variantOptions as item}
				<Button onclick={() => handleOpenVariant(item.id)} variant={item.id as any}>
					{item.label} Modal
				</Button>
			{/each}
		</div>
		<Modal bind:open={openVariants} variant={selectedVariant} color="primary">
			{#snippet header()}
				<h4 class="card-title">{selectedVariant === 'solid' ? 'Solid' : 'Soft'} Variant</h4>
			{/snippet}
			<p class="card-description">
				This modal uses the {selectedVariant} variant with primary color.
			</p>
			{#snippet footer()}
				<Button size="sm" onclick={() => (openVariants = false)}>Close</Button>
			{/snippet}
		</Modal>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each colorOptions as item}
				<Button onclick={() => handleOpenColor(item.id)} color={item.id as any} size="sm">
					{item.label}
				</Button>
			{/each}
		</div>
		<Modal bind:open={openColors} color={selectedColor}>
			{#snippet header()}
				<h4 class="card-title">{colorOptions.find((c) => c.id === selectedColor)?.label} Modal</h4>
			{/snippet}
			<p class="card-description">This modal uses the {selectedColor} color theme.</p>
			{#snippet footer()}
				<Button size="sm" color={selectedColor} onclick={() => (openColors = false)}>Confirm</Button
				>
			{/snippet}
		</Modal>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Header & Footer</p>
	<Card>
		<div class="wrap gap-4 center">
			<Button onclick={() => (openHeaderFooter = true)}>Modal with Header & Footer</Button>
		</div>
		<Modal bind:open={openHeaderFooter} color="primary">
			{#snippet header()}
				<h4 class="card-title">Confirmation</h4>
			{/snippet}
			<p class="card-description">
				Are you sure you want to proceed with this action? This operation cannot be undone.
			</p>
			{#snippet footer()}
				<div class="flex gap-2">
					<Button
						size="sm"
						color="primary"
						variant="soft"
						onclick={() => (openHeaderFooter = false)}>Cancel</Button
					>
				</div>
			{/snippet}
		</Modal>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
