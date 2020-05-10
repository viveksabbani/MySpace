var mongoose = require("mongoose"),
    Employee = require("../../Associations/models/employee.js");

mongoose.connect("mongodb://localhost/employeeDB", {
    useNewUrlParser: true
});


function findEmployee(userInput) {
    Console.log("findEmployee hit!");
    Employee.find({
        name: {
            $regex: new RegExp(userInput),
            $options: 'i'
        }
    }, function (err, employees) {
        // employees.forEach(function (item) {
        //     //console.log(item.name+" "+"isPresent: "+item.isPresent);
        //     console.log(item.name);
        // })
        updateDropdown(employees);

    }).lean()
}
//lean can also be implemented like Employee.find().lean().exec(callback)

function updateDropdown(values) {
    console.log("updateDropdown hit!");
    var innerhtml ="";
    
    values.forEach(function(item){
        innerhtml+='<a class="dropdown-item" href="#">'+item.name+'</a>';
    })

    $('#names').innerhtml =innerhtml;
         

}

$('#empsearch').keyup(function () {
    findEmployee(this.value);
});