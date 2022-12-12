import connection from "../database.js";

export async function getCategoriesController(req,res) {
        try{
            const categorysList = await connection.query("SELECT * FROM categories;");
    
            res.send(categorysList.rows);
    
        }catch(err){
        console.log(err);
        res.sendStatus(500);
        };
};

export async function postCategoriesController(req,res){
    try{
        const {name} = req.body;

        if(name === "") return res.sendStatus(400);

        const categoriesList = await connection.query(`SELECT * FROM categories WHERE name = $1;`, [name]);

        if(categoriesList.rows.length > 0 ) return res.sendStatus(409);

        await connection.query("INSERT INTO categories (name) VALUES ($1)", [name]);

        res.sendStatus(201);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    };
};
