<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Code, Checkbox, Select, TextField } from 'ui-svelte';

	const langOptions = [
		{ id: 'html', label: 'HTML' },
		{ id: 'javascript', label: 'JavaScript' },
		{ id: 'typescript', label: 'TypeScript' },
		{ id: 'css', label: 'CSS' },
		{ id: 'svelte', label: 'Svelte' },
		{ id: 'python', label: 'Python' },
		{ id: 'json', label: 'JSON' }
	];

	const themeOptions = [
		{ id: 'catppuccin-frappe', label: 'Catppuccin Frappe' },
		{ id: 'github-dark', label: 'GitHub Dark' },
		{ id: 'github-light', label: 'GitHub Light' },
		{ id: 'nord', label: 'Nord' },
		{ id: 'one-dark-pro', label: 'One Dark Pro' },
		{ id: 'dracula', label: 'Dracula' }
	];

	let lang: any = $state('javascript');
	let theme: any = $state('catppuccin-frappe');
	let codeContent = $state(`function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}`);

	let showCopy = $state(true);

	let hasProps = $derived([lang !== 'html', theme !== 'catppuccin-frappe', showCopy].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Code } from 'ui-svelte';`,
			``,
			`\tconst code = \\\`${codeContent}\\\`;`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<Code`,
			`\tcode={code}`,
			lang !== 'html' && `\tlang="${lang}"`,
			theme !== 'catppuccin-frappe' && `\ttheme="${theme}"`,
			showCopy && `\tshowCopy`,
			hasProps && `/>`,
			!hasProps && `<Code code={code} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'code', type: 'string', initial: '' },
		{ prop: 'lang', type: 'string', initial: 'html' },
		{ prop: 'theme', type: 'string', initial: 'catppuccin-frappe' },
		{ prop: 'showCopy', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet preview()}
	<Code code={codeContent} {lang} {theme} {showCopy} />
{/snippet}

{#snippet builder()}
	<Select label="Language" size="sm" options={langOptions} bind:value={lang} />
	<Select label="Theme" size="sm" options={themeOptions} bind:value={theme} />

	<DocOptions title="Props">
		<Checkbox bind:checked={showCopy} label="Show Copy Button" />
	</DocOptions>

	<TextField label="Code Content" bind:value={codeContent} />
{/snippet}

<DocHeader title="Code"
	>Display syntax-highlighted code blocks with optional copy functionality.</DocHeader
>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
