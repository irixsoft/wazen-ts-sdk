export interface CreateSessionParams {
  phone_number?: string;
}

export interface Session {
  id: string;
  phone_number: string | null;
  status: string;
  created_at: string;
  connected_at?: string | null;
  last_activity_at?: string | null;
  qr_code?: string | null;
}

export interface SessionQr {
  id: string;
  status: string;
  qr_code: string | null;
}

export interface ListSessionsParams {
  page?: number;
  limit?: number;
}
