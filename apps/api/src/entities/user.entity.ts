import { Entity, Column, OneToMany, Relation } from "typeorm";
import { BaseEntity } from "./base.entity.js";
import { LoanEntity } from "./loan.entity.js";
import { FavoriteEntity } from "./favorite.entity.js";
import { ReservationEntity } from "./reservation.entity.js";

@Entity("users")
export class UserEntity extends BaseEntity {
  @Column("varchar", { length: 255 })
  name!: string;

  @Column("varchar", { length: 320, unique: true })
  email!: string;

  @Column("varchar", { length: 255 })
  hashedPassword!: string;

  @Column("varchar", { length: 20, default: "BORROWER" })
  role!: "BORROWER" | "LIBRARIAN";

  @OneToMany(() => LoanEntity, (loan) => loan.user)
  loans!: Relation<LoanEntity[]>;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.user)
  reservations!: Relation<ReservationEntity[]>;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorites!: Relation<FavoriteEntity[]>;
}
