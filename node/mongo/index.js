const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { z, string } = require('zod')

const JWT_SECRET = "mysecret"

const { UserModel, TodoModel} = require("./db")
const { auth } = require("./auth")

mongoose.connect('mongodb+srv://jrhys1986:Z1w9RDp59SohAgdr@cluster0.jafo3.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0')

app.use(express.json())

app.get("/", (req,res)=>[
    res.send("Hello")
])




app.post('/signup', async (req,res)=>{
    const requireBody = z.object({
        email: z.email().min(8),
        name: z.string().min(3).max(100),
        password: z.password().min(8).max(100)
    })

    const parsedBody = requireBody.parse(req.body)
    const safeParsedData = requireBody.safeParse(req.body)

    if(!safeParsedData.success){
        res.json({
            message:"Invalid Entry",
            error: safeParsedData.error
        })
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
try{
    const hashpassword = await bcrypt.hash(password, 5)
    console.log(hashpassword)

    await UserModel.create({
        email: email,
        password: hashpassword,
        name: name
    })

    res.json({
        message: "Signed up Sucessfully"
    })
} catch(error){
    res.sendStatus(401).message("Error Found, User Exists")
}
   

})


app.post('/login', async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email:email
    })

    if(!response) {
        res.status(403).json({
            message:"User Doesnt Exist"
        })
    }

    console.log(response.password)

    const userChecked= await bcrypt.compare(password, response.password)
    console.log(userChecked)
    if (userChecked){
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET)

        //const tu= localStorage.setItem("token", token)

        res.json({
            "token": token
        })
    }else{
        res.status(403).json({
            message: "Please Enter the correct password"
        })
    }
})


app.post('/todo', auth, (req,res)=>{
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status ? req.body.status : false;

    TodoModel.create({
        userId,
        title,
        description,
        status
    })

    res.json({
        userId: userId
    })
    
})

app.get('/todos', auth,async (req,res)=>{
    const userId = req.userId

    const response = await TodoModel.find({
        userId: userId
    })

    res.json({
        userId: userId,
        todos: response
    })
    
    
})




app.listen("3000", ()=>{
    console.log("Server running on port 3000")
})