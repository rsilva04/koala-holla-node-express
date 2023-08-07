const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg'); 

const pool = new pg.Pool({
    database: 'koala_holla',
    host: 'localhost',
    port: 5432
})

let koalaList = [];

class Koala {
    constructor(koalaName, sex, age, transfer, notes) {
        this.koalaName = koalaName;
        this.sex = sex;
        this.age = age;
        this.readyToTransfer = transfer;
        this.notes = notes;
        this.markedForDeletion = false;
    }
    updateTransferStatus(changeTransfer) {
        this.readyToTransfer = this.changeTransfer;
    }
}


// DB CONNECTION


// GET('/')
koalaRouter.get('/koalasList', (req, res) => {
    console.log('Get koalas request made');
    let queryText = 'SELECT * FROM koalas;'
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error making query ${queryText}`, error);
        res.sendStatus(500);
    })
    
});



// POST
koalaRouter.post('/koalas', (req, res) => {
    console.log('Post request made');
    let queryText = `INSERT INTO "koalas" ("koalaName", "age", "sex", "notes")
    VALUES ($1, $2, $3, $4);`;
    let newKoala = req.body;
    pool.query(queryText, [newKoala.koalaName, newKoala.age, newKoala.sex, newKoala.notes])
    .then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error making query ${queryText}`, error);
    })



    koalaList.push(new Koala(
        newKoala.koalaName, 
        newKoala.sex, newKoala.age, 
        newKoala.readyToTransfer, 
        newKoala.notes));
    console.log(newKoala);
    res.send(koalaList);
});

// PUT
koalaRouter.put('/transfer/:id', (req, res) => {
    console.log('Put request made for updating transfer status');
    let id = req.params.id;
    let queryText = `UPDATE "koalas" SET "readyToTransfer" = true WHERE "id" = $1;`;
    pool.query(queryText, [id])
    .then((response) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error making query ${queryText}`, error);
    })
    
    res.sendStatus(201);
});

// DELETE
koalaRouter.delete('/koalas/:id' , (req, res) => {
    console.log('Delete request!', req.params.id);
    let id = req.params.id
    let queryText = `DELETE FROM "koalas" WHERE "id" = $1;`;
    pool.query(queryText, [id])
    .then((response) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error making query ${queryText}`, error);
    })
})

module.exports = koalaRouter;