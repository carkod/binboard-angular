import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, upsert } from './controller'
import { schema } from './model'

const router = new Router()
const { symbol, status, baseAsset, baseAssetPrecision, quoteAsset, quotePrecision, orderTypes, icebergAllowed, filters } = schema.tree


/**
 * @api {post} /symbols Create symbols
 * @apiName CreateSymbols
 * @apiGroup Symbols
 * @apiParam symbol Symbols's symbol.
 * @apiParam status Symbols's status.
 * @apiParam baseAsset Symbols's baseAsset.
 * @apiParam baseAssetPrecision Symbols's baseAssetPrecision.
 * @apiParam quoteAsset Symbols's quoteAsset.
 * @apiParam quotePrecision Symbols's quotePrecision.
 * @apiParam orderTypes Symbols's orderTypes.
 * @apiParam icebergAllowed Symbols's icebergAllowed.
 * @apiParam filters Symbols's filters.
 * @apiSuccess {Object} symbols Symbols's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Symbols not found.
 */
router.post('/',
  body({ symbol, status, baseAsset, baseAssetPrecision, quoteAsset, quotePrecision, orderTypes, icebergAllowed, filters }),
  create)


/**
 * @api {get} /symbols Retrieve symbols
 * @apiName RetrieveSymbols
 * @apiGroup Symbols
 * @apiUse listParams
 * @apiSuccess {Object[]} symbols List of symbols.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /symbols/:symbol Retrieve symbols
 * @apiName RetrieveSingleSymbol
 * @apiGroup Symbols
 * @apiSuccess {Object} symbols Symbols's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Symbols not found.
 */
router.get('/:symbol',
  show)

/**
 * @api {put} /symbols/:id Update symbols
 * @apiName UpdateSymbols
 * @apiGroup Symbols
 * @apiParam symbol Symbols's symbol.
 * @apiParam status Symbols's status.
 * @apiParam baseAsset Symbols's baseAsset.
 * @apiParam baseAssetPrecision Symbols's baseAssetPrecision.
 * @apiParam quoteAsset Symbols's quoteAsset.
 * @apiParam quotePrecision Symbols's quotePrecision.
 * @apiParam orderTypes Symbols's orderTypes.
 * @apiParam icebergAllowed Symbols's icebergAllowed.
 * @apiParam filters Symbols's filters.
 * @apiSuccess {Object} symbols Symbols's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Symbols not found.
 */
router.put('/', upsert)

/**
 * @api {delete} /symbols/:id Delete symbols
 * @apiName DeleteSymbols
 * @apiGroup Symbols
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Symbols not found.
 */
router.delete('/:id',
  destroy)

export default router
