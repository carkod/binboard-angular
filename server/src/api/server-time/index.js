import { Router } from 'express'
import { index, show } from './controller'

const router = new Router()

/**
 * @api {get} /server-time Retrieve server times
 * @apiName RetrieveServerTimes
 * @apiGroup ServerTime
 * @apiUse listParams
 * @apiSuccess {Object[]} serverTimes List of server times.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', index)

export default router
