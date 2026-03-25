# Wazen Node.js / TypeScript SDK

Official TypeScript SDK for the [Wazen WhatsApp API](https://wazen.dev).

[![npm](https://img.shields.io/npm/v/@wazen/sdk)](https://www.npmjs.com/package/@wazen/sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org)

## Installation

```bash
npm install @wazen/sdk
```

```bash
bun add @wazen/sdk
```

```bash
yarn add @wazen/sdk
```

## Quick Start

```typescript
import { Wazen } from "@wazen/sdk";

const wazen = new Wazen("wz_your_api_key");

// Send a message
const message = await wazen.messages.send("session-id", {
  to: "+1234567890",
  type: "text",
  content: "Hello from Wazen!",
});

// List sessions
const sessions = await wazen.sessions.list();

// Check if a number is on WhatsApp
const result = await wazen.contacts.check("session-id", {
  phone: "+1234567890",
});
```

## Resources

All resources are accessible as properties on the client instance.

### Sessions

```typescript
await wazen.sessions.create();
await wazen.sessions.list();
await wazen.sessions.get("session-id");
await wazen.sessions.delete("session-id");
await wazen.sessions.restart("session-id");
await wazen.sessions.getQr("session-id");
await wazen.sessions.factoryReset("session-id");
```

### Messages

```typescript
// Send text
await wazen.messages.send("session-id", {
  to: "+1234567890",
  type: "text",
  content: "Hello!",
});

// Send image
await wazen.messages.send("session-id", {
  to: "+1234567890",
  type: "image",
  media_url: "https://example.com/photo.jpg",
});

// Get message history
await wazen.messages.list("session-id", { direction: "outgoing", limit: 10 });

// Get single message
await wazen.messages.get("session-id", "message-id");
```

### Groups (Pro+)

```typescript
await wazen.groups.list("session-id");
await wazen.groups.create("session-id", {
  subject: "Team Chat",
  participants: ["+1234567890"],
});
await wazen.groups.get("session-id", "group-id");
await wazen.groups.update("session-id", "group-id", { subject: "New Name" });
await wazen.groups.leave("session-id", "group-id");
await wazen.groups.manageParticipants("session-id", "group-id", {
  action: "add",
  participants: ["+0987654321"],
});
await wazen.groups.sendMessage("session-id", "group-id", {
  type: "text",
  content: "Hello group!",
});
await wazen.groups.getInvite("session-id", "group-id");
await wazen.groups.revokeInvite("session-id", "group-id");
await wazen.groups.getRequests("session-id", "group-id");
await wazen.groups.manageRequests("session-id", "group-id", {
  participants: ["jid@s.whatsapp.net"],
  action: "approve",
});
await wazen.groups.updateSettings("session-id", "group-id", {
  setting: "announcement",
});
await wazen.groups.getInviteInfo("session-id", { code: "ABC123" });
await wazen.groups.join("session-id", { code: "ABC123" });
```

### Channels (Pro+)

```typescript
await wazen.channels.create("session-id", {
  name: "Product Updates",
  description: "Latest news",
});
await wazen.channels.lookup("session-id", { jid: "channel@newsletter" });
await wazen.channels.get("session-id", "channel-id");
await wazen.channels.update("session-id", "channel-id", { name: "New Name" });
await wazen.channels.delete("session-id", "channel-id");
await wazen.channels.sendMessage("session-id", "channel-id", {
  type: "text",
  content: "New release!",
});
await wazen.channels.listMessages("session-id", "channel-id", { count: 10 });
await wazen.channels.react("session-id", "channel-id", "msg-id", { reaction: "👍" });
await wazen.channels.follow("session-id", "channel-id");
await wazen.channels.unfollow("session-id", "channel-id");
await wazen.channels.mute("session-id", "channel-id");
await wazen.channels.unmute("session-id", "channel-id");
```

### Contacts

```typescript
// Check single number
await wazen.contacts.check("session-id", { phone: "+1234567890" });

// Bulk check (Pro+)
await wazen.contacts.bulkCheck("session-id", {
  phones: ["+1234567890", "+0987654321"],
});
```

### Warming

```typescript
await wazen.warming.start("session-id", {
  contacts: [
    { phone: "+1234567890", name: "Alice" },
    { phone: "+0987654321" },
  ],
});
await wazen.warming.getStatus("session-id");
await wazen.warming.pause("session-id");
await wazen.warming.resume("session-id");
await wazen.warming.cancel("session-id");
```

### Webhooks

```typescript
await wazen.webhooks.create({
  url: "https://your-app.com/webhooks/wazen",
  events: ["message.received", "message.delivered"],
});
await wazen.webhooks.list();
await wazen.webhooks.update("webhook-id", { enabled: false });
await wazen.webhooks.delete("webhook-id");
await wazen.webhooks.test("webhook-id");
await wazen.webhooks.getLogs("webhook-id");
```

### Account

```typescript
const account = await wazen.account.get();
const usage = await wazen.account.getUsage();
```

### API Keys

```typescript
const key = await wazen.apiKeys.create({ name: "new-key" });
await wazen.apiKeys.list();
await wazen.apiKeys.revoke("key-id");
```

## Configuration

```typescript
const wazen = new Wazen("wz_your_api_key", {
  baseUrl: "https://wazen.dev/api/v1", // default
  timeout: 30000, // request timeout in ms, default 30s
});
```

## Error Handling

```typescript
import { Wazen, WazenApiError } from "@wazen/sdk";

try {
  await wazen.messages.send("session-id", { to: "+1234567890", type: "text", content: "Hi" });
} catch (error) {
  if (error instanceof WazenApiError) {
    console.error(error.status);   // HTTP status code
    console.error(error.code);     // API error code
    console.error(error.message);  // Error message
  }
}
```

## Requirements

- Node.js 18+ or Bun 1.0+
- A Wazen account with an active subscription
- An API key from your [Dashboard](https://wazen.dev/dashboard/developers)

## Links

- [API Documentation](https://wazen.dev/docs)
- [MCP Server Guide](https://wazen.dev/docs/mcp)
- [Dashboard](https://wazen.dev/dashboard)

## License

MIT
