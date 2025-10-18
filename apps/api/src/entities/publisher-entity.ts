// api/src/entities/publisher.entity.ts
import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity.js";
import { BookEntity } from "./book.entity.js";

@Entity("publishers")
export class PublisherEntity extends BaseEntity {
  @Column("varchar", { length: 255 })
  name!: string;

  @OneToMany(() => BookEntity, (book) => book.publisher)
  books!: BookEntity[];
}
