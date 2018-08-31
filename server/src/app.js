import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
import { ticker24job } from './services/cronjob'

const app = express(apiRoot, api)
const server = http.createServer(app)

mongoose.connect(mongo.uri);
mongoose.Promise = Promise

// Cron jobs
ticker24job();

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
});

export default app
