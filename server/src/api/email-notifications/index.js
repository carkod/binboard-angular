import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show } from './controller'
import { schema } from './model'

const router = new Router()
const { from, to, cc, bcc, subject, text, html, attachments, replyTo, inReplyTo, references, attachDataUrls, watchHtml, icalEvent, alternatives, encoding, raw, textEncoding, priority, headers, messageId, list, disableFileAccess, disableUrlAccess } = schema.tree

/**
 * @api {post} /email-notifications Create email notifications
 * @apiName CreateEmailNotifications
 * @apiGroup EmailNotifications
 * @apiParam from Email notifications's from.
 * @apiParam to Email notifications's to.
 * @apiParam cc Email notifications's cc.
 * @apiParam bcc Email notifications's bcc.
 * @apiParam subject Email notifications's subject.
 * @apiParam text Email notifications's text.
 * @apiParam html Email notifications's html.
 * @apiParam attachments Email notifications's attachments.
 * @apiParam replyTo Email notifications's replyTo.
 * @apiParam inReplyTo Email notifications's inReplyTo.
 * @apiParam references Email notifications's references.
 * @apiParam attachDataUrls Email notifications's attachDataUrls.
 * @apiParam watchHtml Email notifications's watchHtml.
 * @apiParam icalEvent Email notifications's icalEvent.
 * @apiParam alternatives Email notifications's alternatives.
 * @apiParam encoding Email notifications's encoding.
 * @apiParam raw Email notifications's raw.
 * @apiParam textEncoding Email notifications's textEncoding.
 * @apiParam priority Email notifications's priority.
 * @apiParam headers Email notifications's headers.
 * @apiParam messageId Email notifications's messageId.
 * @apiParam list Email notifications's list.
 * @apiParam disableFileAccess Email notifications's disableFileAccess.
 * @apiParam disableUrlAccess Email notifications's disableUrlAccess.
 * @apiSuccess {Object} emailNotifications Email notifications's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Email notifications not found.
 */
// router.post('/',
//   body({ from, to, cc, bcc, subject, text, html, attachments, replyTo, inReplyTo, references, attachDataUrls, watchHtml, icalEvent, alternatives, encoding, raw, textEncoding, priority, headers, messageId, list, disableFileAccess, disableUrlAccess }),
//   create)

router.post('/',
  body({ from, to, cc, bcc, subject, text, html, attachments, replyTo, inReplyTo, references, attachDataUrls, watchHtml, icalEvent, alternatives, encoding, raw, textEncoding, priority, headers, messageId, list, disableFileAccess, disableUrlAccess }),
  create)

/**
 * @api {get} /email-notifications Retrieve email notifications
 * @apiName RetrieveEmailNotifications
 * @apiGroup EmailNotifications
 * @apiUse listParams
 * @apiSuccess {Object[]} emailNotifications List of email notifications.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /email-notifications/:id Retrieve email notifications
 * @apiName RetrieveEmailNotifications
 * @apiGroup EmailNotifications
 * @apiSuccess {Object} emailNotifications Email notifications's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Email notifications not found.
 */
router.get('/:id',
  show)

export default router
