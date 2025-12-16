<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		checked?: boolean;
		defaultChecked?: boolean;
		onchange?: (checked: boolean) => void;
		disabled?: boolean;
		class?: string;
		label?: string;
		labelLeft?: string;
		labelRight?: string;
		name?: string;
		color?: 'primary' | 'secondary' | 'muted';
	};
	let {
		checked = $bindable(),
		defaultChecked,
		onchange,
		disabled = false,
		class: className,
		label,
		labelLeft,
		labelRight,
		name,
		color = 'primary'
	}: Props = $props();

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted'
	};
</script>

<label class={cn('toggle', className)}>
	{#if labelLeft}
		<span class={cn('toggle-label-left', !checked && 'is-active')}>{labelLeft}</span>
	{/if}
	<input
		type="checkbox"
		class={cn('toggle-input', colors[color])}
		{name}
		bind:checked
		{defaultChecked}
		{disabled}
		onchange={() => onchange && onchange(checked!)}
	/>
	{#if labelRight}
		<span class={cn('toggle-label-right', checked && 'is-active')}>{labelRight}</span>
	{/if}
	{#if label}
		<span class="label">{label}</span>
	{/if}
</label>
