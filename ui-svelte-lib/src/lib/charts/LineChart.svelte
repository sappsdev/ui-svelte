<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount, untrack, type Snippet } from 'svelte';

	type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';
	type Size = 'sm' | 'md' | 'lg' | 'xl';
	type LegendPosition = 'top' | 'right' | 'bottom' | 'left' | 'none';
	type Palette = 'default' | 'rainbow' | 'ocean' | 'sunset' | 'forest' | 'neon';

	type TooltipData = {
		x: number;
		y: number;
		seriesName: string;
		color: Color;
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
		margin?: Margin;
		color?: Color;
		colors?: Color[];
		hidePoints?: boolean;
		hideGrid?: boolean;
		hideLegend?: boolean;
		hideXAxis?: boolean;
		hideYAxis?: boolean;
		curve?: 'linear' | 'smooth';
		strokeWidth?: number;
		pointRadius?: number;
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
		onClick?: (point: DataPoint, seriesName: string, index: number) => void;
		onHover?: (point: DataPoint | null, seriesName: string, index: number) => void;
		tooltipContent?: Snippet<[{ point: DataPoint; seriesName: string; color: Color }]>;
		showGradientFill?: boolean;
		showGlow?: boolean;
	};

	let {
		data = [],
		series = [],
		margin = { top: 20, right: 20, bottom: 40, left: 50 },
		color = 'primary' as Color,
		colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'] as Color[],
		hidePoints = false,
		hideGrid = false,
		hideLegend = false,
		hideXAxis = false,
		hideYAxis = false,
		curve = 'linear' as 'linear' | 'smooth',
		strokeWidth = 2,
		pointRadius = 3,
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
		tooltipContent,
		showGradientFill = false,
		showGlow = false
	}: Props = $props();

	const sizePresets: Record<
		Size,
		{ height: number; strokeWidth: number; pointRadius: number; fontSize: number }
	> = {
		sm: { height: 200, strokeWidth: 1.5, pointRadius: 2, fontSize: 10 },
		md: { height: 300, strokeWidth: 2, pointRadius: 3, fontSize: 12 },
		lg: { height: 400, strokeWidth: 2.5, pointRadius: 4, fontSize: 14 },
		xl: { height: 500, strokeWidth: 3, pointRadius: 5, fontSize: 16 }
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

	function getSeriesColor(s: Series, index: number): Color {
		if (s.color) return s.color;
		if (palette) {
			const paletteColors = colorPalettes[palette];
			return paletteColors[index % paletteColors.length];
		}
		return colors[index % colors.length];
	}

	function formatValue(value: number): string {
		if (valueFormatter) return valueFormatter(value);
		if (value === 0) return '0';
		const abs = Math.abs(value);
		if (abs >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
		if (abs >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
		if (abs >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
		if (abs < 1) return value.toFixed(2);
		return value.toFixed(0);
	}

	function formatXValue(value: number): string {
		if (xFormatter) return xFormatter(value);
		return formatValue(value);
	}

	let containerEl: HTMLDivElement | undefined = $state();
	let containerSize = $state({ width: 0, height: 0 });

	let sizeConfig = $derived(sizePresets[size]);
	let effectiveStrokeWidth = $derived(strokeWidth || sizeConfig.strokeWidth);
	let effectivePointRadius = $derived(pointRadius || sizeConfig.pointRadius);

	let width = $derived(containerSize.width || 600);
	let height = $derived(containerSize.height || sizeConfig.height);

	let animationProgress = $state(0);
	let animationFrameId: number | null = null;

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

	let innerWidth = $derived(width - margin.left - margin.right);
	let innerHeight = $derived(height - margin.top - margin.bottom);

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
		const allValues = normalizedSeries.flatMap((s) => s.data);
		const values = allValues.map((d) => d.y);
		const min = Math.min(...values);
		const max = Math.max(...values);
		const padding = (max - min) * 0.1;
		return [min - padding, max + padding];
	});

	function createPath(points: DataPoint[], smooth: boolean = false, progress: number = 1): string {
		if (points.length === 0) return '';

		const xScale = createLinearScale(xDomain, [0, innerWidth]);
		const yScale = createLinearScale(yDomain, [innerHeight, 0]);

		const visiblePoints = Math.ceil(points.length * progress);
		const displayPoints = points.slice(0, visiblePoints);

		if (displayPoints.length === 0) return '';

		let path = `M ${xScale(displayPoints[0].x)} ${yScale(displayPoints[0].y)}`;

		if (smooth && displayPoints.length > 1) {
			for (let i = 1; i < displayPoints.length; i++) {
				const x0 = xScale(displayPoints[i - 1].x);
				const y0 = yScale(displayPoints[i - 1].y);
				const x1 = xScale(displayPoints[i].x);
				const y1 = yScale(displayPoints[i].y);
				const cpx = (x0 + x1) / 2;
				path += ` C ${cpx} ${y0}, ${cpx} ${y1}, ${x1} ${y1}`;
			}
		} else {
			for (let i = 1; i < displayPoints.length; i++) {
				path += ` L ${xScale(displayPoints[i].x)} ${yScale(displayPoints[i].y)}`;
			}
		}

		return path;
	}

	function createAreaPath(
		points: DataPoint[],
		smooth: boolean = false,
		progress: number = 1
	): string {
		if (points.length === 0) return '';

		const xScale = createLinearScale(xDomain, [0, innerWidth]);
		const yScale = createLinearScale(yDomain, [innerHeight, 0]);

		const visiblePoints = Math.ceil(points.length * progress);
		const displayPoints = points.slice(0, visiblePoints);

		if (displayPoints.length === 0) return '';

		let path = `M ${xScale(displayPoints[0].x)} ${innerHeight}`;
		path += ` L ${xScale(displayPoints[0].x)} ${yScale(displayPoints[0].y)}`;

		if (smooth && displayPoints.length > 1) {
			for (let i = 1; i < displayPoints.length; i++) {
				const x0 = xScale(displayPoints[i - 1].x);
				const y0 = yScale(displayPoints[i - 1].y);
				const x1 = xScale(displayPoints[i].x);
				const y1 = yScale(displayPoints[i].y);
				const cpx = (x0 + x1) / 2;
				path += ` C ${cpx} ${y0}, ${cpx} ${y1}, ${x1} ${y1}`;
			}
		} else {
			for (let i = 1; i < displayPoints.length; i++) {
				path += ` L ${xScale(displayPoints[i].x)} ${yScale(displayPoints[i].y)}`;
			}
		}

		path += ` L ${xScale(displayPoints[displayPoints.length - 1].x)} ${innerHeight}`;
		path += ` Z`;

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

	let gradientIds = $derived(
		normalizedSeries.map((_, i) => `line-gradient-${i}-${Math.random().toString(36).slice(2, 9)}`)
	);

	let tooltipData = $state<TooltipData | null>(null);
	let tooltipPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isTooltipActive = $state(false);
	let hoveredSeriesIndex = $state<number | null>(null);
	let hoveredPointIndex = $state<number | null>(null);

	function handlePointHover(
		point: DataPoint,
		seriesName: string,
		event: MouseEvent,
		pointColor: Color,
		seriesIndex: number,
		pointIndex: number
	): void {
		const target = event.target as SVGCircleElement;
		const rect = target.getBoundingClientRect();

		tooltipData = { x: point.x, y: point.y, seriesName, color: pointColor };
		tooltipPosition = {
			x: rect.left + rect.width / 2,
			y: rect.top - 10
		};
		isTooltipActive = true;
		hoveredSeriesIndex = seriesIndex;
		hoveredPointIndex = pointIndex;

		if (onHover) {
			onHover(point, seriesName, pointIndex);
		}
	}

	function handlePointLeave(): void {
		isTooltipActive = false;
		hoveredSeriesIndex = null;
		hoveredPointIndex = null;

		if (onHover) {
			onHover(null, '', -1);
		}

		setTimeout(() => {
			if (!isTooltipActive) {
				tooltipData = null;
			}
		}, 100);
	}

	function handlePointClick(point: DataPoint, seriesName: string, index: number): void {
		if (onClick) {
			onClick(point, seriesName, index);
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
				hoveredPointIndex = null;
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
		if (normalizedSeries.length === 0) return;

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

<div class={cn('line-chart-container', `is-${size}`, containerLayoutClass(), rootClass)}>
	{#if loading}
		<div class="line-chart-loading">
			<svg class="line-chart-loading-spinner" viewBox="0 0 24 24">
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
		<div class="line-chart-empty">
			<svg class="line-chart-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
		<div bind:this={containerEl} class={cn('line-chart', `is-${size}`, chartClass)}>
			<svg class="line-chart-svg" {width} {height}>
				{#if showGradientFill}
					<defs>
						{#each normalizedSeries as s, i}
							{@const seriesColor = getSeriesColor(s, i)}
							<linearGradient id={gradientIds[i]} x1="0%" y1="0%" x2="0%" y2="100%">
								<stop offset="0%" style="stop-color:var(--color-{seriesColor}); stop-opacity:0.3" />
								<stop offset="100%" style="stop-color:var(--color-{seriesColor}); stop-opacity:0" />
							</linearGradient>
						{/each}
					</defs>
				{/if}

				<g transform="translate({margin.left}, {margin.top})">
					{#if normalizedSeries.length > 0}
						{@const grid = createGridLines()}
						{@const xTicks = createXAxisTicks()}
						{@const xScale = createLinearScale(xDomain, [0, innerWidth])}
						{@const yScale = createLinearScale(yDomain, [innerHeight, 0])}

						{#if !hideGrid}
							<g class="line-chart-grid">
								{#each grid as line}
									<line x1={0} y1={line.y} x2={line.x} y2={line.y} class="line-chart-grid-line" />
								{/each}
							</g>
						{/if}

						<g class="line-chart-axis">
							{#if !hideXAxis}
								<line
									x1={0}
									y1={innerHeight}
									x2={innerWidth}
									y2={innerHeight}
									class="line-chart-axis-line"
								/>
								{#each xTicks as tick}
									<text
										x={tick.x}
										y={innerHeight + 20}
										class="line-chart-axis-label"
										text-anchor="middle"
										style="font-size: {sizeConfig.fontSize}px;"
									>
										{formatXValue(tick.value)}
									</text>
								{/each}
							{/if}

							{#if !hideYAxis}
								<line x1={0} y1={0} x2={0} y2={innerHeight} class="line-chart-axis-line" />
								{#each grid as line}
									<text
										x={-10}
										y={line.y}
										class="line-chart-axis-label"
										text-anchor="end"
										dominant-baseline="middle"
										style="font-size: {sizeConfig.fontSize}px;"
									>
										{formatValue(line.value)}
									</text>
								{/each}
							{/if}
						</g>

						{#each normalizedSeries as s, i}
							{@const seriesColor = getSeriesColor(s, i)}
							{@const isHovered = hoveredSeriesIndex === i}

							{#if showGradientFill}
								<path
									d={createAreaPath(s.data, curve === 'smooth', animationProgress)}
									class="line-chart-area"
									fill="url(#{gradientIds[i]})"
								/>
							{/if}

							<path
								d={createPath(s.data, curve === 'smooth', animationProgress)}
								class={cn(
									'line-chart-line',
									colorClass[seriesColor],
									showGlow && 'has-glow',
									isHovered && 'is-hovered'
								)}
								style="stroke-width: {effectiveStrokeWidth};"
							/>

							{#if !hidePoints}
								{#each s.data as point, pi}
									{@const visibleIndex = Math.ceil(s.data.length * animationProgress)}
									{#if pi < visibleIndex}
										<!-- svelte-ignore a11y_no_static_element_interactions -->
										<!-- svelte-ignore a11y_click_events_have_key_events -->
										<circle
											cx={xScale(point.x)}
											cy={yScale(point.y)}
											r={hoveredSeriesIndex === i && hoveredPointIndex === pi
												? effectivePointRadius * 1.5
												: effectivePointRadius}
											class={cn(
												'line-chart-point',
												colorClass[seriesColor],
												showGlow && 'has-glow',
												hoveredSeriesIndex === i && hoveredPointIndex === pi && 'is-hovered'
											)}
											onmouseenter={(e) => handlePointHover(point, s.name, e, seriesColor, i, pi)}
											onmouseleave={handlePointLeave}
											onclick={() => handlePointClick(point, s.name, pi)}
										/>
									{/if}
								{/each}
							{/if}
						{/each}
					{/if}
				</g>
			</svg>
		</div>

		{#if tooltipData && isTooltipActive}
			<div
				class="line-chart-tooltip"
				style="left: {tooltipPosition.x}px; top: {tooltipPosition.y}px;"
			>
				{#if tooltipContent}
					{@render tooltipContent({
						point: { x: tooltipData.x, y: tooltipData.y },
						seriesName: tooltipData.seriesName,
						color: tooltipData.color
					})}
				{:else}
					<div class="line-chart-tooltip-content">
						{#if tooltipData.seriesName !== 'Data'}
							<div class="line-chart-tooltip-title">{tooltipData.seriesName}</div>
						{/if}
						<div class="line-chart-tooltip-row">
							<div class="line-chart-tooltip-color is-{tooltipData.color}"></div>
							<span class="line-chart-tooltip-value">
								{formatXValue(tooltipData.x)}, {formatValue(tooltipData.y)}
							</span>
						</div>
					</div>
				{/if}
			</div>
		{/if}

		{#if !hideLegend && legendPosition !== 'none' && normalizedSeries.length > 1}
			<div class={cn('line-chart-legend', legendLayoutClass())}>
				{#each normalizedSeries as s, i}
					{@const seriesColor = getSeriesColor(s, i)}
					<div class={cn('line-chart-legend-item', hoveredSeriesIndex === i && 'is-active')}>
						<div class={cn('line-chart-legend-color', colorClass[seriesColor])}></div>
						<span>{s.name}</span>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>
