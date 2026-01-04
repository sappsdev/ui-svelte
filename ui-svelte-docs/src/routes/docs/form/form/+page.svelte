<script lang="ts">
	import { Button, Card, Checkbox, Code, Section, Select, TextField } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';
	import { useForm } from 'ui-svelte';

	const exampleOptions = [
		{ id: 'basic', label: 'Basic Form' },
		{ id: 'login', label: 'Login Form' },
		{ id: 'register', label: 'Registration Form' },
		{ id: 'edit', label: 'Create/Edit Mode' }
	];

	let exampleMode: any = $state('basic');
	let showValidation = $state(true);
	let showTransform = $state(false);
	let showCallbacks = $state(false);
	let showToast = $state(true);
	let resetOnSuccess = $state(false);
	let isEditing = $state(false);

	const userId = $derived(isEditing ? '123' : undefined);

	let formConfig = $derived.by(() => {
		const baseConfig: any = {
			url: isEditing ? `https://api.example.com/users/${userId}` : 'https://api.example.com/users',
			method: isEditing ? 'PUT' : 'POST',
			showToast: showToast,
			successDescription: isEditing ? 'User updated successfully' : 'User created successfully',
			validationRules: {}
		};

		if (showValidation) {
			if (exampleMode === 'login') {
				baseConfig.validationRules = {
					email: [
						{ rule: 'required', message: 'Email is required' },
						{ rule: 'email', message: 'Invalid email format' }
					],
					password: [
						{ rule: 'required', message: 'Password is required' },
						{ rule: 'min:8', message: 'Password must be at least 8 characters' }
					]
				};
			} else if (exampleMode === 'register') {
				baseConfig.validationRules = {
					email: [
						{ rule: 'required', message: 'Email is required' },
						{ rule: 'email', message: 'Invalid email format' }
					],
					password: [
						{ rule: 'required', message: 'Password is required' },
						{ rule: 'min:8', message: 'Password must be at least 8 characters' },
						{ rule: 'strongPassword', message: 'Password must be strong' }
					],
					confirmPassword: [
						{ rule: 'required', message: 'Please confirm your password' },
						{ rule: 'matches:password', message: 'Passwords do not match' }
					]
				};
			} else {
				baseConfig.validationRules = {
					email: [
						{ rule: 'required', message: 'Email is required' },
						{ rule: 'email', message: 'Invalid email format' }
					],
					name: [{ rule: 'required', message: 'Name is required' }]
				};
			}
		}

		if (showCallbacks) {
			baseConfig.onSuccess = (response: unknown) => {
				console.log('Form submitted successfully:', response);
			};
			baseConfig.onError = (errors: Record<string, string>) => {
				console.error('Form validation errors:', errors);
			};
		}

		if (showTransform) {
			baseConfig.transformData = (data: Record<string, unknown>) => ({
				...data,
				timestamp: new Date().toISOString()
			});
		}

		if (resetOnSuccess) {
			baseConfig.resetOnSuccess = true;
		}

		return baseConfig;
	});

	let form = $derived(useForm(formConfig));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { useForm, TextField, Button } from 'ui-svelte';`,
			``
		];

		if (exampleMode === 'edit' || isEditing) {
			scriptLines.push(
				`\t// State for edit mode`,
				`\tlet isEditing = $state(false);`,
				`\tconst userId = $derived(isEditing ? '123' : undefined);`,
				``
			);
		}

		scriptLines.push(`\tlet form = useForm({`);

		if (showValidation) {
			scriptLines.push(`\t\tvalidationRules: {`);

			if (exampleMode === 'login') {
				scriptLines.push(
					`\t\t\temail: [`,
					`\t\t\t\t{ rule: 'required', message: 'Email is required' },`,
					`\t\t\t\t{ rule: 'email', message: 'Invalid email format' }`,
					`\t\t\t],`,
					`\t\t\tpassword: [`,
					`\t\t\t\t{ rule: 'required', message: 'Password is required' },`,
					`\t\t\t\t{ rule: 'min:8', message: 'Min 8 characters' }`,
					`\t\t\t]`
				);
			} else if (exampleMode === 'register') {
				scriptLines.push(
					`\t\t\temail: [`,
					`\t\t\t\t{ rule: 'required', message: 'Email is required' },`,
					`\t\t\t\t{ rule: 'email', message: 'Invalid email format' }`,
					`\t\t\t],`,
					`\t\t\tpassword: [`,
					`\t\t\t\t{ rule: 'required', message: 'Password is required' },`,
					`\t\t\t\t{ rule: 'min:8', message: 'Min 8 characters' },`,
					`\t\t\t\t{ rule: 'strongPassword', message: 'Must be strong' }`,
					`\t\t\t],`,
					`\t\t\tconfirmPassword: [`,
					`\t\t\t\t{ rule: 'required', message: 'Confirm password' },`,
					`\t\t\t\t{ rule: 'matches:password', message: 'Must match' }`,
					`\t\t\t]`
				);
			} else {
				scriptLines.push(
					`\t\t\temail: [`,
					`\t\t\t\t{ rule: 'required', message: 'Email is required' },`,
					`\t\t\t\t{ rule: 'email', message: 'Invalid email format' }`,
					`\t\t\t],`,
					`\t\t\tname: [{ rule: 'required', message: 'Name is required' }]`
				);
			}

			scriptLines.push(`\t\t},`);
		}

		if (exampleMode === 'edit' || isEditing) {
			scriptLines.push(
				`\t\turl: isEditing ? \`/api/users/\${userId}\` : '/api/users',`,
				`\t\tmethod: isEditing ? 'PUT' : 'POST'`
			);
		} else {
			scriptLines.push(
				`\t\turl: '/api/${exampleMode === 'login' ? 'login' : exampleMode === 'register' ? 'register' : 'users'}',`,
				`\t\tmethod: 'POST'`
			);
		}

		if (showToast) {
			scriptLines.push(`,\t\tshowToast: true`);
		}

		if (resetOnSuccess) {
			scriptLines.push(`,\t\tresetOnSuccess: true`);
		}

		if (showCallbacks) {
			scriptLines.push(
				`,\t\tonSuccess: (response) => {`,
				`\t\t\tconsole.log('Success:', response);`,
				`\t\t}`,
				`,\t\tonError: (errors) => {`,
				`\t\t\tconsole.error('Errors:', errors);`,
				`\t\t}`
			);
		}

		if (showTransform) {
			scriptLines.push(
				`,\t\ttransformData: (data) => ({`,
				`\t\t\t...data,`,
				`\t\t\ttimestamp: new Date().toISOString()`,
				`\t\t})`
			);
		}

		scriptLines.push(`\t});`, `<\/script>`);

		const componentLines: (string | false)[] = [`\n<form bind:this={form.state}>`];

		if (exampleMode === 'basic' || exampleMode === 'edit') {
			componentLines.push(
				`\t<TextField`,
				`\t\tname="name"`,
				`\t\tlabel="Name"`,
				showValidation && `\t\terrorText={form.errors.name}`,
				`\t/>`
			);
		}

		componentLines.push(
			`\n\t<TextField`,
			`\t\tname="email"`,
			`\t\ttype="email"`,
			`\t\tlabel="Email"`,
			showValidation && `\t\terrorText={form.errors.email}`,
			`\t/>`
		);

		componentLines.push(
			`\n\t<TextField`,
			`\t\tname="password"`,
			`\t\ttype="password"`,
			`\t\tlabel="Password"`,
			showValidation && `\t\terrorText={form.errors.password}`,
			`\t/>`
		);

		if (exampleMode === 'register') {
			componentLines.push(
				`\n\t<TextField`,
				`\t\tname="confirmPassword"`,
				`\t\ttype="password"`,
				`\t\tlabel="Confirm Password"`,
				showValidation && `\t\terrorText={form.errors.confirmPassword}`,
				`\t/>`
			);
		}

		const buttonLabel =
			exampleMode === 'login'
				? "'Login'"
				: exampleMode === 'register'
					? "'Register'"
					: exampleMode === 'edit'
						? "isEditing ? 'Update' : 'Create'"
						: "'Submit'";

		componentLines.push(
			`\n\t<Button`,
			`\t\ttype="submit"`,
			`\t\tisDisabled={form.isSubmitting}`,
			`\t\tisLoading={form.isSubmitting}`,
			`\t>`,
			`\t\t{${buttonLabel}}`,
			`\t</Button>`,
			`</form>`
		);

		return [...scriptLines, ...componentLines.filter(Boolean)].join('\n');
	});

	const configProps = [
		{ prop: 'validationRules', type: 'ValidationRules', initial: '{}' },
		{ prop: 'url', type: 'string', initial: '' },
		{ prop: 'method', type: "'POST' | 'PUT' | 'PATCH'", initial: '' },
		{ prop: 'headers', type: 'Record<string, string>', initial: '{}' },
		{ prop: 'onError', type: '(errors: Record<string, string>) => void', initial: '' },
		{ prop: 'onSuccess', type: '(response: any) => void', initial: '' },
		{ prop: 'transformData', type: '(data: Record<string, any>) => any', initial: '' },
		{ prop: 'showToast', type: 'boolean', initial: 'false' },
		{ prop: 'errorTitle', type: 'string', initial: "'Error'" },
		{ prop: 'errorDescription', type: 'string', initial: '' },
		{ prop: 'successTitle', type: 'string', initial: "'Success'" },
		{ prop: 'successDescription', type: 'string', initial: '' },
		{ prop: 'resetOnSuccess', type: 'boolean', initial: 'false' }
	];

	const returnProps = [
		{ prop: 'state', type: 'HTMLFormElement', initial: '' },
		{ prop: 'errors', type: 'Record<string, string>', initial: '{}' },
		{ prop: 'isSubmitting', type: 'boolean', initial: 'false' },
		{ prop: 'reset', type: '() => void', initial: '' }
	];

	const validationRules = [
		{ rule: 'required', description: 'Field is required' },
		{ rule: 'email', description: 'Valid email format' },
		{ rule: 'url', description: 'Valid URL format' },
		{ rule: 'phone', description: 'Valid phone number' },
		{ rule: 'numeric', description: 'Only numeric characters' },
		{ rule: 'alpha', description: 'Only alphabetic characters' },
		{ rule: 'alphanumeric', description: 'Only alphanumeric characters' },
		{ rule: 'strongPassword', description: 'Strong password requirements' },
		{ rule: 'creditCard', description: 'Valid credit card number' },
		{ rule: 'date', description: 'Valid date format' },
		{ rule: 'min:N', description: 'Minimum length (e.g., min:8)' },
		{ rule: 'max:N', description: 'Maximum length (e.g., max:50)' },
		{ rule: 'minWords:N', description: 'Minimum word count' },
		{ rule: 'maxWords:N', description: 'Maximum word count' },
		{ rule: 'pattern:regex', description: 'Custom regex pattern' },
		{ rule: 'matches:field', description: 'Match another field' },
		{ rule: 'custom:fn', description: 'Custom validation function' }
	];
