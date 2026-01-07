<script lang="ts">
	import { Button, Card, Code, Section, Select, Chip } from 'ui-svelte';
	import { useBreakpoint } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const breakpointOptions = [
		{ id: 'xs', label: 'xs (0px)' },
		{ id: 'sm', label: 'sm (640px)' },
		{ id: 'md', label: 'md (768px)' },
		{ id: 'lg', label: 'lg (1024px)' },
		{ id: 'xl', label: 'xl (1280px)' },
		{ id: '2xl', label: '2xl (1536px)' }
	];

	let selectedBreakpoint: any = $state('md');
	const bp = useBreakpoint('md');

	let code = $derived(() => {
		return `<script lang="ts">
	import { useBreakpoint } from 'ui-svelte';

	const bp = useBreakpoint('${selectedBreakpoint}');
<\/script>

{#if bp.isBelow}
	<p>Screen is below ${selectedBreakpoint} breakpoint</p>
{:else}
	<p>Screen is above or equal to ${selectedBreakpoint} breakpoint</p>
{/if}

<p>Current width: {bp.width}px</p>`;
	});

	const props = [
		{ prop: 'breakpoint', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", initial: 'required' }
	];

	const returns = [
		{ prop: 'isBelow', type: 'boolean', initial: 'true if width < breakpoint' },
		{ prop: 'isAbove', type: 'boolean', initial: 'true if width >= breakpoint' },
		{ prop: 'width', type: 'number', initial: 'Current window width in px' },
		{ prop: 'breakpointValue', type: 'number', initial: 'Breakpoint value in px' }
	];

	const breakpointsTable = [
		{ breakpoint: 'xs', value: '0px' },
		{ breakpoint: 'sm', value: '640px' },
		{ breakpoint: 'md', value: '768px' },
		{ breakpoint: 'lg', value: '1024px' },
		{ breakpoint: 'xl', value: '1280px' },
		{ breakpoint: '2xl', value: '1536px' }
	];
</script>

<DocsHeader title="useBreakpoint">
	A reactive hook that tracks window width and compares it against Tailwind CSS breakpoints. Useful
	for conditionally applying classes or rendering components based on screen size.
</DocsHeader>

<Section>
	<Card color="background" variant="outlined">
		<div class="grid-2 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Breakpoint"
				size="sm"
				options={breakpointOptions}
				bind:value={selectedBreakpoint}
			/>
		</div>

		<div class="doc-preview">
			<div class="column gap-4 center">
				<div class="row gap-2 center">
					<Chip color={bp.isBelow ? 'success' : 'muted'} variant="soft">isBelow: {bp.isBelow}</Chip>
					<Chip color={bp.isAbove ? 'success' : 'muted'} variant="soft">isAbove: {bp.isAbove}</Chip>
				</div>
				<p>Current width: <strong>{bp.width}px</strong></p>
				<p class="text-sm">Resize the window to see the values change</p>
			</div>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Breakpoints Reference</p>
	<Card color="background" variant="outlined">
		<div class="grid-2 md:grid-3 lg:grid-6 gap-4">
			{#each breakpointsTable as item}
				<div class="column center gap-1">
					<Chip color="primary" variant="soft">{item.breakpoint}</Chip>
					<span class="text-sm">{item.value}</span>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Usage Example</p>
	<Card color="background" variant="outlined">
		<Code
			lang="svelte"
			code={`<script lang="ts">
	import { useBreakpoint } from 'ui-svelte';

	const md = useBreakpoint('md');
	const lg = useBreakpoint('lg');
<\/script>

<!-- Conditional rendering -->
{#if md.isBelow}
	<MobileNav />
{:else}
	<DesktopNav />
{/if}

<!-- Conditional classes -->
<div class={lg.isAbove ? 'grid-4' : 'grid-2'}>
	...
</div>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Parameters</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">Returns</p>
	<DocsProps props={returns} />
</Section>
