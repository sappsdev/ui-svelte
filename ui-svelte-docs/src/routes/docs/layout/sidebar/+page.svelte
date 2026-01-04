<script lang="ts">
	import { Button, Card, Checkbox, Code, Section, Select, Sidebar, SideNav } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	let showHeader = $state(true);
	let showFooter = $state(true);
	let color = $state<
		| 'primary'
		| 'secondary'
		| 'muted'
		| 'success'
		| 'info'
		| 'warning'
		| 'danger'
		| 'surface'
		| 'background'
	>('surface');
	let variant = $state<'solid' | 'soft' | 'outlined' | 'ghost'>('ghost');

	let hasProps = $derived([showHeader, showFooter].some(Boolean));

	const navItems: any = [
		{
			type: 'header',
			label: 'Navigation'
		},
		{ label: 'Dashboard', icon: 'fluent:home-24-regular', href: '#/' },
		{ label: 'Projects', icon: 'fluent:folder-24-regular', href: '#/' },
		{ label: 'Settings', icon: 'fluent:settings-24-regular', href: '#/' }
	];

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'background', label: 'Background' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Sidebar, SideNav, Button } from 'ui-svelte';`,
			showHeader &&
				`\n\tconst navItems = [
\t\t{ type: 'header', label: 'Navigation' },
\t\t{ label: 'Dashboard', icon: 'fluent:home-24-regular', href: '/#' },
\t\t{ label: 'Projects', icon: 'fluent:folder-24-regular', href: '/projects' },
\t\t{ label: 'Settings', icon: 'fluent:settings-24-regular', href: '/settings' }
\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Sidebar`,
			`\tclass="w-48"`,
			color !== 'surface' && `\tcolor="${color}"`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			hasProps && `>`,
			!hasProps && `<Sidebar class="w-48">`,
			showHeader && `\t{#snippet header()}`,
			showHeader && `\t\t<h3 class="text-lg font-semibold">Menu</h3>`,
			showHeader && `\t{/snippet}\n`,
			`\t<SideNav items={navItems} />`,
			showFooter && `\n\t{#snippet footer()}`,
			showFooter && `\t\t<Button variant="ghost" class="w-full">Sign Out</Button>`,
			showFooter && `\t{/snippet}`,
			`</Sidebar>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'children', type: 'Snippet', initial: '', required: true },
		{ prop: 'header', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' },
		{
			prop: 'color',
			type: "'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'warning' | 'danger' | 'surface' | 'background'",
			initial: "'surface'"
		},
		{ prop: 'variant', type: "'solid' | 'soft' | 'outlined' | 'ghost'", initial: "'ghost'" },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'contentClass', type: 'string', initial: '' },
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'footerClass', type: 'string', initial: '' }
	];
</script>

{#snippet header()}
	<h3 class="text-lg font-semibold">Menu</h3>
{/snippet}

{#snippet footer()}
	<Button class="w-full">Sign Out</Button>
{/snippet}

<DocsHeader title="Sidebar" llmUrl="https://ui-svelte.sappsdev.com/llm/layout/sidebar.md">
	Sidebar is a vertical navigation component that provides a structured layout with optional header
	and footer sections. It's commonly used within the Scaffold component for application navigation.
</DocsHeader>

<Section>
	<Card color="background" variant="outlined">
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={showHeader} label="Header" />
			<Checkbox bind:checked={showFooter} label="Footer" />
		</div>
		<div class="grid-2 gap-2">
			<Select bind:value={color} options={colorOptions as any} label="Color" />
			<Select bind:value={variant} options={variantOptions as any} label="Variant" />
		</div>

		<div class="doc-preview">
			<div
				class="w-full min-h-[400px] border border-border rounded-lg overflow-hidden bg-background relative flex"
			>
				<Sidebar
					rootClass="w-64"
					{color}
					{variant}
					header={showHeader ? header : undefined}
					footer={showFooter ? footer : undefined}
				>
					<SideNav items={navItems} />
				</Sidebar>
				<div class="flex-1 p-6">
					<p class="text-sm">Main content area</p>
				</div>
			</div>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Usage with Scaffold</p>
	<Card color="background" variant="outlined">
		<div class="space-y-4">
			<div class="p-4 bg-warning/10 rounded-lg border border-warning/20">
				<h4 class="font-semibold mb-2 text-warning">⚠️ Fixed Positioning</h4>
				<p class="text-sm">
					When used within the <code class="px-2 py-1 bg-surface rounded">Scaffold</code>
					component's
					<code class="px-2 py-1 bg-surface rounded">start</code> or
					<code class="px-2 py-1 bg-surface rounded">end</code> snippets, the Sidebar automatically
					receives <code class="px-2 py-1 bg-surface rounded">fixed</code> positioning.
				</p>
			</div>

			<div>
				<h4 class="font-semibold mb-2">Width and Margins</h4>
				<p class="text-sm mb-2">
					You must specify the Sidebar width using the <code class="px-2 py-1 bg-surface rounded"
						>class</code
					> prop and apply corresponding margins to the main content:
				</p>
				<ul class="list-disc list-inside space-y-1 ml-2 text-sm">
					<li>
						If Sidebar has <code class="px-2 py-1 bg-surface rounded">w-48</code>, use
						<code class="px-2 py-1 bg-surface rounded">ml-48</code> or
						<code class="px-2 py-1 bg-surface rounded">mr-48</code> in Scaffold's
						<code class="px-2 py-1 bg-surface rounded">mainClass</code>
					</li>
					<li>
						If Sidebar has <code class="px-2 py-1 bg-surface rounded">w-64</code>, use
						<code class="px-2 py-1 bg-surface rounded">ml-64</code> or
						<code class="px-2 py-1 bg-surface rounded">mr-64</code> in Scaffold's
						<code class="px-2 py-1 bg-surface rounded">mainClass</code>
					</li>
				</ul>
			</div>

			<div>
				<h4 class="font-semibold mb-2">vh Utilities with AppBar</h4>
				<p class="text-sm mb-2">
					When using Sidebar with an AppBar, apply <code class="px-2 py-1 bg-surface rounded"
						>vh-*</code
					> utilities to ensure proper height calculation:
				</p>
				<ul class="list-disc list-inside space-y-1 ml-2 text-sm">
					<li>
						Use <code class="px-2 py-1 bg-surface rounded">vh-16</code> when AppBar has
						<code class="px-2 py-1 bg-surface rounded">h-16</code>
					</li>
					<li>
						Use <code class="px-2 py-1 bg-surface rounded">vh-32</code> when both AppBar and
						BottomBar have <code class="px-2 py-1 bg-surface rounded">h-16</code>
					</li>
					<li>
						Apply <code class="px-2 py-1 bg-surface rounded">mt-16</code> to match the AppBar height
					</li>
				</ul>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Complete Example with Scaffold</p>
	<Card color="background" variant="outlined">
		<Code
			lang="svelte"
			code={`<Scaffold
  mainClass="lg:ml-48 vh-16 mt-16"
  startClass="vh-16 mt-16"
>
  {#snippet appBar()}
    <AppBar class="h-16">
      <!-- AppBar content -->
    </AppBar>
  {/snippet}

  {#snippet start()}
    <Sidebar class="w-48" color="surface" variant="soft">
      {#snippet header()}
        <h3>Navigation</h3>
      {/snippet}

      <SideNav items={navItems} />

      {#snippet footer()}
        <Button variant="ghost">Sign Out</Button>
      {/snippet}
    </Sidebar>
  {/snippet}

  <!-- Main content -->
  <div class="p-4">
    <h1>Main Content</h1>
  </div>
</Scaffold>`}
		/>
		<div class="mt-4 p-4 bg-info/10 rounded border border-info/20">
			<p class="text-sm">
				💡 <strong>Tip:</strong> In this example,
				<code class="px-1 py-0.5 bg-surface rounded text-xs">vh-16</code> calculates height as
				<code class="px-1 py-0.5 bg-surface rounded text-xs">calc(100vh - 4rem)</code>,
				<code class="px-1 py-0.5 bg-surface rounded text-xs">mt-16</code> creates space for the
				fixed AppBar, and <code class="px-1 py-0.5 bg-surface rounded text-xs">ml-48</code> creates space
				for the fixed Sidebar.
			</p>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Responsive Layout Example</p>
	<Card color="background" variant="outlined">
		<Code
			lang="svelte"
			code={`<Scaffold
  mainClass="lg:ml-48 vh-16 mt-16"
  startClass="invisible lg:visible vh-16 mt-16"
>
  {#snippet appBar()}
    <AppBar class="h-16">
      {#snippet start()}
        <IconButton
          icon="fluent:navigation-24-regular"
          onclick={() => drawerOpen = true}
          class="lg:hidden"
        />
      {/snippet}
    </AppBar>
  {/snippet}

  {#snippet start()}
    <Sidebar class="w-48" color="primary" variant="solid">
      <SideNav items={navItems} />
    </Sidebar>
  {/snippet}

  <div class="p-4">Main content</div>
</Scaffold>

<!-- Mobile drawer -->
<Drawer bind:open={drawerOpen}>
  <Sidebar class="w-64" color="primary" variant="solid">
    <SideNav items={navItems} />
  </Sidebar>
</Drawer>`}
		/>
		<p class="mt-4 text-sm">
			This pattern shows the Sidebar on desktop screens (lg and above) and uses a Drawer for mobile
			devices.
		</p>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
