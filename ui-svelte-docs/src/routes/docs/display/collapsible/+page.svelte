<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Collapsible, Select, Checkbox } from 'ui-svelte';

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
	let withDisabled = $state(false);
	let withDefaultOpen = $state(false);
	let withSnippet = $state(false);

	let hasProps = $derived(
		[variant !== 'muted', withIcon, withDisabled, withDefaultOpen].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Collapsible } from 'ui-svelte';`,
			!withSnippet && `<\/script>`,
			withSnippet && `<\/script>`,
			withSnippet && `\n{#snippet content()}`,
			withSnippet && `\t<div>`,
			withSnippet && `\t\t<p><strong>ui-svelte</strong> is a modern component library.</p>`,
			withSnippet && `\t\t<ul>`,
			withSnippet && `\t\t\t<li>Built with Svelte 5</li>`,
			withSnippet && `\t\t\t<li>Customizable components</li>`,
			withSnippet && `\t\t\t<li>Easy to integrate</li>`,
			withSnippet && `\t\t</ul>`,
			withSnippet && `\t</div>`,
			withSnippet && `{/snippet}`
		].filter(Boolean);

		const componentLines = [
			hasProps && `\n<Collapsible`,
			hasProps && `\tlabel="What is ui-svelte?"`,
			withIcon && `\ticon="fluent:info-24-regular"`,
			withSnippet && `\tcontent={content}`,
			!withSnippet &&
				`\tcontent="ui-svelte is a modern component library built with Svelte 5, offering a comprehensive set of customizable UI components."`,
			variant !== 'muted' && `\tvariant="${variant}"`,
			withDisabled && `\tdisabled`,
			withDefaultOpen && `\tdefaultOpen`,
			hasProps && `/>`,
			!hasProps && `\n<Collapsible`,
			!hasProps && `\tlabel="What is ui-svelte?"`,
			!hasProps &&
				`\tcontent="ui-svelte is a modern component library built with Svelte 5, offering a comprehensive set of customizable UI components."`,
			!hasProps && `/>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'content', type: 'Snippet | string', initial: '', required: true },
		{ prop: 'icon', type: 'IconName', initial: '' },
		{ prop: 'variant', type: 'primary | secondary | muted | outline', initial: 'muted' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' },
		{ prop: 'defaultOpen', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'contentClass', type: 'string', initial: '' }
	];
</script>

{#snippet content()}
	<div>
		<p><strong>ui-svelte</strong> is a modern component library built with Svelte 5.</p>
		<ul class="mt-2 ml-4 list-disc">
			<li>Comprehensive set of components</li>
			<li>Fully customizable</li>
			<li>Built for modern web apps</li>
			<li>Easy to integrate</li>
		</ul>
	</div>
{/snippet}

{#snippet preview()}
	<Collapsible
		label="What is ui-svelte?"
		icon={withIcon ? 'fluent:info-24-regular' : undefined}
		content={withSnippet
			? content
			: 'ui-svelte is a modern component library built with Svelte 5, offering a comprehensive set of customizable UI components for building beautiful web applications.'}
		{variant}
		disabled={withDisabled}
		defaultOpen={withDefaultOpen}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />

	<DocOptions title="Options">
		<Checkbox bind:checked={withIcon} label="Icon" />
		<Checkbox bind:checked={withDisabled} label="Disabled" />
		<Checkbox bind:checked={withDefaultOpen} label="Default Open" />
		<Checkbox bind:checked={withSnippet} label="Snippet Content" />
	</DocOptions>
{/snippet}

<DocHeader title="Collapsible">
	Collapsible component allows users to show and hide a single section of content on a page.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
