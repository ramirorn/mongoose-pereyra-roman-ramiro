// Importaciones
import express from "express";
import "dotenv/config";
import { connectDB } from "./src/config/database.js";
import { routes } from "./src/routes/index.js";

// Configuraciones
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
//Rutas
app.use("/api", routes);

//Conexion a la base de datos
app.listen(PORT, async () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  await connectDB();
});
