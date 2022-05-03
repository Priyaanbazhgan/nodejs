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