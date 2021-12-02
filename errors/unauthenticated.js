const customerror = require('./custom-error')
const {StatusCodes} = require('http-status-codes')

class Unathenticatederror extends customerror {
    constructor(message) {
      super(message)
      this.statusCode = StatusCodes.UNAUTHORIZED
    }
  }
  
  module.exports = Unathenticatederror
  