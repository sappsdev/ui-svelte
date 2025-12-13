<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type FooterLink = {
		label: string;
		href: string;
		external?: boolean;
	};

	type Props = {
		title?: string;
		links?: FooterLink[];
		children?: Snippet;
		class?: string;
	};

	const { title, links = [], children, class: className }: Props = $props();
</script>

<div class={cn('footer-group', className)}>
	{#if title}
		<h3 class="footer-group-title">{title}</h3>
	{/if}

	{#if links.length > 0}
		<ul class="footer-group-links">
			{#each links as link}
				<li>
					<a
						href={link.href}
						class="footer-group-link"
						target={link.external ? '_blank' : undefined}
						rel={link.external ? 'noopener noreferrer' : undefined}
					>
						{link.label}
						{#if link.external}
							<span class="sr-only">(abre en nueva ventana)</span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	{/if}

	{#if children}
		<div class="footer-group-content">
			{@render children()}
		</div>
	{/if}
</div>
