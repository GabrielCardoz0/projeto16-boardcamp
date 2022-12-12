import connection from "../database.js";

export async function getGamesController(req,res) {
    try{
        const gamesList = await connection.query('SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id ;');

        const {name} = req.query;

        if(name){
            const gamesListFilterted = await connection.query(`
            SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id  WHERE games.name LIKE '%${name}%';`);

            return res.send(gamesListFilterted.rows);
        };

        res.send(gamesList.rows);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    };
};

export async function postGamesController(req,res){
    try{
        const {name,image,stockTotal,categoryId,pricePerDay} = req.body;

        await connection.query('INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1, $2, $3, $4, $5);', [name,image,stockTotal,categoryId,pricePerDay]);

        res.sendStatus(201);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }; 
};
