import { BaseResource } from "./base.js";
import type { MessageResponse } from "../core/types.js";
import type { SentMessage } from "../types/messages.js";
import type {
  Group,
  GroupDetail,
  CreateGroupParams,
  CreateGroupResult,
  UpdateGroupParams,
  ManageParticipantsParams,
  ParticipantResult,
  SendGroupMessageParams,
  GroupInvite,
  GroupJoinRequest,
  ManageRequestsParams,
  UpdateSettingsParams,
  UpdateSettingsResult,
  JoinGroupParams,
  JoinGroupResult,
} from "../types/groups.js";

export class Groups extends BaseResource {
  list(sessionId: string): Promise<Group[]> {
    return this.client.request<Group[]>("GET", `/sessions/${sessionId}/groups`);
  }

  create(sessionId: string, params: CreateGroupParams): Promise<CreateGroupResult> {
    return this.client.request<CreateGroupResult>("POST", `/sessions/${sessionId}/groups`, { body: params });
  }

  get(sessionId: string, groupId: string): Promise<GroupDetail> {
    return this.client.request<GroupDetail>("GET", `/sessions/${sessionId}/groups/${groupId}`);
  }

  update(sessionId: string, groupId: string, params: UpdateGroupParams): Promise<MessageResponse> {
    return this.client.request<MessageResponse>("PUT", `/sessions/${sessionId}/groups/${groupId}`, { body: params });
  }

  leave(sessionId: string, groupId: string): Promise<MessageResponse> {
    return this.client.request<MessageResponse>("DELETE", `/sessions/${sessionId}/groups/${groupId}`);
  }

  manageParticipants(sessionId: string, groupId: string, params: ManageParticipantsParams): Promise<{ participants: ParticipantResult[] }> {
    return this.client.request<{ participants: ParticipantResult[] }>("POST", `/sessions/${sessionId}/groups/${groupId}/participants`, { body: params });
  }

  sendMessage(sessionId: string, groupId: string, params: SendGroupMessageParams): Promise<SentMessage> {
    return this.client.request<SentMessage>("POST", `/sessions/${sessionId}/groups/${groupId}/messages`, { body: params });
  }

  getInvite(sessionId: string, groupId: string): Promise<GroupInvite> {
    return this.client.request<GroupInvite>("GET", `/sessions/${sessionId}/groups/${groupId}/invite`);
  }

  revokeInvite(sessionId: string, groupId: string): Promise<GroupInvite> {
    return this.client.request<GroupInvite>("DELETE", `/sessions/${sessionId}/groups/${groupId}/invite`);
  }

  getRequests(sessionId: string, groupId: string): Promise<GroupJoinRequest[]> {
    return this.client.request<GroupJoinRequest[]>("GET", `/sessions/${sessionId}/groups/${groupId}/requests`);
  }

  manageRequests(sessionId: string, groupId: string, params: ManageRequestsParams): Promise<ParticipantResult[]> {
    return this.client.request<ParticipantResult[]>("POST", `/sessions/${sessionId}/groups/${groupId}/requests`, { body: params });
  }

  updateSettings(sessionId: string, groupId: string, params: UpdateSettingsParams): Promise<UpdateSettingsResult> {
    return this.client.request<UpdateSettingsResult>("PUT", `/sessions/${sessionId}/groups/${groupId}/settings`, { body: params });
  }

  getInviteInfo(sessionId: string, params: { code: string }): Promise<Record<string, unknown>> {
    return this.client.request<Record<string, unknown>>("GET", `/sessions/${sessionId}/groups/invite-info`, { query: params });
  }

  join(sessionId: string, params: JoinGroupParams): Promise<JoinGroupResult> {
    return this.client.request<JoinGroupResult>("POST", `/sessions/${sessionId}/groups/join`, { body: params });
  }
}
