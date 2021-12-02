const jwt = require('jsonwebtoken')

const CustomAPIError = require('../errors/custom-error')

const authenticationMiddleware = async (req, res, next)=>{
    const authHead = req.headers.authorization

    if(!authHead || !authHead.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided', 401)
    }

    const token = authHead.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.jwt_secret)
        const{id, username} = decoded
        req.user = {id, username}
        next()
    } catch (error) {
        throw new CustomAPIError('You are not authourized to access this page', 401)
    }
}

module.exports = authenticationMiddleware