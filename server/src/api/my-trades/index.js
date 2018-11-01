import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index, show } from './controller'
export MyTrades, { schema } from './model'

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
 * @api {get} /my-trades/:id Retrieve my trades
 * @apiName RetrieveMyTrades
 * @apiGroup MyTrades
 * @apiSuccess {Object} myTrades My trades's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 My trades not found.
 */
router.get('/:id',
  show)

export default router
