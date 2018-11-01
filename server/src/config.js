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
    apiRoot: process.env.API_ROOT || '/api',
    // apiRoot: '../api',
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
      exchangeInfo: '/api/v1/exchangeInfo',
      marketData: '/api/v1/depth',
      recentTrades: '/api/v1/trades',
      historicalTrades: '/api/v1/historicalTrades',
      candlestick: '/api/v1/klines',
      ticker24: '/api/v1/ticker/24hr',
      ticker:'/api/v3/ticker/price', // Symbol Price only ticker -- retrieve all coins
      bookTicker: '/api/v3/ticker/bookTicker', // Best price/qty on the order book for a symbol or symbols.
      allOrders: '/api/v3/allOrders', // GET /api/v3/allOrders (HMAC SHA256)
      account: '/api/v3/account',
      myTrades: '/api/v3/myTrades',
      serverTime: '/api/v1/time',
      testOrder: '/api/v3/order/test',
      order: '/api/v3/order',
      openOrders: '/api/v3/openOrders',
    },
    db: {
      base: 'http://api.carloswu.com',
      exchange: '/api/exchangeInfo',
      marketData: '/api/marketData',
      recentTrades: '/api/recentTrades',
      historicalTrades: '/api/historicalTrades',
      candlestick: '/api/candlestick',
      ticker24: '/api/ticker/ticker24',
      ticker:'/api/ticker/ticker', // Symbol Price only ticker -- retrieve all coins
      bookTicker: '/api/ticker/bookTicker', // Best price/qty on the order book for a symbol or symbols.
      testOrder: '/api/test-order',
      order: '/api/order',
      openOrders: '/api/open-orders',
      account: '/api/account',
      myTrades: '/api/my-trades',
    }
  },
  test: { },
  development: {
    API_ROOT: '/api',
    mongo: {
      uri: 'mongodb://carkod:48295620-j@localhost:27017/binboard',
      options: {
        debug: true,
        // user: 'carkod',
        // pass: '48295620-j',
        // dbName: 'binboard',
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://carkod:48295620-j@188.166.92.221:27017/binboard'
    }
  }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
