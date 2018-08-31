import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Tracker, { schema } from './model';

const router = new Router()
const { tree } = schema

/**
 * @api {post} /tracker Create tracking
 * @apiName CreateTracker
 * @apiGroup Tracker
 * @apiParam symbol Tracker's symbol.
 * @apiParam interval Tracker's interval.
 * @apiParam limit Tracker's limit.
 * @apiSuccess {Object} tracking Tracker's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tracker not found.
 */
router.post('/',
  body(tree),
  create)

/**
 * @api {get} /tracker Retrieve tracker
 * @apiName RetrieveTracker
 * @apiGroup Tracker
 * @apiUse listParams
 * @apiSuccess {Object[]} tracker List of tracker.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /tracker/:id Retrieve tracking
 * @apiName RetrieveTracker
 * @apiGroup Tracker
 * @apiSuccess {Object} tracking Tracker's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tracker not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /tracker/:id Update tracking
 * @apiName UpdateTracker
 * @apiGroup Tracker
 * @apiParam symbol Tracker's symbol.
 * @apiParam interval Tracker's interval.
 * @apiParam limit Tracker's limit.
 * @apiSuccess {Object} tracking Tracker's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tracker not found.
 */
router.put('/:id',
  body(tree),
  update)

/**
 * @api {delete} /tracker/:id Delete tracking
 * @apiName DeleteTracker
 * @apiGroup Tracker
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Tracker not found.
 */
router.delete('/:id',
  destroy)

export default router
