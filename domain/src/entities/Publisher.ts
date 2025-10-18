export interface Publisher {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  image?: string;
  createdAt: Date;
}
export type CreatePublisherDTO = Omit<Publisher, "id" | "createdAt">;
