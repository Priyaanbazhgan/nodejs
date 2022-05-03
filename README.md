# nodejs
1) create a repo for node
2) clone repo & change config file tokens

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
8)run->npm start (or) node index<br>
9)open->browser->run->http://localhost:8080/        <br><br>
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
<br><br>Note:
```
Data transfer between ui and server is "string". 

REQEST FROM -> UI -> Server 
              (body-parser in server -> convert string to actual Object -> from string passed by UI)

RESPONSE FROM -> Server -> UI
             (res.json() in fetch -> convert string to actual Object -> from string passed by server)
```
  
Let see body-parser in detail below:
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
