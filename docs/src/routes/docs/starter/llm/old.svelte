<script lang="ts">
	import { Card, Code, Section, Button, Divider } from 'ui-svelte';
	import promptContent from './ui-svelte-prompt.md?raw';

	const promptText = promptContent;

	const copyPrompt = () => {
		navigator.clipboard.writeText(promptText);
	};
</script>

<Section>
	<div class="prose">
		<h1>LLM Integration Guide</h1>
		<p>
			Use this documentation to help AI assistants like Claude generate interfaces with ui-svelte
			components efficiently.
		</p>
	</div>
</Section>

<Section>
	<Card>
		<div class="column gap-4">
			<div class="row items-center justify-between">
				<h4>Quick Reference Prompt</h4>
				<Button
					label="Copy Prompt"
					variant="outline"
					size="small"
					startIcon="fluent:copy-24-regular"
					onclick={copyPrompt}
				/>
			</div>
			<Divider />
			<div class="prose">
				<p>
					Copy and paste this condensed reference into your LLM chat to enable component generation:
				</p>
			</div>
			<Code lang="markdown" code={promptText} />
		</div>
	</Card>
</Section>

<Section>
	<div class="prose">
		<h3>How to Use</h3>
		<p>Follow these steps to integrate ui-svelte with your AI assistant:</p>

		<ol>
			<li><strong>Copy the prompt</strong> - Click the "Copy Prompt" button above</li>
			<li>
				<strong>Start your conversation</strong> - Paste the prompt at the beginning of your chat
			</li>
			<li><strong>Request components</strong> - Ask the AI to create interfaces using ui-svelte</li>
			<li><strong>Iterate</strong> - Refine the generated code as needed</li>
		</ol>

		<h4>Example Requests</h4>
		<p>Once you've provided the prompt, you can ask things like:</p>
		<ul>
			<li>"Create a settings page with tabs for Profile, Security, and Notifications"</li>
			<li>"Build a card-based dashboard with buttons and stats"</li>
			<li>"Generate a sidebar navigation with submenu items"</li>
			<li>"Create a form with buttons and checkboxes"</li>
		</ul>
	</div>
</Section>

<Section>
	<Card variant="soft" color="primary">
		<div class="column gap-3">
			<h4>💡 Pro Tips</h4>
			<ul class="space-y-2">
				<li><strong>Be specific</strong> - Mention exact component variants and props you want</li>
				<li>
					<strong>Reference examples</strong> - Point to the example in the prompt for structure
				</li>
				<li><strong>Use iterations</strong> - Ask the AI to modify generated code incrementally</li>
				<li>
					<strong>Combine components</strong> - Request complex layouts with multiple components
				</li>
				<li><strong>Specify styling</strong> - Mention utility classes for precise layouts</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<div class="prose">
		<h3>Example Conversation</h3>
		<p>Here's how a typical conversation might look:</p>
	</div>

	<Card variant="outline">
		<div class="column gap-4">
			<div>
				<p class="label mb-2">You:</p>
				<p class="text-sm italic">[Paste the prompt above]</p>
			</div>
			<Divider />
			<div>
				<p class="label mb-2">You:</p>
				<p class="text-sm">
					"Create a user profile card with a header showing the user's name, a body with their bio,
					and action buttons at the bottom"
				</p>
			</div>
			<Divider />
			<div>
				<p class="label mb-2">AI:</p>
				<div class="text-sm">
					<Code
						lang="svelte"
						code={`<script lang="ts">
  import { Card, Button } from 'ui-svelte';
<\/script>

{#snippet header()}
  <h3>John Doe</h3>
  <p class="tiny">Software Developer</p>
{/snippet}

{#snippet footer()}
  <div class="row gap-2">
    <Button label="Edit Profile" variant="outline" size="small" />
    <Button label="View Details" color="primary" size="small" />
  </div>
{/snippet}

<Card
  variant="outline"
  shadow
  divider
  header={header}
  footer={footer}
>
  <p>Passionate about building user interfaces and developer tools.
     Experienced with Svelte, TypeScript, and modern web technologies.</p>
</Card>`}
					/>
				</div>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<div class="prose">
		<h3>Token Optimization</h3>
		<p>The prompt is designed to be concise while providing all necessary information:</p>
		<ul>
			<li><strong>Compact syntax</strong> - Uses shorthand notation for props</li>
			<li><strong>Essential info only</strong> - Includes only the most commonly used features</li>
			<li><strong>Single example</strong> - One clear example shows the pattern</li>
			<li><strong>Grouped logically</strong> - Components organized by category</li>
		</ul>

		<h4>When to Update</h4>
		<p>You may need to re-paste the prompt if:</p>
		<ul>
			<li>Starting a new conversation thread</li>
			<li>The AI seems to forget component syntax</li>
			<li>Switching to a different task or project</li>
		</ul>
	</div>
</Section>

<Section>
	<Card variant="soft" color="secondary">
		<div class="column gap-3">
			<h4>🚀 Best Practices</h4>
			<ul class="space-y-2">
				<li><strong>Start simple</strong> - Begin with basic layouts, then add complexity</li>
				<li><strong>Review generated code</strong> - Always check imports and prop usage</li>
				<li><strong>Test incrementally</strong> - Run code after each generation</li>
				<li><strong>Provide context</strong> - Mention your app's purpose for better results</li>
				<li>
					<strong>Ask for explanations</strong> - Request comments or documentation when needed
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<div class="prose">
		<h3>Limitations & Notes</h3>
		<ul>
			<li>AI may occasionally use incorrect prop names - verify against docs</li>
			<li>Complex layouts may require manual adjustments</li>
			<li>State management and logic need to be specified explicitly</li>
			<li>Custom styling beyond utility classes should be requested clearly</li>
			<li>Icon names must use the Iconify fluent format</li>
		</ul>
	</div>
</Section>
