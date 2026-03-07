import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Relation,
} from "typeorm";

import { BookEntity } from "./book.entity.js";
import { UserEntity } from "./user.entity.js";

@Entity("favorites")
export class FavoriteEntity {
  @PrimaryColumn({ name: "user_id", type: "varchar", length: 36 })
  userId!: string;

  @PrimaryColumn({ name: "book_id", type: "varchar", length: 36 })
  bookId!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @ManyToOne(() => UserEntity, (user) => user.favorites)
  @JoinColumn({ name: "user_id" })
  user!: Relation<UserEntity>;

  @ManyToOne(() => BookEntity, (book) => book.favorites)
  @JoinColumn({ name: "book_id" })
  book!: Relation<BookEntity>;
}
