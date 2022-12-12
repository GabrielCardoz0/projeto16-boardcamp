import { Router } from "express";
import { getGamesController, postGamesController } from "../controllers/games.controller.js";

const gamesRouter = Router();

gamesRouter.get("/games?:name" , getGamesController);

gamesRouter.post("/games" , postGamesController );

export default gamesRouter;