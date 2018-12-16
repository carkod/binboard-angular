import express, { Router } from 'express'
import logger from 'morgan'
import user from './user'
import auth from './auth'
import tracker from './tracker'
import ticker24 from './ticker24'
import ticker from './ticker'
import candlestick from './candlestick'
import bookTicker from './bookticker'
import exchangeInfo from './exchange-info'
import account from './account'
import serverTime from './server-time'
import testOrder from './test-order'
import order from './order'
import myTrades from './my-trades'
import openOrders from './open-orders'
import orderBook from './order-book'
import settings from './settings'
import symbols from './symbols'
import { dirname } from 'path';

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
// router.use(logger())
router.use('/', express.static(__dirname + '../../../docs'))
router.use('/users', user)
router.use('/auth', auth)
router.use('/tracker', tracker)
router.use('/ticker24', ticker24)
router.use('/ticker', ticker)
router.use('/candlestick', candlestick)
router.use('/bookticker', bookTicker)
router.use('/exchangeInfo', exchangeInfo)
router.use('/server-time', serverTime)
router.use('/account', account)
router.use('/test-order', testOrder)
router.use('/order', order)
router.use('/my-trades', myTrades)
router.use('/open-orders', openOrders)
router.use('/order-book', orderBook)
router.use('/settings', settings)
router.use('/symbols', symbols)

export default router
