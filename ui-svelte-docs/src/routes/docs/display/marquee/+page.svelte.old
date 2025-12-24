<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Marquee, Select, Checkbox } from 'ui-svelte';

	type ExampleType = 'logos' | 'announcements' | 'testimonials' | 'vertical';
	let exampleType = $state<ExampleType>('logos');

	const exampleOptions = [
		{ id: 'logos', label: 'Company Logos' },
		{ id: 'announcements', label: 'Announcements' },
		{ id: 'testimonials', label: 'Testimonials' },
		{ id: 'vertical', label: 'Vertical Scroll' }
	];

	const speedOptions = [
		{ id: 'slow', label: 'Slow' },
		{ id: 'normal', label: 'Normal' },
		{ id: 'fast', label: 'Fast' }
	];

	const gapOptions = [
		{ id: '0', label: 'None (0)' },
		{ id: '0.5rem', label: 'Small (0.5rem)' },
		{ id: '1rem', label: 'Medium (1rem)' },
		{ id: '2rem', label: 'Large (2rem)' }
	];

	// Logos example state
	let speed: any = $state('normal');
	let gap: any = $state('1rem');
	let pauseOnHover = $state(true);
	let reverse = $state(false);
	let fade = $state(true);
	let fadeColor = $state('#ffffff');

	const companies = [
		'Svelte',
		'SvelteKit',
		'Vite',
		'TypeScript',
		'Tailwind CSS',
		'Vercel',
		'Netlify',
		'Cloudflare'
	];

	const announcements = [
		{ text: '🎉 New Feature Released!', link: '/features' },
		{ text: '📢 50% Off Sale - Limited Time', link: '/sale' },
		{ text: '🚀 Version 2.0 Now Available', link: '/changelog' },
		{ text: '💡 Check out our Blog', link: '/blog' },
		{ text: '🎯 Join our Community', link: '/community' }
	];

	const testimonials = [
		{
			quote: 'This library has transformed our development workflow!',
			author: 'Sarah Johnson',
			role: 'Lead Developer'
		},
		{
			quote: 'Beautiful components that are easy to customize.',
			author: 'Mike Chen',
			role: 'UI Designer'
		},
		{
			quote: "The best Svelte component library I've used.",
			author: 'Emma Davis',
			role: 'Frontend Engineer'
		},
		{
			quote: 'Excellent documentation and great performance.',
			author: 'Alex Rivera',
			role: 'Tech Lead'
		}
	];

	const features = [
		'🎨 Beautiful Design',
		'⚡ Lightning Fast',
		'📱 Fully Responsive',
		'♿ Accessible',
		'🎯 Type Safe',
		'🔧 Customizable',
		'📦 Tree Shakeable',
		'🌙 Dark Mode'
	];

	let hasProps = $derived(
		exampleType === 'logos' &&
			[speed !== 'normal', gap !== '0', pauseOnHover, reverse, fade, fadeColor !== '#ffffff'].some(
				Boolean
			)
	);

	const logosCode = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Marquee } from 'ui-svelte';`,
			`\n\tconst companies = [`,
			`\t\t'Svelte', 'SvelteKit', 'Vite', 'TypeScript',`,
			`\t\t'Tailwind CSS', 'Vercel', 'Netlify', 'Cloudflare'`,
			`\t];`,
			`<\/script>`
		];

		const componentLines = [
			``,
			hasProps && `<Marquee`,
			speed !== 'normal' && `\tspeed="${speed}"`,
			gap !== '0' && `\tgap="${gap}"`,
			pauseOnHover && `\tpauseOnHover`,
			reverse && `\treverse`,
			fade && `\tfade`,
			fadeColor !== '#ffffff' && `\tfadeColor="${fadeColor}"`,
			hasProps && `>`,
			!hasProps && `<Marquee>`,
			`\t{#each companies as company}`,
			`\t\t<div class="px-8 py-4 bg-surface border border-border rounded-lg">`,
			`\t\t\t<span class="font-semibold text-lg">{company}</span>`,
			`\t\t</div>`,
			`\t{/each}`,
			`</Marquee>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const announcementsCode = `<script lang="ts">
\timport { Marquee } from 'ui-svelte';

\tconst announcements = [
\t\t{ text: '🎉 New Feature Released!', link: '/features' },
\t\t{ text: '📢 50% Off Sale - Limited Time', link: '/sale' },
\t\t{ text: '🚀 Version 2.0 Now Available', link: '/changelog' },
\t\t{ text: '💡 Check out our Blog', link: '/blog' },
\t\t{ text: '🎯 Join our Community', link: '/community' }
\t];
<\/script>

<Marquee speed="slow" pauseOnHover fade>
\t{#each announcements as announcement}
\t\t<a 
\t\t\thref={announcement.link}
\t\t\tclass="px-6 py-2 text-sm font-medium hover:text-primary transition-colors"
\t\t>
\t\t\t{announcement.text}
\t\t</a>
\t{/each}
</Marquee>`;

	const testimonialsCode = `<script lang="ts">
\timport { Marquee } from 'ui-svelte';

\tconst testimonials = [
\t\t{
\t\t\tquote: 'This library has transformed our development workflow!',
\t\t\tauthor: 'Sarah Johnson',
\t\t\trole: 'Lead Developer'
\t\t},
\t\t{
\t\t\tquote: 'Beautiful components that are easy to customize.',
\t\t\tauthor: 'Mike Chen',
\t\t\trole: 'UI Designer'
\t\t}
\t\t// ... more testimonials
\t];
<\/script>

<Marquee speed="slow" pauseOnHover gap="1rem">
\t{#each testimonials as testimonial}
\t\t<div class="w-[400px] p-6 bg-surface border border-border rounded-lg">
\t\t\t<p class="text-sm italic mb-4">"{testimonial.quote}"</p>
\t\t\t<div class="column gap-1">
\t\t\t\t<p class="font-semibold text-sm">{testimonial.author}</p>
\t\t\t\t<p class="text-xs">{testimonial.role}</p>
\t\t\t</div>
\t\t</div>
\t{/each}
</Marquee>`;

	const verticalCode = `<script lang="ts">
\timport { Marquee } from 'ui-svelte';

\tconst features = [
\t\t'🎨 Beautiful Design',
\t\t'⚡ Lightning Fast',
\t\t'📱 Fully Responsive',
\t\t'♿ Accessible',
\t\t'🎯 Type Safe',
\t\t'🔧 Customizable',
\t\t'📦 Tree Shakeable',
\t\t'🌙 Dark Mode'
\t];
<\/script>

<Marquee orientation="vertical" speed="slow" pauseOnHover gap="0.5rem">
\t{#each features as feature}
\t\t<div class="px-6 py-3 bg-primary/10 text-primary rounded-lg font-medium">
\t\t\t{feature}
\t\t</div>
\t{/each}
</Marquee>`;

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

{#snippet logosPreview()}
	<div class="w-full">
		<Marquee {speed} {gap} {pauseOnHover} {reverse} {fade} {fadeColor}>
			{#each companies as company}
				<div class="px-8 py-4 bg-surface border border-border rounded-lg">
					<span class="font-semibold text-lg">{company}</span>
				</div>
			{/each}
		</Marquee>
	</div>
{/snippet}

{#snippet announcementsPreview()}
	<div class="w-full bg-primary/5 py-2">
		<Marquee speed="slow" pauseOnHover fade>
			{#each announcements as announcement}
				<a
					href={announcement.link}
					class="px-6 py-2 text-sm font-medium hover:text-primary transition-colors"
				>
					{announcement.text}
				</a>
			{/each}
		</Marquee>
	</div>
{/snippet}

{#snippet testimonialsPreview()}
	<div class="w-full">
		<Marquee speed="slow" pauseOnHover gap="1rem">
			{#each testimonials as testimonial}
				<div class="w-[400px] p-6 bg-surface border border-border rounded-lg">
					<p class="text-sm italic mb-4">"{testimonial.quote}"</p>
					<div class="column gap-1">
						<p class="font-semibold text-sm">{testimonial.author}</p>
						<p class="text-xs">{testimonial.role}</p>
					</div>
				</div>
			{/each}
		</Marquee>
	</div>
{/snippet}

{#snippet verticalPreview()}
	<div class="h-[300px]">
		<Marquee orientation="vertical" speed="slow" pauseOnHover gap="0.5rem">
			{#each features as feature}
				<div class="px-6 py-3 bg-primary/10 text-primary rounded-lg font-medium">
					{feature}
				</div>
			{/each}
		</Marquee>
	</div>
{/snippet}

{#snippet builder()}
	<Select label="Example Type" size="sm" options={exampleOptions} bind:value={exampleType} />

	{#if exampleType === 'logos'}
		<Select label="Speed" size="sm" options={speedOptions} bind:value={speed} />
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
	{/if}
{/snippet}

<DocHeader title="Marquee">
	A widget that scrolls its content horizontally or vertically when it overflows the available
	space.
</DocHeader>

<DocPreview {builder}>
	{#if exampleType === 'logos'}
		{@render logosPreview()}
	{:else if exampleType === 'announcements'}
		{@render announcementsPreview()}
	{:else if exampleType === 'testimonials'}
		{@render testimonialsPreview()}
	{:else if exampleType === 'vertical'}
		{@render verticalPreview()}
	{/if}
</DocPreview>

<DocCode
	code={exampleType === 'logos'
		? logosCode()
		: exampleType === 'announcements'
			? announcementsCode
			: exampleType === 'testimonials'
				? testimonialsCode
				: verticalCode}
/>

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
