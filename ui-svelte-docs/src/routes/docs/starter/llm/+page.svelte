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
		LLM context. These files explicitly specify SVELTE syntax to prevent generating React/JSX code.
	</Alert>

	<div class="mt-8 space-y-8">
		<!-- Overview -->
		<Card>
			<h2 class="text-2xl font-bold mb-4">Overview</h2>
			<p class="mb-4">
				ui-svelte provides two main LLM-optimized documentation files that contain concise,
				AI-friendly instructions for building Svelte/SvelteKit applications:
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
			<Alert status="warning">
				<strong>Important:</strong> These docs explicitly tell AI to generate SVELTE code (not React).
				Always reference these URLs in your prompts.
			</Alert>
		</Card>

		<!-- Why Use These Docs -->
		<Card>
			<h2 class="text-2xl font-bold mb-4">Why Reference These Docs?</h2>
			<p class="mb-4">
				Without explicit documentation references, AI assistants often default to generating
				React/JSX code because it's more common in their training data. These specialized docs:
			</p>
			<ul class="list-disc list-inside space-y-2 ml-4">
				<li>Explicitly specify <strong>Svelte syntax</strong> requirements</li>
				<li>Include <strong>MANDATORY instructions</strong> for AI to follow</li>
				<li>Provide <strong>Svelte-specific examples</strong> with correct syntax</li>
				<li>Show <strong>what NOT to do</strong> (React/JSX anti-patterns)</li>
				<li>Include component APIs optimized for AI code generation</li>
			</ul>
		</Card>

		<!-- How to Write Effective Prompts -->
		<Card>
			<h2 class="text-2xl font-bold mb-4">How to Write Effective Prompts</h2>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold mb-2">✅ Good Prompt Structure</h3>
					<Code
						code={`Using https://ui-svelte.sappsdev.com/llm/page.md, create a [description] with [features]`}
						lang="text"
						showCopy
					/>
					<p class="text-sm text-muted-foreground mt-2">
						The URL reference tells the AI to use Svelte syntax and ui-svelte components.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold mb-2 text-danger">❌ Bad Prompt (Missing URL)</h3>
					<Code code={`Create a landing page for a project management tool`} lang="text" />
					<p class="text-sm text-muted-foreground mt-2">
						Without the URL reference, AI will likely generate React/JSX code.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold mb-2">💡 Pro Tip: Be More Explicit</h3>
					<Code
						code={`Using https://ui-svelte.sappsdev.com/llm/page.md, create a Svelte +page.svelte file for a [description]. Use ONLY Section, Card, and Button components from ui-svelte. Generate Svelte syntax, NOT React.`}
						lang="text"
						showCopy
					/>
				</div>
			</div>
		</Card>

		<!-- Complete Examples -->
		<Card>
			<h2 class="text-2xl font-bold mb-4">Complete Prompt Examples</h2>

			<div class="space-y-6">
				<div>
					<h3 class="text-lg font-semibold mb-3">Page Prompts (+page.svelte)</h3>
					<div class="space-y-3">
						<div>
							<p class="text-sm font-medium mb-1">Landing Page</p>
							<Code
								code={`Using https://ui-svelte.sappsdev.com/llm/page.md, create a Svelte landing page for a project management tool with hero section, features grid (3 columns on desktop), testimonials carousel, and pricing table with 3 tiers. Use Section for page structure and Card for content blocks.`}
								lang="text"
								showCopy
							/>
						</div>

						<div>
							<p class="text-sm font-medium mb-1">Contact Page with Form</p>
							<Code
								code={`Using https://ui-svelte.sappsdev.com/llm/page.md, create a Svelte contact page with a form including TextField for name and email, Textarea for message, Select for subject dropdown, and a submit Button. Use Section variant="muted" with isBoxed, and Card to contain the form.`}
								lang="text"
								showCopy
							/>
						</div>

						<div>
							<p class="text-sm font-medium mb-1">Blog Listing Page</p>
							<Code
								code={`Using https://ui-svelte.sappsdev.com/llm/page.md, create a Svelte blog listing page with a hero Section, then a grid of blog post Cards (grid-1 md:grid-2 lg:grid-3). Each Card should have an image, title, excerpt, author Avatar, date, and read more Button.`}
								lang="text"
								showCopy
							/>
						</div>

						<div>
							<p class="text-sm font-medium mb-1">Dashboard Page</p>
							<Code
								code={`Using https://ui-svelte.sappsdev.com/llm/page.md, create a Svelte dashboard page with stat Cards in a grid (grid-2 md:grid-4), a Table component for recent activity, and a Card with a chart placeholder. Use Section variant="ghost" for the container.`}
								lang="text"
								showCopy
							/>
						</div>

						<div>
							<p class="text-sm font-medium mb-1">Pricing Page</p>
							<Code
								code={`Using https://ui-svelte.sappsdev.com/llm/page.md, create a Svelte pricing page with a hero Section, then 3 pricing Cards in a grid-1 md:grid-3 layout. Include features list with Checkbox components, and a Button for each plan. Add an FAQ section using Accordion component.`}
								lang="text"
								showCopy
							/>
						</div>
					</div>
				</div>

				<div>
					<h3 class="text-lg font-semibold mb-3">Layout Prompts (+layout.svelte)</h3>
					<div class="space-y-3">
						<div>
							<p class="text-sm font-medium mb-1">Dashboard Layout</p>
							<Code
								code={`Using https://ui-svelte.sappsdev.com/llm/layout.md, create a Svelte dashboard layout with Sidebar (w-48) on desktop showing navigation with SideNav, Drawer for mobile navigation, AppBar (h-16) with logo and user Dropdown. Remember to include 'let { children } = $props();' and use {@render children()}.`}
								lang="text"
								showCopy
							/>
						</div>

						<div>
							<p class="text-sm font-medium mb-1">Marketing Site Layout</p>
							<Code
								code={`Using https://ui-svelte.sappsdev.com/llm/layout.md, create a Svelte marketing layout with AppBar containing NavMenu in center snippet for horizontal navigation (Home, Features, Pricing, Contact), logo in start snippet, and Button "Get Started" in end snippet. No sidebars needed.`}
								lang="text"
								showCopy
							/>
						</div>

						<div>
							<p class="text-sm font-medium mb-1">Admin Panel Layout</p>
							<Code
								code={`Using https://ui-svelte.sappsdev.com/llm/layout.md, create a Svelte admin layout with left Sidebar (w-48) for navigation using SideNav, top AppBar (h-16) with search TextField and notifications IconButton, and right Card (w-56) for activity feed. Use proper margins: mainClass="lg:ml-48 2xl:mr-56 vh-16 mt-16".`}
								lang="text"
								showCopy
							/>
						</div>

						<div>
							<p class="text-sm font-medium mb-1">Auth Layout</p>
							<Code
								code={`Using https://ui-svelte.sappsdev.com/llm/layout.md, create a Svelte auth layout with just centered content, no AppBar or Sidebar. Use Scaffold with only children rendered in center of viewport.`}
								lang="text"
								showCopy
							/>
						</div>

						<div>
							<p class="text-sm font-medium mb-1">Responsive App Layout</p>
							<Code
								code={`Using https://ui-svelte.sappsdev.com/llm/layout.md, create a Svelte responsive layout with Sidebar (w-48) visible only on desktop (invisible lg:visible), Drawer for mobile triggered by IconButton in AppBar, and user Avatar with Dropdown in AppBar end snippet. Include drawer state: 'let drawerOpen = $state(false);'`}
								lang="text"
								showCopy
							/>
						</div>
					</div>
				</div>
			</div>
		</Card>

		<!-- Advanced Tips -->
		<Card>
			<h2 class="text-2xl font-bold mb-4">Advanced Tips</h2>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold mb-2">Combining Multiple Components</h3>
					<Code
						code={`Using https://ui-svelte.sappsdev.com/llm/page.md, create a Svelte user profile page with:
- Hero Section (variant="primary" isSolid) with Avatar, user name, and edit Button
- Info Section with Cards showing stats (followers, posts, etc.) in grid-2 md:grid-4
- Settings Section with Toggle components for notifications
- Form Section with TextField, Select, and PasswordField for account settings
- Use responsive layouts: column md:row where appropriate`}
						lang="text"
						showCopy
					/>
				</div>

				<div>
					<h3 class="text-lg font-semibold mb-2">Specifying Exact Component APIs</h3>
					<Code
						code={`Using https://ui-svelte.sappsdev.com/llm/page.md, create a Svelte form page with validation:
- TextField with label="Email" type="email" required={true}
- PasswordField with label="Password" showStrength={true}
- Checkbox with label="Remember me"
- Button variant="primary" size="lg" type="submit"
- Use Section variant="muted" isBoxed and Card to contain form`}
						lang="text"
						showCopy
					/>
				</div>

				<div>
					<h3 class="text-lg font-semibold mb-2">Requesting Specific Layouts</h3>
					<Code
						code={`Using https://ui-svelte.sappsdev.com/llm/page.md, create a Svelte product showcase page:
- Hero Section: full-screen (min-h-screen) with center alignment (bodyClass="center gap-6")
- Features Section: grid-1 md:grid-2 lg:grid-3 with gap-6
- Testimonials Section: Carousel component with 3 slides
- CTA Section: row layout on desktop (bodyClass="column md:row center gap-4")
- All content Sections should use isBoxed`}
						lang="text"
						showCopy
					/>
				</div>
			</div>
		</Card>

		<!-- Documentation Links -->
		<Card>
			<h2 class="text-2xl font-bold mb-4">Documentation Links</h2>

			<div class="space-y-3">
				<div class="flex items-start gap-3">
					<span class="font-semibold min-w-32 mt-1">Page Components:</span>
					<div class="flex-1">
						<a
							href="https://ui-svelte.sappsdev.com/llm/page.md"
							target="_blank"
							class="text-primary hover:underline block"
						>
							https://ui-svelte.sappsdev.com/llm/page.md
						</a>
						<p class="text-sm text-muted-foreground mt-1">
							Use for +page.svelte files. Contains Section, Card, Button, forms, and display
							components.
						</p>
					</div>
				</div>

				<div class="flex items-start gap-3">
					<span class="font-semibold min-w-32 mt-1">Layout Components:</span>
					<div class="flex-1">
						<a
							href="https://ui-svelte.sappsdev.com/llm/layout.md"
							target="_blank"
							class="text-primary hover:underline block"
						>
							https://ui-svelte.sappsdev.com/llm/layout.md
						</a>
						<p class="text-sm text-muted-foreground mt-1">
							Use for +layout.svelte files. Contains Scaffold, AppBar, Sidebar, Drawer, and
							navigation components.
						</p>
					</div>
				</div>
			</div>

			<div class="mt-6">
				<Alert status="success">
					<strong>Quick Copy:</strong> Use the copy button (icon in top-right of code blocks) to easily
					copy prompts and paste them into your AI assistant.
				</Alert>
			</div>
		</Card>

		<!-- Troubleshooting -->
		<Card>
			<h2 class="text-2xl font-bold mb-4">Troubleshooting</h2>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold mb-2 text-danger">AI generates React/JSX code</h3>
					<p class="mb-2"><strong>Solution:</strong></p>
					<ul class="list-disc list-inside space-y-1 ml-4">
						<li>Make sure you include the full URL in your prompt</li>
						<li>Add "Generate Svelte syntax, NOT React" to your prompt</li>
						<li>Specify "Create a Svelte +page.svelte file" explicitly</li>
						<li>If AI still generates React, try a new conversation and start with the URL</li>
					</ul>
				</div>

				<div>
					<h3 class="text-lg font-semibold mb-2 text-warning">AI uses wrong components</h3>
					<p class="mb-2"><strong>Solution:</strong></p>
					<ul class="list-disc list-inside space-y-1 ml-4">
						<li>
							Specify component names explicitly: "Use Section, Card, and Button from ui-svelte"
						</li>
						<li>Mention "Use ONLY ui-svelte components" in your prompt</li>
						<li>Reference specific component APIs from the docs</li>
					</ul>
				</div>

				<div>
					<h3 class="text-lg font-semibold mb-2 text-info">AI uses wrong syntax for layouts</h3>
					<p class="mb-2"><strong>Solution:</strong></p>
					<ul class="list-disc list-inside space-y-1 ml-4">
						<li>Reference the complete layout examples from layout.md</li>
					</ul>
				</div>
			</div>
		</Card>

		<!-- Best Practices -->
		<Card>
			<h2 class="text-2xl font-bold mb-4">Best Practices</h2>

			<div class="space-y-3">
				<div class="flex gap-3">
					<span class="text-2xl">✅</span>
					<div>
						<strong>Always include the documentation URL</strong>
						<p class="text-sm text-muted-foreground">
							This is the most important step to get correct Svelte code
						</p>
					</div>
				</div>

				<div class="flex gap-3">
					<span class="text-2xl">✅</span>
					<div>
						<strong>Be specific about component names</strong>
						<p class="text-sm text-muted-foreground">
							Name the exact components you want: Section, Card, Button, etc.
						</p>
					</div>
				</div>

				<div class="flex gap-3">
					<span class="text-2xl">✅</span>
					<div>
						<strong>Specify layouts with bodyClass</strong>
						<p class="text-sm text-muted-foreground">
							Use "grid-3", "row", "center gap-6" to get exact layouts
						</p>
					</div>
				</div>

				<div class="flex gap-3">
					<span class="text-2xl">✅</span>
					<div>
						<strong>Request responsive designs</strong>
						<p class="text-sm text-muted-foreground">
							Add "column md:row" or "grid-1 md:grid-3" for mobile-first layouts
						</p>
					</div>
				</div>

				<div class="flex gap-3">
					<span class="text-2xl">✅</span>
					<div>
						<strong>Start simple, then iterate</strong>
						<p class="text-sm text-muted-foreground">
							Get the basic structure first, then ask AI to add features
						</p>
					</div>
				</div>
			</div>
		</Card>
	</div>
</Section>
