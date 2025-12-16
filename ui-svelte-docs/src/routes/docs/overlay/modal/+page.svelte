<script lang="ts">
	import { Button, Card, Checkbox, Code, Modal, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const variantOptions = [
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	// Selects
	let variant: any = $state('ghost');

	// States
	let open = $state(false);
	let hasHeader = $state(true);
	let hasFooter = $state(true);
	let hideCloseButton = $state(false);
	let disableOverlayClose = $state(false);
	let isSolid = $state(false);

	// Modal states for examples
	let openConfirm = $state(false);
	let openForm = $state(false);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Modal, Button } from 'ui-svelte';`,
			`\n\tlet open = $state(false);`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`<Button onclick={() => open = true}>Open Modal</Button>`,
			``,
			`<Modal`,
			`\tbind:open`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			isSolid && `\tisSolid`,
			hideCloseButton && `\thideCloseButton`,
			disableOverlayClose && `\tdisableOverlayClose`,
			`>`,
			hasHeader && `\t{#snippet header()}`,
			hasHeader && `\t\t<h4>Modal Header</h4>`,
			hasHeader && `\t{/snippet}`,
			`\t<p>Modal content goes here.</p>`,
			hasFooter && `\t{#snippet footer()}`,
			hasFooter && `\t\t<Button onclick={() => open = false}>Close</Button>`,
			hasFooter && `\t{/snippet}`,
			`</Modal>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'open', type: 'boolean', initial: 'false' },
		{ prop: 'children', type: 'Snippet', initial: '' },
		{ prop: 'header', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' },
		{ prop: 'onclose', type: '() => void', initial: '' },
		{
			prop: 'variant',
			type: 'ghost | surface | primary | secondary | muted',
			initial: 'ghost'
		},
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'contentClass', type: 'string', initial: '' },
		{ prop: 'footerClass', type: 'string', initial: '' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{ prop: 'hideCloseButton', type: 'boolean', initial: 'false' },
		{ prop: 'disableOverlayClose', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet header()}
	<h4>Modal Header</h4>
{/snippet}

{#snippet footer()}
	<div class="row gap-2 justify-end">
		<Button size="sm" variant="ghost" onclick={() => (open = false)}>Cancel</Button>
		<Button size="sm" onclick={() => (open = false)}>Confirm</Button>
	</div>
{/snippet}

<DocsHeader title="Modal" llmUrl="https://ui-svelte.sappsdev.com/llm/overlay/modal.md">
	Modals are dialog overlays that require user interaction. They appear above the main content and
	block interaction with the rest of the page until dismissed.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<Button onclick={() => (open = true)}>Open Modal</Button>
		<Modal
			bind:open
			{variant}
			header={hasHeader ? header : undefined}
			footer={hasFooter ? footer : undefined}
			{hideCloseButton}
			{disableOverlayClose}
			{isSolid}
		>
			<p>This is the modal body content. You can add any content here.</p>
		</Modal>
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={hasHeader} label="Header" />
			<Checkbox bind:checked={hasFooter} label="Footer" />
			<Checkbox bind:checked={isSolid} label="Solid" />
			<Checkbox bind:checked={hideCloseButton} label="Hide Close" />
			<Checkbox bind:checked={disableOverlayClose} label="Disable Overlay Close" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section bodyClass="grid-2 md:grid-3">
	<!-- Confirmation Modal -->
	<Card>
		{#snippet header()}
			<h4>Confirmation Modal</h4>
		{/snippet}
		<p class="text-sm">
			Modals for confirming user actions with clear primary and secondary options.
		</p>
		<Button size="sm" onclick={() => (openConfirm = true)}>Show Confirmation</Button>
		<Modal bind:open={openConfirm} variant="surface">
			{#snippet header()}
				<h4>Confirm Action</h4>
			{/snippet}
			<p>Are you sure you want to proceed with this action? This cannot be undone.</p>
			{#snippet footer()}
				<div class="row gap-2">
					<Button size="sm" variant="ghost" onclick={() => (openConfirm = false)}>Cancel</Button>
					<Button size="sm" variant="danger" onclick={() => (openConfirm = false)}>Confirm</Button>
				</div>
			{/snippet}
		</Modal>
		{#snippet footer()}
			<code class="text-xs">variant="surface"</code>
		{/snippet}
	</Card>

	<!-- Form Modal -->
	<Card>
		{#snippet header()}
			<h4>Form Modal</h4>
		{/snippet}
		<p class="text-sm">Modals can contain forms and interactive elements.</p>
		<Button size="sm" onclick={() => (openForm = true)}>Show Form</Button>
		<Modal bind:open={openForm} variant="ghost">
			{#snippet header()}
				<h4>Contact Us</h4>
			{/snippet}
			<div class="column gap-4">
				<input type="text" placeholder="Your name" class="p-2 border border-muted-300 rounded" />
				<input type="email" placeholder="Your email" class="p-2 border border-muted-300 rounded" />
				<textarea placeholder="Your message" rows="3" class="p-2 border border-muted-300 rounded"
				></textarea>
			</div>
			{#snippet footer()}
				<div class="row gap-2">
					<Button size="sm" variant="ghost" onclick={() => (openForm = false)}>Cancel</Button>
					<Button size="sm" variant="primary" onclick={() => (openForm = false)}>Send</Button>
				</div>
			{/snippet}
		</Modal>
		{#snippet footer()}
			<code class="text-xs">variant="ghost"</code>
		{/snippet}
	</Card>

	<!-- Alert Modal -->
	<Card variant="warning">
		{#snippet header()}
			<h4>⚠️ Alert Modal</h4>
		{/snippet}
		<p class="text-sm">Use variant colors to indicate the nature of the modal content.</p>
		{#snippet footer()}
			<code class="text-xs">variant="primary" isSolid</code>
		{/snippet}
	</Card>
</Section>

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Closing:</strong> Users can close the modal by clicking the X button, clicking the
					overlay, or programmatically setting
					<code class="px-1 py-0.5 bg-blue rounded">open = false</code>
				</li>
				<li>
					<strong>Overlay Close:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">disableOverlayClose</code> to prevent closing by clicking
					outside the modal
				</li>
				<li>
					<strong>Callbacks:</strong> Use the
					<code class="px-1 py-0.5 bg-blue rounded">onclose</code> callback to perform actions when the
					modal is closed
				</li>
				<li>
					<strong>Focus:</strong> The modal automatically manages focus trapping for accessibility
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<!-- Basic Modal -->
<script lang="ts">
	import { Button, Modal } from 'ui-svelte';
	let open = $state(false);
<\/script>

<Button onclick={() => open = true}>Open Modal</Button>

<Modal bind:open>
	{#snippet header()}
		<h4>Modal Title</h4>
	{/snippet}
	<p>Modal content goes here.</p>
	{#snippet footer()}
		<Button onclick={() => open = false}>Close</Button>
	{/snippet}
</Modal>

<!-- Confirmation Modal -->
<script lang="ts">
	let openConfirm = $state(false);
<\/script>

<Modal bind:open={openConfirm} variant="surface">
	{#snippet header()}
		<h4>Confirm Delete</h4>
	{/snippet}
	<p>Are you sure you want to delete this item?</p>
	{#snippet footer()}
		<div class="row gap-2">
			<Button variant="ghost" onclick={() => openConfirm = false}>Cancel</Button>
			<Button variant="danger" onclick={handleDelete}>Delete</Button>
		</div>
	{/snippet}
</Modal>

<!-- Modal with Solid Variant -->
<script lang="ts">
	let openAlert = $state(false);
<\/script>

<Modal bind:open={openAlert} variant="primary" isSolid>
	{#snippet header()}
		<h4>Important Notice</h4>
	{/snippet}
	<p>This is an important message that requires your attention.</p>
	{#snippet footer()}
		<Button variant="ghost" onclick={() => openAlert = false}>Dismiss</Button>
	{/snippet}
</Modal>

<!-- Modal without Close Button -->
<script lang="ts">
	let openRequired = $state(false);
<\/script>

<Modal bind:open={openRequired} hideCloseButton disableOverlayClose>
	{#snippet header()}
		<h4>Required Action</h4>
	{/snippet}
	<p>You must complete this action to continue.</p>
	{#snippet footer()}
		<Button onclick={handleComplete}>Complete</Button>
	{/snippet}
</Modal>`}
		/>
	</Card>
</Section>

<DocsProps {props} />
