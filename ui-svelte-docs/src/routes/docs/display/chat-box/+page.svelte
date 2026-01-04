<script lang="ts">
	import {
		ChatBox,
		Card,
		Checkbox,
		Code,
		Section,
		Select,
		TextField,
		useChat,
		type PromptMessage,
		type PromptState
	} from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' }
	];

	const modeOptions = [
		{ id: 'conversation', label: 'Conversation' },
		{ id: 'prompt', label: 'Prompt (LLM)' }
	];

	let color: any = $state('primary');
	let variant: any = $state('solid');
	let mode: 'conversation' | 'prompt' = $state('conversation');
	let userName = $state('John Doe');
	let userStatus = $state('Online');

	let hasHeaderActions = $state(false);
	let hasVoiceNote = $state(false);
	let hasFileAttach = $state(false);
	let hasCameraCapture = $state(false);

	// Mock chat state for conversation mode preview
	const mockChat = useChat({
		chatId: 'preview-chat',
		userId: 'user-456',
		apiUrl: 'https://localhost',
		wsUrl: 'ws://localhost:3000/ws/chats',
		autoConnect: false
	});

	// Mock prompt state for prompt mode preview
	let promptMessages = $state<PromptMessage[]>([
		{
			id: '1',
			role: 'system',
			content: 'You are a helpful assistant.',
			timestamp: new Date()
		},
		{
			id: '2',
			role: 'user',
			content: 'Hello! Can you help me with some code?',
			timestamp: new Date()
		},
		{
			id: '3',
			role: 'assistant',
			content:
				"Of course! I'd be happy to help you with your code. What programming language are you working with, and what would you like to accomplish?",
			timestamp: new Date()
		}
	]);
	let isPromptLoading = $state(false);
	let isPromptStreaming = $state(false);

	const mockPrompt: PromptState = {
		get messages() {
			return promptMessages;
		},
		get isLoading() {
			return isPromptLoading;
		},
		get isStreaming() {
			return isPromptStreaming;
		},
		error: null,
		sendMessage: async (content: string) => {
			isPromptLoading = true;
			promptMessages = [
				...promptMessages,
				{
					id: Date.now().toString(),
					role: 'user',
					content,
					timestamp: new Date()
				}
			];
			// Simulate AI response
			setTimeout(() => {
				isPromptStreaming = true;
				setTimeout(() => {
					promptMessages = [
						...promptMessages,
						{
							id: (Date.now() + 1).toString(),
							role: 'assistant',
							content:
								'This is a simulated AI response. In a real implementation, this would come from your LLM API.',
							timestamp: new Date()
						}
					];
					isPromptLoading = false;
					isPromptStreaming = false;
				}, 1000);
			}, 500);
		},
		stopGeneration: () => {
			isPromptStreaming = false;
			isPromptLoading = false;
		}
	};

	let hasProps = $derived(
		[
			color !== 'primary',
			variant !== 'solid',
			mode !== 'conversation',
			userName !== 'John Doe',
			userStatus !== 'Online',
			hasHeaderActions,
			hasVoiceNote,
			hasFileAttach,
			hasCameraCapture
		].some(Boolean)
	);

	let code = $derived(() => {
		if (mode === 'prompt') {
			return `<script lang="ts">
	import { ChatBox, type PromptMessage, type PromptState } from 'ui-svelte';

	let messages = $state<PromptMessage[]>([]);
	let isLoading = $state(false);
	let isStreaming = $state(false);

	const prompt: PromptState = {
		get messages() { return messages; },
		get isLoading() { return isLoading; },
		get isStreaming() { return isStreaming; },
		error: null,
		sendMessage: async (content) => {
			isLoading = true;
			messages = [...messages, {
				id: Date.now().toString(),
				role: 'user',
				content,
				timestamp: new Date()
			}];
			
			// Call your LLM API here
			const response = await fetch('/api/chat', {
				method: 'POST',
				body: JSON.stringify({ messages })
			});
			
			const data = await response.json();
			messages = [...messages, {
				id: (Date.now() + 1).toString(),
				role: 'assistant',
				content: data.response,
				timestamp: new Date()
			}];
			isLoading = false;
		},
		stopGeneration: () => {
			isStreaming = false;
			isLoading = false;
		}
	};
<\/script>

<ChatBox
	mode="prompt"
	{prompt}${color !== 'primary' ? `\n\tcolor="${color}"` : ''}${variant !== 'solid' ? `\n\tvariant="${variant}"` : ''}
	placeholder="Ask me anything..."
	assistantName="AI Assistant"
/>`;
		}

		const scriptLines = [
			`<script lang="ts">`,
			`\timport { ChatBox, useChat } from 'ui-svelte';`,
			``,
			`\tconst chat = useChat({`,
			`\t\tchatId: 'chat-123',`,
			`\t\tuserId: 'user-456',`,
			`\t\tapiUrl: 'https://api.example.com',`,
			`\t\twsUrl: 'ws://localhost:3000/ws/chats',`,
			`\t\tautoConnect: true`,
			`\t});`,
			hasVoiceNote && `\n\tconst handleVoiceNote = (blob: Blob, url: string) => {`,
			hasVoiceNote && `\t\tconsole.log('Voice note recorded:', url);`,
			hasVoiceNote && `\t};`,
			hasFileAttach && `\n\tconst handleFileAttach = (file: File) => {`,
			hasFileAttach && `\t\tconsole.log('File attached:', file.name);`,
			hasFileAttach && `\t};`,
			hasCameraCapture && `\n\tconst handleCameraCapture = () => {`,
			hasCameraCapture && `\t\tconsole.log('Camera capture triggered');`,
			hasCameraCapture && `\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<ChatBox`,
			hasProps && `\t{chat}`,
			hasProps && `\tcurrentUserId="user-456"`,
			hasProps && `\tuserName="${userName}"`,
			userStatus !== 'Online' && `\tuserStatus="${userStatus}"`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			hasVoiceNote && `\tonVoiceNote={handleVoiceNote}`,
			hasFileAttach && `\tonFileAttach={handleFileAttach}`,
			hasCameraCapture && `\tonCameraCapture={handleCameraCapture}`,
			hasHeaderActions && hasProps && `>`,
			hasHeaderActions && `\t{#snippet headerActions()}`,
			hasHeaderActions &&
				`\t\t<IconButton icon={CallIcon} size="sm" color="${color}" variant="ghost" />`,
			hasHeaderActions &&
				`\t\t<IconButton icon={VideoIcon} size="sm" color="${color}" variant="ghost" />`,
			hasHeaderActions && `\t{/snippet}`,
			hasHeaderActions && `</ChatBox>`,
			hasProps && !hasHeaderActions && `/>`,
			!hasProps && `<ChatBox {chat} currentUserId="user-456" userName="John Doe" />`
		].filter(Boolean);

		return [...scriptLines, '', ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'mode', type: "'conversation' | 'prompt'", initial: 'conversation' },
		{ prop: 'chat', type: 'ChatState', initial: 'required (conversation mode)' },
		{ prop: 'prompt', type: 'PromptState', initial: 'required (prompt mode)' },
		{ prop: 'currentUserId', type: 'string', initial: '' },
		{ prop: 'userName', type: 'string', initial: '' },
		{ prop: 'userAvatar', type: 'string', initial: '' },
		{ prop: 'userStatus', type: 'string', initial: 'Online' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined',
			initial: 'solid'
		},
		{ prop: 'showHeader', type: 'boolean', initial: 'true' },
		{ prop: 'placeholder', type: 'string', initial: 'Type a message...' },
		{ prop: 'showAttachments', type: 'boolean', initial: 'true' },
		{ prop: 'showVoiceNote', type: 'boolean', initial: 'true' },
		{ prop: 'showCamera', type: 'boolean', initial: 'false' },
		{ prop: 'assistantName', type: 'string', initial: 'Assistant' },
		{ prop: 'assistantAvatar', type: 'string', initial: '' },
		{ prop: 'messageRenderer', type: 'Snippet<[Message]>', initial: '' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'headerActions', type: 'Snippet', initial: '' },
		{ prop: 'onVoiceNote', type: '(blob: Blob, url: string) => void', initial: '' },
		{ prop: 'onFileAttach', type: '(file: File) => void', initial: '' },
		{ prop: 'onCameraCapture', type: '() => void', initial: '' }
	];
</script>

{#snippet headerActions()}
	<span class="text-sm text-on-muted">Custom Actions</span>
{/snippet}

<DocsHeader title="ChatBox" llmUrl="https://ui-svelte.sappsdev.com/llm/display/chat-box.md">
	A versatile chat interface component supporting both traditional conversation mode with real-time
	messaging, and LLM prompt mode for AI chatbot interfaces.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Mode"
				size="sm"
				options={modeOptions}
				bind:value={mode}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
			/>
			{#if mode === 'conversation'}
				<TextField
					isFloatLabel
					rootClass="max-w-xs"
					label="User Name"
					size="sm"
					bind:value={userName}
				/>
			{/if}
		</div>
		{#if mode === 'conversation'}
			<div class="grid-2 md:grid-4 gap-2">
				<Checkbox bind:checked={hasHeaderActions} label="Custom Header" />
				<Checkbox bind:checked={hasVoiceNote} label="Voice Note" />
				<Checkbox bind:checked={hasFileAttach} label="File Attach" />
				<Checkbox bind:checked={hasCameraCapture} label="Camera" />
			</div>
		{/if}

		<div class="doc-preview">
			<div class="w-full max-w-2xl h-[500px] overflow-hidden">
				{#if mode === 'conversation'}
					<ChatBox
						mode="conversation"
						chat={mockChat}
						currentUserId="user-456"
						{userName}
						{userStatus}
						{color}
						{variant}
						headerActions={hasHeaderActions ? headerActions : undefined}
						userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
						showVoiceNote={hasVoiceNote}
						showAttachments={hasFileAttach}
						showCamera={hasCameraCapture}
						onVoiceNote={hasVoiceNote ? (blob, url) => console.log('Voice note:', url) : undefined}
						onFileAttach={hasFileAttach ? (file) => console.log('File:', file.name) : undefined}
						onCameraCapture={hasCameraCapture ? () => console.log('Camera') : undefined}
					/>
				{:else}
					<ChatBox
						mode="prompt"
						prompt={mockPrompt}
						{color}
						{variant}
						placeholder="Ask me anything..."
						assistantName="AI Assistant"
						assistantAvatar="https://api.dicebear.com/7.x/bottts/svg?seed=AI"
						userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
					/>
				{/if}
			</div>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Modes</p>
	<Card color="background" variant="outlined">
		<div class="prose">
			<p>The ChatBox component supports two distinct modes:</p>
			<ul>
				<li>
					<code>conversation</code> - Traditional chat interface with WebSocket support, file attachments,
					voice notes, and message status tracking. Ideal for real-time messaging between users.
				</li>
				<li>
					<code>prompt</code> - LLM-style chat interface with role-based messages (user, assistant, system),
					streaming indicators, and stop generation support. Ideal for AI chatbot interfaces.
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Prompt Mode (LLM)</p>
	<Card color="background" variant="outlined">
		<div class="prose">
			<p>
				The prompt mode is designed for AI chat interfaces. It uses role-based messages instead of
				sender IDs and provides features specific to LLM interactions:
			</p>
			<ul>
				<li>Role-based messages: <code>user</code>, <code>assistant</code>, <code>system</code></li>
				<li>Streaming indicator for ongoing AI responses</li>
				<li>Stop generation button to cancel streaming</li>
				<li>No header (cleaner interface for chat prompts)</li>
				<li>Simplified input (no attachments, voice notes by default)</li>
			</ul>
		</div>
		<Code
			lang="typescript"
			code={`interface PromptMessage {
	id: string;
	role: 'user' | 'assistant' | 'system';
	content: string;
	timestamp?: Date | string;
	isStreaming?: boolean;
	metadata?: Record<string, any>;
}

interface PromptState {
	messages: PromptMessage[];
	isLoading: boolean;
	isStreaming: boolean;
	error: any;
	sendMessage: (content: string) => Promise<void>;
	stopGeneration?: () => void;
}`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Prompt Mode Example</p>
	<Card color="background" variant="outlined">
		<Code
			lang="svelte"
			code={`<script lang="ts">
	import { ChatBox, type PromptMessage, type PromptState } from 'ui-svelte';

	let messages = $state<PromptMessage[]>([
		{ id: '1', role: 'system', content: 'You are a helpful assistant.' }
	]);
	let isLoading = $state(false);
	let isStreaming = $state(false);

	const prompt: PromptState = {
		get messages() { return messages; },
		get isLoading() { return isLoading; },
		get isStreaming() { return isStreaming; },
		error: null,
		sendMessage: async (content) => {
			// Add user message
			messages = [...messages, {
				id: Date.now().toString(),
				role: 'user',
				content,
				timestamp: new Date()
			}];
			
			isLoading = true;
			isStreaming = true;
			
			// Stream response from your LLM API
			const response = await fetch('/api/chat', {
				method: 'POST',
				body: JSON.stringify({ messages })
			});
			
			// Handle streaming response...
			const data = await response.json();
			
			messages = [...messages, {
				id: (Date.now() + 1).toString(),
				role: 'assistant',
				content: data.response,
				timestamp: new Date()
			}];
			
			isLoading = false;
			isStreaming = false;
		},
		stopGeneration: () => {
			// Abort the fetch request
			isStreaming = false;
			isLoading = false;
		}
	};
<\/script>

<ChatBox
	mode="prompt"
	{prompt}
	color="info"
	variant="soft"
	placeholder="Ask me anything..."
	assistantName="Claude"
	assistantAvatar="/claude-avatar.png"
/>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorItem}
					<div
						class="w-80 h-48 rounded-ui overflow-hidden border border-muted"
						title="{item.label} {colorItem.label}"
					>
						<ChatBox
							chat={mockChat}
							currentUserId="user-456"
							userName={colorItem.label}
							userStatus={item.label}
							variant={item.id as any}
							color={colorItem.id as any}
						/>
					</div>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">useChat Hook (Conversation Mode)</p>
	<Card color="background" variant="outlined">
		<Code
			lang="typescript"
			code={`const chat = useChat({
	chatId: 'chat-123',           // Unique chat identifier
	userId: 'user-456',           // Current user ID
	apiUrl: 'https://api.example.com',  // REST API endpoint
	wsUrl: 'ws://localhost:3000/ws/chats',  // WebSocket URL
	initialLimit: 50,             // Initial message load limit
	headers: {                    // Optional custom headers
		'X-Custom-Header': 'value'
	},
	autoConnect: true,            // Auto-connect WebSocket (default: true)
	reconnectInterval: 3000,      // Reconnection delay (default: 3000ms)
	maxReconnectAttempts: 5,      // Max reconnection attempts (default: 5)

	// Event callbacks
	onMessageReceived: (message) => {
		console.log('New message:', message);
	},
	onMessageSent: (message) => {
		console.log('Message sent:', message);
	},
	onConnected: () => {
		console.log('WebSocket connected');
	},
	onDisconnected: () => {
		console.log('WebSocket disconnected');
	},
	onError: (error) => {
		console.error('Chat error:', error);
	},

	// Transform API response to Message format
	transformMessage: (data) => ({
		id: data.id,
		content: data.text,
		senderId: data.author_id,
		timestamp: new Date(data.created_at),
		status: data.status,
		type: data.message_type,
		metadata: data.extra_data
	})
});`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Message Types (Conversation Mode)</p>
	<Card color="background" variant="outlined">
		<div class="prose">
			<p>The conversation mode supports multiple message types:</p>
			<ul>
				<li><code>text</code> - Standard text messages (default)</li>
				<li><code>image</code> - Image attachments with preview</li>
				<li><code>voice</code> - Voice notes with audio player</li>
				<li><code>file</code> - Generic file attachments</li>
			</ul>
		</div>
		<Code
			lang="typescript"
			code={`interface Message {
	id: string;
	content: string;
	senderId: string;
	timestamp: Date | string;
	status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
	type?: 'text' | 'image' | 'file' | 'voice';
	metadata?: Record<string, any>;
}`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">ChatState Methods</p>
	<Card color="background" variant="outlined">
		<div class="prose">
			<p>The chat state object provides these methods:</p>
			<ul>
				<li>
					<code>sendMessage(content, type?, metadata?)</code> - Send a new message
				</li>
				<li><code>loadMore()</code> - Load older messages (pagination)</li>
				<li><code>markAsRead(messageId)</code> - Mark a message as read</li>
				<li><code>connect()</code> - Manually connect WebSocket</li>
				<li><code>disconnect()</code> - Disconnect WebSocket</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Custom Header Actions</p>
	<Card color="background" variant="outlined">
		<Code
			lang="svelte"
			code={`<ChatBox {chat} currentUserId="user-456" userName="John Doe">
	{#snippet headerActions()}
		<IconButton
			icon={CallIcon}
			size="sm"
			variant="ghost"
			onclick={() => startVoiceCall()}
		/>
		<IconButton
			icon={VideoIcon}
			size="sm"
			variant="ghost"
			onclick={() => startVideoCall()}
		/>
	{/snippet}
</ChatBox>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Custom Message Renderer</p>
	<Card color="background" variant="outlined">
		<div class="prose">
			<p>
				Use the <code>messageRenderer</code> snippet to customize how messages are displayed:
			</p>
		</div>
		<Code
			lang="svelte"
			code={`<ChatBox mode="prompt" {prompt}>
	{#snippet messageRenderer(message)}
		{#if message.role === 'assistant'}
			<!-- Render markdown for AI responses -->
			<div class="prose">
				{@html marked(message.content)}
			</div>
		{:else}
			<p>{message.content}</p>
		{/if}
	{/snippet}
</ChatBox>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Features</p>
	<Card color="background" variant="outlined">
		<div class="prose">
			<h4>Conversation Mode</h4>
			<ul>
				<li>Real-time messaging via WebSocket with automatic reconnection</li>
				<li>REST API fallback when WebSocket is unavailable</li>
				<li>Message status indicators (sending, sent, delivered, read, error)</li>
				<li>Voice note recording with audio player</li>
				<li>File and image attachment support</li>
				<li>Infinite scroll with "Load more" pagination</li>
				<li>Customizable header actions via snippets</li>
				<li>Token-based authentication support</li>
			</ul>
			<h4>Prompt Mode</h4>
			<ul>
				<li>Role-based messages (user, assistant, system)</li>
				<li>Streaming indicator with animated typing dots</li>
				<li>Stop generation button for canceling responses</li>
				<li>Clean, minimal interface without distractions</li>
				<li>Custom message rendering via snippet</li>
				<li>Support for system messages</li>
			</ul>
			<h4>Shared Features</h4>
			<ul>
				<li>Automatic scrolling to latest messages</li>
				<li>Message timestamps in local time format</li>
				<li>Visual distinction between own and received messages</li>
				<li>Multiple color and variant options</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">API Requirements (Conversation Mode)</p>
	<Card color="background" variant="outlined">
		<div class="prose">
			<h4>REST API</h4>
			<ul>
				<li>
					<code>GET /chats/:chatId/messages?limit=50&before=messageId</code> - Fetch messages
				</li>
				<li><code>POST /chats/:chatId/messages</code> - Send a new message</li>
			</ul>
			<h4>WebSocket</h4>
			<p>WebSocket URL format: <code>ws://host/path?token=xxx&chatId=xxx&userId=xxx</code></p>
			<p>Message types to handle:</p>
			<ul>
				<li><code>type: "message"</code> - New message received</li>
				<li><code>type: "status"</code> - Message status update</li>
				<li><code>type: "typing"</code> - User typing indicator</li>
				<li><code>type: "read"</code> - Mark message as read</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
