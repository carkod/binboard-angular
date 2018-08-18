import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Ticker24 } from '.'

const app = () => express(apiRoot, routes)

let ticker24

beforeEach(async () => {
  ticker24 = await Ticker24.create({})
})

test('POST /ticker-24 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ symbol: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.symbol).toEqual('test')
})

test('GET /ticker-24 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /ticker-24/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${ticker24.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(ticker24.id)
})

test('GET /ticker-24/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /ticker-24/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${ticker24.id}`)
    .send({ symbol: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(ticker24.id)
  expect(body.symbol).toEqual('test')
})

test('PUT /ticker-24/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ symbol: 'test' })
  expect(status).toBe(404)
})

test('DELETE /ticker-24/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ticker24.id}`)
  expect(status).toBe(204)
})

test('DELETE /ticker-24/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
