<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		length?: number;
		values?: string[];
		class?: string;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft' | 'outlined' | 'line';
		size?: 'sm' | 'md' | 'lg';
		type?: 'text' | 'password' | 'number';
		name?: string;
		label?: string;
		helpText?: string;
		errorText?: string;
		oncomplete?: (value: string) => void;
	};

	let {
		class: className,
		variant = 'outlined',
		color = 'muted',
		size = 'md',
		label,
		name,
		type = 'text',
		helpText,
		errorText,
		length = 6,
		// svelte-ignore state_referenced_locally
		values = Array.from({ length }).map(() => ''),
		oncomplete
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

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const uid = $props.id();

	const handleInput = (event: Event, index: number) => {
		const target = event.target as HTMLInputElement;
		const value = target.value;

		if (value.length > 1) {
			target.value = value.charAt(0);
		}

		values[index] = target.value;
		values = [...values];

		if (index < length - 1 && target.value) {
			const nextInput = document.getElementById(`${uid}-${name}-${index + 1}`) as HTMLInputElement;
			if (nextInput) {
				nextInput.focus();
			}
		}
	};

	const handleKeydown = (event: KeyboardEvent, index: number) => {
		if (event.key === 'Backspace' && index > 0 && !values[index]) {
			const prevInput = document.getElementById(`${uid}-${name}-${index - 1}`) as HTMLInputElement;
			if (prevInput) {
				prevInput.focus();
			}
		}
	};

	const handlePaste = (event: ClipboardEvent) => {
		event.preventDefault();
		const pasteData = event.clipboardData?.getData('text') || '';
		const pasteValues = pasteData.slice(0, length).split('');

		let lastUpdatedIndex = 0;
		pasteValues.forEach((char, i) => {
			values[i] = char;
			const input = document.getElementById(`${uid}-${name}-${i}`) as HTMLInputElement;
			if (input) {
				input.value = char;
			}
			lastUpdatedIndex = i;
		});
		values = [...values];

		const lastInput = document.getElementById(
			`${uid}-${name}-${lastUpdatedIndex}`
		) as HTMLInputElement;
		if (lastInput) {
			lastInput.focus();
		}
	};

	$effect(() => {
		if (values.length === length) {
			const pin = values.join('');
			oncomplete?.(pin);
		}
	});
</script>

<div class={cn('field', className)}>
	<input type="hidden" {name} value={values.join('')} />
	{#if label}
		<span class="field-label">{label}</span>
	{/if}
	<div class="field-pin-wrapper">
		{#each Array.from({ length }) as _, i}
			<label
				class={cn('control', colors[color], variants[variant], sizeClasses[size])}
				for={`${uid}-${name}-${i}`}
			>
				<input
					{type}
					id={`${uid}-${name}-${i}`}
					class="control-pin"
					maxlength="1"
					oninput={(e) => handleInput(e, i)}
					onkeydown={(e) => handleKeydown(e, i)}
					onpaste={handlePaste}
					bind:value={values[i]}
				/>
			</label>
		{/each}
	</div>
	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-error')}>{errorText ?? helpText}</div>
	{/if}
</div>
