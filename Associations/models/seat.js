var mongoose = require("mongoose");
var seatSchema = new mongoose.Schema({
    seat: String,
    division: String,
    team: String,
    employee_name:String
});
module.exports = mongoose.model("seat",seatSchema);