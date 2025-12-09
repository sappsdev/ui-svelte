<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		text: string;
		children: Snippet;
		variant?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'warning' | 'danger';
		position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		class?: string;
	};

	let {
		text,
		children,
		variant = 'primary',
		position = 'top-right',
		class: className
	}: Props = $props();

	const positions = {
		'top-left': 'is-top-left',
		'top-right': 'is-top-right',
		'bottom-left': 'is-bottom-left',
		'bottom-right': 'is-bottom-right'
	};

	const variants = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		warning: 'is-warning',
		danger: 'is-danger'
	};
</script>

<div class={cn('badge', positions[position], variants[variant], className)}>
	{@render children()}
	<div class="badge-content">
		<span class="badge-text">
			{text}
		</span>
	</div>
</div>
