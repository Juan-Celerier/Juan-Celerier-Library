import { describe, it, expect, vi } from "vitest";
import { booksLoader } from "./index";
import { apiClient } from "../../utils/api-client";

describe("booksLoader", () => {
  it("returns books when apiClient resolves", async () => {
    const mock = [
      { id: "1", title: "Book 1", author: "Author 1", availableCopies: 1 },
    ];

    const spy = vi.spyOn(apiClient, "call").mockResolvedValue(mock as any);

    const res = await booksLoader();
    expect(res).toEqual({ books: mock });

    spy.mockRestore();
  });
});
