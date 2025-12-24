import { Link, useLoaderData } from "react-router-dom";
import { useState, useMemo } from "react";
import MainLayout from "../../layouts/MainLayout";
import type { BookDTO } from "app-domain/dtos/dashboard";
import { apiClient } from "../../utils/api-client";
import { BookCard } from "../../components/Card/Book-card";
import { SearchBox } from "../../components/common/Search";

export const booksLoader = async () => {
  const res = await apiClient.call<BookDTO[]>("books");
  if (res && typeof res === "object" && "error" in (res as any)) {
    return { books: [] };
  }
  return { books: res as BookDTO[] };
};

const BooksPage = () => {
  const { books } = useLoaderData() as { books: BookDTO[] };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = useMemo(() => {
    if (!searchTerm) return books;
    return books.filter((book) =>
      (book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (typeof book.author === "string"
        ? book.author.toLowerCase().includes(searchTerm.toLowerCase())
        : (book.author as any)?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
      )
    );
  }, [books, searchTerm]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Catálogo de libros</h1>
          <Link to="/books" className="text-sm text-emerald-600" />
        </header>

        <SearchBox onSearchChange={setSearchTerm} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((b) => (
            <Link key={b.id} to={`/books/${b.id}`}>
              <BookCard
                title={b.title || "Untitled"}
                author={
                  typeof b.author === "string"
                    ? b.author
                    : (b.author as any)?.name || "Desconocido"
                }
                isAvailable={Boolean(
                  b.availableCopies && b.availableCopies > 0
                )}
                imageUrl={b.imageUrl}
              />
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default BooksPage;
