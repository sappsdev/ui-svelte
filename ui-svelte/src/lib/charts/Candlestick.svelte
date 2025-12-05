<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';

	type LinearScale = {
		(value: number): number;
		invert: (pixel: number) => number;
		domain: [number, number];
		range: [number, number];
	};

	type BandScale = {
		(value: string | number | Date): number;
		bandwidth: () => number;
		domain: (string | number | Date)[];
		range: [number, number];
	};

	type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';

	type CandleData = {
		date: string | Date;
		open: number;
		high: number;
		low: number;
		close: number;
		volume?: number;
	};

	type Margin = {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};

	type Props = {
		data?: CandleData[];
		margin?: Margin;
		showVolume?: boolean;
		showGrid?: boolean;
		candleWidth?: number;
		bullishColor?: Color;
		bearishColor?: Color;
		wickWidth?: number;
		loading?: boolean;
		empty?: boolean;
		emptyText?: string;
		enableZoom?: boolean;
		enableScroll?: boolean;
		initialVisibleCandles?: number;
		minVisibleCandles?: number;
		maxVisibleCandles?: number;
		class?: string;
		chartClass?: string;
	};

	let {
		data = [],
		margin = { top: 20, right: 20, bottom: 40, left: 60 },
		showVolume = false,
		showGrid = true,
		candleWidth = 8,
		bullishColor = 'success' as Color,
		bearishColor = 'danger' as Color,
		wickWidth = 1,
		loading = false,
		empty = false,
		emptyText = 'No data available',
		enableZoom = true,
		enableScroll = true,
		initialVisibleCandles = 50,
		minVisibleCandles = 10,
		maxVisibleCandles = 200,
		class: className,
		chartClass
	}: Props = $props();

	let containerEl: HTMLDivElement | undefined = $state();
	let svgEl: SVGSVGElement | undefined = $state();
	let containerSize = $state({ width: 0, height: 0 });

	let visibleCandles = $state(initialVisibleCandles);
	let scrollOffset = $state(0);
	let isDragging = $state(false);
	let dragStartX = $state(0);
	let dragStartOffset = $state(0);

	let width = $derived(containerSize.width || 800);
	let height = $derived(containerSize.height || 400);

	let visibleData = $derived.by(() => {
		if (data.length === 0) return [];
		const start = Math.max(0, Math.min(scrollOffset, data.length - visibleCandles));
		const end = Math.min(start + visibleCandles, data.length);
		return data.slice(start, end);
	});

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
		domain: (string | number | Date)[],
		range: [number, number],
		padding: number = 0.1
	): BandScale {
		const [r0, r1] = range;
		const rangeSize = r1 - r0;
		const step = rangeSize / (domain.length + padding * (domain.length - 1));
		const bandwidth = step * (1 - padding);

		const scale = (value: string | number | Date): number => {
			const index = domain.findIndex((d) => {
				if (d instanceof Date && value instanceof Date) {
					return d.getTime() === value.getTime();
				}
				return d === value;
			});
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

	function formatPrice(value: number): string {
		return value.toFixed(2);
	}

	function formatDate(date: string | Date): string {
		if (typeof date === 'string') {
			const d = new Date(date);
			return `${d.getMonth() + 1}/${d.getDate()}`;
		}
		return date.toLocaleDateString();
	}

	let innerWidth = $derived(width - margin.left - margin.right);
	let innerHeight = $derived(height - margin.top - margin.bottom);

	let priceHeight = $derived(showVolume ? innerHeight * 0.75 : innerHeight);
	let volumeHeight = $derived(showVolume ? innerHeight * 0.2 : 0);
	let volumeTop = $derived(showVolume ? priceHeight + 10 : 0);

	let priceDomain = $derived.by((): [number, number] => {
		if (visibleData.length === 0) return [0, 1];
		const allPrices = visibleData.flatMap((d) => [d.high, d.low]);
		const min = Math.min(...allPrices);
		const max = Math.max(...allPrices);
		const padding = (max - min) * 0.1;
		return [min - padding, max + padding];
	});

	let volumeDomain = $derived.by((): [number, number] => {
		if (!showVolume || visibleData.length === 0) return [0, 1];
		const volumes = visibleData.map((d) => d.volume || 0);
		return [0, Math.max(...volumes) * 1.2];
	});

	let xScale = $derived(
		createBandScale(
			visibleData.map((d) => d.date),
			[0, innerWidth],
			0.3
		)
	);
	let priceScale = $derived(createLinearScale(priceDomain, [priceHeight, 0]));
	let volumeScale = $derived(
		showVolume ? createLinearScale(volumeDomain, [volumeHeight, 0]) : null
	);
	let grid = $derived(createGridLines(priceHeight));

	function createGridLines(priceH: number): Array<{ x: number; y: number; value: number }> {
		const yScale = createLinearScale(priceDomain, [priceH, 0]);
		const yTicks = 5;

		return Array.from({ length: yTicks + 1 }, (_, i) => {
			const value = priceDomain[0] + (priceDomain[1] - priceDomain[0]) * (i / yTicks);
			return { x: innerWidth, y: yScale(value), value };
		});
	}

	function handleWheel(event: WheelEvent): void {
		if (!enableZoom || data.length === 0) return;
		event.preventDefault();

		const delta = event.deltaY;
		const zoomFactor = delta > 0 ? 1.1 : 0.9;
		const newVisibleCandles = Math.round(visibleCandles * zoomFactor);

		visibleCandles = Math.max(
			minVisibleCandles,
			Math.min(maxVisibleCandles, Math.min(newVisibleCandles, data.length))
		);

		const oldEnd = scrollOffset + visibleCandles;
		scrollOffset = Math.max(0, Math.min(oldEnd - visibleCandles, data.length - visibleCandles));
	}

	function handleMouseDown(event: MouseEvent): void {
		if (!enableScroll || data.length === 0) return;
		isDragging = true;
		dragStartX = event.clientX;
		dragStartOffset = scrollOffset;
	}

	function handleMouseMove(event: MouseEvent): void {
		if (!isDragging || !enableScroll) return;

		const deltaX = event.clientX - dragStartX;
		const candlesPerPixel = visibleCandles / innerWidth;
		const candlesDelta = Math.round(-deltaX * candlesPerPixel);

		scrollOffset = Math.max(
			0,
			Math.min(dragStartOffset + candlesDelta, data.length - visibleCandles)
		);
	}

	function handleMouseUp(): void {
		isDragging = false;
	}

	let touchStartX = $state(0);
	let touchStartOffset = $state(0);

	function handleTouchStart(event: TouchEvent): void {
		if (!enableScroll || data.length === 0) return;
		touchStartX = event.touches[0].clientX;
		touchStartOffset = scrollOffset;
	}

	function handleTouchMove(event: TouchEvent): void {
		if (!enableScroll || data.length === 0) return;
		event.preventDefault();

		const deltaX = event.touches[0].clientX - touchStartX;
		const candlesPerPixel = visibleCandles / innerWidth;
		const candlesDelta = Math.round(-deltaX * candlesPerPixel);

		scrollOffset = Math.max(
			0,
			Math.min(touchStartOffset + candlesDelta, data.length - visibleCandles)
		);
	}

	let tooltipData = $state<CandleData | null>(null);
	let tooltipPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isTooltipActive = $state(false);

	function handleCandleHover(candle: CandleData, event: MouseEvent): void {
		const target = event.target as SVGElement;
		const rect = target.getBoundingClientRect();

		tooltipData = candle;
		tooltipPosition = {
			x: rect.right + 8,
			y: rect.top + rect.height / 2
		};
		isTooltipActive = true;
	}

	function handleCandleLeave(): void {
		isTooltipActive = false;
		setTimeout(() => {
			if (!isTooltipActive) {
				tooltipData = null;
			}
		}, 100);
	}

	let scrollPercentage = $derived.by(() => {
		if (data.length === 0 || visibleCandles >= data.length) return 100;
		return (visibleCandles / data.length) * 100;
	});

	let scrollPosition = $derived.by(() => {
		if (data.length === 0 || visibleCandles >= data.length) return 0;
		return (scrollOffset / (data.length - visibleCandles)) * (100 - scrollPercentage);
	});

	onMount(() => {
		if (data.length > 0) {
			visibleCandles = Math.min(initialVisibleCandles, data.length);
			scrollOffset = Math.max(0, data.length - visibleCandles);
		}

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

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});

	$effect(() => {
		if (data.length > 0) {
			visibleCandles = Math.min(visibleCandles, data.length);
			scrollOffset = Math.max(0, Math.min(scrollOffset, data.length - visibleCandles));
		}
	});
</script>

<div bind:this={containerEl} class={cn('candlestick-chart-container', className)}>
	{#if loading}
		<div class="candlestick-chart-loading"></div>
	{:else if empty || data.length === 0}
		<div class="candlestick-chart-empty">
			<svg
				class="candlestick-chart-empty-icon"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
				/>
			</svg>
			<span>{emptyText}</span>
		</div>
	{:else}
		<div class={cn('candlestick-chart', chartClass)}>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<svg
				bind:this={svgEl}
				class="candlestick-chart-svg"
				class:candlestick-chart-dragging={isDragging}
				{width}
				{height}
				onwheel={handleWheel}
				onmousedown={handleMouseDown}
				ontouchstart={handleTouchStart}
				ontouchmove={handleTouchMove}
			>
				<g transform="translate({margin.left}, {margin.top})">
					{#if showGrid}
						<g class="candlestick-chart-grid">
							{#each grid as line}
								<line
									x1={0}
									y1={line.y}
									x2={line.x}
									y2={line.y}
									class="candlestick-chart-grid-line"
								/>
							{/each}
						</g>
					{/if}

					<g class="candlestick-chart-axis">
						<line
							x1={0}
							y1={priceHeight}
							x2={innerWidth}
							y2={priceHeight}
							class="candlestick-chart-axis-line"
						/>
						<line x1={0} y1={0} x2={0} y2={priceHeight} class="candlestick-chart-axis-line" />

						{#if showGrid}
							{#each grid as line}
								<text
									x={-10}
									y={line.y}
									class="candlestick-chart-axis-label"
									text-anchor="end"
									dominant-baseline="middle"
								>
									{formatPrice(line.value)}
								</text>
							{/each}
						{/if}

						{#each visibleData.filter((_, i) => i % Math.ceil(visibleData.length / 6) === 0) as d}
							<text
								x={xScale(d.date) + xScale.bandwidth() / 2}
								y={priceHeight + 20}
								class="candlestick-chart-axis-label"
								text-anchor="middle"
								font-size="10"
							>
								{formatDate(d.date)}
							</text>
						{/each}

						{#if showVolume}
							<line
								x1={0}
								y1={volumeTop + volumeHeight}
								x2={innerWidth}
								y2={volumeTop + volumeHeight}
								class="candlestick-chart-axis-line"
							/>
						{/if}
					</g>

					{#each visibleData as d}
						{@const x = xScale(d.date) + xScale.bandwidth() / 2}
						{@const open = priceScale(d.open)}
						{@const close = priceScale(d.close)}
						{@const high = priceScale(d.high)}
						{@const low = priceScale(d.low)}
						{@const isBullish = d.close >= d.open}
						{@const bodyTop = Math.min(open, close)}
						{@const bodyHeight = Math.abs(open - close)}
						{@const colorClass = isBullish ? bullishColor : bearishColor}

						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<g onmouseenter={(e) => handleCandleHover(d, e)} onmouseleave={handleCandleLeave}>
							<line
								x1={x}
								y1={high}
								x2={x}
								y2={low}
								class="candlestick-chart-wick is-{colorClass}"
								style="stroke-width: {wickWidth};"
							/>

							<rect
								x={x - candleWidth / 2}
								y={bodyTop}
								width={candleWidth}
								height={Math.max(bodyHeight, 1)}
								class="candlestick-chart-candle is-{colorClass}"
							/>
						</g>

						{#if showVolume && d.volume && volumeScale}
							{@const volumeBarHeight = volumeScale(volumeDomain[1] - d.volume)}
							<rect
								x={xScale(d.date)}
								y={volumeTop + volumeBarHeight}
								width={xScale.bandwidth()}
								height={volumeHeight - volumeBarHeight}
								class="candlestick-chart-volume is-{colorClass}"
							/>
						{/if}
					{/each}
				</g>
			</svg>
		</div>

		{#if tooltipData && isTooltipActive}
			<div
				class="candlestick-chart-tooltip"
				style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px;"
			>
				<div class="candlestick-chart-tooltip-content">
					<div class="candlestick-chart-tooltip-title">{formatDate(tooltipData.date)}</div>
					<div class="candlestick-chart-tooltip-rows">
						<div class="candlestick-chart-tooltip-row">
							<span class="candlestick-chart-tooltip-label">Open:</span>
							<span class="candlestick-chart-tooltip-value">{formatPrice(tooltipData.open)}</span>
						</div>
						<div class="candlestick-chart-tooltip-row">
							<span class="candlestick-chart-tooltip-label">High:</span>
							<span class="candlestick-chart-tooltip-value">{formatPrice(tooltipData.high)}</span>
						</div>
						<div class="candlestick-chart-tooltip-row">
							<span class="candlestick-chart-tooltip-label">Low:</span>
							<span class="candlestick-chart-tooltip-value">{formatPrice(tooltipData.low)}</span>
						</div>
						<div class="candlestick-chart-tooltip-row">
							<span class="candlestick-chart-tooltip-label">Close:</span>
							<span class="candlestick-chart-tooltip-value">{formatPrice(tooltipData.close)}</span>
						</div>
						{#if showVolume && tooltipData.volume}
							<div class="candlestick-chart-tooltip-row candlestick-chart-tooltip-volume">
								<span class="candlestick-chart-tooltip-label">Volume:</span>
								<span class="candlestick-chart-tooltip-value"
									>{formatNumber(tooltipData.volume)}</span
								>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	{/if}
</div>
