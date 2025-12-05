<script lang="ts">
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import { Section, Card, Alert, Code } from 'ui-svelte';
</script>

<DocHeader title="LLM Prompt Guidelines">
	Learn how to efficiently use ui-svelte with AI assistants by referencing the optimized LLM
	documentation files.
</DocHeader>

<Section class="pb-8">
	<Alert status="info">
		<strong>For AI Assistants:</strong> ui-svelte provides specialized documentation files optimized for
		LLM context. Reference these files when building Svelte/SvelteKit applications.
	</Alert>

	<div class="mt-8 space-y-8">
		<!-- Overview -->
		<Card>
			<h2 class="text-2xl font-bold mb-4">Overview</h2>
			<p class="mb-4">
				ui-svelte provides two main LLM-optimized documentation files that contain concise,
				AI-friendly instructions for building applications:
			</p>
			<ul class="list-disc list-inside space-y-2 ml-4">
				<li>
					<strong>page.md</strong> - For building page content (<code>+page.svelte</code> files)
				</li>
				<li>
					<strong>layout.md</strong> - For building application layouts (<code>+layout.svelte</code>
					files)
				</li>
			</ul>
		</Card>

		<!-- Complete Examples -->
		<Card>
			<h2 class="text-2xl font-bold mb-4">Complete Prompt Examples</h2>

			<div class="space-y-6">
				<div>
					<h3 class="text-lg font-semibold mb-2">Page Prompts</h3>
					<div class="space-y-3">
						<Code
							code={`Using https://ui-svelte.sappsdev.com/llm/page.md, create a landing page for a project management tool with hero section, features grid, testimonials, and pricing table`}
							lang="text"
							showCopy
						/>
						<Code
							code={`Using https://ui-svelte.sappsdev.com/llm/page.md, create a contact page with a form including name, email, subject, message fields, and a submit button`}
							lang="text"
							showCopy
						/>
						<Code
							code={`Using https://ui-svelte.sappsdev.com/llm/page.md, create a blog listing page with article cards in a grid layout`}
							lang="text"
							showCopy
						/>
					</div>
				</div>

				<div>
					<h3 class="text-lg font-semibold mb-2">Layout Prompts</h3>
					<div class="space-y-3">
						<Code
							code={`Using https://ui-svelte.sappsdev.com/llm/layout.md, create a dashboard layout with sidebar on desktop (w-48), drawer on mobile, and appbar with logo and user profile`}
							lang="text"
							showCopy
						/>
						<Code
							code={`Using https://ui-svelte.sappsdev.com/llm/layout.md, create an auth layout with centered content and no navigation elements`}
							lang="text"
							showCopy
						/>
						<Code
							code={`Using https://ui-svelte.sappsdev.com/llm/layout.md, create an admin layout with left sidebar for navigation, top appbar with search, and right sidebar for notifications`}
							lang="text"
							showCopy
						/>
					</div>
				</div>
			</div>
		</Card>

		<!-- Documentation Links -->
		<Card>
			<h2 class="text-2xl font-bold mb-4">Documentation Links</h2>

			<div class="space-y-3">
				<div class="flex items-center gap-3">
					<span class="font-semibold min-w-32">Page Components:</span>
					<a
						href="https://ui-svelte.sappsdev.com/llm/page.md"
						target="_blank"
						class="text-primary hover:underline"
					>
						https://ui-svelte.sappsdev.com/llm/page.md
					</a>
				</div>
				<div class="flex items-center gap-3">
					<span class="font-semibold min-w-32">Layout Components:</span>
					<a
						href="https://ui-svelte.sappsdev.com/llm/layout.md"
						target="_blank"
						class="text-primary hover:underline"
					>
						https://ui-svelte.sappsdev.com/llm/layout.md
					</a>
				</div>
			</div>

			<div class="mt-4">
				<Alert status="info">
					<strong>Tip:</strong> Bookmark these URLs and include them in your AI assistant's context when
					building ui-svelte applications for the best results.
				</Alert>
			</div>
		</Card>
	</div>
</Section>
