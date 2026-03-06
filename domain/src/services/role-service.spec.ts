import { describe, test, expect } from "vitest";
import { RoleService } from "./role-service.js";

describe("RoleService", () => {
  describe("isAuthorized", () => {
    test("should return true when user role is in required roles", () => {
      const result = RoleService.isAuthorized("ADMIN", ["ADMIN", "LIBRARIAN"]);
      expect(result).toBe(true);
    });

    test("should return false when user role is not in required roles", () => {
      const result = RoleService.isAuthorized("MEMBER", ["ADMIN", "LIBRARIAN"]);
      expect(result).toBe(false);
    });

    test("should return true when user role matches exactly one required role", () => {
      const result = RoleService.isAuthorized("LIBRARIAN", ["LIBRARIAN"]);
      expect(result).toBe(true);
    });
  });

  describe("canCreateBooks", () => {
    test("should return true for ADMIN role", () => {
      const result = RoleService.canCreateBooks("ADMIN");
      expect(result).toBe(true);
    });

    test("should return true for LIBRARIAN role", () => {
      const result = RoleService.canCreateBooks("LIBRARIAN");
      expect(result).toBe(true);
    });

    test("should return false for MEMBER role", () => {
      const result = RoleService.canCreateBooks("MEMBER");
      expect(result).toBe(false);
    });

    test("should return false for BORROWER role", () => {
      const result = RoleService.canCreateBooks("BORROWER");
      expect(result).toBe(false);
    });
  });

  describe("canCreateLoans", () => {
    test("should return true for LIBRARIAN role", () => {
      const result = RoleService.canCreateLoans("LIBRARIAN");
      expect(result).toBe(true);
    });

    test("should return false for ADMIN role", () => {
      const result = RoleService.canCreateLoans("ADMIN");
      expect(result).toBe(false);
    });

    test("should return false for MEMBER role", () => {
      const result = RoleService.canCreateLoans("MEMBER");
      expect(result).toBe(false);
    });

    test("should return false for BORROWER role", () => {
      const result = RoleService.canCreateLoans("BORROWER");
      expect(result).toBe(false);
    });
  });

  describe("canCreateReservations", () => {
    test("should return true for MEMBER role", () => {
      const result = RoleService.canCreateReservations("MEMBER");
      expect(result).toBe(true);
    });

    test("should return true for BORROWER role", () => {
      const result = RoleService.canCreateReservations("BORROWER");
      expect(result).toBe(true);
    });

    test("should return false for ADMIN role", () => {
      const result = RoleService.canCreateReservations("ADMIN");
      expect(result).toBe(false);
    });

    test("should return false for LIBRARIAN role", () => {
      const result = RoleService.canCreateReservations("LIBRARIAN");
      expect(result).toBe(false);
    });
  });

  describe("canPerformAdminActions", () => {
    test("should return true for ADMIN role", () => {
      const result = RoleService.canPerformAdminActions("ADMIN");
      expect(result).toBe(true);
    });

    test("should return false for LIBRARIAN role", () => {
      const result = RoleService.canPerformAdminActions("LIBRARIAN");
      expect(result).toBe(false);
    });

    test("should return false for MEMBER role", () => {
      const result = RoleService.canPerformAdminActions("MEMBER");
      expect(result).toBe(false);
    });

    test("should return false for BORROWER role", () => {
      const result = RoleService.canPerformAdminActions("BORROWER");
      expect(result).toBe(false);
    });
  });
});
