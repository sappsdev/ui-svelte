<script lang="ts">
	import { Card, Checkbox, Code, Section, Select, Tabs } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'outline', label: 'Outline' },
		{ id: 'line', label: 'Line' },
		{ id: 'ghost', label: 'Ghost' }
	];

	const positionOptions = [
		{ id: 'top', label: 'Top' },
		{ id: 'bottom', label: 'Bottom' },
		{ id: 'start', label: 'Start' },
		{ id: 'end', label: 'End' }
	];

	let variant: any = $state('muted');
	let position: any = $state('top');
	let pill = $state(false);
	let contentAsSnippet = $state(false);

	let hasProps = $derived(
		[variant !== 'muted', position !== 'top', pill, contentAsSnippet].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Tabs } from 'ui-svelte';`,
			contentAsSnippet && `\n\tconst tabs = [`,
			contentAsSnippet && `\t\t{ id: '1', label: 'Tab 1', content: content1 },`,
			contentAsSnippet && `\t\t{ id: '2', label: 'Tab 2', content: content2 },`,
			contentAsSnippet && `\t\t{ id: '3', label: 'Tab 3', content: content3 }`,
			contentAsSnippet && `\t];`,
			!contentAsSnippet && `\n\tconst tabs = [`,
			!contentAsSnippet && `\t\t{ id: '1', label: 'Tab 1', content: 'Content for Tab 1' },`,
			!contentAsSnippet && `\t\t{ id: '2', label: 'Tab 2', content: 'Content for Tab 2' },`,
			!contentAsSnippet && `\t\t{ id: '3', label: 'Tab 3', content: 'Content for Tab 3' }`,
			!contentAsSnippet && `\t];`,
			`<\/script>`,
			contentAsSnippet && `\n{#snippet content1()}`,
			contentAsSnippet && `\t<p>Content for Tab 1</p>`,
			contentAsSnippet && `{/snippet}`,
			contentAsSnippet && `\n{#snippet content2()}`,
			contentAsSnippet && `\t<p>Content for Tab 2</p>`,
			contentAsSnippet && `{/snippet}`,
			contentAsSnippet && `\n{#snippet content3()}`,
			contentAsSnippet && `\t<p>Content for Tab 3</p>`,
			contentAsSnippet && `{/snippet}`
		].filter(Boolean);

		const componentLine = hasProps
			? `\n<Tabs ${[
					'{tabs}',
					variant !== 'muted' && `variant="${variant}"`,
					position !== 'top' && `position="${position}"`,
					pill && 'pill'
				]
					.filter(Boolean)
					.join(' ')} />`
			: '\n<Tabs {tabs} />';

		return [...scriptLines, componentLine].join('\n');
	});

	const props = [
		{ prop: 'tabs', type: 'Tab[]', initial: '[]', required: true },
		{ prop: 'position', type: 'top | bottom | start | end', initial: 'top' },
		{
			prop: 'variant',
			type: 'primary | secondary | muted | outline | line | ghost',
			initial: 'muted'
		},
		{ prop: 'pill', type: 'boolean', initial: 'false' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'tabListClass', type: 'string', initial: '' },
		{ prop: 'tabClass', type: 'string', initial: '' },
		{ prop: 'tabContentClass', type: 'string', initial: '' }
	];

	const tabProps = [
		{ prop: 'id', type: 'string', initial: '', required: true },
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'content', type: 'Snippet | string', initial: '', required: true }
	];
</script>

<DocsHeader title="Tabs" llmUrl="https://ui-svelte.sappsdev.com/llm/navigation/tabs.md">
	Tabs organize content into different sections that users can navigate between.
</DocsHeader>

