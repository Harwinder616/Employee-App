const express=require('express');
const app=express();
const bodyParser= require('body-parser');
const mongoose=require('mongoose');

//password=8W0e9CX1coUxyIAJ
const mongouri="mongodb+srv://cnq:8W0e9CX1coUxyIAJ@cluster0-ldj2h.mongodb.net/test?retryWrites=true&w=majority"
app.get('/',(req,res)=>{Employee.find({}).then(data=> res.send(data)).catch(err=>console.log(err))//extract all objects present in database
   
})


require('./Employee')

app.use(bodyParser.json())    //parsing for seeing req.body
const Employee=mongoose.model('employee');    //creating mongoose model for interacting wih database

mongoose.connect(mongouri,{
    useNewUrlParser:true,                           //connecting to mongodb through app url mongouri
    useUnifiedTopology:true

})

mongoose.connection.on("connected",()=>{
    console.log('connected to  mongo');
})
mongoose.connection.on("error",(err)=>{
    console.log(err);
})

app.post('/send',(req,res)=>{
    const employee=new Employee({
        name:req.body.name,
        email:req.body.email, 
        phone:req.body.phone,
        picture:req.body.picture,
        pos:req.body.pos,
        salary:req.body.salary



    })
    employee.save().then(data=>{console.log(data)
        res.send(data)}).catch(err=>{console.log(err)})
  
   
})

app.post('/delete',(req,res)=>{
  
    Employee.findByIdAndRemove(req.body.id).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })


})
app.post('/update',(req,res)=>{
  
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        pos:req.body.pos,
        salary:req.body.salary

    }).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })


})


app.listen(3000,()=>{                //server running at 3000  port
    console.log('server running')
})
/*{
        "name":"sagar",
        "email":"123@ab.com",
        "phone":"123",
        "picture":"some url",
        "pos":"web",
        "salary":"6 lpa"
}*/