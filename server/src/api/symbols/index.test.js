import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Symbols } from '.'

const app = () => express(apiRoot, routes)

let symbols

beforeEach(async () => {
  symbols = await Symbols.create({})
})

test('POST /symbols 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ symbol: 'test', status: 'test', baseAsset: 'test', baseAssetPrecision: 'test', quoteAsset: 'test', quotePrecision: 'test', orderTypes: 'test', icebergAllowed: 'test', filters: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.symbol).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.baseAsset).toEqual('test')
  expect(body.baseAssetPrecision).toEqual('test')
  expect(body.quoteAsset).toEqual('test')
  expect(body.quotePrecision).toEqual('test')
  expect(body.orderTypes).toEqual('test')
  expect(body.icebergAllowed).toEqual('test')
  expect(body.filters).toEqual('test')
})

test('GET /symbols 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /symbols/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${symbols.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(symbols.id)
})

test('GET /symbols/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /symbols/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${symbols.id}`)
    .send({ symbol: 'test', status: 'test', baseAsset: 'test', baseAssetPrecision: 'test', quoteAsset: 'test', quotePrecision: 'test', orderTypes: 'test', icebergAllowed: 'test', filters: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(symbols.id)
  expect(body.symbol).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.baseAsset).toEqual('test')
  expect(body.baseAssetPrecision).toEqual('test')
  expect(body.quoteAsset).toEqual('test')
  expect(body.quotePrecision).toEqual('test')
  expect(body.orderTypes).toEqual('test')
  expect(body.icebergAllowed).toEqual('test')
  expect(body.filters).toEqual('test')
})

test('PUT /symbols/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ symbol: 'test', status: 'test', baseAsset: 'test', baseAssetPrecision: 'test', quoteAsset: 'test', quotePrecision: 'test', orderTypes: 'test', icebergAllowed: 'test', filters: 'test' })
  expect(status).toBe(404)
})

test('DELETE /symbols/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${symbols.id}`)
  expect(status).toBe(204)
})

test('DELETE /symbols/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
