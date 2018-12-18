import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index, show } from './controller'

const router = new Router()

/**
 * @api {get} /my-trades Retrieve my trades
 * @apiName RetrieveMyTrades
 * @apiGroup MyTrades
 * @apiUse listParams
 * @apiSuccess {Object[]} myTrades List of my trades.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

  /**
 * @api {get} /my-trades/:symbol Retrieve My Trades given symbol
 * @apiName RetrieveSingleMytrades
 * @apiGroup MyTrades
 * @apiSuccess {Object} allOrders Single mytrades Object data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Trades not found.
 */
router.get('/:symbol',
show)

export default router
