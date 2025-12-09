<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		checked?: boolean;
		defaultChecked?: boolean;
		onchange?: (checked: boolean) => void;
		disabled?: boolean;
		class?: string;
		label?: string;
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
		name,
		color = 'primary'
	}: Props = $props();

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted'
	};
</script>

<label class={cn('checkbox', className)}>
	<input
		type="checkbox"
		class={cn('checkbox-input', colors[color])}
		{name}
		bind:checked
		{defaultChecked}
		{disabled}
		onchange={() => onchange && onchange(checked!)}
	/>
	{#if label}
		<span class="label">{label}</span>
	{/if}
</label>
