const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeaders = req.headers.token

    if(authHeaders){
        const token = authHeaders.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err) {
                return res.status(403).json("Token is not valid")
            }
            req.user = user
            next()
        })
    } else {
        return res.status(401).json("Your not authenticated")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        } else {
            return res.status(403).json("You are not allowed to do that")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next()
        } else {
            return res.status(403).json("You are not allowed to do that")
        }
    })
}

module.exports = {
    verifyToken, 
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}