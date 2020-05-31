var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Employee = require("./Associations/models/employee.js"),
    Seat = require("./Associations/models/seat"),
    controller = require("./controller.js");

var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
//DB connectivity
mongoose.connect("mongodb://localhost/employeeDB");

// Employees.create({
//     name: "Vinay Reddy",
//     team:"ASI QA",
//     inOffice:false
// });

// for(var i=0;i<4;i++){
//     Seat.create({
//         seat : `S${i+5}`,
//         division: "Hospitality",
//         team: "Venues"
//     })
// }

//Routes
//GET
app.get("/",function(req,res){
   Seat.find({},function(err,seats){
        if(err){
            res.send(err);
        }else{
            res.render("myspace",{seats:seats});
        }
   })
})

//POST


////////////////////////////////////////////////////////////////////////////////
//ajax routes

//GET
app.get("/ajax/get/:userInput",function(req,res){
    controller.findEmployee(req,res);
});

app.get("/ajax/seat/team/:teamName",function(req,res){
    controller.findTeamSeat(req,res);
})
app.get("/ajax/seat/:seatNum",function(req,res){
    controller.findSeat(req,res);
})
app.get("/*",function(req,res){
    res.redirect("/");
})

//POST
app.post("/ajax/seat/reserve",function(req,res){
    controller.bookSeat(req,res);
})

app.post("/ajax/seat/cancel",function(req,res){
    controller.cancelSeat(req,res);
})

//Starting a node server
app.listen(3000,function(){
    console.log("Server has been started!!!");
})
