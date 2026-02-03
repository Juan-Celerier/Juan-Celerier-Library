import { Borrower } from "domain/src/entities/Borrower.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";
export interface MockedBorrowerRepository extends BorrowerRepository {
    borrowers: Borrower[];
}
export declare function createBorrowerRepositoryMock(borrowers?: Borrower[]): MockedBorrowerRepository;
//# sourceMappingURL=borrower-mock-repository.d.ts.map