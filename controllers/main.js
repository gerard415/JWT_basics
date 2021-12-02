
const login =  async (req, res)=>{
    res.send('Faske login/ register route')
}

const dashboard = async(req,res)=>{
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg: `Hello, John Doe` , secret: `Here is your authorized data: ${luckyNumber}`})
}

module.exports = {login, dashboard}