<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Marquee, Select, Checkbox } from 'ui-svelte';

	const speedOptions = [
		{ id: 'slow', label: 'Slow' },
		{ id: 'normal', label: 'Normal' },
		{ id: 'fast', label: 'Fast' }
	];

	const orientationOptions = [
		{ id: 'horizontal', label: 'Horizontal' },
		{ id: 'vertical', label: 'Vertical' }
	];

	const gapOptions = [
		{ id: '0', label: 'None (0)' },
		{ id: '0.5rem', label: 'Small (0.5rem)' },
		{ id: '1rem', label: 'Medium (1rem)' },
		{ id: '2rem', label: 'Large (2rem)' }
	];

	const technologies = [
		'React',
		'Vue',
		'Angular',
		'Svelte',
		'Next.js',
		'Nuxt',
		'Astro',
		'SvelteKit',
		'Remix',
		'Solid'
	];

	// Selects
	let speed: any = $state('normal');
	let orientation: any = $state('horizontal');
	let gap: any = $state('1rem');

	// States
	let pauseOnHover = $state(true);
	let reverse = $state(false);
	let fade = $state(true);
	let fadeColor = $state('#ffffff');

	let hasProps = $derived(
		[
			speed !== 'normal',
			orientation !== 'horizontal',
			gap !== '0',
			pauseOnHover,
			reverse,
			fade,
			fadeColor !== '#ffffff'
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Marquee } from 'ui-svelte';`,
			`\n\tconst items = [`,
			`\t\t{`,
			`\t\t\tid: 1,`,
			`\t\t\tcontent: () => (`,
			`\t\t\t\t<div class="px-6 py-3 bg-primary text-on-primary rounded-lg">`,
			`\t\t\t\t\tReact`,
			`\t\t\t\t</div>`,
			`\t\t\t)`,
			`\t\t},`,
			`\t\t{`,
			`\t\t\tid: 2,`,
			`\t\t\tcontent: () => (`,
			`\t\t\t\t<div class="px-6 py-3 bg-primary text-on-primary rounded-lg">`,
			`\t\t\t\t\tVue`,
			`\t\t\t\t</div>`,
			`\t\t\t)`,
			`\t\t},`,
			`\t\t// ... más items`,
			`\t];`,
			`<\/script>`,
			``,
			`<!-- Usando items array -->`
		];

		const componentLines = [
			hasProps && `<Marquee`,
			hasProps && `\titems={items}`,
			speed !== 'normal' && `\tspeed="${speed}"`,
			orientation !== 'horizontal' && `\torientation="${orientation}"`,
			gap !== '0' && `\tgap="${gap}"`,
			pauseOnHover && `\tpauseOnHover`,
			reverse && `\treverse`,
			fade && `\tfade`,
			fadeColor !== '#ffffff' && `\tfadeColor="${fadeColor}"`,
			hasProps && `/>`,
			!hasProps && `<Marquee items={items} />`,
			``,
			`<!-- O usando children (más simple) -->`,
			`<Marquee${speed !== 'normal' ? ` speed="${speed}"` : ''}${pauseOnHover ? ' pauseOnHover' : ''}${fade ? ' fade' : ''}>`,
			`\t<div class="px-6 py-3 bg-primary text-on-primary rounded-lg">React</div>`,
			`\t<div class="px-6 py-3 bg-primary text-on-primary rounded-lg">Vue</div>`,
			`\t<div class="px-6 py-3 bg-primary text-on-primary rounded-lg">Angular</div>`,
			`</Marquee>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'items', type: 'MarqueeItem[]', initial: '[]' },
		{ prop: 'speed', type: 'slow | normal | fast', initial: 'normal' },
		{ prop: 'pauseOnHover', type: 'boolean', initial: 'false' },
		{ prop: 'reverse', type: 'boolean', initial: 'false' },
		{ prop: 'orientation', type: 'horizontal | vertical', initial: 'horizontal' },
		{ prop: 'fade', type: 'boolean', initial: 'false' },
		{ prop: 'fadeColor', type: 'string', initial: 'white' },
		{ prop: 'gap', type: 'string', initial: '0' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'itemClass', type: 'string', initial: '' },
		{ prop: 'children', type: 'Snippet', initial: '' }
	];

	const itemProps = [
		{ prop: 'id', type: 'string | number', initial: '', required: true },
		{ prop: 'content', type: 'Snippet', initial: '', required: true }
	];
</script>

{#snippet preview()}
	<div class={orientation === 'vertical' ? 'h-[300px]' : 'w-full'}>
		<Marquee {speed} {orientation} {gap} {pauseOnHover} {reverse} {fade} {fadeColor}>
			{#each technologies as tech}
				<div class="px-6 py-3 bg-primary text-on-primary rounded-lg font-medium whitespace-nowrap">
					{tech}
				</div>
			{/each}
		</Marquee>
	</div>
{/snippet}

{#snippet builder()}
	<Select label="Speed" size="sm" options={speedOptions} bind:value={speed} />
	<Select label="Orientation" size="sm" options={orientationOptions} bind:value={orientation} />
	<Select label="Gap" size="sm" options={gapOptions} bind:value={gap} />

	<DocOptions title="Behavior">
		<Checkbox bind:checked={pauseOnHover} label="Pause on Hover" />
		<Checkbox bind:checked={reverse} label="Reverse" />
	</DocOptions>

	<DocOptions title="Visual Effects">
		<Checkbox bind:checked={fade} label="Fade Edges" />
		{#if fade}
			<div class="flex flex-col gap-2 pl-6">
				<label class="text-sm font-medium">
					Fade Color
					<input
						type="color"
						bind:value={fadeColor}
						class="ml-2 h-8 w-16 rounded border cursor-pointer"
					/>
				</label>
			</div>
		{/if}
	</DocOptions>
{/snippet}

<DocHeader title="Marquee">
	A widget that scrolls its content horizontally or vertically when it overflows the available
	space.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<div class="prose mt-8">
	<h3>Usage</h3>
	<p>The Marquee component can be used in two ways:</p>
	<ol>
		<li>
			<strong>Using children (recommended):</strong> Simply place your content as children of the Marquee
			component. This is the simplest approach.
		</li>
		<li>
			<strong>Using items array:</strong> Pass an array of items with id and content snippets. This is
			useful when you need more control over individual items.
		</li>
	</ol>
</div>

<div class="prose mt-4">
	<h3>MarqueeItem Type</h3>
	<p>When using the items array, each item should follow this structure:</p>
</div>

<DocProps props={itemProps} />

<div class="prose mt-8">
	<h3>Behavior</h3>
	<p>
		The Marquee component automatically detects when content overflows and starts the scrolling
		animation. If the content fits within the available space, no animation occurs. This ensures
		optimal performance and prevents unnecessary animations.
	</p>
</div>
