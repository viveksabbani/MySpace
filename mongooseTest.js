var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/testDB",{useNewUrlParser: true});
var gotSchema = new mongoose.Schema({
    name: String,
    House: String
});

var Got = mongoose.model("got",gotSchema);

// Got.create({
//     name: "Theon-Freak",
//     House: "Greyjoy"
// }, function(err,person){
//     if(err){
//         console.log("Database connectivity issue!!!");
//     }else{
//         console.log("Data added to the database.")
//         console.log(person);
//     }
// })

Got.find({name:/-/},function(err,people){
    if(err){
        console.log("Database connectivity issue!!!");
    }else{
        console.log("Required data is fetched from the database");
        console.log(people);
    }
})