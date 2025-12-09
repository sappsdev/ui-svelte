<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';

	type TooltipData = {
		value: number;
		label: string;
		seriesName: string;
		color: Color;
	};

	type LinearScale = {
		(value: number): number;
		invert: (pixel: number) => number;
		domain: [number, number];
		range: [number, number];
	};

	type BandScale = {
		(value: string | number): number;
		bandwidth: () => number;
		domain: (string | number)[];
		range: [number, number];
	};

	type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';

	type DataPoint = {
		label: string;
		value: number;
	};

	type Series = {
		name: string;
		data: DataPoint[];
		color?: Color;
	};

	type Margin = {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};

	type Props = {
		data?: DataPoint[];
		series?: Series[];
		margin?: Margin;
		color?: Color;
		colors?: Color[];
		grouped?: boolean;
		stacked?: boolean;
		showGrid?: boolean;
		showLegend?: boolean;
		showValues?: boolean;
		barPadding?: number;
		groupPadding?: number;
		barRadius?: number;
		loading?: boolean;
		empty?: boolean;
		emptyText?: string;
		class?: string;
	};

	let {
		data = [],
		series = [],
		margin = { top: 20, right: 20, bottom: 40, left: 50 },
		color = 'primary' as Color,
		colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'] as Color[],
		grouped = false,
		stacked = false,
		showGrid = true,
		showLegend = false,
		showValues = false,
		barPadding = 0.2,
		groupPadding = 0.1,
		barRadius = 0,
		loading = false,
		empty = false,
		emptyText = 'No data available',
		class: className
	}: Props = $props();

	let containerEl: HTMLDivElement | undefined = $state();
	let containerSize = $state({ width: 0, height: 0 });

	let width = $derived(containerSize.width || 600);
	let height = $derived(containerSize.height || 400);

	function createLinearScale(domain: [number, number], range: [number, number]): LinearScale {
		const [d0, d1] = domain;
		const [r0, r1] = range;

		const scale = (value: number): number => {
			return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0);
		};

		scale.invert = (pixel: number): number => {
			return d0 + ((pixel - r0) / (r1 - r0)) * (d1 - d0);
		};

		scale.domain = domain;
		scale.range = range;

		return scale;
	}

	function createBandScale(
		domain: (string | number)[],
		range: [number, number],
		padding: number = 0.1
	): BandScale {
		const [r0, r1] = range;
		const rangeSize = r1 - r0;
		const step = rangeSize / (domain.length + padding * (domain.length - 1));
		const bandwidth = step * (1 - padding);

		const scale = (value: string | number): number => {
			const index = domain.indexOf(value);
			if (index === -1) return r0;
			return r0 + index * step + (step - bandwidth) / 2;
		};

		scale.bandwidth = () => bandwidth;
		scale.domain = domain;
		scale.range = range;

		return scale;
	}

	function formatNumber(value: number): string {
		if (value === 0) return '0';
		const abs = Math.abs(value);
		if (abs >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
		if (abs >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
		if (abs >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
		if (abs < 1) return value.toFixed(2);
		return value.toFixed(0);
	}

	let innerWidth = $derived(width - margin.left - margin.right);
	let innerHeight = $derived(height - margin.top - margin.bottom);

	let normalizedSeries = $derived.by((): Series[] => {
		if (series.length > 0) {
			return series.map((s, i) => ({
				name: s.name,
				data: s.data,
				color: s.color || colors[i % colors.length]
			}));
		}

		if (data.length > 0) {
			return [
				{
					name: 'Data',
					data: data,
					color: color
				}
			];
		}

		return [];
	});

	let categories = $derived.by((): string[] => {
		if (normalizedSeries.length === 0) return [];
		return [...new Set(normalizedSeries[0].data.map((d) => d.label))];
	});

	let yDomain = $derived.by((): [number, number] => {
		if (normalizedSeries.length === 0) return [0, 1];

		if (stacked) {
			const stackedValues = new Map<string, number>();
			normalizedSeries.forEach((s) => {
				s.data.forEach((d) => {
					stackedValues.set(d.label, (stackedValues.get(d.label) || 0) + d.value);
				});
			});
			const max = Math.max(...stackedValues.values());
			return [0, max * 1.1];
		} else {
			const allValues = normalizedSeries.flatMap((s) => s.data.map((d) => d.value));
			const max = Math.max(...allValues);
			return [0, max * 1.1];
		}
	});

	function createGridLines(): Array<{ x: number; y: number; value: number }> {
		const yScale = createLinearScale(yDomain, [innerHeight, 0]);
		const yTicks = 5;

		return Array.from({ length: yTicks + 1 }, (_, i) => {
			const value = yDomain[0] + (yDomain[1] - yDomain[0]) * (i / yTicks);
			return { x: innerWidth, y: yScale(value), value };
		});
	}

	type StackedDataPoint = DataPoint & {
		y0: number;
		y1: number;
	};

	type StackedSeries = Series & {
		data: StackedDataPoint[];
	};

	let stackedData = $derived.by((): StackedSeries[] => {
		if (!stacked || normalizedSeries.length === 0) return normalizedSeries as StackedSeries[];

		const stackMap = new Map<string, number>();
		categories.forEach((cat) => stackMap.set(cat, 0));

		return normalizedSeries.map((s) => {
			const stackedPoints: StackedDataPoint[] = s.data.map((d) => {
				const baseline = stackMap.get(d.label) || 0;
				stackMap.set(d.label, baseline + d.value);

				return {
					label: d.label,
					value: d.value,
					y0: baseline,
					y1: baseline + d.value
				};
			});

			return { ...s, data: stackedPoints };
		});
	});

	let tooltipData = $state<TooltipData | null>(null);
	let tooltipPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isTooltipActive = $state(false);

	function handleBarHover(
		value: number,
		label: string,
		seriesName: string,
		event: MouseEvent,
		barColor: Color
	): void {
		const target = event.target as SVGRectElement;
		const rect = target.getBoundingClientRect();

		tooltipData = { value, label, seriesName, color: barColor };
		tooltipPosition = {
			x: rect.right + 8,
			y: rect.top + rect.height / 2
		};
		isTooltipActive = true;
	}

	function handleBarLeave(): void {
		isTooltipActive = false;
		setTimeout(() => {
			if (!isTooltipActive) {
				tooltipData = null;
			}
		}, 100);
	}

	onMount(() => {
		const updateSize = () => {
			if (containerEl) {
				const rect = containerEl.getBoundingClientRect();
				containerSize = { width: rect.width, height: rect.height };
			}
		};

		updateSize();
		const resizeObserver = new ResizeObserver(updateSize);
		if (containerEl) {
			resizeObserver.observe(containerEl);
		}

		return () => {
			resizeObserver.disconnect();
		};
	});
</script>

<div bind:this={containerEl} class={cn('bar-chart-container', className)}>
	{#if loading}
		<div class="bar-chart-loading">
			<svg class="bar-chart-loading-spinner" viewBox="0 0 24 24">
				<circle
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
					fill="none"
					opacity="0.25"
				/>
				<path
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
		</div>
	{:else if empty || (data.length === 0 && series.length === 0)}
		<div class="bar-chart-empty">
			<svg class="bar-chart-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
				/>
			</svg>
			<span>{emptyText}</span>
		</div>
	{:else}
		<div class="bar-chart">
			<svg class="bar-chart-svg" {width} {height}>
				<g transform="translate({margin.left}, {margin.top})">
					{#if normalizedSeries.length > 0 && categories.length > 0}
						{@const grid = createGridLines()}
						{@const xScale = createBandScale(categories, [0, innerWidth], barPadding)}
						{@const yScale = createLinearScale(yDomain, [innerHeight, 0])}

						{#if showGrid}
							<g class="bar-chart-grid">
								{#each grid as line}
									<line x1={0} y1={line.y} x2={line.x} y2={line.y} class="bar-chart-grid-line" />
								{/each}
							</g>
						{/if}

						<g class="bar-chart-axis">
							<line
								x1={0}
								y1={innerHeight}
								x2={innerWidth}
								y2={innerHeight}
								class="bar-chart-axis-line"
							/>
							<line x1={0} y1={0} x2={0} y2={innerHeight} class="bar-chart-axis-line" />

							{#each grid as line}
								<text
									x={-10}
									y={line.y}
									class="bar-chart-axis-label"
									text-anchor="end"
									dominant-baseline="middle"
								>
									{formatNumber(line.value)}
								</text>
							{/each}

							{#each categories as category}
								<text
									x={xScale(category) + xScale.bandwidth() / 2}
									y={innerHeight + 20}
									class="bar-chart-axis-label"
									text-anchor="middle"
								>
									{category}
								</text>
							{/each}
						</g>

						{#if grouped && normalizedSeries.length > 1}
							{@const groupScale = createBandScale(
								normalizedSeries.map((_, i) => i),
								[0, xScale.bandwidth()],
								groupPadding
							)}

							{#each normalizedSeries as s, seriesIndex}
								{#each s.data as d}
									{@const categoryX = xScale(d.label)}
									{@const barX = categoryX + groupScale(seriesIndex)}
									{@const barWidth = groupScale.bandwidth()}
									{@const barHeight = innerHeight - yScale(d.value)}
									{@const barY = yScale(d.value)}

									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<rect
										x={barX}
										y={barY}
										width={barWidth}
										height={barHeight}
										rx={barRadius}
										ry={barRadius}
										class="bar-chart-bar is-{s.color}"
										onmouseenter={(e) => handleBarHover(d.value, d.label, s.name, e, s.color!)}
										onmouseleave={handleBarLeave}
									/>

									{#if showValues}
										<text
											x={barX + barWidth / 2}
											y={barY - 5}
											class="bar-chart-axis-label"
											text-anchor="middle"
											font-size="10"
										>
											{d.value}
										</text>
									{/if}
								{/each}
							{/each}
						{:else if stacked && normalizedSeries.length > 1}
							{#each stackedData as s}
								{#each s.data as d}
									{@const barX = xScale(d.label)}
									{@const barWidth = xScale.bandwidth()}
									{@const barY = yScale((d as StackedDataPoint).y1)}
									{@const barHeight =
										yScale((d as StackedDataPoint).y0) - yScale((d as StackedDataPoint).y1)}

									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<rect
										x={barX}
										y={barY}
										width={barWidth}
										height={barHeight}
										rx={barRadius}
										ry={barRadius}
										class="bar-chart-bar is-{s.color}"
										onmouseenter={(e) => handleBarHover(d.value, d.label, s.name, e, s.color!)}
										onmouseleave={handleBarLeave}
									/>
								{/each}
							{/each}
						{:else}
							{#each normalizedSeries[0].data as d}
								{@const barX = xScale(d.label)}
								{@const barWidth = xScale.bandwidth()}
								{@const barHeight = innerHeight - yScale(d.value)}
								{@const barY = yScale(d.value)}

								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<rect
									x={barX}
									y={barY}
									width={barWidth}
									height={barHeight}
									rx={barRadius}
									ry={barRadius}
									class="bar-chart-bar is-{normalizedSeries[0].color}"
									onmouseenter={(e) =>
										handleBarHover(
											d.value,
											d.label,
											normalizedSeries[0].name,
											e,
											normalizedSeries[0].color!
										)}
									onmouseleave={handleBarLeave}
								/>

								{#if showValues}
									<text
										x={barX + barWidth / 2}
										y={barY - 5}
										class="bar-chart-axis-label"
										text-anchor="middle"
										font-size="10"
									>
										{d.value}
									</text>
								{/if}
							{/each}
						{/if}
					{/if}
				</g>
			</svg>
		</div>

		{#if tooltipData && isTooltipActive}
			<div
				class="bar-chart-tooltip"
				style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px;"
			>
				<div class="bar-chart-tooltip-content">
					{#if tooltipData.seriesName !== 'Data'}
						<div class="bar-chart-tooltip-title">{tooltipData.seriesName}</div>
					{/if}
					<div class="bar-chart-tooltip-row">
						<span class="bar-chart-tooltip-label">{tooltipData.label}:</span>
						<span class="bar-chart-tooltip-value">{tooltipData.value}</span>
					</div>
				</div>
			</div>
		{/if}

		{#if showLegend && normalizedSeries.length > 1}
			<div class="bar-chart-legend">
				{#each normalizedSeries as s}
					<div class="bar-chart-legend-item">
						<div class="bar-chart-legend-color is-{s.color}"></div>
						<span>{s.name}</span>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>
