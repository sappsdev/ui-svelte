<script lang="ts">
	import { Icon, type IconData } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		el?: HTMLInputElement;
		value?: string | number;
		defaultValue?: string;
		placeholder?: string;
		type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
		rootClass?: string;
		controlClass?: string;
		startIcon?: IconData;
		endIcon?: IconData;
		startText?: string | Snippet;
		endText?: string | Snippet;
		onchange?: (value: unknown) => void;
		oninput?: (value: unknown) => void;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft' | 'outlined' | 'line';
		size?: 'sm' | 'md' | 'lg';
		name?: string;
		label?: string;
		islabelActive?: boolean;
		helpText?: string;
		errorText?: string;
		autocomplete?: HTMLInputAttributes['autocomplete'];
		min?: HTMLInputAttributes['min'];
		max?: HTMLInputAttributes['max'];
		maxlength?: HTMLInputAttributes['maxlength'];
		isFloatLabel?: boolean;
	};

	let {
		el = $bindable(),
		value = $bindable(''),
		defaultValue,
		placeholder,
		autocomplete,
		type = 'text',
		rootClass,
		controlClass,
		startIcon,
		endIcon,
		startText,
		endText,
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
		min,
		max
	}: Props = $props();

	const uid = $props.id();

	let isActive = $state(false);
	let isFocused = $state(false);

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

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	let iconClasses = $derived(
		cn('control-icon', isFloatLabel && !isActive && !isFocused && value == '' && 'invisible')
	);
	let textClasses = $derived(
		cn('control-text', isFloatLabel && !isActive && !isFocused && value == '' && 'invisible')
	);

	$effect.pre(() => {
		if (defaultValue) {
			value = defaultValue;
		}
	});
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

		{#if startIcon}
			<Icon icon={startIcon} class={iconClasses} />
		{/if}

		{#if startText}
			{#if typeof startText === 'string'}
				<span class={textClasses}>{startText}</span>
			{:else}
				{@render startText()}
			{/if}
		{/if}

		<input
			{type}
			bind:this={el}
			bind:value
			id={`${uid}-{name}`}
			class={cn(
				'control-input',
				isFloatLabel && !isActive && !isFocused && value == '' && 'invisible',
				controlClass
			)}
			{placeholder}
			{autocomplete}
			{name}
			{min}
			{max}
			{...defaultValue !== undefined && { defaultValue }}
			onchange={(e) => onchange?.((e.target as HTMLInputElement).value)}
			oninput={(e) => oninput?.((e.target as HTMLInputElement).value)}
			onfocusin={() => (isFocused = true)}
			onfocusout={() => (isFocused = false)}
		/>

		{#if endText}
			{#if typeof endText === 'string'}
				<span class={textClasses}>{endText}</span>
			{:else}
				{@render endText()}
			{/if}
		{/if}

		{#if endIcon}
			<Icon icon={endIcon} class={iconClasses} />
		{/if}
	</label>

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-danger')}>
			{errorText || helpText}
		</div>
	{/if}
</div>
