var mongoose = require("mongoose");
var employeeSchema = new mongoose.Schema({
    Team: String,
    Name: String,
    inOffice: Boolean
})
module.exports = mongoose.model("employee",employeeSchema);