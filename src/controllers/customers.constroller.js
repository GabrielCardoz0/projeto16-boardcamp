import clientSchema from "../models/schemas.js";
import connection from "../database.js";

export async function customersGetCpf(req,res) {
    try{
            const { cpf } = req.query;

            if(cpf){
                const clientsList = await connection.query(`SELECT * FROM customers WHERE cpf LIKE '%${cpf}%';`);
                return res.send(clientsList.rows);
            };

            const clientsList = await connection.query("SELECT * FROM customers;");
            res.send(clientsList.rows);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    };
};

export async function customersGetId(req,res){
    try{
            const { id } = req.params;

            const clientsList = await connection.query(`SELECT * FROM customers WHERE id = ${id}`);

            if(clientsList.rows.length === 0) return res.sendStatus(404);

            res.send(clientsList.rows);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    };
};

export async function customersPost(req,res){
    try{
        const new_client = req.body;

        const {name,phone,cpf,birthday} = req.body;


        const validation = clientSchema.validate(new_client, {abortEarly:false});

        if(validation.error) {
            const errorsList = validation.error.details.map(d => d.message);
            return res.status(422).send(errorsList);
        };

        const clientsList = await connection.query("SELECT * FROM customers;");

        const cpfList = clientsList.rows.map(c => c.cpf);

        if(cpfList.includes(cpf)) return res.sendStatus(409);

        //veriricar a data enviada!!!!!!!!!!!!!!!
        //
        //

        await connection.query("INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1, $2, $3, $4)", [name,phone,cpf,birthday]);

        res.sendStatus(201);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    };
};

export async function customersPut(req,res){
    try{
      const {name, phone, cpf, birthday} = req.body;
      const {id} = req.params

      const validation = clientSchema.validate(req.body, {abortEarly:false});

        if(validation.error) {
            const errorsList = validation.error.details.map(d => d.message);
            return res.status(422).send(errorsList);
        };

        await connection.query(`UPDATE customers SET name='${name}', phone='${phone}', cpf='${cpf}', birthday='${birthday}' WHERE id =${id};`);
      
      res.sendStatus(200); 
      
      
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    };    
};
