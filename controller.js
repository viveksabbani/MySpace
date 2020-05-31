const Employee = require("./Associations/models/employee");
const Seat = require("./Associations/models/seat");

    exports.findEmployee =(req, res) =>{
        Employee.find({
            name: {
                $regex: new RegExp(req.params.userInput),
                $options: 'i'
            }
        }, function (err, employees) {
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
            res.send("err");
        }else{
            res.send(seat);
        }
    })
}

exports.findTeamSeat =(req,res) =>{
    Seat.find({team: req.params.teamName, employee_name: null},function(err,seat){
        if(err){
            res.send("err");
        }else{
            res.send(seat);
        }
    })
}

exports.bookSeat =(req,res) =>{
    Seat.updateOne({seat: req.body.seat},{$set:{employee_name: req.body.name}},function(err){
        if(err){
           res.send("err");
        }else{
            Employee.updateOne({name:req.body.name},{$set:{inOffice: true}},function(err){
                if(err){
                    res.send("err");
                }
            })
            res.send("booked");
        }
        // res.send(seat);
    })
}
exports.cancelSeat =(req,res)=>{
    Seat.updateOne({seat: req.body.seat},{$set:{employee_name: undefined}},function(err){
        if(err){
            res.send("err");
        }else{
            Employee.updateOne({name:req.body.name},{$set:{inOffice: false}},function(err){
                if(err){
                    res.send("err");
                }else{
                    res.send("canceled");
                }
            })
            
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

