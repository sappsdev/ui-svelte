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

	const lightThemeOptions = [
		{ id: 'min-light', label: 'Min Light' },
		{ id: 'github-light', label: 'GitHub Light' },
		{ id: 'catppuccin-latte', label: 'Catppuccin Latte' },
		{ id: 'solarized-light', label: 'Solarized Light' },
		{ id: 'one-light', label: 'One Light' }
	];

	const darkThemeOptions = [
		{ id: 'github-dark', label: 'GitHub Dark' },
		{ id: 'catppuccin-frappe', label: 'Catppuccin Frappe' },
		{ id: 'nord', label: 'Nord' },
		{ id: 'one-dark-pro', label: 'One Dark Pro' },
		{ id: 'dracula', label: 'Dracula' }
	];

	const codeExamples: Record<string, string> = {
		html: `<div class="container">
  <h1>Hello World</h1>
  <p>Welcome to ui-svelte</p>
</div>`,
		javascript: `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}`,
		typescript: `interface User {
  name: string;
  age: number;
}

const user: User = {
  name: 'John',
  age: 30
};`,
		css: `:root {
  --primary: oklch(54.6% 0.245 262.881);
  --on-primary: oklch(93.2% 0.032 255.585);
}

.button {
  background: var(--primary);
  color: var(--on-primary);
}`,
		svelte: `<script lang="ts">
  import { Button } from 'ui-svelte';

  let count = $state(0);
<\/script>

<Button onclick={() => count++}>
  Clicks: {count}
</Button>`,
		python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))`,
		json: `{
  "name": "ui-svelte",
  "version": "1.0.0",
  "type": "module"
}`
	};

	let lang: any = $state('javascript');
	let lightTheme: any = $state('catppuccin-latte');
	let darkTheme: any = $state('catppuccin-frappe');
	let showCopy = $state(true);

	let codeContent = $derived(codeExamples[lang] || codeExamples.javascript);

	let hasProps = $derived(
		[
			lang !== 'html',
			lightTheme !== 'catppuccin-latte',
			darkTheme !== 'catppuccin-frappe',
			showCopy
		].some(Boolean)
	);

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
			lightTheme !== 'catppuccin-latte' && `\tlightTheme="${lightTheme}"`,
			darkTheme !== 'catppuccin-frappe' && `\tdarkTheme="${darkTheme}"`,
			showCopy && `\tshowCopy`,
			hasProps && `/>`,
			!hasProps && `<Code code={code} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'code', type: 'string', initial: '' },
		{ prop: 'lang', type: 'string', initial: 'html' },
		{ prop: 'lightTheme', type: 'string', initial: 'catppuccin-latte' },
		{ prop: 'darkTheme', type: 'string', initial: 'catppuccin-frappe' },
		{ prop: 'showCopy', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet preview()}
	<Code code={codeContent} {lang} {lightTheme} {darkTheme} {showCopy} />
{/snippet}

{#snippet builder()}
	<Select label="Language" size="sm" options={langOptions} bind:value={lang} />
	<Select label="Light Theme" size="sm" options={lightThemeOptions} bind:value={lightTheme} />
	<Select label="Dark Theme" size="sm" options={darkThemeOptions} bind:value={darkTheme} />

	<DocOptions title="Props">
		<Checkbox bind:checked={showCopy} label="Show Copy Button" />
	</DocOptions>
{/snippet}

<DocHeader title="Code"
	>Display syntax-highlighted code blocks with automatic theme switching and optional copy
	functionality.</DocHeader
>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
