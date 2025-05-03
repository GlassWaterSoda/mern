const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecret"

function auth(req, res, next) {
    const token = req.headers.token;
    console.log(token)
    const response = jwt.verify(token, JWT_SECRET);
    console.log("token " + token.id)
    console.log("response " + response.id)
    console.log("token.userId "+token.userId)
    if (response) {
        req.userId = response.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET
}