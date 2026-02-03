import { UserRole } from "../entities/User.js";

/**
 * Role-based authorization service
 */
export class RoleService {
  /**
   * Check if a user role is authorized to perform an action
   * @param userRole The role of the user
   * @param requiredRoles The roles required to perform the action
   * @returns true if authorized, false otherwise
   */
  static isAuthorized(userRole: UserRole, requiredRoles: UserRole[]): boolean {
    return requiredRoles.includes(userRole);
  }

  /**
   * Check if user can create books (ADMIN or LIBRARIAN)
   */
  static canCreateBooks(userRole: UserRole): boolean {
    return this.isAuthorized(userRole, ["ADMIN", "LIBRARIAN"]);
  }

  /**
   * Check if user can create loans (LIBRARIAN)
   */
  static canCreateLoans(userRole: UserRole): boolean {
    return this.isAuthorized(userRole, ["LIBRARIAN"]);
  }

  /**
   * Check if user can create reservations (MEMBER or BORROWER)
   */
  static canCreateReservations(userRole: UserRole): boolean {
    return this.isAuthorized(userRole, ["MEMBER", "BORROWER"]);
  }

  /**
   * Check if user can perform admin actions (ADMIN)
   */
  static canPerformAdminActions(userRole: UserRole): boolean {
    return this.isAuthorized(userRole, ["ADMIN"]);
  }
}
