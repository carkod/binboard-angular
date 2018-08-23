import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
import { Schema } from 'bodymen';

const app = express(apiRoot, api)
const server = http.createServer(app)

mongoose.connect('mongodb://carkod:48295620-j@188.166.92.221:27017/binboard')
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
