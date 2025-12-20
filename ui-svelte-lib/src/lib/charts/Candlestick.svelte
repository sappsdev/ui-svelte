<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount, type Snippet } from 'svelte';

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
	type Size = 'sm' | 'md' | 'lg' | 'xl';
	type Theme = 'default' | 'tradingview' | 'dark' | 'light';
	type CandleStyle = 'filled' | 'hollow' | 'heikinashi' | 'line' | 'area';
	type ScaleType = 'linear' | 'log';
	type GridStyle = 'solid' | 'dashed' | 'dotted' | 'none';

	type CandleData = {
		date: string | Date;
		open: number;
		high: number;
		low: number;
		close: number;
		volume?: number;
	};

	type Indicator =
		| { type: 'sma'; period: number; color?: Color }
		| { type: 'ema'; period: number; color?: Color }
		| { type: 'bollinger'; period: number; stdDev?: number; color?: Color };

	type Margin = {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};

	type Props = {
		data?: CandleData[];
		margin?: Margin;
		hideVolume?: boolean;
		hideGrid?: boolean;
		candleWidth?: number;
		bullishColor?: Color;
		bearishColor?: Color;
		wickWidth?: number;
		loading?: boolean;
		empty?: boolean;
		emptyText?: string;
		disableZoom?: boolean;
		disableScroll?: boolean;
		initialVisibleCandles?: number;
		minVisibleCandles?: number;
		maxVisibleCandles?: number;
		rootClass?: string;
		chartClass?: string;
		size?: Size;
		theme?: Theme;
		candleStyle?: CandleStyle;
		scaleType?: ScaleType;
		hideCrosshair?: boolean;
		hideYAxisLabels?: boolean;
		hideXAxisLabels?: boolean;
		gridStyle?: GridStyle;
		hideLastPrice?: boolean;
		indicators?: Indicator[];
		onClick?: (candle: CandleData, index: number) => void;
		onRangeChange?: (start: number, end: number) => void;
		priceFormatter?: (value: number) => string;
		dateFormatter?: (date: Date | string) => string;
		animated?: boolean;
		tooltipContent?: Snippet<[{ candle: CandleData; change: number; changePercent: number }]>;
	};

	let {
		data = [],
		margin = { top: 20, right: 60, bottom: 40, left: 60 },
		hideVolume,
		hideGrid,
		candleWidth = 8,
		bullishColor = 'success' as Color,
		bearishColor = 'danger' as Color,
		wickWidth = 1,
		loading,
		empty,
		emptyText = 'No data available',
		disableZoom,
		disableScroll,
		initialVisibleCandles = 50,
		minVisibleCandles = 10,
		maxVisibleCandles = 200,
		rootClass,
		chartClass,
		size = 'md',
		theme = 'default',
		candleStyle = 'filled',
		scaleType = 'linear',
		hideCrosshair,
		hideYAxisLabels,
		hideXAxisLabels,
		gridStyle = 'dashed',
		hideLastPrice,
		indicators = [],
		onClick,
		onRangeChange,
		priceFormatter,
		dateFormatter,
		animated,
		tooltipContent
	}: Props = $props();

	const sizePresets: Record<Size, number> = {
		sm: 200,
		md: 350,
		lg: 500,
		xl: 700
	};

	const themeColors: Record<Theme, { bg: string; grid: string; text: string }> = {
		default: { bg: 'transparent', grid: 'var(--color-muted)', text: 'var(--color-on-muted)' },
		tradingview: { bg: '#131722', grid: '#363c4e', text: '#d1d4dc' },
		dark: { bg: '#1a1a2e', grid: '#2d2d44', text: '#e0e0e0' },
		light: { bg: '#ffffff', grid: '#e0e0e0', text: '#333333' }
	};

	let containerEl: HTMLDivElement | undefined = $state();
	let svgEl: SVGSVGElement | undefined = $state();
	let containerSize = $state({ width: 0, height: 0 });

	// svelte-ignore state_referenced_locally
	let visibleCandles = $state(initialVisibleCandles);
	let scrollOffset = $state(0);
	let isDragging = $state(false);
	let dragStartX = $state(0);
	let dragStartOffset = $state(0);

	let crosshairPosition = $state<{ x: number; y: number } | null>(null);
	let isCrosshairActive = $state(false);

	let width = $derived(containerSize.width || 800);
	let chartHeight = $derived(sizePresets[size]);

	let visibleData = $derived.by(() => {
		if (data.length === 0) return [];
		const start = Math.max(0, Math.min(scrollOffset, data.length - visibleCandles));
		const end = Math.min(start + visibleCandles, data.length);
		return data.slice(start, end);
	});

	let processedData = $derived.by(() => {
		if (candleStyle !== 'heikinashi') return visibleData;
		return calculateHeikinAshi(visibleData);
	});

	function calculateHeikinAshi(candles: CandleData[]): CandleData[] {
		if (candles.length === 0) return [];

		const result: CandleData[] = [];
		let prevHaOpen = candles[0].open;
		let prevHaClose = (candles[0].open + candles[0].high + candles[0].low + candles[0].close) / 4;

		for (let i = 0; i < candles.length; i++) {
			const c = candles[i];
			const haClose = (c.open + c.high + c.low + c.close) / 4;
			const haOpen = i === 0 ? c.open : (prevHaOpen + prevHaClose) / 2;
			const haHigh = Math.max(c.high, haOpen, haClose);
			const haLow = Math.min(c.low, haOpen, haClose);

			result.push({
				date: c.date,
				open: haOpen,
				high: haHigh,
				low: haLow,
				close: haClose,
				volume: c.volume
			});

			prevHaOpen = haOpen;
			prevHaClose = haClose;
		}

		return result;
	}

	function calculateSMA(candles: CandleData[], period: number): (number | null)[] {
		const result: (number | null)[] = [];
		for (let i = 0; i < candles.length; i++) {
			if (i < period - 1) {
				result.push(null);
			} else {
				let sum = 0;
				for (let j = 0; j < period; j++) {
					sum += candles[i - j].close;
				}
				result.push(sum / period);
			}
		}
		return result;
	}

	function calculateEMA(candles: CandleData[], period: number): (number | null)[] {
		const result: (number | null)[] = [];
		const multiplier = 2 / (period + 1);

		for (let i = 0; i < candles.length; i++) {
			if (i < period - 1) {
				result.push(null);
			} else if (i === period - 1) {
				let sum = 0;
				for (let j = 0; j < period; j++) {
					sum += candles[i - j].close;
				}
				result.push(sum / period);
			} else {
				const prevEma = result[i - 1];
				if (prevEma !== null) {
					result.push((candles[i].close - prevEma) * multiplier + prevEma);
				} else {
					result.push(null);
				}
			}
		}
		return result;
	}

	function calculateBollingerBands(
		candles: CandleData[],
		period: number,
		stdDev: number = 2
	): { upper: (number | null)[]; middle: (number | null)[]; lower: (number | null)[] } {
		const sma = calculateSMA(candles, period);
		const upper: (number | null)[] = [];
		const lower: (number | null)[] = [];

		for (let i = 0; i < candles.length; i++) {
			if (sma[i] === null) {
				upper.push(null);
				lower.push(null);
			} else {
				let sumSquaredDiff = 0;
				for (let j = 0; j < period; j++) {
					sumSquaredDiff += Math.pow(candles[i - j].close - sma[i]!, 2);
				}
				const std = Math.sqrt(sumSquaredDiff / period);
				upper.push(sma[i]! + stdDev * std);
				lower.push(sma[i]! - stdDev * std);
			}
		}

		return { upper, middle: sma, lower };
	}

	let indicatorData = $derived.by(() => {
		return indicators.map((ind) => {
			if (ind.type === 'sma') {
				return { ...ind, values: calculateSMA(processedData, ind.period) };
			} else if (ind.type === 'ema') {
				return { ...ind, values: calculateEMA(processedData, ind.period) };
			} else if (ind.type === 'bollinger') {
				const bands = calculateBollingerBands(processedData, ind.period, ind.stdDev);
				return { ...ind, bands };
			}
			return ind;
		});
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

	function createLogScale(domain: [number, number], range: [number, number]): LinearScale {
		const [d0, d1] = domain;
		const [r0, r1] = range;
		const logD0 = Math.log10(Math.max(d0, 0.001));
		const logD1 = Math.log10(Math.max(d1, 0.001));

		const scale = (value: number): number => {
			const logValue = Math.log10(Math.max(value, 0.001));
			return r0 + ((logValue - logD0) / (logD1 - logD0)) * (r1 - r0);
		};

		scale.invert = (pixel: number): number => {
			const logValue = logD0 + ((pixel - r0) / (r1 - r0)) * (logD1 - logD0);
			return Math.pow(10, logValue);
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
		if (abs < 1) return value.toFixed(4);
		return value.toFixed(2);
	}

	function formatPrice(value: number): string {
		if (priceFormatter) return priceFormatter(value);
		return value.toFixed(2);
	}

	function formatDate(date: string | Date): string {
		if (dateFormatter) return dateFormatter(date);
		if (typeof date === 'string') {
			const d = new Date(date);
			return `${d.getMonth() + 1}/${d.getDate()}`;
		}
		return date.toLocaleDateString();
	}

	function formatDateTime(date: string | Date): string {
		if (dateFormatter) return dateFormatter(date);
		const d = typeof date === 'string' ? new Date(date) : date;
		return d.toLocaleString();
	}

	let innerWidth = $derived(width - margin.left - margin.right);
	let innerHeight = $derived(chartHeight - margin.top - margin.bottom);

	let priceHeight = $derived(!hideVolume ? innerHeight * 0.75 : innerHeight);
	let volumeHeight = $derived(!hideVolume ? innerHeight * 0.2 : 0);
	let volumeTop = $derived(!hideVolume ? priceHeight + 10 : 0);

	let priceDomain = $derived.by((): [number, number] => {
		if (processedData.length === 0) return [0, 1];
		const allPrices = processedData.flatMap((d) => [d.high, d.low]);

		indicatorData.forEach((ind: any) => {
			if (ind.values) {
				allPrices.push(...ind.values.filter((v: number | null) => v !== null));
			}
			if (ind.bands) {
				allPrices.push(...ind.bands.upper.filter((v: number | null) => v !== null));
				allPrices.push(...ind.bands.lower.filter((v: number | null) => v !== null));
			}
		});

		const min = Math.min(...allPrices);
		const max = Math.max(...allPrices);
		const padding = (max - min) * 0.1;
		return [min - padding, max + padding];
	});

	let volumeDomain = $derived.by((): [number, number] => {
		if (hideVolume || processedData.length === 0) return [0, 1];
		const volumes = processedData.map((d) => d.volume || 0);
		return [0, Math.max(...volumes) * 1.2];
	});

	let xScale = $derived(
		createBandScale(
			processedData.map((d) => d.date),
			[0, innerWidth],
			0.3
		)
	);

	let priceScale = $derived(
		scaleType === 'log'
			? createLogScale(priceDomain, [priceHeight, 0])
			: createLinearScale(priceDomain, [priceHeight, 0])
	);

	let volumeScale = $derived(
		!hideVolume ? createLinearScale(volumeDomain, [volumeHeight, 0]) : null
	);

	let grid = $derived(createGridLines(priceHeight));

	function createGridLines(priceH: number): Array<{ x: number; y: number; value: number }> {
		const yScale =
			scaleType === 'log'
				? createLogScale(priceDomain, [priceH, 0])
				: createLinearScale(priceDomain, [priceH, 0]);
		const yTicks = 5;

		return Array.from({ length: yTicks + 1 }, (_, i) => {
			const value = priceDomain[0] + (priceDomain[1] - priceDomain[0]) * (i / yTicks);
			return { x: innerWidth, y: yScale(value), value };
		});
	}

	let lastCandle = $derived(data.length > 0 ? data[data.length - 1] : null);
	let lastPrice = $derived(lastCandle?.close || 0);
	let isLastPriceVisible = $derived(lastPrice >= priceDomain[0] && lastPrice <= priceDomain[1]);
	let lastPriceY = $derived(priceScale(lastPrice));
	let lastPriceYClamped = $derived(Math.max(10, Math.min(priceHeight - 10, lastPriceY)));

	function getGridDashArray(): string {
		switch (gridStyle) {
			case 'solid':
				return 'none';
			case 'dotted':
				return '1, 3';
			case 'dashed':
			default:
				return '4, 4';
		}
	}

	function handleWheel(event: WheelEvent): void {
		if (disableZoom || data.length === 0) return;

		if (!event.ctrlKey && !event.metaKey) return;

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

		if (onRangeChange) {
			onRangeChange(scrollOffset, scrollOffset + visibleCandles);
		}
	}

	function handleMouseDown(event: MouseEvent): void {
		if (disableScroll || data.length === 0) return;
		isDragging = true;
		dragStartX = event.clientX;
		dragStartOffset = scrollOffset;
	}

	function handleMouseMove(event: MouseEvent): void {
		if (isDragging && !disableScroll) {
			const deltaX = event.clientX - dragStartX;
			const candlesPerPixel = visibleCandles / innerWidth;
			const candlesDelta = Math.round(-deltaX * candlesPerPixel);

			scrollOffset = Math.max(
				0,
				Math.min(dragStartOffset + candlesDelta, data.length - visibleCandles)
			);
		}

		if (!hideCrosshair && svgEl && containerEl) {
			const rect = svgEl.getBoundingClientRect();
			const x = event.clientX - rect.left - margin.left;
			const y = event.clientY - rect.top - margin.top;

			if (x >= 0 && x <= innerWidth && y >= 0 && y <= priceHeight) {
				crosshairPosition = { x, y };
				isCrosshairActive = true;
			} else {
				isCrosshairActive;
			}
		}
	}

	function handleMouseUp(): void {
		isDragging = false;
	}

	function handleMouseLeave(): void {
		isCrosshairActive = false;
	}

	function handleDoubleClick(): void {
		visibleCandles = Math.min(initialVisibleCandles, data.length);
		scrollOffset = Math.max(0, data.length - visibleCandles);

		if (onRangeChange) {
			onRangeChange(scrollOffset, scrollOffset + visibleCandles);
		}
	}

	let touchStartX = $state(0);
	let touchStartOffset = $state(0);

	function handleTouchStart(event: TouchEvent): void {
		if (disableScroll || data.length === 0) return;
		touchStartX = event.touches[0].clientX;
		touchStartOffset = scrollOffset;
	}

	function handleTouchMove(event: TouchEvent): void {
		if (disableScroll || data.length === 0) return;
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
	let tooltipChange = $state<{ value: number; percent: number }>({ value: 0, percent: 0 });
	let tooltipPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isTooltipActive = $state(false);

	function handleCandleHover(candle: CandleData, index: number, event: MouseEvent): void {
		const target = event.target as SVGElement;
		const rect = target.getBoundingClientRect();

		const change = candle.close - candle.open;
		const changePercent = candle.open !== 0 ? (change / candle.open) * 100 : 0;

		tooltipData = candle;
		tooltipChange = { value: change, percent: changePercent };
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

	function handleCandleClick(candle: CandleData, index: number): void {
		if (onClick) {
			onClick(candle, index);
		}
	}

	let crosshairPrice = $derived(crosshairPosition ? priceScale.invert(crosshairPosition.y) : 0);

	let crosshairCandleIndex = $derived.by(() => {
		if (!crosshairPosition || processedData.length === 0) return -1;
		const bandwidth = xScale.bandwidth();
		for (let i = 0; i < processedData.length; i++) {
			const candleX = xScale(processedData[i].date);
			if (crosshairPosition.x >= candleX && crosshairPosition.x < candleX + bandwidth) {
				return i;
			}
		}
		return -1;
	});

	let crosshairCandle = $derived(
		crosshairCandleIndex >= 0 ? processedData[crosshairCandleIndex] : null
	);

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

		const handleScroll = () => {
			if (isTooltipActive) {
				isTooltipActive = false;
				tooltipData = null;
			}
		};

		updateSize();
		const resizeObserver = new ResizeObserver(updateSize);
		if (containerEl) {
			resizeObserver.observe(containerEl);
		}

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('scroll', handleScroll, true);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('scroll', handleScroll, true);
		};
	});

	$effect(() => {
		if (data.length > 0) {
			visibleCandles = Math.min(visibleCandles, data.length);
			scrollOffset = Math.max(0, Math.min(scrollOffset, data.length - visibleCandles));
		}
	});

	function getIndicatorColor(ind: Indicator): string {
		const colorMap: Record<Color, string> = {
			primary: 'var(--color-primary)',
			secondary: 'var(--color-secondary)',
			success: 'var(--color-success)',
			info: 'var(--color-info)',
			warning: 'var(--color-warning)',
			danger: 'var(--color-danger)',
			muted: 'var(--color-muted)'
		};
		return colorMap[ind.color || 'primary'];
	}

	function createIndicatorPath(values: (number | null)[]): string {
		const points: string[] = [];
		let started;

		for (let i = 0; i < values.length; i++) {
			const val = values[i];
			if (val === null) continue;

			const x = xScale(processedData[i].date) + xScale.bandwidth() / 2;
			const y = priceScale(val);

			if (!started) {
				points.push(`M ${x} ${y}`);
				started = true;
			} else {
				points.push(`L ${x} ${y}`);
			}
		}

		return points.join(' ');
	}

	function createAreaPath(): string {
		if (processedData.length === 0) return '';

		const points: string[] = [];
		const firstX = xScale(processedData[0].date) + xScale.bandwidth() / 2;

		points.push(`M ${firstX} ${priceHeight}`);

		for (let i = 0; i < processedData.length; i++) {
			const x = xScale(processedData[i].date) + xScale.bandwidth() / 2;
			const y = priceScale(processedData[i].close);
			points.push(`L ${x} ${y}`);
		}

		const lastX = xScale(processedData[processedData.length - 1].date) + xScale.bandwidth() / 2;
		points.push(`L ${lastX} ${priceHeight}`);
		points.push('Z');

		return points.join(' ');
	}
</script>

<div
	bind:this={containerEl}
	class={cn('candlestick-chart-container', `is-${size}`, `theme-${theme}`, rootClass)}
	style={theme !== 'default' ? `background: ${themeColors[theme].bg};` : ''}
>
	{#if loading}
		<div class="candlestick-chart-loading">
			<div class="candlestick-chart-loading-skeleton"></div>
		</div>
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
		<div class={cn('candlestick-chart', `is-${size}`, chartClass)}>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<svg
				bind:this={svgEl}
				class="candlestick-chart-svg"
				class:candlestick-chart-dragging={isDragging}
				{width}
				height={chartHeight}
				onwheel={handleWheel}
				onmousedown={handleMouseDown}
				ontouchstart={handleTouchStart}
				ontouchmove={handleTouchMove}
				onmouseleave={handleMouseLeave}
				ondblclick={handleDoubleClick}
			>
				<g transform="translate({margin.left}, {margin.top})">
					{#if !hideGrid && gridStyle !== 'none'}
						<g class="candlestick-chart-grid">
							{#each grid as line}
								<line
									x1={0}
									y1={line.y}
									x2={line.x}
									y2={line.y}
									class="candlestick-chart-grid-line"
									stroke-dasharray={getGridDashArray()}
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

						{#if !hideYAxisLabels && !hideGrid}
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

						{#if !hideXAxisLabels}
							{#each processedData.filter((_, i) => i % Math.ceil(processedData.length / 6) === 0) as d}
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
						{/if}

						{#if !hideVolume}
							<line
								x1={0}
								y1={volumeTop + volumeHeight}
								x2={innerWidth}
								y2={volumeTop + volumeHeight}
								class="candlestick-chart-axis-line"
							/>
						{/if}
					</g>

					{#if candleStyle === 'area'}
						<path d={createAreaPath()} class="candlestick-chart-area is-{bullishColor}" />
						<path
							d={createIndicatorPath(processedData.map((d) => d.close))}
							class="candlestick-chart-line is-{bullishColor}"
							fill="none"
							stroke-width="2"
						/>
					{:else if candleStyle === 'line'}
						<path
							d={createIndicatorPath(processedData.map((d) => d.close))}
							class="candlestick-chart-line is-{bullishColor}"
							fill="none"
							stroke-width="2"
						/>
					{:else}
						{#each processedData as d, i}
							{@const x = xScale(d.date) + xScale.bandwidth() / 2}
							{@const open = priceScale(d.open)}
							{@const close = priceScale(d.close)}
							{@const high = priceScale(d.high)}
							{@const low = priceScale(d.low)}
							{@const isBullish = d.close >= d.open}
							{@const bodyTop = Math.min(open, close)}
							{@const bodyHeight = Math.abs(open - close)}
							{@const colorClass = isBullish ? bullishColor : bearishColor}
							{@const isHollow = candleStyle === 'hollow' && isBullish}

							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<g
								onmouseenter={(e) => handleCandleHover(d, i, e)}
								onmouseleave={handleCandleLeave}
								onclick={() => handleCandleClick(d, i)}
							>
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
									rx={2}
									class={cn(
										'candlestick-chart-candle',
										`is-${colorClass}`,
										isHollow && 'is-hollow'
									)}
								/>
							</g>

							{#if !hideVolume && d.volume && volumeScale}
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
					{/if}

					{#each indicatorData as ind}
						{#if 'values' in ind && ind.values}
							<path
								d={createIndicatorPath(ind.values)}
								class="candlestick-chart-indicator"
								fill="none"
								stroke={getIndicatorColor(ind)}
								stroke-width="1.5"
							/>
						{/if}
						{#if 'bands' in ind && ind.bands}
							<path
								d={createIndicatorPath(ind.bands.upper)}
								class="candlestick-chart-indicator candlestick-chart-bollinger-band"
								fill="none"
								stroke={getIndicatorColor(ind)}
								stroke-width="1"
								opacity="0.5"
							/>
							<path
								d={createIndicatorPath(ind.bands.middle)}
								class="candlestick-chart-indicator"
								fill="none"
								stroke={getIndicatorColor(ind)}
								stroke-width="1.5"
							/>
							<path
								d={createIndicatorPath(ind.bands.lower)}
								class="candlestick-chart-indicator candlestick-chart-bollinger-band"
								fill="none"
								stroke={getIndicatorColor(ind)}
								stroke-width="1"
								opacity="0.5"
							/>
						{/if}
					{/each}

					{#if !hideLastPrice && lastCandle}
						{#if isLastPriceVisible}
							<line
								x1={0}
								y1={lastPriceY}
								x2={innerWidth}
								y2={lastPriceY}
								class="candlestick-chart-last-price is-{lastCandle.close >= lastCandle.open
									? bullishColor
									: bearishColor}"
								stroke-dasharray="4, 2"
							/>
						{/if}
						<rect
							x={innerWidth + 2}
							y={lastPriceYClamped - 10}
							width={50}
							height={20}
							rx="3"
							class="candlestick-chart-last-price-label-bg is-{lastCandle.close >= lastCandle.open
								? bullishColor
								: bearishColor}"
						/>
						<text
							x={innerWidth + 27}
							y={lastPriceYClamped + 4}
							class="candlestick-chart-last-price-label"
							text-anchor="middle"
							font-size="10"
						>
							{formatPrice(lastPrice)}
						</text>
					{/if}

					{#if !hideCrosshair && isCrosshairActive && crosshairPosition}
						<line
							x1={0}
							y1={crosshairPosition.y}
							x2={innerWidth}
							y2={crosshairPosition.y}
							class="candlestick-chart-crosshair"
						/>
						<line
							x1={crosshairPosition.x}
							y1={0}
							x2={crosshairPosition.x}
							y2={priceHeight}
							class="candlestick-chart-crosshair"
						/>

						<rect
							x={-55}
							y={crosshairPosition.y - 10}
							width={50}
							height={20}
							rx="3"
							class="candlestick-chart-crosshair-label-bg"
						/>
						<text
							x={-30}
							y={crosshairPosition.y + 4}
							class="candlestick-chart-crosshair-label"
							text-anchor="middle"
							font-size="10"
						>
							{formatPrice(crosshairPrice)}
						</text>

						{#if crosshairCandle}
							<rect
								x={xScale(crosshairCandle.date) + xScale.bandwidth() / 2 - 30}
								y={priceHeight + 5}
								width={60}
								height={16}
								rx="3"
								class="candlestick-chart-crosshair-label-bg"
							/>
							<text
								x={xScale(crosshairCandle.date) + xScale.bandwidth() / 2}
								y={priceHeight + 16}
								class="candlestick-chart-crosshair-label"
								text-anchor="middle"
								font-size="9"
							>
								{formatDate(crosshairCandle.date)}
							</text>
						{/if}
					{/if}
				</g>
			</svg>
		</div>

		{#if tooltipData && isTooltipActive}
			<div
				class="candlestick-chart-tooltip"
				style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px;"
			>
				{#if tooltipContent}
					{@render tooltipContent({
						candle: tooltipData,
						change: tooltipChange.value,
						changePercent: tooltipChange.percent
					})}
				{:else}
					<div class="candlestick-chart-tooltip-content">
						<div class="candlestick-chart-tooltip-title">{formatDateTime(tooltipData.date)}</div>
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
								<span class="candlestick-chart-tooltip-value">{formatPrice(tooltipData.close)}</span
								>
							</div>
							<div class="candlestick-chart-tooltip-row candlestick-chart-tooltip-change">
								<span class="candlestick-chart-tooltip-label">Change:</span>
								<span
									class={cn(
										'candlestick-chart-tooltip-value',
										tooltipChange.value >= 0 ? 'is-bullish' : 'is-bearish'
									)}
								>
									{tooltipChange.value >= 0 ? '+' : ''}{formatPrice(tooltipChange.value)} ({tooltipChange.percent >=
									0
										? '+'
										: ''}{tooltipChange.percent.toFixed(2)}%)
								</span>
							</div>
							{#if !hideVolume && tooltipData.volume}
								<div class="candlestick-chart-tooltip-row candlestick-chart-tooltip-volume">
									<span class="candlestick-chart-tooltip-label">Volume:</span>
									<span class="candlestick-chart-tooltip-value"
										>{formatNumber(tooltipData.volume)}</span
									>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		{/if}
	{/if}
</div>
