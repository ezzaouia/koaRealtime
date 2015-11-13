'use strict'

const
  util = require('util'),
  http = require('http')

class Util {
  static log(args) {
    util.log(args)
  }

  static jsonsify(arg) {
    return JSON.stringify(arg, null, 2)
  }

  static cachApiException(code) {
    return http.STATUS_CODES[code]
  }
}

module.exports = Util