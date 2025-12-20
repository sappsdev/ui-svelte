<script lang="ts">
	import { Button, Card, Code, Section, Select, Tabs } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'outline', label: 'Outline' },
		{ id: 'line', label: 'Line' },
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'pills', label: 'Pills' }
	];

	const positionOptions = [
		{ id: 'top', label: 'Top' },
		{ id: 'bottom', label: 'Bottom' },
		{ id: 'start', label: 'Start' },
		{ id: 'end', label: 'End' }
	];

	let color: any = $state('muted');
	let variant: any = $state('solid');
	let position: any = $state('top');

	// Simple tabs with string content
	const simpleTabs = [
		{ id: 'tab1', label: 'Tab 1', content: 'This is simple string content for Tab 1.' },
		{ id: 'tab2', label: 'Tab 2', content: 'This is simple string content for Tab 2.' },
		{ id: 'tab3', label: 'Tab 3', content: 'This is simple string content for Tab 3.' }
	];

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Tabs } from 'ui-svelte';`,
			``,
			`\tconst tabs = [`,
			`\t\t{ id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },`,
			`\t\t{ id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },`,
			`\t\t{ id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' }`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`<Tabs`,
			`\t{tabs}`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			color !== 'muted' && `\tcolor="${color}"`,
			position !== 'top' && `\tposition="${position}"`,
			`/>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'tabs', type: 'Tab[]', initial: '[]' },
		{
			prop: 'position',
			type: 'top | bottom | start | end',
			initial: 'top'
		},
		{
			prop: 'variant',
			type: 'solid | outline | line | ghost | pills',
			initial: 'solid'
		},
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'muted'
		},
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'tabListClass', type: 'string', initial: '' },
		{ prop: 'tabClass', type: 'string', initial: '' },
		{ prop: 'tabContentClass', type: 'string', initial: '' }
	];

	const tabTypeProps = [
		{ prop: 'id', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'content', type: 'Snippet | string', initial: '' }
	];
</script>

{#snippet snippetTabContent1()}
	<div class="p-4 bg-primary/10 rounded-lg">
		<h4 class="text-lg font-semibold mb-2">Snippet Content</h4>
		<p>This tab content is rendered using a Svelte Snippet.</p>
		<Button size="sm" class="mt-2">Action Button</Button>
	</div>
{/snippet}

{#snippet snippetTabContent2()}
	<div class="p-4 bg-secondary/10 rounded-lg">
		<h4 class="text-lg font-semibold mb-2">Another Snippet</h4>
		<p>Snippets allow you to use complex components inside tabs.</p>
		<div class="flex gap-2 mt-2">
			<Button size="sm" color="secondary">Save</Button>
			<Button size="sm" variant="ghost" color="muted">Cancel</Button>
		</div>
	</div>
{/snippet}

{#snippet snippetTabContent3()}
	<div class="p-4 bg-success/10 rounded-lg">
		<h4 class="text-lg font-semibold mb-2">Rich Content</h4>
		<ul class="list-disc list-inside space-y-1">
			<li>List item one</li>
			<li>List item two</li>
			<li>List item three</li>
		</ul>
	</div>
{/snippet}

<DocsHeader title="Tabs">
	Tabs organize content into multiple panels and allow users to switch between them.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
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
				label="Position"
				size="sm"
				options={positionOptions}
				bind:value={position}
			/>
		</div>

		<div class="doc-preview">
			<Tabs tabs={simpleTabs} {variant} {color} {position} />
		</div>

		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With String Content</p>
	<Card>
		<p class="card-description mb-4">
			The simplest way to use Tabs is with string content. Just pass an array of tabs with string
			values for the content property.
		</p>
		<div class="doc-preview">
			<Tabs
				tabs={[
					{
						id: 'home',
						label: 'Home',
						content: 'Welcome to the home tab. This is simple string content.'
					},
					{ id: 'profile', label: 'Profile', content: 'Your profile information goes here.' },
					{ id: 'settings', label: 'Settings', content: 'Adjust your settings in this panel.' }
				]}
				variant="solid"
				color="primary"
			/>
		</div>
		<Code
			lang="svelte"
			code={`<Tabs
	tabs={[
		{ id: 'home', label: 'Home', content: 'Welcome to the home tab.' },
		{ id: 'profile', label: 'Profile', content: 'Your profile information goes here.' },
		{ id: 'settings', label: 'Settings', content: 'Adjust your settings in this panel.' }
	]}
	variant="solid"
	color="primary"
/>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Snippet Content</p>
	<Card>
		<p class="card-description mb-4">
			For rich content with components and complex layouts, use Svelte Snippets as the content
			property.
		</p>
		<div class="doc-preview">
			<Tabs
				tabs={[
					{ id: 'snippet1', label: 'Components', content: snippetTabContent1 },
					{ id: 'snippet2', label: 'Actions', content: snippetTabContent2 },
					{ id: 'snippet3', label: 'Lists', content: snippetTabContent3 }
				]}
				variant="solid"
				color="secondary"
			/>
		</div>
		<Code
			lang="svelte"
			code={`{#snippet tabContent1()}
	<div class="p-4 bg-primary/10 rounded-lg">
		<h4 class="text-lg font-semibold mb-2">Snippet Content</h4>
		<p>This tab content is rendered using a Svelte Snippet.</p>
		<Button size="sm" class="mt-2">Action Button</Button>
	</div>
{/snippet}

<Tabs
	tabs={[
		{ id: 'tab1', label: 'Components', content: tabContent1 },
		{ id: 'tab2', label: 'Actions', content: tabContent2 },
		{ id: 'tab3', label: 'Lists', content: tabContent3 }
	]}
	variant="solid"
	color="secondary"
/>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants</p>
	<Card>
		<div class="space-y-6">
			{#each variantOptions as item}
				<div>
					<p class="text-sm font-medium mb-2">{item.label}</p>
					<Tabs tabs={simpleTabs} variant={item.id as any} color="primary" />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card>
		<div class="space-y-6">
			{#each colorOptions as item}
				<div>
					<p class="text-sm font-medium mb-2">{item.label}</p>
					<Tabs tabs={simpleTabs} variant="solid" color={item.id as any} />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Positions</p>
	<Card>
		<div class="grid-2 gap-6">
			{#each positionOptions as item}
				<div>
					<p class="text-sm font-medium mb-2">{item.label}</p>
					<Tabs tabs={simpleTabs} variant="solid" color="muted" position={item.id as any} />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Line Variant with Positions</p>
	<Card>
		<div class="grid-2 gap-6">
			{#each positionOptions as item}
				<div>
					<p class="text-sm font-medium mb-2">{item.label}</p>
					<Tabs tabs={simpleTabs} variant="line" color="primary" position={item.id as any} />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">Tab Type</p>
	<DocsProps props={tabTypeProps} />
</Section>
