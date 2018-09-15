import { Router } from 'express'
import { middleware as query } from 'querymen'
import { show } from './controller'

const router = new Router()


/**
 * @api {get} /candlestick/:id Retrieve candlestick
 * @apiName RetrieveCandlestick
 * @apiGroup Candlestick
 * @apiSuccess {Object} candlestick Candlestick's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Candlestick not found.
 */
router.get('/:symbol/:interval/:limit',
  show)

export default router
