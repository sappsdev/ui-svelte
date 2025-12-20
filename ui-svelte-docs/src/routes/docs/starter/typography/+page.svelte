<script lang="ts">
	import { Card, Code, Section } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const displayClasses = [
		{ class: 'display-2xl', description: 'Extra extra large display text (clamp: 3rem → 6rem)' },
		{ class: 'display-xl', description: 'Extra large display text (clamp: 2.5rem → 4.5rem)' },
		{ class: 'display-lg', description: 'Large display text (clamp: 2rem → 3.75rem)' },
		{ class: 'display-md', description: 'Medium display text (clamp: 1.75rem → 3rem)' },
		{ class: 'display-sm', description: 'Small display text (clamp: 1.5rem → 2.25rem)' }
	];

	const headingClasses = [
		{ class: 'heading-xl', description: 'Extra large heading (clamp: 1.75rem → 2.5rem)' },
		{ class: 'heading-lg', description: 'Large heading (clamp: 1.5rem → 2rem)' },
		{ class: 'heading-md', description: 'Medium heading (clamp: 1.25rem → 1.5rem)' },
		{ class: 'heading-sm', description: 'Small heading (clamp: 1.125rem → 1.25rem)' },
		{ class: 'heading-xs', description: 'Extra small heading (clamp: 1rem → 1.125rem)' }
	];

	const bodyClasses = [
		{ class: 'body-xl', description: 'Extra large body text (clamp: 1.125rem → 1.25rem)' },
		{ class: 'body-lg', description: 'Large body text (clamp: 1rem → 1.125rem)' },
		{ class: 'body-md', description: 'Medium body text (1rem)' },
		{ class: 'body-sm', description: 'Small body text (0.875rem)' },
		{ class: 'body-xs', description: 'Extra small body text (0.75rem)' }
	];

	const labelClasses = [
		{ class: 'label-lg', description: 'Large label text (1rem, medium weight)' },
		{ class: 'label-md', description: 'Medium label text (0.875rem, medium weight)' },
		{ class: 'label-sm', description: 'Small label text (0.75rem, medium weight)' }
	];

	const captionClasses = [
		{ class: 'caption-lg', description: 'Large caption text (0.875rem, 70% opacity)' },
		{ class: 'caption-md', description: 'Medium caption text (0.75rem, 70% opacity)' },
		{ class: 'caption-sm', description: 'Small caption text (0.625rem, 70% opacity)' }
	];

	const semanticClasses = [
		{ class: 'hero-title', description: 'Hero section main title' },
		{ class: 'hero-subtitle', description: 'Hero section subtitle (80% opacity)' },
		{ class: 'hero-description', description: 'Hero section description (70% opacity, max 65ch)' },
		{ class: 'section-title', description: 'Section main title' },
		{ class: 'section-subtitle', description: 'Section subtitle (80% opacity)' },
		{ class: 'section-description', description: 'Section description (70% opacity, max 60ch)' },
		{ class: 'cta-title', description: 'Call-to-action title' },
		{ class: 'cta-subtitle', description: 'Call-to-action subtitle (80% opacity)' },
		{ class: 'cta-description', description: 'Call-to-action description (70% opacity, max 50ch)' }
	];

	const utilityClasses = [
		{ class: 'subheading', description: 'Uppercase subheading with primary color' },
		{ class: 'subheading-muted', description: 'Uppercase subheading with muted color' },
		{ class: 'lead', description: 'Lead paragraph text (clamp: 1.125rem → 1.375rem)' },
		{ class: 'lead-lg', description: 'Large lead paragraph text (clamp: 1.25rem → 1.5rem)' },
		{ class: 'overline', description: 'Uppercase overline text with margin' },
		{ class: 'overline-primary', description: 'Overline with primary color' },
		{ class: 'overline-secondary', description: 'Overline with secondary color' },
		{ class: 'overline-muted', description: 'Overline with muted color' },
		{ class: 'quote', description: 'Italic quote text (clamp: 1.125rem → 1.5rem)' },
		{ class: 'quote-lg', description: 'Large quote text (clamp: 1.25rem → 1.75rem)' }
	];

	const componentClasses = [
		{ class: 'feature-title', description: 'Feature card title' },
		{ class: 'feature-description', description: 'Feature card description' },
		{ class: 'card-title', description: 'Card title' },
		{ class: 'card-description', description: 'Card description' },
		{ class: 'nav-item', description: 'Navigation item text (0.875rem)' },
		{ class: 'nav-item-lg', description: 'Large navigation item text (1rem)' },
		{ class: 'code-inline', description: 'Inline code text (monospace, 0.875em)' },
		{ class: 'code-block', description: 'Code block text (monospace, 0.875rem)' }
	];

	const wrapClasses = [
		{ class: 'text-balance', description: 'Balanced text wrapping for headings' },
		{ class: 'text-pretty', description: 'Pretty text wrapping for paragraphs' },
		{ class: 'prose-narrow', description: 'Max width 45ch for narrow text' },
		{ class: 'prose-normal', description: 'Max width 65ch for normal text' },
		{ class: 'prose-wide', description: 'Max width 80ch for wide text' },
		{ class: 'truncate-lines-2', description: 'Truncate text after 2 lines' },
		{ class: 'truncate-lines-3', description: 'Truncate text after 3 lines' },
		{ class: 'truncate-lines-4', description: 'Truncate text after 4 lines' }
	];
