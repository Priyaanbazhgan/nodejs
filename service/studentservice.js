const StudentTable = require('../model/student')

function addStudent(param) {
    const { name, age, college, place, CGPA } = param;//object destruction
    // Insert in db
    const insertObj = { name, age, college, place, CGPA };//object creation
    const insertInstance = new StudentTable(insertObj);
    return insertInstance.save();
}

function getAllStudents() {
    // select in db
    return StudentTable.find({});//{age:20}-> it will filter all records which contain age 20
}

module.exports = { addStudent, getAllStudents }