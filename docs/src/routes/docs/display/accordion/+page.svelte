<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Accordion, Select, Checkbox } from 'ui-svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'outline', label: 'Outline' }
	];

	// Selects
	let variant: any = $state('muted');

	// States
	let withIcon = $state(false);
	let withMultiple = $state(false);
	let withDisabled = $state(false);
	let withDefaultOpen = $state(false);
	let withSnippet = $state(false);

	let accordionItems: any = $derived.by(() => {
		return [
			{
				id: '1',
				label: 'What is ui-svelte?',
				icon: withIcon ? 'fluent:info-24-regular' : undefined,
				content: withSnippet
					? content1
					: 'ui-svelte is a modern component library built with Svelte 5, offering a comprehensive set of customizable UI components for building beautiful web applications.',
				defaultOpen: withDefaultOpen
			},
			{
				id: '2',
				label: 'How do I install it?',
				icon: withIcon ? 'fluent:arrow-download-24-regular' : undefined,
				content: withSnippet
					? content2
					: 'You can install ui-svelte using npm or pnpm. Simply run "npm install ui-svelte" in your project directory and start using the components right away.',
				disabled: withDisabled
			},
			{
				id: '3',
				label: 'Is it free to use?',
				icon: withIcon ? 'fluent:money-24-regular' : undefined,
				content: withSnippet
					? content3
					: 'Yes! ui-svelte is completely free and open source. You can use it in both personal and commercial projects without any restrictions.'
			}
		];
	});

	let hasProps = $derived(
		[variant !== 'muted', withIcon, withMultiple, withDisabled, withDefaultOpen].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Accordion } from 'ui-svelte';`,
			withSnippet && `\n\tconst items = [`,
			withSnippet && `\t\t{ id: '1', label: 'What is ui-svelte?', content: content1 },`,
			withSnippet && `\t\t{ id: '2', label: 'How do I install it?', content: content2 },`,
			withSnippet && `\t\t{ id: '3', label: 'Is it free to use?', content: content3 }`,
			withSnippet && `\t];`,
			!withSnippet && `\n\tconst items = [`,
			!withSnippet && `\t\t{`,
			!withSnippet && `\t\t\tid: '1',`,
			!withSnippet && `\t\t\tlabel: 'What is ui-svelte?',`,
			!withSnippet && withIcon ? `\t\t\ticon: 'fluent:info-24-regular',` : '',
			!withSnippet &&
				`\t\t\tcontent: 'ui-svelte is a modern component library...'${withDefaultOpen ? ',\n\t\t\tdefaultOpen: true' : ''}`,
			!withSnippet && `\t\t},`,
			!withSnippet && `\t\t{`,
			!withSnippet && `\t\t\tid: '2',`,
			!withSnippet && `\t\t\tlabel: 'How do I install it?',`,
			!withSnippet && withIcon ? `\t\t\ticon: 'fluent:arrow-download-24-regular',` : '',
			!withSnippet &&
				`\t\t\tcontent: 'You can install ui-svelte using npm...'${withDisabled ? ',\n\t\t\tdisabled: true' : ''}`,
			!withSnippet && `\t\t},`,
			!withSnippet && `\t\t{`,
			!withSnippet && `\t\t\tid: '3',`,
			!withSnippet && `\t\t\tlabel: 'Is it free to use?',`,
			!withSnippet && withIcon ? `\t\t\ticon: 'fluent:money-24-regular',` : '',
			!withSnippet && `\t\t\tcontent: 'Yes! ui-svelte is completely free...'`,
			!withSnippet && `\t\t}`,
			!withSnippet && `\t];`,
			`<\/script>`,
			withSnippet && `\n{#snippet content1()}`,
			withSnippet && `\t<div>`,
			withSnippet && `\t\t<p><strong>ui-svelte</strong> is a modern component library.</p>`,
			withSnippet && `\t\t<ul>`,
			withSnippet && `\t\t\t<li>Built with Svelte 5</li>`,
			withSnippet && `\t\t\t<li>Customizable components</li>`,
			withSnippet && `\t\t</ul>`,
			withSnippet && `\t</div>`,
			withSnippet && `{/snippet}`,
			withSnippet && `\n{#snippet content2()}`,
			withSnippet && `\t<p>Install using: <code>npm install ui-svelte</code></p>`,
			withSnippet && `{/snippet}`,
			withSnippet && `\n{#snippet content3()}`,
			withSnippet && `\t<p>Yes! It's <em>completely free</em> and open source.</p>`,
			withSnippet && `{/snippet}`
		].filter(Boolean);

		const componentLines = [
			hasProps && `\n<Accordion`,
			hasProps && `\titems={items}`,
			variant !== 'muted' && `\tvariant="${variant}"`,
			withMultiple && `\tmultiple`,
			hasProps && `/>`,
			!hasProps && `\n<Accordion items={items} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'items', type: 'AccordionItem[]', initial: '[]', required: true },
		{ prop: 'variant', type: 'primary | secondary | muted | outline', initial: 'muted' },
		{ prop: 'multiple', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'itemClass', type: 'string', initial: '' },
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'contentClass', type: 'string', initial: '' }
	];

	const itemProps = [
		{ prop: 'id', type: 'string', initial: '', required: true },
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'content', type: 'Snippet | string', initial: '', required: true },
		{ prop: 'icon', type: 'IconName', initial: '' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' },
		{ prop: 'defaultOpen', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet content1()}
	<div>
		<p><strong>ui-svelte</strong> is a modern component library built with Svelte 5.</p>
		<ul class="mt-2 ml-4 list-disc">
			<li>Comprehensive set of components</li>
			<li>Fully customizable</li>
			<li>Built for modern web apps</li>
		</ul>
	</div>
{/snippet}

{#snippet content2()}
	<div>
		<p>You can install ui-svelte using npm or pnpm:</p>
		<code class="block mt-2 p-2 bg-muted rounded">npm install ui-svelte</code>
		<p class="mt-2">Then start using the components right away!</p>
	</div>
{/snippet}

{#snippet content3()}
	<div>
		<p>
			Yes! ui-svelte is <em>completely free</em> and <strong>open source</strong>. You can use it in
			both personal and commercial projects without any restrictions.
		</p>
	</div>
{/snippet}

{#snippet preview()}
	<Accordion items={accordionItems} {variant} multiple={withMultiple} />
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />

	<DocOptions title="Options">
		<Checkbox bind:checked={withIcon} label="Icon" />
		<Checkbox bind:checked={withMultiple} label="Multiple" />
		<Checkbox bind:checked={withDisabled} label="Disabled Item" />
		<Checkbox bind:checked={withDefaultOpen} label="Default Open" />
		<Checkbox bind:checked={withSnippet} label="Snippet Content" />
	</DocOptions>
{/snippet}

<DocHeader title="Accordion">
	Accordion components allow users to show and hide sections of related content on a page.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<div class="prose mt-8">
	<h3>AccordionItem Type</h3>
	<p>Each item in the items array should follow this structure:</p>
</div>

<DocProps props={itemProps} />
