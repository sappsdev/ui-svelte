<script lang="ts">
	import { Card, Checkbox, Code, Section, Select, Tabs } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';

	const containerOptions = [
		{ id: 'none', label: 'No Container' },
		{ id: 'section', label: 'Section' },
		{ id: 'card', label: 'Card' }
	];

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

	const styleTabs = [
		{ id: 'prose', label: 'Prose Styles', content: proseStylesContent },
		{ id: 'base', label: 'Base Styles', content: baseStylesContent }
	];
</script>

{#snippet proseStylesContent()}
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
						<td class="p-3"><code class="px-2 py-1 rounded text-sm">{style.element}</code></td>
						<td class="p-3"><code class="px-2 py-1 rounded text-xs">{style.class}</code></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet baseStylesContent()}
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
						<td class="p-3"><code class="px-2 py-1 rounded text-sm">{style.element}</code></td>
						<td class="p-3"><code class="px-2 py-1 rounded text-xs">{style.class}</code></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

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

<DocsHeader title="Typography" llmUrl="https://ui-svelte.sappsdev.com/llm/starter/typography.md">
	Typography styles for consistent and beautiful text rendering across your application. Use the
	<code class="px-1 py-0.5 bg-muted-100 rounded text-sm">prose</code> class for rich content or individual
	element styles for more control.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
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
	</DocsPreview>
	<Card>
		<Select label="Container" size="sm" options={containerOptions} bind:value={container} />
		<div class="column gap-2 mt-4">
			<Checkbox bind:checked={useProse} label="Use Prose Class" />
			<Checkbox bind:checked={showAllElements} label="Show All Elements" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card>
		<Tabs tabs={styleTabs} />
	</Card>
</Section>

<Section bodyClass="grid-2 md:grid-3">
	<!-- Headings Example -->
	<Card>
		{#snippet header()}
			<h4>Headings</h4>
		{/snippet}
		<div class="column gap-1">
			<h1 class="!m-0">H1 Heading</h1>
			<h2 class="!m-0 !border-0">H2 Heading</h2>
			<h3 class="!m-0">H3 Heading</h3>
			<h4 class="!m-0">H4 Heading</h4>
		</div>
		{#snippet footer()}
			<code class="text-xs">h1, h2, h3, h4, h5, h6</code>
		{/snippet}
	</Card>

	<!-- Lead Text Example -->
	<Card>
		{#snippet header()}
			<h4>Lead Text</h4>
		{/snippet}
		<p class="lead !m-0">This is lead text for introductions and summaries.</p>
		{#snippet footer()}
			<code class="text-xs">class="lead"</code>
		{/snippet}
	</Card>

	<!-- Hero Title Example -->
	<Card>
		{#snippet header()}
			<h4>Hero Title</h4>
		{/snippet}
		<div class="column gap-1">
			<span class="hero-title">Hero</span>
			<span class="hero-subtitle">Subtitle text</span>
		</div>
		{#snippet footer()}
			<code class="text-xs">class="hero-title" / "hero-subtitle"</code>
		{/snippet}
	</Card>

	<!-- Text Utilities Example -->
	<Card>
		{#snippet header()}
			<h4>Text Utilities</h4>
		{/snippet}
		<div class="column gap-2">
			<span class="tiny">Tiny text for annotations</span>
			<span class="label">Label text for forms</span>
			<span class="snippet">Code snippet style</span>
		</div>
		{#snippet footer()}
			<code class="text-xs">class="tiny" / "label" / "snippet"</code>
		{/snippet}
	</Card>

	<!-- Link Style Example -->
	<Card>
		{#snippet header()}
			<h4>Link Style</h4>
		{/snippet}
		<div class="prose">
			<a href="#!">Prose link style</a>
		</div>
		<span class="link mt-2">Utility link style</span>
		{#snippet footer()}
			<code class="text-xs">prose a / class="link"</code>
		{/snippet}
	</Card>

	<!-- Blockquote Example -->
	<Card>
		{#snippet header()}
			<h4>Blockquote</h4>
		{/snippet}
		<blockquote class="!m-0">
			A beautiful blockquote for important quotes and highlights.
		</blockquote>
		{#snippet footer()}
			<code class="text-xs">&lt;blockquote&gt;</code>
		{/snippet}
	</Card>
</Section>

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Prose Class:</strong> Apply
					<code class="px-1 py-0.5 bg-blue rounded">prose</code> to a container for automatic styling
					of all typography elements with proper spacing and colors
				</li>
				<li>
					<strong>Responsive:</strong> All typography scales responsively using
					<code class="px-1 py-0.5 bg-blue rounded">sm:</code>,
					<code class="px-1 py-0.5 bg-blue rounded">md:</code>, and
					<code class="px-1 py-0.5 bg-blue rounded">lg:</code> breakpoints
				</li>
				<li>
					<strong>Utility Classes:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">lead</code>,
					<code class="px-1 py-0.5 bg-blue rounded">tiny</code>,
					<code class="px-1 py-0.5 bg-blue rounded">label</code>, and
					<code class="px-1 py-0.5 bg-blue rounded">snippet</code>
					for specific text elements outside of prose containers
				</li>
				<li>
					<strong>Hero Styles:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">hero-title</code> and
					<code class="px-1 py-0.5 bg-blue rounded">hero-subtitle</code> for landing page headlines
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<!-- Using Prose Class -->
<Section class="prose">
	<h1>Article Title</h1>
	<p class="lead">Introduction paragraph with larger text.</p>
	<p>Regular paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
	<ul>
		<li>List item one</li>
		<li>List item two</li>
	</ul>
	<blockquote>An important quote</blockquote>
</Section>

<!-- Using Utility Classes -->
<div>
	<h1 class="hero-title">Welcome</h1>
	<p class="hero-subtitle">A beautiful landing page</p>
</div>

<!-- Text Utilities -->
<span class="tiny">Small annotation</span>
<span class="label">Form label</span>
<span class="snippet">code snippet</span>
<a class="link">Clickable link</a>

<!-- Headings without Prose -->
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>`}
		/>
	</Card>
</Section>
