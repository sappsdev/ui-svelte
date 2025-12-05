<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	type Props = {
		el?: HTMLTextAreaElement;
		value?: string;
		defaultValue?: string;
		placeholder?: string;
		class?: string;
		controlClass?: string;
		onchange?: (value: string) => void;
		oninput?: (value: string) => void;
		variant?: 'primary' | 'secondary' | 'muted' | 'outlined' | 'line';
		size?: 'sm' | 'md' | 'lg';
		name?: string;
		label?: string;
		islabelActive?: boolean;
		helpText?: string;
		errorText?: string;
		maxlength?: HTMLTextareaAttributes['maxlength'];
		rows?: number;
		cols?: number;
		isFloatLabel?: boolean;
		isSolid?: boolean;
		isResize?: boolean;
	};

	let {
		el = $bindable(),
		value = $bindable(''),
		defaultValue,
		placeholder,
		class: className,
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
		maxlength,
		rows = 4,
		cols,
		isSolid,
		isResize = false
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
			'textarea-control',
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
					'textarea-control-label',
					(isActive || isFocused || islabelActive || value !== '') && 'is-active'
				)}
			>
				{label}
			</span>
		{/if}

		<textarea
			bind:this={el}
			bind:value
			id={`${uid}-{name}`}
			class={cn(
				'textarea-control-input',
				isResize && 'is-resizable',
				isFloatLabel && !isActive && !isFocused && value == '' && 'invisible',
				controlClass
			)}
			{placeholder}
			{name}
			{rows}
			{cols}
			{maxlength}
			{...defaultValue !== undefined && { defaultValue }}
			onchange={(e) => onchange?.((e.target as HTMLTextAreaElement).value)}
			oninput={(e) => oninput?.((e.target as HTMLTextAreaElement).value)}
			onfocusin={() => (isFocused = true)}
			onfocusout={() => (isFocused = false)}
		></textarea>
	</label>

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-danger')}>
			{errorText || helpText}
		</div>
	{/if}
</div>
