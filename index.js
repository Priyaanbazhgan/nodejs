const express = require('express')
const app = express()
const port = 8080

app.get('/getAllUsers', (req, res) => {
    var users = [{ name: "madhu", age: 20 }];
    var response = { status: "success", users }
    res.send(JSON.stringify(response));//data transfer b/w client& server is only a string.
    //That's why JSON.stringify is used.
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})