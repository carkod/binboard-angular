import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index, show } from './controller'
import { schema } from './model'

const router = new Router()

/**
 * @api {get} /ticker24 Retrieve ticker 24 s
 * @apiName RetrieveTicker24S
 * @apiGroup Ticker24
 * @apiUse listParams
 * @apiSuccess {Object[]} ticker24S List of ticker 24 s.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /ticker24/:id Retrieve ticker 24
 * @apiName RetrieveTicker24
 * @apiGroup Ticker24
 * @apiSuccess {Object} ticker24 Ticker 24's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticker 24 not found.
 */
router.get('/:symbol',
  show)

export default router
