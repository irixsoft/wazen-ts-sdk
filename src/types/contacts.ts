export interface CheckContactParams {
  phone: string;
}

export interface ContactCheckResult {
  phone: string;
  exists: boolean;
  jid: string | null;
}

export interface BulkCheckContactsParams {
  phones: string[];
}

export interface BulkCheckResult {
  contacts: ContactCheckResult[];
}
