# ChatBox Component

Chat interface supporting conversation mode (WebSocket) and prompt mode (LLM).

## Import

```svelte
import { ChatBox, useChat, type PromptMessage, type PromptState } from 'ui-svelte';
```

## Props

| Prop              | Type                              | Default               | Description                    |
| ----------------- | --------------------------------- | --------------------- | ------------------------------ |
| `mode`            | `'conversation' \| 'prompt'`      | `'conversation'`      | Chat mode                      |
| `chat`            | `ChatState`                       | -                     | Required for conversation mode |
| `prompt`          | `PromptState`                     | -                     | Required for prompt mode       |
| `currentUserId`   | `string`                          | -                     | Current user ID                |
| `userName`        | `string`                          | -                     | Display name                   |
| `userAvatar`      | `string`                          | -                     | Avatar URL                     |
| `userStatus`      | `string`                          | `'Online'`            | Status text                    |
| `color`           | `Color`                           | `'primary'`           | Color theme                    |
| `variant`         | `'solid' \| 'soft' \| 'outlined'` | `'solid'`             | Visual style                   |
| `placeholder`     | `string`                          | `'Type a message...'` | Input placeholder              |
| `showHeader`      | `boolean`                         | `true`                | Show header                    |
| `showAttachments` | `boolean`                         | `true`                | Show file attach               |
| `showVoiceNote`   | `boolean`                         | `true`                | Show voice recording           |
| `showCamera`      | `boolean`                         | `false`               | Show camera button             |
| `assistantName`   | `string`                          | `'Assistant'`         | AI assistant name              |
| `assistantAvatar` | `string`                          | -                     | AI avatar URL                  |
| `headerActions`   | `Snippet`                         | -                     | Custom header buttons          |
| `messageRenderer` | `Snippet<[Message]>`              | -                     | Custom message render          |

## Types

```typescript
// Conversation Mode
interface Message {
	id: string;
	content: string;
	senderId: string;
	timestamp: Date | string;
	status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
	type?: 'text' | 'image' | 'file' | 'voice';
}

// Prompt Mode (LLM)
interface PromptMessage {
	id: string;
	role: 'user' | 'assistant' | 'system';
	content: string;
	timestamp?: Date | string;
	isStreaming?: boolean;
}

interface PromptState {
	messages: PromptMessage[];
	isLoading: boolean;
	isStreaming: boolean;
	error: any;
	sendMessage: (content: string) => Promise<void>;
	stopGeneration?: () => void;
}
```

## Patterns

### Conversation Mode (WebSocket)

```svelte
<script>
	import { ChatBox, useChat } from 'ui-svelte';

	const chat = useChat({
		chatId: 'chat-123',
		userId: 'user-456',
		apiUrl: 'https://api.example.com',
		wsUrl: 'ws://localhost:3000/ws/chats',
		autoConnect: true
	});
</script>

<ChatBox
	mode="conversation"
	{chat}
	currentUserId="user-456"
	userName="John Doe"
	userAvatar="/avatar.jpg"
/>
```

### Prompt Mode (LLM)

```svelte
<script>
	import { ChatBox, type PromptMessage, type PromptState } from 'ui-svelte';

	let messages = $state<PromptMessage[]>([]);
	let isLoading = $state(false);
	let isStreaming = $state(false);

	const prompt: PromptState = {
		get messages() {
			return messages;
		},
		get isLoading() {
			return isLoading;
		},
		get isStreaming() {
			return isStreaming;
		},
		error: null,
		sendMessage: async (content) => {
			isLoading = true;
			messages = [
				...messages,
				{
					id: Date.now().toString(),
					role: 'user',
					content,
					timestamp: new Date()
				}
			];

			// Call LLM API
			const response = await fetch('/api/chat', {
				method: 'POST',
				body: JSON.stringify({ messages })
			});

			const data = await response.json();
			messages = [
				...messages,
				{
					id: (Date.now() + 1).toString(),
					role: 'assistant',
					content: data.response,
					timestamp: new Date()
				}
			];
			isLoading = false;
		},
		stopGeneration: () => {
			isStreaming = false;
			isLoading = false;
		}
	};
</script>

<ChatBox mode="prompt" {prompt} placeholder="Ask me anything..." assistantName="AI Assistant" />
```

### Custom Header Actions

```svelte
<ChatBox {chat} currentUserId="user-456" userName="John">
	{#snippet headerActions()}
		<IconButton icon={CallIcon} size="sm" variant="ghost" />
		<IconButton icon={VideoIcon} size="sm" variant="ghost" />
	{/snippet}
</ChatBox>
```

## Features

**Conversation Mode:**

- Real-time WebSocket messaging
- Auto-reconnection
- Message status (sending, sent, delivered, read)
- Voice notes, file/image attachments
- Infinite scroll pagination

**Prompt Mode:**

- Role-based messages (user, assistant, system)
- Streaming indicator
- Stop generation button
- Minimal interface

## Notes

- Use `useChat` hook for conversation mode
- Custom `PromptState` object for prompt mode
- `messageRenderer` snippet for custom message formatting
