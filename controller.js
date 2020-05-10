const Employee = require("./Associations/models/employee");

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

