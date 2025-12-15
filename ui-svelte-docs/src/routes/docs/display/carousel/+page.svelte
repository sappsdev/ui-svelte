<script lang="ts">
	import { Card, Carousel, Checkbox, Code, Section, Select, Tabs } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';

	const variantOptions = [
		{ id: 'default', label: 'Default' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'Small' },
		{ id: 'md', label: 'Medium' },
		{ id: 'lg', label: 'Large' }
	];

	const orientationOptions = [
		{ id: 'horizontal', label: 'Horizontal' },
		{ id: 'vertical', label: 'Vertical' }
	];

	const indicatorTypeOptions = [
		{ id: 'bar', label: 'Bar' },
		{ id: 'dot', label: 'Dot' }
	];

	let variant: any = $state('default');
	let size: any = $state('md');
	let orientation: any = $state('horizontal');
	let indicatorType: any = $state('dot');

	let autoplay = $state(false);
	let loop = $state(true);
	let showControls = $state(true);
	let showIndicators = $state(true);
	let showNavigation = $state(false);
	let showCounter = $state(false);
	let useTitle = $state(false);

	let code = $derived(() => {
		const snippetCode = `{#snippet slide1()}
  <div class="h-64 bg-primary-100 flex items-center justify-center rounded-lg">
    <h3 class="text-2xl font-bold">Slide 1</h3>
  </div>
{/snippet}

{#snippet slide2()}
  <div class="h-64 bg-secondary-100 flex items-center justify-center rounded-lg">
    <h3 class="text-2xl font-bold">Slide 2</h3>
  </div>
{/snippet}

{#snippet slide3()}
  <div class="h-64 bg-muted-100 flex items-center justify-center rounded-lg">
    <h3 class="text-2xl font-bold">Slide 3</h3>
  </div>
{/snippet}

`;
		const propsArray = [
			`slides={[`,
			`  { id: '1', content: slide1 },`,
			`  { id: '2', content: slide2 },`,
			`  { id: '3', content: slide3 }`,
			`]}`,
			variant !== 'default' && `variant="${variant}"`,
			size !== 'md' && `size="${size}"`,
			orientation !== 'horizontal' && `orientation="${orientation}"`,
			indicatorType !== 'dot' && `indicatorType="${indicatorType}"`,
			autoplay && `autoplay`,
			!loop && `loop={false}`,
			!showControls && `showControls={false}`,
			!showIndicators && `showIndicators={false}`,
			showNavigation && `showNavigation`,
			showCounter && `showCounter`,
			useTitle && `title="Featured Items"`
		].filter(Boolean);

		const componentCode = `<Carousel\n  ${propsArray.join('\n  ')}\n/>`;

		return snippetCode + componentCode;
	});

	const props = [
		{ prop: 'slides', type: 'Slide[]', initial: '[]', description: 'Array of slides (required)' },
		{
			prop: 'title',
			type: 'string | Snippet',
			initial: 'undefined',
			description: 'Optional header with navigation arrows'
		},
		{ prop: 'autoplay', type: 'boolean', initial: 'false', description: 'Auto-advance slides' },
		{
			prop: 'autoplayInterval',
			type: 'number',
			initial: '3000',
			description: 'Interval in milliseconds'
		},
		{ prop: 'loop', type: 'boolean', initial: 'true', description: 'Loop back to start' },
		{
			prop: 'showControls',
			type: 'boolean',
			initial: 'true',
			description: 'Show prev/next buttons'
		},
		{
			prop: 'showIndicators',
			type: 'boolean',
			initial: 'true',
			description: 'Show slide indicators'
		},
		{
			prop: 'showNavigation',
			type: 'boolean',
			initial: 'false',
			description: 'Show overlay navigation arrows'
		},
		{
			prop: 'showCounter',
			type: 'boolean',
			initial: 'false',
			description: 'Show slide counter (1/4)'
		},
		{
			prop: 'orientation',
			type: "'horizontal' | 'vertical'",
			initial: "'horizontal'",
			description: 'Scroll direction'
		},
		{
			prop: 'variant',
			type: "'primary' | 'secondary' | 'muted' | 'default'",
			initial: "'default'",
			description: 'Visual style'
		},
		{ prop: 'size', type: "'sm' | 'md' | 'lg'", initial: "'md'", description: 'Control size' },
		{
			prop: 'indicatorType',
			type: "'bar' | 'dot'",
			initial: "'dot'",
			description: 'Indicator style'
		},
		{ prop: 'rootClass', type: 'string', initial: "''", description: 'Root element class' },
		{ prop: 'slideClass', type: 'string', initial: "''", description: 'Slide element class' },
		{
			prop: 'onSlideChange',
			type: '(index: number) => void',
			initial: 'undefined',
			description: 'Callback on slide change'
		},
		{
			prop: 'slideWidth',
			type: 'number',
			initial: 'undefined',
			description: 'Fixed width for each slide in pixels (auto-calculates visible slides)'
		},
		{ prop: 'gap', type: 'number', initial: '0', description: 'Gap between slides in pixels' }
	];

	const slideProps = [
		{ prop: 'id', type: 'string | number', required: true, description: 'Unique identifier' },
		{ prop: 'content', type: 'Snippet', required: true, description: 'Slide content snippet' }
	];

	const propsTab = [
		{ id: 'carousel', label: 'Carousel Props', content: carouselPropsContent },
		{ id: 'slide', label: 'Slide Type', content: slidePropsContent }
	];
