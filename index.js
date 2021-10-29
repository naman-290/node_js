
// REquire
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./user");


//Database 
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on("error",(error) => {
    console.log(error)
})

db.once("open",() => {
    console.log("DAtabase connection is success");
})


// use app.use()
app.use(bodyParser.json());
app.use(morgan('dev'));
//app.use(express.static(__dirname + "/html"));


// GET API
app.get('/',(req,res) => {
res.json({
    status : "true",
    message : "You are on the first page"
})
})

app.get('/home',(req,res) => {
    res.send("Home Page")
})


//POST API

// CRUD = Create + Read + Update + Delete
//create
app.post("/create" , (req,res) => {
 
    var data = new User({
        name: req.body.name,
        email : req.body.email,
        password: req.body.password
    })
    
    data.save()
    .then((response) => {
        res.json({
            message: "User saves successfully",
            status: true,
            response: response
        })
    })
    .catch((error) => {
        res.json({
            message: "Some Error Occured",
            status : true,
            error: error
        })
    })
})

//read
app.get("/read",(req,res) => {

    var email = req.body.email;

    User.findOne({email})
    .then((response) => {
        if(response)
        {
          res.json({
              message : "Hurray! we have find the user",
              status : true,
              response : response
          })
        }else{
            res.json({
                message : "No user found",
                status : false,
                response: response
            })
        }
    })
    .catch((error) => {
        res.json({
            message : "Some Error occured",
            status : false,
            error : error
        })
    })

})

// Update
app.post("/update",(req,res) => {
    
    var email = req.body.email;

    var update = {
        password : req.body.password,
        name : req.body.name
    };

    User.findOneAndUpdate({email},{$set: update})
    .then((response) => {
        if(response)
        {
          res.json({
              message : "Update Successse",
              status : true,
              response : response
          })
        }else{
            res.json({
                message : "No user found",
                status : false,
                response: response
            })
        }
    })
    .catch((error) => {
        res.json({
            message : "Some Error has occured",
            status: false,
            error: error
        })
    })
})



//Universal Get API
app.get('*',(req,res) => {
    res.send("404 Error Web page not found");
})
//Server 
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
})