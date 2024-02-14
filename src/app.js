import express from "express";
import cors from "cors";
import stroreRoutes from "./routes/storeRoutes.js";

const app = express();

// TODO: TENEMOS QUE PARSEAR LOS DATOS A JSON
app.use(express.json());
app.use(cors());

// TODO: IMPORTAMOS LAS RUTAS Y ADEMAS PONERMOS UN RUTA INICIAL
app.use("/modamarket", stroreRoutes);

app.use((req, res, next) => {
  res.status(400).json({ message: "Error de ruta" });
});

export default app;
