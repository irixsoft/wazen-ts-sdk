# Changelog

## 0.1.0

Initial release of the Wazen TypeScript SDK.

- Full coverage of the Wazen v1 REST API (54 methods across 9 resources)
- Sessions: create, list, get, delete, restart, getQr, factoryReset
- Messages: send, list, get
- Contacts: check, bulkCheck
- Groups: list, create, get, update, leave, manageParticipants, sendMessage, getInvite, revokeInvite, getRequests, manageRequests, updateSettings, getInviteInfo, join
- Channels: create, lookup, get, update, delete, sendMessage, listMessages, react, follow, unfollow, mute, unmute
- Warming: start, getStatus, pause, resume, cancel
- Webhooks: create, list, update, delete, test, getLogs
- Account: get, getUsage
- API Keys: create, list, revoke
- Typed error handling with WazenApiError, WazenTimeoutError, WazenNetworkError
- Zero runtime dependencies, uses native fetch
- ESM only, targets Node.js 18+ and Bun
