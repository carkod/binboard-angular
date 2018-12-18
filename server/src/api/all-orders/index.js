import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index, show } from './controller'

const router = new Router()

/**
 * @api {get} /all-orders Retrieve all orders
 * @apiName RetrieveAllOrders
 * @apiGroup AllOrders
 * @apiUse listParams
 * @apiSuccess {Object[]} allOrders List of all orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  index)

/**
 * @api {get} /all-orders/:id Retrieve all orders
 * @apiName RetrieveAllOrders
 * @apiGroup AllOrders
 * @apiSuccess {Object} allOrders All orders's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 All orders not found.
 */
router.get('/:symbol',
  show)

export default router
