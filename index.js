'use strict'

const
  koa = require('koa'),
  // http = require('http'),
  Utils = require('./utils'),
  router = require('koa-route'),
  parse = require('co-body'),
  qs = require('querystring'),
  // socketio = require('socket.io'),

  // config
  config = require('./config'),
  r = require('rethinkdbdash')(config.rethinkdb)


let
  app, server

app = koa()

app.use(router.get('/', root))
app.use(router.post('/emoji/create/:form', add))
app.use(router.get('/emoji/:id', find))
app.use(router.get('/emojis', all))
app.use(router.post('/emoji/:id/delete', del))

function* root() {
  this.body = 'hello human'
}

function* add(form) {
  try {
    let result = yield r.table(config.table).insert(
      r.expr(qs.parse(form)).merge({
        createAt: r.now()
      }), {
        returnChanges: true
      })
    this.body = result.changes[0].new_val
  } catch (e)  {
    this.status = 500
    this.body = e.message || http.STATUS_CODES(this.status)
  }
}

function* all() {
  try {
    let emojis = yield r.table(config.table)
    this.body = emojis
  } catch (e) {
    this.status = 500
    this.body = e.message || http.STATUS_CODES[this.status]
  }
}

function* find(id) {
  try {
    let emoji = yield r.table(config.table).get(id)
    this.body = emoji
  } catch (e) {
    this.status = 500
    this.body = e.message || http.STATUS_CODES(this.status)
  }
}

function* del(id) {
  try {
    let emoji = yield r.table(config.table).get(id).delete()
    this.body = 'emoji [' + id + '] removed'
  } catch (e) {
    this.status = 500
    this.body = e.message || http.STATUS_CODES[this.STATUS]
  }
}

app.listen(config.koa.PORT)
Utils.log('listening on port ' + config.koa.PORT)