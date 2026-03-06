import { Borrower, BorrowerRole, CreateBorrowerDTO } from "../entities/Borrower.js";
export interface BorrowerRepository {
    findById(id: string): Promise<Borrower | null>;
    findAll(): Promise<Borrower[]>;
    findByEmail(email: string): Promise<Borrower | null>;
    findByRole(role: BorrowerRole): Promise<Borrower[]>;
    create(data: CreateBorrowerDTO): Promise<Borrower>;
    update(borrower: Borrower): Promise<Borrower>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=borrower-repository.d.ts.map