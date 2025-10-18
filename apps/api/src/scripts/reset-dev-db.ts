import { AppDataSource } from "../config/data.js";

async function resetDevDB() {
  await AppDataSource.initialize();
  console.log("⚠️ Dropeando base de datos de desarrollo...");
  await AppDataSource.dropDatabase();
  console.log("✅ Base de datos dropeada");
  await AppDataSource.synchronize();
  console.log("✅ Base de datos recreada");
  await AppDataSource.destroy();
}

resetDevDB().catch((err) => {
  console.error(err);
  process.exit(1);
});
