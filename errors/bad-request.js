const customerror = require('./custom-error')
const {StatusCodes} = require('http-status-codes')

class Badrequest extends customerror {
    constructor(message) {
      super(message)
      this.statusCode = StatusCodes.BAD_REQUEST
    }
  }
  
  module.exports = Badrequest
  