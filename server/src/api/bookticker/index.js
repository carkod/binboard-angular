import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index, show } from './controller'

const router = new Router()

/**
 * @api {get} /bookticker Retrieve booktickers
 * @apiName RetrieveBooktickers
 * @apiGroup Bookticker
 * @apiUse listParams
 * @apiSuccess {Object[]} booktickers List of booktickers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /bookticker/:id Retrieve bookticker
 * @apiName RetrieveBookticker
 * @apiGroup Bookticker
 * @apiSuccess {Object} bookticker Bookticker's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bookticker not found.
 */
router.get('/:symbol',
  show)

export default router
