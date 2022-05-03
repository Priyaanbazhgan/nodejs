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
6) run->npm i express 
7)go to package.json & add "start":"node index" in script block
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"node index"
  }
```
8)run->npm start (or) node index
9)open->browser->run->http://localhost:8080/