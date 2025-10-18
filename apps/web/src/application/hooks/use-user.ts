import { useState, useEffect } from "react";
import { mockUsers } from "../mocks/user-mock";
import type { User } from "app-domain/entities/User";

export const useUsers = (role?: "BORROWER" | "LIBRARIAN") => {
  // Opcional: filtrar por role
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let filteredUsers = mockUsers;
      if (role) {
        filteredUsers = mockUsers.filter((user) => user.role === role);
      }
      setUsers(filteredUsers);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [role]); // Dependencia en 'role' para recargar si cambia

  return { users, isLoading };
};
