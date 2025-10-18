import { AppDataSource } from "../config/data.js";

async function setupDevDB() {
  await AppDataSource.initialize();
  console.log("⚙️ Ejecutando migraciones...");
  await AppDataSource.runMigrations();
  console.log("✅ Migraciones aplicadas");
  await AppDataSource.destroy();
}

setupDevDB().catch((err) => {
  console.error(err);
  process.exit(1);
});
