<script lang="ts" module>
	export type IconData = {
		body: string;
		viewbox: string;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		icon: IconData;
		class?: string;
	};
	const { icon, class: className }: Props = $props();
</script>

<svg viewBox={icon.viewbox} class={cn('icon', className)} xmlns="http://www.w3.org/2000/svg">
	{@html icon.body}
</svg>