</script>

<DocsHeader title="Typography" llmUrl="https://ui-svelte.sappsdev.com/llm/starter/typography.md">
	CSS utility classes for responsive typography with semantic naming, ideal for heroes, sections,
	cards, and other UI components.
</DocsHeader>

<Section>
	<p class="section-subtitle">Display Styles</p>
	<p class="section-description">Large display text for hero sections and major headlines.</p>
	<Card>
		{#each displayClasses as item}
			<div class="py-4 border-b border-muted last:border-b-0">
				<h1 class={item.class}>The quick brown fox</h1>
				<Code lang="html" code={`<h1 class="${item.class}">The quick brown fox</h1>`} />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Heading Styles</p>
	<p class="section-description">Heading styles for section titles and content hierarchies.</p>

	<Card>
		{#each headingClasses as item}
			<div class="py-4 border-b border-muted last:border-b-0">
				<h2 class={item.class}>Section heading example</h2>
				<Code lang="html" code={`<h2 class="${item.class}">Section heading example</h2>`} />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Body Styles</p>
	<p class="section-description">Body text styles for paragraphs and general content.</p>
	<Card>
		{#each bodyClasses as item}
			<div class="py-4 border-b border-muted last:border-b-0">
				<p class={item.class}>This is body text that demonstrates the styling.</p>
				<Code
					lang="html"
					code={`<p class="${item.class}">This is body text that demonstrates the styling.</p>`}
				/>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Label & Caption Styles</p>
	<Card>
		<div class="space-y-6 py-4">
			<div>
				<h5 class="text-on-muted mb-2 uppercase">Labels</h5>
				{#each labelClasses as item}
					<div class="py-2">
						<span class={item.class}>{item.class}</span>
					</div>
				{/each}
			</div>
			<div>
				<h5 class="text-on-muted mb-2 uppercase">Captions</h5>
				{#each captionClasses as item}
					<div class="py-2">
						<span class={item.class}>{item.class}</span>
					</div>
				{/each}
			</div>
		</div>
		<Code
			lang="html"
			code={`<span class="label-md">Form Label</span>
<span class="caption-md">Caption text</span>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Semantic Classes</p>
	<p class="section-description">
		Pre-defined classes for common UI patterns with balanced typography.
	</p>
	<Card>
		<div class="space-y-8 py-4">
			<div class="space-y-2">
				<h5 class="text-on-muted uppercase">Hero</h5>
				<h1 class="hero-title">Hero Title</h1>
				<p class="hero-subtitle">Hero subtitle with medium weight and subtle opacity</p>
				<p class="hero-description">
					Hero description text that provides more context about the content.
				</p>
			</div>
			<div class="space-y-2">
				<h5 class="text-on-muted uppercase">Section</h5>
				<h2 class="section-title">Section Title</h2>
				<p class="section-subtitle">Section subtitle for additional context</p>
				<p class="section-description">
					Section description paragraph with proper line height and opacity.
				</p>
			</div>
			<div class="space-y-2">
				<h5 class="text-on-muted uppercase">CTA</h5>
				<h3 class="cta-title">Call to Action Title</h3>
				<p class="cta-subtitle">Compelling subtitle for the CTA</p>
				<p class="cta-description">Description to encourage user action.</p>
			</div>
		</div>
		<Code
			lang="html"
			code={`<!-- Hero Section -->
<h1 class="hero-title">Hero Title</h1>
<p class="hero-subtitle">Hero subtitle</p>
<p class="hero-description">Hero description</p>

<!-- Page Section -->
<h2 class="section-title">Section Title</h2>
<p class="section-subtitle">Section subtitle</p>
<p class="section-description">Section description</p>

<!-- Call to Action -->
<h3 class="cta-title">CTA Title</h3>
<p class="cta-subtitle">CTA subtitle</p>
<p class="cta-description">CTA description</p>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Utility Classes</p>
	<p class="section-description">Subheadings, leads, overlines, and quotes.</p>
	<Card>
		<div class="space-y-6 py-4">
			<div>
				<span class="subheading">Subheading</span>
				<span class="subheading-muted ml-4">Subheading Muted</span>
			</div>
			<div>
				<p class="lead">Lead paragraph for introductions.</p>
				<p class="lead-lg">Large lead paragraph.</p>
			</div>
			<div>
				<p class="overline-primary">Overline Primary</p>
				<p class="overline-secondary">Overline Secondary</p>
				<p class="overline-muted">Overline Muted</p>
			</div>
			<div>
				<blockquote class="quote">"This is a quote with italic styling."</blockquote>
				<blockquote class="quote-lg">"This is a large quote."</blockquote>
			</div>
		</div>
		<Code
			lang="html"
			code={`<span class="subheading">Subheading</span>
<p class="lead">Lead paragraph text</p>
<p class="overline-primary">Overline</p>
<blockquote class="quote">"Quote text"</blockquote>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Component Typography</p>
	<p class="section-description">Typography classes for features, cards, and navigation.</p>
	<Card>
		<div class="grid-2 gap-6 py-4">
			<div class="space-y-2">
				<h4 class="feature-title">Feature Title</h4>
				<p class="feature-description">Feature description with muted color and proper sizing.</p>
			</div>
			<div class="space-y-2">
				<h5 class="card-title">Card Title</h5>
				<p class="card-description">Card description text for content.</p>
			</div>
			<div class="space-y-2">
				<!-- svelte-ignore a11y_missing_attribute -->
				<a class="nav-item">Navigation Item</a>
				<!-- svelte-ignore a11y_missing_attribute -->
				<a class="nav-item-lg">Large Navigation Item</a>
			</div>
			<div class="space-y-2">
				<p>Inline <code class="code-inline">code</code> example</p>
				<pre class="code-block">const code = 'block';</pre>
			</div>
		</div>
		<Code
			lang="html"
			code={`<h4 class="feature-title">Feature Title</h4>
<p class="feature-description">Description</p>

<h5 class="card-title">Card Title</h5>
<p class="card-description">Description</p>

<a class="nav-item">Nav Item</a>
<code class="code-inline">inline code</code>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Text Wrapping & Truncation</p>
	<Card>
		<div class="space-y-4 py-4">
			<div class="prose-narrow border-l-2 border-primary pl-4">
				<p class="text-on-muted text-sm">prose-narrow (45ch)</p>
				<p>
					This paragraph is constrained to a narrow width of 45 characters for optimal reading in
					sidebars.
				</p>
			</div>
			<div class="prose-normal border-l-2 border-secondary pl-4">
				<p class="text-on-muted text-sm">prose-normal (65ch)</p>
				<p>
					This paragraph uses the standard prose width of 65 characters, which is considered optimal
					for readability.
				</p>
			</div>
			<div class="prose-wide border-l-2 border-info pl-4">
				<p class="text-on-muted text-sm">prose-wide (80ch)</p>
				<p>
					This paragraph allows for wider text at 80 characters, useful for technical content or
					code documentation.
				</p>
			</div>
			<div>
				<p class="text-on-muted text-sm mb-2">truncate-lines-2</p>
				<p class="truncate-lines-2 max-w-md">
					This is a long paragraph that will be truncated after two lines. Lorem ipsum dolor sit
					amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
					magna aliqua.
				</p>
			</div>
		</div>
		<Code
			lang="html"
			code={`<p class="prose-normal">Optimal reading width</p>
<p class="text-balance">Balanced heading</p>
<p class="text-pretty">Pretty paragraph</p>
<p class="truncate-lines-2">Long text truncated...</p>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Display Classes Reference</p>
	<DocsProps
		props={displayClasses.map((c) => ({
			prop: `.${c.class}`,
			type: 'CSS class',
			initial: c.description
		}))}
	/>
</Section>

<Section>
	<p class="section-subtitle">Heading Classes Reference</p>
	<DocsProps
		props={headingClasses.map((c) => ({
			prop: `.${c.class}`,
			type: 'CSS class',
			initial: c.description
		}))}
	/>
</Section>

<Section>
	<p class="section-subtitle">Body & Label Classes Reference</p>
	<DocsProps
		props={[...bodyClasses, ...labelClasses, ...captionClasses].map((c) => ({
			prop: `.${c.class}`,
			type: 'CSS class',
			initial: c.description
		}))}
	/>
</Section>

<Section>
	<p class="section-subtitle">Semantic Classes Reference</p>
	<DocsProps
		props={semanticClasses.map((c) => ({
			prop: `.${c.class}`,
			type: 'CSS class',
			initial: c.description
		}))}
	/>
</Section>

<Section>
	<p class="section-subtitle">Utility Classes Reference</p>
	<DocsProps
		props={[...utilityClasses, ...componentClasses].map((c) => ({
			prop: `.${c.class}`,
			type: 'CSS class',
			initial: c.description
		}))}
	/>
</Section>
