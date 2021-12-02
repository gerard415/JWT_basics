const jwt = require('jsonwebtoken')

const {Unathenticatederror} = require('../errors')

const authenticationMiddleware = async (req, res, next)=>{
    const authHead = req.headers.authorization

    if(!authHead || !authHead.startsWith('Bearer ')){
        throw new Unathenticatederror('No token provided')
    }

    const token = authHead.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.jwt_secret)
        const{id, username} = decoded
        req.user = {id, username}
        next()
    } catch (error) {
        throw new Unathenticatederror('You are not authourized to access this page')
    }
}

module.exports = authenticationMiddleware