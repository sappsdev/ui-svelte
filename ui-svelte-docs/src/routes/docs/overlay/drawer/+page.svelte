<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Drawer, Button, Checkbox, Select } from 'ui-svelte';

	const variantOptions = [
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const positionOptions = [
		{ id: 'start', label: 'Start' },
		{ id: 'end', label: 'End' },
		{ id: 'top', label: 'Top' },
		{ id: 'bottom', label: 'Bottom' }
	];

	// Selects
	let variant: any = $state('ghost');
	let position: any = $state('start');

	// States
	let open = $state(false);
	let showHeader = $state(false);
	let showFooter = $state(false);
	let isSolid = $state(false);

	let hasProps = $derived(
		[variant !== 'ghost', position !== 'start', showHeader, showFooter, isSolid].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Drawer, Button } from 'ui-svelte';`,
			`\n\tlet open = $state(false);`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Drawer`,
			hasProps && `\tbind:open`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			position !== 'start' && `\tposition="${position}"`,
			isSolid && `\tisSolid`,
			hasProps && `>`,
			!hasProps && `<Drawer bind:open>`,
			showHeader && `\t{#snippet header()}`,
			showHeader && `\t\t<h3>Drawer Header</h3>`,
			showHeader && `\t{/snippet}\n`,
			`\t<p>Drawer content goes here</p>`,
			showFooter && `\n\t{#snippet footer()}`,
			showFooter && `\t\t<Button onclick={() => open = false}>Close</Button>`,
			showFooter && `\t{/snippet}`,
			`</Drawer>`,
			`\n<Button onclick={() => open = true}>Open Drawer</Button>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'open', type: 'boolean', initial: 'false', required: true },
		{ prop: 'children', type: 'Snippet', initial: '', required: true },
		{ prop: 'onclose', type: '() => void', initial: '' },
		{ prop: 'position', type: 'start | end | top | bottom', initial: 'start' },
		{ prop: 'header', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' },
		{ prop: 'variant', type: 'ghost | surface | primary | secondary | muted', initial: 'ghost' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'footerClass', type: 'string', initial: '' },
		{ prop: 'contentClass', type: 'string', initial: '' }
	];
</script>

{#snippet header()}
	<h6>Drawer Header</h6>
{/snippet}

{#snippet footer()}
	<Button onclick={() => (open = false)}>Close</Button>
{/snippet}

{#snippet preview()}
	<Button onclick={() => (open = true)}>Open Drawer</Button>

	<Drawer
		bind:open
		{variant}
		{position}
		{isSolid}
		header={showHeader ? header : undefined}
		footer={showFooter ? footer : undefined}
		onclose={() => (open = false)}
	>
		<div class="space-y-4">
			<p>Drawer content goes here</p>
			<p class="text-sm text-muted-foreground">
				This is a drawer component that slides in from the {position} of the screen.
			</p>
		</div>
	</Drawer>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Position" size="sm" options={positionOptions} bind:value={position} />

	<DocOptions title="Sections">
		<Checkbox bind:checked={showHeader} label="Header" />
		<Checkbox bind:checked={showFooter} label="Footer" />
	</DocOptions>

	<DocOptions title="Props">
		<Checkbox bind:checked={isSolid} label="Solid" />
	</DocOptions>
{/snippet}

<DocHeader title="Drawer">
	Drawers are panels that slide in from the edge of the screen to display additional content or
	actions.
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
			The <code>open</code> prop controls the visibility of the drawer and should be bound with
			<code>bind:open</code> for two-way data binding.
		</li>
		<li>
			Use the <code>position</code> prop to control from which edge the drawer slides in (start, end,
			top, or bottom).
		</li>
		<li>
			The <code>onclose</code> callback is triggered when the drawer is closed by clicking the overlay
			or pressing Escape.
		</li>
		<li>
			Use the <code>header</code> snippet for titles or navigation elements at the top of the drawer.
		</li>
		<li>
			Use the <code>footer</code> snippet for action buttons or additional information at the bottom.
		</li>
		<li>
			The <code>isSolid</code> prop removes transparency from the drawer background for better contrast.
		</li>
		<li>
			The drawer includes an overlay that can be clicked to close the drawer, which also triggers
			the <code>onclose</code> callback.
		</li>
	</ul>
</div>
