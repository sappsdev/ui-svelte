<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils/class-names.js';

	type FooterLink = {
		label: string;
		href: string;
	};

	type Props = {
		links: FooterLink[];
		class?: string;
	};

	const { links = [], class: className }: Props = $props();

	function isLinkActive(href: string): boolean {
		return page.url.pathname === href;
	}
</script>

<div class={cn('footer-nav', className)}>
	{#each links as link}
		<a href={link.href} class={cn('footer-nav-link', isLinkActive(link.href) && 'is-active')}>
			{link.label}
		</a>
	{/each}
</div>
