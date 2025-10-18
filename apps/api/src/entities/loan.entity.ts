// api/src/entities/loan.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity.js";
import { UserEntity } from "./user.entity.js";
import { BookEntity } from "./book.entity.js";

@Entity("loans")
export class LoanEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.loans, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.loans, { nullable: false })
  @JoinColumn({ name: "book_id" })
  book!: BookEntity;

  @Column("date")
  loanDate!: Date;

  @Column("date", { nullable: true })
  returnDate?: Date | null;
}
