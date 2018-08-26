/* eslint-disable no-unused-vars */
import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || 'localhost',
    apiRoot: process.env.API_ROOT || '',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    },
    api: {
      base: 'http://api.binance.com',
      exchange: '/api/v1/exchangeInfo',
      marketData: '/api/v1/depth',
      recentTrades: '/api/v1/trades',
      historicalTrades: '/api/v1/historicalTrades',
      candlestick: '/api/v1/klines',
      ticker24: '/api/v1/ticker/24hr',
      ticker:'/api/v3/ticker/price', // Symbol Price only ticker -- retrieve all coins
      bookTicker: '/api/v3/ticker/bookTicker', // Best price/qty on the order book for a symbol or symbols.
    },
    db: {
      base: 'http://localhost:9000/api',
    }
  },
  test: { },
  development: {
    mongo: {
      uri: 'mongodb://carkod:48295620-j@188.166.92.221:27017/binboard',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://188.166.92.221'
    }
  }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
