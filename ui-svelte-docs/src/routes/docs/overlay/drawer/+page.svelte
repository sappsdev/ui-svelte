<script lang="ts">
	import { Button, Card, Checkbox, Code, Drawer, Section, Select } from 'ui-svelte';
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
		{ id: 'soft', label: 'Soft' }
	];

	const positionOptions = [
		{ id: 'start', label: 'Start (Left)' },
		{ id: 'end', label: 'End (Right)' },
		{ id: 'top', label: 'Top' },
		{ id: 'bottom', label: 'Bottom' }
	];

	let color: any = $state('background');
	let variant: any = $state('solid');
	let position: any = $state('start');
	let hasHeader = $state(true);
	let hasFooter = $state(true);
	let disableOverlayClose = $state(false);
	let hideCloseButton = $state(false);

	let open = $state(false);
	let openVariants = $state(false);
	let openColors = $state(false);
	let openPositions = $state(false);
	let openHeaderFooter = $state(false);
	let selectedVariant: any = $state('solid');
	let selectedColor: any = $state('background');
	let selectedPosition: any = $state('start');

	const handleOpenVariant = (variantId: string) => {
		selectedVariant = variantId;
		openVariants = true;
	};

	const handleOpenColor = (colorId: string) => {
		selectedColor = colorId;
		openColors = true;
	};

	const handleOpenPosition = (positionId: string) => {
		selectedPosition = positionId;
		openPositions = true;
	};

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Button, Drawer } from 'ui-svelte';`,
			``,
			`\tlet open = $state(false);`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`<Button onclick={() => (open = true)}>Open Drawer</Button>`,
			``,
			`<Drawer`,
			`\tbind:open`,
			position !== 'start' && `\tposition="${position}"`,
			color !== 'background' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			disableOverlayClose && `\tdisableOverlayClose`,
			hideCloseButton && `\thideCloseButton`,
			`>`,
			hasHeader && `\t{#snippet header()}`,
			hasHeader && `\t\t<h4>Drawer Header</h4>`,
			hasHeader && `\t{/snippet}`,
			`\t<p>Drawer body content goes here.</p>`,
			hasFooter && `\t{#snippet footer()}`,
			hasFooter && `\t\t<Button onclick={() => (open = false)}>Close</Button>`,
			hasFooter && `\t{/snippet}`,
			`</Drawer>`
		].filter(Boolean);

		return [...scriptLines, '', ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'open', type: 'boolean', initial: 'false' },
		{ prop: 'onclose', type: '() => void', initial: '' },
		{ prop: 'position', type: 'start | end | top | bottom', initial: 'start' },
		{ prop: 'children', type: 'Snippet', initial: '' },
		{ prop: 'header', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | warning | danger | surface | background',
			initial: 'background'
		},
		{
			prop: 'variant',
			type: 'solid | soft',
			initial: 'solid'
		},
		{ prop: 'disableOverlayClose', type: 'boolean', initial: 'false' },
		{ prop: 'hideCloseButton', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'bodyClass', type: 'string', initial: '' },
		{ prop: 'footerClass', type: 'string', initial: '' }
	];
</script>

{#snippet header()}
	<h4 class="card-title">Drawer Header</h4>
{/snippet}

{#snippet footer()}
	<Button size="sm" onclick={() => (open = false)}>Close</Button>
{/snippet}

<DocsHeader title="Drawer" llmUrl="https://ui-svelte.sappsdev.com/llm/overlay/drawer.md">
	Drawers are side panels that slide in from any edge of the screen, perfect for navigation,
	filters, or supplementary content.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Position"
				size="sm"
				options={positionOptions}
				bind:value={position}
			/>
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
			<Button onclick={() => (open = true)}>Open Drawer</Button>
			<Drawer
				bind:open
				{position}
				{color}
				{variant}
				{disableOverlayClose}
				{hideCloseButton}
				header={hasHeader ? header : undefined}
				footer={hasFooter ? footer : undefined}
			>
				<p class="card-description">
					This is the drawer body content. You can place any content here.
				</p>
			</Drawer>
		</div>

		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Positions</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			{#each positionOptions as item}
				<Button onclick={() => handleOpenPosition(item.id)} size="sm">
					{item.label}
				</Button>
			{/each}
		</div>
		<Drawer bind:open={openPositions} position={selectedPosition} color="primary">
			{#snippet header()}
				<h4 class="card-title">
					{positionOptions.find((p) => p.id === selectedPosition)?.label} Drawer
				</h4>
			{/snippet}
			<p class="card-description">
				This drawer slides in from the {selectedPosition} edge of the screen.
			</p>
			{#snippet footer()}
				<Button size="sm" onclick={() => (openPositions = false)}>Close</Button>
			{/snippet}
		</Drawer>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			{#each variantOptions as item}
				<Button onclick={() => handleOpenVariant(item.id)} variant={item.id as any}>
					{item.label} Drawer
				</Button>
			{/each}
		</div>
		<Drawer bind:open={openVariants} variant={selectedVariant} color="primary">
			{#snippet header()}
				<h4 class="card-title">{selectedVariant === 'solid' ? 'Solid' : 'Soft'} Variant</h4>
			{/snippet}
			<p class="card-description">
				This drawer uses the {selectedVariant} variant with primary color.
			</p>
			{#snippet footer()}
				<Button size="sm" onclick={() => (openVariants = false)}>Close</Button>
			{/snippet}
		</Drawer>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			{#each colorOptions as item}
				<Button onclick={() => handleOpenColor(item.id)} color={item.id as any} size="sm">
					{item.label}
				</Button>
			{/each}
		</div>
		<Drawer bind:open={openColors} color={selectedColor}>
			{#snippet header()}
				<h4 class="card-title">{colorOptions.find((c) => c.id === selectedColor)?.label} Drawer</h4>
			{/snippet}
			<p class="card-description">This drawer uses the {selectedColor} color theme.</p>
			{#snippet footer()}
				<Button size="sm" color={selectedColor} onclick={() => (openColors = false)}>Confirm</Button
				>
			{/snippet}
		</Drawer>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Header & Footer</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<Button onclick={() => (openHeaderFooter = true)}>Drawer with Header & Footer</Button>
		</div>
		<Drawer bind:open={openHeaderFooter} color="primary">
			{#snippet header()}
				<h4 class="card-title">Navigation Menu</h4>
			{/snippet}
			<p class="card-description">
				Use drawers for navigation menus, settings panels, filters, or any supplementary content
				that doesn't require a full page.
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
		</Drawer>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
