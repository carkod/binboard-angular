import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Ticker24, { schema } from './model'

const router = new Router()
const { symbol } = schema.tree

/**
 * @api {post} /ticker-24 Create ticker 24
 * @apiName CreateTicker24
 * @apiGroup Ticker24
 * @apiParam symbol Ticker 24's symbol.
 * @apiSuccess {Object} ticker24 Ticker 24's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticker 24 not found.
 */
router.post('/',
  body({ symbol }),
  create)

/**
 * @api {get} /ticker-24 Retrieve ticker 24 s
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
 * @api {get} /ticker-24/:id Retrieve ticker 24
 * @apiName RetrieveTicker24
 * @apiGroup Ticker24
 * @apiSuccess {Object} ticker24 Ticker 24's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticker 24 not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /ticker-24/:id Update ticker 24
 * @apiName UpdateTicker24
 * @apiGroup Ticker24
 * @apiParam symbol Ticker 24's symbol.
 * @apiSuccess {Object} ticker24 Ticker 24's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticker 24 not found.
 */
router.put('/:id',
  body({ symbol }),
  update)

/**
 * @api {delete} /ticker-24/:id Delete ticker 24
 * @apiName DeleteTicker24
 * @apiGroup Ticker24
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Ticker 24 not found.
 */
router.delete('/:id',
  destroy)

export default router
