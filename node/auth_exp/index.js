const express  = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const cors = require('cors')

const users = [];
const JWT = "SEcrets"
app.use(express.json())
app.use(cors())

function auth(req,res,next){
    const token = req.headers.token
    const decoded = jwt.verify(token, JWT)
    if(decoded.username){
        req.username = decoded.username
        next()
    }else{
        res.json({
          message:"Unauthorizsed Access"
        })
    }

}

// function getToken(){
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     let tok = ""

//     for(let i =0; i < 32; i++){
//         tok += options[Math.floor(Math.random() * options.length)] 
//     }

//     return tok


// }


app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
})



app.post('/signin', (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u => u.username === username && u.password === password)

    if (user) {
        const token = jwt.sign({
            username: user.username
        }, JWT);        user.token = token
        res.send({
            token
        })
        console.log(users)
    } else{
        res.status(403).send({
            message: "Ivalid username or password"
        })
    }

})

app.post('/signup', (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password,
    })

    res.send("You are signed up")})




app.get("/me",auth,(req, res) => {

        const currentUser = req.username;
        // const token = req.headers.token;
        // const decode = jwt.verify(JWT, token)
        // const username = decode.username

        const user = users.find(user => user.username === currentUser);
        if (user) {
            res.send({
                username: user.username
            })
        } else {
            res.status(401).send({
                message: "Unauthorized"
            })
        }
    })


app.listen("3000", ()=>{
    console.log("Server running on 3000")
})