import express from "express";
import cors from "cors";
import router from "./routes/router.js";


const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(4000);

// app.get("/rentals", async(req,res) => {
//     try{
//         res.send("OI")
//     }catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     };    
// });
