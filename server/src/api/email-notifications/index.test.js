import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { EmailNotifications } from '.'

const app = () => express(apiRoot, routes)

let emailNotifications

beforeEach(async () => {
  emailNotifications = await EmailNotifications.create({})
})

test('POST /email-notifications 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ from: 'test', to: 'test', cc: 'test', bcc: 'test', subject: 'test', text: 'test', html: 'test', attachments: 'test', replyTo: 'test', inReplyTo: 'test', references: 'test', attachDataUrls: 'test', watchHtml: 'test', icalEvent: 'test', alternatives: 'test', encoding: 'test', raw: 'test', textEncoding: 'test', priority: 'test', headers: 'test', messageId: 'test', list: 'test', disableFileAccess: 'test', disableUrlAccess: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.from).toEqual('test')
  expect(body.to).toEqual('test')
  expect(body.cc).toEqual('test')
  expect(body.bcc).toEqual('test')
  expect(body.subject).toEqual('test')
  expect(body.text).toEqual('test')
  expect(body.html).toEqual('test')
  expect(body.attachments).toEqual('test')
  expect(body.replyTo).toEqual('test')
  expect(body.inReplyTo).toEqual('test')
  expect(body.references).toEqual('test')
  expect(body.attachDataUrls).toEqual('test')
  expect(body.watchHtml).toEqual('test')
  expect(body.icalEvent).toEqual('test')
  expect(body.alternatives).toEqual('test')
  expect(body.encoding).toEqual('test')
  expect(body.raw).toEqual('test')
  expect(body.textEncoding).toEqual('test')
  expect(body.priority).toEqual('test')
  expect(body.headers).toEqual('test')
  expect(body.messageId).toEqual('test')
  expect(body.list).toEqual('test')
  expect(body.disableFileAccess).toEqual('test')
  expect(body.disableUrlAccess).toEqual('test')
})

test('GET /email-notifications 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /email-notifications/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${emailNotifications.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(emailNotifications.id)
})

test('GET /email-notifications/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
