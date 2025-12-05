<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Option = {
		id: string | number;
		label: string;
	};

	type Props = {
		options: Option[];
		onchange?: (value: string | number) => void;
		value?: string | number;
		class?: string;
		label?: string;
		name?: string;
		info?: string;
		error?: string;
		variant?: 'primary' | 'secondary' | 'muted';
		size?: 'sm' | 'md' | 'lg';
	};
	let {
		options,
		onchange,
		class: className,
		label,
		name,
		info,
		error,
		variant = 'primary',
		size = 'md',
		value = $bindable()
	}: Props = $props();

	const variantClases = {
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

<div class={cn('field', className)}>
	<input type="text" {name} hidden />
	{#if label}
		<div class="label">{label}</div>
	{/if}

	<div class={cn('radio-group')}>
		{#each options as item}
			<label class="radio-item">
				<input
					type="radio"
					value={item.id}
					bind:group={value}
					class={cn('radio', variantClases[variant], sizes[size])}
				/>
				<span class="label">{item.label}</span>
			</label>
		{/each}
	</div>

	{#if error || info}
		<div class={cn('field-help', error && 'is-error')}>{error ?? info}</div>
	{/if}
</div>
