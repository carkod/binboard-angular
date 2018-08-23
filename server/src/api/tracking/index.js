import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Tracking, { schema } from './model';

const router = new Router()
const { symbol, interval, limit } = schema.tree

/**
 * @api {post} /tracker Create tracking
 * @apiName CreateTracking
 * @apiGroup Tracking
 * @apiParam symbol Tracking's symbol.
 * @apiParam interval Tracking's interval.
 * @apiParam limit Tracking's limit.
 * @apiSuccess {Object} tracking Tracking's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tracking not found.
 */
router.post('/',
  body({ symbol, interval, limit }),
  create)

/**
 * @api {get} /tracker Retrieve trackings
 * @apiName RetrieveTrackings
 * @apiGroup Tracking
 * @apiUse listParams
 * @apiSuccess {Object[]} trackings List of trackings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /tracker/:id Retrieve tracking
 * @apiName RetrieveTracking
 * @apiGroup Tracking
 * @apiSuccess {Object} tracking Tracking's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tracking not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /tracker/:id Update tracking
 * @apiName UpdateTracking
 * @apiGroup Tracking
 * @apiParam symbol Tracking's symbol.
 * @apiParam interval Tracking's interval.
 * @apiParam limit Tracking's limit.
 * @apiSuccess {Object} tracking Tracking's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tracking not found.
 */
router.put('/:id',
  body({ symbol, interval, limit }),
  update)

/**
 * @api {delete} /tracker/:id Delete tracking
 * @apiName DeleteTracking
 * @apiGroup Tracking
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Tracking not found.
 */
router.delete('/:id',
  destroy)

export default router
