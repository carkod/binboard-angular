import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Order } from '.'

const app = () => express(apiRoot, routes)

let order

beforeEach(async () => {
  order = await Order.create({})
})

test('POST /order 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ symbol: 'test', orderId: 'test', clientOrderId: 'test', transactTime: 'test', price: 'test', origQty: 'test', executedQty: 'test', cummulativeQuoteQty: 'test', status: 'test', timeInForce: 'test', type: 'test', side: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.symbol).toEqual('test')
  expect(body.orderId).toEqual('test')
  expect(body.clientOrderId).toEqual('test')
  expect(body.transactTime).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.origQty).toEqual('test')
  expect(body.executedQty).toEqual('test')
  expect(body.cummulativeQuoteQty).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.timeInForce).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.side).toEqual('test')
})

test('GET /order 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /order/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${order.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(order.id)
})

test('GET /order/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /order/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${order.id}`)
    .send({ symbol: 'test', orderId: 'test', clientOrderId: 'test', transactTime: 'test', price: 'test', origQty: 'test', executedQty: 'test', cummulativeQuoteQty: 'test', status: 'test', timeInForce: 'test', type: 'test', side: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(order.id)
  expect(body.symbol).toEqual('test')
  expect(body.orderId).toEqual('test')
  expect(body.clientOrderId).toEqual('test')
  expect(body.transactTime).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.origQty).toEqual('test')
  expect(body.executedQty).toEqual('test')
  expect(body.cummulativeQuoteQty).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.timeInForce).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.side).toEqual('test')
})

test('PUT /order/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ symbol: 'test', orderId: 'test', clientOrderId: 'test', transactTime: 'test', price: 'test', origQty: 'test', executedQty: 'test', cummulativeQuoteQty: 'test', status: 'test', timeInForce: 'test', type: 'test', side: 'test' })
  expect(status).toBe(404)
})

test('DELETE /order/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${order.id}`)
  expect(status).toBe(204)
})

test('DELETE /order/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
