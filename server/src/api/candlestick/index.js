import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index, show } from './controller'

const router = new Router()

/**
 * @api {get} /candlestick Retrieve candlesticks
 * @apiName RetrieveCandlesticks
 * @apiGroup Candlestick
 * @apiUse listParams
 * @apiSuccess {Object[]} candlesticks List of candlesticks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /candlestick/:id Retrieve candlestick
 * @apiName RetrieveCandlestick
 * @apiGroup Candlestick
 * @apiSuccess {Object} candlestick Candlestick's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Candlestick not found.
 */
router.get('/:id',
  show)

export default router
