const express = require('express')
const bodyParser = require('body-parser')
const dbconnection = require('./dbconnection')
const studentservice = require('./service/studentservice')
const app = express()
const port = 8080

//initializing db connectivity
dbconnection();

// parse content-type : application/json from request header
// it helps to convert string from UI request body to actual object
app.use(bodyParser.json())

app.get('/getAllUsers', (req, res) => {
    var users = [{ name: "madhu", age: 20 }];
    var response = { status: "success", users }
    res.send(JSON.stringify(response));//data transfer b/w client& server is only a string.
    //That's why JSON.stringify is used.
})

app.post('/addUser', (req, res) => {
    var response = { status: "success", users: req.body, message: "user insert success" }
    res.send(JSON.stringify(response));//data transfer b/w client& server is only a string.
    //That's why JSON.stringify is used.
})

app.post('/kncet/addStudent', (req, res) => {
    studentservice.addStudent(req.body)
        .then(() => {
            res.send(JSON.stringify({ status: "success", message: "Student insert Success" }));
        })
        .catch((err) => {
            console.log(err);
            res.send(JSON.stringify({ status: "Failed to insert Student" }));
        });
})

app.get('/kncet/getAllStudents', (req, res) => {
    studentservice.getAllStudents()
        .then((list) => {
            res.send(JSON.stringify({ status: "success", list }));
        })
        .catch((err) => {
            console.log(err);
            res.send(JSON.stringify({ status: "Failed to fetch Students" }));
        });
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})