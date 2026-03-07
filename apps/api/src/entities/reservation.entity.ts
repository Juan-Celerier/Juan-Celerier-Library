import { Entity, Column, ManyToOne, JoinColumn, Relation } from "typeorm";
import { BaseEntity } from "./base.entity.js";
import { UserEntity } from "./user.entity.js";
import { BookEntity } from "./book.entity.js";

@Entity("reservations")
export class ReservationEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.reservations, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: Relation<UserEntity>;

  @ManyToOne(() => BookEntity, (book) => book.reservations, { nullable: false })
  @JoinColumn({ name: "book_id" })
  book!: Relation<BookEntity>;

  @Column("date")
  reservedAt!: Date;
}
