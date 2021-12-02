const jwt = require('jsonwebtoken')
require('dotenv')
const CustomAPIError = require('../errors/custom-error')

const login =  async (req, res)=>{
    const {username, password} = req.body

    if(!username || !password){
        throw new CustomAPIError('Please provide a username and password', 400)
    }
//creating a demo id that the jwt would take back to the front end
    const id = new Date().getDate()

//try to keep the payload small to improve customer experience and never put passwords inside your payload 
//you have to send back a secret in your payload so always use long unguessable string value for the secret

    const token = jwt.sign({id, username}, process.env.jwt_secret, {expiresIn:'30d'})

    res.status(200).json({msg:'user created', token})
}


const dashboard = async(req,res)=>{

    const authHead = req.headers.authorization

    if(!authHead || !authHead.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided', 401)
    }

    const token = authHead.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.jwt_secret)

        const luckyNumber = Math.floor(Math.random()*100)
        res.status(200).json({msg: `Hello, ${decoded.username}` , secret: `Here is your authorized data: ${luckyNumber}`})
    } catch (error) {
        throw new CustomAPIError('You are not authourized to access this page', 401)
    }
}

module.exports = {login, dashboard}