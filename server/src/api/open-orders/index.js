import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index, show } from './controller'
export OpenOrders, { schema } from './model'

const router = new Router()

/**
 * @api {get} /open-orders Retrieve open orders
 * @apiName RetrieveOpenOrders
 * @apiGroup OpenOrders
 * @apiUse listParams
 * @apiSuccess {Object[]} openOrders List of open orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /open-orders/:id Retrieve open orders
 * @apiName RetrieveOpenOrders
 * @apiGroup OpenOrders
 * @apiSuccess {Object} openOrders Open orders's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Open orders not found.
 */
router.get('/:id',
  show)

export default router