{#snippet content1()}
	<p>Content for Tab 1</p>
{/snippet}

{#snippet content2()}
	<p>Content for Tab 2</p>
{/snippet}

{#snippet content3()}
	<p>Content for Tab 3</p>
{/snippet}

{#snippet preview()}
	{@const tabs = contentAsSnippet
		? [
				{ id: '1', label: 'Tab 1', content: content1 },
				{ id: '2', label: 'Tab 2', content: content2 },
				{ id: '3', label: 'Tab 3', content: content3 }
			]
		: [
				{ id: '1', label: 'Tab 1', content: 'Content for Tab 1' },
				{ id: '2', label: 'Tab 2', content: 'Content for Tab 2' },
				{ id: '3', label: 'Tab 3', content: 'Content for Tab 3' }
			]}
	<Tabs {tabs} {variant} {position} {pill} />
{/snippet}

<Section bodyClass="md:grid-3">
	<DocsPreview>
		{@render preview()}
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Position" size="sm" options={positionOptions} bind:value={position} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={pill} label="Pill" />
			<Checkbox bind:checked={contentAsSnippet} label="Snippet Content" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="grid-2 md:grid-3 xl:grid-4 center">
		{#snippet header()}
			<h4>Tab Variants</h4>
		{/snippet}
		{#each variantOptions as item}
			{@const tabs = [
				{ id: '1', label: 'Tab 1', content: 'Content 1' },
				{ id: '2', label: 'Tab 2', content: 'Content 2' }
			]}
			<div class="column gap-1">
				<p class="text-xs center">{item.label}</p>
				<Tabs {tabs} variant={item.id as any} />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-1 md:grid-2 xl:grid-3 center">
		{#snippet header()}
			<h4>Tab Positions</h4>
		{/snippet}
		{#each positionOptions as item}
			{@const tabs = [
				{ id: '1', label: 'Tab 1', content: 'Content 1' },
				{ id: '2', label: 'Tab 2', content: 'Content 2' }
			]}
			<div class="column gap-1">
				<p class="text-xs center">{item.label}</p>
				<Tabs {tabs} position={item.id as any} />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-2 md:grid-4 center">
		{#snippet header()}
			<h4>Pill Style</h4>
		{/snippet}
		{#each ['primary', 'secondary', 'muted', 'outline'] as variantItem}
			{@const tabs = [
				{ id: '1', label: 'Tab 1', content: 'Content 1' },
				{ id: '2', label: 'Tab 2', content: 'Content 2' }
			]}
			<div class="column gap-1">
				<p class="text-xs center">{variantItem}</p>
				<Tabs {tabs} variant={variantItem as any} pill />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<!-- Basic Tabs with String Content -->
<script lang="ts">
	import { Tabs } from 'ui-svelte';

	const tabs = [
		{ id: '1', label: 'Tab 1', content: 'Content for Tab 1' },
		{ id: '2', label: 'Tab 2', content: 'Content for Tab 2' },
		{ id: '3', label: 'Tab 3', content: 'Content for Tab 3' }
	];
<\/script>

<Tabs {tabs} />

<!-- Tabs with Snippet Content -->

<script lang="ts">
	const tabsWithSnippets = [
		{ id: '1', label: 'Tab 1', content: content1 },
		{ id: '2', label: 'Tab 2', content: content2 }
	];
<\/script>

{#snippet content1()}
	<div class="p-4">
		<h3>Tab 1 Content</h3>
		<p>Rich content with components, images, etc.</p>
	</div>
{/snippet}

{#snippet content2()}
	<div class="p-4">
		<h3>Tab 2 Content</h3>
		<p>More rich content here.</p>
	</div>
{/snippet}

<Tabs tabs={tabsWithSnippets} />

<!-- Tabs with Variant & Position -->
<Tabs {tabs} variant="primary" position="start" />

<!-- Pill Style Tabs -->
<Tabs {tabs} variant="secondary" pill />`}
		/>
	</Card>
</Section>

<DocsProps {props} />

<Section>
	<Card>
		{#snippet header()}
			<h4>Tab Type</h4>
		{/snippet}
		<p class="text-sm">Each tab in the tabs array should follow this structure:</p>
		<DocsProps props={tabProps} />
	</Card>
</Section>
