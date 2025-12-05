<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';

	type Slice = DataPoint & {
		startAngle: number;
		endAngle: number;
		midAngle: number;
		percentage: number;
		color: Color;
	};

	type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';

	type DataPoint = {
		label: string;
		value: number;
		color?: Color;
	};

	type Props = {
		data?: DataPoint[];
		colors?: Color[];
		donut?: boolean;
		donutWidth?: number;
		showLabels?: boolean;
		showValues?: boolean;
		showLegend?: boolean;
		showPercentages?: boolean;
		centerLabel?: string;
		centerValue?: string | number;
		startAngle?: number;
		padAngle?: number;
		loading?: boolean;
		empty?: boolean;
		emptyText?: string;
		class?: string;
		chartClass?: string;
	};

	let {
		data = [],
		colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'muted'] as Color[],
		donut = false,
		donutWidth = 60,
		showLabels = true,
		showValues = true,
		showLegend = true,
		showPercentages = true,
		centerLabel = 'Total',
		centerValue = undefined,
		startAngle = -90,
		padAngle = 0,
		loading = false,
		empty = false,
		emptyText = 'No data available',
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
	let containerSize = $state({ width: 0, height: 0 });

	let width = $derived(containerSize.width);
	let height = $derived(containerSize.height);

	let total = $derived(data.reduce((sum, d) => sum + d.value, 0));

	let slices = $derived.by((): Slice[] => {
		const startRad = (startAngle * Math.PI) / 180;
		let currentAngle = startRad;
		const padRad = (padAngle * Math.PI) / 180;

		return data.map((d, i) => {
			const percentage = (d.value / total) * 100;
			const angle = (d.value / total) * 2 * Math.PI - padRad;
			const startAngle = currentAngle;
			const endAngle = currentAngle + angle;
			const midAngle = startAngle + angle / 2;

			currentAngle = endAngle + padRad;

			return {
				...d,
				startAngle,
				endAngle,
				midAngle,
				percentage,
				color: d.color || colors[i % colors.length]
			};
		});
	});

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

	let tooltipData = $state<Slice | null>(null);
	let tooltipPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isTooltipActive = $state(false);

	function handleSliceHover(slice: Slice, event: MouseEvent): void {
		const target = event.target as SVGPathElement;
		const rect = target.getBoundingClientRect();

		tooltipData = slice;
		tooltipPosition = {
			x: rect.right + 8,
			y: rect.top + rect.height / 2
		};
		isTooltipActive = true;
	}

	function handleSliceLeave(): void {
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

<div class={cn('pie-chart-container', className)}>
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
		<div bind:this={containerEl} class={cn('pie-chart', chartClass)}>
			<svg class="pie-chart-svg">
				{#if slices.length > 0}
					{@const centerX = width / 2}
					{@const centerY = height / 2}
					{@const radius = Math.min(width, height) / 2}
					{@const innerRadius = donut ? radius - donutWidth : 0}

					<g transform="translate({centerX}, {centerY})">
						{#each slices as slice}
							{@const labelRadius = donut ? radius - donutWidth / 2 : radius * 0.7}
							{@const labelX = Math.cos(slice.midAngle) * labelRadius}
							{@const labelY = Math.sin(slice.midAngle) * labelRadius}

							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<path
								d={createArc(slice.startAngle, slice.endAngle, innerRadius, radius)}
								class="pie-chart-slice is-{slice.color}"
								onmouseenter={(e) => handleSliceHover(slice, e)}
								onmouseleave={handleSliceLeave}
							/>

							{#if showLabels && slice.percentage > 5}
								<text
									x={labelX}
									y={labelY}
									class="pie-chart-slice-label"
									text-anchor="middle"
									dominant-baseline="middle"
								>
									{#if showPercentages}
										{slice.percentage.toFixed(1)}%
									{:else if showValues}
										{slice.value}
									{/if}
								</text>
							{/if}
						{/each}

						{#if donut}
							<text
								x="0"
								y="-5"
								class="pie-chart-center-value"
								text-anchor="middle"
								dominant-baseline="middle"
							>
								{centerValue ?? total}
							</text>
							<text
								x="0"
								y="15"
								class="pie-chart-center-label"
								text-anchor="middle"
								dominant-baseline="middle"
							>
								{centerLabel}
							</text>
						{/if}
					</g>
				{/if}
			</svg>
		</div>

		{#if tooltipData && isTooltipActive}
			<div
				class="pie-chart-tooltip"
				style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px;"
			>
				<div class="pie-chart-tooltip-content">
					<div class="pie-chart-tooltip-title">{tooltipData.label}</div>
					<div class="pie-chart-tooltip-row">
						<div class="pie-chart-tooltip-color is-{tooltipData.color}"></div>
						<span class="pie-chart-tooltip-value">
							{tooltipData.value} ({tooltipData.percentage.toFixed(1)}%)
						</span>
					</div>
				</div>
			</div>
		{/if}

		{#if showLegend}
			<div class="pie-chart-legend">
				{#each slices as slice}
					<div class="pie-chart-legend-item">
						<div class={cn('pie-chart-legend-color', colorClass[slice.color])}></div>
						<span>{slice.label}</span>
						{#if showValues}
							<span class="pie-chart-legend-value">({slice.value})</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>
