import { CreateBorrowerDTO, Borrower } from "domain/src/entities/Borrower.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";
export declare function registerBorrower(repository: BorrowerRepository, input: CreateBorrowerDTO): Promise<Borrower>;
