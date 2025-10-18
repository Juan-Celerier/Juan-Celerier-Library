import type { Book } from "app-domain/entities/Book";
import { useState, useEffect } from "react";
import { mockBooks } from "../mocks/book-mock";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks(mockBooks);
      setIsLoading(false);
    }, 800); // Delay un poco más para simular carga de más datos

    return () => clearTimeout(timer);
  }, []);

  return { books, isLoading };
};
