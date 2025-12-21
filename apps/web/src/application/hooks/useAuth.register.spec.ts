import { describe, it, expect } from "vitest";
import { apiClient } from "../../utils/api-client";

describe("api-client mock register", () => {
  it("auth/register creates a new user", async () => {
    const email = `test.user.${Date.now()}@example.com`;
    const res = await apiClient.call<any>("auth/register", {
      name: "Test",
      surname: "User",
      email,
      password: "x",
    });
    expect((res as any).token).toBeTruthy();
    expect((res as any).user).toBeDefined();
  });
});
