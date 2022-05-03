# nodejs
1) create a repo for node
2) clone repo & change config file tokens

#  NPM & Express setup
3) open->cmd-> run-> npm init (it will generate package.json)
4) create index.js file
5) inside the index.js insert a code
```
       const express = require('express')
       const app = express()
       const port = 8080

       app.get('/', (req, res) => {
       res.send('Hello World!')
       })

       app.listen(port, () => {
       console.log(`Example app listening on port ${port}`)
       })
```
src:https://expressjs.com/en/starter/hello-world.html <br>
6) run->npm i express <br>
7)go to package.json & add "start":"node index" in script block
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"node index"
  }
```
8)run->npm start (or) node index & observe the changes in cmd console
```
Example app listening on port 8080

```

9)open->browser->run->http://localhost:8080/        <br><br>

 # GET method setup
10)change get method in index.js as below
```
app.get('/getAllUsers', (req, res) => {
    var users = [{ name: "madhu", age: 20 }];
    var response = { status: "success", users }
    res.send(JSON.stringify(response));//data transfer b/w client& server is only a string.
    //That's why JSON.stringify is used.
})
```
11)open->browser->run->http://localhost:8080/getAllUsers        <br><br>
12)open console in current browser & run below fetch method
```
fetch('http://localhost:8080/getAllUsers')
.then((res)=> res.json())
.then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err)   
});
```
13)observe the console log
```
{"status":"success","users":[{"name":"madhu","age":20}]}
```
<br><br>
# Let To Know 
Note:
```
Data transfer between ui and server is "string". 

REQEST FROM -> UI -> Server 
              (body-parser in server -> convert string to actual Object -> from string passed by UI)

RESPONSE FROM -> Server -> UI
             (res.json() in fetch -> convert string to actual Object -> from string passed by server)
```
  
Let see body-parser in detail below:

# POST method setup
14)create post method as below
```
app.post('/addUser', (req, res) => {
    var response = { status: "success", users: req.body, message: "user insert success" }
    res.send(JSON.stringify(response));//data transfer b/w client& server is only a string.
    //That's why JSON.stringify is used.
})
```

15)run->npm i body-parser <br>
16)go to index.js & add require changes for body-parser
 ```
 const bodyParser = require('body-parser')
 ... 
 ...
 // parse content-type : application/json from request header
 // it helps to convert string from UI request body to actual object
 app.use(bodyParser.json())
 ```
 <br>

 17)open browser & run the console as below
 ```
 fetch("http://localhost:8080/addUser", { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",//to helps body-parser package to convert--> json stringfyied object in body again to actual object (using parse) 
  },
  body: JSON.stringify({ name: "priya", age: 20 }), // pass user data
})
  .then((res) => res.json()) // it helps to convert string from server response to actual object
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
  ```
  18)observe the output as below
  ```
  {"status":"success","users":{"name":"priya","age":20},"message":"user insert success"}
  ```

<br><br>
 # MongoDB Cluster Creation
 <br>
 1)create cluster using below link
 <br>
 https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/<br>

 
 2)at the last you get mongoDB connection URI like below
 
 ```
 mongodb+srv://madhu:<password>@cluster0.ybquw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

 ```
 =>replace actual password & your database name (or) you can use the same "myFirstDatabase" from the URI

# MongoDB setup

1)run->npm i mongoose <br>
2) create dbconnection.js file & add code below 
```
const mongoose = require('mongoose');

function connectdb() {
    // Database connection
    mongoose.connect('mongodb+srv://madhu:findme123@cluster0.ybquw.mongodb.net/kncet?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (!err) {
            console.log("mongodb connection succesful")
        }
        else {
            console.log("mongodb connection failed", err)
        }
    });
}

module.exports = connectdb
```
=>replace connection string & database name accordingly (here kncet is my DB name) <br>
src:https://www.geeksforgeeks.org/mongoose-find-function/#:~:text=The%20find()%20function%20is,limit%2C%20skip%2C%20etc

3)add required changes in index.js as below
```
const dbconnection=require('./dbconnection')
...
...
//initializing db connectivity
dbconnection();

```
4)restart node service & observe the below changes in cmd console
```
Example app listening on port 8080
mongodb connection succesful

```

# MongoDB Table (or) Model creation

1)create folder->model <br>
2)create file->student.js inside the folder model <br>
3)add changes in student.js  as below
```
const mongoose = require('mongoose');

// Creating table / modal
// "Student"->table name
// {name,age,...}-> column name/schema
const Student = mongoose.model('Student', {
    name: { type: String },
    age: { type: Number },
    college: { type: String },
    place: { type: String },
    CGPA: { type: Number }
});

module.exports = Student

```

# CURD operation 
1)create folder->service<br>
2)create file->studentservice.js in folder service<br>
## Create record / insert record in DB

1)Add require changes in studentservice.js as below
```
const StudentTable = require('../model/student')

function addStudent(param) {
    const { name, age, college, place, CGPA } = param;//object destruction
    // Insert in db
    const insertObj = { name, age, college, place, CGPA };//object creation
    const insertInstance = new StudentTable(insertObj);
    return insertInstance.save();
}

module.exports = { addStudent }

```
2)add post method for inserting student record in index.js
```
const studentservice = require('./service/studentservice')
...
...
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

```
3)open browser console & try fetch method
```
fetch("http://localhost:8080/kncet/addStudent", { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",//to helps body-parser package to convert--> json stringfyied object in body again to actual object (using parse) 
  },
  body: JSON.stringify({ name:'madhu', age:20, college:"kncet", place:"Kulithalai", CGPA:8.67  }), // pass user data
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

  ```
4)observe the output in console
```
{"status":"success","message":"Student insert Success"}

```
5)Check in your MongoDB cluster ,
click->browse collection->inside student table(  //img )

## Read records from DB

1)Do require changes in studentservice.js
```
function getAllStudents() {
    // select in db
    return StudentTable.find({});
}

module.exports = { addStudent, getAllStudents }

```

2)add get method for fetch students in index.js
```
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

```
3)In browser console try fetch
```
fetch('http://localhost:8080/kncet/getAllStudents')
.then((res)=> res.json())
.then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err)   
});

```

4)Observe the result in browser console
```
{"status":"success","list":[{"_id":"627141643aefe5b25809b8ca","name":"madhu","age":20,"college":"kncet","place":"Kulithalai","CGPA":8.67,"__v":0}]}

```





