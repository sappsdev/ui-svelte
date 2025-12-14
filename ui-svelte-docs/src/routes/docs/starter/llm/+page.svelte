<script lang="ts">
	import { Card, Code, Icon, Section, Tabs } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import {
		ArtificialIntelligenceIcon,
		FileDocumentIcon,
		LayoutIcon,
		WebLayoutIcon,
		CopyRegularIcon,
		WarningTriangleIcon,
		BulbIcon,
		CheckmarkCircle24RegularIcon
	} from '$lib/icons';

	const pagePrompts = [
		{
			name: 'Landing Page',
			prompt: `Using https://ui-svelte.sappsdev.com/llm/starter/page.md, create a Svelte landing page for a project management tool with hero section, features grid (3 columns on desktop), testimonials carousel, and pricing table with 3 tiers. Use Section for page structure and Card for content blocks.`
		},
		{
			name: 'Contact Page',
			prompt: `Using https://ui-svelte.sappsdev.com/llm/starter/page.md, create a Svelte contact page with a form including TextField for name and email, Textarea for message, Select for subject dropdown, and a submit Button. Use Section variant="muted" with isBoxed, and Card to contain the form.`
		},
		{
			name: 'Blog Listing',
			prompt: `Using https://ui-svelte.sappsdev.com/llm/starter/page.md, create a Svelte blog listing page with a hero Section, then a grid of blog post Cards (grid-1 md:grid-2 lg:grid-3). Each Card should have an image, title, excerpt, author Avatar, date, and read more Button.`
		},
		{
			name: 'Dashboard',
			prompt: `Using https://ui-svelte.sappsdev.com/llm/starter/page.md, create a Svelte dashboard page with stat Cards in a grid (grid-2 md:grid-4), a Table component for recent activity, and a Card with a chart placeholder. Use Section variant="ghost" for the container.`
		}
	];

	const layoutPrompts = [
		{
			name: 'Dashboard Layout',
			prompt: `Using https://ui-svelte.sappsdev.com/llm/starter/layout.md, create a Svelte dashboard layout with Sidebar (w-48) on desktop showing navigation with SideNav, Drawer for mobile navigation, AppBar (h-16) with logo and user Dropdown. Remember to include 'let { children } = $props();' and use {@render children()}.`
		},
		{
			name: 'Marketing Site',
			prompt: `Using https://ui-svelte.sappsdev.com/llm/starter/layout.md, create a Svelte marketing layout with AppBar containing NavMenu in center snippet for horizontal navigation (Home, Features, Pricing, Contact), logo in start snippet, and Button "Get Started" in end snippet. No sidebars needed.`
		},
		{
			name: 'Admin Panel',
			prompt: `Using https://ui-svelte.sappsdev.com/llm/starter/layout.md, create a Svelte admin layout with left Sidebar (w-48) for navigation using SideNav, top AppBar (h-16) with search TextField and notifications IconButton, and right Card (w-56) for activity feed. Use proper margins: mainClass="lg:ml-48 2xl:mr-56 vh-16 mt-16".`
		},
		{
			name: 'Responsive App',
			prompt: `Using https://ui-svelte.sappsdev.com/llm/starter/layout.md, create a Svelte responsive layout with Sidebar (w-48) visible only on desktop (invisible lg:visible), Drawer for mobile triggered by IconButton in AppBar, and user Avatar with Dropdown in AppBar end snippet. Include drawer state: 'let drawerOpen = $state(false);'`
		}
	];

	const bestPractices = [
		{
			tip: 'Always include the documentation URL',
			description: 'This is the most important step to get correct Svelte code'
		},
		{
			tip: 'Be specific about component names',
			description: 'Name the exact components you want: Section, Card, Button, etc.'
		},
		{
			tip: 'Specify layouts with bodyClass',
			description: 'Use "grid-3", "row", "center gap-6" to get exact layouts'
		},
		{
			tip: 'Request responsive designs',
			description: 'Add "column md:row" or "grid-1 md:grid-3" for mobile-first layouts'
		},
		{
			tip: 'Start simple, then iterate',
			description: 'Get the basic structure first, then ask AI to add features'
		}
	];

	const promptTabs = [
		{ id: 'page', label: 'Page Prompts', content: pagePromptsContent },
		{ id: 'layout', label: 'Layout Prompts', content: layoutPromptsContent }
	];
</script>

