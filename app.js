var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Employee = require("./Associations/models/employee.js"),
    controller = require("./controller.js");

var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
//DB connectivity
mongoose.connect("mongodb://localhost/employeeDB");

// var employeeSchema = new mongoose.Schema({
//     name: String,
//     team: String,
//     inOffice: Boolean
// })
// var Employees =  mongoose.model("Employees",employeeSchema);
// Employees.create({
//     name: "Vinay Reddy",
//     team:"ASI QA",
//     inOffice:false
// },function(err,employee){
//     if(err){
//         console.log("Database connectivity issue!!!");
//     }else{
//         console.log("Employee database updated!!!");
//         console.log(employee);
//     }
// })
//Routes
app.get("/",function(req,res){
    //res.send("You are on the main page!!!");
    Employee.find({},function(err,employees){
        if(err){
            console.log("unable to retrive data from database!!!");
        }else{
            console.log("Database data fetch is succesful!");
            res.render("myspace",{employees:employees});
            console.log(employees);
        }
    })
    //res.render("myspace",{employees: employees});
})
var people =['Jaime', 'Jon' ,'Dany', 'Cersi', 'Arya'];
app.get("/people",function(req,res){
    res.render("home",{people:people});
})

app.get("/:user",function(req,res){
    var userName = req.params.user;
   res.send(userName+" is the user of this website!!!");
   //res.render("home",{user: userName, people: people});
})


//POST Routes
app.post("/people",function(req,res){
    var person = req.body.person;
    people.push(person);
    res.redirect("/people");
})


////////////////////////////////////////////////////////////////////////////////
//ajax routes
//get route
app.get("/ajax/get/:userInput",function(req,res){
    controller.findEmployee(req,res);
    console.log("ajax get route is hit!!!");
});

//Starting a node server
app.listen(3000,function(){
    console.log("Server has been started!!!");
})
