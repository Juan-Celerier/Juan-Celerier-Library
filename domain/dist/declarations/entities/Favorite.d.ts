export interface Favorite {
    userId: string;
    bookId: string;
    createdAt: Date;
}
export type CreateFavoriteDTO = Omit<Favorite, "createdAt">;
export type UpdateFavoriteDTO = Partial<Omit<Favorite, "userId" | "bookId">>;
//# sourceMappingURL=Favorite.d.ts.map