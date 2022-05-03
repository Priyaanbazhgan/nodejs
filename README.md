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
12)open console in curren browser & run below fetch method
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