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
		{
			element: 'Base',
			class: 'text-sm md:text-base lg:text-lg + leading-6 md:leading-7 lg:leading-8'
		},
		{
			element: 'h1',
			class:
				'text-[1.875rem] md:text-4xl lg:text-5xl + leading-9 md:leading-10 lg:leading-12 + mt-0 mb-3 md:mb-4 lg:mb-5'
		},
		{
			element: 'h2',
			class:
				'text-xl md:text-2xl lg:text-[1.875rem] + leading-7 md:leading-8 lg:leading-10 + mt-4 md:mt-5 lg:mt-6 mb-2 md:mb-3 lg:mb-3 + border-b pb-2'
		},
		{
			element: 'h3',
			class:
				'text-lg md:text-xl lg:text-2xl + leading-7 md:leading-8 lg:leading-9 + mt-3 md:mt-4 lg:mt-5 mb-1.5 md:mb-2 lg:mb-2'
		},
		{
			element: 'h4',
			class:
				'text-base md:text-lg lg:text-xl + leading-6 md:leading-7 + mt-3 md:mt-3 lg:mt-4 mb-1.5'
		},
		{
			element: 'h5',
			class:
				'text-sm md:text-base lg:text-lg + leading-5 md:leading-6 lg:leading-7 + mt-3 md:mt-3 lg:mt-4 mb-1.5'
		},
		{
			element: 'h6',
			class:
				'text-xs md:text-sm lg:text-base + leading-4 md:leading-5 lg:leading-6 + mt-3 md:mt-3 lg:mt-4 mb-1.5'
		},
		{ element: 'p', class: 'text-on-muted + mt-4 md:mt-5 lg:mt-6 mb-4 md:mb-5 lg:mb-6' },
		{
			element: '[class~="lead"]',
			class: 'text-base md:text-lg lg:text-xl + leading-7 md:leading-8 + mt-4 md:mt-6 mb-4 md:mb-6'
		},
		{
			element: 'ul/ol',
			class:
				'mt-4 md:mt-5 lg:mt-6 mb-4 md:mb-5 lg:mb-6 + pl-[1.375rem] md:pl-[1.625rem] + list-disc/decimal'
		},
		{ element: 'li', class: 'mt-1 md:mt-2 mb-1 md:mb-2 + pl-[0.375rem]' },
		{ element: 'dl/dt/dd', class: 'Definition lists with responsive spacing' },
		{
			element: 'a',
			class:
				'font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors'
		},
		{
			element: 'code',
			class:
				'text-[0.75rem] md:text-[0.875rem] lg:text-base + rounded bg-muted text-on-muted px-[0.3rem] py-[0.2rem] font-mono'
		},
		{
			element: 'h2/h3 code',
			class: 'Responsive code sizing within headings'
		},
		{
			element: 'pre',
			class:
				'text-[0.75rem] md:text-[0.875rem] lg:text-base + mt-5 md:mt-6 lg:mt-8 mb-5 md:mb-6 lg:mb-8 + p-2/3 md:p-3/4'
		},
		{
			element: 'blockquote',
			class:
				'mt-6 md:mt-8 lg:mt-10 mb-6 md:mb-8 lg:mb-10 + pl-5 md:pl-5 lg:pl-6 + border-l-4 border-muted italic'
		},
		{ element: 'hr', class: 'my-10 md:my-12 + border-muted' },
		{
			element: 'img/video/picture',
			class: 'mt-6 md:mt-8 mb-6 md:mb-8 + rounded-ui'
		},
		{ element: 'figure/figcaption', class: 'Figures with captions and responsive sizing' },
		{
			element: 'table',
			class: 'text-[0.75rem] md:text-[0.875rem] lg:text-base + w-full text-left'
		},
		{
			element: 'kbd',
			class: 'text-[0.75rem] md:text-[0.875rem] lg:text-base + rounded bg-muted font-mono'
		},
		{ element: 'strong', class: 'font-semibold' },
		{ element: 'em', class: 'italic' }
	];

	const baseStyles = [
		{
			element: 'h1',
			class:
				'text-[1.875rem] md:text-4xl lg:text-5xl + leading-9 md:leading-10 lg:leading-12 + font-extrabold tracking-tight'
		},
		{
			element: 'h2',
			class:
				'text-xl md:text-2xl lg:text-[1.875rem] + leading-7 md:leading-8 lg:leading-10 + font-semibold tracking-tight'
		},
		{
			element: 'h3',
			class:
				'text-lg md:text-xl lg:text-2xl + leading-7 md:leading-8 lg:leading-9 + font-semibold tracking-tight'
		},
		{
			element: 'h4',
			class:
				'text-base md:text-lg lg:text-xl + leading-6 md:leading-7 + font-semibold tracking-tight'
		},
		{
			element: 'h5',
			class:
				'text-sm md:text-base lg:text-lg + leading-5 md:leading-6 lg:leading-7 + font-semibold tracking-tight'
		},
		{
			element: 'h6',
			class:
				'text-xs md:text-sm lg:text-base + leading-4 md:leading-5 lg:leading-6 + font-semibold tracking-tight'
		},
		{ element: 'strong', class: 'font-semibold' },
		{ element: 'em', class: 'italic' },
		{
			element: '.snippet',
			class:
				'text-[0.75rem] md:text-[0.875rem] lg:text-base + rounded bg-muted text-on-muted px-[0.3rem] py-[0.2rem] font-mono'
		},
		{
			element: '.link',
			class:
				'font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors'
		},
		{
			element: '.tiny',
			class: 'text-[0.625rem] md:text-xs lg:text-xs + font-medium leading-none'
		},
		{
			element: '.lead',
			class: 'text-base md:text-lg lg:text-xl + leading-7 md:leading-8 lg:leading-8'
		},
		{
			element: '.label',
			class: 'text-xs md:text-sm lg:text-sm + select-none font-medium'
		},
		{
			element: '.hero-title',
			class:
				'text-4xl md:text-5xl lg:text-6xl xl:text-7xl + font-semibold leading-tight tracking-tight'
		},
		{
			element: '.hero-subtitle',
			class: 'text-lg md:text-xl lg:text-2xl + font-light text-on-muted'
		},
		{
			element: 'blockquote',
			class: 'pl-4 md:pl-5 lg:pl-6 + border-l-2 border-muted italic'
		}
	];
