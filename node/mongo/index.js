const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const JWT_SECRET = "mysecret"

const { UserModel, TodoModel} = require("./db")
const { auth } = require("./auth")

mongoose.connect('mongodb+srv://jrhys1986:Z1w9RDp59SohAgdr@cluster0.jafo3.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0')

app.use(express.json())

app.get("/", (req,res)=>[
    res.send("Hello")
])

app.post('/signup', async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        message: "Signed up Sucessfully"
    })

})


app.post('/login', async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email:email,
        password: password
    })
    
    if (user){
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET)

        //const tu= localStorage.setItem("token", token)

        res.json({
            "token": token
        })
    }else{
        res.status(403).json({
            message: "INcorrect Creds"
        })
    }
})


app.post('/todo', auth, (req,res)=>{
    const userId = req.userId;
    const title = 

    res.json({
        userId: userId
    })
    
})

app.get('/todos', auth,(req,res)=>{
    const userId = req.userId

    res.json({
        userId: userId
    })
    
    
})




app.listen("3000", ()=>{
    console.log("Server running on port 3000")
})