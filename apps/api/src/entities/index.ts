// api/src/entities/index.ts
import { AuthorEntity } from "./author.entity.js";
import { BookEntity } from "./book.entity.js";
import { CategoryEntity } from "./category.entity.js";

import { UserEntity } from "./user.entity.js";
import { LoanEntity } from "./loan.entity.js";
import { ReservationEntity } from "./reservation.entity.js";
import { PublisherEntity } from "./publisher-entity.js";

export const entities = [
  AuthorEntity,
  BookEntity,
  CategoryEntity,
  PublisherEntity,
  UserEntity,
  LoanEntity,
  ReservationEntity,
];
