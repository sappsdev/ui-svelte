<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		min?: number;
		max?: number;
		step?: number;
		value?: number;
		onchange?: (value: number) => void;
		size?: 'sm' | 'md' | 'lg';
		label?: string;
		color?: 'primary' | 'secondary' | 'muted';
		name?: string;
		hideLabel?: boolean;
	};
	let {
		value = $bindable(),
		label,
		min = 0,
		max = 100,
		step,
		onchange,
		size = 'md',
		color = 'primary',
		name,
		hideLabel
	}: Props = $props();

	let progressPercentage = $derived(((value! - min) / (max - min)) * 100);

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted'
	};

	const sizes = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};
</script>

<div class="slider-wrapper">
	<div class="slider-info" hidden={hideLabel}>
		<span>{label}</span>
		<span>{value}</span>
	</div>
	<input
		type="range"
		{min}
		{max}
		{step}
		{name}
		bind:value
		onchange={(e) => onchange?.((e.target as HTMLInputElement).valueAsNumber)}
		class={cn('slider', sizes[size], colors[color])}
		style="--slider-progress: {progressPercentage}%"
	/>
</div>
