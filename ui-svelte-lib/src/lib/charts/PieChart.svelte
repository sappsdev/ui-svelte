<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount, untrack, type Snippet } from 'svelte';

	type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';
	type Size = 'sm' | 'md' | 'lg' | 'xl';
	type LegendPosition = 'top' | 'right' | 'bottom' | 'left' | 'none';
	type Palette = 'default' | 'rainbow' | 'ocean' | 'sunset' | 'forest' | 'neon';

	type Slice = DataPoint & {
		startAngle: number;
		endAngle: number;
		midAngle: number;
		percentage: number;
		color: Color;
		index: number;
	};

	type DataPoint = {
		label: string;
		value: number;
		color?: Color;
		disabled?: boolean;
	};

	type Props = {
		data?: DataPoint[];
		donut?: boolean;
		donutWidth?: number;
		size?: Size;
		palette?: Palette;
		legendPosition?: LegendPosition;
		centerLabel?: string;
		centerValue?: string | number;
		startAngle?: number;
		padAngle?: number;
		disableAnimation?: boolean;
		animationDuration?: number;
		showGlow?: boolean;
		showGradient?: boolean;
		hideLabels?: boolean;
		hideValues?: boolean;
		hideLegend?: boolean;
		hidePercentages?: boolean;
		loading?: boolean;
		empty?: boolean;
		emptyText?: string;
		rootClass?: string;
		chartClass?: string;
		valueFormatter?: (value: number) => string;
		onClick?: (slice: DataPoint, index: number) => void;
		onHover?: (slice: DataPoint | null, index: number) => void;
		selected?: number[];
		centerContent?: Snippet;
		tooltipContent?: Snippet<[{ slice: Slice; percentage: number }]>;
	};

	let {
		data = [],
		donut = false,
		donutWidth = 60,
		size = 'md',
		palette,
		legendPosition = 'right',
		centerLabel = 'Total',
		centerValue = undefined,
		startAngle = -90,
		padAngle = 0,
		disableAnimation = false,
		animationDuration = 800,
		showGlow = false,
		showGradient = false,
		hideLabels = false,
		hideValues = false,
		hideLegend = false,
		hidePercentages = false,
		loading = false,
		empty = false,
		emptyText = 'No data available',
		rootClass,
		chartClass,
		valueFormatter,
		onClick,
		onHover,
		selected = [],
		centerContent,
		tooltipContent
	}: Props = $props();

	const sizePresets: Record<Size, { height: number; labelSize: number; valueSize: number }> = {
		sm: { height: 150, labelSize: 10, valueSize: 18 },
		md: { height: 224, labelSize: 12, valueSize: 24 },
		lg: { height: 300, labelSize: 14, valueSize: 32 },
		xl: { height: 400, labelSize: 16, valueSize: 40 }
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

	function getSliceColor(item: DataPoint, index: number): Color {
		if (item.color) return item.color;
		if (palette) {
			const paletteColors = colorPalettes[palette];
			return paletteColors[index % paletteColors.length];
		}
		return colorPalettes.default[index % colorPalettes.default.length];
	}

	function formatValue(value: number): string {
		if (valueFormatter) return valueFormatter(value);
		return String(value);
	}

	let containerEl: HTMLDivElement | undefined = $state();
	let containerSize = $state({ width: 0, height: 0 });
	let animationFrameId: number | null = null;

	let tooltipData = $state<Slice | null>(null);
	let tooltipPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isTooltipActive = $state(false);
	let hoveredIndex = $state<number | null>(null);

	let sizeConfig = $derived(sizePresets[size]);
	let effectiveHeight = $derived(sizeConfig.height);

	let width = $derived(containerSize.width || effectiveHeight);
	let height = $derived(containerSize.height || effectiveHeight);
	let viewBoxSize = $derived(Math.min(width, height) || effectiveHeight);

	let total = $derived(data.reduce((sum, d) => sum + d.value, 0));

	// svelte-ignore state_referenced_locally
	let displayPercentages = $state<number[]>(data.map(() => 0));

	let slices = $derived.by((): Slice[] => {
		const startRad = (startAngle * Math.PI) / 180;
		let currentAngle = startRad;
		const padRad = (padAngle * Math.PI) / 180;

		return data.map((d, i) => {
			const percentage = total > 0 ? (d.value / total) * 100 : 0;
			const angle = total > 0 ? (d.value / total) * 2 * Math.PI - padRad : 0;
			const sliceStartAngle = currentAngle;
			const sliceEndAngle = currentAngle + angle;
			const midAngle = sliceStartAngle + angle / 2;

			currentAngle = sliceEndAngle + padRad;

			return {
				...d,
				startAngle: sliceStartAngle,
				endAngle: sliceEndAngle,
				midAngle,
				percentage,
				color: getSliceColor(d, i),
				index: i
			};
		});
	});

	let gradientIds = $derived(
		data.map((_, i) => `pie-gradient-${i}-${Math.random().toString(36).slice(2, 9)}`)
	);

	function createArc(
		startAngle: number,
		endAngle: number,
		innerRadius: number,
		outerRadius: number
	): string {
		const x1 = Math.cos(startAngle) * outerRadius;
		const y1 = Math.sin(startAngle) * outerRadius;
		const x2 = Math.cos(endAngle) * outerRadius;
		const y2 = Math.sin(endAngle) * outerRadius;

		const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

		let path = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}`;

		if (innerRadius > 0) {
			const x3 = Math.cos(endAngle) * innerRadius;
			const y3 = Math.sin(endAngle) * innerRadius;
			const x4 = Math.cos(startAngle) * innerRadius;
			const y4 = Math.sin(startAngle) * innerRadius;

			path += ` L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
		} else {
			path += ' L 0 0 Z';
		}

		return path;
	}

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
		const targetPercentages = slices.map((s) => s.percentage / 100);

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

	function handleSliceHover(slice: Slice, event: MouseEvent): void {
		if (slice.disabled) return;

		const target = event.target as SVGPathElement;
		const rect = target.getBoundingClientRect();

		tooltipData = slice;
		tooltipPosition = {
			x: rect.left + rect.width / 2,
			y: rect.top - 10
		};
		isTooltipActive = true;
		hoveredIndex = slice.index;

		if (onHover) {
			onHover(slice, slice.index);
		}
	}

	function handleSliceLeave(): void {
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

	function handleSliceClick(slice: Slice): void {
		if (onClick && !slice.disabled) {
			onClick(slice, slice.index);
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

	let responsiveLabelFontSize = $derived(() => {
		const baseSize = 300;
		const scale = viewBoxSize / baseSize;
		return Math.max(8, Math.min(sizeConfig.labelSize * scale, sizeConfig.labelSize));
	});

	let responsiveValueFontSize = $derived(() => {
		const baseSize = 300;
		const scale = viewBoxSize / baseSize;
		return Math.max(14, Math.min(sizeConfig.valueSize * scale, sizeConfig.valueSize));
	});

	let shouldShowCenterText = $derived(viewBoxSize >= 100);

	let computedCenterValue = $derived(() => {
		const val = centerValue ?? total;
		return valueFormatter && typeof val === 'number' ? valueFormatter(val) : val;
	});
</script>

<div class={cn('pie-chart-container', `is-${size}`, containerLayoutClass(), rootClass)}>
	{#if loading}
		<div class="pie-chart-loading">
			<svg class="pie-chart-loading-spinner" viewBox="0 0 24 24">
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
	{:else if empty || data.length === 0}
		<div class="pie-chart-empty">
			<svg class="pie-chart-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
				/>
			</svg>
			<span>{emptyText}</span>
		</div>
	{:else}
		<div bind:this={containerEl} class={cn('pie-chart', `is-${size}`, chartClass)}>
			<svg class="pie-chart-svg" viewBox="0 0 {viewBoxSize} {viewBoxSize}">
				{#if showGradient}
					<defs>
						{#each slices as slice, i}
							<linearGradient id={gradientIds[i]} x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" style="stop-color:var(--color-{slice.color})" />
								<stop
									offset="100%"
									style="stop-color:var(--color-{slice.color}-dark, var(--color-{slice.color}))"
								/>
							</linearGradient>
						{/each}
					</defs>
				{/if}

				{#if slices.length > 0}
					{@const centerX = viewBoxSize / 2}
					{@const centerY = viewBoxSize / 2}
					{@const radius = viewBoxSize / 2 - 10}
					{@const innerRadius = donut ? radius - donutWidth : 0}

					<g transform="translate({centerX}, {centerY})">
						{#each slices as slice, i}
							{@const isSelected = selected.includes(i)}
							{@const isHovered = hoveredIndex === i}
							{@const isDisabled = slice.disabled}
							{@const labelRadius = donut ? radius - donutWidth / 2 : radius * 0.65}
							{@const labelX = Math.cos(slice.midAngle) * labelRadius}
							{@const labelY = Math.sin(slice.midAngle) * labelRadius}

							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<path
								d={createArc(slice.startAngle, slice.endAngle, innerRadius, radius)}
								class={cn(
									'pie-chart-slice',
									colorClass[slice.color],
									isSelected && 'is-selected',
									showGlow && 'has-glow',
									isHovered && 'is-hovered',
									isDisabled && 'is-disabled'
								)}
								style={showGradient ? `fill: url(#${gradientIds[i]});` : ''}
								onmouseenter={(e) => handleSliceHover(slice, e)}
								onmouseleave={handleSliceLeave}
								onclick={() => handleSliceClick(slice)}
							/>

							{#if !hideLabels && slice.percentage > 5}
								<text
									x={labelX}
									y={labelY}
									class="pie-chart-slice-label"
									text-anchor="middle"
									dominant-baseline="middle"
									style="font-size: {responsiveLabelFontSize()}px;"
								>
									{#if !hidePercentages}
										{slice.percentage.toFixed(1)}%
									{:else if !hideValues}
										{formatValue(slice.value)}
									{/if}
								</text>
							{/if}
						{/each}

						{#if donut && shouldShowCenterText}
							{#if centerContent}
								<foreignObject
									x={-innerRadius * 0.7}
									y={-innerRadius * 0.4}
									width={innerRadius * 1.4}
									height={innerRadius * 0.8}
								>
									<div class="pie-chart-center-custom">
										{@render centerContent()}
									</div>
								</foreignObject>
							{:else}
								<text
									x="0"
									y="-8"
									class="pie-chart-center-value"
									text-anchor="middle"
									dominant-baseline="middle"
									style="font-size: {responsiveValueFontSize()}px;"
								>
									{computedCenterValue()}
								</text>
								<text
									x="0"
									y="12"
									class="pie-chart-center-label"
									text-anchor="middle"
									dominant-baseline="middle"
									style="font-size: {responsiveLabelFontSize()}px;"
								>
									{centerLabel}
								</text>
							{/if}
						{/if}
					</g>
				{/if}
			</svg>
		</div>

		{#if tooltipData && isTooltipActive}
			<div
				class="pie-chart-tooltip"
				style="left: {tooltipPosition.x}px; top: {tooltipPosition.y}px;"
			>
				{#if tooltipContent}
					{@render tooltipContent({ slice: tooltipData, percentage: tooltipData.percentage })}
				{:else}
					<div class="pie-chart-tooltip-content">
						<div class="pie-chart-tooltip-title">{tooltipData.label}</div>
						<div class="pie-chart-tooltip-row">
							<div class="pie-chart-tooltip-color is-{tooltipData.color}"></div>
							<span class="pie-chart-tooltip-value">
								{formatValue(tooltipData.value)} ({tooltipData.percentage.toFixed(1)}%)
							</span>
						</div>
					</div>
				{/if}
			</div>
		{/if}

		{#if !hideLegend && legendPosition !== 'none'}
			<div class={cn('pie-chart-legend', legendLayoutClass())}>
				{#each slices as slice, i}
					{@const isSelected = selected.includes(i)}
					<div
						class={cn('pie-chart-legend-item', isSelected && 'is-selected')}
						onclick={() => handleSliceClick(slice)}
						onkeydown={(e) => e.key === 'Enter' && handleSliceClick(slice)}
						role="button"
						tabindex="0"
					>
						<div class={cn('pie-chart-legend-color', colorClass[slice.color])}></div>
						<span>{slice.label}</span>
						{#if !hideValues}
							<span class="pie-chart-legend-value">
								({formatValue(slice.value)})
							</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>
