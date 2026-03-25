import { BaseResource } from "./base.js";
import type {
  StartWarmingParams,
  WarmingStatus,
  GetWarmingStatusResult,
  WarmingActionResult,
} from "../types/warming.js";

export class Warming extends BaseResource {
  start(sessionId: string, params: StartWarmingParams): Promise<WarmingStatus> {
    return this.client.request<WarmingStatus>("POST", `/sessions/${sessionId}/warming`, { body: params });
  }

  getStatus(sessionId: string): Promise<GetWarmingStatusResult> {
    return this.client.request<GetWarmingStatusResult>("GET", `/sessions/${sessionId}/warming`);
  }

  pause(sessionId: string): Promise<WarmingActionResult> {
    return this.client.request<WarmingActionResult>("POST", `/sessions/${sessionId}/warming/pause`);
  }

  resume(sessionId: string): Promise<WarmingActionResult> {
    return this.client.request<WarmingActionResult>("POST", `/sessions/${sessionId}/warming/resume`);
  }

  cancel(sessionId: string): Promise<WarmingActionResult> {
    return this.client.request<WarmingActionResult>("DELETE", `/sessions/${sessionId}/warming`);
  }
}
