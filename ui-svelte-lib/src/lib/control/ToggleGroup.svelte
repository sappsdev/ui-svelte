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
		variant?: 'default' | 'primary' | 'secondary' | 'outlined';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		class?: string;
		isWide?: boolean;
		isVertical?: boolean;
		isDisabled?: boolean;
	};

	let {
		items,
		value = $bindable(items[0]?.id ?? ''),
		onchange,
		variant = 'default',
		size = 'md',
		class: className,
		isWide,
		isVertical,
		isDisabled
	}: Props = $props();

	const variantClasses: Record<string, string> = {
		default: '',
		primary: 'is-primary',
		secondary: 'is-secondary',
		outlined: 'is-outlined'
	};

	const sizeClasses: Record<string, string> = {
		xs: 'is-xs',
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	let groupClasses = $derived(
		cn(
			'toggle-group',
			variantClasses[variant],
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
			class={cn('toggle-group-item', sizeClasses[size], value === item.id && 'is-active')}
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
