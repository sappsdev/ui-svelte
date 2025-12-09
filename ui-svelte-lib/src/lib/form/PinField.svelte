<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		length?: number;
		values?: string[];
		class?: string;
		variant?: 'solid' | 'outlined' | 'soft' | 'line';
		color?: 'primary' | 'secondary' | 'muted';
		inputSize?: 'small' | 'medium' | 'large';
		type?: 'text' | 'password' | 'number';
		name?: string;
		label?: string;
		helpText?: string;
		errorText?: string;
		oncomplete?: (value: string) => void;
	};

	let {
		class: className,
		variant = 'soft',
		color = 'primary',
		inputSize = 'medium',
		label,
		name,
		type = 'text',
		helpText,
		errorText,
		length = 6,
		values = Array.from({ length }).map(() => ''),
		oncomplete
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

	const handleInput = (event: Event, index: number) => {
		const target = event.target as HTMLInputElement;
		const value = target.value;

		if (value.length > 1) {
			target.value = value.charAt(0);
		}

		values[index] = target.value;
		values = [...values];

		if (index < length - 1 && target.value) {
			const nextInput = document.getElementById(`input-${index + 1}`) as HTMLInputElement;
			if (nextInput) {
				nextInput.focus();
			}
		}
	};

	const handleKeydown = (event: KeyboardEvent, index: number) => {
		if (event.key === 'Backspace' && index > 0 && !values[index]) {
			const prevInput = document.getElementById(`input-${index - 1}`) as HTMLInputElement;
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
			const input = document.getElementById(`input-${i}`) as HTMLInputElement;
			if (input) {
				input.value = char;
			}
			lastUpdatedIndex = i;
		});
		values = [...values];

		const lastInput = document.getElementById(`input-${lastUpdatedIndex}`) as HTMLInputElement;
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
		<label for={`${uid}-{name}`} class="label">{label}</label>
	{/if}
	<div class="pin-wrapper">
		{#each Array.from({ length }) as _, i}
			<div
				class={cn('field-control', variants[variant], colors[color], sizes[inputSize])}
				class:is-error={errorText}
			>
				<input
					{type}
					id={`input-${i}`}
					class="field-pin"
					maxlength="1"
					oninput={(e) => handleInput(e, i)}
					onkeydown={(e) => handleKeydown(e, i)}
					onpaste={handlePaste}
					bind:value={values[i]}
				/>
			</div>
		{/each}
	</div>
	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-error')}>{errorText ?? helpText}</div>
	{/if}
</div>
