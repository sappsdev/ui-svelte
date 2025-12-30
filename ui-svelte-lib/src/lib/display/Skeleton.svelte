<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		width?: string;
		height?: string;
		variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
		animation?: 'pulse' | 'wave' | 'none';
		class?: string;
	};

	const { width, height, variant = 'text', animation = 'wave', class: className }: Props = $props();

	const variants = {
		text: 'is-text',
		circular: 'is-circular',
		rectangular: 'is-rectangular',
		rounded: 'is-rounded'
	};

	const animations = {
		pulse: 'is-pulse',
		wave: 'is-wave',
		none: ''
	};

	const style = $derived(
		[width && `width: ${width}`, height && `height: ${height}`].filter(Boolean).join('; ')
	);
</script>

<div class={cn('skeleton', variants[variant], animations[animation], className)} {style}></div>
