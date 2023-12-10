const jwt = require("jsonwebtoken");

const auth = async (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    try{
        jwt.verify(token, 'masai', (err, decoded) => {
            if(decoded) {
                req.body.userID = decoded.userID
                req.body.username = decoded.username
                next()
            }else{
                res.send({"msg":"You are not authorised"})
            }
          });
    }catch(err) {
        res.status(400).send({"error" : err})
    }
}

module.exports = {
    auth
}