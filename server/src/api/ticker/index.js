import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index, show } from './controller'

const router = new Router()

/**
 * @api {get} /ticker Retrieve tickers
 * @apiName RetrieveTickers
 * @apiGroup Ticker
 * @apiUse listParams
 * @apiSuccess {Object[]} tickers List of tickers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /ticker/:id Retrieve ticker
 * @apiName RetrieveTicker
 * @apiGroup Ticker
 * @apiSuccess {Object} ticker Ticker's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticker not found.
 */
router.get('/:symbol',
  show)

export default router
