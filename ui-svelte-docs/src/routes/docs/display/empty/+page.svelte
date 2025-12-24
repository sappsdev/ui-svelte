<script lang="ts">
	import { Empty, Card, Checkbox, Code, Section, Select, TextField } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const typeOptions = [
		{ id: 'playlist', label: 'Playlist' },
		{ id: 'result', label: 'Result' },
		{ id: 'data', label: 'Data' },
		{ id: 'template', label: 'Template' }
	];

	const targetOptions = [
		{ id: '', label: 'Default' },
		{ id: '_self', label: '_self' },
		{ id: '_blank', label: '_blank' },
		{ id: '_parent', label: '_parent' },
		{ id: '_top', label: '_top' }
	];

	let type: any = $state('template');
	let target: any = $state('');

	let title = $state('');
	let description = $state('');
	let href = $state('');

	let withTitle = $state(false);
	let withDescription = $state(false);
	let withHref = $state(false);
	let withOnclick = $state(false);

	let hasProps = $derived(
		[type !== 'template', title, description, href, withOnclick, target].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Empty } from 'ui-svelte';`,
			withOnclick && `\n\tfunction handleClick() {`,
			withOnclick && `\t\tconsole.log('Empty action clicked');`,
			withOnclick && `\t}`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Empty`,
			type !== 'template' && `\ttype="${type}"`,
			title && `\ttitle="${title}"`,
			description && `\tdescription="${description}"`,
			href && `\thref="${href}"`,
			target && `\ttarget="${target}"`,
			withOnclick && `\tonclick={handleClick}`,
			hasProps && `/>`,
			!hasProps && `<Empty />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'type', type: 'playlist | result | data | template', initial: 'template' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'title', type: 'string', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'target', type: '_self | _blank | _parent | _top', initial: '' },
		{ prop: 'onclick', type: '() => void', initial: '' },
		{ prop: 'action', type: 'Snippet', initial: '' }
	];

	function handleClick() {
		alert('Empty action clicked!');
	}
</script>

<DocsHeader title="Empty" llmUrl="https://ui-svelte.sappsdev.com/llm/display/empty.md">
	Empty state components display a message when there's no content to show, guiding users on what to
	do next.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Type"
				size="sm"
				options={typeOptions}
				bind:value={type}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Target"
				size="sm"
				options={targetOptions}
				bind:value={target}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox
				bind:checked={withTitle}
				onchange={(v) => (v ? (title = 'No items found') : (title = ''))}
				label="title"
			/>
			<Checkbox
				bind:checked={withDescription}
				onchange={(v) =>
					v ? (description = 'Try adjusting your search or filters') : (description = '')}
				label="description"
			/>
			<Checkbox
				bind:checked={withHref}
				onchange={(v) => {
					if (v) {
						href = '/create';
					} else {
						href = '';
						target = '';
					}
				}}
				label="href"
			/>
			<Checkbox bind:checked={withOnclick} label="onclick" />
		</div>

		<div class="doc-preview">
			<Empty
				{type}
				title={title || undefined}
				description={description || undefined}
				href={href || undefined}
				target={target || undefined}
				onclick={withOnclick ? handleClick : undefined}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Types</p>
	<Card>
		<div class="grid-2 md:grid-4 gap-4">
			{#each typeOptions as item}
				<div class="column center gap-2">
					<Empty type={item.id as any} />
					<p class="caption-md">{item.label}</p>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Content</p>
	<Card>
		<div class="grid-2 gap-4">
			<Empty type="result" title="No results found" />
			<Empty type="data" description="Start by creating your first item" />
			<Empty
				type="playlist"
				title="Your playlist is empty"
				description="Add songs to get started"
			/>
			<Empty
				type="template"
				title="No templates yet"
				description="Create or import a template to begin"
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Actions</p>
	<Card>
		<div class="grid-2 gap-4">
			<Empty
				type="data"
				title="No data available"
				description="Click below to create your first entry"
				href="/create"
			/>
			<Empty
				type="result"
				title="No results found"
				description="Try a different search term"
				onclick={() => alert('Search clicked!')}
			/>
			<Empty
				type="template"
				title="No templates"
				description="Import a template to get started"
				href="https://example.com"
				target="_blank"
			>
				{#snippet action()}
					Browse Templates
				{/snippet}
			</Empty>
			<Empty
				type="playlist"
				title="Empty playlist"
				description="Add your favorite songs"
				onclick={() => alert('Add songs clicked!')}
			>
				{#snippet action()}
					Add Songs
				{/snippet}
			</Empty>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
