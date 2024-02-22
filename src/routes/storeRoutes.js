import { Router } from "express";
import {
  storeHomeAll,
  createStore,
  updataStore,
  getStorePorId,
  deleteStore,
} from "../controllers/StoreController.js";

// ?IMPORTAMOS ROUTER DE EXPRESS Y YA NO SE MAPEA LAS RUTAS CON APP

const router = Router();
router.get("/store/home", storeHomeAll);
router.get("/store/home/get/:id", getStorePorId);
router.post("/store/create", createStore);

//TODO SI SE ACTUALIZA TODO EL CUERPO ES MEJOR UTILZIAR PUT PERO SI SOLO SE QUIERE ACTUALIZAR 1 O 2 CAMPOS ES MEJOR PATCH
router.put("/store/edit/:id", updataStore);
router.delete("/store/delete/:id", deleteStore);

export default router;
