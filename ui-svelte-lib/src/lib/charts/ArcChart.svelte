<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount, untrack } from 'svelte';

	type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';

	type ArcData = {
		value: number;
		max?: number;
		color: Color;
		label?: string;
	};

	type Props = {
		data?: ArcData[];
		centerText?: string;
		centerValue?: string | number;
		thickness?: number;
		gap?: number;
		animated?: boolean;
		animationDuration?: number;
		loading?: boolean;
		empty?: boolean;
		emptyText?: string;
		showLegend?: boolean;
		showValues?: boolean;
		class?: string;
		chartClass?: string;
	};

	let {
		data = [],
		centerText = '',
		centerValue = '',
		thickness = 16,
		gap = 8,
		animated = true,
		animationDuration = 1000,
		loading = false,
		empty = false,
		emptyText = 'No data',
		showLegend = true,
		showValues = true,
		class: className,
		chartClass
	}: Props = $props();

	const colorClass = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger',
		muted: 'is-muted'
	};

	let containerEl: HTMLDivElement | undefined = $state();
	let displayPercentages = $state<number[]>(data.map(() => 0));
	let animationFrameId: number | null = null;

	let tooltipData = $state<(ArcData & { percentage: number }) | null>(null);
	let tooltipPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isTooltipActive = $state(false);

	let containerSize = $state({ width: 0, height: 0 });
	let width = $derived(containerSize.width);
	let height = $derived(containerSize.height);
	let size = $derived(Math.min(containerSize.width, containerSize.height));
	let viewBoxSize = $derived(size);
	let center = $derived(viewBoxSize / 2);

	let responsiveThickness = $derived(() => {
		const baseSize = 300;
		const scale = size / baseSize;
		return Math.max(8, Math.min(thickness * scale, thickness));
	});

	let responsiveGap = $derived(() => {
		const baseSize = 300;
		const scale = size / baseSize;
		return Math.max(4, Math.min(gap * scale, gap));
	});

	let maxRadius = $derived(center - 20);

	let responsiveLabelFontSize = $derived(() => {
		const baseSize = 300;
		const scale = size / baseSize;
		return Math.max(10, Math.min(14 * scale, 14));
	});

	let responsiveValueFontSize = $derived(() => {
		const baseSize = 300;
		const scale = size / baseSize;
		return Math.max(16, Math.min(32 * scale, 32));
	});

	let shouldShowText = $derived(size >= 120);

	let computedCenterValue = $derived(centerValue || data.reduce((sum, arc) => sum + arc.value, 0));

	let totalMax = $derived(() => {
		if (data.length === 0) return 0;
		if (data.length === 1 && data[0].max !== undefined) {
			return data[0].max;
		}
		return data.reduce((sum, arc) => sum + (arc.max || arc.value), 0);
	});

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
			if (animationFrameId !== null) {
				cancelAnimationFrame(animationFrameId);
			}
			resizeObserver.disconnect();
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

		if (animated) {
			const startTime = Date.now();
			const startPercentages = untrack(() => [...displayPercentages]);

			const animate = () => {
				const now = Date.now();
				const progress = Math.min((now - startTime) / animationDuration, 1);
				const easeProgress = 1 - Math.pow(1 - progress, 3);

				const newPercentages = startPercentages.map(
					(start, i) => start + (targetPercentages[i] - start) * easeProgress
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

	function handleArcHover(arc: ArcData, percentage: number, event: MouseEvent): void {
		const target = event.target as SVGCircleElement;
		const rect = target.getBoundingClientRect();

		const max = data.length === 1 && arc.max !== undefined ? arc.max : totalMax();

		tooltipData = { ...arc, max, percentage: percentage * 100 };
		tooltipPosition = {
			x: rect.left + rect.width / 2,
			y: rect.top - 10
		};
		isTooltipActive = true;
	}

	function handleArcLeave(): void {
		isTooltipActive = false;
		setTimeout(() => {
			if (!isTooltipActive) {
				tooltipData = null;
			}
		}, 100);
	}
</script>

<div class={cn('arc-chart-container', className)}>
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
		<div bind:this={containerEl} class={cn('arc-chart', chartClass)}>
			<svg class="arc-chart-svg" viewBox="0 0 {viewBoxSize} {viewBoxSize}">
				{#each data as arc, i}
					{@const currentThickness = responsiveThickness()}
					{@const currentGap = responsiveGap()}
					{@const radius = maxRadius - i * (currentThickness + currentGap)}
					{@const percentage = displayPercentages[i]}
					{@const circumference = 2 * Math.PI * radius}
					{@const strokeDashoffset = circumference * (1 - percentage)}

					<circle
						cx={center}
						cy={center}
						r={radius}
						class="arc-chart-background"
						stroke-width={currentThickness}
					/>

					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<circle
						cx={center}
						cy={center}
						r={radius}
						class="arc-chart-arc is-{arc.color}"
						stroke-width={currentThickness}
						style="
							stroke-dasharray: {circumference};
							stroke-dashoffset: {strokeDashoffset};
							transform: rotate(-90deg);
							transform-origin: center;
						"
						onmouseenter={(e) => handleArcHover(arc, percentage, e)}
						onmouseleave={handleArcLeave}
					/>
				{/each}

				{#if (centerText || computedCenterValue) && shouldShowText}
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
						{computedCenterValue}
					</text>
				{/if}
			</svg>
		</div>

		{#if tooltipData && isTooltipActive}
			<div
				class="arc-chart-tooltip"
				style="left: {tooltipPosition.x}px; top: {tooltipPosition.y}px;"
			>
				<div class="arc-chart-tooltip-content">
					{#if tooltipData.label}
						<div class="arc-chart-tooltip-title">{tooltipData.label}</div>
					{/if}
					<div class="arc-chart-tooltip-row">
						<div class="arc-chart-tooltip-color is-{tooltipData.color}"></div>
						<span class="arc-chart-tooltip-value">
							{tooltipData.value} / {tooltipData.max} ({tooltipData.percentage.toFixed(1)}%)
						</span>
					</div>
				</div>
			</div>
		{/if}

		{#if showLegend}
			<div class="arc-chart-legend">
				{#each data as arc, i}
					{@const percentage = displayPercentages[i]}
					{@const max = data.length === 1 && arc.max !== undefined ? arc.max : totalMax()}
					<div class="arc-chart-legend-item">
						<div class={cn('arc-chart-legend-color', colorClass[arc.color])}></div>
						<span>{arc.label || `Arc ${i + 1}`}</span>
						{#if showValues}
							<span class="arc-chart-legend-value">
								({arc.value}{#if max}
									/ {max}{/if})
							</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>
