<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Card, Section, Checkbox, Select } from 'ui-svelte';

	const containerOptions = [
		{ id: 'none', label: 'No Container' },
		{ id: 'section', label: 'Section' },
		{ id: 'card', label: 'Card' }
	];

	// States
	let useProse = $state(true);
	let container: any = $state('section');
	let showAllElements = $state(false);

	let code = $derived(() => {
		const lines = [];

		if (container !== 'none') {
			lines.push(`<script lang="ts">`);
			lines.push(`\timport { ${container === 'section' ? 'Section' : 'Card'} } from 'ui-svelte';`);
			lines.push(`<\/script>\n`);
		}

		if (container === 'section') {
			lines.push(`<Section${useProse ? ' class="prose"' : ''}>`);
		} else if (container === 'card') {
			lines.push(`<Card${useProse ? ' class="prose"' : ''}>`);
		} else {
			if (useProse) {
				lines.push(`<div class="prose">`);
			}
		}

		if (showAllElements) {
			lines.push(`\t<h1>Heading 1</h1>`);
			lines.push(`\t<h2>Heading 2</h2>`);
			lines.push(`\t<h3>Heading 3</h3>`);
			lines.push(
				`\t<p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>`
			);
			lines.push(`\t<p>Another paragraph with a <a href="#">link</a>.</p>`);
			lines.push(`\t<ul>`);
			lines.push(`\t\t<li>List item 1</li>`);
			lines.push(`\t\t<li>List item 2</li>`);
			lines.push(`\t</ul>`);
			lines.push(`\t<blockquote>This is a quote</blockquote>`);
			if (useProse) {
				lines.push(`\t<code>inline code</code>`);
			}
		} else {
			lines.push(`\t<h1>Article Title</h1>`);
			lines.push(`\t<p>Your content goes here with proper typography styles.</p>`);
		}

		if (container === 'section') {
			lines.push(`</Section>`);
		} else if (container === 'card') {
			lines.push(`</Card>`);
		} else {
			if (useProse) {
				lines.push(`</div>`);
			}
		}

		return lines.join('\n');
	});

	const proseStyles = [
		{ element: 'h1', class: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl' },
		{ element: 'h2', class: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight' },
		{ element: 'h3', class: 'scroll-m-20 text-2xl font-semibold tracking-tight' },
		{ element: 'h4', class: 'scroll-m-20 text-xl font-semibold tracking-tight' },
		{ element: 'h5', class: 'scroll-m-20 text-lg font-semibold tracking-tight' },
		{ element: 'h6', class: 'scroll-m-20 text-base font-semibold tracking-tight' },
		{ element: 'p', class: 'leading-7 text-on-muted (mt-2 md:mt-3 if not first)' },
		{ element: 'ul/ol', class: 'my-6 ml-6 list-disc/list-decimal space-y-2' },
		{
			element: 'a',
			class: 'font-medium text-primary underline underline-offset-4 hover:text-primary/80'
		},
		{
			element: 'code',
			class: 'relative rounded bg-muted text-on-muted px-[0.3rem] py-[0.2rem] font-mono text-sm'
		},
		{ element: 'blockquote', class: 'my-6 border-l-4 border-muted pl-6 italic text-on-muted' },
		{ element: 'strong', class: 'font-semibold' }
	];

	const baseStyles = [
		{ element: 'h1', class: 'text-4xl font-extrabold lg:text-5xl' },
		{ element: 'h2', class: 'text-3xl font-semibold' },
		{ element: 'h3', class: 'text-2xl font-semibold' },
		{ element: 'h4', class: 'text-xl font-semibold' },
		{ element: 'h5', class: 'text-lg font-semibold' },
		{ element: 'h6', class: 'text-base font-semibold' },
		{ element: 'strong', class: 'font-semibold' },
		{ element: '.link', class: 'hover:text-primary underline underline-offset-4' },
		{ element: '.tiny', class: 'text-xs font-medium leading-none' },
		{ element: '.lead', class: 'text-lg' },
		{ element: '.label', class: 'text-sm select-none font-medium' },
		{ element: 'blockquote', class: 'mt-2 border-l-2 pl-6 italic' }
	];
</script>

{#snippet preview()}
	{#if container === 'section'}
		<Section class="{useProse ? 'prose' : ''} max-w-2xl">
			{#if showAllElements}
				<h1>Heading 1</h1>
				<h2>Heading 2</h2>
				<h3>Heading 3</h3>
				<h4>Heading 4</h4>
				<p>
					This is a paragraph with <strong>bold text</strong> and <em>italic text</em>. It
					demonstrates how text flows naturally with proper line height and spacing.
				</p>
				<p>
					Another paragraph with a <a href="#">link example</a> and more content to show spacing between
					paragraphs.
				</p>
				<ul>
					<li>List item number one</li>
					<li>List item number two</li>
					<li>List item number three</li>
				</ul>
				<blockquote>
					This is a blockquote that can be used for highlighting important information or quotes
					from other sources.
				</blockquote>
				{#if useProse}
					<p>Inline <code>code example</code> within text.</p>
				{/if}
			{:else}
				<h1>Article Title</h1>
				<p>Your content goes here with proper typography styles applied automatically.</p>
				<p>The prose class handles all the spacing, sizing, and styling for you.</p>
			{/if}
		</Section>
	{:else if container === 'card'}
		<Card class="{useProse ? 'prose' : ''} max-w-2xl">
			{#if showAllElements}
				<h1>Heading 1</h1>
				<h2>Heading 2</h2>
				<h3>Heading 3</h3>
				<h4>Heading 4</h4>
				<p>
					This is a paragraph with <strong>bold text</strong> and <em>italic text</em>. It
					demonstrates how text flows naturally with proper line height and spacing.
				</p>
				<p>
					Another paragraph with a <a href="#">link example</a> and more content to show spacing between
					paragraphs.
				</p>
				<ul>
					<li>List item number one</li>
					<li>List item number two</li>
					<li>List item number three</li>
				</ul>
				<blockquote>
					This is a blockquote that can be used for highlighting important information or quotes
					from other sources.
				</blockquote>
				{#if useProse}
					<p>Inline <code>code example</code> within text.</p>
				{/if}
			{:else}
				<h1>Article Title</h1>
				<p>Your content goes here with proper typography styles applied automatically.</p>
				<p>The prose class handles all the spacing, sizing, and styling for you.</p>
			{/if}
		</Card>
	{:else}
		<div
			class="{useProse
				? 'prose'
				: ''} max-w-2xl p-6 border-2 border-dashed border-muted-300 rounded-lg"
		>
			{#if showAllElements}
				<h1>Heading 1</h1>
				<h2>Heading 2</h2>
				<h3>Heading 3</h3>
				<h4>Heading 4</h4>
				<p>
					This is a paragraph with <strong>bold text</strong> and <em>italic text</em>. It
					demonstrates how text flows naturally with proper line height and spacing.
				</p>
				<p>
					Another paragraph with a <a href="#">link example</a> and more content to show spacing between
					paragraphs.
				</p>
				<ul>
					<li>List item number one</li>
					<li>List item number two</li>
					<li>List item number three</li>
				</ul>
				<blockquote>
					This is a blockquote that can be used for highlighting important information or quotes
					from other sources.
				</blockquote>
				{#if useProse}
					<p>Inline <code>code example</code> within text.</p>
				{/if}
			{:else}
				<h1>Article Title</h1>
				<p>Your content goes here with proper typography styles applied automatically.</p>
				<p>The prose class handles all the spacing, sizing, and styling for you.</p>
			{/if}
		</div>
	{/if}
{/snippet}

{#snippet builder()}
	<Select label="Container" size="sm" options={containerOptions} bind:value={container} />

	<DocOptions title="Options">
		<Checkbox bind:checked={useProse} label="Use Prose Class" />
		<Checkbox bind:checked={showAllElements} label="Show All Elements" />
	</DocOptions>
{/snippet}

<DocHeader title="Typography">
	Typography styles for consistent and beautiful text rendering across your application. Use the
	<code class="px-1 py-0.5 bg-muted-100 rounded text-sm">prose</code> class for rich content or individual
	element styles for more control.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<Section bodyClass="mt-8 space-y-8">
	<div>
		<h3 class="text-lg font-semibold mb-4">Prose Class Styles</h3>
		<p class="text-sm text-muted-600 mb-4">
			Apply the <code class="px-1 py-0.5 bg-muted-100 rounded text-xs">prose</code> class to a container
			for automatic styling of all typography elements with proper spacing, sizing, and colors.
		</p>

		<div class="overflow-x-auto">
			<table class="w-full border-collapse">
				<thead>
					<tr class="border-b border-muted-200">
						<th class="text-left p-3 font-semibold">Element</th>
						<th class="text-left p-3 font-semibold">Applied Classes</th>
					</tr>
				</thead>
				<tbody>
					{#each proseStyles as style}
						<tr class="border-b border-muted-100">
							<td class="p-3">
								<code class="px-2 py-1 bg-muted-100 rounded text-sm">{style.element}</code>
							</td>
							<td class="p-3">
								<code class="px-2 py-1 bg-muted-100 rounded text-xs">{style.class}</code>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div>
		<h3 class="text-lg font-semibold mb-4">Base Typography Styles</h3>
		<p class="text-sm text-muted-600 mb-4">
			Without the prose class, these base styles are applied globally to maintain consistent
			typography.
		</p>

		<div class="overflow-x-auto">
			<table class="w-full border-collapse">
				<thead>
					<tr class="border-b border-muted-200">
						<th class="text-left p-3 font-semibold">Element/Class</th>
						<th class="text-left p-3 font-semibold">Applied Classes</th>
					</tr>
				</thead>
				<tbody>
					{#each baseStyles as style}
						<tr class="border-b border-muted-100">
							<td class="p-3">
								<code class="px-2 py-1 bg-muted-100 rounded text-sm">{style.element}</code>
							</td>
							<td class="p-3">
								<code class="px-2 py-1 bg-muted-100 rounded text-xs">{style.class}</code>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</Section>

<Section bodyClass="mt-8 grid gap-4 md:grid-cols-2 pb-8">
	<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
		<h4 class="font-semibold text-blue-900 mb-2">💡 When to use Prose</h4>
		<p class="text-blue-800 text-sm">
			Use the <code class="px-1 py-0.5 bg-blue-100 rounded">prose</code> class for rich text content
			like blog posts, articles, and documentation where you need consistent spacing and styling for
			all typography elements.
		</p>
	</div>

	<div class="p-4 bg-green-50 border border-green-200 rounded-lg">
		<h4 class="font-semibold text-green-900 mb-2">✨ Utility Classes</h4>
		<p class="text-green-800 text-sm">
			Use utility classes like <code class="px-1 py-0.5 bg-green-100 rounded">lead</code>,
			<code class="px-1 py-0.5 bg-green-100 rounded">tiny</code>, and
			<code class="px-1 py-0.5 bg-green-100 rounded">label</code> for specific text elements that need
			custom styling outside of prose containers.
		</p>
	</div>
</Section>
