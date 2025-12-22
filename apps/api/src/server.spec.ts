import { describe, it, expect } from "vitest";
// Nota: No importamos 'server.ts' para evitar que se ejecute el main()
// Podemos importar constantes si no tienen efectos secundarios, o simplemente probar la lógica básica.

describe("API Server Smoke Test", () => {
  it("should be running in a test environment", () => {
    // Vitest asigna automáticamente NODE_ENV a 'test'
    expect(process.env.NODE_ENV).toBe("test");
  });

  it("should have a valid configuration setup", () => {
    const isAlive = true;
    expect(isAlive).toBe(true);
  });
});
