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
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'warning' | 'danger';
		isMuted?: boolean;
	};
	let {
		checked = $bindable(),
		defaultChecked,
		onchange,
		disabled = false,
		class: className,
		label,
		name,
		color = 'primary',
		isMuted
	}: Props = $props();

	const colors = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger'
	};
</script>

<label class={cn('checkbox', className)}>
	<input
		type="checkbox"
		class={cn('checkbox-input', colors[color], isMuted && 'is-muted')}
		{name}
		bind:checked
		{defaultChecked}
		{disabled}
		onchange={() => onchange && onchange(checked!)}
	/>
	{#if label}
		<span class="label-md">{label}</span>
	{/if}
</label>
