<script lang="ts">
	import Button from '$lib/control/Button.svelte';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		value?: string;
		defaultValue?: string;
		placeholder?: string;
		type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
		class?: string;
		inputClass?: string;
		onchange?: (value: string | number | undefined) => void;
		oninput?: (value: string | number | undefined) => void;
		variant?: 'solid' | 'outlined' | 'soft' | 'line';
		color?: 'primary' | 'secondary' | 'muted';
		inputSize?: 'small' | 'medium' | 'large';
		name?: string;
		label?: string;
		labelOutside?: boolean;
		labelActive?: boolean;
		helpText?: string;
		errorText?: string;
		labels?: {
			weak?: string;
			medium?: string;
			strong?: string;
		};
	} & HTMLInputAttributes;

	let {
		value = $bindable(),
		defaultValue,
		placeholder,
		type = 'text',
		class: className,
		inputClass,
		onchange,
		oninput,
		variant = 'soft',
		color = 'primary',
		inputSize = 'medium',
		name,
		label,
		labelOutside,
		labelActive,
		helpText,
		errorText,
		labels = {
			weak: 'Weak',
			medium: 'Medium',
			strong: 'Strong'
		},
		...rest
	}: Props = $props();

	const variants = {
		solid: 'field-solid',
		outlined: 'field-outlined',
		soft: 'field-soft',
		line: 'field-line'
	};
	const colors = {
		primary: 'field-primary',
		secondary: 'field-secondary',
		muted: 'field-muted'
	};

	const sizes = {
		small: 'field-small',
		medium: 'field-medium',
		large: 'field-large'
	};

	const uid = $props.id();

	let show = $state(false);
	let isFocused = $state(false);
	let strength = $derived(calculateStrength(value));

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

<div class={cn('field', className)}>
	{#if labelOutside && label}
		<label for={`${uid}-{name}`} class="label">{label}</label>
	{/if}
	<div
		class={cn('field-control', variants[variant], colors[color], sizes[inputSize])}
		class:is-error={errorText}
	>
		{#if !labelOutside && label}
			<label class:is-active={isFocused || value} for={`${uid}-{name}`} class="label-inside"
				>{label}</label
			>
		{/if}
		<input
			type={show ? 'text' : 'password'}
			bind:value
			id={`${uid}-{name}`}
			class={cn('field-input', inputClass)}
			placeholder={isFocused ? placeholder : ''}
			{name}
			{defaultValue}
			onchange={(e) => onchange?.((e.target as HTMLInputElement).value)}
			oninput={(e) => oninput?.((e.target as HTMLInputElement).value)}
			onfocusin={() => {
				if (!labelActive) isFocused = true;
			}}
			onfocusout={() => {
				if (!labelActive) isFocused = false;
			}}
			{...rest}
		/>
		<Button class={cn('field-eye')} onclick={() => (show = !show)}>eye icon</Button>
	</div>
	<div class={cn('field-strength', className)}>
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
	{#if errorText || helpText || strength.label}
		<div
			class={cn('field-help', strength.label && 'field-strength-label', errorText && 'is-error')}
		>
			{strength.label ? strength.label : errorText ? errorText : helpText}
		</div>
	{/if}
</div>
