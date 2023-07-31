const express = require('express');
const koalaRouter = express.Router();
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
    res.send(koalaList);
});



// POST
koalaRouter.post('/koalas', (req, res) => {
    console.log('Post request made');
    let newKoala = req.body;
    koalaList.push(new Koala(
        newKoala.koalaName, 
        newKoala.sex, newKoala.age, 
        newKoala.readyToTransfer, 
        newKoala.notes));
    console.log(newKoala);
    res.send(koalaList);
});

// PUT
koalaRouter.put('/transfer/:index', (req, res) => {
    console.log('Put request made for updating transfer status');
    let index = req.params.index;
    console.log('Index', index);
    koalaList[index].readyToTransfer = true;
    res.sendStatus(201);
});

// DELETE
koalaRouter.delete('/koalas/:index' , (req, res) => {
    console.log('Delete request!', req.body);
    let index = req.params.index
    index = Number(index);
    koalaList[index].markedForDeletion = true;
    koalaList = koalaList.filter((obj) => !obj.markedForDeletion);
    console.log(index);
    // koalaList.splice(index, index)
    
    res.sendStatus(201);
})

koalaList.push(new Koala('Scotty', 'M', 4, true, 'Born in Guatemala'));
koalaList.push(new Koala('Jean', 'F', 5, true, 'Allergic to lots of lava'));
koalaList.push(new Koala('Ororo', 'F', 7, false, 'Loves listening tp Paula (Adul)'));
koalaList.push(new Koala('Logan', 'M', 15, false, 'Loves the sauna'));
koalaList.push(new Koala('Charlie', 'M', 9, true, 'Favorite band is Nirvana'));
koalaList.push(new Koala('Betsy', 'F', 4, true, 'Has a pet iguana'));
console.log(koalaList);
module.exports = koalaRouter;