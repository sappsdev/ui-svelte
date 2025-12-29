<script lang="ts">
	import { Marquee, Card, Checkbox, Code, ColorField, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

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

	let speed: any = $state('normal');
	let orientation: any = $state('horizontal');
	let gap: any = $state('1rem');
	let pauseOnHover = $state(true);
	let reverse = $state(false);
	let fade = $state(true);
	let fadeColor = $state('#ffffff');

	const companies = [
		'Svelte',
		'SvelteKit',
		'Bun',
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
		{ text: '🎯 Join our Community', link: '/community' },
		{ text: '🔥 Hot Deal: Free Shipping', link: '/shipping' },
		{ text: '⭐ Premium Support Available', link: '/support' },
		{ text: '🎨 New Themes Released', link: '/themes' },
		{ text: '📦 Enterprise Plan Launch', link: '/enterprise' },
		{ text: '🌟 Featured on ProductHunt', link: '/press' }
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
			orientation !== 'horizontal' && `\torientation="${orientation}"`,
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

	const props = [
		{ prop: 'items', type: 'MarqueeItem[]', initial: '[]' },
		{ prop: 'speed', type: 'slow | normal | fast', initial: 'normal' },
		{ prop: 'pauseOnHover', type: 'boolean', initial: 'false' },
		{ prop: 'reverse', type: 'boolean', initial: 'false' },
		{ prop: 'orientation', type: 'horizontal | vertical', initial: 'horizontal' },
		{ prop: 'fade', type: 'boolean', initial: 'false' },
		{ prop: 'fadeColor', type: 'string', initial: 'white' },
		{ prop: 'gap', type: 'string', initial: '0' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'itemClass', type: 'string', initial: '' },
		{ prop: 'children', type: 'Snippet', initial: '' }
	];

	const itemProps = [
		{ prop: 'id', type: 'string | number', initial: '', required: true },
		{ prop: 'content', type: 'Snippet', initial: '', required: true }
	];

	const announcementsCode = `<script lang="ts">
	import { Marquee } from 'ui-svelte';

	const announcements = [
		{ text: '🎉 New Feature Released!', link: '/features' },
		{ text: '📢 50% Off Sale - Limited Time', link: '/sale' },
		{ text: '🚀 Version 2.0 Now Available', link: '/changelog' },
		{ text: '💡 Check out our Blog', link: '/blog' },
		{ text: '🎯 Join our Community', link: '/community' }
	];
<\/script>

<Marquee speed="slow" pauseOnHover fade>
	{#each announcements as announcement}
		<a 
			href={announcement.link}
			class="px-6 py-2 text-sm font-medium hover:text-primary transition-colors"
		>
			{announcement.text}
		</a>
	{/each}
</Marquee>`;

	const testimonialsCode = `<script lang="ts">
	import { Marquee } from 'ui-svelte';

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
		}
		// ... more testimonials
	];
<\/script>

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
</Marquee>`;

	const verticalCode = `<script lang="ts">
	import { Marquee } from 'ui-svelte';

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
<\/script>

<div class="h-[300px]">
	<Marquee orientation="vertical" speed="slow" pauseOnHover gap="0.5rem">
		{#each features as feature}
			<div class="px-6 py-3 bg-primary/10 text-primary rounded-lg font-medium">
				{feature}
			</div>
		{/each}
	</Marquee>
</div>`;
</script>

<DocsHeader title="Marquee" llmUrl="https://ui-svelte.sappsdev.com/llm/display/marquee.md">
	A widget that scrolls its content horizontally or vertically when it overflows the available
	space.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Speed"
				size="sm"
				options={speedOptions}
				bind:value={speed}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Orientation"
				size="sm"
				options={orientationOptions}
				bind:value={orientation}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Gap"
				size="sm"
				options={gapOptions}
				bind:value={gap}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={pauseOnHover} label="Pause on Hover" />
			<Checkbox bind:checked={reverse} label="Reverse" />
			<Checkbox bind:checked={fade} label="Fade Edges" />
		</div>
		{#if fade}
			<ColorField label="Fade Color" size="sm" bind:hex={fadeColor} rootClass="max-w-xs" />
		{/if}

		<div class="doc-preview" class:h-[300px]={orientation === 'vertical'}>
			<Marquee {speed} {orientation} {gap} {pauseOnHover} {reverse} {fade} {fadeColor}>
				{#each companies as company}
					<div class="px-8 py-4 bg-surface border border-border rounded-lg">
						<span class="font-semibold text-lg">{company}</span>
					</div>
				{/each}
			</Marquee>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Announcements Bar</p>
	<Card>
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
		<Code lang="svelte" code={announcementsCode} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Testimonials</p>
	<Card>
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
		<Code lang="svelte" code={testimonialsCode} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Vertical Scroll</p>
	<Card>
		<div class="h-[300px]">
			<Marquee orientation="vertical" speed="slow" pauseOnHover gap="0.5rem">
				{#each features as feature}
					<div class="px-6 py-3 bg-primary/10 text-primary rounded-lg font-medium">
						{feature}
					</div>
				{/each}
			</Marquee>
		</div>
		<Code lang="svelte" code={verticalCode} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Usage</p>
	<Card>
		<div class="prose">
			<p>The Marquee component can be used in two ways:</p>
			<ol>
				<li>
					<strong>Using children (recommended):</strong> Simply place your content as children of the
					Marquee component. This is the simplest approach.
				</li>
				<li>
					<strong>Using items array:</strong> Pass an array of items with id and content snippets. This
					is useful when you need more control over individual items.
				</li>
			</ol>
			<p>
				The Marquee component automatically detects when content overflows and starts the scrolling
				animation. If the content fits within the available space, no animation occurs. This ensures
				optimal performance and prevents unnecessary animations.
			</p>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">MarqueeItem Type</p>
	<DocsProps props={itemProps} />
</Section>
