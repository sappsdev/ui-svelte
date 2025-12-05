## ChatBox Component

Complete chat interface with real-time messaging, WebSocket support, and file sharing.

```svelte
<ChatBox
  {chat}
  currentUserId="user-123"
  userName="John Doe"
  userStatus="Online"
  variant="primary"
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `chat` | - | ChatState from useChat hook (required) |
| `currentUserId` | - | Current user's ID (required) |
| `userName` | - | Chat recipient name (required) |
| `variant` | `'solid'` | `primary` `secondary` `soft` `ghost` etc. |
| `userAvatar` | - | Recipient avatar URL |
| `userStatus` | `'Online'` | Status text |
| `headerActions` | - | Snippet for custom header buttons |
| `onVoiceNote` | - | `(blob, url) => void` |
| `onFileAttach` | - | `(file) => void` |
| `onCameraCapture` | - | `() => void` |

### useChat Hook

```svelte
const chat = useChat({
  chatId: 'chat-123',
  userId: 'user-456',
  apiUrl: 'https://api.example.com',
  wsUrl: 'ws://localhost:3000/ws/chats',
  initialLimit: 50,
  autoConnect: true,
  reconnectInterval: 3000,
  maxReconnectAttempts: 5,
  onMessageReceived: (msg) => {},
  onMessageSent: (msg) => {},
  onConnected: () => {},
  onDisconnected: () => {},
  onError: (error) => {},
  transformMessage: (data) => ({ ... })
});
```

### Message Interface

```typescript
interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date | string;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
  type?: 'text' | 'image' | 'file' | 'voice';
  metadata?: Record<string, any>;
}
```

### Chat Methods

- `sendMessage(content, type?, metadata?)` - Send message
- `loadMore()` - Load older messages
- `markAsRead(messageId)` - Mark as read
- `connect()` - Connect WebSocket
- `disconnect()` - Disconnect WebSocket

### Common Patterns

```svelte
<!-- Basic Chat -->
<script>
  const chat = useChat({
    chatId: 'chat-123',
    userId: 'user-456',
    apiUrl: 'https://api.example.com',
    wsUrl: 'ws://localhost:3000/ws/chats'
  });
</script>

<ChatBox {chat} currentUserId="user-456" userName="John Doe" />

<!-- With Custom Header Actions -->
<ChatBox {chat} currentUserId="user-456" userName="Jane">
  {#snippet headerActions()}
    <IconButton icon="fluent:call-24-regular" size="sm" variant="ghost" />
    <IconButton icon="fluent:video-24-regular" size="sm" variant="ghost" />
  {/snippet}
</ChatBox>

<!-- With File Handlers -->
<ChatBox
  {chat}
  currentUserId="user-456"
  userName="Bob"
  onVoiceNote={(blob, url) => console.log('Voice:', url)}
  onFileAttach={(file) => console.log('File:', file.name)}
  onCameraCapture={() => console.log('Camera')}
/>

<!-- Custom Variant -->
<ChatBox
  {chat}
  currentUserId="user-456"
  userName="Alice"
  variant="soft"
  userAvatar="/avatar.jpg"
  userStatus="Away"
/>
```

**For LLMs**: ChatBox provides complete chat UI with WebSocket real-time messaging. Requires `useChat` hook for state management. Supports text, image, file, and voice messages. Use `headerActions` snippet for custom header buttons. Handlers for voice notes, file attachments, and camera capture are optional. Message status tracking (sending, sent, delivered, read, error). Auto-reconnection on disconnect.

---

## Quick Hierarchy Reference
```
Page
|-- Section (page structure, bodyClass for layout)
    |-- Card (content container, bodyClass for layout)
        |-- Content (ChatBox, text, images, etc.)
```

**Key Rule**: Section → Card → Content. Never nest Sections.

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

**Layout System**: Apply flex/grid utilities via `bodyClass` on Section/Card. Always use `gap` utilities.

**Mobile-First**: Start with `column`, expand with `md:row`. Use responsive grid: `grid-1 md:grid-3`.
