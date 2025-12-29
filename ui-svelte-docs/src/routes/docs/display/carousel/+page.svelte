<script lang="ts">
	import { Card, Carousel, Checkbox, Code, Section, Select } from 'ui-svelte';
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

	let color: any = $state('primary');
	let size: any = $state('md');
	let orientation: any = $state('horizontal');
	let indicatorType: any = $state('bar');

	let autoplay = $state(false);
	let disableLoop = $state(false);
	let hideControls = $state(false);
	let hideIndicators = $state(false);
	let showNavigation = $state(false);
	let showCounter = $state(false);
	let useTitle = $state(false);

	let hasProps = $derived(
		[
			color !== 'primary',
			size !== 'md',
			orientation !== 'horizontal',
			indicatorType !== 'bar',
			autoplay,
			disableLoop,
			hideControls,
			hideIndicators,
			showNavigation,
			showCounter,
			useTitle
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Carousel } from 'ui-svelte';`,
			`<\/script>`,
			``,
			`{#snippet slide1()}`,
			`\t<div class="h-64 bg-blue-100 flex items-center justify-center rounded-lg">`,
			`\t\t<h3 class="text-2xl font-bold">Slide 1</h3>`,
			`\t</div>`,
			`{/snippet}`,
			``,
			`{#snippet slide2()}`,
			`\t<div class="h-64 bg-purple-100 flex items-center justify-center rounded-lg">`,
			`\t\t<h3 class="text-2xl font-bold">Slide 2</h3>`,
			`\t</div>`,
			`{/snippet}`,
			``,
			`{#snippet slide3()}`,
			`\t<div class="h-64 bg-green-100 flex items-center justify-center rounded-lg">`,
			`\t\t<h3 class="text-2xl font-bold">Slide 3</h3>`,
			`\t</div>`,
			`{/snippet}`
		];

		const componentLines = [
			hasProps && `<Carousel`,
			hasProps && `\tslides={[`,
			hasProps && `\t\t{ id: '1', content: slide1 },`,
			hasProps && `\t\t{ id: '2', content: slide2 },`,
			hasProps && `\t\t{ id: '3', content: slide3 }`,
			hasProps && `\t]}`,
			color !== 'primary' && `\tcolor="${color}"`,
			size !== 'md' && `\tsize="${size}"`,
			orientation !== 'horizontal' && `\torientation="${orientation}"`,
			indicatorType !== 'bar' && `\tindicatorType="${indicatorType}"`,
			autoplay && `\tautoplay`,
			disableLoop && `\tdisableLoop`,
			hideControls && `\thideControls`,
			hideIndicators && `\thideIndicators`,
			showNavigation && `\tshowNavigation`,
			showCounter && `\tshowCounter`,
			useTitle && `\ttitle="Featured Items"`,
			hasProps && `/>`,
			!hasProps &&
				`<Carousel slides={[{ id: '1', content: slide1 }, { id: '2', content: slide2 }, { id: '3', content: slide3 }]} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'slides', type: 'Slide[]', initial: '[]' },
		{ prop: 'title', type: 'string | Snippet', initial: '' },
		{ prop: 'autoplay', type: 'boolean', initial: 'false' },
		{ prop: 'autoplayInterval', type: 'number', initial: '3000' },
		{ prop: 'disableLoop', type: 'boolean', initial: 'false' },
		{ prop: 'hideControls', type: 'boolean', initial: 'false' },
		{ prop: 'hideIndicators', type: 'boolean', initial: 'false' },
		{ prop: 'showNavigation', type: 'boolean', initial: 'false' },
		{ prop: 'showCounter', type: 'boolean', initial: 'false' },
		{ prop: 'orientation', type: 'horizontal | vertical', initial: 'horizontal' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'indicatorType', type: 'bar | dot', initial: 'bar' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'slideClass', type: 'string', initial: '' },
		{ prop: 'slidesPerView', type: 'number', initial: '' },
		{ prop: 'slideWidth', type: 'number', initial: '' },
		{ prop: 'slideHeight', type: 'number', initial: '' },
		{ prop: 'gap', type: 'number', initial: '0' },
		{ prop: 'onSlideChange', type: '(index: number) => void', initial: '' }
	];

	const slideProps = [
		{ prop: 'id', type: 'string | number', initial: '' },
		{ prop: 'content', type: 'Snippet', initial: '' }
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

<DocsHeader title="Carousel" llmUrl="https://ui-svelte.sappsdev.com/llm/display/carousel.md">
	A carousel component for cycling through slides with navigation controls, touch support, and
	autoplay functionality.
</DocsHeader>

<Section>
	<Card>
		<div class="grid-2 md:grid-4 gap-2">
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
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Orientation"
				size="sm"
				options={orientationOptions}
				bind:value={orientation}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Indicator Type"
				size="sm"
				options={indicatorTypeOptions}
				bind:value={indicatorType}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={autoplay} label="Autoplay" />
			<Checkbox bind:checked={disableLoop} label="Disable Loop" />
			<Checkbox bind:checked={hideControls} label="Hide Controls" />
			<Checkbox bind:checked={hideIndicators} label="Hide Indicators" />
			<Checkbox bind:checked={showNavigation} label="Navigation" />
			<Checkbox bind:checked={showCounter} label="Counter" />
			<Checkbox bind:checked={useTitle} label="Title Header" />
		</div>

		<div class="doc-preview">
			<Carousel
				slides={[
					{ id: '1', content: slide1 },
					{ id: '2', content: slide2 },
					{ id: '3', content: slide3 },
					{ id: '4', content: slide4 }
				]}
				{color}
				{size}
				{orientation}
				{indicatorType}
				{autoplay}
				{disableLoop}
				{hideControls}
				{hideIndicators}
				{showNavigation}
				{showCounter}
				title={useTitle ? 'Featured Items' : undefined}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		{#each sizeOptions as sizeItem}
			<div class="wrap gap-4 center">
				<Carousel
					slides={[
						{ id: '1', content: slide1 },
						{ id: '2', content: slide2 },
						{ id: '3', content: slide3 }
					]}
					size={sizeItem.id as any}
					rootClass="max-w-md"
				/>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Indicator Types</p>
	<Card bodyClass="grid-1 md:grid-2">
		<div class="column gap-2">
			<p class="text-sm font-medium">Bar Indicators</p>
			<Carousel
				slides={[
					{ id: '1', content: slide1 },
					{ id: '2', content: slide2 },
					{ id: '3', content: slide3 }
				]}
				indicatorType="bar"
			/>
		</div>
		<div class="column gap-2">
			<p class="text-sm font-medium">Dot Indicators</p>
			<Carousel
				slides={[
					{ id: '1', content: slide1 },
					{ id: '2', content: slide2 },
					{ id: '3', content: slide3 }
				]}
				indicatorType="dot"
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Title Header</p>
	<Card>
		<Carousel
			slides={[
				{ id: '1', content: slide1 },
				{ id: '2', content: slide2 },
				{ id: '3', content: slide3 },
				{ id: '4', content: slide4 }
			]}
			title="Featured Items"
			hideControls
			hideIndicators
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Navigation & Counter</p>
	<Card bodyClass="grid-1 md:grid-2">
		<div class="column gap-2">
			<p class="text-sm font-medium">With Navigation Arrows</p>
			<Carousel
				slides={[
					{ id: '1', content: slide1 },
					{ id: '2', content: slide2 },
					{ id: '3', content: slide3 }
				]}
				showNavigation
				hideControls
			/>
		</div>
		<div class="column gap-2">
			<p class="text-sm font-medium">With Counter</p>
			<Carousel
				slides={[
					{ id: '1', content: slide1 },
					{ id: '2', content: slide2 },
					{ id: '3', content: slide3 }
				]}
				showCounter
			/>
		</div>
	</Card>
</Section>

{#snippet serviceCard1()}
	<Card rootClass="h-full">
		<div class="column gap-4">
			<div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
				<span class="text-green-500 text-xl">📢</span>
			</div>
			<div class="column gap-2">
				<h4 class="font-bold text-lg">Marketing Services</h4>
				<p class="text-sm text-on-surface/70 h-16">
					Professional marketing solutions for your business.
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
				<h4 class="font-bold text-lg">Expert Support</h4>
				<p class="text-sm text-on-surface/70 h-16">Get help from our team of professionals.</p>
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
				<h4 class="font-bold text-lg">SEO Services</h4>
				<p class="text-sm text-on-surface/70 h-16">Optimize your online presence effectively.</p>
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
				<h4 class="font-bold text-lg">UI/UX Design</h4>
				<p class="text-sm text-on-surface/70 h-16">World-class design for your products.</p>
			</div>
		</div>
	</Card>
{/snippet}

{#snippet servicesTitle()}
	<h2 class="text-2xl font-bold tracking-tight">Our Services</h2>
{/snippet}

<Section>
	<p class="section-subtitle">Multi-Item Carousel</p>
	<Card>
		<div class="bg-muted/20 rounded-2xl p-6">
			<Carousel
				slides={[
					{ id: '1', content: serviceCard1 },
					{ id: '2', content: serviceCard2 },
					{ id: '3', content: serviceCard3 },
					{ id: '4', content: serviceCard4 }
				]}
				title={servicesTitle}
				hideControls
				hideIndicators
				disableLoop
				slidesPerView={3}
				gap={16}
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">Slide Type</p>
	<DocsProps props={slideProps} />
</Section>
