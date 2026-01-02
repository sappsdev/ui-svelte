<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount, untrack, type Snippet } from 'svelte';

	type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';
	type Size = 'sm' | 'md' | 'lg' | 'xl';
	type LegendPosition = 'top' | 'right' | 'bottom' | 'left' | 'none';
	type Linecap = 'round' | 'butt' | 'square';
	type Palette = 'default' | 'rainbow' | 'ocean' | 'sunset' | 'forest' | 'neon';

	type ArcData = {
		value: number;
		max?: number;
		color?: Color;
		gradient?: { from: string; to: string };
		label?: string;
		unit?: string;
		disabled?: boolean;
	};

	type Props = {
		data?: ArcData[];
		centerText?: string;
		centerValue?: string | number;
		thickness?: number;
		gap?: number;
		disableAnimation?: boolean;
		animationDuration?: number;
		loading?: boolean;
		empty?: boolean;
		emptyText?: string;
		hideLegend?: boolean;
		hideValues?: boolean;
		rootClass?: string;
		chartClass?: string;
		size?: Size;
		innerRadius?: number;
		outerRadius?: number;
		startAngle?: number;
		endAngle?: number;
		showGradient?: boolean;
		showGlow?: boolean;
		linecap?: Linecap;
		palette?: Palette;
		legendPosition?: LegendPosition;
		valueFormatter?: (value: number) => string;
		onClick?: (arc: ArcData, index: number) => void;
		onHover?: (arc: ArcData | null, index: number) => void;
		selected?: number[];
		showInlineLabels?: boolean;
		centerContent?: Snippet;
		tooltipContent?: Snippet<[{ arc: ArcData; percentage: number }]>;
	};

	let {
		data = [],
		centerText = '',
		centerValue = '',
		thickness = 16,
		gap = 8,
		disableAnimation = false,
		animationDuration = 1000,
		loading = false,
		empty = false,
		emptyText = 'No data',
		hideLegend = false,
		hideValues = false,
		rootClass,
		chartClass,
		size = 'md',
		innerRadius,
		outerRadius,
		startAngle = -90,
		endAngle = 270,
		showGradient = false,
		showGlow = false,
		linecap = 'round',
		palette,
		legendPosition = 'right',
		valueFormatter,
		onClick,
		onHover,
		selected = [],
		showInlineLabels = false,
		centerContent,
		tooltipContent
	}: Props = $props();

	const sizePresets: Record<
		Size,
		{ height: number; thickness: number; labelSize: number; valueSize: number }
	> = {
		sm: { height: 150, thickness: 12, labelSize: 10, valueSize: 20 },
		md: { height: 224, thickness: 16, labelSize: 14, valueSize: 32 },
		lg: { height: 300, thickness: 20, labelSize: 16, valueSize: 40 },
		xl: { height: 400, thickness: 24, labelSize: 18, valueSize: 48 }
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

	function getArcColor(arc: ArcData, index: number): Color {
		if (arc.color) return arc.color;
		if (palette) {
			const paletteColors = colorPalettes[palette];
			return paletteColors[index % paletteColors.length];
		}
		return colorPalettes.default[index % colorPalettes.default.length];
	}

	function formatValue(value: number, unit?: string): string {
		if (valueFormatter) return valueFormatter(value);
		if (unit) return `${value}${unit}`;
		return String(value);
	}

	let containerEl: HTMLDivElement | undefined = $state();
	// svelte-ignore state_referenced_locally
	let displayPercentages = $state<number[]>(data.map(() => 0));
	let animationFrameId: number | null = null;

	let tooltipData = $state<(ArcData & { percentage: number; index: number }) | null>(null);
	let tooltipPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isTooltipActive = $state(false);
	let hoveredIndex = $state<number | null>(null);

	let containerSize = $state({ width: 0, height: 0 });
	let sizeConfig = $derived(sizePresets[size]);
	let effectiveThickness = $derived(thickness || sizeConfig.thickness);
	let effectiveHeight = $derived(sizeConfig.height);

	let width = $derived(containerSize.width);
	let height = $derived(containerSize.height);
	let viewBoxSize = $derived(
		Math.min(containerSize.width, containerSize.height) || effectiveHeight
	);
	let center = $derived(viewBoxSize / 2);

	let responsiveThickness = $derived(() => {
		const baseSize = 300;
		const scale = viewBoxSize / baseSize;
		return Math.max(8, Math.min(effectiveThickness * scale, effectiveThickness));
	});

	let responsiveGap = $derived(() => {
		const baseSize = 300;
		const scale = viewBoxSize / baseSize;
		return Math.max(4, Math.min(gap * scale, gap));
	});

	let maxRadius = $derived(outerRadius || center - 20);

	let responsiveLabelFontSize = $derived(() => {
		const baseSize = 300;
		const scale = viewBoxSize / baseSize;
		return Math.max(10, Math.min(sizeConfig.labelSize * scale, sizeConfig.labelSize));
	});

	let responsiveValueFontSize = $derived(() => {
		const baseSize = 300;
		const scale = viewBoxSize / baseSize;
		return Math.max(16, Math.min(sizeConfig.valueSize * scale, sizeConfig.valueSize));
	});

	let shouldShowText = $derived(viewBoxSize >= 120);

	let computedCenterValue = $derived(() => {
		const val = centerValue || data.reduce((sum, arc) => sum + arc.value, 0);
		return valueFormatter && typeof val === 'number' ? valueFormatter(val) : val;
	});

	let totalMax = $derived(() => {
		if (data.length === 0) return 0;
		if (data.length === 1 && data[0].max !== undefined) {
			return data[0].max;
		}
		return data.reduce((sum, arc) => sum + (arc.max || arc.value), 0);
	});

	let angleRange = $derived(endAngle - startAngle);

	let gradientIds = $derived(
		data.map((_, i) => `arc-gradient-${i}-${Math.random().toString(36).slice(2, 9)}`)
	);

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
				hoveredIndex = null;
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
		const total = totalMax();
		const targetPercentages = data.map((arc) => {
			const max = data.length === 1 && arc.max !== undefined ? arc.max : total;
			return Math.min(Math.max(arc.value / max, 0), 1);
		});

		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		if (!disableAnimation) {
			const startTime = Date.now();
			const startPercentages = untrack(() => [...displayPercentages]);

			const animate = () => {
				const now = Date.now();
				const progress = Math.min((now - startTime) / animationDuration, 1);
				const easeProgress = 1 - Math.pow(1 - progress, 3);

				const newPercentages = startPercentages.map(
					(start, i) => start + ((targetPercentages[i] || 0) - start) * easeProgress
				);

				displayPercentages = newPercentages;

				if (progress < 1) {
					animationFrameId = requestAnimationFrame(animate);
				} else {
					animationFrameId = null;
				}
			};

			animationFrameId = requestAnimationFrame(animate);
		} else {
			displayPercentages = targetPercentages;
		}
	});

	function handleArcHover(
		arc: ArcData,
		percentage: number,
		index: number,
		event: MouseEvent
	): void {
		const target = event.target as SVGCircleElement;
		const rect = target.getBoundingClientRect();

		const max = data.length === 1 && arc.max !== undefined ? arc.max : totalMax();

		tooltipData = { ...arc, max, percentage: percentage * 100, index };
		tooltipPosition = {
			x: rect.left + rect.width / 2,
			y: rect.top - 10
		};
		isTooltipActive = true;
		hoveredIndex = index;

		if (onHover) {
			onHover(arc, index);
		}
	}

	function handleArcLeave(): void {
		isTooltipActive = false;
		hoveredIndex = null;

		if (onHover) {
			onHover(null, -1);
		}

		setTimeout(() => {
			if (!isTooltipActive) {
				tooltipData = null;
			}
		}, 100);
	}

	function handleArcClick(arc: ArcData, index: number): void {
		if (onClick && !arc.disabled) {
			onClick(arc, index);
		}
	}

	function getArcMidpoint(radius: number, percentage: number): { x: number; y: number } {
		const angle = startAngle + (angleRange * percentage) / 2;
		const radians = (angle * Math.PI) / 180;
		return {
			x: center + radius * Math.cos(radians),
			y: center + radius * Math.sin(radians)
		};
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
</script>

<div class={cn('arc-chart-container', `is-${size}`, containerLayoutClass(), rootClass)}>
	{#if loading}
		<div class="arc-chart-loading">
			<svg class="arc-chart-loading-spinner" viewBox="0 0 24 24">
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
	{:else if empty}
		<div class="arc-chart-empty">
			<span>{emptyText}</span>
		</div>
	{:else}
		<div bind:this={containerEl} class={cn('arc-chart', `is-${size}`, chartClass)}>
			<svg class="arc-chart-svg" viewBox="0 0 {viewBoxSize} {viewBoxSize}">
				{#if showGradient}
					<defs>
						{#each data as arc, i}
							{@const color = getArcColor(arc, i)}
							{#if arc.gradient}
								<linearGradient id={gradientIds[i]} x1="0%" y1="0%" x2="100%" y2="0%">
									<stop offset="0%" style="stop-color:{arc.gradient.from}" />
									<stop offset="100%" style="stop-color:{arc.gradient.to}" />
								</linearGradient>
							{:else}
								<linearGradient id={gradientIds[i]} x1="0%" y1="0%" x2="100%" y2="0%">
									<stop offset="0%" style="stop-color:var(--color-{color})" />
									<stop
										offset="100%"
										style="stop-color:var(--color-{color}-dark, var(--color-{color}))"
									/>
								</linearGradient>
							{/if}
						{/each}
					</defs>
				{/if}

				{#each data as arc, i}
					{@const currentThickness = responsiveThickness()}
					{@const currentGap = responsiveGap()}
					{@const radius = maxRadius - i * (currentThickness + currentGap)}
					{@const percentage = displayPercentages[i] || 0}
					{@const circumference = 2 * Math.PI * radius}
					{@const arcLength = (circumference * angleRange) / 360}
					{@const strokeDashoffset = arcLength * (1 - percentage)}
					{@const color = getArcColor(arc, i)}
					{@const isSelected = selected.includes(i)}
					{@const isHovered = hoveredIndex === i}
					{@const isDisabled = arc.disabled}

					<circle
						cx={center}
						cy={center}
						r={radius}
						class="arc-chart-background"
						stroke-width={currentThickness}
						stroke-linecap={linecap}
						style="
							transform: rotate({startAngle}deg);
							transform-origin: center;
							stroke-dasharray: {arcLength} {circumference};
						"
					/>

					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<circle
						cx={center}
						cy={center}
						r={radius}
						class={cn(
							'arc-chart-arc',
							colorClass[color],
							isSelected && 'is-selected',
							showGlow && 'has-glow',
							isHovered && 'is-hovered',
							isDisabled && 'is-disabled'
						)}
						stroke-width={currentThickness}
						stroke-linecap={linecap}
						style="
							stroke-dasharray: {arcLength};
							stroke-dashoffset: {strokeDashoffset};
							transform: rotate({startAngle}deg);
							transform-origin: center;
							{showGradient ? `stroke: url(#${gradientIds[i]});` : ''}
						"
						onmouseenter={(e) => handleArcHover(arc, percentage, i, e)}
						onmouseleave={handleArcLeave}
						onclick={() => handleArcClick(arc, i)}
					/>

					{#if showInlineLabels && arc.label && percentage > 0.1}
						{@const midpoint = getArcMidpoint(radius, percentage)}
						<text
							x={midpoint.x}
							y={midpoint.y}
							class="arc-chart-inline-label"
							text-anchor="middle"
							dominant-baseline="middle"
							style="font-size: {responsiveLabelFontSize() * 0.8}px;"
						>
							{arc.label}
						</text>
					{/if}
				{/each}

				{#if centerContent}
					<foreignObject x={center - 50} y={center - 30} width="100" height="60">
						<div class="arc-chart-center-custom">
							{@render centerContent()}
						</div>
					</foreignObject>
				{:else if (centerText || computedCenterValue()) && shouldShowText}
					<text
						x={center}
						y={center - 10}
						class="arc-chart-label"
						text-anchor="middle"
						dominant-baseline="middle"
						style="font-size: {responsiveLabelFontSize()}px; font-weight: 500;"
					>
						{centerText}
					</text>
					<text
						x={center}
						y={center + 15}
						class="arc-chart-value"
						text-anchor="middle"
						dominant-baseline="middle"
						style="font-size: {responsiveValueFontSize()}px;"
					>
						{computedCenterValue()}
					</text>
				{/if}
			</svg>
		</div>

		{#if tooltipData && isTooltipActive}
			<div
				class="arc-chart-tooltip"
				style="left: {tooltipPosition.x}px; top: {tooltipPosition.y}px;"
			>
				{#if tooltipContent}
					{@render tooltipContent({ arc: tooltipData, percentage: tooltipData.percentage })}
				{:else}
					<div class="arc-chart-tooltip-content">
						{#if tooltipData.label}
							<div class="arc-chart-tooltip-title">{tooltipData.label}</div>
						{/if}
						<div class="arc-chart-tooltip-row">
							<div
								class="arc-chart-tooltip-color is-{getArcColor(tooltipData, tooltipData.index)}"
							></div>
							<span class="arc-chart-tooltip-value">
								{formatValue(tooltipData.value, tooltipData.unit)} / {formatValue(
									tooltipData.max || 0,
									tooltipData.unit
								)} ({tooltipData.percentage.toFixed(1)}%)
							</span>
						</div>
					</div>
				{/if}
			</div>
		{/if}

		{#if !hideLegend && legendPosition !== 'none'}
			<div class={cn('arc-chart-legend', legendLayoutClass())}>
				{#each data as arc, i}
					{@const percentage = displayPercentages[i] || 0}
					{@const color = getArcColor(arc, i)}
					{@const max = data.length === 1 && arc.max !== undefined ? arc.max : totalMax()}
					{@const isSelected = selected.includes(i)}
					<div
						class={cn('arc-chart-legend-item', isSelected && 'is-selected')}
						onclick={() => handleArcClick(arc, i)}
						onkeydown={(e) => e.key === 'Enter' && handleArcClick(arc, i)}
						role="button"
						tabindex="0"
					>
						<div class={cn('arc-chart-legend-color', colorClass[color])}></div>
						<span>{arc.label || `Arc ${i + 1}`}</span>
						{#if !hideValues}
							<span class="arc-chart-legend-value">
								({formatValue(arc.value, arc.unit)}{#if max}
									/ {formatValue(max, arc.unit)}{/if})
							</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>
