import { AppDataSource } from "../config/data.js";
import { AuthorEntity } from "../entities/author.entity.js";
import { BookEntity } from "../entities/book.entity.js";
import { CategoryEntity } from "../entities/category.entity.js";
import { LoanEntity } from "../entities/loan.entity.js";
import { PublisherEntity } from "../entities/publisher-entity.js";
import { ReservationEntity } from "../entities/reservation.entity.js";
import { UserEntity } from "../entities/user.entity.js";

async function debugDB() {
  await AppDataSource.initialize();

  const repos = {
    Users: AppDataSource.getRepository(UserEntity),
    Books: AppDataSource.getRepository(BookEntity),
    Authors: AppDataSource.getRepository(AuthorEntity),
    Categories: AppDataSource.getRepository(CategoryEntity),
    Publishers: AppDataSource.getRepository(PublisherEntity),
    Loans: AppDataSource.getRepository(LoanEntity),
    Reservations: AppDataSource.getRepository(ReservationEntity),
  };

  for (const [name, repo] of Object.entries(repos)) {
    const count = await repo.count();
    console.log(`${name}: ${count}`);
  }

  await AppDataSource.destroy();
}

debugDB().catch((err) => {
  console.error(err);
  process.exit(1);
});
