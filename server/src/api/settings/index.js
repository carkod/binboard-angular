import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
export { schema } from './model'

const router = new Router()


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
 * @api {get} /settings/:type Retrieve settings type ['general', 'local']
 * @apiName RetrieveSettings
 * @apiGroup Settings
 * @apiSuccess {Object} settings Settings's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Settings not found.
 */
router.get('/:type',
  show)

/**
 * @api {put} /settings/:id Update settings
 * @apiName UpdateSettings
 * @apiGroup Settings
 * @apiSuccess {Object} settings Settings's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Settings not found.
 */
router.put('/:type',
  update)

export default router
