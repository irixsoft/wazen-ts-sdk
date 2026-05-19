# Changelog

## 0.4.0

- Add `sender_lid`, `from_phone_number`, `from_display_name` fields to the `Message` type
- These surface the actual sender phone number behind Baileys v7 LID identifiers (`*@lid`) for inbound messages
- For group messages, `sender_lid` and `from_phone_number` identify the individual participant (`from_jid` remains the group JID)

## 0.3.0

- Add `mime_type`, `file_size`, `file_name` fields to the `Message` type (inbound media metadata)
- Add `messages.getMedia(sessionId, messageId)` returning `Uint8Array` of raw media bytes

## 0.2.0

- All features now available on all plans (removed Pro+ tier restrictions)
- Groups, Channels, and bulk contact validation no longer require Pro+ subscription
- Updated documentation to reflect universal feature access

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
