import { BorrowerRole, Borrower } from "domain/src/entities/Borrower.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";
export declare function getBorrowersByRole(repository: BorrowerRepository, role: BorrowerRole): Promise<Borrower[]>;
//# sourceMappingURL=get-borrowers-by-role.d.ts.map