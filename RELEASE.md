# Wazen TypeScript SDK v0.1.0

Initial release of the official TypeScript/Node.js SDK for the [Wazen WhatsApp API](https://wazen.dev).

## Highlights

- Full coverage of the Wazen v1 REST API (54 methods across 9 resources)
- Zero runtime dependencies, uses native `fetch`
- First-class TypeScript support with complete type definitions
- ESM only, targets Node.js 18+ and Bun

## Resources

### Sessions (7 methods)
Create and manage WhatsApp sessions. Connect, disconnect, restart, factory reset, and retrieve QR codes for pairing.

### Messages (3 methods)
Send text, image, video, audio, and document messages. Retrieve message history with filtering by direction and type.

### Contacts (2 methods)
Check if phone numbers are registered on WhatsApp. Bulk check up to 500 numbers at once (Pro+).

### Groups (14 methods)
Full group management: create, update, leave, manage participants (add/remove/promote/demote), send messages, manage invites, handle join requests, and configure group settings. (Pro+)

### Channels (12 methods)
WhatsApp Channels (newsletters): create, look up, update, delete, send messages, list messages, react, follow/unfollow, and mute/unmute. (Pro+)

### Warming (5 methods)
14-day number warming program to build sending reputation. Start, pause, resume, cancel, and check status.

### Webhooks (6 methods)
Register webhook endpoints for real-time event delivery. Supports 10 event types including message lifecycle, session state, and warming progress. Test endpoints and view delivery logs.

### Account and Usage (2 methods)
Retrieve account details, subscription info, feature limits, and current usage statistics.

### API Keys (3 methods)
Create, list, and revoke API keys programmatically.

## Error Handling

Three error classes for precise catch handling:
- `WazenApiError` - API returned an error (includes `status`, `code`, `message`, `details`, `requestId`)
- `WazenTimeoutError` - Request exceeded the configured timeout
- `WazenNetworkError` - Network failure prevented the request from completing

## Quick Start

```bash
npm install wazen
```

```typescript
import { Wazen, WazenApiError } from "wazen";

const wazen = new Wazen("wz_your_api_key");

// Send a message
const message = await wazen.messages.send("session-id", {
  to: "+1234567890",
  type: "text",
  content: "Hello from Wazen!",
});

// Error handling
try {
  await wazen.sessions.get("bad-id");
} catch (error) {
  if (error instanceof WazenApiError) {
    console.error(error.code);    // "SESSION_NOT_FOUND"
    console.error(error.status);  // 404
  }
}
```

## Links

- [npm package](https://www.npmjs.com/package/wazen)
- [GitHub repository](https://github.com/irixsoft/wazen-ts-sdk)
- [API documentation](https://wazen.dev/docs)
- [Dashboard](https://wazen.dev/dashboard)
