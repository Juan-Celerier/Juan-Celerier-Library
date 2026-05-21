import { describe, it, expect } from "vitest";
import { apiClient } from "../../utils/api-client";

describe("api-client mock register", () => {
  it("auth/register creates a new user", async () => {
    const email = `test.user.${Date.now()}@example.com`;
    const res = await apiClient.call<any>("auth/register", {
      name: "Test",
      surname: "User",
      email,
      password: "password123dssss", // Aumentamos la longitud por si hay validación
    });

    expect(res).toBeDefined();
    expect(res.token).toBeTruthy();
  });
});
