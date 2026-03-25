export interface WarmingContact {
  phone: string;
  name?: string;
}

export interface StartWarmingParams {
  contacts: WarmingContact[];
}

export interface WarmingStatus {
  id: string;
  status: string;
  current_day: number;
  messages_sent_today: number;
  started_at: string | null;
  completed_at: string | null;
}

export interface WarmingInactive {
  active: false;
}

export type GetWarmingStatusResult = WarmingStatus | WarmingInactive;

export interface WarmingActionResult {
  id: string;
  status: string;
}
