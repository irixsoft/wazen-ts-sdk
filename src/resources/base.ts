import type { HttpClient } from "../core/http-client.js";

export class BaseResource {
  protected readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }
}
