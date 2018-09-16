import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index, show } from './controller'

const router = new Router()

/**
 * @api {get} /exchangeInfo Retrieve exchange infos
 * @apiName RetrieveExchangeInfos
 * @apiGroup ExchangeInfo
 * @apiUse listParams
 * @apiSuccess {Object[]} exchangeInfos List of exchange infos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

export default router
