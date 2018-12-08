import { Router } from 'express'
import { create } from './controller'

const router = new Router()

/**
 * @api {post} /test-order Create test order
 * @apiName CreateTestOrder
 * @apiGroup TestOrder
 * @apiSuccess {Object} testOrder Test order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test order not found.
 */
router.post('/', create);

export default router
