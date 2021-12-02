// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

const jwt = require('jsonwebtoken')
const {badrequesterror} = require('../errors')

const login =  async (req, res)=>{
    const {username, password} = req.body

    if(!username || !password){
        throw new badrequesterror('Please provide a username and password')
    }
//creating a demo id that the jwt would take back to the front end
    const id = new Date().getDate()

//try to keep the payload small to improve customer experience and never put passwords inside your payload 
//you have to send back a secret in your payload so always use long unguessable string value for the secret

    const token = jwt.sign({id, username}, process.env.jwt_secret, {expiresIn:'30d'})

    res.status(200).json({msg:'user created', token})
}


const dashboard = async (req,res)=>{
    console.log(req.user)
    const luckyNumber = Math.floor(Math.random()*100)

    res.status(200).json({msg: `Hello, ${req.user.username}` , secret: `Here is your authorized data: ${luckyNumber}`})

}

module.exports = {login, dashboard}