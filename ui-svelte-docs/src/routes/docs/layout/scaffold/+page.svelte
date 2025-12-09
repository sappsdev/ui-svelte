<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Scaffold, AppBar, Sidebar, Card, Checkbox } from 'ui-svelte';

	// States
	let showAppBar = $state(true);
	let showBottomBar = $state(false);
	let showStart = $state(true);
	let showEnd = $state(true);

	let hasProps = $derived([showAppBar, showBottomBar, showStart, showEnd].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Scaffold, AppBar, Sidebar, Card } from 'ui-svelte';`,
			`\tlet { children } = $props();`,
			`<\/script>`
		];

		const openingTag = hasProps
			? [
					`<Scaffold`,
					showAppBar && `\tbodyClass="mt-16"`,
					showStart && `\tstartClass="w-48"`,
					showEnd && `\tendClass="w-56"`,
					`>`
				]
			: [`<Scaffold>`];

		const appBar = showAppBar
			? [
					`\t{#snippet appBar()}`,
					`\t\t<AppBar class="h-16">`,
					`\t\t\t<!-- AppBar content -->`,
					`\t\t</AppBar>`,
					`\t{/snippet}\n`
				]
			: [];

		const start = showStart
			? [
					`\t{#snippet start()}`,
					`\t\t<Sidebar class="${showAppBar ? 'vh-16 ' : ''}pb-8">`,
					`\t\t\t<!-- Sidebar content -->`,
					`\t\t</Sidebar>`,
					`\t{/snippet}\n`
				]
			: [];

		const mainContent = [`\t<!-- Main content -->`, `\t{@render children()}`];

		const end = showEnd
			? [
					`\n\t{#snippet end()}`,
					`\t\t<Sidebar class="${showAppBar ? 'vh-16 ' : ''}pb-8">`,
					`\t\t\t<!-- End sidebar content -->`,
					`\t\t</Sidebar>`,
					`\t{/snippet}`
				]
			: [];

		const bottomBar = showBottomBar
			? [
					`\n\t{#snippet bottomBar()}`,
					`\t\t<AppBar class="h-16">`,
					`\t\t\t<!-- BottomBar content -->`,
					`\t\t</AppBar>`,
					`\t{/snippet}`
				]
			: [];

		const closingTag = [`</Scaffold>`];

		return [
			...scriptLines,
			...openingTag.filter(Boolean),
			...appBar,
			...start,
			...mainContent,
			...end,
			...bottomBar,
			...closingTag
		].join('\n');
	});

	const props = [
		{ prop: 'children', type: 'Snippet', initial: '', required: true },
		{ prop: 'appBar', type: 'Snippet', initial: '' },
		{ prop: 'start', type: 'Snippet', initial: '' },
		{ prop: 'end', type: 'Snippet', initial: '' },
		{ prop: 'bottomBar', type: 'Snippet', initial: '' },
		{ prop: 'bodyClass', type: 'string', initial: '' },
		{ prop: 'mainClass', type: 'string', initial: '' },
		{ prop: 'startClass', type: 'string', initial: '' },
		{ prop: 'endClass', type: 'string', initial: '' }
	];
</script>

