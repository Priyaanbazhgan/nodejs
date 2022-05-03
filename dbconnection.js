const mongoose = require('mongoose');

function connectdb() {
    // Database connection
    mongoose.connect('mongodb+srv://madhu:jpma1013..@cluster0.ybquw.mongodb.net/kncet?retryWrites=true&w=majority', {
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