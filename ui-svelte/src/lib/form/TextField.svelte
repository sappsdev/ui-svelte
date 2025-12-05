<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		el?: HTMLInputElement;
		value?: string | number;
		defaultValue?: string;
		placeholder?: string;
		type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
		class?: string;
		controlClass?: string;
		prefix?: Snippet;
		suffix?: Snippet;
		onchange?: (value: unknown) => void;
		oninput?: (value: unknown) => void;
		variant?: 'primary' | 'secondary' | 'muted' | 'outlined' | 'line';
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
		isSolid?: boolean;
	};

	let {
		el = $bindable(),
		value = $bindable(''),
		defaultValue,
		placeholder,
		autocomplete,
		type = 'text',
		class: className,
		controlClass,
		prefix,
		suffix,
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
		min,
		max,
		isSolid
	}: Props = $props();

	const uid = $props.id();

	let isActive = $state(false);
	let isFocused = $state(false);

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

<div class={cn('field', className)}>
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

		{@render prefix?.()}

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

		{@render suffix?.()}
	</label>

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-danger')}>
			{errorText || helpText}
		</div>
	{/if}
</div>
