<script lang="ts">
	import { Card, Code, PasswordStrength, Section, Tabs } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';

	let password = $state('');
	let password2 = $state('');
	let password3 = $state('');

	const props = [
		{
			prop: 'value',
			type: 'string',
			default: "''",
			description: 'The password value (bindable)'
		},
		{
			prop: 'placeholder',
			type: 'string',
			default: "''",
			description: 'Placeholder text shown when empty and focused'
		},
		{
			prop: 'label',
			type: 'string',
			default: "''",
			description: 'Label text for the input'
		},
		{
			prop: 'labelOutside',
			type: 'boolean',
			default: 'false',
			description: 'Places the label outside/above the input'
		},
		{
			prop: 'variant',
			type: "'solid' | 'outlined' | 'soft' | 'line'",
			default: "'soft'",
			description: 'Visual style variant of the input'
		},
		{
			prop: 'color',
			type: "'primary' | 'secondary' | 'muted'",
			default: "'primary'",
			description: 'Color scheme of the input'
		},
		{
			prop: 'inputSize',
			type: "'small' | 'medium' | 'large'",
			default: "'medium'",
			description: 'Size of the input field'
		},
		{
			prop: 'helpText',
			type: 'string',
			default: "''",
			description: 'Helper text displayed below the input'
		},
		{
			prop: 'errorText',
			type: 'string',
			default: "''",
			description: 'Error text displayed below the input'
		},
		{
			prop: 'labels',
			type: '{ weak?: string; medium?: string; strong?: string }',
			default: "{ weak: 'Weak', medium: 'Medium', strong: 'Strong' }",
			description: 'Custom labels for strength levels'
		},
		{
			prop: 'class',
			type: 'string',
			default: "''",
			description: 'Additional CSS classes for the wrapper'
		},
		{
			prop: 'inputClass',
			type: 'string',
			default: "''",
			description: 'Additional CSS classes for the input element'
		}
	];

	const strengthLevels = [
		{
			level: 'Weak',
			score: '0-2',
			description: 'Password is too short or lacks variety'
		},
		{
			level: 'Medium',
			score: '3-4',
			description: 'Password has moderate complexity'
		},
		{
			level: 'Strong',
			score: '5-6',
			description: 'Password has high complexity with mixed characters'
		}
	];

	const strengthCriteria = [
		{ criteria: 'Minimum 8 characters', points: '+1' },
		{ criteria: 'Minimum 12 characters', points: '+1' },
		{ criteria: 'Contains lowercase letters', points: '+1' },
		{ criteria: 'Contains uppercase letters', points: '+1' },
		{ criteria: 'Contains numbers', points: '+1' },
		{ criteria: 'Contains special characters', points: '+1' }
	];

	const strengthTabs = [
		{ id: 'levels', label: 'Strength Levels', content: strengthLevelsContent },
		{ id: 'criteria', label: 'Scoring Criteria', content: strengthCriteriaContent }
	];
</script>