</script>

{#snippet typographyContent()}
	{#if showAllElements}
		<h1>Heading Level 1</h1>
		<p class="lead">
			This is a lead paragraph with larger text, perfect for introductions and summaries.
		</p>
		<h2>Heading Level 2</h2>
		<p>
			This is a regular paragraph with <strong>bold text</strong>, <em>italic text</em>, and a
			<a href="#!">link example</a>. The responsive typography system automatically adjusts font
			sizes across breakpoints.
		</p>
		<h3>Heading Level 3</h3>
		<p>
			Another paragraph demonstrating the spacing and line-height. Notice how margins and padding
			scale responsively.
		</p>
		<h4>Heading Level 4</h4>
		<ul>
			<li>Unordered list item one</li>
			<li>Unordered list item two with more content</li>
			<li>Unordered list item three</li>
		</ul>
		<h5>Heading Level 5</h5>
		<ol>
			<li>Ordered list item one</li>
			<li>Ordered list item two</li>
			<li>Ordered list item three</li>
		</ol>
		<h6>Heading Level 6</h6>
		<blockquote>
			This is a blockquote for highlighting important information or quotes from other sources. It
			features responsive padding and styling.
		</blockquote>
		{#if useProse}
			<p>
				Inline <code>code example</code> within text, and a <kbd>Ctrl</kbd> + <kbd>C</kbd> keyboard shortcut.
			</p>
			<pre><code
					>// Code block example
function hello() {'{'}
  console.log('Hello World');
{'}'}</code
				></pre>
		{:else}
			<p>
				Utility classes: <span class="tiny">tiny text</span>,
				<span class="label">label text</span>, <span class="snippet">code snippet</span>,
				<span class="link">link style</span>
			</p>
		{/if}
		<hr />
		<p class="tiny">This is tiny text for small annotations.</p>
		<p class="label">This is label text for form labels.</p>
	{:else}
		<h1>Beautiful Typography</h1>
		<p class="lead">Responsive typography that scales beautifully across all screen sizes.</p>
		<p>
			Your content goes here with proper typography styles applied automatically. The system uses
			responsive utilities to ensure optimal readability on mobile, tablet, and desktop.
		</p>
	{/if}
{/snippet}

{#snippet preview()}
	{#if container === 'section'}
		<Section bodyClass="{useProse ? 'prose' : ''} max-w-3xl">
			{@render typographyContent()}
		</Section>
	{:else if container === 'card'}
		<Card bodyClass="{useProse ? 'prose' : ''} max-w-3xl">
			{@render typographyContent()}
		</Card>
	{:else}
		<div
			class="{useProse
				? 'prose'
				: ''} max-w-3xl p-6 border-2 border-dashed border-muted-300 rounded-lg"
		>
			{@render typographyContent()}
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
			Use the <code class="px-1 py-0.5 bg-blue-100 rounded">prose</code> class for rich text content like
			blog posts, articles, and documentation where you need consistent spacing and styling for all typography
			elements.
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
