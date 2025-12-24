// api/src/entities/book.entity.ts
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity.js";
import { AuthorEntity } from "./author.entity.js";
import { CategoryEntity } from "./category.entity.js";
import { LoanEntity } from "./loan.entity.js";
import { ReservationEntity } from "./reservation.entity.js";
import { PublisherEntity } from "./publisher-entity.js";

@Entity("books")
export class BookEntity extends BaseEntity {
  @Column("varchar", { length: 255 })
  title!: string;

  @ManyToOne(() => AuthorEntity, (author) => author.books, { nullable: false })
  @JoinColumn({ name: "author_id" })
  author!: AuthorEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.books, {
    nullable: true,
  })
  @JoinColumn({ name: "category_id" })
  category?: CategoryEntity | null;

  @ManyToOne(() => PublisherEntity, (publisher) => publisher.books, {
    nullable: true,
  })
  @JoinColumn({ name: "publisher_id" })
  publisher?: PublisherEntity | null;

  @OneToMany(() => LoanEntity, (loan) => loan.book)
  loans!: LoanEntity[];

  @OneToMany(() => ReservationEntity, (reservation) => reservation.book)
  reservations!: ReservationEntity[];

  @Column("varchar", { length: 500, nullable: true })
  image?: string;

  @Column("int", { default: 0 })
  totalCopies!: number;

  @Column("int", { default: 0 })
  availableCopies!: number;

  @Column("varchar", { length: 13, nullable: true })
  isbn?: string;

  @Column("date", { nullable: true })
  publicationDate?: Date;

  @Column("text", { nullable: true })
  description?: string;
}
