<script lang="ts">
	import { ArcChart, Card, Checkbox, Section, Select, Slider } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const sizeOptions = [
		{ id: 'sm', label: 'Small' },
		{ id: 'md', label: 'Medium' },
		{ id: 'lg', label: 'Large' },
		{ id: 'xl', label: 'Extra Large' }
	];

	const legendPositionOptions = [
		{ id: 'right', label: 'Right' },
		{ id: 'bottom', label: 'Bottom' },
		{ id: 'left', label: 'Left' },
		{ id: 'top', label: 'Top' },
		{ id: 'none', label: 'None' }
	];

	const paletteOptions = [
		{ id: '', label: 'Default' },
		{ id: 'rainbow', label: 'Rainbow' },
		{ id: 'ocean', label: 'Ocean' },
		{ id: 'sunset', label: 'Sunset' },
		{ id: 'forest', label: 'Forest' },
		{ id: 'neon', label: 'Neon' }
	];

	const linecapOptions = [
		{ id: 'round', label: 'Round' },
		{ id: 'butt', label: 'Butt' },
		{ id: 'square', label: 'Square' }
	];

	let size: any = $state('md');
	let legendPosition: any = $state('right');
	let palette: any = $state('');
	let linecap: any = $state('round');
	let thickness = $state(16);
	let gap = $state(8);

	let animated = $state(true);
	let showLegend = $state(true);
	let showValues = $state(true);
	let showGradient = $state(false);
	let showGlow = $state(false);
	let showInlineLabels = $state(false);

	let centerText = $state('Total');
	let centerValue = $state('');

	// Sample data
	let sampleData = $state([
		{ value: 75, max: 100, label: 'Progress', color: 'primary' as const },
		{ value: 45, max: 100, label: 'Tasks', color: 'success' as const },
		{ value: 60, max: 100, label: 'Budget', color: 'warning' as const }
	]);

	let code = $derived(() => {
		const dataStr = `[
		{ value: 75, max: 100, label: 'Progress', color: 'primary' },
		{ value: 45, max: 100, label: 'Tasks', color: 'success' },
		{ value: 60, max: 100, label: 'Budget', color: 'warning' }
	]`;

		const propsLines = [
			`<ArcChart`,
			`\tdata={${dataStr}}`,
			size !== 'md' && `\tsize="${size}"`,
			thickness !== 16 && `\tthickness={${thickness}}`,
			gap !== 8 && `\tgap={${gap}}`,
			legendPosition !== 'right' && `\tlegendPosition="${legendPosition}"`,
			palette && `\tpalette="${palette}"`,
			linecap !== 'round' && `\tlinecap="${linecap}"`,
			centerText && `\tcenterText="${centerText}"`,
			centerValue && `\tcenterValue="${centerValue}"`,
			!animated && `\tanimated={false}`,
			!showLegend && `\tshowLegend={false}`,
			!showValues && `\tshowValues={false}`,
			showGradient && `\tshowGradient`,
			showGlow && `\tshowGlow`,
			showInlineLabels && `\tshowInlineLabels`,
			`/>`
		].filter(Boolean);

		return propsLines.join('\n');
	});

	const props = [
		{ prop: 'data', type: 'ArcData[]', initial: '[]' },
		{ prop: 'size', type: 'sm | md | lg | xl', initial: 'md' },
		{ prop: 'thickness', type: 'number', initial: '16' },
		{ prop: 'gap', type: 'number', initial: '8' },
		{ prop: 'centerText', type: 'string', initial: '' },
		{ prop: 'centerValue', type: 'string | number', initial: '' },
		{ prop: 'animated', type: 'boolean', initial: 'true' },
		{ prop: 'animationDuration', type: 'number', initial: '1000' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data' },
		{ prop: 'showLegend', type: 'boolean', initial: 'true' },
		{ prop: 'showValues', type: 'boolean', initial: 'true' },
		{ prop: 'legendPosition', type: 'top | right | bottom | left | none', initial: 'right' },
		{ prop: 'showGradient', type: 'boolean', initial: 'false' },
		{ prop: 'showGlow', type: 'boolean', initial: 'false' },
		{ prop: 'linecap', type: 'round | butt | square', initial: 'round' },
		{ prop: 'palette', type: 'default | rainbow | ocean | sunset | forest | neon', initial: '' },
		{ prop: 'showInlineLabels', type: 'boolean', initial: 'false' },
		{ prop: 'valueFormatter', type: '(value: number) => string', initial: '' },
		{ prop: 'onClick', type: '(arc: ArcData, index: number) => void', initial: '' },
		{ prop: 'onHover', type: '(arc: ArcData | null, index: number) => void', initial: '' },
		{ prop: 'selected', type: 'number[]', initial: '[]' },
		{ prop: 'innerRadius', type: 'number', initial: '' },
		{ prop: 'outerRadius', type: 'number', initial: '' },
		{ prop: 'startAngle', type: 'number', initial: '-90' },
		{ prop: 'endAngle', type: 'number', initial: '270' },
		{ prop: 'centerContent', type: 'Snippet', initial: '' },
		{ prop: 'tooltipContent', type: 'Snippet<[{ arc, percentage }]>', initial: '' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'chartClass', type: 'string', initial: '' }
	];

	const arcDataProps = [
		{ prop: 'value', type: 'number', initial: 'required' },
		{ prop: 'max', type: 'number', initial: 'value' },
		{ prop: 'label', type: 'string', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | success | info | warning | danger | muted',
			initial: 'auto'
		},
		{ prop: 'unit', type: 'string', initial: '' },
		{ prop: 'gradient', type: '{ from: string; to: string }', initial: '' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' }
	];

	// Interactive example state
	let selectedArcs: number[] = $state([]);

	function handleArcClick(arc: any, index: number) {
		if (selectedArcs.includes(index)) {
			selectedArcs = selectedArcs.filter((i) => i !== index);
		} else {
			selectedArcs = [...selectedArcs, index];
		}
	}

	// Value formatter example
	function formatK(value: number): string {
		if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
		return String(value);
	}
</script>

<DocsHeader title="ArcChart">
	A customizable arc chart component for visualizing progress, metrics, and proportional data with
	multiple arcs, animations, and interactive features.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<ArcChart
			data={sampleData}
			{size}
			{thickness}
			{gap}
			{animated}
			{showLegend}
			{showValues}
			{showGradient}
			{showGlow}
			{showInlineLabels}
			{legendPosition}
			palette={palette || undefined}
			{linecap}
			{centerText}
			centerValue={centerValue || undefined}
		/>
	</DocsPreview>
	<Card>
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
		<Select
			label="Legend Position"
			size="sm"
			options={legendPositionOptions}
			bind:value={legendPosition}
		/>
		<Select label="Palette" size="sm" options={paletteOptions} bind:value={palette} />
		<Select label="Linecap" size="sm" options={linecapOptions} bind:value={linecap} />
		<Slider label="Thickness" min={4} max={32} bind:value={thickness} />
		<Slider label="Gap" min={0} max={20} bind:value={gap} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={animated} label="Animated" />
			<Checkbox bind:checked={showLegend} label="Legend" />
			<Checkbox bind:checked={showValues} label="Values" />
			<Checkbox bind:checked={showGradient} label="Gradient" />
			<Checkbox bind:checked={showGlow} label="Glow" />
			<Checkbox bind:checked={showInlineLabels} label="Inline Labels" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="grid-2 md:grid-4 center">
		{#snippet header()}
			<h4>Sizes</h4>
		{/snippet}
		{#each sizeOptions as sizeOpt}
			<div class="flex flex-col items-center gap-2">
				<ArcChart
					data={[{ value: 75, max: 100, color: 'primary' }]}
					size={sizeOpt.id as any}
					showLegend={false}
					centerText={sizeOpt.label}
				/>
				<span class="text-sm text-on-muted">{sizeOpt.id}</span>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-2 md:grid-3 center">
		{#snippet header()}
			<h4>Color Palettes</h4>
		{/snippet}
		{#each ['default', 'rainbow', 'ocean', 'sunset', 'forest', 'neon'] as pal}
			<div class="flex flex-col items-center gap-2">
				<ArcChart
					data={[
						{ value: 80, max: 100, label: 'A' },
						{ value: 60, max: 100, label: 'B' },
						{ value: 40, max: 100, label: 'C' }
					]}
					size="sm"
					palette={pal as any}
					showLegend={false}
					centerText={pal}
				/>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-2 md:grid-4 center">
		{#snippet header()}
			<h4>Visual Effects</h4>
		{/snippet}
		<div class="flex flex-col items-center gap-2">
			<ArcChart
				data={[{ value: 70, max: 100, color: 'primary' }]}
				size="sm"
				showLegend={false}
				centerText="Default"
			/>
			<span class="text-sm text-on-muted">Default</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<ArcChart
				data={[{ value: 70, max: 100, color: 'success' }]}
				size="sm"
				showGlow
				showLegend={false}
				centerText="Glow"
			/>
			<span class="text-sm text-on-muted">With Glow</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<ArcChart
				data={[{ value: 70, max: 100, color: 'info' }]}
				size="sm"
				showGradient
				showLegend={false}
				centerText="Gradient"
			/>
			<span class="text-sm text-on-muted">With Gradient</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<ArcChart
				data={[{ value: 70, max: 100, color: 'warning' }]}
				size="sm"
				showGlow
				showGradient
				showLegend={false}
				centerText="Both"
			/>
			<span class="text-sm text-on-muted">Glow + Gradient</span>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-2 md:grid-3 center">
		{#snippet header()}
			<h4>Linecap Styles</h4>
		{/snippet}
		{#each linecapOptions as lineOpt}
			<div class="flex flex-col items-center gap-2">
				<ArcChart
					data={[{ value: 60, max: 100, color: 'secondary' }]}
					size="sm"
					linecap={lineOpt.id as any}
					showLegend={false}
					centerText={lineOpt.label}
				/>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Interactive Selection</h4>
		{/snippet}
		<div class="flex flex-col md:flex-row items-center gap-4">
			<ArcChart
				data={[
					{ value: 85, max: 100, label: 'Downloads', color: 'primary' },
					{ value: 62, max: 100, label: 'Uploads', color: 'success' },
					{ value: 45, max: 100, label: 'Shares', color: 'warning' },
					{ value: 30, max: 100, label: 'Comments', color: 'info' }
				]}
				size="lg"
				onClick={handleArcClick}
				selected={selectedArcs}
				centerText="Metrics"
			/>
			<div class="text-sm">
				<p class="font-semibold mb-2">Selected arcs:</p>
				{#if selectedArcs.length === 0}
					<p class="text-on-muted">Click on arcs to select them</p>
				{:else}
					<p class="text-on-muted">Indices: {selectedArcs.join(', ')}</p>
				{/if}
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Value Formatting</h4>
		{/snippet}
		<div class="grid-2 md:grid-3 center">
			<div class="flex flex-col items-center gap-2">
				<ArcChart
					data={[{ value: 5280, max: 10000, label: 'Users', color: 'primary' }]}
					size="sm"
					showLegend={false}
					valueFormatter={formatK}
				/>
				<span class="text-sm text-on-muted">K Format (5.3K)</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<ArcChart
					data={[{ value: 75, max: 100, label: 'Battery', unit: '%', color: 'success' }]}
					size="sm"
					showLegend={false}
				/>
				<span class="text-sm text-on-muted">With Unit (%)</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<ArcChart
					data={[{ value: 128, max: 256, label: 'Storage', unit: 'GB', color: 'info' }]}
					size="sm"
					showLegend={false}
				/>
				<span class="text-sm text-on-muted">Custom Unit (GB)</span>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Custom Center Content</h4>
		{/snippet}
		<div class="grid-2 md:grid-3 center">
			<ArcChart data={[{ value: 85, max: 100, color: 'success' }]} size="md" showLegend={false}>
				{#snippet centerContent()}
					<div class="text-center">
						<div class="text-2xl font-bold text-success">✓</div>
						<div class="text-xs text-on-muted">Complete</div>
					</div>
				{/snippet}
			</ArcChart>
			<ArcChart data={[{ value: 45, max: 100, color: 'warning' }]} size="md" showLegend={false}>
				{#snippet centerContent()}
					<div class="text-center">
						<div class="text-lg font-bold">45%</div>
						<div class="text-xs text-on-muted">In Progress</div>
					</div>
				{/snippet}
			</ArcChart>
			<ArcChart data={[{ value: 20, max: 100, color: 'danger' }]} size="md" showLegend={false}>
				{#snippet centerContent()}
					<div class="text-center">
						<div class="text-2xl">⚠️</div>
						<div class="text-xs text-on-muted">Low</div>
					</div>
				{/snippet}
			</ArcChart>
		</div>
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Legend Positions</h4>
		{/snippet}
		<div class="grid-2 md:grid-4 gap-6">
			{#each legendPositionOptions.filter((p) => p.id !== 'none') as pos}
				<div class="flex flex-col items-center gap-2">
					<ArcChart
						data={[
							{ value: 70, max: 100, label: 'A', color: 'primary' },
							{ value: 50, max: 100, label: 'B', color: 'success' }
						]}
						size="sm"
						legendPosition={pos.id as any}
						showValues={false}
					/>
					<span class="text-sm text-on-muted">{pos.label}</span>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>States</h4>
		{/snippet}
		<div class="grid-2 md:grid-3 center">
			<div class="flex flex-col items-center gap-2">
				<ArcChart
					data={[{ value: 50, max: 100, color: 'primary' }]}
					size="sm"
					loading
					showLegend={false}
				/>
				<span class="text-sm text-on-muted">Loading</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<ArcChart data={[]} size="sm" empty emptyText="No data available" showLegend={false} />
				<span class="text-sm text-on-muted">Empty</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<ArcChart
					data={[
						{ value: 60, max: 100, label: 'Active', color: 'success' },
						{ value: 40, max: 100, label: 'Disabled', color: 'muted', disabled: true }
					]}
					size="sm"
				/>
				<span class="text-sm text-on-muted">Disabled Arc</span>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<h3>ArcChart Props</h3>
	<DocsProps {props} />
</Section>

<Section>
	<h3>ArcData Type</h3>
	<DocsProps props={arcDataProps} />
</Section>
