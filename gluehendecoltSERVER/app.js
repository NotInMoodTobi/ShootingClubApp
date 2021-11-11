const express = require('express');
const { get } = require('request');
const request = require('request');
const parser = require('body-parser');
const cors = require('cors');


const usersController = require('./src/database/users');
const users = require('./src/database/users');
const { resourceLimits } = require('worker_threads');


/**
 * 
 * @typedef {import('./src/database/users').User} User;
 */


const app = express();
const port = 5000;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

app.get("/getNames", (req, res) => {
    usersController.getUsers().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.trace('error', err);
        res.status(500).json(err);
    });
});

app.get("/getUserById/:id", (req, res) => {
    usersController.getUserById(req.params.id).then((result) => {
        console.log('create result', result);
        if (!result) {
            res.status(404).send();
            return;
        }
        res.status(200).json(result);
    }).catch((err) => {
        console.log('error', err)
        res.status(500).json(err);
    })
});

app.post('/addUser', (req, res) => {
    usersController.addUser(req.body).then((result) => {
        console.log('create result', result);
        res.status(200).send();
    }).catch((err) => {
        console.log('error', err)
        res.status(500).json(err);
    })
});

app.put('/editUser/:id', (req, res) => {
    usersController.editUser(req.params.id, req.body).then((result) => {
        res.status(200).send();
    }).catch((err) => {
        console.log('error', err)
        res.status(500).json(err);
    })
});


app.delete('/deleteUser/:id', (req, res) => {
    usersController.deleteUser(req.params.id).then((result) => {
        res.status(200).send();
    }).catch((err) => {
        console.log('error', err)
        res.status(500).json(err);
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));