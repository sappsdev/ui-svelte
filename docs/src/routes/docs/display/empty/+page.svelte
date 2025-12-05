<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Select, Checkbox, Empty } from 'ui-svelte';

	const typeOptions = [
		{ id: 'playlist', label: 'Playlist' },
		{ id: 'result', label: 'Result' },
		{ id: 'data', label: 'Data' },
		{ id: 'template', label: 'Template' }
	];

	// Selects
	let type: any = $state('result');

	// Props
	let title = $state('');
	let description = $state('');
	let href = $state('');

	// States
	let withTitle = $state(false);
	let withDescription = $state(false);
	let withHref = $state(false);
	let withOnclick = $state(false);

	let hasProps = $derived([type !== 'result', title, description, href, withOnclick].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Empty } from 'ui-svelte';`,
			withOnclick && `\n\tfunction handleClick() {`,
			withOnclick && `\t\tconsole.log('Empty state clicked');`,
			withOnclick && `\t}`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Empty`,
			type !== 'result' && `\ttype="${type}"`,
			title && `\ttitle="${title}"`,
			description && `\tdescription="${description}"`,
			href && `\thref="${href}"`,
			withOnclick && `\tonclick={handleClick}`,
			hasProps && `/>`,
			!hasProps && `<Empty />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'type', type: 'playlist | result | data | template', initial: 'result' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'title', type: 'string', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '() => void', initial: '' }
	];

	function handleClick() {
		alert('Empty state clicked!');
	}
</script>

{#snippet preview()}
	<Empty
		{type}
		title={title || undefined}
		description={description || undefined}
		href={href || undefined}
		onclick={withOnclick ? handleClick : undefined}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Type" size="sm" options={typeOptions} bind:value={type} />

	<DocOptions title="Content">
		<Checkbox onchange={(v) => (v ? (title = 'No items found') : (title = ''))} label="title" />
		<Checkbox
			onchange={(v) =>
				v ? (description = 'Try adjusting your search or filters') : (description = '')}
			label="description"
		/>
	</DocOptions>

	<DocOptions title="Actions">
		<Checkbox
			onchange={(v) => {
				if (v) {
					href = '/create';
					withHref = true;
				} else {
					href = '';
					withHref = false;
				}
			}}
			label="href"
		/>
		<Checkbox bind:checked={withOnclick} label="onclick" />
	</DocOptions>
{/snippet}

<DocHeader title="Empty">
	Empty state components display a message when there's no content to show, guiding users on what to
	do next.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<div class="prose mt-8">
	<h3>Usage</h3>
	<p>
		The Empty component is used to communicate empty states in your application. It can display
		different visual styles based on the type prop, and can include optional actions through either
		a link (href) or a click handler (onclick).
	</p>
</div>
