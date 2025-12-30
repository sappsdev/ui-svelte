<script lang="ts">
	import { ArcChart, Card, Checkbox, Code, Section, Select, TextField } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' },
		{ id: 'xl', label: 'xl' }
	];

	const paletteOptions = [
		{ id: 'default', label: 'Default' },
		{ id: 'rainbow', label: 'Rainbow' },
		{ id: 'ocean', label: 'Ocean' },
		{ id: 'sunset', label: 'Sunset' },
		{ id: 'forest', label: 'Forest' },
		{ id: 'neon', label: 'Neon' }
	];

	const legendPositionOptions = [
		{ id: 'top', label: 'Top' },
		{ id: 'right', label: 'Right' },
		{ id: 'bottom', label: 'Bottom' },
		{ id: 'left', label: 'Left' },
		{ id: 'none', label: 'None' }
	];

	const linecapOptions = [
		{ id: 'round', label: 'Round' },
		{ id: 'butt', label: 'Butt' },
		{ id: 'square', label: 'Square' }
	];

	let size: any = $state('md');
	let palette: any = $state('default');
	let legendPosition: any = $state('right');
	let linecap: any = $state('round');

	let disableAnimation = $state(false);
	let hideLegend = $state(false);
	let hideValues = $state(false);
	let showGradient = $state(false);
	let showGlow = $state(false);
	let showInlineLabels = $state(false);
	let loading = $state(false);

	let thickness = $state(16);
	let gap = $state(8);

	let sampleData = [
		{ value: 75, max: 100, label: 'Progress', color: 'primary' as const },
		{ value: 60, max: 100, label: 'Tasks', color: 'success' as const },
		{ value: 45, max: 100, label: 'Goals', color: 'warning' as const }
	];

	let hasProps = $derived(
		[
			size !== 'md',
			palette !== 'default',
			legendPosition !== 'right',
			linecap !== 'round',
			disableAnimation,
			hideLegend,
			hideValues,
			showGradient,
			showGlow,
			showInlineLabels,
			loading,
			thickness !== 16,
			gap !== 8
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { ArcChart } from 'ui-svelte';`,
			``,
			`\tconst data = [`,
			`\t\t{ value: 75, max: 100, label: 'Progress', color: 'primary' },`,
			`\t\t{ value: 60, max: 100, label: 'Tasks', color: 'success' },`,
			`\t\t{ value: 45, max: 100, label: 'Goals', color: 'warning' }`,
			`\t];`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<ArcChart`,
			hasProps && `\t{data}`,
			size !== 'md' && `\tsize="${size}"`,
			palette !== 'default' && `\tpalette="${palette}"`,
			legendPosition !== 'right' && `\tlegendPosition="${legendPosition}"`,
			linecap !== 'round' && `\tlinecap="${linecap}"`,
			thickness !== 16 && `\tthickness={${thickness}}`,
			gap !== 8 && `\tgap={${gap}}`,
			disableAnimation && `\tdisableAnimation`,
			hideLegend && `\thideLegend`,
			hideValues && `\thideValues`,
			showGradient && `\tshowGradient`,
			showGlow && `\tshowGlow`,
			showInlineLabels && `\tshowInlineLabels`,
			loading && `\tloading`,
			hasProps && `/>`,
			!hasProps && `<ArcChart {data} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'ArcData[]', initial: '[]' },
		{ prop: 'centerText', type: 'string', initial: '' },
		{ prop: 'centerValue', type: 'string | number', initial: '' },
		{ prop: 'thickness', type: 'number', initial: '16' },
		{ prop: 'gap', type: 'number', initial: '8' },
		{ prop: 'disableAnimation', type: 'boolean', initial: 'false' },
		{ prop: 'animationDuration', type: 'number', initial: '1000' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data' },
		{ prop: 'hideLegend', type: 'boolean', initial: 'false' },
		{ prop: 'hideValues', type: 'boolean', initial: 'false' },
		{ prop: 'size', type: 'sm | md | lg | xl', initial: 'md' },
		{ prop: 'innerRadius', type: 'number', initial: '' },
		{ prop: 'outerRadius', type: 'number', initial: '' },
		{ prop: 'startAngle', type: 'number', initial: '-90' },
		{ prop: 'endAngle', type: 'number', initial: '270' },
		{ prop: 'showGradient', type: 'boolean', initial: 'false' },
		{ prop: 'showGlow', type: 'boolean', initial: 'false' },
		{ prop: 'linecap', type: 'round | butt | square', initial: 'round' },
		{ prop: 'palette', type: 'default | rainbow | ocean | sunset | forest | neon', initial: '' },
		{ prop: 'legendPosition', type: 'top | right | bottom | left | none', initial: 'right' },
		{ prop: 'valueFormatter', type: '(value: number) => string', initial: '' },
		{ prop: 'onClick', type: '(arc: ArcData, index: number) => void', initial: '' },
		{ prop: 'onHover', type: '(arc: ArcData | null, index: number) => void', initial: '' },
		{ prop: 'selected', type: 'number[]', initial: '[]' },
		{ prop: 'showInlineLabels', type: 'boolean', initial: 'false' },
		{ prop: 'centerContent', type: 'Snippet', initial: '' },
		{
			prop: 'tooltipContent',
			type: 'Snippet<[{ arc: ArcData; percentage: number }]>',
			initial: ''
		},
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'chartClass', type: 'string', initial: '' }
	];

	const singleArcData = [{ value: 72, max: 100, label: 'Completion', color: 'primary' as const }];

	const multipleArcsData = [
		{ value: 85, max: 100, label: 'Sales', color: 'primary' as const },
		{ value: 65, max: 100, label: 'Marketing', color: 'success' as const },
		{ value: 45, max: 100, label: 'Support', color: 'warning' as const },
		{ value: 30, max: 100, label: 'Development', color: 'info' as const }
	];

	const gaugeData = [{ value: 67, max: 100, label: 'CPU Usage', unit: '%' }];
</script>

<DocsHeader title="Arc Chart" llmUrl="https://ui-svelte.sappsdev.com/llm/charts/arc.md">
	Arc Chart displays progress or proportional data in a circular format with multiple concentric
	arcs.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
		<div class="grid-2 md:grid-4 gap-2">
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
				label="Palette"
				size="sm"
				options={paletteOptions}
				bind:value={palette}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Legend Position"
				size="sm"
				options={legendPositionOptions}
				bind:value={legendPosition}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Linecap"
				size="sm"
				options={linecapOptions}
				bind:value={linecap}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<TextField
				isFloatLabel
				rootClass="max-w-xs"
				label="Thickness"
				size="sm"
				type="number"
				bind:value={thickness}
			/>
			<TextField
				isFloatLabel
				rootClass="max-w-xs"
				label="Gap"
				size="sm"
				type="number"
				bind:value={gap}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={disableAnimation} label="Disable Animation" />
			<Checkbox bind:checked={hideLegend} label="Hide Legend" />
			<Checkbox bind:checked={hideValues} label="Hide Values" />
			<Checkbox bind:checked={showGradient} label="Show Gradient" />
			<Checkbox bind:checked={showGlow} label="Show Glow" />
			<Checkbox bind:checked={showInlineLabels} label="Inline Labels" />
			<Checkbox bind:checked={loading} label="Loading" />
		</div>

		<div class="doc-preview">
			<ArcChart
				data={sampleData}
				{size}
				{palette}
				{legendPosition}
				{linecap}
				{thickness}
				{gap}
				{disableAnimation}
				{hideLegend}
				{hideValues}
				{showGradient}
				{showGlow}
				{showInlineLabels}
				{loading}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each sizeOptions as sizeOpt}
				<div class="flex flex-col items-center gap-2">
					<span class="text-sm">{sizeOpt.label}</span>
					<ArcChart
						data={singleArcData}
						size={sizeOpt.id as any}
						hideLegend
						centerText="Score"
						centerValue="72%"
					/>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Palettes</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each paletteOptions as paletteOpt}
				<div class="flex flex-col items-center gap-2">
					<span class="text-sm">{paletteOpt.label}</span>
					<ArcChart data={multipleArcsData} size="sm" palette={paletteOpt.id as any} hideLegend />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Legend Positions</p>
	<Card>
		<div class="grid-2 gap-4">
			{#each legendPositionOptions.filter((l) => l.id !== 'none') as legendOpt}
				<div class="flex flex-col items-center gap-2">
					<span class="text-sm">{legendOpt.label}</span>
					<ArcChart data={sampleData} size="sm" legendPosition={legendOpt.id as any} />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Linecap Styles</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each linecapOptions as linecapOpt}
				<div class="flex flex-col items-center gap-2">
					<span class="text-sm">{linecapOpt.label}</span>
					<ArcChart data={singleArcData} size="sm" linecap={linecapOpt.id as any} hideLegend />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Single Arc (Gauge)</p>
	<Card>
		<div class="wrap gap-4 center">
			<ArcChart
				data={gaugeData}
				size="md"
				centerText="CPU"
				centerValue="67%"
				showGradient
				showGlow
			/>
			<ArcChart
				data={[{ value: 85, max: 100, label: 'Memory', unit: '%', color: 'success' }]}
				size="md"
				centerText="Memory"
				centerValue="85%"
				showGradient
				showGlow
			/>
			<ArcChart
				data={[{ value: 42, max: 100, label: 'Disk', unit: '%', color: 'warning' }]}
				size="md"
				centerText="Disk"
				centerValue="42%"
				showGradient
				showGlow
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Visual Effects</p>
	<Card>
		<div class="wrap gap-4 center">
			<div class="flex flex-col items-center gap-2">
				<span class="text-sm">Default</span>
				<ArcChart data={multipleArcsData} size="sm" hideLegend />
			</div>
			<div class="flex flex-col items-center gap-2">
				<span class="text-sm">Gradient</span>
				<ArcChart data={multipleArcsData} size="sm" hideLegend showGradient />
			</div>
			<div class="flex flex-col items-center gap-2">
				<span class="text-sm">Glow</span>
				<ArcChart data={multipleArcsData} size="sm" hideLegend showGlow />
			</div>
			<div class="flex flex-col items-center gap-2">
				<span class="text-sm">Both</span>
				<ArcChart data={multipleArcsData} size="sm" hideLegend showGradient showGlow />
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">States</p>
	<Card>
		<div class="wrap gap-4 center">
			<div class="flex flex-col items-center gap-2">
				<span class="text-sm">Loading</span>
				<ArcChart data={sampleData} size="sm" loading />
			</div>
			<div class="flex flex-col items-center gap-2">
				<span class="text-sm">Empty</span>
				<ArcChart data={[]} size="sm" empty emptyText="No data available" />
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
