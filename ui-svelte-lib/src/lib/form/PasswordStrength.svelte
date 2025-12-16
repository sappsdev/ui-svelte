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
		variant?: 'primary' | 'secondary' | 'muted' | 'outlined' | 'line';
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
		isSolid?: boolean;
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
		isSolid
	}: Props = $props();

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		outlined: 'is-outlined',
		line: 'is-line'
	};

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
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
		if (!password) return { score: 0, label: '', color: 'bg-gray-300' };

		let score = 0;

		if (password.length >= 8) score += 1;
		if (password.length >= 12) score += 1;
		if (/[a-z]/.test(password)) score += 1;
		if (/[A-Z]/.test(password)) score += 1;
		if (/\d/.test(password)) score += 1;
		if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
		if (score <= 2) return { score, label: labels.weak || 'Weak', color: 'bg-red-500' };
		if (score <= 4)
			return {
				score,
				label: labels.medium || 'Medium',
				color: 'bg-yellow-500'
			};
		return {
			score,
			label: labels.strong || 'Strong',
			color: 'bg-green-500'
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
			variantClasses[variant],
			sizeClasses[size],
			isSolid && 'is-solid',
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
			variant="ghost"
			size="sm"
			icon={show ? EyeShowRegularIcon : EyeOffRegularIcon}
			onclick={() => (show = !show)}
		/>
	</label>
	<div class={cn('field-strength')}>
		<div class="field-strength-bars">
			{#each Array(4) as _, i}
				<div
					class="field-strength-bar-item"
					class:active={isBarActive(i, strength.score)}
					class:weak={strength.score <= 2 && isBarActive(i, strength.score)}
					class:medium={strength.score > 2 && strength.score <= 4 && isBarActive(i, strength.score)}
					class:strong={strength.score > 4 && isBarActive(i, strength.score)}
				></div>
			{/each}
		</div>
	</div>
	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-danger')}>
			{errorText || helpText}
		</div>
	{/if}
</div>
