import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index, show } from './controller'

const router = new Router()

/**
 * @api {get} /all-orders Retrieve all orders
 * @apiName RetrieveAllOrders
 * @apiGroup AllOrders
 * @apiParam {Number} [page=3], will add skip variable for paging
 * @apiParam {Number} [limit=20], will add page size for paging
 * @apiParam {String} [sort=order] [any paramter in data]
 * @apiParam {Number} [timeFrom=number] filter entries createdAt from
 * @apiParam {Number} [timeTo=number] filter entries createdAt to
 * @apiParam {Number} [updateTimeFrom=number] filter entries updatedAt from
 * @apiParam {Number} [updateTimeTo=number] filter entries updatedAt to
 * @apiUse listParams
 * @apiSuccess {Object[]} allOrders List of all orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', 
  query({
    symbol: { type: String },
    orderIdFrom: { type: String, paths: ['orderId'], operator: '$gte' },
    orderIdTo: { type: String, paths: ['orderId'], operator: '$lte' },
    clientOrderId: { type: String },
    status: { type: String },
    timeInForce: { type: String },
    side: { type: String },
    timeFrom: { type: Number, paths: ['time'], operator: '$gte' },
    timeTo: { type: Number, paths: ['time'], operator: '$lte' },
    updateTimeFrom: { type: Number, paths: ['updateTime'], operator: '$gte' },
    updateTimeTo: { type: Number, paths: ['updateTime'], operator: '$lte' },
    isWorking: { type: Boolean }
  }),
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
