<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Scaffold, AppBar, Sidebar, Card, Checkbox, Select } from 'ui-svelte';

	const vhOptions = [
		{ id: 'none', label: 'None' },
		{ id: 'vh-16', label: 'vh-16 (AppBar)' },
		{ id: 'vh-32', label: 'vh-32 (AppBar + BottomBar)' }
	];

	// States
	let showAppBar = $state(true);
	let showBottomBar = $state(false);
	let showStart = $state(true);
	let showEnd = $state(true);
	let vhUtility: any = $state('vh-16');

	let hasProps = $derived(
		[showAppBar, showBottomBar, showStart, showEnd, vhUtility !== 'none'].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Scaffold, AppBar, Sidebar, Card } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Scaffold`,
			showStart &&
				`\tmainClass="${vhUtility !== 'none' ? vhUtility + ' ' : ''}lg:ml-48${showEnd ? ' xl:mr-56' : ''}"`,
			showStart && vhUtility !== 'none' && `\tstartClass="${vhUtility} mt-16"`,
			showEnd && vhUtility !== 'none' && `\tendClass="${vhUtility} mt-16"`,
			hasProps && `>`,
			!hasProps && `<Scaffold>`,
			showAppBar && `\t{#snippet appBar()}`,
			showAppBar && `\t\t<AppBar class="h-16">`,
			showAppBar && `\t\t\t<!-- AppBar content -->`,
			showAppBar && `\t\t</AppBar>`,
			showAppBar && `\t{/snippet}\n`,
			showStart && `\t{#snippet start()}`,
			showStart && `\t\t<Sidebar class="w-48">`,
			showStart && `\t\t\t<!-- Sidebar content -->`,
			showStart && `\t\t</Sidebar>`,
			showStart && `\t{/snippet}\n`,
			`\t<!-- Main content -->`,
			`\t<div class="p-4">`,
			`\t\t<h1>Main Content</h1>`,
			`\t</div>`,
			showEnd && `\n\t{#snippet end()}`,
			showEnd && `\t\t<Card>`,
			showEnd && `\t\t\t<!-- End sidebar content -->`,
			showEnd && `\t\t</Card>`,
			showEnd && `\t{/snippet}`,
			showBottomBar && `\n\t{#snippet bottomBar()}`,
			showBottomBar && `\t\t<AppBar class="h-16">`,
			showBottomBar && `\t\t\t<!-- BottomBar content -->`,
			showBottomBar && `\t\t</AppBar>`,
			showBottomBar && `\t{/snippet}`,
			`</Scaffold>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
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

{#snippet preview()}
	<div class="w-full h-96 border-2 border-dashed rounded relative overflow-hidden">
		<Scaffold
			mainClass="{vhUtility !== 'none' && showAppBar ? vhUtility + ' ' : ''}{showStart
				? 'ml-32 '
				: ''}{showEnd ? 'mr-32 ' : ''}{showAppBar ? 'mt-12' : ''}"
			startClass="{vhUtility !== 'none' && showAppBar ? vhUtility + ' ' : ''}w-32{showAppBar
				? ' mt-12'
				: ''}"
			endClass="{vhUtility !== 'none' && showAppBar ? vhUtility + ' ' : ''}w-32{showAppBar
				? ' mt-12'
				: ''}"
		>
			{#if showAppBar}
				{#snippet appBar()}
					<AppBar class="h-12 text-xs">
						<span class="text-xs">AppBar (fixed)</span>
					</AppBar>
				{/snippet}
			{/if}
			{#if showStart}
				{#snippet start()}
					<div class="bg-primary/10 h-full flex items-center justify-center">
						<p class="text-xs transform -rotate-90 whitespace-nowrap">Start (fixed)</p>
					</div>
				{/snippet}
			{/if}
			<div class="p-4 h-full overflow-auto">
				<h3 class="text-sm font-semibold mb-2">Main Content</h3>
				<p class="text-xs">This is the main scrollable content.</p>
			</div>
			{#if showEnd}
				{#snippet end()}
					<div class="bg-secondary/10 h-full flex items-center justify-center">
						<p class="text-xs transform -rotate-90 whitespace-nowrap">End (fixed)</p>
					</div>
				{/snippet}
			{/if}
			{#if showBottomBar}
				{#snippet bottomBar()}
					<AppBar class="h-12 text-xs">
						<span class="text-xs">BottomBar (fixed)</span>
					</AppBar>
				{/snippet}
			{/if}
		</Scaffold>
	</div>
{/snippet}

{#snippet builder()}
	<Select label="vh Utility" size="sm" options={vhOptions} bind:value={vhUtility} />

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

<!-- Sección de Uso Importante -->
<div class="mt-8 p-6 bg-warning/10 rounded-lg border border-warning/20">
	<h3 class="text-lg font-semibold mb-4 text-warning">
		⚠️ Important: Fixed Classes and vh Utilities Usage
	</h3>

	<div class="space-y-4 text-sm">
		<div>
			<h4 class="font-semibold mb-2">Fixed Classes</h4>
			<p class="mb-2">
				The <code class="px-2 py-1 bg-surface rounded">start</code> and
				<code class="px-2 py-1 bg-surface rounded">end</code> components have
				<code class="px-2 py-1 bg-surface rounded">fixed</code> classes by default. Additionally, if
				you use
				<code class="px-2 py-1 bg-surface rounded">AppBar</code> or
				<code class="px-2 py-1 bg-surface rounded">BottomBar</code>, these also have
				<code class="px-2 py-1 bg-surface rounded">fixed</code> classes.
			</p>
		</div>

		<div>
			<h4 class="font-semibold mb-2">Margins Usage</h4>
			<p class="mb-2">
				To achieve a correct layout, you must use margins in
				<code class="px-2 py-1 bg-surface rounded">mainClass</code>,
				<code class="px-2 py-1 bg-surface rounded">startClass</code>, and
				<code class="px-2 py-1 bg-surface rounded">endClass</code>.
			</p>
			<ul class="list-disc list-inside space-y-1 ml-2">
				<li>
					If you have a <code class="px-2 py-1 bg-surface rounded">start</code> sidebar with
					<code class="px-2 py-1 bg-surface rounded">w-48</code>, use
					<code class="px-2 py-1 bg-surface rounded">ml-48</code> in
					<code class="px-2 py-1 bg-surface rounded">mainClass</code>
				</li>
				<li>
					If you have an <code class="px-2 py-1 bg-surface rounded">end</code> sidebar with
					<code class="px-2 py-1 bg-surface rounded">w-56</code>, use
					<code class="px-2 py-1 bg-surface rounded">mr-56</code> in
					<code class="px-2 py-1 bg-surface rounded">mainClass</code>
				</li>
				<li>
					If you have an <code class="px-2 py-1 bg-surface rounded">AppBar</code> with
					<code class="px-2 py-1 bg-surface rounded">h-16</code>, use
					<code class="px-2 py-1 bg-surface rounded">mt-16</code> in
					<code class="px-2 py-1 bg-surface rounded">mainClass</code>,
					<code class="px-2 py-1 bg-surface rounded">startClass</code>, and
					<code class="px-2 py-1 bg-surface rounded">endClass</code>
				</li>
			</ul>
		</div>

		<div>
			<h4 class="font-semibold mb-2">vh Utilities</h4>
			<p class="mb-2">
				The <code class="px-2 py-1 bg-surface rounded">vh-*</code> utilities calculate the viewport height
				by subtracting the specified value:
			</p>
			<ul class="list-disc list-inside space-y-1 ml-2">
				<li>
					<code class="px-2 py-1 bg-surface rounded">vh-16</code>: Calculates
					<code class="px-2 py-1 bg-surface rounded">calc(100vh - 4rem)</code> - Ideal when there's
					only an AppBar with <code class="px-2 py-1 bg-surface rounded">h-16</code>
				</li>
				<li>
					<code class="px-2 py-1 bg-surface rounded">vh-32</code>: Calculates
					<code class="px-2 py-1 bg-surface rounded">calc(100vh - 8rem)</code> - Ideal when there's
					both AppBar and BottomBar, each with
					<code class="px-2 py-1 bg-surface rounded">h-16</code>
				</li>
			</ul>
			<p class="mt-2">
				These utilities are applied to <code class="px-2 py-1 bg-surface rounded">mainClass</code>,
				<code class="px-2 py-1 bg-surface rounded">startClass</code>, and
				<code class="px-2 py-1 bg-surface rounded">endClass</code> so that components have the correct
				height without causing scroll on the main page.
			</p>
		</div>

		<div>
			<h4 class="font-semibold mb-2">Complete Example</h4>
			<div class="bg-surface rounded p-4 overflow-x-auto">
				<pre class="text-xs"><code
						>{`<Scaffold
  mainClass="lg:ml-48 xl:mr-56 vh-16 mt-16"
  startClass="vh-16 mt-16"
  endClass="vh-16 mt-16"
>
  {#snippet appBar()}
    <AppBar class="h-16">
      <!-- AppBar content -->
    </AppBar>
  {/snippet}

  {#snippet start()}
    <Sidebar class="w-48">
      <!-- Start sidebar content -->
    </Sidebar>
  {/snippet}

  <!-- Main content -->
  <div>Content</div>

  {#snippet end()}
    <div class="w-56">
      <!-- End sidebar content -->
    </div>
  {/snippet}
</Scaffold>`}</code
					></pre>
			</div>
			<p class="mt-2 text-xs">In this example:</p>
			<ul class="list-disc list-inside space-y-1 ml-2 text-xs">
				<li>
					<code class="px-1 py-0.5 bg-surface rounded text-xs">vh-16</code> is used because there's
					an AppBar with <code class="px-1 py-0.5 bg-surface rounded text-xs">h-16</code>
				</li>
				<li>
					<code class="px-1 py-0.5 bg-surface rounded text-xs">mt-16</code> creates space for the fixed
					AppBar
				</li>
				<li>
					<code class="px-1 py-0.5 bg-surface rounded text-xs">ml-48</code> creates space for the start
					sidebar
				</li>
				<li>
					<code class="px-1 py-0.5 bg-surface rounded text-xs">mr-56</code> creates space for the end
					sidebar
				</li>
			</ul>
		</div>

		<div class="mt-4 p-4 bg-info/10 rounded border border-info/20">
			<p class="text-xs">
				💡 <strong>Tip:</strong> If you have both AppBar and BottomBar, each with
				<code class="px-1 py-0.5 bg-surface rounded text-xs">h-16</code>, you should use
				<code class="px-1 py-0.5 bg-surface rounded text-xs">vh-32</code> instead of
				<code class="px-1 py-0.5 bg-surface rounded text-xs">vh-16</code> to add both heights (16 + 16
				= 32).
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
