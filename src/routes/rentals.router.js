import { Router } from "express";
import { postRentals } from "../controllers/rentals.controllers.js";


const rentalsRouter = Router();

rentalsRouter.get("/rentals", async(req,res)=>{
    const listarentals = [];
    res.send(listarentals);
});

rentalsRouter.post("/rentals",  postRentals);



export default rentalsRouter;
