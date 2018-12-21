import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'

const router = new Router()
const { symbol, orderId, clientOrderId, transactTime, price, origQty, executedQty, cummulativeQuoteQty, status, timeInForce, type, side } = schema.tree

/**
 * @api {post} /order Create order
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiParam symbol Order's symbol.
 * @apiParam orderId Order's orderId.
 * @apiParam clientOrderId Order's clientOrderId.
 * @apiParam transactTime Order's transactTime.
 * @apiParam price Order's price.
 * @apiParam origQty Order's origQty.
 * @apiParam executedQty Order's executedQty.
 * @apiParam cummulativeQuoteQty Order's cummulativeQuoteQty.
 * @apiParam status Order's status.
 * @apiParam timeInForce Order's timeInForce.
 * @apiParam type Order's type.
 * @apiParam side Order's side.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.post('/',
  query(),
  create)

/**
 * @api {get} /order Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Order
 * @apiUse listParams
 * @apiSuccess {Object[]} orders List of orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /order/:id Retrieve order
 * @apiName RetrieveOrder
 * @apiGroup Order
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.get('/:id',
  show)

/**
 * @api {delete} /order/:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order not found.
 */
router.delete('/:id',
  destroy)

export default router
