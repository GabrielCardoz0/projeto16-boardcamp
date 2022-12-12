import Router from "express";
import { getCategoriesController, postCategoriesController } from "../controllers/categories.controller.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategoriesController);

categoriesRouter.post("/categories", postCategoriesController);

export default categoriesRouter;