</script>

{#snippet slide1()}
	<div class="flex h-64 items-center justify-center bg-blue-100 rounded-lg">
		<div class="text-center">
			<h3 class="text-2xl font-bold text-blue-900">Slide 1</h3>
			<p class="text-blue-700">First carousel slide</p>
		</div>
	</div>
{/snippet}

{#snippet slide2()}
	<div class="flex h-64 items-center justify-center bg-purple-100 rounded-lg">
		<div class="text-center">
			<h3 class="text-2xl font-bold text-purple-900">Slide 2</h3>
			<p class="text-purple-700">Second carousel slide</p>
		</div>
	</div>
{/snippet}

{#snippet slide3()}
	<div class="flex h-64 items-center justify-center bg-green-100 rounded-lg">
		<div class="text-center">
			<h3 class="text-2xl font-bold text-green-900">Slide 3</h3>
			<p class="text-green-700">Third carousel slide</p>
		</div>
	</div>
{/snippet}

{#snippet slide4()}
	<div class="flex h-64 items-center justify-center bg-orange-100 rounded-lg">
		<div class="text-center">
			<h3 class="text-2xl font-bold text-orange-900">Slide 4</h3>
			<p class="text-orange-700">Fourth carousel slide</p>
		</div>
	</div>
{/snippet}

{#snippet carouselPropsContent()}
	<div class="overflow-x-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr class="border-b border-muted-200">
					<th class="text-left p-3 font-semibold">Prop</th>
					<th class="text-left p-3 font-semibold">Type</th>
					<th class="text-left p-3 font-semibold">Default</th>
					<th class="text-left p-3 font-semibold">Description</th>
				</tr>
			</thead>
			<tbody>
				{#each props as prop}
					<tr class="border-b border-muted-100">
						<td class="p-3"><code class="px-2 py-1 rounded text-sm">{prop.prop}</code></td>
						<td class="p-3"><code class="px-2 py-1 rounded text-xs">{prop.type}</code></td>
						<td class="p-3"><code class="px-2 py-1 rounded text-xs">{prop.initial}</code></td>
						<td class="p-3 text-sm">{prop.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet slidePropsContent()}
	<div class="overflow-x-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr class="border-b border-muted-200">
					<th class="text-left p-3 font-semibold">Prop</th>
					<th class="text-left p-3 font-semibold">Type</th>
					<th class="text-left p-3 font-semibold">Required</th>
					<th class="text-left p-3 font-semibold">Description</th>
				</tr>
			</thead>
			<tbody>
				{#each slideProps as prop}
					<tr class="border-b border-muted-100">
						<td class="p-3"><code class="px-2 py-1 rounded text-sm">{prop.prop}</code></td>
						<td class="p-3"><code class="px-2 py-1 rounded text-xs">{prop.type}</code></td>
						<td class="p-3">{prop.required ? 'Yes' : 'No'}</td>
						<td class="p-3 text-sm">{prop.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

<DocsHeader title="Carousel" llmUrl="https://ui-svelte.sappsdev.com/llm/display/carousel.md">
	A carousel component for cycling through slides or content panels with navigation controls, touch
	support, and autoplay functionality.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<Carousel
			slides={[
				{ id: '1', content: slide1 },
				{ id: '2', content: slide2 },
				{ id: '3', content: slide3 },
				{ id: '4', content: slide4 }
			]}
			{variant}
			{size}
			{orientation}
			{indicatorType}
			{autoplay}
			{loop}
			{showControls}
			{showIndicators}
			{showNavigation}
			{showCounter}
			title={useTitle ? 'Featured Items' : undefined}
		/>
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
		<Select label="Orientation" size="sm" options={orientationOptions} bind:value={orientation} />
		<Select
			label="Indicator Type"
			size="sm"
			options={indicatorTypeOptions}
			bind:value={indicatorType}
		/>
		<div class="column gap-2 pt-2">
			<span class="text-sm font-medium">Behavior</span>
			<div class="grid-2 gap-2">
				<Checkbox bind:checked={autoplay} label="Autoplay" />
				<Checkbox bind:checked={loop} label="Loop" />
			</div>
		</div>
		<div class="column gap-2 pt-2">
			<span class="text-sm font-medium">Visibility</span>
			<div class="grid-2 gap-2">
				<Checkbox bind:checked={showControls} label="Controls" />
				<Checkbox bind:checked={showIndicators} label="Indicators" />
				<Checkbox bind:checked={showNavigation} label="Navigation" />
				<Checkbox bind:checked={showCounter} label="Counter" />
				<Checkbox bind:checked={useTitle} label="Title Header" />
			</div>
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card>
		<Tabs tabs={propsTab} />
	</Card>
</Section>

<Section bodyClass="grid-1 md:grid-2">
	<!-- Basic Example -->
	<Card>
		{#snippet header()}
			<h4>Basic Carousel</h4>
		{/snippet}
		<Carousel
			slides={[
				{ id: '1', content: slide1 },
				{ id: '2', content: slide2 },
				{ id: '3', content: slide3 }
			]}
		/>
		{#snippet footer()}
			<code class="text-xs">&lt;Carousel slides={'{...}'} /&gt;</code>
		{/snippet}
	</Card>

	<!-- Header Layout -->
	<Card>
		{#snippet header()}
			<h4>Header Layout</h4>
		{/snippet}
		<Carousel
			slides={[
				{ id: '1', content: slide1 },
				{ id: '2', content: slide2 },
				{ id: '3', content: slide3 }
			]}
			title="Featured Items"
			showControls={false}
			showIndicators={false}
		/>
		{#snippet footer()}
			<code class="text-xs">title="Featured Items"</code>
		{/snippet}
	</Card>

	<!-- Autoplay Example -->
	<Card>
		{#snippet header()}
			<h4>Autoplay</h4>
		{/snippet}
		<Carousel
			slides={[
				{ id: '1', content: slide1 },
				{ id: '2', content: slide2 },
				{ id: '3', content: slide3 }
			]}
			autoplay
			autoplayInterval={2000}
		/>
		{#snippet footer()}
			<code class="text-xs">autoplay autoplayInterval={'{2000}'}</code>
		{/snippet}
	</Card>

	<!-- Counter & Navigation -->
	<Card>
		{#snippet header()}
			<h4>Counter & Navigation</h4>
		{/snippet}
		<Carousel
			slides={[
				{ id: '1', content: slide1 },
				{ id: '2', content: slide2 },
				{ id: '3', content: slide3 }
			]}
			showCounter
			showNavigation
			indicatorType="bar"
		/>
		{#snippet footer()}
			<code class="text-xs">showCounter showNavigation indicatorType="bar"</code>
		{/snippet}
	</Card>
</Section>

{#snippet serviceCard1()}
	<Card rootClass="h-full">
		<div class="column gap-4">
			<div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
				<span class="text-green-500 text-xl">📢</span>
			</div>
			<div class="column gap-2">
				<h4 class="font-bold text-lg">Marketing & Affiliate Services.</h4>
				<p class="text-sm text-on-surface/70">
					With just 10 seconds of audio, generate lifelike AI voices effortlessly.
				</p>
			</div>
		</div>
	</Card>
{/snippet}

{#snippet serviceCard2()}
	<Card rootClass="h-full">
		<div class="column gap-4">
			<div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
				<span class="text-purple-500 text-xl">👤</span>
			</div>
			<div class="column gap-2">
				<h4 class="font-bold text-lg">Professional Support by expert.</h4>
				<p class="text-sm text-on-surface/70">
					With just 10 seconds of audio, generate lifelike AI voices effortlessly.
				</p>
			</div>
		</div>
	</Card>
{/snippet}

{#snippet serviceCard3()}
	<Card rootClass="h-full">
		<div class="column gap-4">
			<div class="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
				<span class="text-cyan-500 text-xl">🔖</span>
			</div>
			<div class="column gap-2">
				<h4 class="font-bold text-lg">Provide SEO & SMM Services.</h4>
				<p class="text-sm text-on-surface/70">
					With just 10 seconds of audio, generate lifelike AI voices effortlessly.
				</p>
			</div>
		</div>
	</Card>
{/snippet}

{#snippet serviceCard4()}
	<Card rootClass="h-full">
		<div class="column gap-4">
			<div class="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
				<span class="text-amber-500 text-xl">💎</span>
			</div>
			<div class="column gap-2">
				<h4 class="font-bold text-lg">Worldclass UI/UX designer.</h4>
				<p class="text-sm text-on-surface/70">
					With just 10 seconds of audio, generate lifelike AI voices effortlessly.
				</p>
			</div>
		</div>
	</Card>
{/snippet}

{#snippet serviceCard5()}
	<Card rootClass="h-full">
		<div class="column gap-4">
			<div class="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
				<span class="text-rose-500 text-xl">🚀</span>
			</div>
			<div class="column gap-2">
				<h4 class="font-bold text-lg">Product Launch Strategy.</h4>
				<p class="text-sm text-on-surface/70">
					With just 10 seconds of audio, generate lifelike AI voices effortlessly.
				</p>
			</div>
		</div>
	</Card>
{/snippet}

{#snippet serviceCard6()}
	<Card rootClass="h-full">
		<div class="column gap-4">
			<div class="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
				<span class="text-indigo-500 text-xl">📊</span>
			</div>
			<div class="column gap-2">
				<h4 class="font-bold text-lg">Data Analytics Services.</h4>
				<p class="text-sm text-on-surface/70">
					With just 10 seconds of audio, generate lifelike AI voices effortlessly.
				</p>
			</div>
		</div>
	</Card>
{/snippet}

{#snippet serviceCard7()}
	<Card rootClass="h-full">
		<div class="column gap-4">
			<div class="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
				<span class="text-teal-500 text-xl">🔒</span>
			</div>
			<div class="column gap-2">
				<h4 class="font-bold text-lg">Security Consulting.</h4>
				<p class="text-sm text-on-surface/70">
					With just 10 seconds of audio, generate lifelike AI voices effortlessly.
				</p>
			</div>
		</div>
	</Card>
{/snippet}

{#snippet serviceCard8()}
	<Card rootClass="h-full">
		<div class="column gap-4">
			<div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
				<span class="text-orange-500 text-xl">☁️</span>
			</div>
			<div class="column gap-2">
				<h4 class="font-bold text-lg">Cloud Infrastructure.</h4>
				<p class="text-sm text-on-surface/70">
					With just 10 seconds of audio, generate lifelike AI voices effortlessly.
				</p>
			</div>
		</div>
	</Card>
{/snippet}

{#snippet servicesTitle()}
	<h2 class="text-3xl font-bold tracking-tight">Our provided<br />services</h2>
{/snippet}

<Section>
	<div class="bg-muted-50 rounded-2xl p-8">
		<Carousel
			slides={[
				{ id: '1', content: serviceCard1 },
				{ id: '2', content: serviceCard2 },
				{ id: '3', content: serviceCard3 },
				{ id: '4', content: serviceCard4 },
				{ id: '5', content: serviceCard5 },
				{ id: '6', content: serviceCard6 },
				{ id: '7', content: serviceCard7 },
				{ id: '8', content: serviceCard8 }
			]}
			title={servicesTitle}
			showControls={false}
			showIndicators={false}
			loop={false}
			slideWidth={280}
			gap={16}
		/>
	</div>
</Section>

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Title Header:</strong> Use the
					<code class="px-1 py-0.5 bg-blue rounded">title</code> prop to create a header layout with navigation
					arrows above the carousel
				</li>
				<li>
					<strong>Touch Support:</strong> The carousel supports touch gestures for mobile navigation (swipe
					left/right)
				</li>
				<li>
					<strong>Keyboard Navigation:</strong> Use arrow keys to navigate between slides when the carousel
					is focused
				</li>
				<li>
					<strong>Autoplay Pause:</strong> Autoplay automatically pauses when the user interacts with
					the carousel
				</li>
				<li>
					<strong>Custom Slides:</strong> Use Svelte snippets to create complex slide content with any
					components
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
			code={`<!-- Basic Carousel -->
{#snippet slide1()}
  <div class="h-64 bg-primary-100 flex items-center justify-center">
    <h3>Slide 1</h3>
  </div>
{/snippet}

{#snippet slide2()}
  <div class="h-64 bg-secondary-100 flex items-center justify-center">
    <h3>Slide 2</h3>
  </div>
{/snippet}

<Carousel slides={[
  { id: '1', content: slide1 },
  { id: '2', content: slide2 }
]} />

<!-- With Header Layout (arrows on top) -->
<Carousel 
  slides={slides}
  title="Our Services"
  showControls={false}
  showIndicators={false}
/>

<!-- Autoplay with Custom Interval -->
<Carousel 
  slides={slides}
  autoplay
  autoplayInterval={5000}
/>

<!-- With Counter and Navigation Arrows -->
<Carousel 
  slides={slides}
  showCounter
  showNavigation
  indicatorType="bar"
/>

<!-- With Slide Change Callback -->
<Carousel 
  slides={slides}
  onSlideChange={(index) => console.log('Current slide:', index)}
/>`}
		/>
	</Card>
</Section>
