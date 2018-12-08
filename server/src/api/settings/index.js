import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
export { schema } from './model'

const router = new Router()

/**
 * @api {post} /settings Create settings
 * @apiName CreateSettings
 * @apiGroup Settings
 * @apiSuccess {Object} settings Settings's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Settings not found.
 */
router.post('/',
  create)

/**
 * @api {get} /settings Retrieve settings
 * @apiName RetrieveSettings
 * @apiGroup Settings
 * @apiUse listParams
 * @apiSuccess {Object[]} settings List of settings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /settings/:id Retrieve settings
 * @apiName RetrieveSettings
 * @apiGroup Settings
 * @apiSuccess {Object} settings Settings's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Settings not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /settings/:id Update settings
 * @apiName UpdateSettings
 * @apiGroup Settings
 * @apiSuccess {Object} settings Settings's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Settings not found.
 */
router.put('/:id',
  update)

/**
 * @api {delete} /settings/:id Delete settings
 * @apiName DeleteSettings
 * @apiGroup Settings
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Settings not found.
 */
router.delete('/:id',
  destroy)

export default router
