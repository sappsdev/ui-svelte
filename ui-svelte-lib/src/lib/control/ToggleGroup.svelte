<script lang="ts">
	import type { IconData } from '$lib/display/Icon.svelte';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type ToggleGroupItem = {
		id: string;
		label: string;
		icon?: IconData;
	};

	type Props = {
		items: ToggleGroupItem[];
		value?: string;
		onchange?: (value: string) => void;
		color?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		variant?: 'solid' | 'soft' | 'outlined' | 'ghost';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		class?: string;
		isWide?: boolean;
		isVertical?: boolean;
		isDisabled?: boolean;
	};

	let {
		items,
		// svelte-ignore state_referenced_locally
		value = $bindable(items[0]?.id ?? ''),
		onchange,
		color = 'muted',
		variant = 'soft',
		size = 'md',
		class: className,
		isWide,
		isVertical,
		isDisabled
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
		ghost: 'is-ghost'
	};

	const sizes = {
		xs: 'is-xs',
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	let groupClasses = $derived(
		cn(
			'toggle-group',
			variants[variant],
			colors[color],
			isWide && 'is-wide',
			isVertical && 'is-vertical',
			className
		)
	);

	function handleClick(id: string) {
		if (isDisabled) return;
		value = id;
		onchange?.(id);
	}
</script>

<div class={groupClasses} role="group">
	{#each items as item}
		<button
			type="button"
			class={cn('toggle-group-item', sizes[size], value === item.id && 'is-active')}
			onclick={() => handleClick(item.id)}
			disabled={isDisabled}
			aria-pressed={value === item.id}
		>
			{#if item.icon}
				<Icon icon={item.icon} />
			{/if}
			{item.label}
		</button>
	{/each}
</div>
