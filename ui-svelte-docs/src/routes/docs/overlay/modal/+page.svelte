<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Modal, Button, Checkbox, Select } from 'ui-svelte';

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
	let showHeader = $state(false);
	let showFooter = $state(false);
	let closeOnOverlay = $state(false);
	let hideCloseButton = $state(false);
	let isSolid = $state(false);

	let hasProps = $derived(
		[variant !== 'ghost', showHeader, showFooter, closeOnOverlay, hideCloseButton, isSolid].some(
			Boolean
		)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Modal, Button } from 'ui-svelte';`,
			`\n\tlet open = $state(false);`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Modal`,
			hasProps && `\tbind:open`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			closeOnOverlay && `\tcloseOnOverlay`,
			hideCloseButton && `\thideCloseButton`,
			isSolid && `\tisSolid`,
			hasProps && `>`,
			!hasProps && `<Modal bind:open>`,
			showHeader && `\t{#snippet header()}`,
			showHeader && `\t\t<h3>Modal Title</h3>`,
			showHeader && `\t{/snippet}\n`,
			`\t<p>Modal content goes here</p>`,
			showFooter && `\n\t{#snippet footer()}`,
			showFooter && `\t\t<Button onclick={() => open = false}>Close</Button>`,
			showFooter && `\t{/snippet}`,
			`</Modal>`,
			`\n<Button onclick={() => open = true}>Open Modal</Button>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'open', type: 'boolean', initial: 'false', required: true },
		{ prop: 'children', type: 'Snippet', initial: '', required: true },
		{ prop: 'onclose', type: '() => void', initial: '' },
		{ prop: 'header', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' },
		{
			prop: 'variant',
			type: 'ghost | surface | primary | secondary | muted',
			initial: 'ghost'
		},
		{ prop: 'closeOnOverlay', type: 'boolean', initial: 'false' },
		{ prop: 'hideCloseButton', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'footerClass', type: 'string', initial: '' },
		{ prop: 'contentClass', type: 'string', initial: '' }
	];
</script>

{#snippet header()}
	<h3>Modal Title</h3>
{/snippet}

{#snippet footer()}
	<div class="flex gap-2 justify-end">
		<Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
		<Button onclick={() => (open = false)}>Confirm</Button>
	</div>
{/snippet}

{#snippet preview()}
	<Modal
		bind:open
		{variant}
		header={showHeader ? header : undefined}
		footer={showFooter ? footer : undefined}
		{closeOnOverlay}
		{hideCloseButton}
		{isSolid}
	>
		<p>This is the modal content. You can put any content here.</p>
		<p class="mt-2 text-sm text-muted-foreground">
			Click outside or press ESC to close (if enabled).
		</p>
	</Modal>

	<Button onclick={() => (open = true)}>Open Modal</Button>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />

	<DocOptions title="Sections">
		<Checkbox bind:checked={showHeader} label="Header" />
		<Checkbox bind:checked={showFooter} label="Footer" />
	</DocOptions>

	<DocOptions title="Props">
		<Checkbox bind:checked={closeOnOverlay} label="Close on Overlay" />
		<Checkbox bind:checked={hideCloseButton} label="Hide Close Button" />
		<Checkbox bind:checked={isSolid} label="Solid" />
	</DocOptions>
{/snippet}

<DocHeader title="Modal">
	Modals are dialog windows that overlay the main content to focus user attention on specific tasks
	or information.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<div class="prose mt-8">
	<h3>Usage Notes</h3>
	<ul>
		<li>
			The <code>open</code> prop is bindable and controls the modal's visibility state.
		</li>
		<li>
			Use the <code>header</code> snippet for displaying the modal title or header content.
		</li>
		<li>
			Use the <code>footer</code> snippet for action buttons or additional information.
		</li>
		<li>
			Set <code>closeOnOverlay</code> to true to allow closing the modal by clicking outside of it.
		</li>
		<li>
			Use <code>hideCloseButton</code> to remove the default close button in the header.
		</li>
		<li>
			The <code>onclose</code> callback is triggered when the modal is closed by any method.
		</li>
		<li>
			Use <code>isSolid</code> to apply a solid background instead of a semi-transparent overlay.
		</li>
		<li>The modal can typically be closed by pressing the ESC key.</li>
	</ul>
</div>
