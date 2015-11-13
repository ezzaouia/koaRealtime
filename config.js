'use strict'

const config = {
  DRDB_PORT: 28015,
  APP_PORT: 3000
}

module.exports = {
  rethinkdb: {
    host: 'localhost',
    port: config.DB_PORT,
    db: 'test',
    authkey: ''
  },
  table: 'emoji',
  koa: {
    PORT: config.APP_PORT
  }
}