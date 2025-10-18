// api/src/entities/author.entity.ts
import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity.js";
import { BookEntity } from "./book.entity.js";

@Entity("authors")
export class AuthorEntity extends BaseEntity {
  @Column("varchar", { length: 255 })
  firstName!: string;

  @Column("varchar", { length: 255 })
  lastName!: string;

  @Column("varchar", { length: 320, nullable: true })
  email?: string | null;

  @Column("varchar", { length: 20, nullable: true })
  phoneNumber?: string | null;

  @Column("text")
  biography!: string;

  @Column("varchar", { length: 100 })
  nationality!: string;

  @Column("date")
  birthDate!: Date;

  @Column("date", { nullable: true })
  deathDate?: Date | null;

  @Column("boolean", { default: false })
  isPopular!: boolean;

  @OneToMany(() => BookEntity, (book) => book.author)
  books!: BookEntity[];
}
