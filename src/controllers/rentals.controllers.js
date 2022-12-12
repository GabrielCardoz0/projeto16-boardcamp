import connection from "../database.js";
import dayjs from "dayjs";


export async function postRentals (req,res){
    try{

        const {customerId, gameId, daysRented } = req.body;


        const gamesList = await connection.query("SELECT * FROM games;");
        const gamesIdList = gamesList.rows.map(g => g.id);
        

        const customersList = await connection.query("SELECT * FROM customers;");
        const customersIdList = customersList.rows.map(c => c.id);


        if(!gamesIdList.includes(gameId) || !customersIdList.includes(customerId) || daysRented <= 0) return res.sendStatus(400);


        const newRental = {
            rentDate:dayjs(Date.now()).format("YYYY-MM-DD"),
            price: daysRented * gamesList.rows[gameId-1].pricePerDay,
            returnDate:null,
            delayFee:null
        };

        await connection.query('INSERT INTO rentals ("customerId","gameId","daysRented","rentDate","originalPrice", "returnDate", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)', [customerId,gameId,daysRented,newRental.rentDate,newRental.price, newRental.returnDate, newRental.delayFee]);

        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    };
};