import { Router } from "express";
import categoriesRouter from "./cateogories.routes.js";
import customersRouter from "./customers.router.js";
import gamesRouter from "./games.router.js";

const router = Router();

router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRouter);

export default router;