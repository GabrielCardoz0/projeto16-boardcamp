import { Router } from "express";
import { customersGetCpf, customersGetId, customersPost, customersPut } from "../controllers/customers.constroller.js";


const customersRouter = Router();

customersRouter.get("/customers?:cpf", customersGetCpf);

customersRouter.get("/customers/:id", customersGetId);

customersRouter.post("/customers" , customersPost);

customersRouter.put("/customers/:id" , customersPut);

export default customersRouter;