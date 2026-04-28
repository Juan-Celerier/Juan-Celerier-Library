import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { BookDTO } from "app-domain/dtos/dashboard";
import { apiClient } from "../../utils/api-client";

export const useBooksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<BookDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [availabilityFilter, setAvailabilityFilter] = useState<
    "all" | "available" | "unavailable"
  >("all");
  const [sortBy, setSortBy] = useState<
    "title" | "author" | "newest" | "oldest"
  >("title");
  const [authorFilter, setAuthorFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 12;

  // Update searchTerm when URL changes
  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    setSearchTerm(searchFromUrl);
  }, [searchParams]);

  // Update URL when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
    } else {
      setSearchParams({});
    }
  }, [searchTerm, setSearchParams]);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.call<BookDTO[]>("books");
        if (res && typeof res === "object" && "error" in (res as any)) {
          console.error("Error fetching books:", (res as any).error);
          setError((res as any).error);
          setBooks([]);
        } else {
          setBooks(res as BookDTO[]);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Error al cargar los libros");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Get unique authors
  const uniqueAuthors = useMemo(() => {
    return Array.from(
      new Set(
        books
          .map((book) => {
            if (typeof book.author === "string") return book.author;
            return (book.author as any)?.name || "";
          })
          .filter(Boolean),
      ),
    ).sort();
  }, [books]);

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = books;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          (book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ??
            false) ||
          (typeof book.author === "string"
            ? book.author.toLowerCase().includes(searchTerm.toLowerCase())
            : ((book.author as any)?.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ?? false)),
      );
    }

    // Author filter
    if (authorFilter) {
      filtered = filtered.filter((book) => {
        const bookAuthor =
          typeof book.author === "string"
            ? book.author
            : (book.author as any)?.name || "";
        return bookAuthor === authorFilter;
      });
    }

    // Availability filter
    if (availabilityFilter === "available") {
      filtered = filtered.filter((book) => (book.availableCopies ?? 0) > 0);
    } else if (availabilityFilter === "unavailable") {
      filtered = filtered.filter((book) => (book.availableCopies ?? 0) <= 0);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return (a.title || "").localeCompare(b.title || "");
        case "author": {
          const authorA =
            typeof a.author === "string"
              ? a.author
              : (a.author as any)?.name || "";
          const authorB =
            typeof b.author === "string"
              ? b.author
              : (b.author as any)?.name || "";
          return authorA.localeCompare(authorB);
        }
        case "newest":
          return parseInt(b.id || "0") - parseInt(a.id || "0");
        case "oldest":
          return parseInt(a.id || "0") - parseInt(b.id || "0");
        default:
          return 0;
      }
    });

    return filtered;
  }, [books, searchTerm, authorFilter, availabilityFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage,
  );

  // Helper counts
  const availableBooksCount = books.filter(
    (b) => (b.availableCopies ?? 0) > 0,
  ).length;
  const unavailableBooksCount = books.filter(
    (b) => (b.availableCopies ?? 0) <= 0,
  ).length;

  // Actions
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setAuthorFilter("");
    setAvailabilityFilter("all");
    setSortBy("title");
    setCurrentPage(1);
  };

  return {
    // State
    books,
    loading,
    error,
    searchTerm,
    availabilityFilter,
    sortBy,
    authorFilter,
    currentPage,
    filteredBooks,
    paginatedBooks,
    totalPages,
    uniqueAuthors,
    availableBooksCount,
    unavailableBooksCount,

    // Actions
    setSearchTerm,
    setAvailabilityFilter,
    setSortBy,
    setAuthorFilter,
    handlePageChange,
    clearFilters,
  };
};
