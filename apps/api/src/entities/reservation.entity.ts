// api/src/entities/reservation.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity.js";
import { UserEntity } from "./user.entity.js";
import { BookEntity } from "./book.entity.js";

@Entity("reservations")
export class ReservationEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.reservations, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.reservations, { nullable: false })
  @JoinColumn({ name: "book_id" })
  book!: BookEntity;

  @Column("date")
  reservedAt!: Date;
}