{#snippet appBarSnippet()}
	<AppBar class="h-12 text-xs">
		{#snippet center()}
			<span class="text-xs">AppBar (fixed)</span>
		{/snippet}
	</AppBar>
{/snippet}

{#snippet startSnippet()}
	<Sidebar class="w-32 bg-primary/10 h-full">
		<div class="flex items-center justify-center h-full">
			<p class="text-xs transform -rotate-90 whitespace-nowrap">Start (fixed)</p>
		</div>
	</Sidebar>
{/snippet}

{#snippet endSnippet()}
	<Card class="w-32 bg-secondary/10 h-full">
		<div class="flex items-center justify-center h-full">
			<p class="text-xs transform -rotate-90 whitespace-nowrap">End (fixed)</p>
		</div>
	</Card>
{/snippet}

{#snippet bottomBarSnippet()}
	<AppBar class="h-12 text-xs">
		{#snippet center()}
			<span class="text-xs">BottomBar (fixed)</span>
		{/snippet}
	</AppBar>
{/snippet}

{#snippet preview()}
	<div class="w-full h-96 border-2 border-dashed rounded relative overflow-hidden">
		<Scaffold
			bodyClass={showAppBar ? 'mt-12' : ''}
			startClass="w-32"
			endClass="w-32"
			appBar={showAppBar ? appBarSnippet : undefined}
			bottomBar={showBottomBar ? bottomBarSnippet : undefined}
		>
			<div class="flex w-full">
				{#if showStart}
					<Sidebar class="w-32 bg-primary/10 h-full">
						<div class="flex items-center justify-center h-full">
							<p class="text-xs transform -rotate-90 whitespace-nowrap">Start (fixed)</p>
						</div>
					</Sidebar>
				{/if}

				<div class="p-4 h-full overflow-auto flex-1">
					<Card variant="surface" bodyClass="column gap-4">
						<h3 class="text-sm font-semibold">Main Content</h3>
						<p class="text-xs">This is the main scrollable content area.</p>
					</Card>
				</div>
				{#if showEnd}
					<Card class="w-32 bg-secondary/10 h-full">
						<div class="flex items-center justify-center h-full">
							<p class="text-xs transform -rotate-90 whitespace-nowrap">End (fixed)</p>
						</div>
					</Card>
				{/if}
			</div>
		</Scaffold>
	</div>
{/snippet}

{#snippet builder()}
	<DocOptions title="Sections">
		<Checkbox bind:checked={showAppBar} label="AppBar" />
		<Checkbox bind:checked={showBottomBar} label="BottomBar" />
		<Checkbox bind:checked={showStart} label="Start Sidebar" />
		<Checkbox bind:checked={showEnd} label="End Sidebar" />
	</DocOptions>
{/snippet}

<DocHeader title="Scaffold">
	Scaffold is a layout component that provides a base structure for your application with support
	for AppBar, side Sidebars (start/end), and BottomBar.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<!-- Important Usage Section -->
<div class="mt-8 p-6 bg-info/10 rounded-lg border border-info/20">
	<h3 class="text-lg font-semibold mb-4 text-info">💡 Important: Scaffold Layout System</h3>

	<div class="space-y-4 text-sm">
		<div>
			<h4 class="font-semibold mb-2">How Scaffold Works</h4>
			<p class="mb-2">
				The Scaffold component uses <code class="px-2 py-1 bg-surface rounded">fixed</code>
				positioning internally for the <code class="px-2 py-1 bg-surface rounded">start</code> and
				<code class="px-2 py-1 bg-surface rounded">end</code> sidebars. This means:
			</p>
			<ul class="list-disc list-inside space-y-1 ml-2">
				<li>
					<strong>No margins needed</strong> - The component automatically handles the layout
				</li>
				<li>
					<strong>Just set widths</strong> - Use width classes like
					<code class="px-1 py-0.5 bg-surface rounded text-xs">w-48</code> or
					<code class="px-1 py-0.5 bg-surface rounded text-xs">w-56</code> on
					<code class="px-1 py-0.5 bg-surface rounded text-xs">startClass</code> and
					<code class="px-1 py-0.5 bg-surface rounded text-xs">endClass</code>
				</li>
				<li>
					<strong>Responsive visibility</strong> - Use
					<code class="px-1 py-0.5 bg-surface rounded text-xs">invisible lg:visible</code> to hide sidebars
					on mobile
				</li>
			</ul>
		</div>

		<div>
			<h4 class="font-semibold mb-2">AppBar Spacing</h4>
			<p class="mb-2">
				When using an <code class="px-2 py-1 bg-surface rounded">AppBar</code>, you need to add top
				margin to the <code class="px-2 py-1 bg-surface rounded">bodyClass</code>:
			</p>
			<ul class="list-disc list-inside space-y-1 ml-2">
				<li>
					If AppBar has <code class="px-1 py-0.5 bg-surface rounded text-xs">h-16</code>, add
					<code class="px-1 py-0.5 bg-surface rounded text-xs">mt-16</code> to
					<code class="px-1 py-0.5 bg-surface rounded text-xs">bodyClass</code>
				</li>
				<li>This creates space for the fixed AppBar at the top</li>
			</ul>
		</div>

		<div>
			<h4 class="font-semibold mb-2">vh Utilities for Sidebar Height</h4>
			<p class="mb-2">
				Use <code class="px-2 py-1 bg-surface rounded">vh-*</code> utilities on sidebars to ensure they
				fill the viewport correctly:
			</p>
			<ul class="list-disc list-inside space-y-1 ml-2">
				<li>
					<code class="px-1 py-0.5 bg-surface rounded text-xs">vh-16</code> =
					<code class="px-1 py-0.5 bg-surface rounded text-xs">calc(100vh - 4rem)</code> - Use when
					there's an AppBar with <code class="px-1 py-0.5 bg-surface rounded text-xs">h-16</code>
				</li>
				<li>
					<code class="px-1 py-0.5 bg-surface rounded text-xs">vh-32</code> =
					<code class="px-1 py-0.5 bg-surface rounded text-xs">calc(100vh - 8rem)</code> - Use when
					there's both AppBar and BottomBar with
					<code class="px-1 py-0.5 bg-surface rounded text-xs">h-16</code> each
				</li>
			</ul>
			<p class="mt-2">
				Apply these to the <strong>Sidebar component</strong> inside the start/end snippets, not to
				<code class="px-1 py-0.5 bg-surface rounded text-xs">startClass</code> or
				<code class="px-1 py-0.5 bg-surface rounded text-xs">endClass</code>.
			</p>
		</div>

		<div>
			<h4 class="font-semibold mb-2">Dashboard Example</h4>
			<div class="bg-surface rounded p-4 overflow-x-auto">
				<pre class="text-xs"><code
						>{`<Scaffold
  mainClass="lg:p-4 pb-16"
  startClass="invisible lg:visible lg:w-56"
  endClass="invisible lg:visible lg:w-56"
  bodyClass="bg-background mt-16"
  isBoxed
>
  {#snippet appBar()}
    <AppBar class="h-16" isSticky isBoxed>
      <!-- AppBar content -->
    </AppBar>
  {/snippet}

  {#snippet start()}
    <Sidebar class="pb-8 vh-16">
      <!-- Sidebar navigation -->
    </Sidebar>
  {/snippet}

  <!-- Main content -->
  {@render children()}

  {#snippet end()}
    <Sidebar class="pb-8 vh-16">
      <!-- Right sidebar content -->
    </Sidebar>
  {/snippet}
</Scaffold>`}</code
					></pre>
			</div>
			<p class="mt-2 text-xs">Key points:</p>
			<ul class="list-disc list-inside space-y-1 ml-2 text-xs">
				<li>
					<code class="px-1 py-0.5 bg-surface rounded text-xs"
						>startClass="invisible lg:visible lg:w-56"</code
					>
					- Sidebar is 56 width units on large screens, hidden on mobile
				</li>
				<li>
					<code class="px-1 py-0.5 bg-surface rounded text-xs">bodyClass="mt-16"</code> - Creates space
					for the h-16 AppBar
				</li>
				<li>
					<code class="px-1 py-0.5 bg-surface rounded text-xs">vh-16</code> on Sidebar - Fills viewport
					minus AppBar height
				</li>
				<li>
					<code class="px-1 py-0.5 bg-surface rounded text-xs">isBoxed</code> - Centers content with max-width
					container
				</li>
			</ul>
		</div>

		<div>
			<h4 class="font-semibold mb-2">Landing Page Example</h4>
			<div class="bg-surface rounded p-4 overflow-x-auto">
				<pre class="text-xs"><code
						>{`<Scaffold mainClass="vh-16 mt-16">
  {#snippet appBar()}
    <AppBar class="h-16" isBoxed isSticky>
      <!-- AppBar content -->
    </AppBar>
  {/snippet}

  <!-- Main content -->
  {@render children()}
</Scaffold>`}</code
					></pre>
			</div>
			<p class="mt-2 text-xs">Key points:</p>
			<ul class="list-disc list-inside space-y-1 ml-2 text-xs">
				<li>
					<code class="px-1 py-0.5 bg-surface rounded text-xs">mainClass="vh-16 mt-16"</code> - Main content
					fills viewport minus AppBar, with top margin for AppBar
				</li>
				<li>No sidebars needed for simple landing pages</li>
			</ul>
		</div>

		<div class="mt-4 p-4 bg-warning/10 rounded border border-warning/20">
			<p class="text-xs">
				<strong>⚠️ Common Mistake:</strong> Don't add margin classes to
				<code class="px-1 py-0.5 bg-surface rounded text-xs">mainClass</code> for sidebars (like
				<code class="px-1 py-0.5 bg-surface rounded text-xs">ml-48</code> or
				<code class="px-1 py-0.5 bg-surface rounded text-xs">mr-56</code>). The component handles
				this automatically with fixed positioning.
			</p>
		</div>
	</div>
</div>

<!-- Sección de vh Utilities Disponibles -->
<div class="mt-8 p-6 bg-surface rounded-lg border">
	<h3 class="text-lg font-semibold mb-4">Available vh Utilities</h3>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		<div class="p-3 bg-background rounded">
			<code class="text-sm font-mono">vh-8</code>
			<p class="text-xs mt-1 text-muted-foreground">calc(100vh - 2rem)</p>
		</div>
		<div class="p-3 bg-background rounded">
			<code class="text-sm font-mono">vh-10</code>
			<p class="text-xs mt-1 text-muted-foreground">calc(100vh - 2.5rem)</p>
		</div>
		<div class="p-3 bg-background rounded">
			<code class="text-sm font-mono">vh-12</code>
			<p class="text-xs mt-1 text-muted-foreground">calc(100vh - 3rem)</p>
		</div>
		<div class="p-3 bg-background rounded">
			<code class="text-sm font-mono">vh-14</code>
			<p class="text-xs mt-1 text-muted-foreground">calc(100vh - 3.5rem)</p>
		</div>
		<div class="p-3 bg-background rounded">
			<code class="text-sm font-mono">vh-16</code>
			<p class="text-xs mt-1 text-muted-foreground">calc(100vh - 4rem)</p>
		</div>
		<div class="p-3 bg-background rounded">
			<code class="text-sm font-mono">vh-20</code>
			<p class="text-xs mt-1 text-muted-foreground">calc(100vh - 5rem)</p>
		</div>
		<div class="p-3 bg-background rounded">
			<code class="text-sm font-mono">vh-24</code>
			<p class="text-xs mt-1 text-muted-foreground">calc(100vh - 6rem)</p>
		</div>
		<div class="p-3 bg-background rounded">
			<code class="text-sm font-mono">vh-32</code>
			<p class="text-xs mt-1 text-muted-foreground">calc(100vh - 8rem)</p>
		</div>
		<div class="p-3 bg-background rounded">
			<code class="text-sm font-mono">vh-40</code>
			<p class="text-xs mt-1 text-muted-foreground">calc(100vh - 10rem)</p>
		</div>
	</div>
</div>
