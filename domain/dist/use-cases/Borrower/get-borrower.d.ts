import { Borrower } from "domain/src/entities/Borrower.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";
export declare function getBorrower(repository: BorrowerRepository, id: string): Promise<Borrower>;
