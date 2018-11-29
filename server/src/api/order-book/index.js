import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index, show } from './controller'

const router = new Router()

/**
 * @api {get} /order-book Retrieve order books
 * @apiName RetrieveOrderBooks
 * @apiGroup OrderBook
 * @apiUse listParams
 * @apiSuccess {Object[]} orderBooks List of order books.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /order-book/:id Retrieve order book
 * @apiName RetrieveOrderBook
 * @apiGroup OrderBook
 * @apiSuccess {Object} orderBook Order book's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order book not found.
 */
router.get('/:symbol',
  show)

export default router
