<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Tabs, Checkbox, Select } from 'ui-svelte';

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

	// Selects
	let variant: any = $state('muted');
	let position: any = $state('top');

	// States
	let withIcon = $state(false);
	let contentAsSnippet = $state(false);
	let pill = $state(false);

	let hasProps = $derived([variant !== 'muted', position !== 'top', withIcon, pill].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Tabs } from 'ui-svelte';`,
			contentAsSnippet && `\n\tconst tabs = [`,
			contentAsSnippet &&
				`\t\t{ id: '1', label: 'Tab 1'${withIcon ? ", icon: 'fluent:home-24-regular'" : ''}, content: content1 },`,
			contentAsSnippet &&
				`\t\t{ id: '2', label: 'Tab 2'${withIcon ? ", icon: 'fluent:person-24-regular'" : ''}, content: content2 },`,
			contentAsSnippet &&
				`\t\t{ id: '3', label: 'Tab 3'${withIcon ? ", icon: 'fluent:settings-24-regular'" : ''}, content: content3 }`,
			contentAsSnippet && `\t];`,
			!contentAsSnippet && `\n\tconst tabs = [`,
			!contentAsSnippet &&
				`\t\t{ id: '1', label: 'Tab 1'${withIcon ? ", icon: 'fluent:home-24-regular'" : ''}, content: 'Content for Tab 1' },`,
			!contentAsSnippet &&
				`\t\t{ id: '2', label: 'Tab 2'${withIcon ? ", icon: 'fluent:person-24-regular'" : ''}, content: 'Content for Tab 2' },`,
			!contentAsSnippet &&
				`\t\t{ id: '3', label: 'Tab 3'${withIcon ? ", icon: 'fluent:settings-24-regular'" : ''}, content: 'Content for Tab 3' }`,
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
			type: 'primary | secondary | muted | outlined | line | ghost',
			initial: 'muted'
		},
		{ prop: 'pill', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'tabListClass', type: 'string', initial: '' },
		{ prop: 'tabClass', type: 'string', initial: '' },
		{ prop: 'tabContentClass', type: 'string', initial: '' }
	];

	const tabProps = [
		{ prop: 'id', type: 'string', initial: '', required: true },
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'icon', type: 'IconName', initial: '' },
		{ prop: 'content', type: 'Snippet | string', initial: '', required: true }
	];
</script>

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
				{
					id: '1',
					label: 'Tab 1',
					icon: withIcon ? 'fluent:home-24-regular' : undefined,
					content: content1
				},
				{
					id: '2',
					label: 'Tab 2',
					icon: withIcon ? 'fluent:person-24-regular' : undefined,
					content: content2
				},
				{
					id: '3',
					label: 'Tab 3',
					icon: withIcon ? 'fluent:settings-24-regular' : undefined,
					content: content3
				}
			]
		: [
				{
					id: '1',
					label: 'Tab 1',
					icon: withIcon ? 'fluent:home-24-regular' : undefined,
					content: 'Content for Tab 1'
				},
				{
					id: '2',
					label: 'Tab 2',
					icon: withIcon ? 'fluent:person-24-regular' : undefined,
					content: 'Content for Tab 2'
				},
				{
					id: '3',
					label: 'Tab 3',
					icon: withIcon ? 'fluent:settings-24-regular' : undefined,
					content: 'Content for Tab 3'
				}
			]}
	<Tabs {tabs} {variant} {position} {pill} />
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Position" size="sm" options={positionOptions} bind:value={position} />

	<DocOptions title="Tab Options">
		<Checkbox bind:checked={withIcon} label="Icon" />
		<Checkbox bind:checked={contentAsSnippet} label="Snippet" />
	</DocOptions>

	<DocOptions title="Props">
		<Checkbox bind:checked={pill} label="Pill" />
	</DocOptions>
{/snippet}

<DocHeader title="Tabs"
	>Tabs organize content into different sections that users can navigate between.</DocHeader
>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<div class="prose mt-8">
	<h3>Tab Type</h3>
	<p>Each tab in the tabs array should follow this structure:</p>
</div>

<DocProps props={tabProps} />
