<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount, untrack, type Snippet } from 'svelte';

	type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';
	type Size = 'sm' | 'md' | 'lg' | 'xl';
	type LegendPosition = 'top' | 'right' | 'bottom' | 'left' | 'none';
	type Palette = 'default' | 'rainbow' | 'ocean' | 'sunset' | 'forest' | 'neon';

	type TooltipData = {
		value: number;
		label: string;
		seriesName: string;
		color: Color;
		index: number;
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
		hideGrid?: boolean;
		showLegend?: boolean;
		showValues?: boolean;
		barPadding?: number;
		groupPadding?: number;
		barRadius?: number;
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
		showGradient?: boolean;
		showGlow?: boolean;
		valueFormatter?: (value: number) => string;
		onClick?: (bar: DataPoint, seriesIndex: number, dataIndex: number) => void;
		onHover?: (bar: DataPoint | null, seriesIndex: number, dataIndex: number) => void;
		tooltipContent?: Snippet<[{ data: TooltipData }]>;
	};

	let {
		data = [],
		series = [],
		margin = { top: 20, right: 20, bottom: 40, left: 50 },
		color = 'primary' as Color,
		colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'] as Color[],
		grouped = false,
		stacked = false,
		hideGrid = false,
		showLegend = false,
		showValues = false,
		barPadding = 0.2,
		groupPadding = 0.1,
		barRadius = 4,
		loading = false,
		empty = false,
		emptyText = 'No data available',
		rootClass,
		chartClass,
		size = 'md' as Size,
		palette,
		legendPosition = 'bottom' as LegendPosition,
		disableAnimation = false,
		animationDuration = 800,
		showGradient = false,
		showGlow = false,
		valueFormatter,
		onClick,
		onHover,
		tooltipContent
	}: Props = $props();

	const sizePresets: Record<Size, { height: number }> = {
		sm: { height: 200 },
		md: { height: 300 },
		lg: { height: 400 },
		xl: { height: 500 }
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

	function getSeriesColor(seriesIndex: number, seriesColor?: Color): Color {
		if (seriesColor) return seriesColor;
		if (palette) {
			const paletteColors = colorPalettes[palette];
			return paletteColors[seriesIndex % paletteColors.length];
		}
		return colors[seriesIndex % colors.length];
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

	let containerEl: HTMLDivElement | undefined = $state();
	let containerSize = $state({ width: 0, height: 0 });
	// svelte-ignore state_referenced_locally
	let animationProgress = $state(disableAnimation ? 1 : 0);
	let animationFrameId: number | null = null;

	let width = $derived(containerSize.width || 600);
	let height = $derived(containerSize.height || sizePresets[size].height);

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

	let innerWidth = $derived(width - margin.left - margin.right);
	let innerHeight = $derived(height - margin.top - margin.bottom);

	let normalizedSeries = $derived.by((): Series[] => {
		if (series.length > 0) {
			return series.map((s, i) => ({
				name: s.name,
				data: s.data,
				color: getSeriesColor(i, s.color)
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
	let hoveredBar = $state<{ seriesIndex: number; dataIndex: number } | null>(null);

	let gradientIds = $derived(
		normalizedSeries.map((_, i) => `bar-gradient-${i}-${Math.random().toString(36).slice(2, 9)}`)
	);

	function handleBarHover(
		value: number,
		label: string,
		seriesName: string,
		event: MouseEvent,
		barColor: Color,
		seriesIndex: number,
		dataIndex: number
	): void {
		const target = event.target as SVGRectElement;
		const rect = target.getBoundingClientRect();

		tooltipData = { value, label, seriesName, color: barColor, index: dataIndex };
		tooltipPosition = {
			x: rect.right + 8,
			y: rect.top + rect.height / 2
		};
		isTooltipActive = true;
		hoveredBar = { seriesIndex, dataIndex };

		if (onHover) {
			onHover({ label, value }, seriesIndex, dataIndex);
		}
	}

	function handleBarLeave(): void {
		isTooltipActive = false;
		hoveredBar = null;

		if (onHover) {
			onHover(null, -1, -1);
		}

		setTimeout(() => {
			if (!isTooltipActive) {
				tooltipData = null;
			}
		}, 100);
	}

	function handleBarClick(bar: DataPoint, seriesIndex: number, dataIndex: number): void {
		if (onClick) {
			onClick(bar, seriesIndex, dataIndex);
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
				return 'flex-row';
			default:
				return 'flex-col';
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
				hoveredBar = null;
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
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		if (!disableAnimation && normalizedSeries.length > 0) {
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

<div class={cn('bar-chart-container', `is-${size}`, containerLayoutClass(), rootClass)}>
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
		<div bind:this={containerEl} class={cn('bar-chart', `is-${size}`, chartClass)}>
			<svg class="bar-chart-svg" {width} {height}>
				{#if showGradient}
					<defs>
						{#each normalizedSeries as s, i}
							{@const barColor = s.color || 'primary'}
							<linearGradient id={gradientIds[i]} x1="0%" y1="100%" x2="0%" y2="0%">
								<stop offset="0%" style="stop-color:var(--color-{barColor})" />
								<stop
									offset="100%"
									style="stop-color:var(--color-{barColor}-dark, var(--color-{barColor}))"
								/>
							</linearGradient>
						{/each}
					</defs>
				{/if}

				<g transform="translate({margin.left}, {margin.top})">
					{#if normalizedSeries.length > 0 && categories.length > 0}
						{@const grid = createGridLines()}
						{@const xScale = createBandScale(categories, [0, innerWidth], barPadding)}
						{@const yScale = createLinearScale(yDomain, [innerHeight, 0])}

						{#if !hideGrid}
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
									{formatValue(line.value)}
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
								{#each s.data as d, dataIndex}
									{@const categoryX = xScale(d.label)}
									{@const barX = categoryX + groupScale(seriesIndex)}
									{@const barWidth = groupScale.bandwidth()}
									{@const fullBarHeight = innerHeight - yScale(d.value)}
									{@const barHeight = fullBarHeight * animationProgress}
									{@const barY = innerHeight - barHeight}
									{@const isHovered =
										hoveredBar?.seriesIndex === seriesIndex && hoveredBar?.dataIndex === dataIndex}

									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<!-- svelte-ignore a11y_click_events_have_key_events -->
									<rect
										x={barX}
										y={barY}
										width={barWidth}
										height={Math.max(0, barHeight)}
										rx={barRadius}
										ry={barRadius}
										class={cn(
											'bar-chart-bar',
											colorClass[s.color!],
											showGlow && 'has-glow',
											isHovered && 'is-hovered'
										)}
										style={showGradient ? `fill: url(#${gradientIds[seriesIndex]});` : ''}
										onmouseenter={(e) =>
											handleBarHover(d.value, d.label, s.name, e, s.color!, seriesIndex, dataIndex)}
										onmouseleave={handleBarLeave}
										onclick={() => handleBarClick(d, seriesIndex, dataIndex)}
									/>

									{#if showValues && animationProgress === 1}
										<text
											x={barX + barWidth / 2}
											y={barY - 5}
											class="bar-chart-value-label"
											text-anchor="middle"
										>
											{formatValue(d.value)}
										</text>
									{/if}
								{/each}
							{/each}
						{:else if stacked && normalizedSeries.length > 1}
							{#each stackedData as s, seriesIndex}
								{#each s.data as d, dataIndex}
									{@const barX = xScale(d.label)}
									{@const barWidth = xScale.bandwidth()}
									{@const fullY0 = yScale((d as StackedDataPoint).y0)}
									{@const fullY1 = yScale((d as StackedDataPoint).y1)}
									{@const fullBarHeight = fullY0 - fullY1}
									{@const barHeight = fullBarHeight * animationProgress}
									{@const barY = innerHeight - (innerHeight - fullY1) * animationProgress}
									{@const isHovered =
										hoveredBar?.seriesIndex === seriesIndex && hoveredBar?.dataIndex === dataIndex}

									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<!-- svelte-ignore a11y_click_events_have_key_events -->
									<rect
										x={barX}
										y={barY}
										width={barWidth}
										height={Math.max(0, barHeight)}
										rx={barRadius}
										ry={barRadius}
										class={cn(
											'bar-chart-bar',
											colorClass[s.color!],
											showGlow && 'has-glow',
											isHovered && 'is-hovered'
										)}
										style={showGradient ? `fill: url(#${gradientIds[seriesIndex]});` : ''}
										onmouseenter={(e) =>
											handleBarHover(d.value, d.label, s.name, e, s.color!, seriesIndex, dataIndex)}
										onmouseleave={handleBarLeave}
										onclick={() => handleBarClick(d, seriesIndex, dataIndex)}
									/>
								{/each}
							{/each}
						{:else}
							{#each normalizedSeries[0].data as d, dataIndex}
								{@const barX = xScale(d.label)}
								{@const barWidth = xScale.bandwidth()}
								{@const fullBarHeight = innerHeight - yScale(d.value)}
								{@const barHeight = fullBarHeight * animationProgress}
								{@const barY = innerHeight - barHeight}
								{@const isHovered =
									hoveredBar?.seriesIndex === 0 && hoveredBar?.dataIndex === dataIndex}

								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<rect
									x={barX}
									y={barY}
									width={barWidth}
									height={Math.max(0, barHeight)}
									rx={barRadius}
									ry={barRadius}
									class={cn(
										'bar-chart-bar',
										colorClass[normalizedSeries[0].color!],
										showGlow && 'has-glow',
										isHovered && 'is-hovered'
									)}
									style={showGradient ? `fill: url(#${gradientIds[0]});` : ''}
									onmouseenter={(e) =>
										handleBarHover(
											d.value,
											d.label,
											normalizedSeries[0].name,
											e,
											normalizedSeries[0].color!,
											0,
											dataIndex
										)}
									onmouseleave={handleBarLeave}
									onclick={() => handleBarClick(d, 0, dataIndex)}
								/>

								{#if showValues && animationProgress === 1}
									<text
										x={barX + barWidth / 2}
										y={barY - 5}
										class="bar-chart-value-label"
										text-anchor="middle"
									>
										{formatValue(d.value)}
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
				{#if tooltipContent}
					{@render tooltipContent({ data: tooltipData })}
				{:else}
					<div class="bar-chart-tooltip-content">
						{#if tooltipData.seriesName !== 'Data'}
							<div class="bar-chart-tooltip-title">{tooltipData.seriesName}</div>
						{/if}
						<div class="bar-chart-tooltip-row">
							<div class={cn('bar-chart-tooltip-color', colorClass[tooltipData.color])}></div>
							<span class="bar-chart-tooltip-label">{tooltipData.label}:</span>
							<span class="bar-chart-tooltip-value">{formatValue(tooltipData.value)}</span>
						</div>
					</div>
				{/if}
			</div>
		{/if}

		{#if showLegend && legendPosition !== 'none' && normalizedSeries.length > 1}
			<div class={cn('bar-chart-legend', legendLayoutClass())}>
				{#each normalizedSeries as s, i}
					<div
						class="bar-chart-legend-item"
						onclick={() => onClick && onClick(s.data[0], i, 0)}
						onkeydown={(e) => e.key === 'Enter' && onClick && onClick(s.data[0], i, 0)}
						role="button"
						tabindex="0"
					>
						<div class={cn('bar-chart-legend-color', colorClass[s.color!])}></div>
						<span>{s.name}</span>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>
