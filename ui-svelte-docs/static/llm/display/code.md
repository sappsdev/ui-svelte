## Code Component

Syntax-highlighted code blocks with copy functionality using Shiki.

```svelte
<Code
  code="const x = 42;"
  lang="typescript"
  lightTheme="catppuccin-latte"
  darkTheme="catppuccin-frappe"
  disableCopy={false}
  hideLang={false}
/>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `code` | - | Code string to display (required) |
| `lang` | - | Language for highlighting (required) |
| `lightTheme` | `'catppuccin-latte'` | Shiki theme for light mode |
| `darkTheme` | `'catppuccin-frappe'` | Shiki theme for dark mode |
| `disableCopy` | `false` | Hide copy button |
| `hideLang` | `false` | Hide language badge |
| `class` | - | Additional CSS classes |

### Examples

```svelte
<!-- Basic -->
<Code code={`const hello = "world";`} lang="typescript" />

<!-- Multi-line -->
<Code code={`function greet(name: string) {
  return \`Hello, \${name}!\`;
}`} lang="typescript" />

<!-- Different Languages -->
<Code code="print('Hello')" lang="python" />
<Code code="<h1>Title</h1>" lang="html" />
<Code code=".btn { color: red; }" lang="css" />

<!-- Custom Themes -->
<Code code="const x = 1;" lang="typescript" lightTheme="github-light" darkTheme="dracula" />

<!-- No Copy Button -->
<Code code="npm install" lang="bash" disableCopy />

<!-- Hidden Language Badge -->
<Code code="const x = 42;" lang="typescript" hideLang />
```

**For LLMs**: Code displays syntax-highlighted code. Requires `code` and `lang` props. Auto-adapts to light/dark mode. Shows copy button on hover and language badge by default.
