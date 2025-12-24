// api/src/entities/user.entity.ts
import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity.js";
import { LoanEntity } from "./loan.entity.js";
import { ReservationEntity } from "./reservation.entity.js";

@Entity("users")
export class UserEntity extends BaseEntity {
  @Column("varchar", { length: 255 })
  name!: string;

  @Column("varchar", { length: 320, unique: true })
  email!: string;

  @Column("varchar", { length: 255 })
  hashedPassword!: string;

  @Column("varchar", { length: 20, default: "user" })
  role!: "user" | "admin";

  @OneToMany(() => LoanEntity, (loan) => loan.user)
  loans!: LoanEntity[];

  @OneToMany(() => ReservationEntity, (reservation) => reservation.user)
  reservations!: ReservationEntity[];
}
