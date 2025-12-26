import { AppDataSource } from "../config/data.js";
import { CategoryEntity } from "../entities/category.entity.js";
import { UserEntity } from "../entities/user.entity.js";

async function seedProdDB() {
  const ds = await AppDataSource.initialize();
  const categoryRepo = ds.getRepository(CategoryEntity);
  const userRepo = ds.getRepository(UserEntity);

  // Crear categoría
  await categoryRepo.save(categoryRepo.create({ name: "General" }));

  // Crear usuario admin
  await userRepo.save(
    userRepo.create({
      name: "Admin",
      email: "admin@library.com",
      hashedPassword: "$2b$12$dummy.hash.for.production", // Hash dummy para producción
      role: "LIBRARIAN",
    })
  );

  console.log("✅ Seed de producción completado");
  await ds.destroy();
}

seedProdDB().catch((err) => {
  console.error(err);
  process.exit(1);
});
