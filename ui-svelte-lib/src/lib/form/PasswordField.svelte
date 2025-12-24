<script lang="ts">
	import IconButton from '$lib/control/IconButton.svelte';
	import { EyeOffRegularIcon, EyeShowRegularIcon } from '$lib/icons/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		value?: string;
		defaultValue?: string;
		placeholder?: string;
		rootClass?: string;
		controlClass?: string;
		onchange?: (value: string | number | undefined) => void;
		oninput?: (value: string | number | undefined) => void;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft' | 'outlined' | 'line';
		size?: 'sm' | 'md' | 'lg';
		name?: string;
		label?: string;
		islabelActive?: boolean;
		helpText?: string;
		errorText?: string;
		labels?: {
			weak?: string;
			medium?: string;
			strong?: string;
		};
		isFloatLabel?: boolean;
		hideStrength?: boolean;
	};

	let {
		value = $bindable(),
		defaultValue,
		placeholder,
		rootClass,
		controlClass,
		onchange,
		oninput,
		variant = 'outlined',
		color = 'muted',
		size = 'md',
		name,
		label,
		isFloatLabel,
		islabelActive,
		helpText,
		errorText,
		labels = {
			weak: 'Weak',
			medium: 'Medium',
			strong: 'Strong'
		},
		hideStrength
	}: Props = $props();

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning'
	};

	const variants = {
		solid: 'is-solid',
		soft: 'is-soft',
		outlined: 'is-outlined',
		line: 'is-line'
	};

	const btnVariants = {
		solid: 'solid',
		soft: 'ghost',
		outlined: 'ghost',
		line: 'ghost'
	};

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const btnSizes = {
		sm: 'xs',
		md: 'sm',
		lg: 'md'
	};

	const uid = $props.id();

	let isActive = $state(false);

	let show = $state(false);
	let isFocused = $state(false);
	let strength = $derived(calculateStrength(value as string));

	function isBarActive(barIndex: number, score: number): boolean {
		const threshold = (barIndex + 1) * 1.5;
		return score >= threshold;
	}

	function calculateStrength(password: string): {
		score: number;
		label: string;
		color: string;
	} {
		if (hideStrength) return { score: 0, label: '', color: 'bg-muted' };
		if (!password) return { score: 0, label: '', color: 'bg-muted' };

		let score = 0;

		if (password.length >= 8) score += 1;
		if (password.length >= 12) score += 1;
		if (/[a-z]/.test(password)) score += 1;
		if (/[A-Z]/.test(password)) score += 1;
		if (/\d/.test(password)) score += 1;
		if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
		if (score <= 2) return { score, label: labels.weak || 'Weak', color: 'bg-danger' };
		if (score <= 4)
			return {
				score,
				label: labels.medium || 'Medium',
				color: 'bg-warning'
			};
		return {
			score,
			label: labels.strong || 'Strong',
			color: 'bg-success'
		};
	}
</script>

<div class={cn('field', rootClass)}>
	{#if !isFloatLabel && label}
		<span class="field-label">{label}</span>
	{/if}
	<label
		class={cn(
			'control',
			colors[color],
			variants[variant],
			sizeClasses[size],
			isFloatLabel && 'is-float',
			(isActive || isFocused) && 'is-active',
			controlClass
		)}
		for={`${uid}-{name}`}
		class:is-error={errorText}
		onmouseenter={() => (isActive = true)}
		onmouseleave={() => (isActive = false)}
	>
		{#if isFloatLabel && label}
			<span
				class={cn(
					'control-label',
					(isActive || isFocused || islabelActive || value !== '') && 'is-active'
				)}
			>
				{label}
			</span>
		{/if}
		<input
			type={show ? 'text' : 'password'}
			bind:value
			id={`${uid}-{name}`}
			class={cn(
				'control-input',
				isFloatLabel && !isActive && !isFocused && value == '' && 'invisible',
				controlClass
			)}
			{placeholder}
			{name}
			onchange={(e) => onchange?.((e.target as HTMLInputElement).value)}
			oninput={(e) => oninput?.((e.target as HTMLInputElement).value)}
			onfocusin={() => (isFocused = true)}
			onfocusout={() => (isFocused = false)}
		/>
		<IconButton
			size={btnSizes[size] as any}
			icon={show ? EyeShowRegularIcon : EyeOffRegularIcon}
			{color}
			variant={btnVariants[variant] as any}
			onclick={() => (show = !show)}
		/>
	</label>
	{#if !hideStrength}
		<div class={cn('field-strength')}>
			<div class="field-strength-bars">
				{#each Array(4) as _, i}
					<div
						class="field-strength-bar-item"
						class:active={isBarActive(i, strength.score)}
						class:weak={strength.score <= 2 && isBarActive(i, strength.score)}
						class:medium={strength.score > 2 &&
							strength.score <= 4 &&
							isBarActive(i, strength.score)}
						class:strong={strength.score > 4 && isBarActive(i, strength.score)}
					></div>
				{/each}
			</div>
			{#if strength.label}
				<span class="field-strength-label">{strength.label}</span>
			{/if}
		</div>
	{/if}

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-danger')}>
			{errorText || helpText}
		</div>
	{/if}
</div>
