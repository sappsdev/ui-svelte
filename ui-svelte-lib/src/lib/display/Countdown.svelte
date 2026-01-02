<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';

	type Props = {
		targetDate: Date;
		showDays?: boolean;
		showHours?: boolean;
		showMinutes?: boolean;
		showSeconds?: boolean;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		color?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'success'
			| 'info'
			| 'warning'
			| 'danger'
			| 'surface';
		variant?: 'solid' | 'soft' | 'outlined' | 'ghost';
		labels?: {
			days?: string;
			hours?: string;
			minutes?: string;
			seconds?: string;
		};
		onComplete?: () => void;
		class?: string;
	};

	const {
		targetDate,
		showDays = true,
		showHours = true,
		showMinutes = true,
		showSeconds = true,
		size = 'md',
		color = 'primary',
		variant = 'solid',
		labels = {
			days: 'Days',
			hours: 'Hours',
			minutes: 'Minutes',
			seconds: 'Seconds'
		},
		onComplete,
		class: className
	}: Props = $props();

	let days = $state(0);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);
	let isComplete = $state(false);

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning',
		surface: 'is-surface'
	};

	const variants = {
		solid: 'is-solid',
		soft: 'is-soft',
		outlined: 'is-outlined',
		ghost: 'is-ghost'
	};

	const sizes = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg',
		xl: 'is-xl'
	};

	function padNumber(num: number): string {
		return num.toString().padStart(2, '0');
	}

	function calculateTimeRemaining() {
		const now = new Date().getTime();
		const target = targetDate.getTime();
		const difference = target - now;

		if (difference <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
			if (!isComplete) {
				isComplete = true;
				onComplete?.();
			}
			return;
		}

		days = Math.floor(difference / (1000 * 60 * 60 * 24));
		hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((difference % (1000 * 60)) / 1000);
	}

	onMount(() => {
		calculateTimeRemaining();
		const interval = setInterval(calculateTimeRemaining, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class={cn('countdown', colors[color], variants[variant], sizes[size], className)}>
	{#if showDays}
		<div class="countdown-unit">
			<div class="countdown-box">
				<span class="countdown-digit">{padNumber(days)}</span>
			</div>
			{#if labels?.days}
				<span class="countdown-label">{labels.days}</span>
			{/if}
		</div>
	{/if}

	{#if showHours}
		{#if showDays}
			<span class="countdown-separator">:</span>
		{/if}
		<div class="countdown-unit">
			<div class="countdown-box">
				<span class="countdown-digit">{padNumber(hours)}</span>
			</div>
			{#if labels?.hours}
				<span class="countdown-label">{labels.hours}</span>
			{/if}
		</div>
	{/if}

	{#if showMinutes}
		{#if showHours}
			<span class="countdown-separator">:</span>
		{/if}
		<div class="countdown-unit">
			<div class="countdown-box">
				<span class="countdown-digit">{padNumber(minutes)}</span>
			</div>
			{#if labels?.minutes}
				<span class="countdown-label">{labels.minutes}</span>
			{/if}
		</div>
	{/if}

	{#if showSeconds}
		{#if showMinutes}
			<span class="countdown-separator">:</span>
		{/if}
		<div class="countdown-unit">
			<div class="countdown-box">
				<span class="countdown-digit">{padNumber(seconds)}</span>
			</div>
			{#if labels?.seconds}
				<span class="countdown-label">{labels.seconds}</span>
			{/if}
		</div>
	{/if}
</div>
