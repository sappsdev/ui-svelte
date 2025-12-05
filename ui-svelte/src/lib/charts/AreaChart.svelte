<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';

	type TooltipData = {
		point: DataPoint;
		seriesName: string;
		color: Color;
	};

	type LinearScale = {
		(value: number): number;
		invert: (pixel: number) => number;
		domain: [number, number];
		range: [number, number];
	};

	type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';

	type DataPoint = {
		x: number;
		y: number;
	};

	type Series = {
		name: string;
		data: DataPoint[];
		color?: Color;
	};

	type Props = {
		data?: DataPoint[];
		series?: Series[];
		color?: Color;
		colors?: Color[];
		showLine?: boolean;
		showPoints?: boolean;
		showGrid?: boolean;
		showLegend?: boolean;
		curve?: 'linear' | 'smooth';
		strokeWidth?: number;
		fillOpacity?: number;
		stacked?: boolean;
		gradient?: boolean;
		loading?: boolean;
		empty?: boolean;
		emptyText?: string;
		class?: string;
	};

	let {
		data = [],
		series = [],
		color = 'primary' as Color,
		colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'muted'] as Color[],
		showLine = true,
		showPoints = false,
		showGrid = true,
		showLegend = false,
		curve = 'linear' as 'linear' | 'smooth',
		strokeWidth = 2,
		fillOpacity = 0.3,
		stacked = false,
		gradient = true,
		loading = false,
		empty = false,
		emptyText = 'No data available',
		class: className
	}: Props = $props();

	let containerEl: HTMLDivElement | undefined = $state();
	let containerSize = $state({ width: 0, height: 0 });

	let width = $derived(containerSize.width);
	let height = $derived(containerSize.height);

	const colorClass = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger',
		muted: 'is-muted'
	};

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

	function formatNumber(value: number): string {
		if (value === 0) return '0';
		const abs = Math.abs(value);
		if (abs >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
		if (abs >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
		if (abs >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
		if (abs < 1) return value.toFixed(2);
		return value.toFixed(0);
	}

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

	let xDomain = $derived.by((): [number, number] => {
		if (normalizedSeries.length === 0) return [0, 1];
		const allValues = normalizedSeries.flatMap((s) => s.data);
		return [Math.min(...allValues.map((d) => d.x)), Math.max(...allValues.map((d) => d.x))];
	});

	let yDomain = $derived.by((): [number, number] => {
		if (normalizedSeries.length === 0) return [0, 1];

		if (stacked) {
			const xPoints = new Map<number, number>();
			normalizedSeries.forEach((s) => {
				s.data.forEach((d) => {
					xPoints.set(d.x, (xPoints.get(d.x) || 0) + d.y);
				});
			});
			const maxSum = Math.max(...xPoints.values());
			return [0, maxSum * 1.1];
		} else {
			const allValues = normalizedSeries.flatMap((s) => s.data);
			const values = allValues.map((d) => d.y);
			const max = Math.max(...values);
			return [0, max * 1.1];
		}
	});

	function createAreaPath(points: DataPoint[], baselineY: number, smooth: boolean = false): string {
		if (points.length === 0) return '';

		const xScale = createLinearScale(xDomain, [0, width]);
		const yScale = createLinearScale(yDomain, [height, 0]);

		let path = `M ${xScale(points[0].x)} ${baselineY}`;
		path += ` L ${xScale(points[0].x)} ${yScale(points[0].y)}`;

		if (smooth && points.length > 1) {
			for (let i = 1; i < points.length; i++) {
				const x0 = xScale(points[i - 1].x);
				const y0 = yScale(points[i - 1].y);
				const x1 = xScale(points[i].x);
				const y1 = yScale(points[i].y);
				const cpx = (x0 + x1) / 2;
				path += ` C ${cpx} ${y0}, ${cpx} ${y1}, ${x1} ${y1}`;
			}
		} else {
			for (let i = 1; i < points.length; i++) {
				path += ` L ${xScale(points[i].x)} ${yScale(points[i].y)}`;
			}
		}

		path += ` L ${xScale(points[points.length - 1].x)} ${baselineY}`;
		path += ' Z';

		return path;
	}

	function createLinePath(points: DataPoint[], smooth: boolean = false): string {
		if (points.length === 0) return '';

		const xScale = createLinearScale(xDomain, [0, width]);
		const yScale = createLinearScale(yDomain, [height, 0]);

		let path = `M ${xScale(points[0].x)} ${yScale(points[0].y)}`;

		if (smooth && points.length > 1) {
			for (let i = 1; i < points.length; i++) {
				const x0 = xScale(points[i - 1].x);
				const y0 = yScale(points[i - 1].y);
				const x1 = xScale(points[i].x);
				const y1 = yScale(points[i].y);
				const cpx = (x0 + x1) / 2;
				path += ` C ${cpx} ${y0}, ${cpx} ${y1}, ${x1} ${y1}`;
			}
		} else {
			for (let i = 1; i < points.length; i++) {
				path += ` L ${xScale(points[i].x)} ${yScale(points[i].y)}`;
			}
		}

		return path;
	}

	function createGridLines(): Array<{ x: number; y: number; value: number }> {
		const yScale = createLinearScale(yDomain, [height, 0]);
		const yTicks = 5;

		return Array.from({ length: yTicks + 1 }, (_, i) => {
			const value = yDomain[0] + (yDomain[1] - yDomain[0]) * (i / yTicks);
			return { x: width, y: yScale(value), value };
		});
	}

	// NUEVA FUNCIÓN: Crear ticks para el eje X
	function createXAxisTicks(): Array<{ x: number; value: number }> {
		const xScale = createLinearScale(xDomain, [0, width]);
		const xTicks = 5;

		return Array.from({ length: xTicks + 1 }, (_, i) => {
			const value = xDomain[0] + (xDomain[1] - xDomain[0]) * (i / xTicks);
			return { x: xScale(value), value };
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

		const xMap = new Map<number, number>();
		const allXValues = [...new Set(normalizedSeries.flatMap((s) => s.data.map((d) => d.x)))].sort(
			(a, b) => a - b
		);
		allXValues.forEach((x) => xMap.set(x, 0));

		return normalizedSeries.map((s) => {
			const stackedPoints: StackedDataPoint[] = s.data.map((d) => {
				const baseline = xMap.get(d.x) || 0;
				xMap.set(d.x, baseline + d.y);
				return {
					x: d.x,
					y: baseline + d.y,
					y0: baseline,
					y1: baseline + d.y
				};
			});

			return { ...s, data: stackedPoints };
		});
	});

	let tooltipData = $state<TooltipData | null>(null);
	let tooltipPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isTooltipActive = $state(false);

	function handlePointHover(
		point: DataPoint,
		seriesName: string,
		event: MouseEvent,
		pointColor: Color
	): void {
		const target = event.target as SVGCircleElement;
		const rect = target.getBoundingClientRect();

		tooltipData = { point, seriesName, color: pointColor };
		tooltipPosition = {
			x: rect.right + 8,
			y: rect.top + rect.height / 2
		};
		isTooltipActive = true;
	}

	function handlePointLeave(): void {
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

<div class={cn('area-chart-container', className)}>
	{#if loading}
		<div class="area-chart-loading">
			<svg class="area-chart-loading-spinner" viewBox="0 0 24 24">
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
		<div class="area-chart-empty">
			<svg class="area-chart-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
				/>
			</svg>
			<span>{emptyText}</span>
		</div>
	{:else}
		<div bind:this={containerEl} class="area-chart">
			<svg class="area-chart-svg">
				<defs>
					{#each normalizedSeries as s, i}
						{#if gradient}
							<linearGradient id="area-gradient-{i}" x1="0%" y1="0%" x2="0%" y2="100%">
								<stop
									offset="0%"
									class={cn('area-chart-gradient-start', colorClass[s.color!])}
									style="stop-opacity: {fillOpacity}"
								/>
								<stop
									offset="100%"
									class={cn('area-chart-gradient-end', colorClass[s.color!])}
									style="stop-opacity: 0.05"
								/>
							</linearGradient>
						{/if}
					{/each}
				</defs>

				<g>
					{#if normalizedSeries.length > 0}
						{@const grid = createGridLines()}
						{@const xTicks = createXAxisTicks()}
						{@const xScale = createLinearScale(xDomain, [0, width])}
						{@const yScale = createLinearScale(yDomain, [height, 0])}

						{#if showGrid}
							<g class="area-chart-grid">
								{#each grid as line}
									<line x1={0} y1={line.y} x2={line.x} y2={line.y} class="area-chart-grid-line" />
								{/each}
							</g>
						{/if}

						<g class="area-chart-axis">
							<line x1={0} y1={height} x2={width} y2={height} class="area-chart-axis-line" />
							<line x1={0} y1={0} x2={0} y2={height} class="area-chart-axis-line" />

							<!-- Etiquetas del eje Y -->
							{#each grid as line}
								<text
									x={-10}
									y={line.y}
									class="area-chart-axis-label"
									text-anchor="end"
									dominant-baseline="middle"
								>
									{formatNumber(line.value)}
								</text>
							{/each}

							<!-- NUEVO: Etiquetas del eje X -->
							{#each xTicks as tick}
								<text
									x={tick.x}
									y={height + 15}
									class="area-chart-axis-label"
									text-anchor="middle"
									dominant-baseline="hanging"
								>
									{formatNumber(tick.value)}
								</text>
							{/each}
						</g>

						{#each stacked ? stackedData : normalizedSeries as s, i}
							{@const baselineY =
								stacked && s.data[0]?.y !== undefined
									? yScale((s.data[0] as StackedDataPoint).y0)
									: height}

							<path
								d={createAreaPath(s.data, baselineY, curve === 'smooth')}
								fill={gradient ? `url(#area-gradient-${i})` : undefined}
								class="area-chart-area is-{s.color}"
								style={!gradient ? `opacity: ${fillOpacity}` : ''}
							/>

							{#if showLine}
								<path
									d={createLinePath(s.data, curve === 'smooth')}
									class="area-chart-line is-{s.color}"
									style="stroke-width: {strokeWidth};"
								/>
							{/if}

							{#if showPoints}
								{#each s.data as point}
									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<circle
										cx={xScale(point.x)}
										cy={yScale(point.y)}
										r={3}
										class="area-chart-point is-{s.color}"
										onmouseenter={(e) => handlePointHover(point, s.name, e, s.color!)}
										onmouseleave={handlePointLeave}
									/>
								{/each}
							{/if}
						{/each}
					{/if}
				</g>
			</svg>
		</div>

		{#if tooltipData && isTooltipActive}
			<div
				class="area-chart-tooltip"
				style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px;"
			>
				<div class="area-chart-tooltip-content">
					{#if tooltipData.seriesName !== 'Data'}
						<div class="area-chart-tooltip-title">{tooltipData.seriesName}</div>
					{/if}
					<div class="area-chart-tooltip-row">
						<span class="area-chart-tooltip-label">x:</span>
						<span class="area-chart-tooltip-value">{tooltipData.point.x}</span>
					</div>
					<div class="area-chart-tooltip-row">
						<span class="area-chart-tooltip-label">y:</span>
						<span class="area-chart-tooltip-value">{tooltipData.point.y}</span>
					</div>
				</div>
			</div>
		{/if}

		{#if showLegend && normalizedSeries.length > 1}
			<div class="area-chart-legend">
				{#each normalizedSeries as s}
					<div class="area-chart-legend-item">
						<div class="area-chart-legend-color is-{s.color}"></div>
						<span>{s.name}</span>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>
