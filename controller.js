const Employee = require("./Associations/models/employee");
const Seat = require("./Associations/models/seat");

    exports.findEmployee =(req, res) =>{
        Employee.find({
            name: {
                $regex: new RegExp(req.params.userInput),
                $options: 'i'
            }
        }, function (err, employees) {
            // employees.forEach(function (item) {
            //     //console.log(item.name+" "+"isPresent: "+item.isPresent);
            //     console.log(item.name);
            // })
            //updateDropdown(employees);
            if(err){
                // console.log("Error in fetching data from db");
                // console.log(userInput);
            }else{
                res.send(employees);
            }
    
        }).lean()
} 

exports.findSeat =(req,res) =>{
    Seat.find({seat: req.params.seatNum},function(err,seat){
        if(err){
            console.log("Error unable to fetch the info form the database!!!");
        }else{
            res.send(seat);
        }
    })
}


    // exports.findAll = (req, res) =>  {
    //     console.log("Fetch all Users");
        
    //       User.find()
    //       .then(users => {
    //           res.send(users);
    //       }).catch(err => {
    //           res.status(500).send({
    //               message: err.message
    //           });
    //       });
    //   };