</script>

<DocsHeader title="useForm" llmUrl="https://ui-svelte.sappsdev.com/llm/form/form.md">
	A powerful form handling hook that manages form state, validation, submission, and error handling.
	Supports both create (POST) and edit (PUT/PATCH) modes dynamically.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Example"
				size="sm"
				options={exampleOptions}
				bind:value={exampleMode}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={showValidation} label="Validation" />
			<Checkbox bind:checked={showTransform} label="Transform" />
			<Checkbox bind:checked={showCallbacks} label="Callbacks" />
			<Checkbox bind:checked={showToast} label="Toast" />
			<Checkbox bind:checked={resetOnSuccess} label="Reset" />
			{#if exampleMode === 'edit'}
				<Checkbox bind:checked={isEditing} label="Edit Mode" />
			{/if}
		</div>

		<div class="doc-preview">
			<form bind:this={form.state} class="flex flex-col gap-4 w-full max-w-sm">
				{#if exampleMode === 'basic' || exampleMode === 'edit'}
					<TextField
						name="name"
						placeholder="Enter your name"
						label="Name"
						isFloatLabel
						errorText={form.errors.name}
					/>
				{/if}

				<TextField
					name="email"
					type="email"
					placeholder="Enter your email"
					label="Email"
					isFloatLabel
					errorText={form.errors.email}
				/>

				<TextField
					name="password"
					type="password"
					placeholder="Enter your password"
					label="Password"
					isFloatLabel
					errorText={form.errors.password}
				/>

				{#if exampleMode === 'register'}
					<TextField
						name="confirmPassword"
						type="password"
						placeholder="Confirm your password"
						label="Confirm Password"
						isFloatLabel
						errorText={form.errors.confirmPassword}
					/>
				{/if}

				<Button type="submit" isDisabled={form.isSubmitting} isLoading={form.isSubmitting}>
					{form.isSubmitting
						? 'Submitting...'
						: exampleMode === 'login'
							? 'Login'
							: exampleMode === 'register'
								? 'Register'
								: exampleMode === 'edit' && isEditing
									? 'Update'
									: 'Submit'}
				</Button>
			</form>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Configuration Props</p>
	<DocsProps props={configProps} />
</Section>

<Section>
	<p class="section-subtitle">Return Value</p>
	<Card color="background" variant="outlined">
		<p class="mb-4">The useForm hook returns an object with the following properties:</p>
		<DocsProps props={returnProps} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Validation Rules</p>
	<Card color="background" variant="outlined">
		<div class="grid-2 md:grid-3 gap-4">
			{#each validationRules as { rule, description }}
				<div class="flex flex-col gap-1">
					<code class="text-sm font-mono text-primary">{rule}</code>
					<span class="text-xs">{description}</span>
				</div>
			{/each}
		</div>
	</Card>
</Section>
