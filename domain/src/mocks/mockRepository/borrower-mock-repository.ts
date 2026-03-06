import {
  Borrower,
  BorrowerRole,
  CreateBorrowerDTO,
} from "domain/src/entities/Borrower.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";
import { createBorrowerMock } from "../borrower-mock.js";

export interface MockedBorrowerRepository extends BorrowerRepository {
  borrowers: Borrower[];
}

export function createBorrowerRepositoryMock(
  borrowers: Borrower[] = [createBorrowerMock()],
): MockedBorrowerRepository {
  return {
    borrowers,

    async findById(id: string) {
      return this.borrowers.find((borrower) => borrower.id === id) || null;
    },

    async findAll() {
      return this.borrowers;
    },

    async findByEmail(email: string) {
      return (
        this.borrowers.find((borrower) => borrower.email === email) || null
      );
    },

    async findByRole(role: BorrowerRole) {
      return this.borrowers.filter((borrower) => borrower.role === role);
    },

    async create(data: CreateBorrowerDTO) {
      const newBorrower = createBorrowerMock(data);
      this.borrowers.push(newBorrower);
      return newBorrower;
    },

    async update(borrower: Borrower) {
      const index = this.borrowers.findIndex((b) => b.id === borrower.id);
      if (index === -1) throw new Error("Borrower not found");

      this.borrowers[index] = borrower;
      return borrower;
    },

    async delete(id: string) {
      const index = this.borrowers.findIndex((borrower) => borrower.id === id);
      if (index !== -1) {
        this.borrowers.splice(index, 1);
      }
    },
  };
}
