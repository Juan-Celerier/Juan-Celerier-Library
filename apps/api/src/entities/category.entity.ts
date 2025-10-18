// api/src/entities/category.entity.ts
import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity.js";
import { BookEntity } from "./book.entity.js";

@Entity("categories")
export class CategoryEntity extends BaseEntity {
  @Column("varchar", { length: 255 })
  name!: string;

  @OneToMany(() => BookEntity, (book) => book.category)
  books!: BookEntity[];
}
