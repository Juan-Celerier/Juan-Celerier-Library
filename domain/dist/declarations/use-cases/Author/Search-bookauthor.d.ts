import { BookAuthor } from "domain/src/entities/BookAuthor.js";
export interface SearchBookAuthorsRequest {
    searchTerm?: string;
}
export interface SearchBookAuthorsDependencies {
    bookAuthorRepository: {
        searchByName(searchTerm: string): Promise<BookAuthor[]>;
        findAll(): Promise<BookAuthor[]>;
    };
}
export interface SearchBookAuthorsResponse {
    success: boolean;
    authors?: BookAuthor[];
    totalCount?: number;
    error?: string;
}
export declare function searchBookAuthors(request: SearchBookAuthorsRequest, { bookAuthorRepository }: SearchBookAuthorsDependencies): Promise<SearchBookAuthorsResponse>;
//# sourceMappingURL=Search-bookauthor.d.ts.map