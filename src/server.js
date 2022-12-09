import express from "express";
import cors from "cors";
import connection from "./database.js"
import Joi from "joi";


const app = express();

app.use(express.json());
app.use(cors());


const nameSchema = Joi.object({
    name:Joi.string().required()
})





app.get("/categories" ,async (req,res) => {
    try{
        const categorysList = await connection.query("SELECT * FROM categories;");

        res.send(categorysList.rows);

    }catch(err){
    console.log(err);
    res.sendStatus(500);
    };
});

app.post("/categories", async (req,res) => {
    try{
        const {name} = req.body;

        if(name === "") return res.sendStatus(400);

        const categoriesList = await connection.query(`SELECT * FROM categories WHERE name = $1;`, [name]);

        if(categoriesList.rows.length > 0 ) return res.sendStatus(409);

        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [name]);

        res.sendStatus(201);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    };
});

// app.get("/games" , async (req,res) => {
//     try{
//         const gamesList = await connection.query("SELECT * FROM games;");

//         res.send(gamesList.rows);

//     }catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     };
// });

// app.post("/games" , async (req,res) => {
//     try{
//         const jogo = req.body;

//         res.send(jogo);

//         // const result = await connection.query("INSERT INTO games (jogo) VALUES ($1);", [jogo]);

//         // console.log(result.rows);

//     }catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     }; 
// });


// app.get("/customers?:cpf" , async(req,res) => {
//     try{
//         const { cpf } = req.query;

//         if(cpf) return res.send("tem cpf");

//         res.send("não tem cpf")
//         // const clientsList = await connection.query("SELECT * FROM customers;");

//         // res.send(clientsList.rows);

        

//     }catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     };
// });

app.listen(4000);



// try{
        
// }catch(err){
//     console.log(err);
//     res.sendStatus(500);
// };