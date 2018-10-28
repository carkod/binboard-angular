import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index, show } from './controller'

const router = new Router()

/**
 * @api {get} /account Retrieve accounts
 * @apiName RetrieveAccounts
 * @apiGroup Account
 * @apiUse listParams
 * @apiSuccess {Object[]} accounts List of accounts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /account/:id Retrieve account
 * @apiName RetrieveAccount
 * @apiGroup Account
 * @apiSuccess {Object} account Account's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Account not found.
 */
router.get('/:id',
  show)

export default router
