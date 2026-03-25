export interface AccountUser {
  id: string;
  email: string;
  name: string | null;
  email_verified: boolean;
  created_at: string;
}

export interface AccountSubscription {
  plan: string;
  interval: string;
  status: string;
  is_early_bird: boolean;
  current_period_end: string | null;
}

export interface AccountLimits {
  max_sessions: number;
  group_api: boolean;
  channel_api: boolean;
  bulk_validator: boolean;
  mcp_access: boolean;
  custom_webhook_retry: boolean;
}

export interface Account {
  user: AccountUser;
  subscription: AccountSubscription;
  limits: AccountLimits;
}

export interface Usage {
  sessions: {
    active: number;
    max: number;
  };
  messages: {
    today: number;
  };
}