{#snippet strengthLevelsContent()}
	<div class="overflow-x-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr class="border-b border-muted-200">
					<th class="text-left p-3 font-semibold">Level</th>
					<th class="text-left p-3 font-semibold">Score</th>
					<th class="text-left p-3 font-semibold">Description</th>
				</tr>
			</thead>
			<tbody>
				{#each strengthLevels as level}
					<tr class="border-b border-muted-100">
						<td class="p-3"><code class="px-2 py-1 rounded text-sm">{level.level}</code></td>
						<td class="p-3"><code class="px-2 py-1 rounded text-sm">{level.score}</code></td>
						<td class="p-3 text-sm">{level.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet strengthCriteriaContent()}
	<div class="overflow-x-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr class="border-b border-muted-200">
					<th class="text-left p-3 font-semibold">Criteria</th>
					<th class="text-left p-3 font-semibold">Points</th>
				</tr>
			</thead>
			<tbody>
				{#each strengthCriteria as item}
					<tr class="border-b border-muted-100">
						<td class="p-3 text-sm">{item.criteria}</td>
						<td class="p-3"><code class="px-2 py-1 rounded text-sm">{item.points}</code></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

<DocsHeader title="Password Strength">
	A password input component with real-time strength indicator. Includes visual feedback bars and
	customizable strength labels to help users create secure passwords.
</DocsHeader>

<Section bodyClass="md:grid-2">
	<DocsPreview>
		<div class="column gap-4 w-full max-w-md">
			<PasswordStrength label="Password" placeholder="Enter your password" bind:value={password} />
		</div>
	</DocsPreview>
	<Card>
		<Code
			lang="svelte"
			code={`<script>
  import { PasswordStrength } from 'ui-svelte';
  let password = $state('');
<\/script>

<PasswordStrength 
  label="Password" 
  placeholder="Enter your password" 
  bind:value={password} 
/>`}
		/>
	</Card>
</Section>

<Section>
	<Card>
		<Tabs tabs={strengthTabs} />
	</Card>
</Section>

<Section bodyClass="grid-2 md:grid-3">
	<!-- Soft Variant -->
	<Card>
		{#snippet header()}
			<h4>Soft Variant</h4>
		{/snippet}
		<PasswordStrength label="Password" variant="soft" />
		{#snippet footer()}
			<code class="text-xs">variant="soft"</code>
		{/snippet}
	</Card>

	<!-- Outlined Variant -->
	<Card>
		{#snippet header()}
			<h4>Outlined Variant</h4>
		{/snippet}
		<PasswordStrength label="Password" variant="outlined" />
		{#snippet footer()}
			<code class="text-xs">variant="outlined"</code>
		{/snippet}
	</Card>

	<!-- Solid Variant -->
	<Card>
		{#snippet header()}
			<h4>Solid Variant</h4>
		{/snippet}
		<PasswordStrength label="Password" variant="solid" />
		{#snippet footer()}
			<code class="text-xs">variant="solid"</code>
		{/snippet}
	</Card>

	<!-- Line Variant -->
	<Card>
		{#snippet header()}
			<h4>Line Variant</h4>
		{/snippet}
		<PasswordStrength label="Password" variant="line" />
		{#snippet footer()}
			<code class="text-xs">variant="line"</code>
		{/snippet}
	</Card>

	<!-- Label Outside -->
	<Card>
		{#snippet header()}
			<h4>Label Outside</h4>
		{/snippet}
		<PasswordStrength label="Password" labelOutside />
		{#snippet footer()}
			<code class="text-xs">labelOutside</code>
		{/snippet}
	</Card>

	<!-- Small Size -->
	<Card>
		{#snippet header()}
			<h4>Small Size</h4>
		{/snippet}
		<PasswordStrength label="Password" inputSize="small" />
		{#snippet footer()}
			<code class="text-xs">inputSize="small"</code>
		{/snippet}
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Custom Strength Labels</h4>
		{/snippet}
		<div class="max-w-md">
			<PasswordStrength
				label="Password"
				bind:value={password2}
				labels={{
					weak: '🔓 Too weak!',
					medium: '🔐 Getting better',
					strong: '🔒 Excellent!'
				}}
			/>
		</div>
		{#snippet footer()}
			<Code
				lang="svelte"
				code={`<PasswordStrength 
  label="Password" 
  labels={{
    weak: '🔓 Too weak!',
    medium: '🔐 Getting better',
    strong: '🔒 Excellent!'
  }}
/>`}
			/>
		{/snippet}
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>With Help Text</h4>
		{/snippet}
		<div class="max-w-md">
			<PasswordStrength
				label="Password"
				bind:value={password3}
				helpText="Use at least 8 characters with a mix of letters, numbers, and symbols"
			/>
		</div>
		{#snippet footer()}
			<Code
				lang="svelte"
				code={`<PasswordStrength 
  label="Password" 
  helpText="Use at least 8 characters with a mix of letters, numbers, and symbols"
/>`}
			/>
		{/snippet}
	</Card>
</Section>

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Real-time feedback:</strong> The strength bars update instantly as the user types
				</li>
				<li>
					<strong>Toggle visibility:</strong> Users can show/hide the password with the eye icon button
				</li>
				<li>
					<strong>Custom labels:</strong> Use the
					<code class="px-1 py-0.5 bg-blue rounded">labels</code> prop to customize strength level text
				</li>
				<li>
					<strong>Scoring:</strong> The strength score is based on length and character variety (lowercase,
					uppercase, numbers, special characters)
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Props Reference</h4>
		{/snippet}
		<div class="overflow-x-auto">
			<table class="w-full border-collapse">
				<thead>
					<tr class="border-b border-muted-200">
						<th class="text-left p-3 font-semibold">Prop</th>
						<th class="text-left p-3 font-semibold">Type</th>
						<th class="text-left p-3 font-semibold">Default</th>
						<th class="text-left p-3 font-semibold">Description</th>
					</tr>
				</thead>
				<tbody>
					{#each props as prop}
						<tr class="border-b border-muted-100">
							<td class="p-3"><code class="px-2 py-1 rounded text-sm">{prop.prop}</code></td>
							<td class="p-3"><code class="px-2 py-1 rounded text-xs">{prop.type}</code></td>
							<td class="p-3"><code class="px-2 py-1 rounded text-xs">{prop.default}</code></td>
							<td class="p-3 text-sm">{prop.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
</Section>