{#snippet pagePromptsContent()}
	<div class="column gap-4">
		{#each pagePrompts as prompt}
			<div class="column gap-2">
				<p class="text-sm font-medium">{prompt.name}</p>
				<Code code={prompt.prompt} lang="text" hideLang />
			</div>
		{/each}
	</div>
{/snippet}

{#snippet layoutPromptsContent()}
	<div class="column gap-4">
		{#each layoutPrompts as prompt}
			<div class="column gap-2">
				<p class="text-sm font-medium">{prompt.name}</p>
				<Code code={prompt.prompt} lang="text" hideLang />
			</div>
		{/each}
	</div>
{/snippet}

<DocsHeader
	title="LLM Prompt Guidelines"
	llmUrl="https://ui-svelte.sappsdev.com/llm/starter/page.md"
>
	Learn how to efficiently use ui-svelte with AI assistants by referencing the optimized LLM
	documentation files.
</DocsHeader>

<Section>
	<Card variant="info">
		<div class="row gap-3 items-center">
			<Icon icon={ArtificialIntelligenceIcon} class="size-6 shrink-0" />
			<p>
				<strong>For AI Assistants:</strong> ui-svelte provides specialized documentation files optimized
				for LLM context. These files explicitly specify SVELTE syntax to prevent generating React/JSX
				code.
			</p>
		</div>
	</Card>
</Section>

<Section bodyClass="grid-1 md:grid-2 gap-6">
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<div class="row gap-3 items-center">
				<Icon icon={FileDocumentIcon} class="size-5" />
				<h4>Page Components</h4>
			</div>
		{/snippet}
		<p class="text-sm">
			For building <code class="px-1 py-0.5 rounded bg-muted">+page.svelte</code> files with Section,
			Card, Button, forms, and display components.
		</p>
		<a
			href="https://ui-svelte.sappsdev.com/llm/starter/page.md"
			target="_blank"
			class="text-primary hover:underline text-sm break-all"
		>
			https://ui-svelte.sappsdev.com/llm/starter/page.md
		</a>
	</Card>

	<Card bodyClass="column gap-4">
		{#snippet header()}
			<div class="row gap-3 items-center">
				<Icon icon={LayoutIcon} class="size-5" />
				<h4>Layout Components</h4>
			</div>
		{/snippet}
		<p class="text-sm">
			For building <code class="px-1 py-0.5 rounded bg-muted">+layout.svelte</code> files with Scaffold,
			AppBar, Sidebar, Drawer, and navigation components.
		</p>
		<a
			href="https://ui-svelte.sappsdev.com/llm/starter/layout.md"
			target="_blank"
			class="text-primary hover:underline text-sm break-all"
		>
			https://ui-svelte.sappsdev.com/llm/starter/layout.md
		</a>
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<div class="row gap-3 items-center">
				<Icon icon={BulbIcon} class="size-5" />
				<h4>Why Reference These Docs?</h4>
			</div>
		{/snippet}
		<p class="mb-4">
			Without explicit documentation references, AI assistants often default to generating React/JSX
			code because it's more common in their training data. These specialized docs:
		</p>
		<ul class="list-disc list-inside space-y-2 ml-4 text-sm">
			<li>Explicitly specify <strong>Svelte syntax</strong> requirements</li>
			<li>Include <strong>MANDATORY instructions</strong> for AI to follow</li>
			<li>Provide <strong>Svelte-specific examples</strong> with correct syntax</li>
			<li>Show <strong>what NOT to do</strong> (React/JSX anti-patterns)</li>
			<li>Include component APIs optimized for AI code generation</li>
		</ul>
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<div class="row gap-3 items-center">
				<Icon icon={CopyRegularIcon} class="size-5" />
				<h4>How to Write Effective Prompts</h4>
			</div>
		{/snippet}
		<div class="column gap-6">
			<div class="column gap-2">
				<h5 class="font-semibold text-success">✅ Good Prompt Structure</h5>
				<Code
					code={`Using https://ui-svelte.sappsdev.com/llm/starter/page.md, create a [description] with [features]`}
					lang="text"
					hideLang
				/>
				<p class="text-sm text-muted-500">
					The URL reference tells the AI to use Svelte syntax and ui-svelte components.
				</p>
			</div>

			<div class="column gap-2">
				<h5 class="font-semibold text-danger">❌ Bad Prompt (Missing URL)</h5>
				<Code code={`Create a landing page for a project management tool`} lang="text" hideLang />
				<p class="text-sm text-muted-500">
					Without the URL reference, AI will likely generate React/JSX code.
				</p>
			</div>

			<div class="column gap-2">
				<h5 class="font-semibold text-info">💡 Pro Tip: Be More Explicit</h5>
				<Code
					code={`Using https://ui-svelte.sappsdev.com/llm/starter/page.md, create a Svelte +page.svelte file for a [description]. Use ONLY Section, Card, and Button components from ui-svelte. Generate Svelte syntax, NOT React.`}
					lang="text"
					hideLang
				/>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<div class="row gap-3 items-center">
				<Icon icon={WebLayoutIcon} class="size-5" />
				<h4>Complete Prompt Examples</h4>
			</div>
		{/snippet}
		<Tabs tabs={promptTabs} />
	</Card>
</Section>

<Section>
	<Card variant="success">
		{#snippet header()}
			<div class="row gap-3 items-center">
				<Icon icon={CheckmarkCircle24RegularIcon} class="size-5" />
				<h4>Best Practices</h4>
			</div>
		{/snippet}
		<div class="column gap-4">
			{#each bestPractices as practice}
				<div class="row gap-3">
					<span class="text-success">✅</span>
					<div>
						<strong>{practice.tip}</strong>
						<p class="text-sm text-muted-500">{practice.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</Card>
</Section>
