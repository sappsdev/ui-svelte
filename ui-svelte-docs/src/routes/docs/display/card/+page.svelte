<script lang="ts">
	import { Button, Card, Checkbox, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	let variant: any = $state('outlined');
	let hasHeader = $state(false);
	let hasFooter = $state(false);
	let hasCover = $state(false);
	let isSolid = $state(false);
	let hasOverlay = $state(false);

	let hasProps = $derived(
		[variant !== 'outlined', hasHeader, hasFooter, hasCover, isSolid, hasOverlay].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Card } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`<Card`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			hasCover && `\tcover="/path/to/image.jpg"`,
			isSolid && `\tisSolid`,
			hasOverlay && `\thasOverlay`,
			`>`,
			hasHeader && `\t{#snippet header()}`,
			hasHeader && `\t\t<h4>Card Header</h4>`,
			hasHeader && `\t{/snippet}`,
			`\t<p>Card content goes here.</p>`,
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
			prop: 'variant',
			type: 'primary | secondary | muted | success | info | warning | danger | surface | outlined | ghost',
			initial: 'outlined'
		},
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'bodyClass', type: 'string', initial: '' },
		{ prop: 'footerClass', type: 'string', initial: '' },
		{ prop: 'coverClass', type: 'string', initial: '' },
		{ prop: 'overlayClass', type: 'string', initial: '' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{ prop: 'hasOverlay', type: 'boolean', initial: 'false' }
	];
</script>

<DocsHeader title="Card" llmUrl="https://ui-svelte.sappsdev.com/llm/display/card.md">
	Cards are surfaces that display content and actions on a single topic.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<Card
			{variant}
			cover={hasCover ? 'https://picsum.photos/400/200' : undefined}
			{isSolid}
			{hasOverlay}
		>
			{#snippet header()}
				{#if hasHeader}
					<h4>Card Header</h4>
				{/if}
			{/snippet}
			<p>This is the card body content. You can add any content here.</p>
			{#snippet footer()}
				{#if hasFooter}
					<Button size="sm">Action</Button>
				{/if}
			{/snippet}
		</Card>
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={hasHeader} label="Header" />
			<Checkbox bind:checked={hasFooter} label="Footer" />
			<Checkbox bind:checked={hasCover} label="Cover" />
			<Checkbox bind:checked={isSolid} label="Solid" />
			<Checkbox bind:checked={hasOverlay} label="Overlay" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="grid-3 md:grid-5 center">
		{#snippet header()}
			<h4>Card Variants</h4>
		{/snippet}
		{#each variantOptions as item}
			<Card variant={item.id as any}>
				<p class="text-sm">{item.label}</p>
			</Card>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-3 md:grid-5 center">
		{#snippet header()}
			<h4>Card Solid</h4>
		{/snippet}
		{#each variantOptions as item}
			<Card variant={item.id as any} isSolid>
				<p class="text-sm">{item.label}</p>
			</Card>
		{/each}
	</Card>
</Section>

<Section bodyClass="grid-2 md:grid-4">
	<!-- Card con cover y overlay -->
	<Card cover="https://picsum.photos/seed/stream/400/300" hasOverlay>
		<p class="text-xs text-muted">WHAT TO WATCH</p>
		<h4>Stream the Acme event</h4>
	</Card>

	<!-- Card con cover, estilo nature -->
	<Card cover="https://picsum.photos/seed/plant/400/300" hasOverlay>
		<p class="text-xs text-muted">PLANT A TREE</p>
		<h4>Contribute to the planet</h4>
	</Card>

	<!-- Card con cover tech -->
	<Card cover="https://picsum.photos/seed/laptop/400/300" hasOverlay>
		<p class="text-xs text-muted">SUPERCHARGED</p>
		<h4>Creates beauty like a beast</h4>
	</Card>

	<!-- Card simple con header y footer -->
	<Card>
		{#snippet header()}
			<h4>Simple Card</h4>
		{/snippet}
		<p class="text-sm">
			This card demonstrates the classic structure with header, body, and footer.
		</p>
		{#snippet footer()}
			<Button size="sm" variant="primary">Learn More</Button>
		{/snippet}
	</Card>

	<!-- Card product con cover y acción -->
	<Card cover="https://picsum.photos/seed/camera/400/300" hasOverlay>
		<p class="text-xs" style="color: #4ade80;">NEW</p>
		<h4>Acme camera</h4>
		{#snippet footer()}
			<div class="flex between items-center">
				<p class="text-xs text-muted">Available soon. Get notified.</p>
				<Button size="sm" variant="info">Notify Me</Button>
			</div>
		{/snippet}
	</Card>

	<!-- Card lifestyle con cover -->
	<Card cover="https://picsum.photos/seed/wellness/400/300" hasOverlay>
		<p class="text-xs text-muted">YOUR DAY YOUR WAY</p>
		<h4>Your checklist for better sleep</h4>
		{#snippet footer()}
			<div class="flex between items-center">
				<div class="flex items-center gap-2">
					<span class="text-xs">🧘 Breathing App</span>
				</div>
				<Button size="sm" variant="ghost">Get App</Button>
			</div>
		{/snippet}
	</Card>

	<!-- Card variant success solid -->
	<Card variant="success" isSolid>
		{#snippet header()}
			<h4>Success!</h4>
		{/snippet}
		<p class="text-sm">Your payment has been processed successfully.</p>
		{#snippet footer()}
			<Button size="sm" variant="ghost">View Receipt</Button>
		{/snippet}
	</Card>

	<!-- Card variant warning -->
	<Card variant="warning">
		{#snippet header()}
			<h4>⚠️ Attention Required</h4>
		{/snippet}
		<p class="text-sm">Your subscription expires in 3 days. Renew now to avoid interruption.</p>
		{#snippet footer()}
			<div class="flex gap-2">
				<Button size="sm" variant="ghost">Remind Later</Button>
				<Button size="sm" variant="warning">Renew Now</Button>
			</div>
		{/snippet}
	</Card>
</Section>

<DocsProps {props} />
