export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  createdAt: Date;
}
export type CreateCategoryDTO = Omit<Category, "id" | "createdAt">;
