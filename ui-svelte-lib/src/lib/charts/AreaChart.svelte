<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount, untrack, type Snippet } from 'svelte';

	type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';
	type Size = 'sm' | 'md' | 'lg' | 'xl';
	type LegendPosition = 'top' | 'right' | 'bottom' | 'left' | 'none';
	type Palette = 'default' | 'rainbow' | 'ocean' | 'sunset' | 'forest' | 'neon';

	type TooltipData = {
		point: DataPoint;
		seriesName: string;
		color: Color;
		seriesIndex: number;
	};

	type LinearScale = {
		(value: number): number;
		invert: (pixel: number) => number;
		domain: [number, number];
		range: [number, number];
	};

	type DataPoint = {
		x: number;
		y: number;
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
		color?: Color;
		colors?: Color[];
		margin?: Margin;
		hideLine?: boolean;
		showPoints?: boolean;
		hideGrid?: boolean;
		hideLegend?: boolean;
		curve?: 'linear' | 'smooth';
		strokeWidth?: number;
		fillOpacity?: number;
		stacked?: boolean;
		hideGradient?: boolean;
		loading?: boolean;
		empty?: boolean;
		emptyText?: string;
		rootClass?: string;
		chartClass?: string;
		size?: Size;
		palette?: Palette;
		legendPosition?: LegendPosition;
		disableAnimation?: boolean;
		animationDuration?: number;
		valueFormatter?: (value: number) => string;
		xFormatter?: (value: number) => string;
		onClick?: (point: DataPoint, series: Series, index: number) => void;
		onHover?: (point: DataPoint | null, series: Series | null, index: number) => void;
		hideXAxis?: boolean;
		hideYAxis?: boolean;
		showGlow?: boolean;
		tooltipContent?: Snippet<[{ point: DataPoint; series: Series; color: Color }]>;
	};

	let {
		data = [],
		series = [],
		color = 'primary' as Color,
		colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'muted'] as Color[],
		margin = { top: 20, right: 20, bottom: 40, left: 50 },
		hideLine = false,
		showPoints = false,
		hideGrid = false,
		hideLegend = false,
		curve = 'linear' as 'linear' | 'smooth',
		strokeWidth = 2,
		fillOpacity = 0.3,
		stacked = false,
		hideGradient = false,
		loading = false,
		empty = false,
		emptyText = 'No data available',
		rootClass,
		chartClass,
		size = 'md',
		palette,
		legendPosition = 'bottom',
		disableAnimation = false,
		animationDuration = 800,
		valueFormatter,
		xFormatter,
		onClick,
		onHover,
		hideXAxis = false,
		hideYAxis = false,
		showGlow = false,
		tooltipContent
	}: Props = $props();

	const sizePresets: Record<Size, { height: number; pointRadius: number; fontSize: number }> = {
		sm: { height: 200, pointRadius: 2, fontSize: 10 },
		md: { height: 300, pointRadius: 3, fontSize: 12 },
		lg: { height: 400, pointRadius: 4, fontSize: 14 },
		xl: { height: 500, pointRadius: 5, fontSize: 16 }
	};

	const colorPalettes: Record<Palette, Color[]> = {
		default: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'muted'],
		rainbow: ['danger', 'warning', 'success', 'info', 'primary', 'secondary', 'muted'],
		ocean: ['info', 'primary', 'secondary', 'success', 'muted', 'warning', 'danger'],
		sunset: ['warning', 'danger', 'secondary', 'primary', 'info', 'success', 'muted'],
		forest: ['success', 'primary', 'info', 'secondary', 'muted', 'warning', 'danger'],
		neon: ['secondary', 'primary', 'success', 'warning', 'danger', 'info', 'muted']
	};

	const colorClass: Record<Color, string> = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger',
		muted: 'is-muted'
	};

	function getSeriesColor(seriesItem: Series, index: number): Color {
		if (seriesItem.color) return seriesItem.color;
		if (palette) {
			const paletteColors = colorPalettes[palette];
			return paletteColors[index % paletteColors.length];
		}
		return colors[index % colors.length];
	}

	let containerEl: HTMLDivElement | undefined = $state();
	let containerSize = $state({ width: 0, height: 0 });
	let animationProgress = $state(0);
	let animationFrameId: number | null = null;

	let sizeConfig = $derived(sizePresets[size]);
	let width = $derived(containerSize.width || 600);
	let height = $derived(containerSize.height || sizeConfig.height);

	let innerWidth = $derived(width - margin.left - margin.right);
	let innerHeight = $derived(height - margin.top - margin.bottom);

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
		if (valueFormatter) return valueFormatter(value);
		if (value === 0) return '0';
		const abs = Math.abs(value);
		if (abs >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
		if (abs >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
		if (abs >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
		if (abs < 1) return value.toFixed(2);
		return value.toFixed(0);
	}

	function formatX(value: number): string {
		if (xFormatter) return xFormatter(value);
		return formatNumber(value);
	}

	let normalizedSeries = $derived.by((): Series[] => {
		if (series.length > 0) {
			return series.map((s, i) => ({
				name: s.name,
				data: s.data,
				color: getSeriesColor(s, i)
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

		const xScale = createLinearScale(xDomain, [0, innerWidth]);
		const yScale = createLinearScale(yDomain, [innerHeight, 0]);

		const animatedPoints = points.map((p) => ({
			x: p.x,
			y: p.y * animationProgress
		}));

		let path = `M ${xScale(animatedPoints[0].x)} ${baselineY}`;
		path += ` L ${xScale(animatedPoints[0].x)} ${yScale(animatedPoints[0].y)}`;

		if (smooth && animatedPoints.length > 1) {
			for (let i = 1; i < animatedPoints.length; i++) {
				const x0 = xScale(animatedPoints[i - 1].x);
				const y0 = yScale(animatedPoints[i - 1].y);
				const x1 = xScale(animatedPoints[i].x);
				const y1 = yScale(animatedPoints[i].y);
				const cpx = (x0 + x1) / 2;
				path += ` C ${cpx} ${y0}, ${cpx} ${y1}, ${x1} ${y1}`;
			}
		} else {
			for (let i = 1; i < animatedPoints.length; i++) {
				path += ` L ${xScale(animatedPoints[i].x)} ${yScale(animatedPoints[i].y)}`;
			}
		}

		path += ` L ${xScale(animatedPoints[animatedPoints.length - 1].x)} ${baselineY}`;
		path += ' Z';

		return path;
	}

	function createLinePath(points: DataPoint[], smooth: boolean = false): string {
		if (points.length === 0) return '';

		const xScale = createLinearScale(xDomain, [0, innerWidth]);
		const yScale = createLinearScale(yDomain, [innerHeight, 0]);

		const animatedPoints = points.map((p) => ({
			x: p.x,
			y: p.y * animationProgress
		}));

		let path = `M ${xScale(animatedPoints[0].x)} ${yScale(animatedPoints[0].y)}`;

		if (smooth && animatedPoints.length > 1) {
			for (let i = 1; i < animatedPoints.length; i++) {
				const x0 = xScale(animatedPoints[i - 1].x);
				const y0 = yScale(animatedPoints[i - 1].y);
				const x1 = xScale(animatedPoints[i].x);
				const y1 = yScale(animatedPoints[i].y);
				const cpx = (x0 + x1) / 2;
				path += ` C ${cpx} ${y0}, ${cpx} ${y1}, ${x1} ${y1}`;
			}
		} else {
			for (let i = 1; i < animatedPoints.length; i++) {
				path += ` L ${xScale(animatedPoints[i].x)} ${yScale(animatedPoints[i].y)}`;
			}
		}

		return path;
	}

	function createGridLines(): Array<{ x: number; y: number; value: number }> {
		const yScale = createLinearScale(yDomain, [innerHeight, 0]);
		const yTicks = 5;

		return Array.from({ length: yTicks + 1 }, (_, i) => {
			const value = yDomain[0] + (yDomain[1] - yDomain[0]) * (i / yTicks);
			return { x: innerWidth, y: yScale(value), value };
		});
	}

	function createXAxisTicks(): Array<{ x: number; value: number }> {
		const xScale = createLinearScale(xDomain, [0, innerWidth]);
		const xTicks = Math.min(6, Math.max(2, Math.floor(innerWidth / 80)));

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
	let hoveredSeriesIndex = $state<number | null>(null);

	function handlePointHover(
		point: DataPoint,
		seriesItem: Series,
		seriesIndex: number,
		event: MouseEvent
	): void {
		const target = event.target as SVGCircleElement;
		const rect = target.getBoundingClientRect();

		tooltipData = {
			point,
			seriesName: seriesItem.name,
			color: seriesItem.color as Color,
			seriesIndex
		};
		tooltipPosition = {
			x: rect.left + rect.width / 2,
			y: rect.top - 10
		};
		isTooltipActive = true;
		hoveredSeriesIndex = seriesIndex;

		if (onHover) {
			onHover(point, seriesItem, seriesIndex);
		}
	}

	function handlePointLeave(): void {
		isTooltipActive = false;
		hoveredSeriesIndex = null;

		if (onHover) {
			onHover(null, null, -1);
		}

		setTimeout(() => {
			if (!isTooltipActive) {
				tooltipData = null;
			}
		}, 100);
	}

	function handlePointClick(point: DataPoint, seriesItem: Series, index: number): void {
		if (onClick) {
			onClick(point, seriesItem, index);
		}
	}

	let containerLayoutClass = $derived(() => {
		switch (legendPosition) {
			case 'top':
				return 'flex-col-reverse';
			case 'bottom':
				return 'flex-col';
			case 'left':
				return 'flex-row-reverse';
			case 'right':
			default:
				return 'flex-row';
		}
	});

	let legendLayoutClass = $derived(() => {
		switch (legendPosition) {
			case 'top':
			case 'bottom':
				return 'flex-row flex-wrap';
			default:
				return 'flex-col';
		}
	});

	onMount(() => {
		const updateSize = () => {
			if (containerEl) {
				const rect = containerEl.getBoundingClientRect();
				containerSize = { width: rect.width, height: rect.height };
			}
		};

		const handleScroll = () => {
			if (isTooltipActive) {
				isTooltipActive = false;
				hoveredSeriesIndex = null;
				tooltipData = null;
			}
		};

		updateSize();
		const resizeObserver = new ResizeObserver(updateSize);
		if (containerEl) {
			resizeObserver.observe(containerEl);
		}

		window.addEventListener('scroll', handleScroll, true);

		return () => {
			if (animationFrameId !== null) {
				cancelAnimationFrame(animationFrameId);
			}
			resizeObserver.disconnect();
			window.removeEventListener('scroll', handleScroll, true);
		};
	});

	$effect(() => {
		const _ = normalizedSeries;

		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		if (!disableAnimation) {
			const startTime = Date.now();
			const startProgress = untrack(() => animationProgress);

			const animate = () => {
				const now = Date.now();
				const progress = Math.min((now - startTime) / animationDuration, 1);
				const easeProgress = 1 - Math.pow(1 - progress, 3);

				animationProgress = startProgress + (1 - startProgress) * easeProgress;

				if (progress < 1) {
					animationFrameId = requestAnimationFrame(animate);
				} else {
					animationFrameId = null;
				}
			};

			animationFrameId = requestAnimationFrame(animate);
		} else {
			animationProgress = 1;
		}
	});
</script>

<div class={cn('area-chart-container', `is-${size}`, containerLayoutClass(), rootClass)}>
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
		<div bind:this={containerEl} class={cn('area-chart', `is-${size}`, chartClass)}>
			<svg class="area-chart-svg" {width} {height}>
				<defs>
					{#each normalizedSeries as s, i}
						{#if !hideGradient}
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

					{#if showGlow}
						{#each normalizedSeries as s, i}
							<filter id="area-glow-{i}" x="-50%" y="-50%" width="200%" height="200%">
								<feGaussianBlur stdDeviation="3" result="coloredBlur" />
								<feMerge>
									<feMergeNode in="coloredBlur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
						{/each}
					{/if}
				</defs>

				<g transform="translate({margin.left}, {margin.top})">
					{#if normalizedSeries.length > 0}
						{@const grid = createGridLines()}
						{@const xTicks = createXAxisTicks()}
						{@const xScale = createLinearScale(xDomain, [0, innerWidth])}
						{@const yScale = createLinearScale(yDomain, [innerHeight, 0])}

						{#if !hideGrid}
							<g class="area-chart-grid">
								{#each grid as line}
									<line x1={0} y1={line.y} x2={line.x} y2={line.y} class="area-chart-grid-line" />
								{/each}
							</g>
						{/if}

						<g class="area-chart-axis">
							{#if !hideXAxis}
								<line
									x1={0}
									y1={innerHeight}
									x2={innerWidth}
									y2={innerHeight}
									class="area-chart-axis-line"
								/>
								{#each xTicks as tick}
									<text
										x={tick.x}
										y={innerHeight + 20}
										class="area-chart-axis-label"
										text-anchor="middle"
										style="font-size: {sizeConfig.fontSize}px;"
									>
										{formatX(tick.value)}
									</text>
								{/each}
							{/if}

							{#if !hideYAxis}
								<line x1={0} y1={0} x2={0} y2={innerHeight} class="area-chart-axis-line" />
								{#each grid as line}
									<text
										x={-10}
										y={line.y}
										class="area-chart-axis-label"
										text-anchor="end"
										dominant-baseline="middle"
										style="font-size: {sizeConfig.fontSize}px;"
									>
										{formatNumber(line.value)}
									</text>
								{/each}
							{/if}
						</g>

						{#each stacked ? stackedData : normalizedSeries as s, i}
							{@const baselineY =
								stacked && s.data[0]?.y !== undefined
									? yScale((s.data[0] as StackedDataPoint).y0)
									: innerHeight}
							{@const isHovered = hoveredSeriesIndex === i}

							<path
								d={createAreaPath(s.data, baselineY, curve === 'smooth')}
								fill={!hideGradient ? `url(#area-gradient-${i})` : undefined}
								class={cn(
									'area-chart-area',
									colorClass[s.color!],
									isHovered && 'is-hovered',
									showGlow && 'has-glow'
								)}
								style={hideGradient ? `opacity: ${fillOpacity}` : ''}
								filter={showGlow ? `url(#area-glow-${i})` : undefined}
							/>

							{#if !hideLine}
								<path
									d={createLinePath(s.data, curve === 'smooth')}
									class={cn(
										'area-chart-line',
										colorClass[s.color!],
										isHovered && 'is-hovered',
										showGlow && 'has-glow'
									)}
									style="stroke-width: {strokeWidth};"
									filter={showGlow ? `url(#area-glow-${i})` : undefined}
								/>
							{/if}

							{#if showPoints}
								{#each s.data as point, pointIndex}
									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<!-- svelte-ignore a11y_click_events_have_key_events -->
									<circle
										cx={xScale(point.x)}
										cy={yScale(point.y * animationProgress)}
										r={sizeConfig.pointRadius}
										class={cn('area-chart-point', colorClass[s.color!], showGlow && 'has-glow')}
										onmouseenter={(e) => handlePointHover(point, s, i, e)}
										onmouseleave={handlePointLeave}
										onclick={() => handlePointClick(point, s, pointIndex)}
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
				style="left: {tooltipPosition.x}px; top: {tooltipPosition.y}px;"
			>
				{#if tooltipContent}
					{@render tooltipContent({
						point: tooltipData.point,
						series: normalizedSeries[tooltipData.seriesIndex],
						color: tooltipData.color
					})}
				{:else}
					<div class="area-chart-tooltip-content">
						{#if tooltipData.seriesName !== 'Data'}
							<div class="area-chart-tooltip-title">{tooltipData.seriesName}</div>
						{/if}
						<div class="area-chart-tooltip-row">
							<div class="area-chart-tooltip-color {colorClass[tooltipData.color]}"></div>
							<span class="area-chart-tooltip-value">
								{formatX(tooltipData.point.x)}: {formatNumber(tooltipData.point.y)}
							</span>
						</div>
					</div>
				{/if}
			</div>
		{/if}

		{#if !hideLegend && normalizedSeries.length > 1 && legendPosition !== 'none'}
			<div class={cn('area-chart-legend', legendLayoutClass())}>
				{#each normalizedSeries as s, i}
					{@const isHovered = hoveredSeriesIndex === i}
					<div
						class={cn('area-chart-legend-item', isHovered && 'is-selected')}
						onmouseenter={() => (hoveredSeriesIndex = i)}
						onmouseleave={() => (hoveredSeriesIndex = null)}
						role="button"
						tabindex="0"
						onkeydown={(e) => e.key === 'Enter' && (hoveredSeriesIndex = i)}
					>
						<div class={cn('area-chart-legend-color', colorClass[s.color!])}></div>
						<span>{s.name}</span>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>
