import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Tracking } from '.'

const app = () => express(apiRoot, routes)

let tracking

beforeEach(async () => {
  tracking = await Tracking.create({})
})

test('POST /tracker 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ symbol: 'test', interval: 'test', limit: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.symbol).toEqual('test')
  expect(body.interval).toEqual('test')
  expect(body.limit).toEqual('test')
})

test('GET /tracker 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /tracker/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${tracking.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tracking.id)
})

test('GET /tracker/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /tracker/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${tracking.id}`)
    .send({ symbol: 'test', interval: 'test', limit: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tracking.id)
  expect(body.symbol).toEqual('test')
  expect(body.interval).toEqual('test')
  expect(body.limit).toEqual('test')
})

test('PUT /tracker/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ symbol: 'test', interval: 'test', limit: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tracker/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tracking.id}`)
  expect(status).toBe(204)
})

test('DELETE /tracker/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
