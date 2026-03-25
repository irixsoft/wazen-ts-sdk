import type { MessageType } from "./messages.js";

export interface GroupParticipant {
  id: string;
  admin?: string | null;
  [key: string]: unknown;
}

export interface Group {
  id: string;
  subject: string;
  owner?: string;
  creation?: number;
  size?: number;
  participants: GroupParticipant[];
  [key: string]: unknown;
}

export interface GroupDetail extends Group {
  desc?: string;
}

export interface CreateGroupParams {
  subject: string;
  participants: string[];
}

export interface CreateGroupResult {
  id: string;
  subject: string;
}

export interface UpdateGroupParams {
  subject?: string;
  description?: string;
}

export interface ManageParticipantsParams {
  action: "add" | "remove" | "promote" | "demote";
  participants: string[];
}

export interface ParticipantResult {
  status: string;
  jid: string;
  [key: string]: unknown;
}

export interface SendGroupMessageParams {
  type: MessageType;
  content?: string;
  media_url?: string;
}

export interface GroupInvite {
  code: string;
  link: string;
}

export interface GroupJoinRequest {
  jid: string;
  [key: string]: unknown;
}

export interface ManageRequestsParams {
  participants: string[];
  action: "approve" | "reject";
}

export interface UpdateSettingsParams {
  setting?: "announcement" | "not_announcement" | "locked" | "unlocked";
  ephemeral?: number;
  member_add_mode?: "admin_add" | "all_member_add";
  join_approval?: "on" | "off";
}

export interface UpdateSettingsResult {
  message: string;
  applied: string[];
}

export interface JoinGroupParams {
  code: string;
}

export interface JoinGroupResult {
  group_id: string;
}
