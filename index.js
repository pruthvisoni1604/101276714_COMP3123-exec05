const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');

router.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home.html')
});

router.get('/profile', (req, res) => {
    fs.readFile(__dirname + '/user.json', 'utf-8', (error, data) => {
        res.send(data)
    })
});

router.get('/login', (req, res) => {
    fs.readFile(__dirname + '/user.json', 'utf-8', (error, data) => {
        let user = JSON.parse(data.toString());
        let username = req.query.username;
        let password = req.query.password;

        let answer = {
            message: "You did not enter a query params"
        }

        if (username === user.username && password === user.password) {
            answer = {
                status: true,
                message: "User Is valid"
            }
        } else if (username != user.username) {
            answer = {
                status: false,
                message: "User Name is invalid"
            }
        } else if (password != user.password) {
            answer = {
                status: false,
                message: "Password is invalid"
            }
        }
        res.send(answer);
    })
});


router.get('/logout/:username', (req, res) => {
    let username = req.params.username;
    res.send(`<b>${username} successfully logout.<b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port ' + (process.env.port || 8081));