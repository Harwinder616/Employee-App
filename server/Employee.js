

const mongoose=require('mongoose');

const EmployeeSchema=new mongoose.Schema({

    name:String,                                   //schema of database
    email:String,
    phone:String,
    picture:String,
    pos:String,
    salary:String,
    


    
    
})
mongoose.model("employee",EmployeeSchema)

