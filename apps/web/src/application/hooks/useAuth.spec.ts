import { describe, it, expect } from "vitest";
import { apiClient } from "../../utils/api-client";

describe("api-client mock auth", () => {
  it("auth/login returns token for known user", async () => {
    const res = await apiClient.call<any>("auth/login", {
      email: "juan.perez@ejemplo.com",
      password: "x",
    });
    expect((res as any).token).toBeTruthy();
  });
});
